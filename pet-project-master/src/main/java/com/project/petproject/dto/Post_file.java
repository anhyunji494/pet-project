package com.project.petproject.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Post_file {
    private int post_idx;
    private int file_idx;
    private String file_rname;
    private String storedName;
    private int file_size;
    private String file_ext;
    private String uploaded_at;
}
