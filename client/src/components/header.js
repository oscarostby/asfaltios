import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaCaretDown, FaSearch, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import logoVideo from '../bilder/navlogowhite.mp4';

// Styled components
const NavBar = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  height: 12rem;
  background-color: #ffffff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  @media (max-width: 768px) {
    padding: 0 20px;
    height: 170px;
  }
`;

const NavLogo = styled.div`
  width: 300px;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
`;

const LogoVideo = styled.video`
  width: 100%;
  height: auto;
  max-height: 100%;
  object-fit: contain;
  display: block;
`;

const NavLinks = styled(motion.div)`
  display: flex;
  align-items: center;
  margin-left: 20px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: #000000;
  text-decoration: none;
  margin-right: 20px;
  font-size: 1rem;
  transition: color 0.3s ease;
  &:hover {
    color: #555555;
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
  background-color: #f0f0f0;
  border-radius: 20px;
  padding: 5px 10px;
`;

const SearchInput = styled.input`
  padding: 8px 10px;
  border: none;
  background: transparent;
  color: #000000;
  font-size: 1rem;
  &::placeholder {
    color: #888888;
  }
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  color: #000000;
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
  color: #000000;
  border: 2px solid #000000;
  &:hover {
    background-color: #e0e0e0;
  }
`;

const RegisterButton = styled(AuthButton)`
  background-color: #000000;
  color: white;
  border: 2px solid #000000;
  &:hover {
    background-color: #333333;
  }
`;

const UserButton = styled(motion.button)`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: #000000;
  cursor: pointer;
  font-size: 1.1rem;
`;

const ProfilePicture = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 10px;
  border: 2px solid #000000;
`;

const UserDropdown = styled(motion.div)`
  position: absolute;
  top: 75%;
  right: 3%;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const UserDropdownItem = styled(motion.div)`
  padding: 10px 15px;
  cursor: pointer;
  color: #000000;
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
    background-color: #000000;
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
  background-color: #ffffff;
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
  color: #000000;
  font-size: 1.5rem;
  cursor: pointer;
`;

const MobileNavLink = styled(motion.a)`
  color: #000000;
  text-decoration: none;
  margin: 15px 0;
  font-size: 1.2rem;
  transition: color 0.3s ease;
  &:hover {
    color: #555555;
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
  const [searchQuery, setSearchQuery] = useState('');
  const [videoCompleted, setVideoCompleted] = useState(false);
  const videoRef = useRef(null);
  const dropdownRef = useRef(null);
  const lastScrollTop = useRef(0);
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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleScroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop.current) {
        // Scrolling down
        if (video.currentTime < video.duration) {
          video.playbackRate = 1.2;
          video.play();
        }
      } else if (st < lastScrollTop.current) {
        // Scrolling up
        if (video.currentTime > 0) {
          // Instead of setting a negative playback rate, we'll manually decrease the currentTime
          video.currentTime = Math.max(0, video.currentTime - 0.1);
        }
      }
      lastScrollTop.current = st <= 0 ? 0 : st;
    };

    const handleVideoUpdate = () => {
      if (video.currentTime >= video.duration - 0.1) {
        video.pause();
        setVideoCompleted(true);
      } else if (video.currentTime <= 0.1) {
        video.pause();
        setVideoCompleted(false);
      }
    };

    video.addEventListener('timeupdate', handleVideoUpdate);
    window.addEventListener('scroll', handleScroll);

    return () => {
      video.removeEventListener('timeupdate', handleVideoUpdate);
      window.removeEventListener('scroll', handleScroll);
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

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/plugins/${searchQuery.trim()}`);
    }
  };

  return (
    <NavBar
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <LogoAndLinks>
        <NavLogo>
          <LogoVideo
            ref={videoRef}
            src={logoVideo}
            muted
            playsInline
            preload="auto"
          />
        </NavLogo>
        <NavLinks
          animate={{
            x: videoCompleted ? '-10rem' : '0rem',
          }}
          transition={{ duration: 0.5 }}
        >
          <NavLink href="https://asfaltios.com/plugins">Plugins</NavLink>
          <NavLink href="https://www.spigotmc.org/resources/authors/asfaltios.2112342/">Spigot</NavLink>
          <NavLink href="https://discord.gg/ESZtT2aDS3">Discord</NavLink>
        </NavLinks>
      </LogoAndLinks>

      <NavItems>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <SearchButton onClick={handleSearch}>
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
              transition={{ duration: 0.3 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <UserDropdownItem onClick={() => navigate('/profile')}>
                Profile
              </UserDropdownItem>
              <UserDropdownItem onClick={handleLogoutClick}>Logout</UserDropdownItem>
            </UserDropdown>
          )}
        </AnimatePresence>
      </NavItems>

      <HamburgerIcon
        className={isMobileMenuOpen ? 'open' : ''}
        onClick={toggleMobileMenu}
      >
        <span />
        <span />
        <span />
      </HamburgerIcon>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
          >
            <CloseButton onClick={toggleMobileMenu}>
              <FaTimes />
            </CloseButton>
            <MobileNavLink href="https://asfaltios.com/plugins">Plugins</MobileNavLink>
            <MobileNavLink href="https://www.spigotmc.org/resources/authors/asfaltios.2112342/">Spigot</MobileNavLink>
            <MobileNavLink href="https://discord.gg/ESZtT2aDS3">Discord</MobileNavLink>
            <MobileNavLink onClick={handleLoginClick}>Login</MobileNavLink>
            <MobileNavLink onClick={handleRegisterClick}>Register</MobileNavLink>
          </MobileMenu>
        )}
      </AnimatePresence>
    </NavBar>
  );
};

export default Header;