import React from 'react';
import styled from 'styled-components';

const ChatHistory = ({ history, onSelectChat }) => {
  return (
    <HistoryContainer>
      {history.map((chat, index) => (
        <ChatItem key={index} onClick={() => onSelectChat(chat)}>
          <ChatDate>{chat.date}</ChatDate>
          <ChatPreview>{chat.preview}</ChatPreview>
        </ChatItem>
      ))}
    </HistoryContainer>
  );
};

const HistoryContainer = styled.div`
  width: 250px;
  background-color: #fff;
  border-right: 1px solid #ccc;
  overflow-y: auto;
`;

const ChatItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const ChatDate = styled.div`
  font-weight: bold;
`;

const ChatPreview = styled.div`
  color: #666;
`;

export default ChatHistory;