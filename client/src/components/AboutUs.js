import React from 'react';
import styled from 'styled-components';
import logo from '../bilder/logo2.png';
import Bg from '../bilder/bglayer.jpg';

const Container = styled.div`
  background-image: url(${Bg});
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  padding: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    text-align: left;
    padding: 4rem;
  }
`;

const LogoWrapper = styled.div`
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    margin-right: 4rem;
    margin-bottom: 0;
  }
`;

const LogoImage = styled.img`
  width: 150px;
  height: auto;
`;

const TextWrapper = styled.div`
  max-width: 600px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
`;

const AboutUs = () => {
  return (
    <Container>
      <LogoWrapper>
        <LogoImage src={logo} alt="Company Logo" />
      </LogoWrapper>
      <TextWrapper>
        <Title>About Minecraft Secure Plugins</Title>
        <Description>
          At Minecraft Secure Plugins, we are dedicated to providing top-notch security solutions for Minecraft servers. Our team of expert developers has years of experience in crafting high-quality plugins that prioritize server protection and player safety.
        </Description>
        <Description>
          Our flagship product, the SecureCore plugin, is designed to safeguard your server from malicious attacks, exploitation attempts, and unauthorized access. With advanced features like IP whitelisting, command blocking, and real-time monitoring, you can rest assured that your server and its players are in safe hands.
        </Description>
        <Description>
          We believe in continuous innovation and strive to stay ahead of the curve when it comes to server security. Our plugins are regularly updated to address the latest threats and vulnerabilities, ensuring that your server remains secure and protected at all times.
        </Description>
      </TextWrapper>
    </Container>
  );
};

export default AboutUs;