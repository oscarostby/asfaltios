import React from 'react';
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
`;

const Box = styled.div`
  width: 300px;
  height: 100px;
  border: 2px solid black;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  transition: transform 0.3s ease;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);

  &:hover {
    transform: scale(1.1);
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
              <FontAwesomeIcon icon={icon} style={{ marginRight: '10px' }} />
              {title}
            </Box>
          ))}
        </Row>
        <Row>
          {securityTopics.slice(6, 12).map(({ title, icon }, index) => (
            <Box key={index + 6}>
              <FontAwesomeIcon icon={icon} style={{ marginRight: '10px' }} />
              {title}
            </Box>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default App;