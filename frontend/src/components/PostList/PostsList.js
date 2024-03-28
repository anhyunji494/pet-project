import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PostList.css";

const PostsList = () => {
    const [postsList, setPostsList] = useState([]);
    const [images, setImages] = useState([]);
//   const getPostsList = async () => {
//     try {
//       const res = await axios.get("/posts/PostsList");

//       const responseData = res.data;
//       console.log("responseData 정보: ");

//       console.log(responseData); // 확인을 위해 서버 응답 로그
//       setPostsList(responseData); // 데이터 업데이트
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     }
//   };

    useEffect(()=>{
        // 컴포넌트 마운트 될 때 이미지 경로 불러옴
        axios.get('/posts/PostsList')
        .then(response =>{
            // 성공적으로 데이터를 받아온 경우, 이미지 경로 상채 업데이트
            setImages(response.data)
        })
        .catch(error=>{
            console.log(error);
            console.log('에러')
        });
    }, [])


//   useEffect(() => {
//     getPostsList(); // 1. 게시글 목록 조회 함수 호출
//   }, []);




  return (
    <div>
      <div className="body">
        <ul className="post-div">
          <div id="post-photo"></div>
          {postsList.map((post) => (
            <li key={post.post_idx}>
            
              <p>내용: {post.content}</p>
              <img src='{post.file_rname}' alt="" />
            </li>
          ))}
          게시판 목록 출력
        </ul>
      </div>
    </div>
  );
};

export default PostsList;
