package com.project.petproject.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class userDTO {
    // 회원 아이디 회원 아이디
    private String user_id;

    // 회원 비밀번호 회원 비밀번호
    private String user_pw;

    // 회원 이메일 회원 이메일
    private String user_email;

    // 회원 닉네임 회원 닉네임
    private String user_nick;

    // 회원 동물번호 회원 동물번호
    private String user_animal;

    // 회원 소개 회원 소개
    private String user_info;

    // 회원 프로필사진 회원 프로필사진
    private String user_profile_img;

    // 회원 가입일자 회원 가입일자
    private Timestamp joined_at;

    // 회원 구분 회원 구분
    private String user_role;
}
