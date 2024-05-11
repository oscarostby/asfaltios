import React from 'react';
import { FaGithub, FaDiscord } from 'react-icons/fa';
import styled from 'styled-components';
import logo from '../bilder/logo3.png';

const FooterContainer = styled.footer`
  background-color: #ffffff;
  color: #070b2e;
  padding: 40px 20px; // Reduced padding for smaller screens

  @media (min-width: 768px) {
    padding: 80px 0; // Original padding for larger screens
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const FooterLogo = styled.div`
  display: flex;
  flex-direction: column; // Stack logo and text vertically on smaller screens
  align-items: center;
  margin-bottom: 20px; // Reduced margin for smaller screens

  img {
    height: 40px; // Reduced logo size for smaller screens
    margin-right: 0;
    margin-bottom: 10px; // Add some spacing between logo and text
  }

  span {
    font-size: 24px; // Reduced font size for smaller screens
  }

  @media (min-width: 768px) {
    flex-direction: row; // Revert to original layout for larger screens
    margin-bottom: 40px;

    img {
      height: 60px;
      margin-right: 20px;
      margin-bottom: 0;
    }

    span {
      font-size: 28px;
    }
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px; // Reduced margin for smaller screens

  a {
    color: #070b2e;
    text-decoration: none;
    margin: 0 10px; // Reduced margin for smaller screens
    font-size: 16px; // Reduced font size for smaller screens

    &:hover {
      color: #4b4b4b;
    }
  }

  @media (min-width: 768px) {
    margin-bottom: 40px;

    a {
      margin: 0 20px;
      font-size: 18px;
    }
  }
`;

const FooterSocial = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px; // Reduced margin for smaller screens

  a {
    color: #070b2e;
    text-decoration: none;
    margin: 0 10px; // Reduced margin for smaller screens
    font-size: 20px; // Reduced font size for smaller screens

    &:hover {
      color: #4b4b4b;
    }
  }

  @media (min-width: 768px) {
    margin-bottom: 40px;

    a {
      margin: 0 20px;
      font-size: 24px;
    }
  }
`;

const FooterCopyright = styled.div`
  font-size: 14px; // Reduced font size for smaller screens
  text-align: center;
  color: #4b4b4b;

  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLogo>
          <img src={logo} alt="Asfaltios Logo" />
          <span>Asfaltios</span>
        </FooterLogo>

        <FooterSocial>
          <a href="https://discord.gg/XSwEQCxPMus" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://discord.gg/XSwEQCxPMu" target="_blank" rel="noopener noreferrer">
            <FaDiscord />
          </a>
        </FooterSocial>
      </FooterContent>
      <FooterCopyright>
        &copy; {new Date().getFullYear()} Asfaltios. All rights reserved.
      </FooterCopyright>
    </FooterContainer>
  );
};

export default Footer;
