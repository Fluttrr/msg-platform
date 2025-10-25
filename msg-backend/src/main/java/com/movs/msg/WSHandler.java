package com.movs.msg;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.movs.msg.dto.Request;

@Service
public class WSHandler extends TextWebSocketHandler {
    List<WebSocketSession> wsSessions = new ArrayList<>();

    @Autowired
    ConnectedUserList userList;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    WSService wsService;

    @Override
    protected void handleTextMessage(@NonNull WebSocketSession session, @NonNull TextMessage message) throws Exception {
        String payload = message.getPayload();
        Request request = objectMapper.readValue(payload, Request.class);

        switch (request.getType()) {
            case "identify":
                wsService.handleIdentifyRequest(session, request.getPayload());
                break;
            case "userlist":
                wsService.handleUserListRequest(session);
                break;
            case "messagelist":
                wsService.handleMessageListRequest(session, request.getPayload());
                break;
            case "sendmessage":
                wsService.handleMessage(session, request.getPayload());
                break;
            default:
                System.out.println("Unknown request type!");
                break;
        }
    }

    @Override
    public void afterConnectionEstablished(@NonNull WebSocketSession session) throws Exception {
        wsSessions.add(session);
    }

    @Override
    public void afterConnectionClosed(@NonNull WebSocketSession session, @NonNull CloseStatus status) throws Exception {
        wsSessions.remove(session);
        userList.remove(session);
    }
}
