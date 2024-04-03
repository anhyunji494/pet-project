package com.project.petproject.repository;

import com.project.petproject.dto.PostWithFileDTO;
import com.project.petproject.dto.userDTO;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor

public class ProfileRepository {

    private final SqlSessionTemplate sql;

    public userDTO list(userDTO userDTO) {
       return sql.selectOne("profile.list", userDTO);
    }

    public List<PostWithFileDTO> userPosts(String user_id) {
    return sql.selectList("post.UserPosts", user_id);
}

}
