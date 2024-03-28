package com.project.petproject.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostWithFileDTO {
    private int post_idx;
    private String content;
    private List<String> file_rnames; // 파일 이름들을 담는 리스트
}
