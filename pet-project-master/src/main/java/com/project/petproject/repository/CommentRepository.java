package com.project.petproject.repository;

import com.project.petproject.dto.CommentDTO;
import lombok.RequiredArgsConstructor;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class CommentRepository {

    private final SqlSessionTemplate sql;

    public void newComment(CommentDTO commentDTO) {
        sql.insert("newComment", commentDTO);
    }
}
