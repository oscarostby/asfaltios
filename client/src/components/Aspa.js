import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.9); }
`;

const ChatContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: ${(props) => (props.minimized ? '20px' : '60px')}; /* Moved slightly left */
  width: ${(props) => (props.minimized ? '60px' : '350px')};
  height: ${(props) => (props.minimized ? '60px' : '500px')};
  background-color: #0a192f;
  border-radius: ${(props) => (props.minimized ? '50%' : '10px')};
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.minimized ? 'center' : 'space-between')};
  align-items: center;
  z-index: 1000;
  cursor: ${(props) => (props.minimized ? 'pointer' : 'default')};
  animation: ${(props) => (props.minimized ? fadeOut : fadeIn)} 0.3s ease;

  @media (max-width: 768px) {
    right: ${(props) => (props.minimized ? '10px' : '30px')};
    width: ${(props) => (props.minimized ? '50px' : '300px')};
    height: ${(props) => (props.minimized ? '50px' : '400px')};
  }

  @media (max-width: 480px) {
    right: ${(props) => (props.minimized ? '5px' : '10px')};
    width: ${(props) => (props.minimized ? '40px' : '250px')};
    height: ${(props) => (props.minimized ? '40px' : '350px')};
  }
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

const NewChatButton = styled.button`
  background-color: #64ffda;
  border: none;
  border-radius: 5px;
  color: #0a192f;
  padding: 8px 15px;
  cursor: pointer;
  margin: 10px;

  &:hover {
    background-color: #52e0ba;
  }
`;

const EstimatedWaitTime = styled.div`
  font-size: 0.9em;
  color: #ffcc00;
  margin-top: 5px;
`;

const ChatMessages = styled.div`
  padding: 15px;
  flex: 1;
  overflow-y: auto;
  width: 100%;
  color: #e6f1ff;
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

const MinimizedIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const ASPA = () => {
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [input, setInput] = useState('');
  const [minimized, setMinimized] = useState(true); // Starts minimized
  const [estimatedWaitTime, setEstimatedWaitTime] = useState('1-2 minutes');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('https://api.asfaltios.com/api/chat/messages');
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    // Poll for new messages every 5 seconds
    const intervalId = setInterval(fetchMessages, 5000);

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, []);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim()) {
      const newMessage = { text: input, sender: 'user' };
      setMessages([...messages, newMessage]);

      try {
        await axios.post('https://api.asfaltios.com/api/chat/send', newMessage);
      } catch (error) {
        console.error('Error sending message:', error);
      }

      setInput('');
    }
  };

  const toggleMinimized = () => {
    setMinimized(!minimized);
  };

  const handleNewChat = () => {
    setMessages([]);
    localStorage.removeItem('chatMessages');
  };

  return (
    <ChatContainer minimized={minimized} onClick={minimized ? toggleMinimized : undefined}>
      {minimized ? (
        <MinimizedIcon src="https://i.ibb.co/Msm5vW8/image-removebg-preview-2-3-2.png" alt="Chat Icon" onClick={toggleMinimized} />
      ) : (
        <>
          <ChatHeader>
            Aspa Live Chat
            <CloseButton onClick={toggleMinimized}>×</CloseButton>
          </ChatHeader>
          <EstimatedWaitTime>Estimated Wait Time: {estimatedWaitTime}</EstimatedWaitTime>
          <ChatMessages>
            {messages.map((msg, index) => (
              <div key={index} style={{ margin: '5px 0', textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                <div style={{ display: 'inline-block', padding: '10px', background: msg.sender === 'user' ? '#0078d7' : '#112240', borderRadius: '10px', color: msg.sender === 'user' ? 'white' : '#e6f1ff' }}>
                  {msg.text}
                </div>
              </div>
            ))}
          </ChatMessages>
          <ChatInputContainer>
            <ChatInput
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            <SendButton onClick={handleSendMessage}>Send</SendButton>
          </ChatInputContainer>
          <NewChatButton onClick={handleNewChat}>New Chat</NewChatButton>
        </>
      )}
    </ChatContainer>
  );
};

export default ASPA;
