// import React, { Component } from 'react';
// import Stomp from 'stompjs';

// class Chat extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       messages: [],
//       message: '',
//       stompClient: null,
//       username: '', // 사용자명
//       connected: false // 웹소켓 연결 상태
//     };
//   }

//   componentDidMount() {
//     const userInfoJson = sessionStorage.getItem('myInfo');
//     if (userInfoJson) {
//       const userInfo = JSON.parse(userInfoJson);
//       const { user_nick: username } = userInfo; // 사용자 닉네임 가져오기
//       if (username) {
//         this.setState({ username });
//         this.connect();
//       } else {
//         // 사용자가 로그인되지 않은 경우 로그인 페이지로 리다이렉트 또는 처리
//         console.error('사용자가 로그인되지 않았습니다.');
//       }
//     } else {
//       // 사용자 정보가 세션에 없는 경우 처리
//       console.error('사용자 정보가 세션에 없습니다.');
//     }
//   }

//   connect = () => {
//     const socket = new WebSocket('ws://localhost:8085/ws');
//     const stompClient = Stomp.over(socket);
//     stompClient.connect({}, this.onConnected, this.onError);
//     this.setState({ stompClient });
//   };

//   onConnected = () => {
//     console.log('Connected to WebSocket');
//     this.setState({ connected: true });
//     // 서버로 사용자명 전달
//     this.state.stompClient.send(
//       '/app/chat.addUser',
//       {},
//       JSON.stringify({ sender: this.state.username, type: 'JOIN' })
//     );
//     // 서버로부터 메시지 받기
//     this.state.stompClient.subscribe('/topic/public', this.onMessageReceived);
//   };

//   onError = (error) => {
//     console.error('Error connecting to WebSocket:', error);
//   };

//   onMessageReceived = (payload) => {
//     const message = JSON.parse(payload.body);
//     this.setState((prevState) => ({
//       messages: [...prevState.messages, message]
//     }));
//   };

//   sendMessage = () => {
//     const { stompClient, message, username } = this.state;
//     if (stompClient && stompClient.connected) { // stompClient가 있고 연결된 상태인지 확인
//       stompClient.send(
//         '/app/chat.sendMessage',
//         {},
//         JSON.stringify({ content: message, sender: username, type: 'CHAT' })
//       );
//       this.setState({ message: '' });
//     } else {
//       console.error('WebSocket connection is not established or disconnected.');
//     }
//   };

//   render() {
//     const { messages, message } = this.state;
//     return (
//       <div>
//         <h1>Chat</h1>
//         <div>
//           {messages.map((msg, index) => (
//             <div key={index}>
//               {msg.sender}: {msg.content}
//             </div>
//           ))}
//         </div>
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => this.setState({ message: e.target.value })}
//         />
//         <button onClick={this.sendMessage}>Send</button>
//       </div>
//     );
//   }
// }

// export default Chat;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chat = () => {
  const [chats, setChats] = useState([]);
  const [latestChat, setLatestChat] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [newChatContent, setNewChatContent] = useState(''); // 새로운 채팅 내용 상태

  useEffect(() => {
    const getSessionIdFromSession = async () => {
      try {
        const userInfoJson = sessionStorage.getItem('myInfo');
        if (userInfoJson) {
          const userInfo = JSON.parse(userInfoJson);
          const { user_id: userId } = userInfo;
          setSessionId(userId);
        } else {
          console.error('세션에서 세션 ID를 찾을 수 없습니다.');
        }
      } catch (error) {
        console.error('세션에서 세션 ID를 가져오는 중 오류가 발생했습니다:', error);
      }
    };

    getSessionIdFromSession();
  }, []);

  useEffect(() => {
    if (sessionId) {
      fetchChats(sessionId);
      fetchLatestChatTimestamp(sessionId);
    }
  }, [sessionId]);

  const fetchChats = async (sessionId) => {
    try {
      const response = await axios.get(`/chats/allchats/${sessionId}`);
      console.log(response);
    } catch (error) {
      console.error('채팅을 가져오는 중 오류가 발생했습니다:', error);
    }
  };

  const fetchLatestChatTimestamp = async (sessionId) => {
    try {
      const response = await axios.get(`/chats/sessionid/${sessionId}`);
      setLatestChat(response);
    } catch (error) {
      console.error('가장 최근 채팅의 타임스탬프를 가져오는 중 오류가 발생했습니다:', error);
    }
  };

  const handleNewChat = async () => {
    const newChatData = {
      sessionId: sessionId,
      userId: 1,
      chatContent: newChatContent,
      chatTimestamp: new Date().toISOString()
    };
  
    try {
      await axios.post('/chats/new', newChatData);
      setNewChatContent(''); // 채팅 입력란 초기화
      await fetchChats(sessionId); // 채팅을 보낸 후에 채팅 목록 업데이트
      await fetchLatestChatTimestamp(sessionId); // 채팅을 보낸 후에 최신 채팅 타임스탬프 업데이트
    } catch (error) {
      console.error('새로운 채팅을 작성하는 중 오류가 발생했습니다:', error);
    }
  };
  

  return (
    <div>
      <h1>Chat Room</h1>
      <div>
        <h2>Chats</h2>
        <ul>
          {chats.map((chat) => (
            <li key={chat.chatId}>{chat.chatContent}</li>
          ))}
        </ul>
      </div>
      <div>
        <input
          type="text"
          value={newChatContent}
          onChange={(e) => setNewChatContent(e.target.value)} // 새로운 채팅 내용 변경 핸들러
        />
        <button onClick={handleNewChat}>Send</button>
      </div>
      <div>
        <h2>Latest Chat Timestamp</h2>
        {latestChat && <p>{latestChat.chatTimestamp}</p>}
      </div>
    </div>
  );
};

