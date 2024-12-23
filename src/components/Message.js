import React from 'react';
import styled from 'styled-components';

const Message = ({ text, sender }) => {
  return (
    <MessageContainer sender={sender}>
      <MessageText sender={sender}>{text}</MessageText>
    </MessageContainer>
  );
};

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ sender }) => (sender === 'user' ? 'flex-end' : 'flex-start')};
  margin-bottom: 10px;
`;

const MessageText = styled.div`
  background-color: ${({ sender }) => (sender === 'user' ? '#007bff' : '#e5e5ea')};
  color: ${({ sender }) => (sender === 'user' ? '#fff' : '#000')};
  padding: 10px;
  border-radius: 10px;
  max-width: 60%;
`;

export default Message;