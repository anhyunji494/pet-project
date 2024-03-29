import React, { useEffect, useState } from "react";
import axios from "axios";

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



      // 세션에 값이 있는지 없는지? 
      console.log('session',sessionStorage.getItem('user'))
      // 실제 하실 때는 객체형태니까 json 파싱 작업이 필요함 
      // 참고 : https://sanghye.tistory.com/14
  }, []);

  return (
    <div>
      <div className="body">
        <ul className="post-div">
          <div id="post-photo">
            {dataObjArr.map((item, index) => (
              <div id="photo-idv">
                <img
                  id="photo-content"
                  key={index}
                  src={item.file_rnames[0]}
                  alt={`사진 ${index}`}
                  width="100%"
                  height="100%"
                />
              </div>
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default PostsList;
