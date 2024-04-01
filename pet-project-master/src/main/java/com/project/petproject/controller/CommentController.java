package com.project.petproject.controller;

import com.project.petproject.dto.CommentDTO;
import com.project.petproject.dto.userDTO;
import com.project.petproject.service.CommentService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @PostMapping("/comments/new")
    public String newComment(@RequestBody CommentDTO commentDTO, HttpSession session) {
        userDTO info = (userDTO) session.getAttribute("info");
        commentDTO.setUser_id(info.getUser_id());
        commentDTO.setPost_idx(16); // 임의로 지정한거
        commentDTO.setCmt_content(commentDTO.getCmt_content());
        System.out.println("Comment 등록");
        commentService.newComment(commentDTO);
        return "";
    }

}
