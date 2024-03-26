package com.project.petproject.repository;

import com.project.petproject.dto.Post;
import com.project.petproject.dto.Post_file;
import lombok.RequiredArgsConstructor;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class postRepository {

    //Mybatis 클래스
    private final SqlSessionTemplate sql;

    // 게시글 정보 등록
    public void insertPost (Post post) {
        sql.insert("post.insertPost",post);
    }
    // 사진 등록
    public void insertPostFile(Post_file Post_file){
        sql.insert("post.insertPostFile",Post_file);
    }
    // 글 삭제
    public void deletePost(int post_idx) {
        sql.delete("post.deletePost", post_idx);
    }
    

}