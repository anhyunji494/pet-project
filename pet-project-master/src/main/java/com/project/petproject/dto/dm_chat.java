package com.project.petproject.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;
import java.sql.Timestamp;

@Component
@Data
@AllArgsConstructor
@NoArgsConstructor
public class dm_chat {
    private int dm_idx; // 채팅의 idx
    private int room_idx; // 해당 채팅이 포함될 채팅방idx
    private String chatter; // 채팅한 사람
    private String dm_content; // 메세지
    private String emoticon; 
    private Timestamp chatter_at ; // 채팅날짜
}
