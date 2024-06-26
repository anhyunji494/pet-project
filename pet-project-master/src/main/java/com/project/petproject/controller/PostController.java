package com.project.petproject.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.petproject.dto.Post;
import com.project.petproject.dto.PostWithFileDTO;
import com.project.petproject.dto.userDTO;
import com.project.petproject.service.postService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class PostController {

    private final postService postService;
  

   
    @PostMapping("/posts/new")
    public String save(Post post, HttpSession session) throws IOException {
        userDTO info = (userDTO) session.getAttribute("info");
        post.setUser_id(info.getUser_id());
        System.out.println("Controller save 확인");
        postService.save(post);
        return "/";
    }

    @GetMapping("/images")
        public ResponseEntity<List<PostWithFileDTO>> list() {
            List<PostWithFileDTO> postsWithFiles = postService.list(); // 게시글 및 파일 목록 조회
//            System.out.println(postsWithFiles);
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

     // user_id을 기준으로 유저 게시물 호출
    @GetMapping("/{user_id}")
    public ResponseEntity<List<PostWithFileDTO>> getUserPosts(@PathVariable("user_id") String user_id) {
        try {
            List<PostWithFileDTO> userPosts = postService.getUserPosts(user_id);
            System.out.println(" 유저 게시물 호출 확인");
            return ResponseEntity.ok(userPosts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

//    @GetMapping("/post/{post_idx}")
//    public String postDetail(@PathVariable("post_idx") int post_idx) {
//        postService.postDetail(post_idx);
//        System.out.println("detail 확인");
//        return "";
//    }

    // 게시글 상세보기
    @GetMapping("/post/{post_idx}")
    public ResponseEntity<?> postDetail(@PathVariable("post_idx") int post_idx) {
        List<Post> post = postService.postDetail(post_idx);
        if (post != null) {
            System.out.println("\n"+"게시글상세 정보 "+post);
            return ResponseEntity.ok().body(post);

        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // 랭킹 기능
    @GetMapping("/post/rank")
    public String rank() {
        List<Post> rank = postService.rank();
        ObjectMapper mapper = new ObjectMapper();
        try {
            String jsonRank = mapper.writeValueAsString(rank);
            return jsonRank;
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "Error occurred while processing JSON";
        }
    }

    // 검색 기능
    @GetMapping("/posts/search")
    public ResponseEntity<List<Post>> search(@RequestParam("q") String searchQuery) {
        try {
            List<Post> searchResult = postService.search(searchQuery);
            return ResponseEntity.ok(searchResult);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/posts/weekend")
    public ResponseEntity<List<Post>> weekend(@RequestParam("week") String week) {
        System.out.println("주말");
        try {
            List<Post> searchResult = postService.week(week);
            System.out.println(searchResult);
            return ResponseEntity.ok(searchResult);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/posts/style")
    public ResponseEntity<List<Post>> style(@RequestParam("style") String style) {
        System.out.println("외출");
        try {
            List<Post> searchResult = postService.style(style);
            System.out.println(searchResult);
            return ResponseEntity.ok(searchResult);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
