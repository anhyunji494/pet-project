package com.project.petproject.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.petproject.dto.CommentDTO;
import com.project.petproject.dto.userDTO;
import com.project.petproject.service.CommentService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @PostMapping("/comments/new/{post_idx}")
    public String newComment(@PathVariable("post_idx") int postIdx, @RequestBody CommentDTO commentDTO, HttpSession session) {
        userDTO info = (userDTO) session.getAttribute("info");
        commentDTO.setUser_id(info.getUser_id());

        // URL 경로에서 받아온 post_idx 값을 사용합니다.
        System.out.println("Received post_idx from URL path: " + postIdx);

        // CommentDTO에 post_idx 설정
        commentDTO.setPost_idx(postIdx);

        commentDTO.setCmt_content(commentDTO.getCmt_content());
        System.out.println("Comment 등록");
        System.out.println("Received comment data: " + commentDTO);
        commentService.newComment(commentDTO);
        return "";
    }

//    @GetMapping("/comments/{post_idx}")
//    public String commentList(@PathVariable("post_idx") int post_idx) {
//        System.out.println(post_idx);
//        // 댓글 목록
//        List<CommentDTO> comments = commentService.list(post_idx);
////        System.out.println(comments);
//        ObjectMapper objectMapper = new ObjectMapper();
//        String commentsJson = "";
//        try {
//            commentsJson = objectMapper.writeValueAsString(comments);
//        } catch (JsonProcessingException e) {
//            e.printStackTrace();
//        }
//        System.out.println(commentsJson);
//        return commentsJson;
//    }

    @GetMapping("/comments/{post_idx}")
    @ResponseBody
    public List<CommentDTO> commentList(@PathVariable("post_idx") int post_idx) {
        System.out.println(post_idx);
        // 댓글 목록
        List<CommentDTO> comments = commentService.list(post_idx);
        System.out.println(comments);
        return comments;
    }

}


