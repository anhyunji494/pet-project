import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const PetWaveIcon = () => (
  <img
    loading="lazy"
    src="https://cdn.builder.io/api/v1/image/assets/TEMP/62ac67801738c13143d0710165edd3a0c539b15e2bc0a83b0ac2d41402024a47?apiKey=90aa7ae4bb3148a18366a057ad7e2c00&"
    alt="PetWave logo"
    className="pet-wave-icon"
  />
);

const SignUpButton = () => (
  <button type="submit" className="signin-button">
    <Link to="/signin" className="signin-button">
      회원가입
    </Link>
  </button>
);

function Login() {
  // navigate(페이지 라우팅) 선언
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  // 로그인 핸들러
  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post("/login",{
        user_id: id,
        user_pw: password
      })

      .then(function(response){
        console.log(response);
        console.log('데이터 전송 성공')
        console.log(response.status);
        if(response.status===200){
          navigate('/Profile');
          console.log('로그인 완전 성공');
        } else {
          console.log('로그인 성공, 하지만 오류');
        }
      })

      .catch(function(error){
        console.log('데이터 전송 실패');
        console.log("데이터 정보", id, password);
        console.log(function(response){
          console.log(response);
        });
        console.log(error);
        alert('로그인 실패');
        navigate('/login')
      })
    // if (function (response) ==="200")

    // navigate('/main')
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
              <form  method="POST" onSubmit={handleLogin}>
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
                  onChange={(e)=>{
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
                  onChange={(e)=>{
                    setPassword(e.target.value);
                  }}
                />
                <div className="forgot-password">비밀번호를 잊으셨나요?</div>
                <div className="form-actions">
                  <button type="submit" className="signin-button">
                    로그인
                  </button>
                  <SignUpButton />
                </div>
              </form>

              <div className="social-login">
                <div className="social-login-text">
                  이렇게도 로그인 할 수 있어요
                </div>
                <div className="google-login">Google</div>
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
