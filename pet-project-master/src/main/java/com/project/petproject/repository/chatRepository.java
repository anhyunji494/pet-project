package com.project.petproject.repository;


import com.project.petproject.dto.dm_chat;
import com.project.petproject.dto.dm_room;

import java.util.List;

public interface chatRepository {
    void saveChatMessage(dm_chat message);
    List<dm_chat> getAllChatMessagesByRoomId(int room_id);
    void deleteChatMessage(int messageId);

    void saveRoom(dm_room room);
    List<dm_room> getAllRooms();
}
