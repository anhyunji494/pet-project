package com.project.petproject.service;

import com.project.petproject.dto.PostWithFileDTO;
import com.project.petproject.dto.userDTO;
import com.project.petproject.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;

    public userDTO list(userDTO userDTO) {
        return profileRepository.list(userDTO);
    }

    public List<PostWithFileDTO> userPosts(String user_id) {
    return profileRepository.userPosts(user_id);
}
    
}
