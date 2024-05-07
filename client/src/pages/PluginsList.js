import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import HeaderComponent from '../components/header';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Open Sans', sans-serif;
    background-color: #1e1e1e;
    color: #ccc;
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 200px; // Increased padding
`;

const Section = styled.section`
  width: 90%;
  max-width: 1200px; // Maximum width for larger screens
  padding: 30px;
  background: #2c2c2c;
  margin-bottom: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  color: #fff;
  margin-bottom: 30px;
  text-align: center;
`;

const IconGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
`;

const WideGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 20px;
`;

const Card = styled.div`
  background-color: #333;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  position: relative;
  color: #eee;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const IconCard = styled(Card)`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const WideCard = styled(Card)`
  display: flex;
  flex-direction: column;
`;

const CardImage = styled.img`
  width: 100%;
  height: auto;
  border-bottom: 1px solid #444;
`;

const CardInfo = styled.div`
  padding: 15px;
  text-align: center;
`;

const CardTitle = styled.h3`
  font-size: 20px;
`;

const CardDescription = styled.p`
  font-size: 16px;
  color: #aaa;
`;

const PriceTag = styled.span`
  background-color: #4caf50;
  color: white;
  padding: 8px 12px;
  border-radius: 5px;
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 18px;
  font-weight: bold;
`;

// Mock data for the cards
const icons = [
  { id: 1, name: 'DirectionalBlocks', price: 'FREE', imageUrl: 'https://path/to/image.png', description: 'The best way to make logs and lumber' },
  { id: 2, name: 'Ultra Motd', price: '£9.98', imageUrl: 'https://path/to/image.png', description: 'The Ultimate Motd Plugin which adds Server and Welcome Motds' },
  { id: 3, name: 'CustomFishing', price: '£11.98', imageUrl: 'https://path/to/image.png', description: 'Fishing mini-game, Fishing Bag, Sell shop, Lava fishing' },
  { id: 4, name: 'ShieldSpigot 1.8X', price: '£20.00', imageUrl: 'https://path/to/image.png', description: 'Advanced Paper fork on Polymart market' },
];

const wides = [
  { id: 5, name: 'HarvestEXP', price: '12.00 USD', imageUrl: 'https://path/to/image.png', description: 'Fully customizable experience drops when harvesting crops!' },
  { id: 6, name: 'Better Survival | New Big Update', price: '27.99 EUR', imageUrl: 'https://path/to/image.png', description: 'Survival 1.20.4 | Detailed Spawn - Texture | Skills' },
  { id: 7, name: 'Lobby SkyWars | BedWars etc..', price: '2.50 USD', imageUrl: 'https://path/to/image.png', description: 'Lobby MiniGames | SkyWars | BedWars | PartyGames' },
  { id: 8, name: 'NullCordX', price: '13.99 USD', imageUrl: 'https://path/to/image.png', description: 'Sophisticated Waterfall fork natively built on antibot, improves performance' },
];

export default function App() {
  return (
    <>
      <GlobalStyle />
      <HeaderComponent />
      <MainContainer>
        <Section>
          <SectionTitle>Exclusively on Polymart</SectionTitle>
          <IconGrid>
            {icons.map((item) => (
              <IconCard key={item.id}>
                <CardImage src={item.imageUrl} alt={item.name} style={{ height: '150px' }} />
                <CardInfo>
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                  <PriceTag>{item.price}</PriceTag>
                </CardInfo>
              </IconCard>
            ))}
          </IconGrid>
        </Section>
        <Section>
          <SectionTitle>Recently Updated</SectionTitle>
          <WideGrid>
            {wides.map((item) => (
              <WideCard key={item.id}>
                <CardImage src={item.imageUrl} alt={item.name} style={{ height: '250px' }} />
                <CardInfo>
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                  <PriceTag>{item.price}</PriceTag>
                </CardInfo>
              </WideCard>
            ))}
          </WideGrid>
        </Section>
      </MainContainer>
    </>
  );
}