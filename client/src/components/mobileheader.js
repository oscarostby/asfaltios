import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { FaSearch, FaCaretDown, FaBars, FaTimes } from 'react-icons/fa';
import TeslaFont from '../bilder/TESLA.ttf';
import axios from 'axios';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Tesla';
    src: url(${TeslaFont}) format('truetype');
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 20px;
  height: ${props => (props.small ? '40px' : '140px')};
  position: fixed;
  width: 100%;
  z-index: 1000;
  transition: height 0.3s, top 0.3s;
  top: 0;
`;

const SquareBrackets = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-family: 'Tesla', sans-serif;
  font-size: ${props => (props.small ? '44px' : '44px')};
  margin-left: 20px;
  color: black;
  opacity: 1;
  font-weight: bold;
  line-height: 1;
  height: 100%;
`;

const HeaderText = styled.div`
  font-family: 'Tesla', sans-serif;
  font-size: 24px;
  color: black;
  overflow: hidden;
  white-space: nowrap;
  margin: 0 5px;
  animation: ${props => (props.visible ? appearTextAnimation : deleteTextAnimation)} 0.5s forwards;
  line-height: 1;
`;

const appearTextAnimation = keyframes`
  0% {
    content: "";
    width: 0;
  }
  100% {
    content: "Asfaltios";
    width: 135px;
  }
`;

const deleteTextAnimation = keyframes`
  0% {
    content: "Asfaltios";
    width: 135px;
  }
  100% {
    content: "";
    width: 0;
  }
`;

const MenuIcon = styled.div`
  margin-right: 30px;
`;

const MenuContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${props => (props.open ? '100vh' : '0')};
  background-color: white;
  z-index: 999;
  overflow: hidden;
  transition: height 0.3s;
  top: 7%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MenuItem = styled.div`
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Button = styled.button`
  font-size: 16px;
  cursor: pointer;
  background-color: #f1f1f1;
  border: none;
  margin: 0 10px;
  transition: background-color 0.3s;
  padding: 10px 20px;
  border-radius: 4px;
  color: #333;
  width: 120px;
  font-weight: bold;
  
  &:hover {
    background-color: #e1e1e1;
  }
`;

const Header = () => {
  const [smallHeader, setSmallHeader] = useState(false);
  const [textVisible, setTextVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setSmallHeader(currentScrollPos > 0);
      setTextVisible(currentScrollPos <= 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handlePluginClick = () => {
    navigate('/PluginsList');
  };

  const handleServerClick = () => {
    // Handle server button click
  };

  const handleDiscordClick = () => {
    // Handle discord button click
  };

  const handleLoginClick = () => {
    navigate('/Login');
  };

  const handleRegisterClick = () => {
    navigate('/Register');
  };

  const handleSearchChange = (e) => {
    // Handle search change
  };

  const handleSearchClick = () => {
    // Handle search click
  };

  return (
    <>
      <GlobalStyle />
      <HeaderContainer small={smallHeader}>
        <SquareBrackets small={smallHeader}>
          「<HeaderText visible={textVisible}>Asfaltios</HeaderText>」
        </SquareBrackets>
        <MenuIcon onClick={toggleMenu}>
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </MenuIcon>
      </HeaderContainer>
      <MenuContainer open={menuOpen}>
        <MenuItem onClick={handleSearchClick}>Search</MenuItem>
        <ButtonContainer>
          <Button onClick={handleLoginClick}>Login</Button>
          <Button onClick={handleRegisterClick}>Register</Button>
        </ButtonContainer>
        <MenuItem onClick={handlePluginClick}>Plugins</MenuItem>
        <MenuItem onClick={handleServerClick}>server.js</MenuItem>
        <MenuItem onClick={handleDiscordClick}>Discord</MenuItem>
      </MenuContainer>
    </>
  );
};

export default Header;