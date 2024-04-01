package com.project.petproject.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentDTO {
    private int cmt_idx;
    private int post_idx;
    private String cmt_content;
    private String created_at;
    private int cmt_likes;
    private String user_id;
}
