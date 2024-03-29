import React, { useEffect, useState } from 'react';

const Test = () => {
  const [sessionValue, setSessionValue] = useState(null);

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await fetch('/'); // 서버에서 세션 데이터를 가져오는 API 엔드포인트
        if (!response.ok) {
          throw new Error('Failed to fetch session data');
        }
        const data = await response.json();
        // 세션 데이터가 존재하는 경우
        if (data && data.sessionValue) {
          setSessionValue(data.sessionValue);
        } else {
          // 세션 데이터가 없는 경우
          setSessionValue('No session data');
        }
      } catch (error) {
        console.error('Error fetching session data:', error);
      }
    };

    fetchSessionData();
  }, []);

  return (
    <div>
      <h1>Session Value: {sessionValue}</h1>
    </div>
  );
};

export default Test;
