import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

const Message = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: ${props => props.isAdmin ? '#4caf50' : '#f44336'};
`;

function App() {
  const [isAdmin, setIsAdmin] = useState(null);
  const [username, setUsername] = useState('');

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

  const checkAdminStatus = async () => {
    const userId = getCookie('userId');
    if (userId) {
      try {
        const response = await axios.get(`https://api.asfaltios.com/api/users/${userId}`);
        setIsAdmin(response.data.admin);
        setUsername(response.data.username);
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(null);
      }
    } else {
      console.log('User ID not found in cookies');
      setIsAdmin(null);
    }
  };

  useEffect(() => {
    checkAdminStatus();
  }, []);

  return (
    <AppContainer>
      <Title>Admin Check</Title>
      {isAdmin !== null ? (
        <Message isAdmin={isAdmin}>
          {isAdmin
            ? `Wow, ${username}, you are admin, great!`
            : `${username}, you are not an admin, noob.`}
        </Message>
      ) : (
        <Message>Please log in to check your admin status.</Message>
      )}
    </AppContainer>
  );
}

export default App;