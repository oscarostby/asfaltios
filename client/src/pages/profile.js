import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import HeaderComponent from '../components/header';
import { FaDownload, FaTrash, FaRedo } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MainContent = styled.main`
  padding-top: 60px;
  background-color: #0a192f;
  color: #e6f1ff;
  min-height: 100vh;
`;

const ProfileContainer = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
`;

const Banner = styled.div`
  width: 100%;
  height: 300px;
  background-color: ${props => props.color || '#1d3557'};
  transition: background-color 0.5s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const BannerOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(10, 25, 47, 0.7), rgba(10, 25, 47, 0.9));
`;

const WelcomeMessage = styled.h2`
  color: #e6f1ff;
  font-size: 2.5rem;
  text-align: center;
  position: relative;
  z-index: 2;
`;

const ProfilePictureContainer = styled.div`
  position: absolute;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  z-index: 3;
`;

const ProfilePicture = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #64ffda;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(100, 255, 218, 0.3);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 30px rgba(100, 255, 218, 0.5);
  }
`;

const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 120px;
  padding: 20px;
`;

const LatestDownloadsSection = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 30px;
`;

const DownloadGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const DownloadCard = styled.div`
  background-color: #1a1a2e;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const DownloadInfo = styled.div`
  padding: 1rem;
`;

const DownloadTitle = styled.h3`
  color: #4a90e2;
  margin: 0 0 0.5rem 0;
`;

const DownloadType = styled.p`
  color: #e0e0e0;
  font-style: italic;
  margin: 0 0 0.5rem 0;
`;

const DownloadDate = styled.p`
  color: #e0e0e0;
  font-size: 0.8rem;
  margin: 0 0 1rem 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  svg {
    margin-right: 0.5rem;
  }
`;

const RedownloadButton = styled(ActionButton)`
  background-color: #4a90e2;
  color: white;

  &:hover {
    background-color: #3a7bd5;
  }
`;

const ClearLogButton = styled(ActionButton)`
  background-color: #e74c3c;
  color: white;

  &:hover {
    background-color: #c0392b;
  }
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(10, 25, 47, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  background-color: #172a45;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #64ffda;
  border-radius: 4px;
  background-color: #0a192f;
  color: #e6f1ff;
  font-size: 1rem;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(100, 255, 218, 0.5);
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #64ffda;
  color: #0a192f;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
  font-size: 1rem;
  margin-right: 1rem;

  &:hover {
    background-color: #45c7b3;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const CancelButton = styled(Button)`
  background-color: transparent;
  border: 1px solid #64ffda;
  color: #64ffda;

  &:hover {
    background-color: rgba(100, 255, 218, 0.1);
  }
`;

const Message = styled.p`
  color: ${({ success }) => (success ? '#64ffda' : '#ff6b6b')};
  font-weight: bold;
  margin-top: 1rem;
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
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const [newProfilePictureUrl, setNewProfilePictureUrl] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [username, setUsername] = useState('');
  const [bannerColor, setBannerColor] = useState('#1d3557');
  const [showPopup, setShowPopup] = useState(false);
  const [latestDownloads, setLatestDownloads] = useState([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    fetchProfileData();
    loadLatestDownloads();
  }, []);

  useEffect(() => {
    if (profilePictureUrl) {
      extractDominantColor(profilePictureUrl);
    }
  }, [profilePictureUrl]);

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

  const loadLatestDownloads = () => {
    const downloads = JSON.parse(localStorage.getItem('latestDownloads')) || [];
    setLatestDownloads(downloads);
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
      
      // Adjust the color to be darker and more blue-tinted
      r = Math.max(0, Math.min(255, r * 0.7));
      g = Math.max(0, Math.min(255, g * 0.7));
      b = Math.max(0, Math.min(255, b * 0.9));
      
      const dominantColor = `rgb(${r}, ${g}, ${b})`;
      setBannerColor(dominantColor);
    };
    img.onerror = (error) => {
      console.error('Error loading image:', error);
      setBannerColor('#1d3557'); // Fallback to dark blue
    };
  };

  const handleRedownload = (download) => {
    // Implement redownload logic here
    console.log('Redownloading:', download.title);
  };

  const handleClearLog = () => {
    localStorage.removeItem('latestDownloads');
    setLatestDownloads([]);
  };

  return (
    <>
      <HeaderComponent />
      <MainContent>
        <ProfileContainer>
          <Banner color={bannerColor}>
            <BannerOverlay />
            <WelcomeMessage>Welcome, {username}</WelcomeMessage>
          </Banner>
          <ProfilePictureContainer onClick={() => setShowPopup(true)}>
            <ProfilePicture src={profilePictureUrl} alt="Profile" />
          </ProfilePictureContainer>
          <ProfileContent>
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
        {showPopup && (
          <PopupOverlay>
            <PopupContent>
              <h3>Change Profile Picture</h3>
              <Input
                type="text"
                placeholder="Enter new profile picture URL"
                value={newProfilePictureUrl}
                onChange={(e) => setNewProfilePictureUrl(e.target.value)}
              />
              <Button onClick={handleProfilePictureChange}>Confirm</Button>
              <CancelButton onClick={() => setShowPopup(false)}>Cancel</CancelButton>
            </PopupContent>
          </PopupOverlay>
        )}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </MainContent>
    </>
  );
};

export default Profile;
