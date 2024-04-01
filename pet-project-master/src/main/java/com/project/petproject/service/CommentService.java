package com.project.petproject.service;

import com.project.petproject.dto.CommentDTO;
import com.project.petproject.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    public void newComment(CommentDTO commentDTO) {
        commentRepository.newComment(commentDTO);
    }
}
