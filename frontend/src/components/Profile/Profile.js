import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import './Profile.css'; // 스타일 파일 임포트

const Profile = () => {
    const [activeTab, setActiveTab] = useState('tab1'); // 활성 탭 상태 저장

    const handleTabClick = (tabId) => {
        setActiveTab(tabId); // 클릭한 탭을 활성화
    };
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState(null);
    const [profilePost, setProfilePost] = useState(null);
    const { user_id } = useParams();
    const sessionUserId = sessionStorage.getItem('myInfo') ? JSON.parse(sessionStorage.getItem('myInfo')).user_id : null;
    useEffect(() => {
        const fetchData = async () => {
            try {
                // 프로필 정보 가져오기
                const profileInfoResponse = await axios.get(`/profile_info/${user_id}`);
                setProfileData(profileInfoResponse.data);
                console.log(profileInfoResponse.data);

                // 유저가 작성한 게시글 가져오기
                const profilePostResponse = await axios.get(`/profile_post/${user_id}`);
                setProfilePost(profilePostResponse.data)
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
        <div id="ppap">
            <div className="profile1">
                {/* 프로필 헤더 */}
                <header className="profile1__header">
                    {/* 프로필 강조 내용 */}
                    <div className="profile1__highlight__wrapper">
                        {/* 팔로워 */}
                        <div className="profile1__highlight">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-school" width="24"
                                height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none"
                                strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M22 9l-10 -4l-10 4l10 4l10 -4v6" />
                                <path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4" />
                            </svg>
                            176k
                        </div>
                        follower
                    </div>
                    {/* 프로필 이미지 */}
                    <div className="profile1__avatar">
                        <img src={profileData?.user_img} alt="" />
                    </div>
                    {/* 팔로위 */}
                    <div className="profile1__highlight__wrapper">
                        <div className="profile1__highlight">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-coin" width="24"
                                height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none"
                                strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                                <path d="M14.8 9a2 2 0 0 0 -1.8 -1h-2a2 2 0 1 0 0 4h2a2 2 0 1 1 0 4h-2a2 2 0 1 1 -1.8 -1" />
                                <path d="M12 7v10" />
                            </svg>
                            149k
                        </div>
                        follow
                    </div>
                </header>
                {/* 프로필 이름 및 생일 */}
                <div className="profile1__name">
                    <h2>{profileData?.user_nick}</h2>
                    <p>{profileData?.birthday}</p>
                </div>
                {/* 소셜 링크 목록 */}
                <ul className="social-links">
                    {/* 각각의 소셜 링크 아이콘 */}
                    <li><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-github" width="24"
                        height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none"
                        strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path
                            d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
                    </svg></li>
                    <li><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-github" width="24"
                        height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none"
                        strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path
                            d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
                    </svg></li>
                    <li><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-github" width="24"
                        height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none"
                        strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path
                            d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
                    </svg></li>
                    <li><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-github" width="24"
                        height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none"
                        strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path
                            d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
                    </svg></li>
                    {/* ... */}
                </ul>
                {/* 탭 컨텐츠 */}
                <main>
                    {/* 탭 목록 */}
                    <div className="tabs-wrapper">
                        <ul className="tabs">
                            {/* 각 탭 */}
                            <li className={activeTab === 'tab1' ? 'active' : ''}>
                                <a id="tab1" href="#about" onClick={() => handleTabClick('tab1')}>info</a>
                            </li>
                            <li className={activeTab === 'tab2' ? 'active' : ''}>
                                <a id="tab2" href="#skills" onClick={() => handleTabClick('tab2')}>like</a>
                            </li>
                            <li className={activeTab === 'tab3' ? 'active' : ''}>
                                <a id="tab3" href="#reviews" onClick={() => handleTabClick('tab3')}>others</a>
                            </li>
                            {/* 활성 탭 배경 */}
                            <li id="active-bg"></li>
                        </ul>
                    </div>
                    {/* 각 탭 컨텐츠 */}
                    <div id="tab1-content" className={`tab-content ${activeTab === 'tab1' ? 'tab-content--active' : ''}`}>
                        <p>
                            info : {profileData?.user_intro}
                        </p>
                        <ul className="content-links">
                            {/* ... */}
                        </ul>
                    </div>
                    {/* 다른 탭 컨텐츠들 */}
                    <div id="tab2-content" className={`tab-content ${activeTab === 'tab2' ? 'tab-content--active' : ''}`}>
                        <p>
                            좋아하는 것: {profileData?.likes}
                        </p>
                        <ul className="content-links">
                            {/* ... */}
                        </ul>
                    </div>
                    <div id="tab3-content" className={`tab-content ${activeTab === 'tab3' ? 'tab-content--active' : ''}`}>
                        <p>
                            싫어하는 것 : {profileData?.dislikes}
                            <br></br>
                            위치 : {profileData?.location}
                        </p>
                        <ul className="content-links">
                            {/* ... */}
                        </ul>
                    </div>

                    {/* ... */}
                </main>
                <div className="btn-container">
                    {sessionUserId === profileData?.user_id && <button className="btn btn--primary" onClick={updateBtn}>수정</button>}
                    {sessionUserId && <button className="btn btn--primary" onClick={followBtn}>팔로우</button>}
                    {sessionUserId && <button className="btn btn--primary" onClick={handleLogout}>로그아웃</button>}
                </div>
            </div>
        </div>);
};

export default Profile;