export default Chat;



// import React, { useState, useEffect } from 'react';
// import Stomp from 'stompjs';
// import SockJS from 'sockjs-client';

// const Chat = () => {
//   const [chats, setChats] = useState([]);
//   const [latestChat, setLatestChat] = useState(null);
//   const [sessionId, setSessionId] = useState(null);
//   const [newChatContent, setNewChatContent] = useState('');

//   let stompClient;

//   useEffect(() => {
//     const getSessionIdFromSession = async () => {
//       try {
//         const userInfoJson = sessionStorage.getItem('myInfo');
//         if (userInfoJson) {
//           const userInfo = JSON.parse(userInfoJson);
//           const { user_nick : userId } = userInfo;
//           setSessionId(userId);
//         } else {
//           console.error('세션에서 세션 ID를 찾을 수 없습니다.');
//         }
//       } catch (error) {
//         console.error('세션에서 세션 ID를 가져오는 중 오류가 발생했습니다:', error);
//       }
//     };

//     getSessionIdFromSession();
//   }, []);

//   useEffect(() => {
//     if (sessionId) {
//       connect();
//     }
//   }, [sessionId]);

//   const connect = () => {
//     const socket = new SockJS('http://localhost:8085/ws');
//     stompClient = Stomp.over(socket);
//     stompClient.connect({}, onConnected, onError);
//   };

//   const onConnected = () => {
//     console.log('Connected to WebSocket');
//     stompClient.subscribe('/topic/public', onMessageReceived);
//     stompClient.send(
//       '/app/chat.addUser',
//       {},
//       JSON.stringify({ sender: sessionId, type: 'JOIN' })
//     );
//     fetchChats(sessionId);
//     fetchLatestChatTimestamp(sessionId);
//   };

//   const onError = (error) => {
//     console.error('Error connecting to WebSocket:', error);
//   };

//   const onMessageReceived = (payload) => {
//     const message = JSON.parse(payload.body);
//     setChats([...chats, message]);
//   };

//   const fetchChats = async (sessionId) => {
//     // Fetch chats from server and update chats state
//   };

//   const fetchLatestChatTimestamp = async (sessionId) => {
//     // Fetch latest chat timestamp from server and update latestChat state
//   };

//   const handleNewChat = () => {
//     if (stompClient && stompClient.connected) {
//       stompClient.send(
//         '/app/chat.sendMessage',
//         {},
//         JSON.stringify({ content: newChatContent, sender: sessionId, type: 'CHAT' })
//       );
//       setNewChatContent('');
//     } else {
//       console.error('WebSocket connection is not established or disconnected.');
//     }
//   };

//   return (
//     <div>
//       <h1>Chat Room</h1>
//       <div>
//         <h2>Chats</h2>
//         <ul>
//           {chats.map((chat, index) => (
//             <li key={index}>{chat.sender}: {chat.content}</li>
//           ))}
//         </ul>
//       </div>
//       <div>
//         <input
//           type="text"
//           value={newChatContent}
//           onChange={(e) => setNewChatContent(e.target.value)}
//         />
//         <button onClick={handleNewChat}>Send</button>
//       </div>
//       <div>
//         <h2>Latest Chat Timestamp</h2>
//         {latestChat && <p>{latestChat.chatTimestamp}</p>}
//       </div>
//     </div>
//   );
// };

// export default Chat;