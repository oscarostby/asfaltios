import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import TeslaFont from '../bilder/TESLA.ttf';

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
  top: 0; /* Always at the top */
`;

const Logo = styled.div`
  font-family: 'Tesla', sans-serif;
  font-size: ${props => (props.small ? '24px' : '32px')};
  color: black;
  margin-left: 40px;
  opacity: ${props => (props.small ? '0' : '1')};
  transition: opacity 0.5s, font-size 0.5s;
`;

const SquareBrackets = styled.div`
  display: flex;
  align-items: center; /* Align items vertically */
  font-family: 'Tesla', sans-serif;
  font-size: ${props => (props.small ? '44px' : '44px')};
  margin-left: 20px;
  margin
  color: black;
  opacity: 1;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 0 10px;
  background-color: transparent;
  border: 1px solid black;
  color: black;
  cursor: pointer;
  font-size: 16px;
`;

const SearchIcon = styled(FaSearch)`
  font-size: 24px;
  color: black;
  cursor: pointer;
`;

const deleteTextAnimation = keyframes`
  0% {
    content: "Asfaltios";
    width: 120px;
  }
  100% {
    content: "";
    width: 0;
  }
`;

const appearTextAnimation = keyframes`
  0% {
    content: "";
    width: 0;
  }
  100% {
    content: "Asfaltios";
    width: 120px;
  }
`;

const HeaderText = styled.div`
  font-family: 'Tesla', sans-serif;
  font-size: 24px;
  color: black;
  overflow: hidden;
  white-space: nowrap;
  margin-left: 5px; /* Adjusted margin */
  animation: ${props => (props.visible ? appearTextAnimation : deleteTextAnimation)} 0.5s forwards;
`;

const Header = () => {
  const [smallHeader, setSmallHeader] = useState(false);
  const [textVisible, setTextVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setSmallHeader(currentScrollPos > 0);
      setTextVisible(currentScrollPos <= 0); // Adjusted condition here
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <HeaderContainer small={smallHeader}>
        <SquareBrackets small={smallHeader}>
          [ <HeaderText visible={textVisible}>Asfaltio </HeaderText> ]
        </SquareBrackets>

      </HeaderContainer>
    </>
  );
};

export default Header;
