import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Styled Components
const StaffPageContainer = styled.div`
  display: flex;
  padding: 40px;
  background-color: #f9fafc;
  color: #333;
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  gap: 30px;
`;

const Sidebar = styled.div`
  flex: 0.25;
  padding-right: 20px;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const ContentArea = styled.div`
  flex: 0.75;
  display: flex;
  flex-direction: column;
`;

const Title = styled(motion.h1)`
  color: #2d3748;
  font-weight: 800;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 30px;
`;

const Section = styled(motion.div)`
  background-color: #fff;
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  color: #1a365d;
  margin-bottom: 20px;
  font-weight: 600;
  font-size: 1.5rem;
`;

const ChatList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const ChatItem = styled(motion.div)`
  background-color: #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  flex: 1;
  transition: all 0.3s ease;
  &:hover {
    background-color: #cbd5e0;
    transform: translateY(-5px);
  }
`;

const ChatWindow = styled.div`
  background-color: #f7fafc;
  border-radius: 16px;
  padding: 20px;
  height: 400px;
  overflow-y: auto;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
`;

const Message = styled(motion.div)`
  background-color: ${props => (props.isStaff ? '#3182ce' : '#48bb78')};
  color: #ffffff;
  border-radius: 20px;
  padding: 12px 18px;
  margin-bottom: 12px;
  max-width: 70%;
  align-self: ${props => (props.isStaff ? 'flex-end' : 'flex-start')};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const InputContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 14px;
  border-radius: 25px;
  border: 2px solid #3182ce;
  font-size: 16px;
  transition: all 0.3s ease;
  &:focus {
    outline: none;
    border-color: #2b6cb0;
    box-shadow: 0 0 0 2px rgba(49, 130, 206, 0.5);
  }
`;

const Button = styled(motion.button)`
  background-color: #3182ce;
  color: #ffffff;
  border: none;
  border-radius: 25px;
  padding: 14px 25px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  margin-left: 10px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #2b6cb0;
  }
`;

const TaskContainer = styled.div`
  background-color: #fff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const TaskTitle = styled.h3`
  color: #2c5282;
  font-size: 1.4rem;
  margin-bottom: 15px;
`;

const TaskItem = styled.div`
  background-color: #edf2f7;
  border-radius: 10px;
  padding: 10px 15px;
  margin-bottom: 10px;
  color: #2d3748;
  font-weight: 500;
`;

const StaffPage = () => {
  const [activeChats, setActiveChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchActiveChats();
    fetchTasks();
    const interval = setInterval(() => {
      fetchActiveChats();
      fetchTasks();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://api.asfaltios.com/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

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
      const response = await axios.post('https://api.asfaltios.com/api/chat/send', {
        userId: selectedChat,
        text: newMessage,
        isStaff: true
      });
      if (response.status === 200) {
        setMessages([...messages, { text: newMessage, isStaff: true }]);
        setNewMessage('');
      }
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
      <Sidebar>
        <Title>ASPA Dashboard</Title>
        <TaskContainer>
          <TaskTitle>Prioritized Tasks</TaskTitle>
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <TaskItem key={index}>
                <strong>{task.header}</strong>: {task.text}
              </TaskItem>
            ))
          ) : (
            <TaskItem>No tasks available</TaskItem>
          )}
        </TaskContainer>
      </Sidebar>

      <ContentArea>
        <Section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <SectionTitle>Active Chats</SectionTitle>
          <ChatList>
            {activeChats.map(chat => (
              <ChatItem key={chat._id} onClick={() => selectChat(chat._id)}>
                {chat.username || `User ${chat._id.slice(0, 8)}`}
              </ChatItem>
            ))}
          </ChatList>
        </Section>

        {selectedChat && (
          <Section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
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
            <InputContainer>
              <Input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
              />
              <Button onClick={sendMessage}>Send</Button>
            </InputContainer>
            <Button
              onClick={closeChat}
              style={{ marginTop: '10px', backgroundColor: '#e53e3e' }}
            >
              Close Chat
            </Button>
          </Section>
        )}
      </ContentArea>
    </StaffPageContainer>
  );
};

export default StaffPage;