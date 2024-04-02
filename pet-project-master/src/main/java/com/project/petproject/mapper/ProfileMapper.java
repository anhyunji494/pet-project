package com.project.petproject.mapper;

import org.springframework.stereotype.Component;

import com.project.petproject.dto.UserPublicDTO;

import org.apache.ibatis.annotations.*;

@Mapper
@Component
public interface ProfileMapper {
    
    // 유저 아이디를 기준으로 정보 받아오기
    @Select(" SELECT user_id, user_nick , user_animal , user_info , user_profile_img , joined_at, user_role FROM  USERS WHERE user_id = #{user_id}")
    UserPublicDTO UserProfile(String user_id);

    // 유저 아이디를 기준으로 게시글 받아오기
    @Select()
    
}
