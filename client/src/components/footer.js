import React from 'react';
import { FaGithub, FaDiscord } from 'react-icons/fa';
import styled from 'styled-components';
import logo from '../bilder/logo2.png';

// Update colors and effects to match the design
const FooterContainer = styled.footer`
  background-color: rgba(10, 11, 30, 0.8); /* Match the dark background with slight transparency */
  color: #b8c7e0; /* Light text color for contrast */
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
    color: #7b68ee; /* Use the same blue accent color */
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
    color: #b8c7e0; /* Match the text color */
    text-decoration: none;
    margin: 0 0.5rem;
    font-size: 1rem;
    transition: color 0.3s ease; /* Transition effect for hover */

    &:hover {
      color: #7b68ee; /* Hover effect with blue accent color */
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
    color: #b8c7e0; /* Match the text color */
    text-decoration: none;
    margin: 0 0.5rem;
    font-size: 1.5rem;
    transition: color 0.3s ease, transform 0.3s ease; /* Transition effect for hover */

    &:hover {
      color: #7b68ee; /* Hover effect with blue accent color */
      transform: scale(1.1); /* Slight scale effect on hover */
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
  color: rgba(255, 255, 255, 0.7); /* Slightly lighter color for the copyright text */

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
          <span>Asfaltios</span>
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
