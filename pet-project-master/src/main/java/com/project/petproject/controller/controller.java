package com.project.petproject.controller;


import com.project.petproject.dto.userDTO;
import com.project.petproject.service.loginService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class controller {

    private final loginService loginService;

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
    // 매개변수에 필요한 객체 적으면됨
    public ResponseEntity<String> login(userDTO userDTO, HttpSession session) {
        userDTO info = loginService.login(userDTO);
        if (info != null) {
            session.setAttribute("info", info);
            System.out.println(ResponseEntity.ok().body("로그인 성공"));
            return ResponseEntity.ok().body("로그인 성공"); // 로그인 성공 시 200 응답
        } else {
            System.out.println(ResponseEntity.badRequest().body("로그인 실패"));
            return ResponseEntity.badRequest().body("로그인 실패"); // 로그인 실패 시 400 응답
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
    
}
