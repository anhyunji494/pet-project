package com.project.petproject.service;

import com.project.petproject.dto.dm_chat;
import com.project.petproject.dto.dm_room;
import com.project.petproject.repository.chatRepository;

import java.util.List;

public class chatService {
    private final chatRepository chatRepository;

    public chatService(chatRepository chatRepository) {
        this.chatRepository = chatRepository;
    }

    public void saveChatMessage(dm_chat message) {
        chatRepository.saveChatMessage(message);
    }

    public List<dm_chat> getAllChatMessagesByRoomId(int roomId) {
        return chatRepository.getAllChatMessagesByRoomId(roomId);
    }

    public void deleteChatMessage(int messageId) {
        chatRepository.deleteChatMessage(messageId);
    }

    public void saveRoom(dm_room room) {
        chatRepository.saveRoom(room);
    }

    public List<dm_room> getAllRooms() {
        return chatRepository.getAllRooms();
    }
}
