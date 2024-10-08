import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled, { ThemeProvider } from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Themes for Space-Themed Light/Dark mode
const lightTheme = {
  background: '#0b3d91',
  textColor: '#ffffff',
  sidebarBg: '#0d47a1',
  chatBg: '#1a237e',
  messageBg: '#3949ab',
  staffMessageBg: '#5c6bc0',
  importantBg: '#ffca28',
};

const darkTheme = {
  background: '#000000',
  textColor: '#ffffff',
  sidebarBg: '#1a237e',
  chatBg: '#0d47a1',
  messageBg: '#3949ab',
  staffMessageBg: '#5c6bc0',
  importantBg: '#ffca28',
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

// Styled Components with Space Theme
const StaffPageContainer = styled.div`
  display: flex;
  padding: 40px;
  padding-top: 240px; /* Ensures content is at least 200px down */
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.textColor};
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  gap: 30px;
  transition: background-color 0.5s ease;
  background-image: url('https://www.transparenttextures.com/patterns/dark-matter.png');
`;

const Sidebar = styled.div`
  flex: 0.25;
  padding-right: 20px;
  background-color: ${({ theme }) => theme.sidebarBg};
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  height: fit-content;
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
  background-color: #3949ab;
  color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  flex: 1;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    background-color: #303f9f;
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
  position: relative;
`;

const InputContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 14px;
  border-radius: 25px;
  border: 2px solid #5c6bc0;
  font-size: 16px;
  transition: all 0.3s ease;
  background-color: #1a237e;
  color: #ffffff;

  &:focus {
    outline: none;
    border-color: #3949ab;
    box-shadow: 0 0 0 2px rgba(92, 107, 192, 0.5);
  }
`;

const Button = styled(motion.button)`
  background-color: #5c6bc0;
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
    background-color: #3949ab;
  }
`;

const ShortcutButton = styled(Button)`
  margin-top: 10px;
  background-color: #3949ab;
`;

const DeleteButton = styled(Button)`
  background-color: #e53935;

  &:hover {
    background-color: #d32f2f;
  }
`;

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
  background-color: #283593;
  border-radius: 10px;
  padding: 10px 15px;
  margin-bottom: 10px;
  color: #ffffff;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AssignButton = styled(Button)`
  background-color: #00acc1;

  &:hover {
    background-color: #00838f;
  }
`;

const NotificationBadge = styled.div`
  background-color: #ff5722;
  color: #ffffff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 10px;
  right: 10px;
`;

// New features for staff assistance
const SearchInput = styled.input`
  padding: 10px;
  border-radius: 20px;
  border: 2px solid #5c6bc0;
  width: 100%;
  margin-bottom: 20px;
  background-color: #1a237e;
  color: #ffffff;

  &:focus {
    outline: none;
    border-color: #3949ab;
    box-shadow: 0 0 0 2px rgba(92, 107, 192, 0.5);
  }
