import React, { useState, useEffect } from 'react';
import HeaderComponent from '../components/header';
import MobileHeader from '../components/mobileheader'; // Import MobileHeader
import styled from 'styled-components';
import ProductPage from '../components/Product';
import AboutUsPage from '../components/AboutUs';
import Footer from '../components/footer';
import logo from '../bilder/logo2.png'; // Import your logo image
import Bg from '../bilder/bg2.jpg'; // Import your logo image

const PageWrapper = styled.div`
  background-color: white;
  min-height: 100vh;
  padding-top: 140px;
  position: relative; // Add position relative to create a positioning context
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 10px);
  padding: 20px; /* Reduced padding for mobile */
  background-color: #333333;
  background-image: url(${Bg});
  background-size: cover; /* Adjusts the background image size */
  background-position: center; /* Centers the background image */

  @media (min-width: 769px) {
    /* Desktop styles */
    padding: 40px; /* Original padding for desktop */
  }
`;

const HeaderTitle = styled.h1`
  color: white;
  font-size: 48px;
  margin-bottom: 20px;
  text-align: center;
  position: relative; // Add position relative to create a positioning context for the logo
  margin-top: 250px; // Increase the margin-top to move the text further from the header

  @media (max-width: 768px) {
    font-size: 36px;
    margin-top: 150px; /* Adjusted margin-top for mobile */
  }
`;

const Logo = styled.img`
  position: absolute; // Position the logo absolutely within the HeaderTitle
  top: -150px; // Adjust the top position to move the logo further from the header
  left: 50%; // Center the logo horizontally
  transform: translateX(-50%); // Adjust the horizontal position
  max-width: 150px; // Increase the maximum width for the logo
  max-height: 150px; // Increase the maximum height for the logo

  @media (max-width: 768px) {
    top: -100px; /* Adjusted top position for mobile */
    max-width: 100px; /* Reduced max-width for mobile */
    max-height: 100px; /* Reduced max-height for mobile */
  }
`;

const Subtitle = styled.h2`
  color: white;
  font-size: 32px;
  margin-bottom: 40px; /* Reduced margin-bottom for mobile */
  text-align: center;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 20px; /* Further reduced margin-bottom for mobile */
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

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
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
  );
};

export default Main;
