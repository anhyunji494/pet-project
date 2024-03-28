import React, { useEffect, useState } from "react";
import axios from "axios";

const PostsList = () => {
  const [postsList, setPostsList] = useState([]);

  const getPostsList = async () => {
    try {
      const res = await axios.get("/posts/PostsList");

      const responseData = res.data;
      console.log("responseData 정보: ");

      console.log(responseData); // 확인을 위해 서버 응답 로그
      setPostsList(responseData); // 데이터 업데이트
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    getPostsList(); // 1. 게시글 목록 조회 함수 호출
  }, []);

  return (
    <div>
      <div className="body">
        <ul className="post-div">
          <div id="post-photo"></div>
          {postsList.map((post) => (
            <li key={post.post_idx}>
              <p>내용: {post.content}</p>
              {post.file_rname && (
                <div>
                  {/* 사진이 안나온다 이말이야..*/}
                  {post.file_rname.map((fileName, index) => (
                    <img key={index} src={fileName} alt={`사진 ${index}`} />
                  ))}
                </div>
              )}
            </li>
          ))}
          게시판 목록 출력
        </ul>
      </div>
    </div>
  );
};

export default PostsList;
