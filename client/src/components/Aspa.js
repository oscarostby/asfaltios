import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ChatContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 350px;
  height: 500px;
  background-color: #0a192f;
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 1000;
`;

const ChatHeader = styled.div`
  background-color: #0078d7;
  color: white;
  padding: 15px;
  width: 100%;
  border-radius: 10px 10px 0 0;
  text-align: center;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.2em;
  cursor: pointer;
  &:hover {
    color: #ffcc00;
  }
`;

const ChatMessages = styled.div`
  padding: 15px;
  flex: 1;
  overflow-y: auto;
  width: 100%;
  color: #e6f1ff;
  display: flex;
  flex-direction: column;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isStaff ? 'flex-start' : 'flex-end')};
  margin-bottom: 10px;
`;

const MessageSender = styled.div`
  font-size: 0.8em;
  color: #64ffda;
  margin-bottom: 5px;
`;

const MessageBubble = styled.div`
  background-color: ${(props) => (props.isStaff ? 'white' : '#0078d7')};
  color: ${(props) => (props.isStaff ? '#0a192f' : 'white')};
  border-radius: 10px;
  padding: 10px;
  max-width: 70%;
  align-self: ${(props) => (props.isStaff ? 'flex-start' : 'flex-end')};
`;

const ChatInputContainer = styled.div`
  display: flex;
  padding: 15px;
  border-top: 1px solid #ccc;
  width: 100%;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-right: 10px;
`;

const SendButton = styled.button`
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

const ASPA = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState('');
  const [minimized, setMinimized] = useState(true); // Starts minimized
  const [estimatedWaitTime, setEstimatedWaitTime] = useState('1-2 years');

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userIdFromCookie = getCookie('userId');
      if (userIdFromCookie) {
        setUserId(userIdFromCookie);
        try {
          const response = await axios.get(`https://api.asfaltios.com/api/users/${userIdFromCookie}`);
          setUsername(response.data.username);
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (userId) {
        try {
          const response = await axios.get(`https://api.asfaltios.com/api/chat/messages/${userId}`);
          setMessages(response.data);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      }
    };

    fetchMessages();
    const intervalId = setInterval(fetchMessages, 5000);
    return () => clearInterval(intervalId);
  }, [userId]);

  const handleSendMessage = async () => {
    if (input.trim() && userId) {
      const newMessage = { text: input, userId, isStaff: false };
      try {
        await axios.post('https://api.asfaltios.com/api/chat/send', newMessage);
        setMessages([...messages, newMessage]);
        setInput('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  return (
    <ChatContainer>
      <ChatHeader>
        Aspa Live Chat
        <CloseButton onClick={() => setMessages([])}>×</CloseButton>
      </ChatHeader>
      <ChatMessages>
        {messages.map((msg, index) => (
          <MessageContainer key={index} isStaff={msg.isStaff}>
            <MessageSender>{msg.isStaff ? 'Staff' : username}</MessageSender>
            <MessageBubble isStaff={msg.isStaff}>{msg.text}</MessageBubble>
          </MessageContainer>
        ))}
      </ChatMessages>
      <ChatInputContainer>
        <ChatInput
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <SendButton onClick={handleSendMessage}>Send</SendButton>
      </ChatInputContainer>
    </ChatContainer>
  );
};

export default ASPA;