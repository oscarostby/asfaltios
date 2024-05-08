import React from 'react';
import HeaderComponent from '../components/header';
import styled from 'styled-components';
import card1 from '../bilder/card1.png';
import card2 from '../bilder/card2.png';
import card3 from '../bilder/card3.png';
import logo from '../bilder/logo2.png';
import Footer from '../components/footer';

const PageWrapper = styled.div`
  background-color: #070b2e;
  min-height: 100vh;
  padding-top: 140px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 140px);
  padding: 40px;

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

  @media (max-width: 768px) {
    font-size: 36px;
  }
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

const ProductContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

const ProductCard = styled.div`
  width: 300px;
  height: 500px;
  margin: 20px;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: transform 0.3s ease;
  background-color: white;
  color: #070F2B;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  div {
    padding: 20px;
    text-align: center;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  h3 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
    margin-bottom: 20px;
  }

  .plugin-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #666;
  }

  .plugin-info i {
    margin-right: 5px;
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

const App = () => {
  return (
    <PageWrapper>
      <HeaderComponent />
      <Container>
        <HeaderTitle>Our most Downloaded Plugins</HeaderTitle>
        <Subtitle>Check out our top products</Subtitle>
        <ProductContainer>
          <ProductCard>
            <img src={card1} alt="Card 1" />
            <div>
              <h3>Plugin 1</h3>
              <p>This is the information for Plugin 1. It provides advanced firewall protection and customizable settings to keep your network secure.</p>
              <div className="plugin-info">
                <span><i className="fas fa-download"></i> 10,000+</span>
                <span><i className="fas fa-star"></i> 4.8</span>
              </div>
            </div>
          </ProductCard>
          <ProductCard>
            <img src={card2} alt="Card 2" />
            <div>
              <h3>Plugin 2</h3>
              <p>This is the information for Plugin 2. It offers real-time threat detection and automatic updates to ensure your system is always protected.</p>
              <div className="plugin-info">
                <span><i className="fas fa-download"></i> 8,500+</span>
                <span><i className="fas fa-star"></i> 4.6</span>
              </div>
            </div>
          </ProductCard>
          <ProductCard>
            <img src={card3} alt="Card 3" />
            <div>
              <h3>Plugin 3</h3>
              <p>This is the information for Plugin 3. It provides comprehensive logging and reporting features to help you monitor your network's security.</p>
              <div className="plugin-info">
                <span><i className="fas fa-download"></i> 12,000+</span>
                <span><i className="fas fa-star"></i> 4.9</span>
              </div>
            </div>
          </ProductCard>
        </ProductContainer>
        <ContactButton onClick={() => window.location.href = '/contact'}>Contact us here!</ContactButton>
      </Container>
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
      <Footer />
    </PageWrapper>
  );
};

export default App;