import React, { useState } from 'react';
import styled from 'styled-components';

const AppBar = ({ onProfileClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleProfileClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Bar>
      <Title>Chat App RAG</Title>
      <ProfileContainer>
        <ProfileButton onClick={handleProfileClick}>P</ProfileButton>
        {menuOpen && (
          <Menu>
            <MenuItem onClick={onProfileClick}>Logout</MenuItem>
          </Menu>
        )}
      </ProfileContainer>
    </Bar>
  );
};

const Bar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 30px; /* Tăng chiều cao của AppBar */
  background-color: #007bff;
  color: white;
  position: relative;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const ProfileContainer = styled.div`
  position: absolute;
  right: 20px;
`;

const ProfileButton = styled.button`
  background-color: white;
  color: #007bff;
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Menu = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const MenuItem = styled.div`
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export default AppBar;