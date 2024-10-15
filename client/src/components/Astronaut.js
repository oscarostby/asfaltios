// src/components/Astronaut.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';

// Styled Components for Astronaut parts

const AstronautContainer = styled(motion.div)`
  width: 250px;
  height: 300px;
  position: absolute;
  z-index: 11;
`;

const Schoolbag = styled.div`
  width: 100px;
  height: 150px;
  position: absolute;
  z-index: 1;
  top: calc(50% - 75px);
  left: calc(50% - 50px);
  background-color: #94b7ca;
  border-radius: 50px 50px 0 0 / 30px 30px 0 0;
`;

const Head = styled.div`
  width: 97px;
  height: 80px;
  position: absolute;
  z-index: 3;
  background: linear-gradient(to left, #e3e8eb 0%, #e3e8eb 50%, #fbfdfa 50%, #fbfdfa 100%);
  border-radius: 50%;
  top: 34px;
  left: calc(50% - 47.5px);
  
  &:after {
    content: "";
    width: 60px;
    height: 50px;
    position: absolute;
    top: calc(50% - 25px);
    left: calc(50% - 30px);
    background: linear-gradient(to top, #15aece 0%, #15aece 50%, #0391bf 50%, #0391bf 100%);
    border-radius: 15px;
  }

  &:before {
    content: "";
    width: 12px;
    height: 25px;
    position: absolute;
    top: calc(50% - 12.5px);
    left: -4px;
    background-color: #618095;
    border-radius: 5px;
    box-shadow: 92px 0px 0px #618095;
  }
`;

const Body = styled.div`
  width: 85px;
  height: 100px;
  position: absolute;
  z-index: 2;
  background-color: #fffbff;
  border-radius: 40px / 20px;
  top: 105px;
  left: calc(50% - 41px);
  background: linear-gradient(to left, #e3e8eb 0%, #e3e8eb 50%, #fbfdfa 50%, #fbfdfa 100%);
`;

const Panel = styled.div`
  width: 60px;
  height: 40px;
  position: absolute;
  top: 20px;
  left: calc(50% - 30px);
  background-color: #b7cceb;
  
  &:before {
    content: "";
    width: 30px;
    height: 5px;
    position: absolute;
    top: 9px;
    left: 7px;
    background-color: #fbfdfa;
    box-shadow: 0px 9px 0px #fbfdfa, 0px 18px 0px #fbfdfa;
  }
  
  &:after {
    content: "";
    width: 8px;
    height: 8px;
    position: absolute;
    top: 9px;
    right: 7px;
    background-color: #fbfdfa;
    border-radius: 50%;
    box-shadow: 0px 14px 0px 2px #fbfdfa;
  }
`;

const Arm = styled.div`
  width: 80px;
  height: 30px;
  position: absolute;
  top: 121px;
  z-index: 2;
`;

const ArmLeft = styled(Arm)`
  left: 30px;
  background-color: #e3e8eb;
  border-radius: 0 0 0 39px;
  
  &:before {
    content: "";
    width: 30px;
    height: 70px;
    position: absolute;
    top: -40px;
    border-radius: 50px 50px 0px 120px / 50px 50px 0 110px;
    left: 0;
    background-color: #e3e8eb;
  }
  
  &:after {
    content: "";
    width: 30px;
    height: 10px;
    position: absolute;
    top: -24px;
    background-color: #6e91a4;
    left: 0;
  }
`;

const ArmRight = styled(Arm)`
  right: 30px;
  background-color: #fbfdfa;
  border-radius: 0 0 39px 0;
  
  &:before {
    content: "";
    width: 30px;
    height: 70px;
    position: absolute;
    top: -40px;
    border-radius: 50px 50px 120px 0 / 50px 50px 110px 0;
    right: 0;
    background-color: #fbfdfa;
  }
  
  &:after {
    content: "";
    width: 30px;
    height: 10px;
    position: absolute;
    top: -24px;
    right: 0;
    background-color: #b6d2e0;
  }
`;

const Leg = styled.div`
  width: 30px;
  height: 40px;
  position: absolute;
  z-index: 2;
  bottom: 70px;
`;

const LegLeft = styled(Leg)`
  left: 76px;
  background-color: #e3e8eb;
  transform: rotate(20deg);
  
  &:before {
    content: "";
    width: 50px;
    height: 25px;
    position: absolute;
    bottom: -26px;
    left: -20px;
    background-color: #e3e8eb;
    border-radius: 30px 0 0 0;
    border-bottom: 10px solid #6d96ac;
  }
`;

const LegRight = styled(Leg)`
  right: 73px;
  background-color: #fbfdfa;
  transform: rotate(-20deg);
  
  &:before {
    content: "";
    width: 50px;
    height: 25px;
    position: absolute;
    bottom: -26px;
    right: -20px;
    background-color: #fbfdfa;
    border-radius: 0 30px 0 0;
    border-bottom: 10px solid #b0cfe4;
  }
`;

// Utility function to generate random positions
const getRandomPosition = (isOutside) => {
  const padding = 300; // Padding to allow astronaut to move off-screen
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  let x, y;

  if (isOutside) {
    // Generate position outside the viewport
    const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
    switch (side) {
      case 0: // Top
        x = Math.random() * screenWidth;
        y = -padding;
        break;
      case 1: // Right
        x = screenWidth + padding;
        y = Math.random() * screenHeight;
        break;
      case 2: // Bottom
        x = Math.random() * screenWidth;
        y = screenHeight + padding;
        break;
      case 3: // Left
        x = -padding;
        y = Math.random() * screenHeight;
        break;
      default:
        x = 0;
        y = 0;
    }
  } else {
    // Generate position inside the viewport
    x = Math.random() * screenWidth;
    y = Math.random() * screenHeight;
  }

  return { x, y };
};

// Utility function to calculate rotation angle based on movement direction
const calculateRotation = (from, to) => {
  const deltaX = to.x - from.x;
  const deltaY = to.y - from.y;
  const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
  return angle;
};

const Astronaut = () => {
  const controls = useAnimation();
  const [isOutside, setIsOutside] = useState(true); // Start outside
  const [position, setPosition] = useState(getRandomPosition(true));

  useEffect(() => {
    const moveAstronaut = async () => {
      while (true) {
        // Determine next movement
        const nextIsOutside = !isOutside; // Alternate between inside and outside
        const nextPosition = getRandomPosition(nextIsOutside);

        // Calculate rotation based on movement direction
        const rotation = calculateRotation(position, nextPosition);

        // Randomize duration only when starting from outside
        const duration = nextIsOutside
          ? 15 + Math.random() * 10 // 15s to 25s
          : 10 + Math.random() * 5; // 10s to 15s

        // Start animation
        await controls.start({
          x: nextPosition.x - window.innerWidth / 2, // Centering the position
          y: nextPosition.y - window.innerHeight / 2,
          rotate: rotation,
          transition: {
            duration: duration,
            ease: 'easeInOut',
          },
        });

        // Update state
        setIsOutside(nextIsOutside);
        setPosition(nextPosition);
      }
    };

    moveAstronaut();
  }, [controls, isOutside, position]);

  return (
    <AstronautContainer
      animate={controls}
      initial={{
        x: position.x - window.innerWidth / 2,
        y: position.y - window.innerHeight / 2,
        rotate: 0,
      }}
      aria-label="Floating Astronaut"
    >
      <Head />
      <ArmLeft />
      <ArmRight />
      <Body>
        <Panel />
      </Body>
      <LegLeft />
      <LegRight />
      <Schoolbag />
    </AstronautContainer>
  );
};

export default Astronaut;
