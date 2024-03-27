package com.project.petprojectconfig;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.web.socket.CloseStatus;

public class TextHandler extends TextWebSocketHandler {

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // 클라이언트로부터 메시지를 받았을 때 실행되는 메서드
        String payload = message.getPayload();
        // 받은 메시지를 로그에 출력하거나 원하는 작업을 수행할 수 있습니다.
        System.out.println("Received message: " + payload);
        
        // 받은 메시지에 대한 응답을 보내는 예시
        session.sendMessage(new TextMessage("Received your message: " + payload));
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // 클라이언트와의 연결이 확립되었을 때 실행되는 메서드
        System.out.println("Connection established with session id: " + session.getId());
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        // 클라이언트와의 연결이 종료되었을 때 실행되는 메서드
        System.out.println("Connection closed with session id: " + session.getId());
    }
}
