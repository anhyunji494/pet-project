package com.project.petproject.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.util.List;

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
    private List<String> post_file;
    private String user_nick;
    private String file_rname;
    private String file_idx;
}
