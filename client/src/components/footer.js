import React from 'react';
import { FaGithub, FaDiscord } from 'react-icons/fa';
import styled from 'styled-components';
import logo from '../bilder/logo2.png';

const FooterContainer = styled.footer`
  background-color: #ffffff;
  color: #070b2e;
  padding: 80px 0;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;

  img {
    height: 60px;
    margin-right: 20px;
  }

  span {
    font-size: 28px;
    font-weight: bold;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 40px;

  a {
    color: #070b2e;
    text-decoration: none;
    margin: 0 20px;
    font-size: 18px;
    transition: color 0.3s ease;

    &:hover {
      color: #4b4b4b;
    }
  }
`;

const FooterSocial = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;

  a {
    color: #070b2e;
    text-decoration: none;
    margin: 0 20px;
    font-size: 24px;
    transition: color 0.3s ease;

    &:hover {
      color: #4b4b4b;
    }
  }
`;

const FooterCopyright = styled.div`
  font-size: 16px;
  text-align: center;
  color: #4b4b4b;
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
          <a href="https://github.com/asfaltios" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://discord.gg/asfaltios" target="_blank" rel="noopener noreferrer">
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
