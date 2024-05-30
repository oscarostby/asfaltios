import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

const TopBannerContainer = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
`;

const TopBanner = styled.div`
  width: 100%;
  height: 200px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  transition: filter 0.3s ease;
  position: absolute;
  top: 0;
  left: 0;
`;

const EditBannerContainer = styled.div`
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;

  ${TopBannerContainer}:hover & {
    display: flex;
  }
`;

const ProfilePicture = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-top: -75px; /* Adjust to position the profile picture over the banner */
  border: 4px solid white;
  transition: filter 0.3s ease;
`;

const HoverableContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  &:hover ${TopBanner}, &:hover ${ProfilePicture} {
    filter: blur(2px);
  }
`;

const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
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

const Profile = () => {
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const [newProfilePictureUrl, setNewProfilePictureUrl] = useState('');
  const [bannerUrl, setBannerUrl] = useState('https://static.vecteezy.com/system/resources/thumbnails/001/426/892/small/abstract-banner-web-template-free-vector.jpg');
  const [newBannerUrl, setNewBannerUrl] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    fetchProfileData();
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
    const userId = getCookie('userId');
    if (userId && newProfilePictureUrl) {
      try {
        await axios.post(`https://api.asfaltios.com/api/users/${userId}/updateProfilePicture`, {
          profilePictureUrl: newProfilePictureUrl
        });
        setProfilePictureUrl(newProfilePictureUrl);
        setMessage('Profile picture updated successfully');
        setIsSuccess(true);
      } catch (error) {
        console.error('Error updating profile picture:', error);
        setMessage('Failed to update profile picture');
        setIsSuccess(false);
      }
    }
  };

  const handleBannerChange = async () => {
    // Update the banner URL as needed
    // For now, we just set the new banner URL locally
    setBannerUrl(newBannerUrl);
    setMessage('Banner updated successfully');
    setIsSuccess(true);
  };

  const handleInputChange = (e) => {
    setNewProfilePictureUrl(e.target.value);
  };

  const handleBannerInputChange = (e) => {
    setNewBannerUrl(e.target.value);
  };

  return (
    <ProfileContainer>
      <HoverableContainer>
        <TopBannerContainer>
          <TopBanner src={bannerUrl} />
          <EditBannerContainer>
            <Input
              type="text"
              placeholder="Enter new banner URL"
              value={newBannerUrl}
              onChange={handleBannerInputChange}
            />
            <Button onClick={handleBannerChange}>Change Banner</Button>
          </EditBannerContainer>
        </TopBannerContainer>
        <ProfilePicture src={profilePictureUrl} alt="Profile" />
      </HoverableContainer>
      <ProfileContent>
        <h2>Profile</h2>
        <h3>Username: {username}</h3>
        <InputContainer>
          <Input
            type="text"
            placeholder="Enter new profile picture URL"
            value={newProfilePictureUrl}
            onChange={handleInputChange}
          />
          <Button onClick={handleProfilePictureChange}>Change Profile Picture</Button>
        </InputContainer>
        {message && <Message success={isSuccess}>{message}</Message>}
      </ProfileContent>
    </ProfileContainer>
  );
};

export default Profile;
