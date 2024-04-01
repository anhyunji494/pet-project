import * as React from "react";
import "./Header.css";
import { useState } from "react";
import ProfileModal from "../Profile/Profile.js";
import { useRef } from "react";
import Modal from "react-modal";
import Profile from "../Profile/Profile.js";
import { useNavigate } from "react-router";
import { useBodyScrollLock } from "../useBodyScrollLock.js";
// import Chat from "../pages/Chat/Chat.js";
import Write from "../Write/Write.js";


const Header = () => {
  // navigate 선언 : 항상 최상단. 위치 바뀌면 안 됨! 
  const navigate = useNavigate();

  // 검색창 핸들러
  const handleSearch = () => {
    // Perform search action
    console.log("Search button clicked");
  };

  const handleProfileClick = () => {
    const currentUser = JSON.parse(sessionStorage.getItem('myInfo'));
    console.log(currentUser);
    if (currentUser) {
      navigate(`/profile/${currentUser.user_nick}`);
    } else {
      // 사용자 정보가 없는 경우 예외 처리
      console.error('No user information found');
    }
  };

  // 모달 컨트롤

  // 모달 사용 시 오버레이 뒷배경 스크롤 막기 
  const {lockScroll, openScroll} = useBodyScrollLock();

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
    <>
      <div className="div">
        <div className="sub-div">
          <button className="button">
            <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/6cf79b0513ee9fc5c15a74aae4d2087f605c197384b09b1b8d029e5759767ba0?apiKey=90aa7ae4bb3148a18366a057ad7e2c00&"
                className="img"
            />
          </button>
          <button className="logo">petwave</button>

          <i className="fi fi-br-home" id="icon"></i>

          <i className="fi fi-br-bell" id="icon"></i>

          <div className="search-div" onClick={handleSearch}>
            <fieldset className="search-fs">
              <input
                  type="text"
                  className="search-input"
                  placeholder="search"
              />
              <i className="fi fi-br-search" id="icon"></i>
            </fieldset>
          </div>

          <i className="fi fi-br-plus" id="icon" onClick={openModal}></i>

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
                  backdropFilter: 'blur(15px)',
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

            <Write/>
            <button id="modal-close-btn" onClick={closeModal}>X</button>
          </Modal>

          <div id="icon">
            <i className="fi fi-br-comments" id="icon" onClick={() => {
              navigate('/chat');
            }}></i>

          </div>

          <i className="fi fi-br-eclipse-alt" id="icon"></i>

          {/*<i className="fi fi-br-paw" id="icon" onClick={()=>{*/}
          {/*  navigate('/profile');*/}
          {/*}}/>*/}
          <i className="fi fi-br-paw" id="icon" onClick={handleProfileClick}></i>

        </div>
      </div>
    </>
  );
};

export default Header;
