import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import ASPA from '../components/Aspa';
import Header from '../components/header';

const MainContent = styled.main`
  padding-top: 100px;
  background-color: #0a192f;
  color: #e6f1ff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StaffContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
  background-color: #112240;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
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

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: #64ffda;
  font-size: 1.5em;
`;

const ChatSection = styled.div`
  background-color: #112240;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ChatMessages = styled.div`
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: 10px;
`;

const ChatMessage = styled.div`
  padding: 10px;
  background-color: ${(props) => (props.sender === 'user' ? '#0078d7' : '#64ffda')};
  color: ${(props) => (props.sender === 'user' ? 'white' : '#0a192f')};
  border-radius: 10px;
  margin-bottom: 5px;
  align-self: ${(props) => (props.sender === 'user' ? 'flex-end' : 'flex-start')};
`;

const ReplyInput = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  flex: 1;
  margin-right: 10px;
`;

const ReplyButton = styled.button`
  background-color: #0078d7;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  
  &:hover {
    background-color: #005fa3;
  }
`;

const StaffPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [replyInput, setReplyInput] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      const userIdFromCookie = getCookie('userId');
      if (userIdFromCookie) {
        try {
          const response = await axios.get(`https://api.asfaltios.com/api/users/${userIdFromCookie}`);
          setUsername(response.data.username);
          setUserId(userIdFromCookie);
          setProfilePictureUrl(response.data.profilePictureUrl);
          setIsLoading(false); // Data fetched successfully
        } catch (error) {
          console.error('Error fetching user data:', error);
          navigate('/login'); // Redirect to login on error
        }
      } else {
        navigate('/login'); // Redirect to login if no userId cookie found
      }
    };

    fetchProfileData();
  }, [navigate]);

  useEffect(() => {
    const fetchChatMessages = async () => {
      try {
        const response = await axios.get('https://api.asfaltios.com/api/chat/messages');
        setChatMessages(response.data);
      } catch (error) {
        console.error('Error fetching chat messages:', error);
      }
    };

    fetchChatMessages();
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

  const handleReply = async (e, messageId) => {
    e.preventDefault();
    if (replyInput.trim() !== '') {
      try {
        const replyMessage = { text: replyInput, sender: 'staff' };
        await axios.post('https://api.asfaltios.com/api/chat/reply', {
          ...replyMessage,
          originalMessageId: messageId, // Reference to the original message
        });

        // Fetch updated messages
        const response = await axios.get('https://api.asfaltios.com/api/chat/messages');
        setChatMessages(response.data);
        setReplyInput('');
      } catch (error) {
        console.error('Error sending reply:', error);
      }
    }
  };

  if (isLoading) {
    return <LoadingContainer>Loading...</LoadingContainer>;
  }

  return (
    <>
      <MainContent>
      <Header />
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
        <StaffContainer>
          <Title>Active Chats</Title>
          {chatMessages.length === 0 ? (
            <p>No active chats yet.</p>
          ) : (
            chatMessages.map((conversation, index) => (
              <ChatSection key={index}>
                <ChatHeader>
                  <div>Conversation #{index + 1}</div>
                  <div>User ID: {conversation.userId}</div>
                </ChatHeader>
                <ChatMessages>
                  {conversation.messages.map((msg, idx) => (
                    <ChatMessage key={idx} sender={msg.sender}>
                      {msg.text}
                    </ChatMessage>
                  ))}
                </ChatMessages>
                <form onSubmit={(e) => handleReply(e, conversation.id)}>
                  <div style={{ display: 'flex' }}>
                    <ReplyInput
                      type="text"
                      value={replyInput}
                      onChange={(e) => setReplyInput(e.target.value)}
                      placeholder="Type your reply..."
                    />
                    <ReplyButton type="submit">Send Reply</ReplyButton>
                  </div>
                </form>
              </ChatSection>
            ))
          )}
        </StaffContainer>
        <ASPA />
      </MainContent>
    </>
  );
};

export default StaffPage;
