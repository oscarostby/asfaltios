// src/BakteriaInfo.js
import React from 'react';
import styled, { keyframes } from 'styled-components';
import bacteriaGif from '../bilder/3dgifmaker37576.gif'; // Legg til din egen gif her

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background: linear-gradient(135deg, #2b5876, #4e4376);
  min-height: 100vh;
  color: #f0f0f0;
  animation: ${fadeIn} 1s ease-out;
`;



const InfoSection = styled.div`
  max-width: 800px;
  background: rgba(255, 255, 255, 0.1);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  animation: ${fadeIn} 1s ease-out 0.5s;
  text-align: center;

  h1 {
    font-size: 2.5em;
    margin-bottom: 20px;
    color: #ffcc00;
  }

  p {
    margin-bottom: 15px;
    line-height: 1.8;
    font-size: 1.1em;
    color: #e0e0e0;
  }

  a {
    color: #ffcc00;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s ease;

    &:hover {
      color: #ff9900;
    }
  }
`;

const BakteriaInfo = () => {
  return (
    <Container>
        <img src={bacteriaGif} alt="Bakteria Gif" />

      <InfoSection>
        <h1>Bakteria Staff Moderation Plugin</h1>
        <p>
          Bakteria is a staff moderation plugin designed for Minecraft servers running on versions 1.8 to 1.21. This plugin provides essential tools for server staff to effectively manage players and maintain order.
        </p>
        <p>
          With Bakteria, staff members have access to a wide range of commands and features that help them monitor and moderate the behavior of players on the server. Some of the key features include player surveillance, punishment commands, and detailed logging of staff actions.
        </p>
        <p>
          This plugin is highly configurable, allowing server administrators to fine-tune settings according to the needs of their server. It also supports integration with various other plugins and is optimized for performance.
        </p>
        <p>
          Whether you're running a small community server or a large public network, Bakteria provides the tools you need to keep your server safe and fun for all players.
        </p>
        <p>
          For more information and to download the plugin, visit the <a href="https://www.spigotmc.org/resources/bakteria-staff-moderation-plugin-1-8-1-21.117394/" target="_blank" rel="noopener noreferrer">official SpigotMC page</a>.
        </p>
      </InfoSection>
    </Container>
  );
};

export default BakteriaInfo;
