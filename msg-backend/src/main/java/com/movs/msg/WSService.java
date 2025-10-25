package com.movs.msg;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.movs.msg.dto.LoginRequest;
import com.movs.msg.dto.MessageListRequest;
import com.movs.msg.dto.Response;
import com.movs.msg.entity.Message;

@Service
public class WSService {

    @Value("${USER_SERVICE_HOST}")
    private String userServiceHost;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    ConnectedUserList userList;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    MessageRepository messageRepository;

    public void handleIdentifyRequest(WebSocketSession session, JsonNode payload) throws JsonProcessingException {
        LoginRequest loginRequest = objectMapper.treeToValue(payload, LoginRequest.class);
        System.out.println("User " + loginRequest.getId() + " identified");
        userList.put(session, loginRequest.getId());
    }

    public void handleUserListRequest(WebSocketSession session) throws JsonProcessingException, IOException {
        List<Integer> users = messageRepository.findAllChats(userList.get(session).getId());
        userList.get(session).getChats().addAll(users);
        Response<List<Integer>> response = new Response<List<Integer>>("users", users);
        TextMessage textMessage = new TextMessage(objectMapper.writeValueAsString(response));
        session.sendMessage(textMessage);
    }

    public void handleMessageListRequest(WebSocketSession session, JsonNode payload)
            throws JsonProcessingException, IOException {
        MessageListRequest messageListRequest = objectMapper.treeToValue(payload, MessageListRequest.class);

        // Load correct messages
        List<Message> messages;
        if (messageListRequest.isGroup()) {
            messages = messageRepository.findMessagesInGroup(messageListRequest.getId());
        } else {
            messages = messageRepository.findMessagesBetweenUsers(userList.get(session).getId(),
                    messageListRequest.getId());
        }

        // Update user info
        ConnectedUser user = userList.get(session);
        user.setActiveChatIsGroup(messageListRequest.isGroup());
        user.setActiveChat(messageListRequest.getId());

        // Send response
        Response<List<Message>> response = new Response<List<Message>>("messages", messages);
        TextMessage textMessage = new TextMessage(objectMapper.writeValueAsString(response));
        session.sendMessage(textMessage);
    }

    public void handleMessage(WebSocketSession session, JsonNode payload) throws JsonProcessingException, IOException {
        Message message = objectMapper.convertValue(payload, Message.class);
        message.setSender(userList.get(session).getId());

        // Check if user is allowed with User Microservice
        String url = "http://" + userServiceHost + ":50010/users/isAllowed/" + message.getSender() + "/"
                + message.getRecipient();
        url += message.isGroupMsg() ? "/group" : "/user";
        Boolean isAllowedResponse = restTemplate.exchange(url, HttpMethod.GET, null, Boolean.class).getBody();
        boolean isAllowed = Boolean.TRUE.equals(isAllowedResponse);
        if (!isAllowed) {
            message.setContent(
                    "You are not allowed to send messages to this user. You are either banned or blocked by this user.");
            updateUser(message.getSender(), message);
            return;
        }

        messageRepository.save(message);

        // Send message to involved users
        if (message.isGroupMsg()) {
            broadcastToGroup(message.getRecipient(), message);
        } else {
            updateUser(message.getSender(), message);
            updateUser(message.getRecipient(), message);
        }
    }

    public void broadcastToGroup(int group, Message message) throws JsonProcessingException, IOException {
        String url = "http://" + userServiceHost + ":50010/users/subscribers/" + group;
        // Get users belonging to group, then broadcast to users who currently selected
        // group
        List<Integer> users = restTemplate
                .exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<Integer>>() {
                }).getBody();
        if (users == null)
            return;
        for (int user : users) {
            ConnectedUser loadedUser = userList.get(user);
            if (loadedUser != null && loadedUser.getActiveChat() == group && loadedUser.isActiveChatIsGroup()) {
                List<Message> messages = List.of(message);
                Response<List<Message>> response = new Response<List<Message>>("messages", messages);
                TextMessage textMessage = new TextMessage(objectMapper.writeValueAsString(response));
                loadedUser.getSession().sendMessage(textMessage);
            }
        }
    }

    public void updateUser(int id, Message message) throws JsonProcessingException, IOException {
        ConnectedUser user = userList.get(id);
        if (user == null) {
            return;
        }

        // Update user list
        List<Integer> newUser = new ArrayList<>();
        boolean needsUpdate = false;
        if (!user.getChats().contains(message.getSender()) && user.getId() != message.getSender()) {
            user.getChats().add(message.getSender());
            newUser.add(message.getSender());
            needsUpdate = true;
        }
        if (!user.getChats().contains(message.getRecipient()) && user.getId() != message.getRecipient()) {
            user.getChats().add(message.getRecipient());
            newUser.add(message.getRecipient());
            needsUpdate = true;
        }
        if (needsUpdate) {
            Response<List<Integer>> response = new Response<List<Integer>>("users", newUser);
            TextMessage textMessage = new TextMessage(objectMapper.writeValueAsString(response));
            user.getSession().sendMessage(textMessage);
        }

        // Update message list
        if (user.getActiveChat() == message.getSender() || user.getActiveChat() == message.getRecipient()) {
            List<Message> messages = List.of(message);
            Response<List<Message>> response = new Response<List<Message>>("messages", messages);
            TextMessage textMessage = new TextMessage(objectMapper.writeValueAsString(response));
            user.getSession().sendMessage(textMessage);
        }
    }
}
