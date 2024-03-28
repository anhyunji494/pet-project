import React, { Component } from 'react';
import Stomp from 'stompjs';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: '',
      stompClient: null,
      username: '', // 사용자명
      connected: false // 웹소켓 연결 상태
    };
  }

  componentDidMount() {
    // 세션에서 사용자명을 가져옴
    const username = sessionStorage.getItem('user_nick');
    if (username) {
      this.setState({ username });
      this.connect();
    } else {
      // 사용자가 로그인되지 않은 경우 로그인 페이지로 리다이렉트 또는 처리
      console.error('사용자가 로그인되지 않았습니다.');
    }
  }

  connect = () => {
    const socket = new WebSocket('ws://localhost:8085/ws');
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, this.onConnected, this.onError);
    this.setState({ stompClient });
  };

  onConnected = () => {
    console.log('Connected to WebSocket');
    this.setState({ connected: true });
    // 서버로 사용자명 전달
    this.state.stompClient.send(
      '/app/chat.addUser',
      {},
      JSON.stringify({ sender: this.state.username, type: 'JOIN' })
    );
    // 서버로부터 메시지 받기
    this.state.stompClient.subscribe('/topic/public', this.onMessageReceived);
  };

  onError = (error) => {
    console.error('Error connecting to WebSocket:', error);
  };

  onMessageReceived = (payload) => {
    const message = JSON.parse(payload.body);
    this.setState((prevState) => ({
      messages: [...prevState.messages, message]
    }));
  };

  sendMessage = () => {
    const { stompClient, message, username } = this.state;
    if (stompClient && stompClient.connected) { // stompClient가 있고 연결된 상태인지 확인
      stompClient.send(
        '/app/chat.sendMessage',
        {},
        JSON.stringify({ content: message, sender: username, type: 'CHAT' })
      );
      this.setState({ message: '' });
    } else {
      console.error('WebSocket connection is not established or disconnected.');
    }
  };

  render() {
    const { messages, message } = this.state;
    return (
      <div>
        <h1>Chat</h1>
        <div>
          {messages.map((msg, index) => (
            <div key={index}>
              {msg.sender}: {msg.content}
            </div>
          ))}
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => this.setState({ message: e.target.value })}
        />
        <button onClick={this.sendMessage}>Send</button>
      </div>
    );
  }
}

export default Chat;
