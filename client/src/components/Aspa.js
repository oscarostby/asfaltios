import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import chatIcon from '../bilder/imgrem.png';
import plopSound from '../bilder/plop.mp3';

const ChatButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-image: url(${chatIcon});
  background-size: cover;
  background-position: center;
  border: none;
  cursor: pointer;
  z-index: 1000;
`;

const ChatContainer = styled.div`
  position: fixed;
  bottom: 90px;
  right: 20px;
  width: 350px;
  height: 500px;
  background-color: #0a192f;
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  z-index: 1000;
  transition: all 0.3s ease-in-out;
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(120%)'};
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

const MessageGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  margin-bottom: 15px;
`;

const MessageLabel = styled.span`
  font-size: 12px;
  color: #a8b2d1;
  margin-bottom: 5px;
`;

const MessageBubble = styled.div`
  background-color: ${props => props.isUser ? '#0078d7' : 'white'};
  color: ${props => props.isUser ? 'white' : '#0a192f'};
  border-radius: 10px;
  padding: 10px;
  max-width: 70%;
  margin-bottom: 2px;
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
  const [isOpen, setIsOpen] = useState(false);
  const [newMessageCount, setNewMessageCount] = useState(0);
  const [headerText, setHeaderText] = useState('Asfaltios');
  const [username, setUsername] = useState('');
  const messagesEndRef = useRef(null);
  const audioRef = useRef(new Audio(plopSound));

  useEffect(() => {
    const userIdFromCookie = getCookie('userId');
    if (userIdFromCookie) {
      setUserId(userIdFromCookie);
      fetchMessages(userIdFromCookie);
      fetchUsername(userIdFromCookie);
    }
  }, []);

  const fetchUsername = async (id) => {
    try {
      const response = await axios.get(`https://api.asfaltios.com/api/users/${id}`);
      setUsername(response.data.username);
    } catch (error) {
      console.error('Error fetching username:', error);
    }
  };

  const fetchMessages = async (id) => {
    try {
      const response = await axios.get(`https://api.asfaltios.com/api/chat/messages/${id}`);
      const newMessages = response.data;
      setMessages(prevMessages => {
        if (newMessages.length > prevMessages.length) {
          const newCount = newMessages.length - prevMessages.length;
          setNewMessageCount(prevCount => prevCount + newCount);
          playPlopSound();
        }
        return newMessages;
      });
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

  useEffect(() => {
    if (newMessageCount > 0) {
      const intervalId = setInterval(() => {
        setHeaderText(prev => prev === 'Asfaltios' ? `${newMessageCount} new message${newMessageCount > 1 ? 's' : ''}` : 'Asfaltios');
      }, 2000);
      return () => clearInterval(intervalId);
    } else {
      setHeaderText('Asfaltios');
    }
  }, [newMessageCount]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (input.trim() && userId) {
      const newMessage = { 
        text: input, 
        userId, 
        isStaff: false,
        timestamp: new Date().toISOString()
      };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setInput('');
      setNewMessageCount(0);

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

  const handleCloseChat = () => {
    setIsOpen(false);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setNewMessageCount(0);
    }
  };

  const playPlopSound = () => {
    audioRef.current.play().catch(error => console.error('Error playing sound:', error));
  };

  useEffect(() => {
    document.title = newMessageCount > 0 ? `(${newMessageCount}) Asfaltios` : 'Asfaltios';
  }, [newMessageCount]);

  const groupMessages = (messages) => {
    const grouped = [];
    let currentGroup = null;

    messages.forEach((msg) => {
      if (!currentGroup || currentGroup.isUser !== !msg.isStaff) {
        currentGroup = {
          isUser: !msg.isStaff,
          messages: [msg],
        };
        grouped.push(currentGroup);
      } else {
        currentGroup.messages.push(msg);
      }
    });

    return grouped;
  };

  return (
    <>
      <ChatButton onClick={toggleChat} />
      <ChatContainer isOpen={isOpen}>
        <ChatHeader>
          {headerText}
          <CloseButton onClick={handleCloseChat}>×</CloseButton>
        </ChatHeader>
        <ChatMessages>
          {groupMessages(messages).map((group, groupIndex) => (
            <MessageGroup key={groupIndex} isUser={group.isUser}>
              <MessageLabel>
                {group.isUser ? username : 'Staff'}
              </MessageLabel>
              {group.messages.map((msg, msgIndex) => (
                <MessageBubble key={msgIndex} isUser={group.isUser}>
                  {msg.text}
                </MessageBubble>
              ))}
            </MessageGroup>
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
    </>
  );
};

export default ASPA;