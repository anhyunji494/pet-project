// package com.project.petproject.controller;

// import com.project.petproject.dto.ChatMessage;
// import org.springframework.messaging.handler.annotation.MessageMapping;
// import org.springframework.messaging.handler.annotation.Payload;
// import org.springframework.messaging.handler.annotation.SendTo;
// import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
// import org.springframework.stereotype.Controller;

// @Controller
// public class ChatController {

//     @MessageMapping("/chat.sendMessage")
//     @SendTo("/topic/public")
//     public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
//         System.out.println("메세지 보내기 완료");
//         return chatMessage;
//     }

//     @MessageMapping("/chat.addUser")
//     @SendTo("/topic/public")
//     public ChatMessage addUser(@Payload ChatMessage chatMessage,
//                                SimpMessageHeaderAccessor headerAccessor) {
//         // Add username in web socket session
//         headerAccessor.getSessionAttributes().put("user_nick", chatMessage.getSender());
//         System.out.println("세션에 닉네임 추가완료");
//         return chatMessage;
//     }

// }

package com.project.petproject.controller;
import com.project.petproject.mapper.ChatMapper;
import com.project.petproject.dto.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class ChatController {

    @Autowired
    private ChatMapper chatMapper;

    @Autowired
    public Chat chat;

    @GetMapping("/chats/allchats/{sessionId}")
        public ResponseEntity<List<Chat>> getChatsBySessionId(@PathVariable("sessionId") String sessionId) {
        System.out.print("[getChatsBySessionId]");
        List<Chat> chats = chatMapper.getChatsBySessionId(sessionId);
        System.out.print(chats.size());
        return ResponseEntity.ok(chats);
    }
    

    @GetMapping("/chats/sessionid/{sessionId}")
    public Object getLatestSession(@PathVariable("sessionId") String sessionId){
        return chatMapper.getLatestTime(sessionId);
    }

    @PostMapping("/chats/new")
    public Integer newChat(@RequestBody String content) throws JsonProcessingException{
        ObjectMapper objectMapper = new ObjectMapper();
        chat = objectMapper.readValue(content, Chat.class);
        chatMapper.createChat(chat.getSessionId(), chat.getUserId(), chat.getChatContent(), chat.getChatTimestamp());
        return 1;

        // @PostMapping("/chats/new")
        // public Integer newChat(@RequestBody Chat chat) {
        // chatMapper.createChat(chat.getSessionId(), chat.getUserId(), chat.getChatContent(), chat.getChatTimestamp());
        // return 1;
        // }
    }
}
