package com.project.petproject.controller;

import com.project.petproject.dto.PostWithFileDTO;
import com.project.petproject.dto.userDTO;
import com.project.petproject.service.ProfileService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor

public class ProfileController {
    private final ProfileService profileService;

    @GetMapping("/profile_info/{user_id}")
    public userDTO profile(@PathVariable("user_id") String user_id, userDTO userDTO, HttpSession session) {
        System.out.println("param 실행: user_id = " + user_id);
        System.out.println("info: "+session.getAttribute("info"));
        userDTO = profileService.list(userDTO);
        // userId에 대한 작업을 수행합니다.
        return userDTO;
    }
    

    @GetMapping("/profile_post/{user_id}") // 사용자 아이디 값이 일치하는 게시물을 불러오는 엔드포인트
    public ResponseEntity<List<PostWithFileDTO>> getUserPosts(@PathVariable("user_id") String user_id) {
        List<PostWithFileDTO> userPosts = profileService.userPosts(user_id);
        System.out.println("유저게시물 : "+userPosts);
        return ResponseEntity.ok(userPosts);
    }



}
