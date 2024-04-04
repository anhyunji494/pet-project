import React, { useState, useEffect } from 'react';
import axios from 'axios'; // axios를 HTTP 요청을 위해 가져옵니다.
import './AllUsers.css'; // 필요한 스타일을 가져옵니다.
import { useNavigate } from 'react-router-dom';

const AllUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]); // 유저 정보를 저장할 상태와 그 상태를 업데이트할 함수를 정의합니다.
  const [loading, setLoading] = useState(true); // 데이터를 불러오는 중인지 여부를 나타내는 상태를 정의합니다.
  const profile = "https://duckgeun.s3.ap-northeast-2.amazonaws.com/%EC%97%91%EB%B0%95%EB%B0%A9%EC%A7%80.jpg";
  // 모든 유저 정보를 가져오는 함수를 정의합니다.
  const fetchAllUsers = async () => {
    try {
      // '/allUsers' 엔드포인트로 GET 요청을 보냅니다.
      const response = await axios.get('/allUsers');
      // 응답으로 받은 데이터를 상태에 업데이트합니다.
      setUsers(response.data);
      // 데이터를 모두 받아온 후에 로딩 상태를 false로 변경합니다.
      setLoading(false);
    } catch (error) {
      console.error('유저 정보를 불러오는 중 에러 발생:', error);
    }
  };
    const handleProfile = (user_id) => {
      navigate(`/profile/${user_id}`);
    }


  // 컴포넌트가 마운트될 때 한 번만 실행됩니다.
  useEffect(() => {
    // 모든 유저 정보를 가져오는 함수를 호출합니다.
    fetchAllUsers();
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 실행되도록 합니다.

  return (
    <div className='body1'>
      <section className='stock-watchlist-container'>
        <h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-graph"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M4 18v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
            <path d="M7 14l3 -3l2 2l3 -3l2 2" />
          </svg>
          전체 유저
        </h2>
        <div id="stocks">
          {/* 데이터를 불러오는 중인 경우 로딩 스피너를 표시합니다. */}
          {users.map((user, index) => (
            <article className="stock-row" key={index}  onClick={() => handleProfile(user.user_id)}  >
              <img className="stock-avatar1" src={user.user_img ? user.user_img : profile} alt={`사진`}/>
              <div className="stock-name">
                <h3>{user.user_nick}</h3>
                <p>{user.user_id}</p>
                
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AllUsers;
