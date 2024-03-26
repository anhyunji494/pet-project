package com.project.petproject.controller;

import com.project.petproject.dto.userDTO;
import com.project.petproject.service.loginService;
import lombok.RequiredArgsConstructor;
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
    public String signUp(userDTO userDTO) {
        System.out.println("userDTO" + userDTO);
        loginService.signUp(userDTO);
        return "redirect:/";
    }
}
