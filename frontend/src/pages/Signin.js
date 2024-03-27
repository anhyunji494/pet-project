import * as React from "react";
import "./Signin.css"
import {Link} from 'react-router-dom';
import {useEffect, useState} from "react";

const PetWaveIcon = () => (
  <img
    loading="lazy"
    src="https://cdn.builder.io/api/v1/image/assets/TEMP/62ac67801738c13143d0710165edd3a0c539b15e2bc0a83b0ac2d41402024a47?apiKey=90aa7ae4bb3148a18366a057ad7e2c00&"
    alt="PetWave logo"
    className="pet-wave-icon"
  />
);

function Signin() {

    const SigninButton = () => (
        <button type="submit" className="signin-button" formAction="/signUp" formMethod="POST"><Link to="/signUp" className="signin-button">
            회원가입</Link>
        </button>
    );


    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);


    const handlePasswordChange = (e) => {
        const { id, value } = e.target;
        if (id === 'password1') {
            setPassword1(value);
        } else if (id === 'password2') {
            setPassword2(value);
        }
    };

    useEffect(() => {
        setPasswordMatch(password1 === password2);
    }, [password1, password2]);

    const isSignUpDisabled = !passwordMatch; // 회원가입 버튼을 비활성화할지 여부를 결정합니다.


  return (
    <>
      <div id="signin-container">
        <div className="signin-content">
          <div className="signin-form-column">
            <div className="signin-form">
              <header className="logo-header">
                <PetWaveIcon/>
                <div className="logo-text">petwave</div>
              </header>
              <p className="tagline">
                펫웨이브와 함께하며 <br/>더 많은 반려동물 이야기를 발견하세요!
              </p>
                <form action="/signUp" method="POST">
                    <label htmlFor="userId" className="input-label">
                        아이디
                    </label>
                    <br/>
                    <input
                        type="email"
                        name="user_id"
                        className="input-field"
                        placeholder="이메일을 입력하세요"
                        aria-label="Enter your email"
                    />
                    <br/>
                    <br/>
                    <label htmlFor="password" className="input-label">
                        닉네임
                    </label>
                    <br/>
                    <input
                        type="text"
                        name="user_nick"
                        id="nick"
                        className="input-field"
                        placeholder="닉네임을 입력해주세요"
                        aria-label="Enter your nickname"
                    />
                    <br/>
                    <br/>

                    <label htmlFor="password" className="input-label">
                        비밀번호
                    </label>
                    <br/>
                    <input
                        type="password"
                        name="user_pw"
                        id="password1"
                        onChange={handlePasswordChange}
                        className="input-field"
                        placeholder="비밀번호를 입력하세요"
                        aria-label="Enter your password"
                    />

                    <br/>
                    <br/>
                    <label htmlFor="password" className="input-label">
                        비밀번호 확인
                    </label>
                    <br/>
                    <input
                        type="password"
                        name="password2"
                        id="password2"
                        className="input-field"
                        placeholder="비밀번호를 입력해주세요"
                        onChange={handlePasswordChange}
                        aria-label="Enter your password"
                    />
                    {!passwordMatch && (
                        <p className="password-content" style={{ color: 'red' }}>
                            비밀번호가 일치하지 않습니다
                        </p>
                    )}
                    {/* 회원가입 버튼을 비활성화합니다. */}
                    <div className="form-actions">
                        <button type="submit" className={`signin-button ${isSignUpDisabled ? 'disabled' : ''}`} disabled={isSignUpDisabled}>
                            회원가입
                        </button>
                    </div>

                </form>

                <div className="social-signin">
                    <div className="social-signin-text">이렇게도 로그인 할 수 있어요</div>
                <div className="google-signin">Google</div>
              </div>
            </div>
          </div>
          <div className="image-wrapper">
            <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/6d9a628ed6037085d0a7e8c69c6971cc6c9cba41990497a384c5449526898aa2?apiKey=90aa7ae4bb3148a18366a057ad7e2c00&"
                alt="Illustration of a person with a dog"
                className="signin-image"
              />
            </div>
          </div>
        </div>
    </>
  );}

export default Signin