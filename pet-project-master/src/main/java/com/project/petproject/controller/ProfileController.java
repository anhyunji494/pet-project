package com.project.petproject.controller;

import com.project.petproject.dto.userDTO;
import com.project.petproject.service.ProfileService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor

public class ProfileController {
    private final ProfileService profileService;

    @GetMapping("/profile/{user_nick}")
    public userDTO profile(@PathVariable("user_nick") String user_nick, userDTO userDTO, HttpSession session) {
        System.out.println("param 실행: user_nick = " + user_nick);
        System.out.println("info: "+session.getAttribute("info"));
        userDTO = profileService.list(userDTO);
        // userId에 대한 작업을 수행합니다.
        return userDTO;
    }


}
