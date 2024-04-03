package com.project.petproject.repository;

import com.project.petproject.dto.CommentDTO;
import lombok.RequiredArgsConstructor;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class CommentRepository {

    private final SqlSessionTemplate sql;

    public void newComment(CommentDTO commentDTO) {
        sql.insert("newComment", commentDTO);
    }

    public List<CommentDTO> list(int postIdx) {
        return sql.selectList("comment.list", postIdx);
    }
}
