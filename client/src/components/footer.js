import React from 'react';
import { FaGithub, FaDiscord } from 'react-icons/fa';
import styled from 'styled-components';
import logo from '../bilder/logo2.png';

const FooterContainer = styled.footer`
  background-color: #ffffff; /* Changed to white */
  color: #000000; /* Changed text color to black */
  padding: 2rem;

  @media (min-width: 768px) {
    padding: 4rem 2rem;
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
  margin-bottom: 1.5rem;

  img {
    height: 40px;
    margin-right: 0;
    margin-bottom: 0.5rem;
  }

  span {
    font-size: 1.5rem;
    color: #000000; /* Changed to black */
  }

  @media (min-width: 768px) {
    flex-direction: row;
    margin-bottom: 2rem;

    img {
      height: 60px;
      margin-right: 1rem;
    }

    span {
      font-size: 1.8rem;
    }
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 1.5rem;

  a {
    color: #000000; /* Changed to black */
    text-decoration: none;
    margin: 0 0.5rem;
    font-size: 1rem;
    transition: color 0.3s ease;

    &:hover {
      color: #3b82f6; /* Keep blue hover effect */
    }
  }

  @media (min-width: 768px) {
    margin-bottom: 2rem;

    a {
      margin: 0 1rem;
      font-size: 1.2rem;
    }
  }
`;

const FooterSocial = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;

  a {
    color: #000000; /* Changed to black */
    text-decoration: none;
    margin: 0 0.5rem;
    font-size: 1.5rem;
    transition: color 0.3s ease, transform 0.3s ease;

    &:hover {
      color: #3b82f6; /* Keep blue hover effect */
      transform: scale(1.1);
    }
  }

  @media (min-width: 768px) {
    margin-bottom: 2rem;

    a {
      margin: 0 1rem;
      font-size: 1.8rem;
    }
  }
`;

const FooterCopyright = styled.div`
  font-size: 0.875rem;
  text-align: center;
  color: rgba(0, 0, 0, 0.7); /* Changed to a lighter black color */

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLogo>
          <img src={logo} alt="Asfaltios Logo" />
          <span></span>
        </FooterLogo>

        <FooterLinks>
          <a href="https://github.com/your-github-link" target="_blank" rel="noopener noreferrer">
            
          </a>
          <a href="https://discord.gg/XSwEQCxPMu" target="_blank" rel="noopener noreferrer">
            
          </a>
        </FooterLinks>

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