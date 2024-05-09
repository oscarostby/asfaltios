// AboutUs.js
import React from 'react';
import styled from 'styled-components';
import logo from '../bilder/logo2.png';

const AboutUsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px 40px;
  background-color: #0b1240;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 60px 20px;
  }
`;

const AboutUsText = styled.div`
  flex: 1;
  padding: 0 80px;
  color: white;
  font-size: 18px;
  line-height: 1.5;
  text-align: center;

  @media (max-width: 768px) {
    padding: 0;
    margin-top: 40px;
  }
`;

const AboutUsImage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AboutUsLogo = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
`;

const AboutUsTitle = styled.h2`
  font-size: 36px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const AboutUsDescription = styled.p`
  font-size: 18px;
  margin-bottom: 30px;
`;

const AboutUsPage = () => {
  return (
    <AboutUsContainer>
      <AboutUsImage>
        <AboutUsLogo src={logo} alt="AFP Logo" />
      </AboutUsImage>
      <AboutUsText>
        <AboutUsTitle>About Us</AboutUsTitle>
        <AboutUsDescription>
          We are a team of passionate developers who are dedicated to creating innovative and reliable firewall plugins. Our mission is to provide our customers with the best possible solutions to protect their networks and data.
        </AboutUsDescription>
        <p>
          With years of experience in the cybersecurity industry, we have developed a deep understanding of the challenges faced by businesses and individuals in today's digital landscape. Our team of experts is committed to staying ahead of the curve, constantly researching and implementing the latest security technologies to ensure our customers' peace of mind.
        </p>
      </AboutUsText>
    </AboutUsContainer>
  );
};

export default AboutUsPage;
