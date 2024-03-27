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
public class Post {
    private int post_idx;
    private String Post_content;
    private Timestamp posted_at;
    private int post_views;
    private int post_likes;
    private String user_id;
}
