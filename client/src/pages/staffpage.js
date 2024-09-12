import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled, { ThemeProvider } from 'styled-components';
import { motion } from 'framer-motion';

// Themes for Light/Dark mode
const lightTheme = {
  background: '#f9fafc',
  textColor: '#333',
  sidebarBg: '#fff',
  chatBg: '#f7fafc',
  messageBg: '#3182ce',
  staffMessageBg: '#48bb78',
  importantBg: '#ecc94b',
};

const darkTheme = {
  background: '#1a202c',
  textColor: '#f9fafc',
  sidebarBg: '#2d3748',
  chatBg: '#2d3748',
  messageBg: '#48bb78',
  staffMessageBg: '#3182ce',
  importantBg: '#d69e2e',
};

// Predefined Message Shortcuts
const messageShortcuts = {
  greetings: {
    '/greet': 'Hello! How can I assist you today?',
    '/welcome': 'Welcome to our service. How may I help?',
    '/followup': 'Just checking in to see how everything is going!',
  },
  troubleshooting: {
    '/troubleshoot1': 'Please restart your device and check if the issue persists.',
    '/troubleshoot2': 'Have you tried clearing your browser cache and cookies?',
    '/reset': 'Let me reset your account settings to help with the issue.',
  },
  closing: {
    '/thank': 'Thank you for reaching out!',
    '/closing': 'This chat will be closed shortly. Have a great day!',
    '/followup': 'If you need further assistance, feel free to contact us again!',
  },
};

// Styled Components
const StaffPageContainer = styled.div`
  display: flex;
  padding: 40px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.textColor};
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  gap: 30px;
  transition: background-color 0.5s ease;
`;

const Sidebar = styled.div`
  flex: 0.25;
  padding-right: 20px;
  background-color: ${({ theme }) => theme.sidebarBg};
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const ContentArea = styled.div`
  flex: 0.75;
  display: flex;
  flex-direction: column;
`;

const Title = styled(motion.h1)`
  color: ${({ theme }) => theme.textColor};
  font-weight: 800;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 30px;
`;

const Section = styled(motion.div)`
  background-color: ${({ theme }) => theme.sidebarBg};
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.textColor};
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
  background-color: ${({ theme }) => theme.chatBg};
  border-radius: 16px;
  padding: 20px;
  height: 400px;
  overflow-y: auto;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Message = styled(motion.div)`
  background-color: ${({ theme, isStaff, isImportant }) =>
    isImportant ? theme.importantBg : isStaff ? theme.staffMessageBg : theme.messageBg};
  color: #ffffff;
  border-radius: 20px;
  padding: 12px 18px;
  margin-bottom: 12px;
  max-width: 70%;
  align-self: ${({ isStaff }) => (isStaff ? 'flex-end' : 'flex-start')};
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

// Shortcut buttons styled component
const ShortcutButton = styled(Button)`
  margin-top: 10px;
  background-color: #48bb78;
`;

// Shortcuts List component in Sidebar
const ShortcutsList = styled.div`
  margin-top: 20px;
  background-color: ${({ theme }) => theme.sidebarBg};
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: ${({ theme }) => theme.textColor};
`;

const TaskContainer = styled.div`
  background-color: ${({ theme }) => theme.sidebarBg};
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const TaskTitle = styled.h3`
  color: ${({ theme }) => theme.textColor};
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
  const [theme, setTheme] = useState(lightTheme);
  const chatWindowRef = useRef(null);

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
      setNewMessage(''); // Reset draft when switching chats
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return;

    const shortcutMessage = messageShortcuts[newMessage.trim()];
    const finalMessage = shortcutMessage || newMessage;

    try {
      const response = await axios.post('https://api.asfaltios.com/api/chat/send', {
        userId: selectedChat,
        text: finalMessage,
        isStaff: true
      });
      if (response.status === 200) {
        setMessages([...messages, { text: finalMessage, isStaff: true }]);
        setNewMessage('');
        scrollToBottom();
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const scrollToBottom = () => {
    chatWindowRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const insertShortcut = (shortcut) => {
    setNewMessage(shortcut);
  };

  const markImportant = (index) => {
    const updatedMessages = [...messages];
    updatedMessages[index].isImportant = !updatedMessages[index].isImportant;
    setMessages(updatedMessages);
  };

  return (
    <ThemeProvider theme={theme}>
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

          <ShortcutsList>
            <h3>Message Shortcuts</h3>
            <ul>
              {Object.keys(messageShortcuts).map((category, index) => (
                <li key={index}>
                  <strong>{category}</strong>
                  <ul>
                    {Object.entries(messageShortcuts[category]).map(([shortcut, message]) => (
                      <li key={shortcut}>{shortcut}: {message}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </ShortcutsList>
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
                    <Message key={index} isStaff={message.isStaff} isImportant={message.isImportant}>
                      {message.text}
                      <span
                        onClick={() => markImportant(index)}
                        style={{ cursor: 'pointer', marginLeft: '10px' }}
                      >
                        {message.isImportant ? '⭐' : '☆'}
                      </span>
                    </Message>
                  ))}
                  <div ref={chatWindowRef}></div>
                </MessageList>
              </ChatWindow>
              <InputContainer>
                <Input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message (or use shortcuts)..."
                />
                <Button onClick={sendMessage}>Send</Button>
              </InputContainer>

              {/* Shortcut buttons */}
              <div>
                {Object.keys(messageShortcuts.greetings).map((shortcut, index) => (
                  <ShortcutButton key={index} onClick={() => insertShortcut(shortcut)}>
                    {messageShortcuts.greetings[shortcut]}
                  </ShortcutButton>
                ))}
                {Object.keys(messageShortcuts.troubleshooting).map((shortcut, index) => (
                  <ShortcutButton key={index} onClick={() => insertShortcut(shortcut)}>
                    {messageShortcuts.troubleshooting[shortcut]}
                  </ShortcutButton>
                ))}
                {Object.keys(messageShortcuts.closing).map((shortcut, index) => (
                  <ShortcutButton key={index} onClick={() => insertShortcut(shortcut)}>
                    {messageShortcuts.closing[shortcut]}
                  </ShortcutButton>
                ))}
              </div>
            </Section>
          )}
        </ContentArea>
      </StaffPageContainer>
    </ThemeProvider>
  );
};

export default StaffPage;
