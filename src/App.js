import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import ChatHistory from './components/ChatHistory';
import AppBar from './components/AppBar';
import styled from 'styled-components';

function App() {
  const [history, setHistory] = useState([
    //{ date: '2023-10-01', preview: 'Hello, how can I help you?' },
    //{ date: '2023-10-02', preview: 'What is your name?' },
    // Thêm các đoạn chat khác vào đây
  ]);

  const handleSelectChat = (chat) => {
    // Xử lý khi người dùng chọn một đoạn chat từ lịch sử
    console.log('Selected chat:', chat);
  };

  const handleProfileClick = () => {
    // Xử lý khi người dùng bấm vào nút hồ sơ
    console.log('Profile button clicked');
    // Thêm logic đăng xuất ở đây
  };

  return (
    <AppContainer>
      <AppBar onProfileClick={handleProfileClick} />
      <Content>
        <ChatHistory history={history} onSelectChat={handleSelectChat} />
        <ChatWindowContainer>
          <ChatWindow />
        </ChatWindowContainer>
      </Content>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
`;

const ChatWindowContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px); /* Trừ đi chiều cao của AppBar */
`;

export default App;
