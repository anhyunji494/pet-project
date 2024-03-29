package com.project.petproject.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.petproject.dto.PostWithFileDTO;
import com.project.petproject.dto.UserPublicDTO;
import com.project.petproject.dto.userDTO;
import com.project.petproject.service.loginService;
import com.project.petproject.service.postService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class controller {

    private final loginService loginService;
    private final postService postService;

    @GetMapping("/api/main")
    public String getMain() {
        return "Hello Spring Boot🎃";
    }

    @GetMapping("/")
    public String home() {
        return "Main"; // Main 컴포넌트를 렌더링하도록 설정
    }

    @PostMapping("/signUp")
    public String signUp(@RequestBody userDTO userDTO) {
        System.out.println("userDTO" + userDTO);
        loginService.signUp(userDTO);
        return "redirect:/";
    }

            @PostMapping("/login")
        public ResponseEntity<String> login(@RequestBody userDTO userDTO, HttpSession session) {
        userDTO info = loginService.login(userDTO);
        if(info != null) {
        session.setAttribute("info", info);
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            String infoJson = objectMapper.writeValueAsString(info);
            System.out.println("\n 로그인 info: " + info);
            return ResponseEntity.ok(infoJson); // 로그인 정보를 JSON 형태로 반환
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error converting object to JSON");
        }
    } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials"); // 인증 실패 시 에러 메시지 반환
    }
}
            
    @PostMapping("/userUpdate")
    public String userUpdate(userDTO userDTO, HttpSession session) {
        System.out.println("컨트롤러 받아올때 : "+userDTO);
        userDTO info = (userDTO) session.getAttribute("info");
        System.out.println("\n info(session으로 받은거): "+info);
        if (info != null) {
            info.setUser_nick(userDTO.getUser_nick());
            info.setUser_pw(userDTO.getUser_pw());
            loginService.userUpdate(info);
        }
        return "redirect:/";
    }
    
    @PostMapping("/user/{user_id}")
    public ResponseEntity<UserPublicDTO> getUserPublic(@PathVariable("user_id") String user_id) {
        try {
            UserPublicDTO userPublic = postService.getUserPublic(user_id);
            System.out.println(" 유저 프로필 호출");
            return ResponseEntity.ok(userPublic);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
}
}
