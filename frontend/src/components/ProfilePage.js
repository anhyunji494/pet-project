import * as React from "react";
import "./ProfilePage.css";
import { Link } from "react-router-dom";

const Birthday = () => {
  "0000.00.00";
};

const tags = () => {
  "tags";
};

function ProfilePage() {
  return (
    <div id="body">
        <div className="profile-box">
          <div className="profile-photo"></div>
          <div className="name">반려동물 이름</div>
          <div className="birthday">
          <i class="fi fi-br-cake-birthday"></i>
          &nbsp;
            0000.00.00
          </div>
          <div className="tags">태그</div>
        </div>
        <div className="content-box">
          <div className="intro">한줄소개</div>
          <div className="likes">
            <i class="fi fi-sr-thumbs-up"></i>
            <span className="profile-text">좋아하는 것</span>
          </div>
          <div className="dislikes">
            <i class="fi fi-sr-thumbs-up"></i>
            <span className="profile-text">싫어하는 것</span>
          </div>
          <div className="location">
            <i class="fi fi-sr-map-marker-smile"></i>
            <span className="profile-text">위치정보</span>
          </div>
        </div>
    </div>
  );
}
export default ProfilePage;