`;

const StaffPage = () => {
  const [isAdmin, setIsAdmin] = useState(null);
  const [username, setUsername] = useState('');
  const [activeChats, setActiveChats] = useState([]);
  const [filteredChats, setFilteredChats] = useState([]);
  const [chatSearch, setChatSearch] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [tasks, setTasks] = useState([]);
  const [theme, setTheme] = useState(lightTheme);
  const chatWindowRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminStatus();
  }, []);

  useEffect(() => {
    if (isAdmin === false) {
      navigate('/404');
    }
  }, [isAdmin, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchActiveChats();
      fetchTasks();
      const interval = setInterval(() => {
        fetchActiveChats();
        fetchTasks();
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [isAdmin]);

  useEffect(() => {
    filterChats();
  }, [chatSearch, activeChats]);

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
        setIsAdmin(false);
      }
    } else {
      console.log('User ID not found in cookies');
      setIsAdmin(false);
    }
  };

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
      setFilteredChats(response.data);
    } catch (error) {
      console.error('Error fetching active chats:', error);
    }
  };

  const selectChat = async (userId) => {
    setSelectedChat(userId);
    try {
      const response = await axios.get(`https://api.asfaltios.com/api/chat/messages/${userId}`);
      setMessages(response.data);
      setNewMessage('');
      scrollToBottom();
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async (messageToSend = newMessage) => {
    if (!messageToSend.trim() || !selectedChat) return;

    try {
      const response = await axios.post('https://api.asfaltios.com/api/chat/send', {
        userId: selectedChat,
        text: messageToSend,
        isStaff: true,
      });
      if (response.status === 200) {
        setMessages([...messages, { text: messageToSend, isStaff: true }]);
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
    sendMessage(shortcut);
  };

  const markImportant = (index) => {
    const updatedMessages = [...messages];
    updatedMessages[index].isImportant = !updatedMessages[index].isImportant;
    setMessages(updatedMessages);
  };

  const deleteChat = async (e, userId) => {
    e.stopPropagation();
    try {
      const response = await axios.delete(`https://api.asfaltios.com/api/chat/${userId}`);
      if (response.status === 200) {
        const updatedChats = activeChats.filter((chat) => chat._id !== userId);
        setActiveChats(updatedChats);
        setFilteredChats(updatedChats);
        if (selectedChat === userId) setSelectedChat(null);
      } else {
        console.error(`Failed to delete chat with ID: ${userId}. Status: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error deleting chat with ID: ${userId}`, error);
    }
  };

  const filterChats = () => {
    const filtered = activeChats.filter((chat) =>
      (chat.username || 'Anonymous User').toLowerCase().includes(chatSearch.toLowerCase())
    );
    setFilteredChats(filtered);
  };

  const markTaskCompleted = (taskId) => {
    const updatedTasks = tasks.filter((task) => task._id !== taskId);
    setTasks(updatedTasks);
    // Optionally, send a request to update the task status on the server
  };

  const assignChat = (e, userId) => {
    e.stopPropagation();
    // Logic to assign chat to the staff member
    console.log(`Chat with user ${userId} assigned to ${username}`);
    // Optionally, send a request to the server to update the assignment
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
                  <div>
                    <strong>{task.header}</strong>: {task.text}
                  </div>
                  <Button onClick={() => markTaskCompleted(task._id)}>Complete</Button>
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
                      <li key={shortcut}>
                        {shortcut}: {message}
                      </li>
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
            <SearchInput
              type="text"
              placeholder="Search chats..."
              value={chatSearch}
              onChange={(e) => setChatSearch(e.target.value)}
            />
            <ChatList>
              {filteredChats.map((chat) => (
                <ChatItem key={chat._id} onClick={() => selectChat(chat._id)}>
                  {chat.username || `Anonymous User`}
                  {/* Notification Badge for new messages */}
                  {chat.hasNewMessages && <NotificationBadge>!</NotificationBadge>}
                  <div style={{ marginTop: '10px' }}>
                    <AssignButton onClick={(e) => assignChat(e, chat._id)}>Assign to Me</AssignButton>
                    <DeleteButton onClick={(e) => deleteChat(e, chat._id)}>Delete</DeleteButton>
                  </div>
                </ChatItem>
              ))}
            </ChatList>
          </Section>

          {selectedChat && (
            <Section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <SectionTitle>Chat with {selectedChat}</SectionTitle>
              <ChatWindow>
                <MessageList>
                  {messages.map((message, index) => (
                    <Message
                      key={index}
                      isStaff={message.isStaff}
                      isImportant={message.isImportant}
                    >
                      {message.text}
                      <em> ({message.sender || 'User'})</em>
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
                <Button onClick={() => sendMessage(newMessage)}>Send</Button>
              </InputContainer>

              {/* Shortcut buttons */}
              <div>
                {Object.keys(messageShortcuts.greetings).map((shortcut, index) => (
                  <ShortcutButton
                    key={index}
                    onClick={() => insertShortcut(messageShortcuts.greetings[shortcut])}
                  >
                    {messageShortcuts.greetings[shortcut]}
                  </ShortcutButton>
                ))}
                {Object.keys(messageShortcuts.troubleshooting).map((shortcut, index) => (
                  <ShortcutButton
                    key={index}
                    onClick={() =>
                      insertShortcut(messageShortcuts.troubleshooting[shortcut])
                    }
                  >
                    {messageShortcuts.troubleshooting[shortcut]}
                  </ShortcutButton>
                ))}
                {Object.keys(messageShortcuts.closing).map((shortcut, index) => (
                  <ShortcutButton
                    key={index}
                    onClick={() => insertShortcut(messageShortcuts.closing[shortcut])}
                  >
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
