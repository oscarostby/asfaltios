import React from 'react';
import styled from 'styled-components';

const ChatbotSection = styled.div`
  position: fixed;
  bottom: 10px; /* Move the chat section up so that the button stays visible below */
  right: 20px;
  width: 100%;
  height: 100%;
  background-color: transparent;
  z-index: 100; /* Ensure chat section is above the button */
  border-radius: 20px;
  box-shadow: 0  rgba(0, 0, 0, 0);
`;

const ChatbotIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 20px;
  overflow: hidden;
`;

const ChatbotContainer = () => {
  return (
    <ChatbotSection>
      <ChatbotIframe
        src="https://ai-chat-et8r.vercel.app/"
        title="Chatbot"
        allowTransparency="true"
      />
    </ChatbotSection>
  );
};

export default ChatbotContainer;
