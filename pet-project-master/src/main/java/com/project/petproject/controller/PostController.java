package com.project.petproject.controller;

import com.project.petproject.dto.Post;
import com.project.petproject.dto.PostWithFileDTO;
import com.project.petproject.dto.Post_file;
import com.project.petproject.dto.userDTO;
import com.project.petproject.service.postService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
public class PostController {

    
    private final postService postService;

    // 게시물 추가
    // @PostMapping("/new")
    // public String newPost(Post post) {
    // try {
    // postService.addPost(post, postFiles);
    // return "게시물이 성공적으로 추가되었습니다."; // 게시글로 이동하게끔 수정해야할듯
    // } catch (Exception e) {
    // return "게시물 추가 중 오류 발생: " + e.getMessage();
    // }
    // }

    @PostMapping("/new")
    public String save(Post post, HttpSession session) throws IOException {
        userDTO info = (userDTO) session.getAttribute("info");
        session.getAttribute("info" + info);
        post.setUser_id(info.getUser_id());
        System.out.println("Controller save 확인");
        postService.save(post);
        return "/";
    }

    @GetMapping("/PostsList")
        public ResponseEntity<List<PostWithFileDTO>> list() {
            List<PostWithFileDTO> postsWithFiles = postService.list(); // 게시글 및 파일 목록 조회
            System.out.println();
            System.out.println(postsWithFiles);
            return ResponseEntity.ok(postsWithFiles); // 게시글 및 파일 목록을 응답에 담아 반환
        }

    // 게시물 삭제
    @DeleteMapping("/delete/{post_idx}")
    public String deletePost(@PathVariable("post_idx") int post_idx) {
        try {
            postService.deletePost(post_idx);
            return "redirect:/"; // 삭제 완료 후 메인으로 이동
        } catch (Exception e) {
            return "게시물 삭제 중 오류 발생: " + e.getMessage();
        }
    }



}
