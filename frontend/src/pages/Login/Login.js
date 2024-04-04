import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode, { jwtDecode } from "jwt-decode";

const PetWaveIcon = () => (
  <img
    loading="lazy"
    src="https://cdn.builder.io/api/v1/image/assets/TEMP/62ac67801738c13143d0710165edd3a0c539b15e2bc0a83b0ac2d41402024a47?apiKey=90aa7ae4bb3148a18366a057ad7e2c00&"
    alt="PetWave logo"
    className="pet-wave-icon"
  />
);

const SignUpButton = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/signin");
  };

  return (
    <button className="signin-button" onClick={handleButtonClick}>
      회원가입
    </button>
  );
};

function Login() {
  // navigate(페이지 라우팅) 선언
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  // 로그인 핸들러
  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("/login", {
        user_id: id,
        user_pw: password
      })
      .then(function (response) {
        console.log(response);
        console.log("데이터 전송 성공");
        console.log(response.status);
        if (response.data != null) {
          // 로그인시 세션정보를 json으로 sessionStorage 넣음
          sessionStorage.setItem('myInfo', JSON.stringify(response.data));
          // 사용자의 닉네임을 가져와서 프로필 페이지 경로에 추가
          const user_nick = response.data.user_nick;
          navigate('/');
          console.log("로그인 완전 성공");
        } else {
          console.log("데이터 전송 성공, 로그인 오류");
        }
      })
      .catch(function (error) {
        console.log("데이터 전송 실패");
        console.log("데이터 정보", id, password);
        console.log(error);
        alert("로그인 실패");
        navigate("/login");
      });
  };

  return (
    <>
      <div id="login-container">
        <div className="login-content">
          <div className="login-form-column">
            <div className="login-form">
              <header className="logo-header">
                <PetWaveIcon />
                <div className="logo-text">petwave</div>
              </header>
              <p className="tagline">
                펫웨이브와 함께하며 <br />더 많은 반려동물 이야기를 발견하세요!
              </p>
              <form method="POST" onSubmit={handleLogin}>
                <label htmlFor="userId" className="input-label">
                  아이디
                </label>
                <br />
                <input
                  type="email"
                  name="user_id"
                  className="input-field"
                  placeholder="이메일을 입력하세요"
                  aria-label="Enter your email"
                  onChange={(e) => {
                    setId(e.target.value);
                  }}
                />
                <br />
                <br />
                <label htmlFor="password" className="input-label">
                  비밀번호
                </label>
                <br />
                <input
                  type="password"
                  name="user_pw"
                  className="input-field"
                  placeholder="비밀번호를 입력하세요"
                  aria-label="Enter your email"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <div className="forgot-password">비밀번호를 잊으셨나요?</div>
                <div className="form-actions">
                  <button type="submit" className="signin-button">
                    로그인
                  </button>
                  <SignUpButton /> {/* 이 부분에서 회원가입 버튼 추가 */}
                </div>
              </form>

              <div className="social-login">
                <div className="social-login-text">
                  이렇게도 로그인 할 수 있어요
                </div>
                <GoogleOAuthProvider clientId="100190826571-b2v3fs803cn1mr3jttqhiullv9m2t9en.apps.googleusercontent.com">
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      const isVerified = jwtDecode(credentialResponse.credential).email_verified;
                      const googleUserId = jwtDecode(credentialResponse.credential).email

                      console.log(
                        isVerified
                        );
                      console.log(
                        googleUserId
                      );

                      axios
                        .post("/login",{  
                          user_id:googleUserId
                        })
                        .then(function (response){
                          console.log(response)
                          console.log('구글 로그인 성공');
                          // navigate('/');}
                        })
                        .catch(
                          function (error) {
                            console.log("구글로그인 실패");
                            console.log("데이터 정보", error);
                            
                            alert("구글 로그인에 실패하였습니다.");
                            navigate("/login");
                          }
                        )
                    }}
                    onError={() => {
                      console.log("구글 로그인 실패");
                      navigate("/login");
                    }}
                  />
                </GoogleOAuthProvider>
              </div>
            </div>
          </div>
          <div className="image-wrapper">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/6d9a628ed6037085d0a7e8c69c6971cc6c9cba41990497a384c5449526898aa2?apiKey=90aa7ae4bb3148a18366a057ad7e2c00&"
              alt="Illustration of a person with a dog"
              className="login-image"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
