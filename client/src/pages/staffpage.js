import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import HeaderComponent from '../components/header';

const MainContent = styled.main`
  padding-top: 200px;
  background-color: #0a192f;
  color: #e6f1ff;
  min-height: 100vh;
`;

const StaffContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`;

const ProfilePicture = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #64ffda;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(100, 255, 218, 0.3);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 30px rgba(100, 255, 218, 0.5);
  }
`;

const InfoText = styled.p`
  font-size: 1.5em;
  color: #e6f1ff;
  margin: 10px 0;
`;

const Title = styled.h1`
  color: #64ffda;
  margin-bottom: 40px;
`;

const LinkList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const LinkItem = styled.li`
  margin: 10px 0;
`;

const StyledLink = styled.a`
  color: #64ffda;
  text-decoration: none;
  font-size: 1.2em;

  &:hover {
    color: #e6f1ff;
    text-decoration: underline;
  }
`;

const StaffPage = () => {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [profilePictureUrl, setProfilePictureUrl] = useState('');

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    const userIdFromCookie = getCookie('userId');
    if (userIdFromCookie) {
      try {
        const response = await axios.get(`https://api.asfaltios.com/api/users/${userIdFromCookie}`);
        setUsername(response.data.username);
        setUserId(userIdFromCookie);
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

  return (
    <>
      <HeaderComponent />
      <MainContent>
        <StaffContainer>
          <ProfileSection>
            <ProfilePicture src={profilePictureUrl} alt="Profile Picture" />
            <InfoText>Username: {username}</InfoText>
            <InfoText>Staff ID: {userId}</InfoText>
          </ProfileSection>
          <Title>Here are some useful links:</Title>
          <LinkList>
            <LinkItem>
              <StyledLink href="https://github.com/oscarostby/asfaltios" target="_blank" rel="noopener noreferrer">
                Asfaltios GitHub Repository
              </StyledLink>
            </LinkItem>
            <LinkItem>
              <StyledLink href="https://github.com/Secker17/Bakteria" target="_blank" rel="noopener noreferrer">
                Bakteria GitHub Repository
              </StyledLink>
            </LinkItem>
            <LinkItem>
              <StyledLink href="https://dashboard.tawk.to/#/dashboard/66d01a6050c10f7a00a191c9" target="_blank" rel="noopener noreferrer">
                Tawk.to Dashboard
              </StyledLink>
            </LinkItem>
          </LinkList>
        </StaffContainer>
      </MainContent>
    </>
  );
};

export default StaffPage;
