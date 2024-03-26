package com.project.petproject.service;

import com.project.petproject.dto.Post;
import com.project.petproject.dto.Post_file;
import com.project.petproject.repository.postRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class postService {

    @Autowired
    private postRepository repository;

    // 게시글을 추가 하는 매서드
    public void addPost(Post post, List<Post_file> postFiles) {
        repository.insertPost(post);
        
        // 사진 수만큼 반복해서 repository.insertPostFile
        for (Post_file postFile : postFiles) {
            repository.insertPostFile(postFile);
        }
    }
    // 게시글을 삭제하는 매서드
    public void deletePost(int post_idx) {
        repository.deletePost(post_idx);
    }
}
