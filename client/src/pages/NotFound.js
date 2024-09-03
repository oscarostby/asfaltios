// src/pages/NotFound.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import logo from '../bilder/imgrem.png';

const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
    margin: 0;
    padding: 0;
    background-color: #ffffff;
    color: #333333;
    font-family: 'Roboto', sans-serif;
  }
`;

const float = keyframes`
  0% {
    transform: translatey(0px);
  }
  50% {
    transform: translatey(-10px);
  }
  100% {
    transform: translatey(0px);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;

const Logo = styled.img`
  width: 120px;
  margin-bottom: 2rem;
  animation: ${float} 3s ease-in-out infinite;
`;

const Title = styled.h1`
  font-size: 6rem;
  font-weight: bold;
  color: #333333;
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  color: #555555;
  margin-bottom: 2rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #ffffff;
  background-color: #007bff;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: #0056b3;
  }
`;

const ParticleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
`;

const Particle = styled.div`
  position: absolute;
  background-color: rgba(0, 123, 255, 0.2);
  border-radius: 50%;
  pointer-events: none;
`;

function NotFound() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const particleCount = 100;
    const newParticles = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 5 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
      });
    }

    setParticles(newParticles);

    const animateParticles = () => {
      setParticles((prevParticles) =>
        prevParticles.map((p) => ({
          ...p,
          x: (p.x + p.speedX + window.innerWidth) % window.innerWidth,
          y: (p.y + p.speedY + window.innerHeight) % window.innerHeight,
        }))
      );
      requestAnimationFrame(animateParticles);
    };

    const animationId = requestAnimationFrame(animateParticles);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <>
      <GlobalStyle />
      <Container>
        <Logo src={logo} alt="Logo" />
        <Title>404</Title>
        <Subtitle>Oops! The page you're looking for doesn't exist.</Subtitle>
        <StyledLink to="/">Return to Home</StyledLink>
        <ParticleContainer>
          {particles.map((p) => (
            <Particle
              key={p.id}
              style={{
                left: `${p.x}px`,
                top: `${p.y}px`,
                width: `${p.size}px`,
                height: `${p.size}px`,
              }}
            />
          ))}
        </ParticleContainer>
      </Container>
    </>
  );
}

export default NotFound;