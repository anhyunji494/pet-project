package com.project.petproject.controller;

import com.project.petproject.dto.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    // "/chat.sendMessage" 목적지로 메시지가 도착하면 이 메소드가 처리합니다.
    // 받은 메시지를 받은 그대로 "/topic/public" 주제에 브로드캐스트합니다.
    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
        return chatMessage;
    }

    // "/chat.addUser" 목적지로 메시지가 도착하면 이 메소드가 처리합니다.
    // 메시지에 포함된 사용자명을 WebSocket 세션 속성에 추가하고,
    // 그 메시지를 "/topic/public" 주제에 브로드캐스트합니다.
    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public ChatMessage addUser(@Payload ChatMessage chatMessage,
                               SimpMessageHeaderAccessor headerAccessor) {
        // WebSocket 세션에 사용자명 추가
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        return chatMessage;
    }

}
