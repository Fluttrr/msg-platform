package com.movs.msg;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.socket.WebSocketSession;

import lombok.Data;

@Data
public class ConnectedUser {
    private final int id;
    private final List<Integer> chats = new ArrayList<>();
    private final WebSocketSession session;
    private int activeChat;
    private boolean activeChatIsGroup = false;
}
