import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaCaretDown, FaSearch, FaBars, FaTimes, FaDiscord } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const NavBar = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  height: 10rem;
  background-color: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;

  @media (max-width: 768px) {
    padding: 0 20px;
    height: 80px;
  }
`;

const NavLogo = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #3b82f6;
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
  color: #93c5fd;
  text-decoration: none;
  margin-right: 20px;
  font-size: 1rem;
  transition: color 0.3s ease;
  &:hover {
    color: #3b82f6;
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
  background-color: rgba(59, 130, 246, 0.1);
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
  color: #3b82f6;
  font-size: 1.2rem;
  cursor: pointer;
`;

const AuthButton = styled(motion.button)`
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
  color: #3b82f6;
  border: 2px solid #3b82f6;
  &:hover {
    background-color: rgba(59, 130, 246, 0.1);
  }
`;

const RegisterButton = styled(AuthButton)`
  background-color: #3b82f6;
  color: white;
  &:hover {
    background-color: #2563eb;
  }
`;

const UserButton = styled(motion.button)`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: #93c5fd;
  cursor: pointer;
  font-size: 1.1rem;
`;

const ProfilePicture = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 10px;
  border: 2px solid #3b82f6;
`;

const UserDropdown = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(59, 130, 246, 0.3);
  overflow: hidden;
`;

const UserDropdownItem = styled(motion.div)`
  padding: 10px 15px;
  cursor: pointer;
  color: #93c5fd;
  &:hover {
    background-color: rgba(59, 130, 246, 0.1);
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
    background-color: #3b82f6;
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

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: #3b82f6;
  font-size: 1.5rem;
  cursor: pointer;
`;

const MobileNavLink = styled(motion.a)`
  color: #93c5fd;
  text-decoration: none;
  margin: 15px 0;
  font-size: 1.2rem;
  transition: color 0.3s ease;
  &:hover {
    color: #3b82f6;
  }
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

  const menuVariants = {
    closed: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <NavBar
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
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

        <AnimatePresence>
          {showDropdown && (
            <UserDropdown
              ref={dropdownRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <UserDropdownItem onClick={() => navigate('/Profile')}>
                Settings Profile
              </UserDropdownItem>
              <UserDropdownItem onClick={handleLogoutClick}>
                Logout
              </UserDropdownItem>
            </UserDropdown>
          )}
        </AnimatePresence>
      </NavItems>

      <HamburgerIcon onClick={toggleMobileMenu} className={isMobileMenuOpen ? 'open' : ''}>
        <span></span>
        <span></span>
        <span></span>
      </HamburgerIcon>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <CloseButton onClick={toggleMobileMenu}>
              <FaTimes />
            </CloseButton>
            <MobileNavLink href="#" onClick={() => setIsMobileMenuOpen(false)} variants={itemVariants}>
              Server.Jar
            </MobileNavLink>
            <MobileNavLink href="#" onClick={() => setIsMobileMenuOpen(false)} variants={itemVariants}>
              Paper
            </MobileNavLink>
            <MobileNavLink href="#" onClick={() => setIsMobileMenuOpen(false)} variants={itemVariants}>
              Discord
            </MobileNavLink>
            {loggedInUsername ? (
              <>
                <UserButton onClick={handleUserButtonClick} variants={itemVariants}>
                  {profilePictureUrl && <ProfilePicture src={profilePictureUrl} alt="Profile" />}
                  {loggedInUsername}
                </UserButton>
                <UserDropdownItem 
                  onClick={() => { navigate('/Profile'); setIsMobileMenuOpen(false); }}
                  variants={itemVariants}
                >
                  Settings Profile
                </UserDropdownItem>
                <UserDropdownItem 
                  onClick={() => { handleLogoutClick(); setIsMobileMenuOpen(false); }}
                  variants={itemVariants}
                >
                  Logout
                </UserDropdownItem>
              </>
            ) : (
              <>
                <LoginButton onClick={handleLoginClick} variants={itemVariants}>Login</LoginButton>
                <RegisterButton onClick={handleRegisterClick} variants={itemVariants}>Register</RegisterButton>
              </>
            )}
          </MobileMenu>
        )}
      </AnimatePresence>
    </NavBar>
  );
};

export default Header;