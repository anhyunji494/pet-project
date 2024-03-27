package com.project.petprojectconfig;

import org.springframework.lang.Nullable;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class ChatWebSocketHandler extends TextWebSocketHandler {

    @Override
    protected void handleTextMessage(@Nullable WebSocketSession session, @Nullable TextMessage message) throws Exception {
        // 클라이언트로부터 메시지를 받았을 때 실행되는 메서드
        if (message != null) {
            String payload = message.getPayload();
            // 받은 메시지를 로그에 출력하거나 원하는 작업을 수행할 수 있습니다.
            System.out.println("Received message: " + payload);
            
            // 받은 메시지에 대한 응답을 보내는 예시
            if (session != null) {
                session.sendMessage(new TextMessage("Received your message: " + payload));
            }
        }
    }

    @Override
    public void afterConnectionEstablished(@Nullable WebSocketSession session) throws Exception {
        // 클라이언트와의 연결이 확립되었을 때 실행되는 메서드
        if (session != null) {
            System.out.println("Connection established with session id: " + session.getId());
        }
    }

    @Override
    public void afterConnectionClosed(@Nullable WebSocketSession session,@Nullable CloseStatus status) throws Exception {
        // 클라이언트와의 연결이 종료되었을 때 실행되는 메서드
        if (session != null) {
            System.out.println("Connection closed with session id: " + session.getId());
        }
    }
}
