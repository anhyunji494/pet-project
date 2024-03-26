package com.project.petproject.repository;

import com.project.petproject.dto.userDTO;
import lombok.RequiredArgsConstructor;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class loginRepository {

    //Mybatis 클래스
    private final SqlSessionTemplate sql;

    public void signUp(userDTO userDTO) {

        sql.insert("user.signUp", userDTO);
    }
}
