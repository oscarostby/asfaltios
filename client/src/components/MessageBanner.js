import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Banner = styled.div`
  background-color: lightblue;
  color: #333;
  padding: 10px 20px;
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;

const MessageBanner = () => {
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get('https://api.asfaltios.com/api/message');
        setMessage(response.data.message);
      } catch (error) {
        console.error('Error fetching message:', error);
      }
    };

    fetchMessage();
  }, []);

  if (!isVisible || !message) {
    return null;
  }

  return (
    <Banner>
      <span>{message}</span>
      <CloseButton onClick={() => setIsVisible(false)}>x</CloseButton>
    </Banner>
  );
};

export default MessageBanner;
