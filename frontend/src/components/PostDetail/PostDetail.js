import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { useBodyScrollLock } from "../useBodyScrollLock";
import Modal from "react-modal";
import "./PostDetail.css";

const PostDetail = () => {
  // 댓글 입력값을 상태로 관리합니다.
  const [comment, setComment] = useState("");

  // 댓글 입력 핸들러
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  // 댓글 전송 핸들러
  const handleSubmitComment = async () => {
    try {
      // 댓글을 서버에 전송합니다.
      const response = await axios.post("/comments/new", { cmt_content: comment });

      // 서버로부터의 응답을 확인합니다.
      console.log("Response from server:", response.data);

      // 댓글 입력 후 댓글 상태를 초기화합니다.
      setComment("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
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
            <textarea
                id="message-input-txt"
                value={comment}
                name="cmt_content" // 댓글 내용의 name을 설정합니다.
                onChange={handleCommentChange}
            ></textarea>
              <button id="message-input-btn" onClick={handleSubmitComment}>
                입력
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default PostDetail;
