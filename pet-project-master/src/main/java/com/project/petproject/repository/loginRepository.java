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

    public void userUpdate(userDTO userDTO) {
        sql.update("user.update", userDTO);
        System.out.println("return DTO 체크"+userDTO);
    }

    public userDTO login(userDTO userDTO) {
        return sql.selectOne("user.login", userDTO);
    }
}
