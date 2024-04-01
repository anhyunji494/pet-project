import * as React from "react";
import { useBodyScrollLock } from "../useBodyScrollLock";
import { useState } from "react";
import Modal from "react-modal";
import "./PostDetail.css";

const PostDetail = () => {
  return (
    <>
      <div id="newBody">
        <div id="container-postdetail">
          {/* 게시글 컨테이너*/}
          <div id="container-profile-div">
            {/* 프로필 원 */}
            <div id="container-profile-photo"> </div>
            &nbsp;&nbsp;
            {/* 닉네임+자기소개 */}
            <div id="container-profile-text">
              <div id="container-profile-nick">닉네임</div>
              <div id="container-profile-badge">뱃지</div>
            </div>
          </div>
          {/* 게시글 */}
          <div id="container-contents">
            <div id="photo">사진</div>
            <div id="txt">텍스트</div>
          </div>
        </div>
        {/* 댓글 컨테이너 */}
        <div id="container-postdetail">
          {/* 댓글 박스 */}
          <div id="reply-box">
            <div id="reply">messageFrom</div>
            <div id="message-input-box">
              <textarea id="message-input-txt"></textarea>
              <button id="message-input-btn">입력</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetail;
