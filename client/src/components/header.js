import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { FaSearch, FaCaretDown } from 'react-icons/fa';
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

const UserButton = styled.button`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 2px;
  border: 2px solid white;
  transition: border 0.3s;

  &:hover {
    color: #333;
    border: 2px solid black;
  }
`;

const UserDropdown = styled.div`
  position: absolute;
  top: calc(10);
  left: 80%;
  transform: translateX(-50%);
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 150px; /* Adjust width if needed */
  z-index: 1; /* Ensure the dropdown is above other elements */
`;






const UserDropdownItem = styled.div`
  cursor: pointer;
  padding: 5px;
  &:hover {
    background-color: #f1f1f1;
  }
`;



const CaretIcon = styled(FaCaretDown)`
  margin-left: 5px;
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
  cursor: pointer;
`;

const Header = () => {
  const [smallHeader, setSmallHeader] = useState(false);
  const [textVisible, setTextVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [loggedInUsername, setLoggedInUsername] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setSmallHeader(currentScrollPos > 0);
      setTextVisible(currentScrollPos <= 0); // Adjusted condition here
    };

    window.addEventListener('scroll', handleScroll);
    fetchUserData();

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchUserData = async () => {
    const userId = getCookie('userId');
    if (userId) {
      try {
        const response = await axios.get(`https://198.244.148.54:5000/api/users/${userId}`);
        setLoggedInUsername(response.data.username);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  };

  const getCookie = (name) => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(`${name}=`)) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };
  

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLogoClick = () => {
    navigate('/');
  };
  const handleSearchClick = () => {
    navigate(`/plugins/${searchTerm}`);
  };
  const handleLoginClick = () => {
  navigate('/Login');
  };
  const handleRegisterClick = () => {
  navigate('/Register');
  };
  const handlePluginClick = () => {
  navigate('/Plugins');
  };
  const handleServerClick = () => {
  // Handle server button click
  };
  const handleDiscordClick = () => {
  // Handle discord button click
  };
  const handleUserButtonClick = () => {
  setShowDropdown(!showDropdown);
  };
  const handleSettingsClick = () => {
  // Handle settings button click
  console.log('Settings clicked');
  };
  const handleLogoutClick = () => {
  // Handle logout button click
  console.log('Logout clicked');
  // Clear the userId cookie
  document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  setLoggedInUsername(null);


  
  };
  return (
  <>
  <GlobalStyle />
  <HeaderContainer small={smallHeader}>
  <SquareBrackets small={smallHeader}>
  「<HeaderText visible={textVisible } onClick={handleLogoClick}> Asfaltios </HeaderText>」
  <ButtonContainer>
  <Button onClick={handlePluginClick}>Plugins</Button>
  <Button onClick={handleServerClick}>server.js</Button>
  <Button onClick={handleDiscordClick}>Discord</Button>
  </ButtonContainer>
  </SquareBrackets>
  <ButtonContainer>
  {loggedInUsername ? (
  <div ref={dropdownRef}>
  <UserButton onClick={handleUserButtonClick}>
  {loggedInUsername} <CaretIcon />
  </UserButton>
  {showDropdown && (
  <UserDropdown>
  <UserDropdownItem onClick={handleSettingsClick}>
  Settings Profile
  </UserDropdownItem>
  <UserDropdownItem onClick={handleLogoutClick}>
  Logout
  </UserDropdownItem>
  </UserDropdown>
  )}
  </div>
  ) : (
  <>
  <Button onClick={handleLoginClick}>Login</Button>
  <Button onClick={handleRegisterClick}>Register</Button>
  </>
  )}
  <SearchBarContainer>
  <SearchBar
  type="text"
  placeholder="Search..."
  value={searchTerm}
  onChange={handleSearchChange}
  onKeyDown={handleSearchKeyDown}
/>
  <SearchButton onClick={handleSearchClick}  >
  <FaSearch />
  </SearchButton>
  </SearchBarContainer>
  </ButtonContainer>
  </HeaderContainer>
  </>
  );
  };
  export default Header;