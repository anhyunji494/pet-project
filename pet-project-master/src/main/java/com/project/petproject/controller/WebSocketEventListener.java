package com.project.petproject.controller;

import com.project.petproject.dto.ChatMessage;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
@Log
public class WebSocketEventListener {

    // 메시지 전송을 위한 Spring의 SimpMessageSendingOperations 객체 주입
    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    // WebSocket 연결 이벤트를 처리하는 메소드
    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        log.info("새로운 연결이 들어왔습니다.");
    }

    // WebSocket 연결 종료 이벤트를 처리하는 메소드
    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        // WebSocket 세션에서 사용자명 가져오기
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String username = (String) headerAccessor.getSessionAttributes().get("username");

        // 사용자명이 존재하면
        if (username != null) {
            log.info("사용자가 나갔습니다: " + username);

            // 채팅 메시지 생성 및 브로드캐스트
            ChatMessage chatMessage = new ChatMessage();
            chatMessage.setType(ChatMessage.MessageType.LEAVE);
            chatMessage.setSender(username);
            messagingTemplate.convertAndSend("/topic/public", chatMessage);
        }
    }
}
