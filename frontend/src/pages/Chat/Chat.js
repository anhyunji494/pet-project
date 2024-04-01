import React, { useEffect, useState } from "react";
import "./Chat.css";

function Chat() {
  return (
    <>
      <div id="newBody">
        <div id="container">
          {/* 채팅 리스트*/}
          <div id="container-list">
            {/* 카드 리스트 */}
            <div id="container-card">
              {/* 프로필 원 */}
              <div id="container-profile"> </div>
              &nbsp;&nbsp;
              {/* 닉네임+자기소개 */}
              <div id="container-profile-text">
                <div id="container-profile-nick">닉네임</div>
                <div id="container-profile-last-chat">채팅내용</div>
              </div>
            </div>
          </div>
          {/* 채팅 컨테이너 */}
          <div id="chat-container">
            {/* 채팅 박스 */}
            <div id="chat-box">
              <div id="message-from">messageFrom</div>
              <div id="message-to">
                <span id="message-txt">messageTo</span>
              </div>
              <div id="message-input-box">
                <textarea id="message-input-txt"></textarea>
                <button id="message-input-btn">전송</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Chat;
