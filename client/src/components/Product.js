import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faShieldAlt, faUserShield, faVirusSlash, faBugSlash, faKey, faShieldVirus, faNetworkWired, faCloud, faFireExtinguisher, faChartLine, faBalanceScaleRight } from '@fortawesome/free-solid-svg-icons';

const securityTopics = [
  { title: 'Encryption', icon: faLock },
  { title: 'Firewalls', icon: faShieldAlt },
  { title: 'Access Control', icon: faUserShield },
  { title: 'Antivirus', icon: faVirusSlash },
  { title: 'Penetration Testing', icon: faBugSlash },
  { title: 'Secure Coding', icon: faKey },
  { title: 'Password Management', icon: faShieldVirus },
  { title: 'Network Security', icon: faNetworkWired },
  { title: 'Cloud Security', icon: faCloud },
  { title: 'Incident Response', icon: faFireExtinguisher },
  { title: 'Risk Management', icon: faChartLine },
  { title: 'Compliance', icon: faBalanceScaleRight }
];

const BlurredBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: url('https://source.unsplash.com/random/1920x1080') no-repeat center center fixed;
  background-size: cover;
  filter: blur(10px);
  z-index: -1;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-wrap: nowrap;
    overflow-x: auto;
    white-space: nowrap;
    animation: scroll 15s linear infinite;
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
`;

const Box = styled.div`
  width: 200px;
  height: 100px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  transition: transform 0.3s ease, background-color 0.3s ease, color 0.3s ease;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  color: #fff;

  &:hover {
    transform: scale(1.1);
    background-color: rgba(255, 255, 255, 0.2);
    color: #000;
  }

  @media (max-width: 768px) {
    width: 150px;
    height: 80px;
    margin: 0 10px;
  }
`;

const App = () => {
  return (
    <>
      <BlurredBackground />
      <Container>
        <Row>
          {securityTopics.slice(0, 6).map(({ title, icon }, index) => (
            <Box key={index}>
              <FontAwesomeIcon icon={icon} style={{ fontSize: '24px', marginBottom: '10px' }} />
              <span style={{ fontSize: '16px' }}>{title}</span>
            </Box>
          ))}
        </Row>
        <Row>
          {securityTopics.slice(6, 12).map(({ title, icon }, index) => (
            <Box key={index + 6}>
              <FontAwesomeIcon icon={icon} style={{ fontSize: '24px', marginBottom: '10px' }} />
              <span style={{ fontSize: '16px' }}>{title}</span>
            </Box>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default App;