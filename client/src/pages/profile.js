import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import HeaderComponent from '../components/header';
import MobileHeader from '../components/mobileheader';

import { FaDownload, FaTrash, FaRedo } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MainContent = styled.main`
  padding-top: 60px;
`;

const ProfileContainer = styled.div`
  position: relative;
`;

const Banner = styled.div`
  width: 100%;
  height: 400px;
  background-color: ${props => props.color || '#ffffff'};
  transition: background-color 0.5s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const WelcomeMessage = styled.h2`
  color: white;
  font-size: 2rem;
  text-align: center;
  position: absolute;
  width: 100%;
  
  /* Mobile positioning (default) */
  top: 50%;
  transform: translateY(-50%);

  /* Desktop positioning */
  @media (min-width: 768px) {
    top: 60%;
    transform: translateY(-60%);
  }
`;

const ProfilePictureContainer = styled.div`
  position: absolute;
  top: 275px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;

  @media (min-width: 768px) {
    left: 200px;
    transform: translateX(0);
  }
`;

const ProfilePicture = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid white;
  transition: filter 0.3s ease;
`;

const ProfilePictureOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const ChangeProfilePictureText = styled.span`
  color: white;
  font-size: 1rem;
  text-align: center;
`;

const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 150px;
  padding: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const Message = styled.p`
  color: ${({ success }) => (success ? 'green' : 'red')};
  font-weight: bold;
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const StaffLink = styled(Link)`
  color: #64ffda;
  font-weight: bold;
  font-size: 1.2rem;
  margin-top: 20px;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #4a90e2;
  }
`;

const Profile = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const [newProfilePictureUrl, setNewProfilePictureUrl] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [username, setUsername] = useState('');
  const [bannerColor, setBannerColor] = useState('#ffffff');
  const [showPopup, setShowPopup] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    fetchProfileData();
  }, []);

  useEffect(() => {
    if (profilePictureUrl) {
      console.log('Profile picture URL:', profilePictureUrl);
      extractDominantColor(profilePictureUrl);
    }
  }, [profilePictureUrl]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const fetchProfileData = async () => {
    const userId = getCookie('userId');
    if (userId) {
      try {
        const response = await axios.get(`https://api.asfaltios.com/api/users/${userId}`);
        setProfilePictureUrl(response.data.profilePictureUrl);
        setUsername(response.data.username);
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

  const handleProfilePictureChange = async () => {
    if (newProfilePictureUrl) {
      const userId = getCookie('userId');
      if (userId) {
        try {
          await axios.post(`https://api.asfaltios.com/api/users/${userId}/updateProfilePicture`, {
            profilePictureUrl: newProfilePictureUrl
          });
          setProfilePictureUrl(newProfilePictureUrl);
          setMessage('Profile picture updated successfully');
          setIsSuccess(true);
          extractDominantColor(newProfilePictureUrl);
          setShowPopup(false);
        } catch (error) {
          console.error('Error updating profile picture:', error);
          setMessage('Failed to update profile picture');
          setIsSuccess(false);
        }
      }
    }
  };

  const handleInputChange = (e) => {
    setNewProfilePictureUrl(e.target.value);
  };

  const extractDominantColor = (imageUrl) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imageUrl;
    
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      let r = 0, g = 0, b = 0;

      for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
      }

      r = Math.floor(r / (data.length / 4));
      g = Math.floor(g / (data.length / 4));
      b = Math.floor(b / (data.length / 4));

      const dominantColor = `rgb(${r}, ${g}, ${b})`;
      console.log('Extracted color:', dominantColor);
      setBannerColor(dominantColor);
    };

    img.onerror = (error) => {
      console.error('Error loading image:', error);
      setBannerColor('#6c5ce7'); // Fallback color
    };
  };

  const handleProfilePictureClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      {isMobile ? <MobileHeader /> : <HeaderComponent />}
      <MainContent>
        <ProfileContainer>
          <Banner color={bannerColor}>
            <WelcomeMessage>Welcome, {username}</WelcomeMessage>
          </Banner>
          <ProfilePictureContainer onClick={handleProfilePictureClick}>
            <ProfilePicture src={profilePictureUrl} alt="Profile" />
            <ProfilePictureOverlay>
              <ChangeProfilePictureText>Change Profile Picture</ChangeProfilePictureText>
            </ProfilePictureOverlay>
          </ProfilePictureContainer>
          <ProfileContent>
            <h2>Profile</h2>
            {message && <Message success={isSuccess}>{message}</Message>}

            <LatestDownloadsSection>
              <h2>Latest Downloads</h2>
              <ButtonContainer>
                <ClearLogButton onClick={handleClearLog}>
                  <FaTrash /> Clear Log
                </ClearLogButton>
              </ButtonContainer>
              <DownloadGrid>
                {latestDownloads.map((download, index) => (
                  <DownloadCard key={index}>
                    <DownloadInfo>
                      <DownloadTitle>{download.title}</DownloadTitle>
                      <DownloadType>{download.pluginType}</DownloadType>
                      <DownloadDate>
                        Last downloaded: {new Date(download.downloadedAt).toLocaleString()}
                      </DownloadDate>
                      <ButtonContainer>
                        <RedownloadButton onClick={() => handleRedownload(download)}>
                          <FaRedo /> Redownload
                        </RedownloadButton>
                      </ButtonContainer>
                    </DownloadInfo>
                  </DownloadCard>
                ))}
              </DownloadGrid>
              {latestDownloads.length === 0 && <p>No downloads found.</p>}
            </LatestDownloadsSection>
            <StaffLink to="/staffpage">Go to Staff Page</StaffLink>
          </ProfileContent>
        </ProfileContainer>
      </MainContent>
      {showPopup && (
        <PopupOverlay>
          <PopupContent>
            <h3>Change Profile Picture</h3>
            <InputContainer>
              <Input
                type="text"
                placeholder="Enter new profile picture URL"
                value={newProfilePictureUrl}
                onChange={handleInputChange}
              />
              <Button onClick={handleProfilePictureChange}>Confirm</Button>
            </InputContainer>
            <Button onClick={handleClosePopup}>Cancel</Button>
          </PopupContent>
        </PopupOverlay>
      )}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </>
  );
};

export default Profile;
