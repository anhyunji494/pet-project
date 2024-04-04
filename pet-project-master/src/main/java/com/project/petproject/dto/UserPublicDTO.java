package com.project.petproject.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserPublicDTO {
    // 회원 아이디
    private String user_id;
    // 회원 닉네임
    private String user_nick;
    // 회원 동물번호
    private String user_animal;
    // 회원 소개
    private String user_intro;
    // 회원 프로필사진
    private String user_img;
    // 회원 가입일자
    private Timestamp joined_at;
    // 회원 구분
    private String user_role;
}
