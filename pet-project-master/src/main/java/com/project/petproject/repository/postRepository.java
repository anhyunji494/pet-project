package com.project.petproject.repository;

import com.project.petproject.dto.Post;
import com.project.petproject.dto.PostWithFileDTO;
import com.project.petproject.dto.Post_file;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class postRepository {

    //Mybatis 클래스
    private final SqlSessionTemplate sql;

    public Post insertPost(Post post) {
        sql.insert("post.insertPost", post);
        System.out.println("insert");
        return post;
    }

//    public List<Post> selectPost(Post post) {
//        return sql.selectList("post.selectPost", post);
//    }

    public void saveFile(Post_file postFile) {
        sql.insert("post.saveFile", postFile);
        System.out.println("saveFile 성공");
        System.out.println("postFile정보: " + postFile);
    }

    // 게시글 정보 등록

    // 사진 등록
//    public void insertPostFile(Post_file Post_file) {
//        sql.insert("post.insertPosts", Post_file);
//
//    }

    // 글 삭제
    public void deletePost(int post_idx) {
        sql.delete("post.deletePost", post_idx);
    }

    // 전체 게시물 불러오기
    public List<Post> getMainPost() {
        return sql.selectList("post.mainPost");
    }

    public List<PostWithFileDTO> list() {
        List<PostWithFileDTO> posts = sql.selectList("post.mainPost");
        System.out.println("list() 메서드의 실행이 완료되었습니다.");
        return posts;
    }

}