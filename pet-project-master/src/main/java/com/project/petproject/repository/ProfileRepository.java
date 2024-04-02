package com.project.petproject.repository;

import com.project.petproject.dto.userDTO;
import lombok.RequiredArgsConstructor;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor

public class ProfileRepository {

    private final SqlSessionTemplate sql;

    public userDTO list(userDTO userDTO) {
       return sql.selectOne("profile.list", userDTO);
    }
}
