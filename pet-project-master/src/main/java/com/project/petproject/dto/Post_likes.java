package com.project.petproject.dto;
import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.sql.Timestamp;

@Component
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Post_likes {
    private int likes_idx;
    private int Post_idx;
    private String user_id;
    private Timestamp created_at;
    
}
