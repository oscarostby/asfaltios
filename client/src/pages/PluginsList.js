import React from 'react';
import styled from 'styled-components';
import HeaderComponent from '../components/header';

// Styled components definitions
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 140px);
  padding: 20px;
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


// Example plugins data
const examplePlugins = [
  {
    id: '1',
    name: 'Plugin One',
    description: 'This is Plugin One.',
    image: 'path/to/image1.jpg'
  },
  {
    id: '2',
    name: 'Plugin Two',
    description: 'This is Plugin Two.',
    image: 'path/to/image2.jpg'
  }
];

// PluginsList component
const PluginsList = () => {
  return (
    <Container>
      <CardContainer>
        {examplePlugins.map(plugin => (
          <Card key={plugin.id}>
            <img src={plugin.image} alt={plugin.name} />
            <div>
              <h3>{plugin.name}</h3>
              <p>{plugin.description}</p>
            </div>
          </Card>
        ))}
      </CardContainer>
    </Container>
  );
};

export default PluginsList;
