import React, { useState, useEffect, useRef } from 'react';
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
  display: flex;
  flex-direction: column;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  margin-bottom: 10px;
`;

const MessageBubble = styled.div`
  background-color: ${props => props.isUser ? '#0078d7' : 'white'};
  color: ${props => props.isUser ? 'white' : '#0a192f'};
  border-radius: 10px;
  padding: 10px;
  max-width: 70%;
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
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const userIdFromCookie = getCookie('userId');
    if (userIdFromCookie) {
      setUserId(userIdFromCookie);
      fetchMessages(userIdFromCookie);
    }
  }, []);

  const fetchMessages = async (id) => {
    try {
      const response = await axios.get(`https://api.asfaltios.com/api/chat/messages/${id}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      const intervalId = setInterval(() => fetchMessages(userId), 5000);
      return () => clearInterval(intervalId);
    }
  }, [userId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (input.trim() && userId) {
      const newMessage = { 
        text: input, 
        userId, 
        isStaff: false, // Mark as user message
        timestamp: new Date().toISOString()
      };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setInput('');

      try {
        await axios.post('https://api.asfaltios.com/api/chat/send', newMessage);
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

  const handleCloseChat = async () => {
    if (userId) {
      try {
        await axios.delete(`https://api.asfaltios.com/api/chat/${userId}`);
        setMessages([]);
      } catch (error) {
        console.error('Error closing chat:', error);
      }
    }
  };

  return (
    <ChatContainer>
      <ChatHeader>
        Aspa Live Chat
        <CloseButton onClick={handleCloseChat}>×</CloseButton>
      </ChatHeader>
      <ChatMessages>
        {messages.map((msg, index) => (
          <MessageContainer key={index} isUser={!msg.isStaff}>
            <MessageBubble isUser={!msg.isStaff}>{msg.text}</MessageBubble>
          </MessageContainer>
        ))}
        <div ref={messagesEndRef} />
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