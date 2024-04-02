import React, {useState, useEffect} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const Profile = () => {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState(null);
    const { user_id } = useParams(); 
useEffect(() => {
    const fetchData = async () => {
        try {
            // 프로필 정보 가져오기
            const profileInfoResponse = await axios.get(`/profile_info/${user_id}`);
            setProfileData(profileInfoResponse.data);
            console.log(profileInfoResponse.data);

            // 유저가 작성한 게시글 가져오기
            const profilePostResponse = await axios.get(`/profile_post/${user_id}`);
            console.log("작성자의 게시물 : " + profilePostResponse.data);
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    };

    fetchData();
}, [user_id]);

    const updateBtn = () => {
        navigate('/profile/update')
        console.log("updateBtn ck");
        // 수정 페이지로 이동
    };

    const followBtn = () => {
        console.log("followBtn ck");
        // 팔로우 기능 구현
    };
    const handleLogout = async () => {
        try {
            // 서버로 로그아웃 요청 보내기
            await axios.post('/logout');

            // sessionStorage에 저장된 정보 삭제
            sessionStorage.removeItem('myInfo');
            sessionStorage.removeItem('updatedProfileData');

            // 로그아웃 후 로그인 페이지로 이동
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div id="body">
            <div className="profile-box">
                <div className="profile-div">
                    <div className="profile-photo"></div>
                    <div className="name-div">
                        <span className="name">{profileData?.user_nick}</span>
                    </div>
                    <div className="birthday">
                        <i className="fi fi-br-cake-birthday"></i>
                        &nbsp; {profileData?.birthday}
                    </div>
                </div>
                <div className="tags">{profileData?.user_animal}동물?</div>
            </div>
            <div className="content-box">
                <div className="intro">{profileData?.user_intro}</div>
                <div className="etc-div">
                    <div className="likes">
                        <i className="fi fi-sr-thumbs-up"></i>&nbsp;&nbsp;
                        <span className="profile-text">{profileData?.likes}</span>
                    </div>
                    <div className="dislikes">
                        <i className="fi fi-sr-thumbs-up"></i>&nbsp;&nbsp;
                        <span className="profile-text">{profileData?.dislikes}</span>
                    </div>
                    <div className="location">
                        <i className="fi fi-sr-map-marker-smile"></i>&nbsp;&nbsp;
                        <span className="profile-text">{profileData?.location}</span>
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
                <button onClick={handleLogout}>로그아웃</button>
            </div>
        </div>
    );
};

export default Profile;