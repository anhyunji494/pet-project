import React, { useState } from "react";
import axios from "axios";
import uploadImageToS3 from "../../module/s3";
import './ProfileUpdate.css';
import { useNavigate } from "react-router-dom";

function UserUpdate() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        user_nick: "",
        birthday: "",
        user_intro: "",
        likes: "",
        dislikes: "",
        location: "",
        user_img: null,
    });
    const [imagePreview, setImagePreview] = useState(null); // 미리보기 이미지 상태 추가

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            user_img: file,
        });

        // 미리보기 이미지 업데이트
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 이미지를 S3에 업로드하고 업로드된 이미지의 URL을 받아옴
            const imageUrl = await uploadImageToS3(formData.user_img);

            // 다른 폼 데이터와 함께 서버에 전송
            const response = await axios.post("/userUpdate", {
                ...formData,
                user_img: imageUrl, // S3에서 받아온 이미지 URL로 대체
            });

            console.log("Response from server:", response.data);

            // 서버 응답에 따라 필요한 작업 수행
            sessionStorage.setItem('updatedProfileData', JSON.stringify(response.data));
            handleLogout();
        } catch (error) {
            console.error("Error:", error);
        }
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
        <div class="containers">
            <div className="profile-box">
                <div className="profile-div">
                    <div className="profile-photo">
                        {imagePreview ? (
                            <img src={imagePreview} alt="Profile Preview" style={{ maxWidth: "150px", maxHeight: "150px" }} />
                        ) : (
                            <span>프로필 사진</span>
                        )}
                        <input
                            type="file"
                            className="user_img"
                            name="user_img"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="name-div">
                        <div><i className="fi fi-rr-fox"></i>&nbsp;반려동물이름</div>
                        <input
                            className="name"
                            name="user_nick"
                            value={formData.user_nick}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="birthday">
                        <div>생일</div>
                        <input
                            className="birthday"
                            name="birthday"
                            value={formData.birthday}
                            onChange={handleChange}
                        />

                    </div>
                    <div className="intros">
                        <div>소개</div> 
                        <input
                            className="intros"
                            name="user_intro"
                            value={formData.user_info}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="likes">
                    <div>좋아하는 것</div> 
                        <input
                            className="profile-text"
                            name="likes"
                            value={formData.likes}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="dislikes">
                        <div>싫어하는 것</div>
                        <input
                            className="profile-text"
                            name="dislikes"
                            value={formData.dislikes}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="location">
                        <div>지역</div>
                        <input
                            className="profile-text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="submitss">
                        <button type="submit" className="signin-button" onClick={handleSubmit}>
                            회원 수정
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default UserUpdate;
