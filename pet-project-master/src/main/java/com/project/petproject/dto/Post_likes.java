package com.project.petproject.dto;
import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Component
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Post_likes {
    private int likes_idx;
    private int Post_idx;
    private String user_id;
    private String created_at;
    
}
