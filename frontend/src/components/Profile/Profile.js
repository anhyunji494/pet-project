import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import './Profile.css'; // 스타일 파일 임포트
import UserUpdate from "./ProfileUpdate"
import Modal from "react-modal";

const Profile = () => {
    const [activeTab, setActiveTab] = useState('tab1'); // 활성 탭 상태 저장
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleTabClick = (tabId) => {
        setActiveTab(tabId); // 클릭한 탭을 활성화
    };
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState(null);
    const [profilePost, setProfilePost] = useState(null);
    const { user_id } = useParams();

    // const [isFriendModalOpen, setisFriendModalOpen] = useState(false);

    // const openFriendModal = () => {
    //     setisFriendModalOpen(true);
    // };

    // const closeFriendModal = () => {
    //     setisFriendModalOpen(false);
    // };

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
        setIsModalOpen(true); // 모달 창 열기
    };

    // const updateBtn = () => {
    //     // navigate('/profile/update')
    //     // console.log("updateBtn ck");
    //     // // 수정 페이지로 이동
    //     openFriendModal()
    // };

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
                    <li><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-github-copilot"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 18v-5.5c0 -.667 .167 -1.333 .5 -2" /><path d="M12 7.5c0 -1 -.01 -4.07 -4 -3.5c-3.5 .5 -4 2.5 -4 3.5c0 1.5 0 4 3 4c4 0 5 -2.5 5 -4z" /><path d="M4 12c-1.333 .667 -2 1.333 -2 2c0 1 0 3 1.5 4c3 2 6.5 3 8.5 3s5.499 -1 8.5 -3c1.5 -1 1.5 -3 1.5 -4c0 -.667 -.667 -1.333 -2 -2" /><path d="M20 18v-5.5c0 -.667 -.167 -1.333 -.5 -2" /><path d="M12 7.5l0 -.297l.01 -.269l.027 -.298l.013 -.105l.033 -.215c.014 -.073 .029 -.146 .046 -.22l.06 -.223c.336 -1.118 1.262 -2.237 3.808 -1.873c2.838 .405 3.703 1.797 3.93 2.842l.036 .204c0 .033 .01 .066 .013 .098l.016 .185l0 .171l0 .49l-.015 .394l-.02 .271c-.122 1.366 -.655 2.845 -2.962 2.845c-3.256 0 -4.524 -1.656 -4.883 -3.081l-.053 -.242a3.865 3.865 0 0 1 -.036 -.235l-.021 -.227a3.518 3.518 0 0 1 -.007 -.215z" /><path d="M10 15v2" /><path d="M14 15v2" /></svg></li>
                    <li><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-bone"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 3a3 3 0 0 1 3 3a3 3 0 1 1 -2.12 5.122l-4.758 4.758a3 3 0 1 1 -5.117 2.297l0 -.177l-.176 0a3 3 0 1 1 2.298 -5.115l4.758 -4.758a3 3 0 0 1 2.12 -5.122z" /></svg></li>
                    <li><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-waze"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6.66 17.52a7 7 0 0 1 -3.66 -4.52c2 0 3 -1 3 -2.51c0 -3.92 2.25 -7.49 7.38 -7.49c4.62 0 7.62 3.51 7.62 8a8.08 8.08 0 0 1 -3.39 6.62" /><path d="M10 18.69a17.29 17.29 0 0 0 3.33 .3h.54" /><path d="M16 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M8 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M16 9h.01" /><path d="M11 9h.01" /></svg></li>
                    <li><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-dog"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11 5h2" /><path d="M19 12c-.667 5.333 -2.333 8 -5 8h-4c-2.667 0 -4.333 -2.667 -5 -8" /><path d="M11 16c0 .667 .333 1 1 1s1 -.333 1 -1h-2z" /><path d="M12 18v2" /><path d="M10 11v.01" /><path d="M14 11v.01" /><path d="M5 4l6 .97l-6.238 6.688a1.021 1.021 0 0 1 -1.41 .111a.953 .953 0 0 1 -.327 -.954l1.975 -6.815z" /><path d="M19 4l-6 .97l6.238 6.688c.358 .408 .989 .458 1.41 .111a.953 .953 0 0 0 .327 -.954l-1.975 -6.815z" /></svg></li>
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
                            {profileData?.user_intro}
                        </p>
                        <ul className="content-links">
                            {/* ... */}
                        </ul>
                    </div>
                    {/* 다른 탭 컨텐츠들 */}
                    <div id="tab2-content" className={`tab-content ${activeTab === 'tab2' ? 'tab-content--active' : ''}`}>
                        <p>
                            {profileData?.likes}
                        </p>
                        <ul className="content-links">
                            {/* ... */}
                        </ul>
                    </div>
                    <div id="tab3-content" className={`tab-content ${activeTab === 'tab3' ? 'tab-content--active' : ''}`}>
                        <p>
                            {profileData?.dislikes}
                            <br></br>
                            {profileData?.location}
                        </p>
                        <ul className="content-links">
                            {/* ... */}
                        </ul>
                    </div>

                    {/* ... */}
                </main>
                <div className="btn-container">
                    {sessionUserId === profileData?.user_id && <button className="btn btn--primary" onClick={updateBtn}>수정</button>}
                    
                    <Modal
                        isOpen={isModalOpen}
                        onRequestClose={() => setIsModalOpen(false)}
                        onAfterOpen={() => document.body.style.overflow = 'hidden'} // 모달 열릴 때 스크롤 바 숨김
                        onAfterClose={() => document.body.style.overflow = 'visible'} // 모달 닫힐 때 스크롤 바 표시
                        style={{
                            overlay: {
                                position: "fixed",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                zIndex: 10,
                                // backgroundColor: "rgba(0, 0, 0, 0.70)",
                                // backdropFilter: 'blur(15px)',
                            },
                            content: {
                                position: "absolute",
                                top: "40px",
                                left: "40px",
                                right: "40px",
                                bottom: "40px",
                                border: "none",
                                background: "rgba(0, 0, 0, 0)",
                                overflow: "auto",
                                WebkitOverflowScrolling: "touch",
                                borderRadius: "4px",
                                outline: "none",
                                padding: "20px",
                                backgroundColor: "rgba(0, 0, 0, 0)",
                            },
                        }}
                    ><button id="modal-close-btn" onClick={() => setIsModalOpen(false)}></button>
                    <UserUpdate />
                    </Modal>
                    
                    
                    {sessionUserId && <button className="btn btn--primary" onClick={followBtn}>팔로우</button>}
                    {sessionUserId && <button className="btn btn--primary" onClick={handleLogout}>로그아웃</button>}
                </div>
            </div>
        </div>);
};

export default Profile;