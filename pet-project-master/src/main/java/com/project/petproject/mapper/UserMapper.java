package com.project.petproject.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import com.project.petproject.dto.userDTO;

@Mapper
@Component
public interface UserMapper {
    
    @Select("SELECT * FROM users")
    List<userDTO> getAllUsers();


}
