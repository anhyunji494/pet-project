package com.project.petproject.controller;

import com.project.petproject.dto.Post;
import com.project.petproject.dto.Post_file;
import com.project.petproject.service.postService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostController {

    @Autowired
    private postService postService;

    // 게시물 추가
    @PostMapping("/new")
    public String newPost(@RequestBody Post post, @RequestBody List<Post_file> postFiles) {
        try {
            postService.addPost(post, postFiles);
            return "게시물이 성공적으로 추가되었습니다."; // 게시글로 이동하게끔 수정해야할듯
        } catch (Exception e) {
            return "게시물 추가 중 오류 발생: " + e.getMessage();
        }
    }

    // 게시물 삭제
    @DeleteMapping("/delete/{post_idx}")
    public String deletePost(@PathVariable("post_idx") int post_idx) {
        try {
            postService.deletePost(post_idx);
            return "redirect:/";  // 삭제 완료 후 메인으로 이동
        } catch (Exception e) {
            return "게시물 삭제 중 오류 발생: " + e.getMessage();
        }
    }
}
