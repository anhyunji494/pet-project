package com.project.petproject.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class userDTO {
    private String user_id;
    private String user_pw;
    private String user_email;
    private String user_nick;
    private String user_animal;
    private String user_intro;
    private String user_img;
    private String likes;
    private String dislikes;
    private String location;
    private String birthday;
    private String joinedAt;
    private String user_role;

    private List<FollowDTO> followers; // 팔로워 목록
    private List<FollowDTO> followings; // 팔로잉 목록
}
