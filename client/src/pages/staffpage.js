import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StaffPageContainer = styled.div`
  padding: 40px;
  background-color: #f0f4f8;
  color: #333;
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
`;

const Title = styled(motion.h1)`
  color: #1a365d;
  margin-bottom: 30px;
  font-weight: 700;
  font-size: 2.5rem;
`;

const Section = styled(motion.div)`
  background-color: #ffffff;
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  color: #2b6cb0;
  margin-bottom: 20px;
  font-weight: 600;
  font-size: 1.5rem;
`;

const ChatList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
`;

const ChatItem = styled(motion.div)`
  background-color: #ebf8ff;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: #bee3f8;
    transform: translateY(-5px);
  }
`;

const ChatWindow = styled.div`
  background-color: #ebf8ff;
  border-radius: 16px;
  padding: 20px;
  height: 400px;
  overflow-y: auto;
  margin-bottom: 20px;
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
`;

const Message = styled(motion.div)`
  background-color: ${props => props.isStaff ? '#4299e1' : '#48bb78'};
  color: #ffffff;
  border-radius: 20px;
  padding: 12px 18px;
  margin-bottom: 12px;
  max-width: 70%;
  align-self: ${props => props.isStaff ? 'flex-end' : 'flex-start'};
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
  border: 2px solid #4299e1;
  font-size: 16px;
  transition: all 0.3s ease;
  &:focus {
    outline: none;
    border-color: #2b6cb0;
    box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.5);
  }
`;

const Button = styled(motion.button)`
  background-color: #4299e1;
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

const QuickRepliesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const QuickReplyButton = styled(motion.button)`
  background-color: #e2e8f0;
  color: #2d3748;
  border: none;
  border-radius: 20px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  &:hover {
    background-color: #cbd5e0;
    transform: translateY(-2px);
  }
`;

const PluginButton = styled(motion.button)`
  background-color: #9f7aea;
  color: #ffffff;
  border: none;
  border-radius: 20px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  margin: 5px;
  transition: all 0.3s ease;
  &:hover {
    background-color: #805ad5;
    transform: translateY(-2px);
  }
`;

const StaffPage = () => {
  const [activeChats, setActiveChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const quickReplies = [
    "How can I assist you today?",
    "Thank you for your patience.",
    "I'm checking on that for you now.",
    "Is there anything else I can help with?",
    "I apologize for any inconvenience."
  ];

  const plugins = [
    { name: "Check Order Status", action: () => console.log("Checking order status...") },
    { name: "Process Refund", action: () => console.log("Processing refund...") },
    { name: "Schedule Callback", action: () => console.log("Scheduling callback...") },
    { name: "Escalate to Manager", action: () => console.log("Escalating to manager...") },
    { name: "Send Feedback Survey", action: () => console.log("Sending feedback survey...") },
    { name: "Update Customer Info", action: () => console.log("Updating customer info...") },
    { name: "Generate Invoice", action: () => console.log("Generating invoice...") },
    { name: "Apply Discount", action: () => console.log("Applying discount...") },
    { name: "Check Inventory", action: () => console.log("Checking inventory...") },
    { name: "Schedule Delivery", action: () => console.log("Scheduling delivery...") }
  ];

  useEffect(() => {
    fetchActiveChats();
    const interval = setInterval(fetchActiveChats, 30000);
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

  const sendMessage = async (text = newMessage) => {
    if (!text.trim() || !selectedChat) return;
    try {
      const response = await axios.post('https://api.asfaltios.com/api/chat/send', {
        userId: selectedChat,
        text: text,
        isStaff: true
      });
      if (response.status === 200) {
        setMessages([...messages, { text: text, isStaff: true }]);
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
      <Title initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        Staff Dashboard
      </Title>
      <Section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <SectionTitle>Active Chats</SectionTitle>
        <ChatList>
          {activeChats.map(chat => (
            <ChatItem key={chat._id} onClick={() => selectChat(chat._id)} whileHover={{ scale: 1.05 }}>
              {chat.username || `User ${chat._id.slice(0, 8)}`}
            </ChatItem>
          ))}
        </ChatList>
      </Section>
      {selectedChat && (
        <Section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
          <SectionTitle>Chat Window</SectionTitle>
          <ChatWindow>
            <MessageList>
              {messages.map((message, index) => (
                <Message key={index} isStaff={message.isStaff} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  {message.text}
                </Message>
              ))}
            </MessageList>
          </ChatWindow>
          <QuickRepliesContainer>
            {quickReplies.map((reply, index) => (
              <QuickReplyButton key={index} onClick={() => sendMessage(reply)} whileHover={{ scale: 1.05 }}>
                {reply}
              </QuickReplyButton>
            ))}
          </QuickRepliesContainer>
          <InputContainer>
            <Input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <Button onClick={() => sendMessage()} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Send
            </Button>
          </InputContainer>
          <Button onClick={closeChat} style={{ marginTop: '10px', backgroundColor: '#e53e3e' }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Close Chat
          </Button>
          <SectionTitle style={{ marginTop: '20px' }}>Plugins</SectionTitle>
          <div>
            {plugins.map((plugin, index) => (
              <PluginButton key={index} onClick={plugin.action} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                {plugin.name}
              </PluginButton>
            ))}
          </div>
        </Section>
      )}
    </StaffPageContainer>
  );
};

export default StaffPage;
