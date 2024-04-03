import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import './ProfilePost.css'; // 스타일 시트를 import합니다.

const ProfilePost = () => {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState(null);
    const [profilePost, setProfilePost] = useState(null);
    const [selectedPostIdx, setSelectedPostIdx] = useState();
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
                setProfilePost(profilePostResponse.data)
                console.log("작성자의 게시물 : " + profilePostResponse.data);
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };

        fetchData();
    }, [user_id]);

    useEffect(() => {
        console.log("selectedPostIdx", selectedPostIdx);
    }, [selectedPostIdx]);

    return (
        <div className="proFilePost">
            <div className="proFilePosts">
            {profilePost && profilePost.map((item, index) => (
                <article className="card" key={index}>
                    <div id="photo-idv" className="articles">
                        <article>
                            <figure>
                                <img
                                    id="photo-content"
                                    src={item.file_rnames[0]}
                                    alt={`사진 ${item.post_idx}`}
                                    onClick={(event) => {
                                        console.log("item", item.post_idx);
                                        setSelectedPostIdx(item.post_idx);
                                    }}
                                />
                            </figure>
                        </article>
                    </div>
                </article>
            ))}
            </div>
        </div>
    );
};

export default ProfilePost;
