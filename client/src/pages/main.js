// Main.js
import React from 'react';
import HeaderComponent from '../components/header';
import styled from 'styled-components';
import ProductPage from '../components/Product';
import AboutUsPage from '../components/AboutUs';
import Footer from '../components/footer';
import logo from '../bilder/logo.png'; // Import your logo image

const PageWrapper = styled.div`
  background-color: #0b1240;
  min-height: 100vh;
  padding-top: 140px;
  position: relative; // Add position relative to create a positioning context
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 140px);
  padding: 40px;
  background-color: #e0ebf6;

  @media (max-width: 768px) {
    height: auto;
    padding: 20px;
  }
`;

const HeaderTitle = styled.h1`
  color: white;
  font-size: 48px;
  margin-bottom: 20px;
  text-align: center;
  position: relative; // Add position relative to create a positioning context for the logo
  margin-top: 150px; // Increase the margin-top to move the text further from the header

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const Logo = styled.img`
  position: absolute; // Position the logo absolutely within the HeaderTitle
  top: -150px; // Adjust the top position to move the logo further from the header
  left: 50%; // Center the logo horizontally
  transform: translateX(-50%); // Adjust the horizontal position
  max-width: 150px; // Increase the maximum width for the logo
  max-height: 150px; // Increase the maximum height for the logo
`;

const Subtitle = styled.h2`
  color: white;
  font-size: 32px;
  margin-bottom: 60px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 40px;
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
  return (
    <PageWrapper>
      <HeaderComponent />
      <Container>
        <HeaderTitle>
          Our most Downloaded Plugins
          <Logo src={logo} alt="Logo" />
        </HeaderTitle>
        <Subtitle>Check out our top products</Subtitle>
        <ProductPage />
        <ContactButton onClick={() => window.location.href = '/contact'}>Contact us here!</ContactButton>
      </Container>
      <AboutUsPage />
      <Footer />
    </PageWrapper>
  );
};

export default Main;