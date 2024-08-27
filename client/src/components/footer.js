import React from 'react';
import { FaGithub, FaDiscord } from 'react-icons/fa';
import styled from 'styled-components';
import logo from '../bilder/logo2.png';

const FooterContainer = styled.footer`
  background-color: #2c3e50; /* Match the page background color */
  color: #ecf0f1; /* Light text color for contrast */
  padding: 40px 20px;

  @media (min-width: 768px) {
    padding: 80px 0;
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
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  img {
    height: 40px;
    margin-right: 0;
    margin-bottom: 10px;
  }

  span {
    font-size: 24px;
    color: #6495ED; /* Use the same blue accent color */
  }

  @media (min-width: 768px) {
    flex-direction: row;
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
  margin-bottom: 20px;

  a {
    color: #ecf0f1; /* Match the text color */
    text-decoration: none;
    margin: 0 10px;
    font-size: 16px;

    &:hover {
      color: #6495ED; /* Hover effect with blue accent color */
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
  margin-bottom: 20px;

  a {
    color: #ecf0f1; /* Match the text color */
    text-decoration: none;
    margin: 0 10px;
    font-size: 20px;

    &:hover {
      color: #6495ED; /* Hover effect with blue accent color */
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
  font-size: 14px;
  text-align: center;
  color: #bdc3c7; /* Slightly lighter color for the copyright text */

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
          <a href="https://github.com/your-github-link" target="_blank" rel="noopener noreferrer">
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
