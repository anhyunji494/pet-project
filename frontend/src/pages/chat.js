import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';


const colors = [
  '#2196F3', '#32c787', '#00BCD4', '#ff5652',
  '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
];

const ChatApp = () => {
  const [username, setUsername] = useState('');
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [connecting, setConnecting] = useState(false); // 변경: 초기값 false로 설정

  useEffect(() => {
    const socket = new SockJS('/ws');
    const client = Stomp.over(socket);
    setStompClient(client);

    return () => {
      if (client) {
        client.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (stompClient && username.trim() !== '') { // 변경: username이 비어 있지 않은 경우에만 연결 시도
      const onConnected = () => {
        setConnecting(false); // 변경: 연결 완료 시 connecting 상태 변경
        stompClient.subscribe('/topic/public', onMessageReceived);
        stompClient.send("/app/chat.addUser", {}, JSON.stringify({ sender: username, type: 'JOIN' }));
      };

      const onError = (error) => {
        console.error('Could not connect to WebSocket server. Please refresh this page to try again!', error);
        setConnecting(false); // 변경: 연결 실패 시 connecting 상태 변경
      };

      setConnecting(true); // 변경: 연결 시도 중일 때 connecting 상태 변경
      stompClient.connect({}, onConnected, onError);
    }

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [stompClient, username]);

  const sendMessage = (event) => {
    event.preventDefault();
    const messageContent = messageInput.trim();

    if (messageContent && stompClient) {
      const chatMessage = {
        sender: username,
        content: messageInput,
        type: 'CHAT'
      };

      stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
      setMessageInput('');
    }
  };

  const onMessageReceived = (payload) => {
    const message = JSON.parse(payload.body);
    setMessages(prevMessages => [...prevMessages, message]);
  };

  const handleUsernameSubmit = (event) => {
    event.preventDefault();
    if (username.trim() !== '') { // 변경: username이 비어 있지 않은 경우에만 처리
      setUsername(username.trim());
    }
  };

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage(event);
    }
  };

  return (
    <div>
      {connecting && <div className="connecting">Connecting...</div>}
      {!username && (
        <div id="username-page">
          <div className="username-page-container">
            <h1 className="title">Type your username</h1>
            <form onSubmit={handleUsernameSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  id="name"
                  placeholder="Username"
                  autoComplete="off"
                  className="form-control"
                  value={username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <button type="submit" className="accent username-submit">Start Chatting</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {username && (
        <div id="chat-page">
          <div className="chat-container">
            <div className="chat-header">
              <h2>Spring WebSocket Chat Demo</h2>
            </div>
            <ul id="messageArea">
              {messages.map((message, index) => (
                <li key={index} className={message.type === 'JOIN' || message.type === 'LEAVE' ? 'event-message' : 'chat-message'}>
                  {message.type !== 'JOIN' && message.type !== 'LEAVE' && (
                    <i style={{ backgroundColor: getAvatarColor(message.sender) }}>
                      {message.sender[0]}
                    </i>
                  )}
                  <span>{message.sender}</span>
                  <p>{message.content}</p>
                </li>
              ))}
            </ul>
            <form id="messageForm" name="messageForm" onSubmit={sendMessage}>
              <div className="form-group">
                <div className="input-group clearfix">
                  <input
                    type="text"
                    id="message"
                    placeholder="Type a message..."
                    autoComplete="off"
                    className="form-control"
                    value={messageInput}
                    onChange={(event) => setMessageInput(event.target.value)}
                    onKeyPress={handleInputKeyPress}
                  />
                  <button type="submit" className="primary">Send</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

function getAvatarColor(messageSender) {
  let hash = 0;
  for (let i = 0; i < messageSender.length; i++) {
    hash = 31 * hash + messageSender.charCodeAt(i);
  }
  const index = Math.abs(hash % colors.length);
  return colors[index];
}

export default ChatApp;
