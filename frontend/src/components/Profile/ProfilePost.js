import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import './ProfilePost.css'; // 스타일 시트를 import합니다.
import PostDetail from "../PostDetail/PostDetail";
import Modal from "react-modal";
import { useBodyScrollLock } from "../useBodyScrollLock";

const ProfilePost = () => {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState(null);
    const [profilePost, setProfilePost] = useState(null);
    const [selectedPostIdx, setSelectedPostIdx] = useState();
    const { user_id } = useParams();

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 프로필 정보 가져오기
                const profileInfoResponse = await axios.get(`/profile_info/${user_id}`);
                setProfileData(profileInfoResponse.data);
                console.log(profileInfoResponse.data);

                // 유저가 작성한 게시글 가져오기
                const profilePostResponse = await axios.get(`/profile_post/${user_id}`);
                setProfilePost(profilePostResponse.data)
                console.log("작성자의 게시물 : " + profilePostResponse.data);
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };

        fetchData();
    }, [user_id]);


    useEffect(() => {
        console.log("selectedPostIdx", selectedPostIdx);
    }, [selectedPostIdx]);

    return (
        <div className="proFilePost">
            <div className="proFilePosts">
            {profilePost && profilePost.map((item, index) => (
                <article className="card" key={index}>
                    <div id="photo-idv" className="articles">
                        <article>
                            <figure>
                                <img
                                    id="photo-content"
                                    src={item.file_rnames[0]}
                                    alt={`사진 ${item.post_idx}`}
                                    onClick={(event) => {
                                        console.log("item", item.post_idx);
                                        setSelectedPostIdx(item.post_idx);
                                        handleDetail(item.post_idx);
                                    }}
                                />
                            </figure>
                        </article>
                    </div>
                </article>
            ))}

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
      zIndex: 10, // 모달 창의 z-index 값을 설정합니다.
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
      zIndex: 11, // 모달 내용의 z-index 값을 설정합니다. (보통 overlay의 값보다 크게 설정합니다.)
    },
  }}
>

            <PostDetail post_idx={selectedPostIdx} />

            <button id="modal-close-btn" onClick={closeModal}>
              X
            </button>
          </Modal>
            </div>

        </div>
    );
};

export default ProfilePost;
