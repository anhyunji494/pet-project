import * as React from "react";
import styles from "./Profile.css";
import { Link, useNavigate } from "react-router-dom";



const Profile = ()=> {
  // 페이지 넘기는 라우팅 로딩
  const navigate = useNavigate();

  // 


  const Birthday = () => {
    "0000.00.00";
  };
  
  const tags = () => {
    "tags";
  };
  
  const updateBtn = () => {
    console.log('updateBtn ck')
    navigate('/profile/update')
  }
  
  const followBtn = () => {
    console.log('followBtn ck')
    // 누른 사람 아이디 가져오기 /넘기기
    // 눌린 사람 아이디 가져오기 /넘기기
  }

  return (
    <>

    <div id="body">

      
      <div className="profile-box">
        <div className="profile-div">
          <div className="profile-photo"></div>
          <div className="name-div">
            <span className="name">반려동물 이름</span>
          </div>
          <div className="birthday">
            <i className="fi fi-br-cake-birthday"></i>
            &nbsp; 0000.00.00
          </div>
        </div>
        <div className="tags">태그</div>
      </div>
      <div className="content-box">
        <div className="intro">한줄소개</div>
        <div className="etc-div">
          <div className="likes">
            <i className="fi fi-sr-thumbs-up"></i>&nbsp;&nbsp;
            <span className="profile-text">좋아하는 것</span>
          </div>
          <div className="dislikes">
            <i className="fi fi-sr-thumbs-up"></i>&nbsp;&nbsp;
            <span className="profile-text">싫어하는 것</span>
          </div>
          <div className="location">
            <i className="fi fi-sr-map-marker-smile"></i>&nbsp;&nbsp;
            <span className="profile-text">위치정보</span>
          </div>
        </div>
      </div>
      <div className="btn">
        <button className="update-btn" onClick={updateBtn}>
          수정
        </button>
        <button className="follow-btn" onClick={followBtn}>
          팔로우
        </button>
      </div>
    </div>
    </>
  );
}
export default Profile;
