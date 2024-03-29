import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./PostList.css";
import { Link, useNavigate } from "react-router-dom";

const PostsList = () => {
  // 라우팅 navigate 선언 !항상 최상단! 
  const navigate = useNavigate();


  // 목록
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

  const [dataObjArr, setDataObjArr] = useState([]);

  useEffect(() => {
    console.log("현재 data", dataObjArr);
  }, [dataObjArr]);

  useEffect(() => {
    // 컴포넌트 마운트 될 때 이미지 경로 불러옴
    axios
      .get("/images")
      .then((response) => {
        // 성공적으로 데이터를 받아온 경우, 이미지 경로 상태 업데이트
        console.log("데이터 받기 성공");
        console.log(response);

        setDataObjArr(response.data);
        console.log(response.data);

        //이미지 경로 담을 빈 배열
        const imagePaths = [];

        //response.data 배열 순회 하면서 각 객체 file_ranme의 경로 가져옴
        response.data.map((item) => console.log("map item", item.file_rnames));
        

        setImages("http://localhost:8085/images/");
      })
      .catch((error) => {
        console.log(error);
        console.log("에러");
      });
  }, []);

  // 상세 게시글 보기 
  const handleDetail = (post_idx)=>{
    console.log('상세 게시글 보기 요청') // 글 idx 넘겨야함 post_idx
    console.log('idx', post_idx)
    
    axios
      .get("/images", {
        post_idx: post_idx,
      })
      .then((response)=>{
        console.log('응답 받기 성공');
        console.log(response);
        // navigate('{/post/'+{}+'}')/
      })
    
    
    
  }



//   // 무한 스크롤 페이징

//   const target = useRef(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     observer.observe(target.current);
//   }, []);

//   function 실행할함수() {
//     setLoading(true);
//     console.log("로딩 실행");
//     setLoading(false);
//   }
// /
//   const observer = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//       // enbry와 observer 출력
//       console.log('entry', entry)
//       if (!entry.isIntersecting) return;
//       if (loading) return; // 로딩중이면 함수 종료 (불필요한 api 호출 방지)

//       // setPage(page+1);

//       실행할함수();
//     });
//   });


//   // 페이지네이션 

//   const [page, setpage] = useState(1); 
//   // 첫 페이지는 자동 1

//   const offset = (page-1) * 4 // 4= 한 페이지에 들어갈 갯구, offset = 데이터 위치

  






  return (
    <div>
      {/* 바디영역 */}
      <div className="body">
        {/* 게시글 들어갈 박스들 */}
        <ul className="post-div">
          <div id="post-photo">

            {/* 게시글 맵핑 */}
            {dataObjArr.map((item, index) => (
              <div id="photo-idv">
                                <img
                  id="photo-content"
                  key={index}
                  src={item.file_rnames[0]}
                  alt={`사진 ${item.post_idx}`}
                  width="100%"
                  height="100%"

                  onClick={(event)=>handleDetail(item.post_idx)}
                />

                {/* <div>{dataObjArr.map((item, 여기적기))}</div>/ */}
              </div>
            ))}



          </div>
        </ul>
      </div>

      {/* 무한스크롤
      <div style={{ height: "1000px", backgroundColor: "green" }}></div>
      <div
        id="scrillEnd"
        style={{ height: "20px", backgroundColor: "red" }}
        ref={target}
      ></div>*/}
    </div>
  );
};

export default PostsList;
