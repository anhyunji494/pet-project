package com.project.petproject.repository;

import com.project.petproject.dto.Post;
import com.project.petproject.dto.PostWithFileDTO;
import com.project.petproject.dto.UserPublicDTO;
import com.project.petproject.dto.Post_file;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

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
    public List<PostWithFileDTO> list() {
        List<PostWithFileDTO> posts = sql.selectList("post.mainPost");
        System.out.println("list() 전체 게시물 출력이 되었습니다.");
        return posts;
    }

    // 프로필 게시물 불러오기
    public List<PostWithFileDTO> getUserPosts(String user_id) {
        List<PostWithFileDTO> UserPosts = sql.selectList("post.UserPosts", user_id);
        System.out.println(" 유저 게시물 출력이되었습니다.");
        return UserPosts;
    }

    //유저의 프로필 불러오기
    public UserPublicDTO getUserPublic(String user_id){
        UserPublicDTO userPublic = sql.selectOne("user.UserProfile",user_id);
        System.out.println("유저 게시물 출력이되었습니다.");
        return userPublic;
    }

    public List<Post> postDetail(int post_idx) {
        return sql.selectList("post.Detail", post_idx);
    }

    public List<Post> postRank() {
        return sql.selectList("post.rank");
    }
}