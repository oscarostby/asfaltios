import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const StaffPageContainer = styled.div`
  padding: 20px;
  background-color: #0a192f;
  color: #e6f1ff;
  min-height: 100vh;
`;

const Title = styled.h1`
  color: #64ffda;
  margin-bottom: 20px;
`;

const Section = styled.div`
  background-color: #112240;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  color: #64ffda;
  margin-bottom: 10px;
`;

const ChatList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ChatItem = styled.li`
  background-color: #1d2d50;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    background-color: #233554;
  }
`;

const ChatWindow = styled.div`
  background-color: #1d2d50;
  border-radius: 5px;
  padding: 10px;
  height: 300px;
  overflow-y: auto;
`;

const MessageList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const Message = styled.li`
  background-color: ${props => props.isStaff ? '#64ffda' : '#233554'};
  color: ${props => props.isStaff ? '#0a192f' : '#e6f1ff'};
  border-radius: 5px;
  padding: 5px 10px;
  margin-bottom: 5px;
  max-width: 70%;
  align-self: ${props => props.isStaff ? 'flex-end' : 'flex-start'};
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  margin-top: 10px;
`;

const Button = styled.button`
  background-color: #64ffda;
  color: #0a192f;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background-color: #45c3a8;
  }
`;

const StaffPage = () => {
  const [activeChats, setActiveChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchActiveChats();
    const interval = setInterval(fetchActiveChats, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchActiveChats = async () => {
    try {
      const response = await axios.get('https://api.asfaltios.com/api/chat/active');
      setActiveChats(response.data);
    } catch (error) {
      console.error('Error fetching active chats:', error);
    }
  };

  const selectChat = async (userId) => {
    setSelectedChat(userId);
    try {
      const response = await axios.get(`https://api.asfaltios.com/api/chat/messages/${userId}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return;

    try {
      await axios.post('https://api.asfaltios.com/api/chat/send', {
        userId: selectedChat,
        text: newMessage,
        isStaff: true
      });
      setMessages([...messages, { text: newMessage, isStaff: true }]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const closeChat = async () => {
    if (!selectedChat) return;

    try {
      await axios.delete(`https://api.asfaltios.com/api/chat/${selectedChat}`);
      setActiveChats(activeChats.filter(chat => chat._id !== selectedChat));
      setSelectedChat(null);
      setMessages([]);
    } catch (error) {
      console.error('Error closing chat:', error);
    }
  };

  return (
    <StaffPageContainer>
      <Title>Staff Dashboard</Title>

      <Section>
        <SectionTitle>Active Chats</SectionTitle>
        <ChatList>
          {activeChats.map(chat => (
            <ChatItem key={chat._id} onClick={() => selectChat(chat._id)}>
              Chat - {chat.username || chat._id}
            </ChatItem>
          ))}
        </ChatList>
      </Section>

      {selectedChat && (
        <Section>
          <SectionTitle>Chat Window</SectionTitle>
          <ChatWindow>
            <MessageList>
              {messages.map((message, index) => (
                <Message key={index} isStaff={message.isStaff}>
                  {message.text}
                </Message>
              ))}
            </MessageList>
          </ChatWindow>
          <Input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <Button onClick={sendMessage}>Send</Button>
          <Button onClick={closeChat}>Close Chat</Button>
        </Section>
      )}
    </StaffPageContainer>
  );
};

export default StaffPage;
