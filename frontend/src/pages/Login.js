import * as React from "react";
import "./Login.css"
import { Link } from "react-router-dom";

const PetWaveIcon = () => (
  <img
    loading="lazy"
    src="https://cdn.builder.io/api/v1/image/assets/TEMP/62ac67801738c13143d0710165edd3a0c539b15e2bc0a83b0ac2d41402024a47?apiKey=90aa7ae4bb3148a18366a057ad7e2c00&"
    alt="PetWave logo"
    className="pet-wave-icon"
  />
);

const LoginButton = () => (
  <button type="submit" className="signin-button"><Link to="/" className="signin-button">
    로그인
  </Link></button>
);

const SignUpButton = () => (
  <button type="submit" className="signin-button"><Link to="/signin" className="signin-button">
    회원가입
    </Link>
  </button>
);

function Login() {
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
              <form>
                <label htmlFor="userId" className="input-label">
                  아이디
                </label>
                <br />
                <input
                  type="email"
                  id="userId"
                  className="input-field"
                  placeholder="이메일을 입력하세요"
                  aria-label="Enter your email"
                />
                <br/>
                <br/>
                <label htmlFor="password" className="input-label">
                  비밀번호
                </label>
                <br />
                <input
                  type="password"
                  id="userPw"
                  className="input-field"
                  placeholder="비밀번호를 입력하세요"
                  aria-label="Enter your email"
                />
              </form>
              <div className="forgot-password">비밀번호를 잊으셨나요?</div>
              <div className="form-actions">
                <LoginButton />
                <SignUpButton />
              </div>
              <div className="social-login">
                <div className="social-login-text">이렇게도 로그인 할 수 있어요</div>
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
  );}
export default Login