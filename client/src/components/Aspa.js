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
  right: 20px;
  width: ${(props) => (props.minimized ? '60px' : '300px')};
  height: ${(props) => (props.minimized ? '60px' : '400px')};
  background-color: #f1f1f1;
  border-radius: ${(props) => (props.minimized ? '50%' : '10px')};
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.minimized ? 'center' : 'space-between')};
  align-items: center;
  z-index: 1000;
  cursor: ${(props) => (props.minimized ? 'pointer' : 'default')};
  animation: ${(props) => (props.minimized ? fadeOut : fadeIn)} 0.3s ease;
`;

const ChatHeader = styled.div`
  background-color: #0078d7;
  color: white;
  padding: 10px;
  width: 100%;
  border-radius: 10px 10px 0 0;
  text-align: center;
  font-weight: bold;
`;

const EstimatedWaitTime = styled.div`
  font-size: 0.9em;
  color: #ffcc00;
  margin-top: 5px;
`;

const ChatMessages = styled.div`
  padding: 10px;
  flex: 1;
  overflow-y: auto;
  width: 100%;
`;

const ChatInputContainer = styled.div`
  display: flex;
  padding: 10px;
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

    // Add a welcome message when the component loads
    if (messages.length === 0) {
      setMessages([
        {
          text: "Hello! Please ask your question.",
          sender: "system",
          icon: "https://i.ibb.co/Msm5vW8/image-removebg-preview-2-3-2.png",
        },
      ]);
    }
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

  return (
    <ChatContainer minimized={minimized} onClick={minimized ? toggleMinimized : undefined}>
      {minimized ? (
        <MinimizedIcon src="https://i.ibb.co/Msm5vW8/image-removebg-preview-2-3-2.png" alt="Chat Icon" onClick={toggleMinimized} />
      ) : (
        <>
          <ChatHeader onClick={toggleMinimized}>
            Aspa Live Chat
            <EstimatedWaitTime>Estimated Wait Time: {estimatedWaitTime}</EstimatedWaitTime>
          </ChatHeader>
          <ChatMessages>
            {messages.map((msg, index) => (
              <div key={index} style={{ margin: '5px 0', textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                {msg.sender === 'system' && (
                  <MinimizedIcon src={msg.icon} alt="System Icon" style={{ marginRight: '10px', verticalAlign: 'middle' }} />
                )}
                <div style={{ display: 'inline-block', padding: '10px', background: msg.sender === 'user' ? '#0078d7' : '#e1e1e1', borderRadius: '10px', color: msg.sender === 'user' ? 'white' : 'black' }}>
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
        </>
      )}
    </ChatContainer>
  );
};

export default ASPA;
