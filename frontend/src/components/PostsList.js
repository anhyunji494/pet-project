import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PostList.css";

const PostsList = () => {
  const [postsList, setPostsList] = useState([]);

  const getPostsList = async () => {
    const res = (await axios.get("/PostsList")).data; //2. 게시글 목록 데이터에 할당
    console.log(res.data);
    setPostsList(res.data); // 3. postsList 변수에 할당
    console.log(postsList);
  };

  useEffect(() => {
    getPostsList(); // 1. 게시글 목록 조회 함수 호출
  }, []);

  return (
    <div>
      <div className="body">
        <ul className="post-div">
          <div id="content"></div>
          {postsList.map((post) => (
            // 4. map  함수로 데이터 출력
            <li key={post.idx}>{post.storedName} </li>
          ))}
          게시판 목록 출력
        </ul>
      </div>
    </div>
  );
};

export default PostsList;
