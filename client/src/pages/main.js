import React from 'react';
import HeaderComponent from '../components/header';
import styled from 'styled-components';

const PageWrapper = styled.div`
  background-color: #070F2B;
  min-height: 100vh;
  padding-top: 140px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 140px);
  padding: 20px;
`;

const HeaderTitle = styled.h1`
  color: white;
  font-size: 36px;
  margin-bottom: 10px;
`;

const Subtitle = styled.h2`
  color: white;
  font-size: 24px;
  margin-bottom: 40px;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const Card = styled.div`
  width: 300px;
  height: 400px;
  margin: 20px;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.7);
    transition: filter 0.3s ease;
  }

  &:hover img {
    filter: brightness(1);
  }

  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: white;
    width: 80%;
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  &:hover div {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.1);
  }

  h3 {
    font-size: 24px;
    margin-bottom: 10px;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }

  p {
    font-size: 16px;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
`;

const App = () => {
  return (
    <PageWrapper>
      <HeaderComponent />
      <Container>
        <HeaderTitle>AFP</HeaderTitle>
        <Subtitle>Asfaltios Firewall Plugins</Subtitle>
        <CardContainer>
          <Card>
            <img src="card1.jpg" alt="Card 1" />
            <div>
              <h3>Card 1</h3>
              <p>This is the information for Card 1.</p>
            </div>
          </Card>
          <Card>
            <img src="card2.jpg" alt="Card 2" />
            <div>
              <h3>Card 2</h3>
              <p>This is the information for Card 2.</p>
            </div>
          </Card>
          <Card>
            <img src="card3.jpg" alt="Card 3" />
            <div>
              <h3>Card 3</h3>
              <p>This is the information for Card 3.</p>
            </div>
          </Card>
        </CardContainer>
      </Container>
    </PageWrapper>
  );
};

export default App;