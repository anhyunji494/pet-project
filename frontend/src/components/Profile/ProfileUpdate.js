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
            반려동물이름
            <input className="name"></input>
          </div>
          <div className="birthday">
            <i className="fi fi-br-cake-birthday"></i>
            &nbsp; 생일 <input className="bitrhday"></input>
          </div>
        </div>
        <div className="tags"></div>
      </div>
      <div className="content-box">
        <span className="intro">
        한줄소개</span>
        <input className="intro"></input>
        <div className="etc-div">
          <div className="likes">
            <i className="fi fi-sr-thumbs-up"></i>&nbsp;&nbsp;
            좋아하는 것
            <input className="profile-text"></input>
          </div>
          <div className="dislikes">
            <i className="fi fi-sr-thumbs-up"></i>&nbsp;&nbsp;
            싫어하는 것
            <input className="profile-text"></input>
          </div>
          <div className="location">
            <i className="fi fi-sr-map-marker-smile"></i>&nbsp;&nbsp;
            지역
            <input className="profile-text"></input>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProfileUpdate;
