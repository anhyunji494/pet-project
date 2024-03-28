package com.project.petproject.service;

import com.project.petproject.dto.Post;
import com.project.petproject.dto.PostWithFileDTO;
import com.project.petproject.dto.Post_file;
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

    // 게시글을 추가 하는 매서드
//    public void addPost(Post post, List<Post_file> postFiles) {
//        repository.insertPost(post);
//
//        // 사진 수만큼 반복해서 repository.insertPostFile
//        for (Post_file postFile : postFiles) {
//            repository.insertPostFile(postFile);
//        }
//    }

    // 게시글을 삭제하는 매서드
    public void deletePost(int post_idx) {

        repository.deletePost(post_idx);
    }
//    public boolean insertPost(Post post) {
//        // 포스트를 데이터베이스에 추가하고, 추가된 포스트의 식별자를 반환
//        boolean postId = repository.insertPost(post);
//        return postId;
//    }

    public void save(Post post) throws IOException {
        // 포스트에서 파일 리스트를 가져옵니다.
        Post_file postFile = new Post_file();
        Post info = repository.insertPost(post);
        System.out.println("info 값: " + info);

        postFile.setPost_idx(info.getPost_idx());

        try {
            List<MultipartFile> files = post.getPost_file();

            if (files == null) {
                System.out.println("files 변수가 null입니다.");
                // null이면 처리를 중지하고 메서드를 종료
                return;
            }
            for (MultipartFile file : files) {

                String originalFilename = file.getOriginalFilename();
                // 사이즈
                long fileSize = file.getSize(); // 파일 크기 (바이트)
//                double fileSizeInMB = (double) fileSize / (1024 * 1024); // 파일 크기 (메가바이트)
//                postFile.setFile_size((int) Math.ceil(fileSizeInMB)); // 올림하여 정수로 변환하여 저장
//
                postFile.setFile_size((int) fileSize);
                // 확장명을 분리합니다.
                int lastIndex = originalFilename.lastIndexOf('.');
                String filenameWithoutExtension = originalFilename.substring(0, lastIndex);
                String ext = originalFilename.substring(lastIndex + 1);

                postFile.setFile_ext(ext);

                // 저장할 파일 이름 생성
                String uuid = UUID.randomUUID().toString();
                String storedFileName = uuid + "_" + filenameWithoutExtension + "." + ext;

                // 파일 저장 경로 설정 (여기서는 macOS 기준으로 설정되어 있습니다.)
                String savePath = "/Users/donghyeokkim/Documents/down/" + storedFileName;
                // String savePath = "C:/development/intellij_community/spring_upload_files/" + storedFileName; // 윈도우 경로

                // 파일을 서버에 저장합니다.
                file.transferTo(new File(savePath));
                // 포스트 파일 정보를 생성하고 저장
                // 원본은 확장명 빼고 저장
                postFile.setFile_rname(savePath);
//                postFile.setFile_rname(filenameWithoutExtension);

                postFile.setStoredName(storedFileName);


                // 파일 저장용 폴더에 파일 저장 처리
                repository.saveFile(postFile);
            }

        } catch (Exception e) {
            // 데이터베이스 작업에 실패한 경우 예외가 발생합니다.
            // 실패를 처리할 코드를 여기에 작성합니다.
            System.out.println("포스트를 데이터베이스에 추가하는 데 실패했습니다.");
            e.printStackTrace();
        }
    }


    public List<PostWithFileDTO> list() {

        return repository.list();
    }

}


