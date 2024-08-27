import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaCaretDown, FaSearch, FaBars, FaTimes, FaDiscord } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  height: 80px;
  background-color: #2c3e50;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const NavLogo = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #ffffff;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: #ffffff;
  text-decoration: none;
  margin-right: 20px;
  font-size: 1rem;
  transition: color 0.3s ease;
  &:hover {
    color: #6495ED;
  }
`;

const NavItems = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 5px 10px;
`;

const SearchInput = styled.input`
  padding: 8px 10px;
  border: none;
  background: transparent;
  color: #ffffff;
  font-size: 1rem;
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  color: #6495ED;
  font-size: 1.2rem;
  cursor: pointer;
`;

const AuthButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-left: 10px;
`;

const LoginButton = styled(AuthButton)`
  background-color: transparent;
  color: #6495ED;
  border: 2px solid #6495ED;
  &:hover {
    background-color: rgba(100, 149, 237, 0.1);
  }
`;

const RegisterButton = styled(AuthButton)`
  background-color: #6495ED;
  color: white;
  &:hover {
    background-color: #4169E1;
  }
`;

const UserButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  font-size: 1.1rem;
`;

const ProfilePicture = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 10px;
`;

const UserDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const UserDropdownItem = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  color: #333;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const HamburgerIcon = styled.div`
  display: none;
  cursor: pointer;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 20px;
  @media (max-width: 768px) {
    display: flex;
  }

  span {
    display: block;
    height: 3px;
    width: 100%;
    background-color: white;
    transition: all 0.3s ease;
  }

  &.open {
    span:first-child {
      transform: rotate(45deg) translate(5px, 5px);
    }
    span:nth-child(2) {
      opacity: 0;
    }
    span:last-child {
      transform: rotate(-45deg) translate(5px, -5px);
    }
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const MobileMenu = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #2c3e50;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1500;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;

  @media (max-width: 768px) {
    display: flex;

    &.open {
      opacity: 1;
      pointer-events: auto;
    }

    > * {
      animation: ${fadeIn} 0.3s ease forwards;
      opacity: 0;
      transform: translateY(-20px);
      margin: 10px 0;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`;

const LogoAndLinks = styled.div`
  display: flex;
  align-items: center;
`;

const Header = () => {
  const [loggedInUsername, setLoggedInUsername] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchUserData = async () => {
    const userId = getCookie('userId');
    if (userId) {
      try {
        const response = await axios.get(`https://api.asfaltios.com/api/users/${userId}`);
        setLoggedInUsername(response.data.username);
        setProfilePictureUrl(response.data.profilePictureUrl);
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

  const handleLoginClick = () => {
    navigate('/Login');
    setIsMobileMenuOpen(false);
  };

  const handleRegisterClick = () => {
    navigate('/Register');
    setIsMobileMenuOpen(false);
  };

  const handleUserButtonClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogoutClick = () => {
    document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setLoggedInUsername(null);
    setProfilePictureUrl(null);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <NavBar>
      <LogoAndLinks>
        <NavLogo>Asfaltios</NavLogo>
        <NavLinks>
          <NavLink href="#">Server.Jar</NavLink>
          <NavLink href="#">Paper</NavLink>
          <NavLink href="#"> Discord</NavLink>
        </NavLinks>
      </LogoAndLinks>

      <NavItems>
        <SearchContainer>
          <SearchInput type="text" placeholder="Search..." />
          <SearchButton>
            <FaSearch />
          </SearchButton>
        </SearchContainer>

        {loggedInUsername ? (
          <UserButton onClick={handleUserButtonClick}>
            {profilePictureUrl && <ProfilePicture src={profilePictureUrl} alt="Profile" />}
            {loggedInUsername}
            <FaCaretDown />
          </UserButton>
        ) : (
          <>
            <LoginButton onClick={handleLoginClick}>Login</LoginButton>
            <RegisterButton onClick={handleRegisterClick}>Register</RegisterButton>
          </>
        )}

        {showDropdown && (
          <UserDropdown ref={dropdownRef}>
            <UserDropdownItem onClick={() => navigate('/Profile')}>
              Settings Profile
            </UserDropdownItem>
            <UserDropdownItem onClick={handleLogoutClick}>
              Logout
            </UserDropdownItem>
          </UserDropdown>
        )}
      </NavItems>

      <HamburgerIcon onClick={toggleMobileMenu} className={isMobileMenuOpen ? 'open' : ''}>
        <span></span>
        <span></span>
        <span></span>
      </HamburgerIcon>

      <MobileMenu className={isMobileMenuOpen ? 'open' : ''}>
        <CloseButton onClick={toggleMobileMenu}>
          <FaTimes />
        </CloseButton>
        <NavLink href="#" onClick={() => setIsMobileMenuOpen(false)}>Server.Jar</NavLink>
        <NavLink href="#" onClick={() => setIsMobileMenuOpen(false)}>Paper</NavLink>
        <NavLink href="#" onClick={() => setIsMobileMenuOpen(false)}>Discord</NavLink>
        {loggedInUsername ? (
          <>
            <UserButton onClick={handleUserButtonClick}>
              {profilePictureUrl && <ProfilePicture src={profilePictureUrl} alt="Profile" />}
              {loggedInUsername}
            </UserButton>
            <UserDropdownItem onClick={() => { navigate('/Profile'); setIsMobileMenuOpen(false); }}>
              Settings Profile
            </UserDropdownItem>
            <UserDropdownItem onClick={() => { handleLogoutClick(); setIsMobileMenuOpen(false); }}>
              Logout
            </UserDropdownItem>
          </>
        ) : (
          <>
            <LoginButton onClick={handleLoginClick}>Login</LoginButton>
            <RegisterButton onClick={handleRegisterClick}>Register</RegisterButton>
          </>
        )}
      </MobileMenu>
    </NavBar>
  );
};

export default Header;