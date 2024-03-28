import React, { useEffect, useState } from "react";
import axios from "axios";

const PostsList = () => {
// <<<<<<< HEAD
//   const [postsList, setPostsList] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getPostsList = async () => {
//       try {
//         const res = await axios.get("/posts/all");
//         console.log(res.data); // res 데이터를 콘솔에 출력
//         setPostsList(res.data);
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     getPostsList();
//   }, []);

//   return (
//     <div>
//       <div className="body">
//         {error && <div>Error: {error}</div>}
//         <ul className="post-div">
//           {postsList.length > 0 &&
//             postsList.map((post) => (
//               <li key={post.post_idx}>{post.Post_content}</li>
//             ))}
//         </ul>
//       </div>
//     </div>
//   );
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
                    <div id="Post_content"></div>
                    {postsList.map((post) => (
                        <li key={post.post_idx}>
                            <p>내용: {post.content}</p>
                            {post.file_rname && (
                                <div>
                                    {/* 사진이 안나온다 이말이야..*/}
                                    {post.file_rname.map((fileName, index) => (
                                        <img
                                            key={index}
                                            src={fileName}
                                            alt={`사진 ${index}`}
                                        />
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
