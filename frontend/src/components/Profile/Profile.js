import React, {useState, useEffect} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const Profile = () => {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState(null);
    const {user_nick} = useParams();

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get(`/profile/${user_nick}`);
                setProfileData(response.data);
                console.log(response.data)
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };

        fetchProfileData();
    }, [user_nick]);

    const updateBtn = () => {
        navigate('/profile/update')
        console.log("updateBtn ck");
        // 수정 페이지로 이동
    };

    const followBtn = () => {
        console.log("followBtn ck");
        // 팔로우 기능 구현
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
            </div>
        </div>
    );
};

export default Profile;