import * as React from "react";
import "./Profile.css"
import {Link} from 'react-router-dom';
import {useState} from "react";
import axios from "axios";

const PetWaveIcon = () => (
    <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/62ac67801738c13143d0710165edd3a0c539b15e2bc0a83b0ac2d41402024a47?apiKey=90aa7ae4bb3148a18366a057ad7e2c00&"
        alt="PetWave logo"
        className="pet-wave-icon"
    />
);


function UserUpdate() {
    const [formData, setFormData] = useState({
        user_nick: "",
        birthday: "",
        user_intro: "",
        likes: "",
        dislikes: "",
        location: ""
    });


    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        // e.preventDefault();
        try {
            const response = await axios.post("/userUpdate", formData);
            console.log("Response from server:", response.data);
            console.log(formData);

            // 서버 응답에 따라 필요한 작업 수행

            // 수정된 정보를 sessionStorage에 저장
            sessionStorage.setItem('updatedProfileData', JSON.stringify(formData));
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const SigninButton = () => (
        <button type="submit" className="signin-button"><Link to="/" className="signin-button" onClick={handleSubmit}>
            회원 수정</Link>
        </button>
    );

    return (
        <div id="body">
            <div className="profile-box">
                <div className="profile-div">
                    <div className="profile-photo"></div>
                    <div className="name-div">
                        반려동물이름
                        <input
                            className="name"
                            name="user_nick"
                            value={formData.user_nick}
                            onChange={handleChange}
                        ></input>
                    </div>
                    <div className="birthday">
                        <i className="fi fi-br-cake-birthday"></i>
                        &nbsp; 생일{" "}
                        <input
                            className="birthday"
                            name="birthday"
                            value={formData.birthday}
                            onChange={handleChange}
                        ></input>
                    </div>
                </div>
                <div className="tags"></div>
            </div>
            <div className="content-box">
                <span className="intro">한줄소개</span>
                <input
                    className="intro"
                    name="user_intro"
                    value={formData.user_info}
                    onChange={handleChange}
                ></input>
                <div className="etc-div">
                    <div className="likes">
                        <i className="fi fi-sr-thumbs-up"></i>&nbsp;&nbsp; 좋아하는 것
                        <input
                            className="profile-text"
                            name="likes"
                            value={formData.likes}
                            onChange={handleChange}
                        ></input>
                    </div>
                    <div className="dislikes">
                        <i className="fi fi-sr-thumbs-up"></i>&nbsp;&nbsp; 싫어하는 것
                        <input
                            className="profile-text"
                            name="dislikes"
                            value={formData.dislikes}
                            onChange={handleChange}
                        ></input>
                    </div>
                    <div className="location">
                        <i className="fi fi-sr-map-marker-smile"></i>&nbsp;&nbsp; 지역
                        <input
                            className="profile-text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                        ></input>
                    </div>
                    <SigninButton/>
                </div>

            </div>

        </div>
    );
}

export default UserUpdate;