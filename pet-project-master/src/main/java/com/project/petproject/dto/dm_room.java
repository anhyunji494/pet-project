package com.project.petproject.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

import org.springframework.stereotype.Component;


@Component
@Data
@AllArgsConstructor
@NoArgsConstructor
public class dm_room {
    
    private int room_idx;
    private String room_title;
    private String room_desc;
    private Timestamp opened_at;
    private int room_limit;
    private String user_id;
    private String room_is;
}
