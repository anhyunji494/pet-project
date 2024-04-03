import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./PostList.css";
import { Link, useNavigate } from "react-router-dom";
import PostDetail from "../PostDetail/PostDetail";
import Modal from "react-modal";
import { useBodyScrollLock } from "../useBodyScrollLock";

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

  // 선택된 게시글의 idx를 저장할 상태
  const [selectedPostIdx, setSelectedPostIdx] = useState();

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
    console.log("session", sessionStorage.getItem("user"));
    // 실제 하실 때는 객체형태니까 json 파싱 작업이 필요함
    // 참고 : https://sanghye.tistory.com/14
  }, []);

  useEffect(() => {
    console.log("selectedPostIdx", selectedPostIdx);
  }, [selectedPostIdx]);

  // 상세 게시글 보기
  const handleDetail = (post_idx) => {




    console.log("상세 게시글 보기 요청"); // 글 idx 넘겨야함 post_idx
    console.log("idx", post_idx);
    setSelectedPostIdx(post_idx);
    //    console.log('selectedPostIdx',selectedPostIdx);
    // setModalIsOpen(true); // 모달 열기 <-- 이 부분을 아래로 이동하세요
    openModal(); // 모달 열기 함수 호출
    //   .get("/images", {
    //     post_idx: post_idx,
    //   })
    //   .then((response) => {
    //     console.log("응답 받기 성공");
    //     console.log(response);
    //     // navigate('{/post/'+{}+'}')/
    //   })
    //   .catch((error) => {
    //     console.log("error", error);
    //   });
  };


  // 상세 게시글 모달 컨트롤

  // 모달 컨트롤
  // 모달 사용 시 오버레이 뒷배경 스크롤 막기
  const { lockScroll, openScroll } = useBodyScrollLock();

  // 모달 오픈/클로즈
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    lockScroll();
    setModalIsOpen(true);
  };

  const closeModal = () => {
    openScroll();
    setModalIsOpen(false);
  };

  return (
    <div>
      {/* 바디영역 */}
      <div className="body">
        {/* 게시글 들어갈 박스들 */}
        <ul className="post-div">



          {/* 주제별 분할 - 장소 */}
          <div id="place">
            <div id="place-txt">
              <div id="div-title">🙋‍♀️ 주말에 어디가지?</div>
              <div id="title-tags" style={{ color: "black" }}>
                #반려동물동반
              </div>
              <div id="title-tags"style={{ color: "white", backgroundColor:'green' }}>#이색카페</div>
            </div>
            <div id="post-divs">
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
                      onClick={(event) => {
                        console.log("item", item.post_idx);
                        setSelectedPostIdx(item.post_idx);
                        handleDetail(item.post_idx);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 주제별 분할 */}
          <div id="place">
            <div id="place-txt">
              <div id="div-title">✨ 스타일링은 여기가 맛집</div>
              <div id="title-tags" style={{ color: "black" , background:'rose'}}>
                #미용
              </div>
              <div id="title-tags" style={{ color: "white" , background:'purple'}}>
                #외출
              </div>
            </div>
            <div id="post-divs">
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
                      onClick={(event) => {
                        console.log("item", item.post_idx);
                        setSelectedPostIdx(item.post_idx);
                        handleDetail(item.post_idx);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 주제별 분할 */}
          <div id="place">
            <div id="place-txt">
              <div id="div-title">🪐 엄마 나도 티니핑</div>
              <div id="title-tags" style={{ color: "black" , backgroundColor:'skyblue'}}>
                #반려동물장난감
              </div>
            </div>
            <div id="post-divs">
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
                      onClick={(event) => {
                        console.log("item", item.post_idx);
                        setSelectedPostIdx(item.post_idx);
                        handleDetail(item.post_idx);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>








          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={{
              overlay: {
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.52)",
                backdropFilter: "blur(5px)",
              },
              content: {
                position: "absolute",
                top: "40px",
                left: "40px",
                right: "40px",
                bottom: "40px",
                border: "none",
                background: "rgba(0, 0, 0, 0)",
                overflow: "auto",
                WebkitOverflowScrolling: "touch",
                borderRadius: "4px",
                outline: "none",
                padding: "20px",
              },
            }}
          >
            <PostDetail post_idx={selectedPostIdx} />

            <button id="modal-close-btn" onClick={closeModal}>
              X
            </button>
          </Modal>
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
