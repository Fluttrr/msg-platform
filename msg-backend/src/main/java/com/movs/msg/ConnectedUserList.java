package com.movs.msg;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

@Service
public class ConnectedUserList {
    List<ConnectedUser> users = new ArrayList<>();

    public void put(WebSocketSession session, int id) {
        ConnectedUser newUser = new ConnectedUser(id, session);
        users.add(newUser);
    }

    public ConnectedUser get(int id) {
        for (ConnectedUser user : users) {
            if (user.getId() == id) {
                return user;
            }
        }
        return null;
    }

    public ConnectedUser get(WebSocketSession session) {
        for (ConnectedUser user : users) {
            if (user.getSession() == session) {
                return user;
            }
        }
        return null;
    }

    public void remove(WebSocketSession session) {
        users.remove(get(session));
    }
}
