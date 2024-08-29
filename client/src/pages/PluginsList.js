import React from 'react';
import styled, { keyframes } from 'styled-components';
import HeaderComponent from '../components/header';

// Keyframes for bakgrunnsanimasjon
const bgAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Keyframes for tekstanimasjon
const animGravity = keyframes`
  0% { transform: translateY(-26px); opacity: 0; }
  30%, 80% { letter-spacing: 40px; padding-left: 40px; transform: translateY(0px); opacity: 1; }
`;

const Title = styled.div`
  position: absolute;
  font-weight: 700; /* Gjør teksten tykkere */
  top: 30%; /* Plassert øverst på skjermen */
  left: 0;
  right: 0;
  margin-top: -80px;
  font-size: 130px;
  text-align: center;
  letter-spacing: 20px;
  padding-left: 20px;
  background: linear-gradient(120deg, #00A4D8, #FFFFFF, #00203F); /* Justert gradient for bedre samsvar */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${animGravity} 6s ease forwards;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  position: relative;
  padding-top: 20px;
  background: linear-gradient(120deg, #00203F, #4A75A8, #00A4D8); /* Gradient bakgrunn */
  background-size: 200% 200%;
  animation: ${bgAnimation} 10s ease infinite; /* Animert gradient */
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  position: absolute;
  bottom: 20px;
  width: 90%;
  left: 50%;
  transform: translateX(-50%);
`;

const TopImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  position: absolute;
  bottom: 380px; /* Justert for å gi mer plass til større bilder */
  width: 90%;
  left: 50%;
  transform: translateX(-50%);
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px; /* Økt høyde for betydelig større bilder */
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const GoldText = styled.div`
  font-size: 18px;
  color: #FFD700; /* Gullfarge */
  margin-bottom: 10px;
  font-weight: 700;
  text-shadow: 1px 1px 5px rgba(255, 215, 0, 0.6); /* Skinnende effekt */
`;

const SecurityText = styled.div`
  font-size: 18px;
  color: #4CAF50; /* Grønn farge som symboliserer sikkerhet */
  margin-bottom: 10px;
  font-weight: 700;
  text-transform: uppercase; /* Gjør teksten mer robust og solid */
  letter-spacing: 1px; /* Litt mer avstand mellom bokstavene */
`;

const PluginList = () => {
  return (
    <Container>
      <HeaderComponent />
      <Title>PLUGINS</Title>
      <TopImageGrid>
        <ImageWrapper>
          <GoldText>Test 1</GoldText>
          <Image src="https://i.ibb.co/WyKFSH5/3dgif-Simplegold.gif" alt="image 1" />
        </ImageWrapper>
        <ImageWrapper>
          <SecurityText>Test 2</SecurityText>
          <Image src="https://i.ibb.co/WyKFSH5/3dgif-Simplegold.gif" alt="image 2" />
        </ImageWrapper>
        <ImageWrapper>
          <GoldText>Test 1</GoldText>
          <Image src="https://i.ibb.co/WyKFSH5/3dgif-Simplegold.gif" alt="image 3" />
        </ImageWrapper>
        <ImageWrapper>
          <SecurityText>Test 2</SecurityText>
          <Image src="https://i.ibb.co/WyKFSH5/3dgif-Simplegold.gif" alt="image 4" />
        </ImageWrapper>
      </TopImageGrid>
      <ImageGrid>
        <ImageWrapper>
          <Image src="https://i.ibb.co/hBh3kf7/DALL-E-2024-08-28-12-58-58-A-Minecraft-character-with-a-blocky-appearance-facing-directly-towards-th.png" alt="image 5" />
        </ImageWrapper>
        <ImageWrapper>
          <Image src="https://i.ibb.co/hBh3kf7/DALL-E-2024-08-28-12-58-58-A-Minecraft-character-with-a-blocky-appearance-facing-directly-towards-th.png" alt="image 6" />
        </ImageWrapper>
        <ImageWrapper>
          <Image src="https://i.ibb.co/hBh3kf7/DALL-E-2024-08-28-12-58-58-A-Minecraft-character-with-a-blocky-appearance-facing-directly-towards-th.png" alt="image 7" />
        </ImageWrapper>
        <ImageWrapper>
          <Image src="https://i.ibb.co/hBh3kf7/DALL-E-2024-08-28-12-58-58-A-Minecraft-character-with-a-blocky-appearance-facing-directly-towards-th.png" alt="image 8" />
        </ImageWrapper>
      </ImageGrid>
    </Container>
  );
};

export default PluginList;
