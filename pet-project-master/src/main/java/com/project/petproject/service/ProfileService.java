package com.project.petproject.service;

import com.project.petproject.dto.userDTO;
import com.project.petproject.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;

    public userDTO list(userDTO userDTO) {
        return profileRepository.list(userDTO);
    }
}
