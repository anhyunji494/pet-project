package com.project.petproject.controller;


import com.project.petproject.dto.dm_chat;
import com.project.petproject.dto.dm_room;
import com.project.petproject.service.chatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {
    private final chatService chatService;

    @Autowired
    public ChatController(chatService chatService) {
        this.chatService = chatService;
    }

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public dm_chat sendMessage(dm_chat message) {
        chatService.saveChatMessage(message);
        return message;
    }

    @MessageMapping("/room.createRoom")
    @SendTo("/topic/public")
    public dm_room createRoom(dm_room room) {
        chatService.saveRoom(room);
        return room;
    }
}
