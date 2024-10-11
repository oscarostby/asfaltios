import React from 'react';
import styled from 'styled-components';

const ChatbotWrapper = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%; /* Tar opp hele bredden */
  height: 100%; /* Tar opp hele høyden */
  z-index: 100;
  pointer-events: none; /* Ignorerer klikk på wrapper */
`;

const ChatbotSection = styled.div`
  width: 100%;
  height: 100%;
  background-color: transparent;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  pointer-events: auto; /* Tillater klikk kun her */
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
    <ChatbotWrapper>
      <ChatbotSection>
        <ChatbotIframe
          src="https://aspa-ai.vercel.app/"
          title="Chatbot"
          allowTransparency="true"
        />
      </ChatbotSection>
    </ChatbotWrapper>
  );
};

export default ChatbotContainer;
