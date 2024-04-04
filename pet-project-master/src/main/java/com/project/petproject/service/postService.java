package com.project.petproject.service;

import com.project.petproject.dto.Post;
import com.project.petproject.dto.PostWithFileDTO;
import com.project.petproject.dto.Post_file;
import com.project.petproject.dto.UserPublicDTO;
import com.project.petproject.repository.postRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class postService {

    @Autowired
    private postRepository repository;
    // 게시글을 삭제하는 매서드

    public void deletePost(int post_idx) {
        repository.deletePost(post_idx);
    }

    public void save(Post post) throws IOException {
        // 포스트에서 파일 리스트를 가져옵니다.
        Post info = repository.insertPost(post);
        System.out.println("info 값: " + info);
        try {
            List<String> files = post.getPost_file();
            System.out.println(files);
            if (files == null) {
                System.out.println("files 변수가 null입니다.");
                // null이면 처리를 중지하고 메서드를 종료
                return;
                
            }
            
            for (String file : files) {
                // 파일 정보 설정
                Post_file postFile = new Post_file();
                postFile.setPost_idx(info.getPost_idx());
    
                // 클라이언트에서 이미지 파일의 URL을 받아와서 file_rname 필드에 저장
                postFile.setFile_rname(file);
                postFile.setStoredName(file);
                // postFile을 데이터베이스에 저장
                repository.saveFile(postFile);
            }
        } catch (Exception e) {
            // 데이터베이스 작업에 실패한 경우 예외가 발생합니다.
            // 실패를 처리할 코드를 여기에 작성합니다.
            System.out.println("포스트를 데이터베이스에 추가하는 데 실패했습니다.");
            e.printStackTrace();
        }
    }
    
    
    private String saveFileToServer(MultipartFile file) {
        // 파일을 서버에 저장하는 로직을 구현하여 파일 경로를 반환합니다.
        // 예를 들어, 파일을 업로드할 디렉토리를 지정하고 파일을 해당 디렉토리에 저장한 후 파일 경로를 반환할 수 있습니다.
        // 이는 프로젝트의 요구사항에 따라 다르므로 적절한 로직을 구현하십시오.
        return "/uploads/" + file.getOriginalFilename();
    }

     // 전체 게시물을 불러오는 코드
    public List<PostWithFileDTO> list() {
        return repository.list();
    }

     // 해당 유저의 게시물을 불러오는 코드
    public List<PostWithFileDTO> getUserPosts(String user_id) {
        return repository.getUserPosts(user_id);
    }

     // 해당 유저의 프로필을 불러오는 코드
    public UserPublicDTO getUserPublic(String user_id){
        return repository.getUserPublic(user_id);
    }

    public List<Post> postDetail(int post_idx) {
        return repository.postDetail(post_idx);
    }

    public List<Post> rank() {
        return repository.postRank();
    }

    public List<Post> search(String searchQuery) {
        return repository.search(searchQuery);
    }

    public List<Post> week(String week) {
        return repository.week(week);
    }
}

