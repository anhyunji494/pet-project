package com.project.petproject.controller;

import org.springframework.web.bind.annotation.*;

import com.project.petproject.mapper.ProfileMapper;

@RestController
@CrossOrigin
public class profileController {
    
    private ProfileMapper profileMapper;

        // user id를 기준으로 회원정보 값 mapping
        @GetMapping("/profile/{userId}")
    public Object getUserById(@PathVariable("userId") String userId){
        return profileMapper.UserProfile(userId);
    }
}
