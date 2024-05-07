import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  opacity: ${props => (props.small ? '0' : '1')};
  transition: opacity 0.5s, font-size 0.5s;
`;

const SquareBrackets = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* Center the content horizontally */
  font-family: 'Tesla', sans-serif;
  font-size: ${props => (props.small ? '44px' : '44px')};
  margin-left: 50px;
  color: black;
  opacity: 1;
  font-weight: bold;
  line-height: 1;
  height: 100%; /* Set height to 100% to align vertically */
`;


const SearchBarContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 50px; /* Add margin to the right to make space for the icon */
`;

const SearchBar = styled.input`
  width: 200px;
  padding: 10px 30px 10px 10px;
  font-size: 16px;
  border: 2px solid black;
  border-radius: 2px;
  transition: width 0.3s, padding 0.3s, font-size 0.3s, border 0.3s;
  position: relative; /* Change the position to relative */
`;

const SearchButton = styled.button`
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  right: 10px; /* Adjust the position of the icon */
  top: 60%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  font-size: 16px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  margin-right: 20px; /* Increase the margin */
  transition: color 0.3s; /* Add transition effect */
  padding: 10px 20px;
  border-radius: 2px;
  border: 2px solid white;
  transition: border 0.3s;
  
  &:hover {
    color: #333; /* Change color on hover */
    border: 2px solid black;
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

const HeaderText = styled.div`
  font-family: 'Tesla', sans-serif;
  font-size: 24px;
  color: black;
  overflow: hidden;
  white-space: nowrap;
  margin: 0 5px; /* Adjusted margin */
  animation: ${props => (props.visible ? appearTextAnimation : deleteTextAnimation)} 0.5s forwards;
  line-height: 1; /* Ensure text is vertically centered */
`;

const Header = () => {
  const [smallHeader, setSmallHeader] = useState(false);
  const [textVisible, setTextVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    navigate(`/${searchTerm}`);
  };

  const handleLoginClick = () => {
    navigate('/Login');
  };

  const handleRegisterClick = () => {
    navigate('/Register');
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

  return (
    <>
      <GlobalStyle />
      <HeaderContainer small={smallHeader}>
        <SquareBrackets small={smallHeader}>
          「<HeaderText visible={textVisible}> Asfaltios </HeaderText>」
          <ButtonContainer>
            <Button onClick={handlePluginClick}>Plugins</Button>
            <Button onClick={handleServerClick}>server.js</Button>
            <Button onClick={handleDiscordClick}>Discord</Button>
          </ButtonContainer>
        </SquareBrackets>
        <ButtonContainer>
          <Button onClick={handleLoginClick}>Login</Button>
          <Button onClick={handleRegisterClick}>Register</Button>
          <SearchBarContainer>
            <SearchBar type="text" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} />
            <SearchButton onClick={handleSearchClick}>
              <FaSearch />
            </SearchButton>
          </SearchBarContainer>
        </ButtonContainer>
      </HeaderContainer>
    </>
  );
};

export default Header;
