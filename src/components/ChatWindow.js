import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Message from './Message';
import InputBox from './InputBox';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Lấy lịch sử tin nhắn khi component được mount
    axios.get('http://localhost:3001/api/history')
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the messages!', error);
      });
  }, []);

  const handleSendMessage = (message) => {
    const newMessage = { text: message, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    axios.post('http://localhost:3001/api/chat', { sender: 'user', text: message })
      .then(response => {
        handleRespondMessage(response.data.reply);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  const handleRespondMessage = (reply) => {
    const newReply = { text: reply, sender: 'bot' };
    setMessages(prevMessages => [...prevMessages, newReply]);
    axios.post('http://localhost:3001/api/chat', { sender: 'bot', text: reply })
      .then(response => {
        console.log('Bot response saved:', response.data);
      })
      .catch(error => {
        console.error('There was an error saving the bot response!', error);
      });
  };

  return (
    <Container>
      <MessagesContainer>
        {messages.map((msg, index) => (
          <Message key={index} text={msg.text} sender={msg.sender} />
        ))}
      </MessagesContainer>
      <InputBox onSendMessage={handleSendMessage} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

export default ChatWindow;