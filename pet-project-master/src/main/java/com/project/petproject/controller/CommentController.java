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
        
        // 프론트엔드에서 보낸 post_idx 값을 commentDTO에서 직접 가져옵니다.
        int postIdxFromFrontend = commentDTO.getPost_idx();
        System.out.println("Received post_idx from frontend: " + postIdxFromFrontend);
        
        // 기존의 임의로 지정한 post_idx 설정 부분을 삭제합니다.
        // commentDTO.setPost_idx(33); // 임의로 지정한거
    
        commentDTO.setCmt_content(commentDTO.getCmt_content());
        System.out.println("Comment 등록");
        System.out.println("Received comment data: " + commentDTO);
        commentService.newComment(commentDTO);
        return "";
    }

}
