import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import HeaderComponent from '../components/header';
import MobileHeader from '../components/mobileheader';
import ProductPage from '../components/Product';
import AboutUsPage from '../components/AboutUs';
import Footer from '../components/footer';
import logo from '../bilder/logo2.png';
import Bg from '../bilder/bg2.jpg';

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    overflow-x: hidden;  /* Prevent horizontal scrolling */
  }
`;

const PageWrapper = styled.div`
  overflow-x: hidden;  /* Prevent horizontal scrolling */
  position: relative;
  min-height: 100vh;
  width: 100vw;
  padding-top: 140px;
  background-color: #888484;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      #717477 0%,
      #838585 25%,
      #979792 50%,
      #858786 75%,
      #6e7074 100%
    );
    filter: blur(10px);
    z-index: -1;  /* Place the pseudo-element behind the content */
  }
`;

const Container = styled.div`
  overflow-x: hidden;  /* Prevent horizontal scrolling */
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 10px);
  padding: 20px;
  background-color: #333333;
  background-image: url(${Bg});
  background-size: cover;
  background-position: center;

  @media (min-width: 769px) {
    padding: 40px;
  }
`;

const HeaderTitle = styled.h1`
  color: white;
  font-size: 48px;
  margin-bottom: 20px;
  text-align: center;
  position: relative;
  margin-top: 250px;

  @media (max-width: 768px) {
    font-size: 36px;
    margin-top: 150px;
  }
`;

const Logo = styled.img`
  position: absolute;
  top: -150px;
  left: 50%;
  transform: translateX(-50%);
  max-width: 150px;
  max-height: 150px;

  @media (max-width: 768px) {
    top: -100px;
    max-width: 100px;
    max-height: 100px;
  }
`;

const Subtitle = styled.h2`
  color: white;
  font-size: 32px;
  margin-bottom: 40px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 20px;
  }
`;

const ContactButton = styled.button`
  background-color: #070b2e;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 30px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 12px 24px;
  }
`;

const Main = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <PageWrapper>
        {isMobile ? <MobileHeader /> : <HeaderComponent />}
        <Container>
          <HeaderTitle>
            Your Minecraft security solutions
            <Logo src={logo} alt="Logo" />
          </HeaderTitle>
          <Subtitle>Our key features:</Subtitle>
          <ProductPage />
        </Container>
        <AboutUsPage />
        <Footer />
      </PageWrapper>
    </>
  );
};

export default Main;
