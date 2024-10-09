package org.example.bookstore.websocket;

import jakarta.websocket.*;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

@ServerEndpoint("/websocket/transfer/{userID}")
@Component
public class WebSocketServer {
    private static final ConcurrentHashMap<String, Session> SESSIONS
            = new ConcurrentHashMap<>();
    @OnMessage
    public void onMessage(String message) {
        System.out.println("服务器收到消息：" + message);
    }

    @OnOpen
    public void onOpen(Session session, @PathParam("userID") String userID) {
        System.out.println("onOpen by:"+userID);
        if (SESSIONS.get(userID) != null) {
            return;
        }
        SESSIONS.put(userID, session);
        System.out.println(userID + "上线了");
    }

    @OnClose
    public void onClose(@PathParam("userID")String userID) {
        SESSIONS.remove(userID);
        System.out.println(userID + "下线了");
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        System.out.println("发生错误");
        throwable.printStackTrace();
    }

    public void sendMessage(Session toSession, String message) {
        if (toSession != null) {
            try {
                toSession.getBasicRemote().sendText(message);
            } catch (IOException e) {
                e.printStackTrace();
            }
        } else {
            System.out.println("对方不在线");
        }
    }

    public void sendMessageToUser(String user, String message) {
        System.out.println("send Message to"+user);
        System.out.println(SESSIONS);
        Session toSession = SESSIONS.get(user);
        sendMessage(toSession, message);
        System.out.println(message);
    }
}
