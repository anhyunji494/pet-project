import * as React from "react";
import "./Profile.css";
import { Link } from "react-router-dom";

const Birthday = () => {
  "0000.00.00";
};

const tags = () => {
  "tags";
};

function ProfileUpdate() {
  return (
    <div id="body">
      <div className="profile-box">
        <div className="profile-div">
          <div className="profile-photo"></div>
          <div className="name-div">
            <input className="name">반려동물 이름</input>
          </div>
          <div className="birthday">
            <i className="fi fi-br-cake-birthday"></i>
            &nbsp; 0000.00.00
          </div>
        </div>
        <div className="tags">태그</div>
      </div>
      <div className="content-box">
        <input className="intro">한줄소개</input>
        <div className="etc-div">
          <div className="likes">
            <i className="fi fi-sr-thumbs-up"></i>&nbsp;&nbsp;
            <input className="profile-text">좋아하는 것</input>
          </div>
          <div className="dislikes">
            <i className="fi fi-sr-thumbs-up"></i>&nbsp;&nbsp;
            <input className="profile-text">싫어하는 것</input>
          </div>
          <div className="location">
            <i className="fi fi-sr-map-marker-smile"></i>&nbsp;&nbsp;
            <input className="profile-text">위치정보</input>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProfileUpdate;
