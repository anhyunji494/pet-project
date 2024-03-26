package com.project.petproject.service;

import com.project.petproject.dto.userDTO;
import com.project.petproject.repository.loginRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
@Service
@RequiredArgsConstructor
public class loginService {
    private final loginRepository loginRepository;

    public void signUp(userDTO userDTO) {
        loginRepository.signUp(userDTO);
    }

    public void userUpdate(userDTO userDTO) {
        loginRepository.userUpdate(userDTO);
    }

    public userDTO login(userDTO userDTO) {
        return loginRepository.login(userDTO);
    }
}