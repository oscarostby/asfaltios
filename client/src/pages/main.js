import React from 'react';
import HeaderComponent from '../components/header';
import styled from 'styled-components';
import card1 from '../bilder/card1.png';
import card2 from '../bilder/card2.png';
import card3 from '../bilder/card3.png';

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
  margin-top: 150px;
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
  height: 450px;
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
    height: 150px;
    object-fit: contain;
  }

  div {
    padding: 20px;
    text-align: center;
  }

  h3 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
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
            <img src={card1} alt="Card 1" />
            <div>
              <h3>Card 1</h3>
              <p>This is the information for Card 1.</p>
            </div>
          </Card>
          <Card>
            <img src={card2} alt="Card 2" />
            <div>
              <h3>Card 2</h3>
              <p>This is the information for Card 2.</p>
            </div>
          </Card>
          <Card>
            <img src={card3} alt="Card 3" />
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