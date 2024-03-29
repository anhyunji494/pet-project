import * as React from "react";
import "./Header.css";
import { useState } from "react";
import ProfileModal from "../Profile/Profile.js";
import { useRef } from "react";
import Modal from "react-modal";
import Profile from "../Profile/Profile.js";
import { useNavigate } from "react-router";

const Header = () => {
  // navigate 선언 : 항상 최상단. 위치 바뀌면 안 됨! 
  const navigate = useNavigate();

  // 검색창 핸들러
  const handleSearch = () => {
    // Perform search action
    console.log("Search button clicked");
  };

  // 모달 컨트롤
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
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

          <i className="fi fi-br-plus" id="icon"></i>
          <div id="icon">
            <i className="fi fi-br-comments" id="icon" onClick={openModal}></i>
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
              <Profile />
              <button onClick={closeModal}>닫기</button>
            </Modal>
          </div>

          <i className="fi fi-br-eclipse-alt" id="icon"></i>

          <i className="fi fi-br-paw" id="icon" onClick={()=>{
            navigate('/profile');
          }}/>
        </div>
      </div>
    </>
  );
};

export default Header;
