import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { FaBars, FaTimes, FaSearch, FaPlug, FaServer, FaDiscord } from 'react-icons/fa';
import axios from 'axios';
import logo from '../bilder/logo3.png';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: Arial, sans-serif;
  }
`;

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 110px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 10px 20px;
  z-index: 1000;
`;

const AboveHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background-color: white;
  z-index: 999;
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
`;

const LogoImage = styled.img`
  width: 80px;
  height: auto;
`;

const MenuIcon = styled.div`
  margin-right: 40px;
  cursor: pointer;
`;

const MenuContainer = styled.div`
  position: fixed;
  top: 80px;
  left: 0;
  width: 100%;
  height: ${props => (props.open ? 'calc(100vh - 80px)' : '0')};
  background-color: white;
  z-index: 998;
  overflow: hidden;
  transition: height 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding-top: 60px;
`;

const MenuItem = styled.div`
  width: 100%;
  padding: 20px 0;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }

  svg {
    margin-right: 10px;
    font-size: 20px;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  width: 100%;
  max-width: 400px;
  margin: 20px 0;
`;

const SearchInput = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px 0 0 4px;
  font-size: 16px;
  flex-grow: 1;
`;

const SearchButton = styled.div`
  cursor: pointer;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border-radius: 0 4px 4px 0;
  display: flex;
  align-items: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

const AuthButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px 0;
  margin-top: 20px;
`;

const AuthButton = styled.div`
  padding: 12px 24px;
  font-size: 18px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 0 10px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const SettingsButton = styled(AuthButton)`
  background-color: #007bff;
  color: white;

  &:hover {
    background-color: #0056b3;
  }
`;

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [userId, setUserId] = useState(null); // Store userId directly
  const navigate = useNavigate();

  useEffect(() => {
    const userIdFromCookie = getCookie('userId');
    console.log('Fetched userId from cookie:', userIdFromCookie);
    if (userIdFromCookie) {
      setUserId(userIdFromCookie);
    }
  }, []);

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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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

  const handleLoginClick = () => {
    navigate('/Login');
  };

  const handleRegisterClick = () => {
    navigate('/Register');
  };

  const handleLogoutClick = () => {
    document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setUserId(null);
    console.log('User logged out');
    navigate('/');
  };

  const handleSettingsClick = () => {
    navigate('/profile');
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      navigate(`/plugins/${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
      setMenuOpen(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <GlobalStyle />
      <AboveHeader />
      <HeaderContainer>
        <LogoLink to="/">
          <LogoImage src={logo} alt="Logo" />
        </LogoLink>
        <MenuIcon onClick={toggleMenu}>
          {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </MenuIcon>
      </HeaderContainer>
      <MenuContainer open={menuOpen}>
        <MenuItem onClick={handlePluginClick}>
          <FaPlug /> Plugins
        </MenuItem>
        <MenuItem onClick={handleServerClick}>
          <FaServer /> server.js
        </MenuItem>
        <MenuItem onClick={handleDiscordClick}>
          <FaDiscord /> Discord
        </MenuItem>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Search for plugins..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <SearchButton onClick={handleSearch}>
            <FaSearch size={18} />
          </SearchButton>
        </SearchContainer>
        <AuthButtonsContainer>
          {userId ? (
            <>
              <SettingsButton onClick={handleSettingsClick}>Settings</SettingsButton>
              <AuthButton onClick={handleLogoutClick}>Logout</AuthButton>
            </>
          ) : (
            <>
              <AuthButton onClick={handleLoginClick}>Login</AuthButton>
              <AuthButton onClick={handleRegisterClick}>Register</AuthButton>
            </>
          )}
        </AuthButtonsContainer>
      </MenuContainer>
    </>
  );
};

export default Header;
