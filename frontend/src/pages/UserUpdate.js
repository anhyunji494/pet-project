import * as React from "react";
import "./Signin.css"
import { Link } from 'react-router-dom';

const PetWaveIcon = () => (
  <img
    loading="lazy"
    src="https://cdn.builder.io/api/v1/image/assets/TEMP/62ac67801738c13143d0710165edd3a0c539b15e2bc0a83b0ac2d41402024a47?apiKey=90aa7ae4bb3148a18366a057ad7e2c00&"
    alt="PetWave logo"
    className="pet-wave-icon"
  />
);

const SigninButton = () => (
  <button type="submit" className="signin-button"><Link to="/userUpdate" className="signin-button">
    회원 수정</Link>
  </button>
);

function UserUpdate() {
  return (
    <>
      <div id="signin-container">
        <div className="signin-content">
          <div className="signin-form-column">
            <div className="signin-form">
              <header className="logo-header">
                <PetWaveIcon />
                <div className="logo-text">petwave</div>
              </header>
              <p className="tagline">
                펫웨이브와 함께하며 <br />더 많은 반려동물 이야기를 발견하세요!
              </p>
                <form action="/userUpdate" method="POST">
                    <label htmlFor="nick" className="input-label">
                        닉네임
                    </label>
                    <br/>
                    <input
                        type="text"
                        name="user_nick"
                        className="input-field"
                        placeholder="변경할 닉네임을 입력하세요"
                        aria-label="Enter your password"
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
                        className="input-field"
                        placeholder="비밀번호를 입력해주세요"
                        aria-label="Enter your password"
                    />
                    <div className="form-actions">
                        <button type="submit" className="signin-button">
                            수정
                        </button>
                    </div>
                </form>


            </div>
          </div>

        </div>
      </div>
    </>
  );
}


export default UserUpdate