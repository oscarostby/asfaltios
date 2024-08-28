import React from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframes for the animations
const animStar = keyframes`
  from { transform: translateY(0px); }
  to { transform: translateY(-2000px); }
`;

const animGravity = keyframes`
  0% { transform: translateY(-26px); opacity: 0; }
  30%, 80% { letter-spacing: 40px; padding-left: 40px; transform: translateY(0px); opacity: 1; }
`;

const animDont = keyframes`
  0%, 15% { transform: translateY(-26px); opacity: 0; }
  35%, 80% { transform: translateY(0px); opacity: 1; }
`;

const animLet = keyframes`
  0%, 25% { transform: translateY(-26px); opacity: 0; }
  45%, 80% { transform: translateY(0px); opacity: 1; }
`;

const animGo = keyframes`
  0%, 35% { transform: translateY(-26px); opacity: 0; }
  55%, 80% { transform: translateY(0px); opacity: 1; }
`;

const animButton = keyframes`
  0%, 55% { transform: translateY(-26px); opacity: 0; }
  75%, 100% { transform: translateY(0px); opacity: 1; }
`;

// Styled components for the stars
const Stars = styled.div`
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow: ${props => props.shadows};
  animation: ${animStar} 50s linear infinite;

  &::after {
    content: " ";
    position: absolute;
    top: 2000px;
    width: 1px;
    height: 1px;
    background: transparent;
    box-shadow: ${props => props.shadows};
  }
`;

// Define other stars similarly
const Stars2 = styled(Stars)`
  width: 2px;
  height: 2px;
  animation-duration: 100s;
`;

const Stars3 = styled(Stars)`
  width: 3px;
  height: 3px;
  animation-duration: 150s;
`;

// Styled components for the horizon, earth, title, and subtitle
const Horizon = styled.div`
  position: absolute;
  width: 160%;
  height: 70%;
  border-radius: 100% / 100%;
  background: #038bff;
  filter: blur(30px);
  left: 50%;
  bottom: -20%;
  margin-left: -80%;

  &::before {
    content: " ";
    position: absolute;
    width: 81.25%;
    height: 70%;
    border-radius: 100% / 100%;
    background: #51AFFF;
    filter: blur(30px);
    opacity: 0.6;
    margin-left: 9.375%;
  }

  &::after {
    content: " ";
    position: absolute;
    width: 32%;
    height: 20%;
    border-radius: 650px / 350px;
    background: #B0DAFF;
    filter: blur(30px);
    opacity: 0.5;
    margin-left: 34%;
  }
`;

const Earth = styled.div`
  position: absolute;
  width: 200%;
  height: 100%;
  background: black;
  border-radius: 100% / 100%;
  left: 50%;
  bottom: -50%;
  margin-left: -100%;

  &::before {
    content: " ";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 100% / 100%;
    box-shadow: inset 0px 0px 62px 20px rgba(60,105,138,0.85);
  }

  &::after {
    content: " ";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 100% / 100%;
    background: linear-gradient(to right, #000, #000);
  }
`;

const Title = styled.div`
  position: absolute;
  font-weight: 300;
  top: 36%;
  left: 0;
  right: 0;
  margin-top: -80px;
  font-size: 130px;
  text-align: center;
  letter-spacing: 20px;
  padding-left: 20px;
  background: linear-gradient(white, rgb(219, 221, 224), #38495a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${animGravity} 6s ease forwards;
`;

const Subtitle = styled.div`
  position: absolute;
  font-weight: 300;
  top: 70%;
  left: 0;
  right: 0;
  font-size: 25px;
  text-align: center;
  letter-spacing: 6px;

  span {
    color: rgb(216, 216, 216);
    animation-duration: 6s;
    animation-fill-mode: forwards; // Ensure it stays after animation
    animation-timing-function: ease;
    letter-spacing: 10px; // Increased letter spacing for more separation
    margin: 0 20px; // Added margin between words

    &:nth-child(1) {
      animation-name: ${animDont};
    }

    &:nth-child(2) {
      animation-name: ${animLet};
    }

    &:nth-child(3) {
      animation-name: ${animGo};
    }
  }
`;

const Button = styled.button`
  width: 10em;
  height: 2em;
  text-align: center;
  font-family: poppins;
  font-size: 17px;
  font-weight: 300;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: #fff;
  cursor: pointer;
  background-color: rgba(3, 3, 3, 0.5);
  border: none;
  transition: color 0.2s linear,
        box-shadow 0.3s linear,
        background-color 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  opacity: 0; /* Start hidden */
  animation: ${animButton} 6s ease forwards; /* Apply the animation */
  animation-delay: 6s; /* Delay to appear after the subtitle */

  &:focus,
  &:hover {
    box-shadow: 0 0 110px #fff;
    background-color: rgba(255, 255, 255, 0.4);
    color: #111;
    font-weight: 500;
  }

  &:focus:before,
  &:hover:before,
  &:focus:after,
  &:hover:after {
    width: 100%;
    left: 0%;
  }

  &:before,
  &:after {
    content: '';
    position: absolute;
    pointer-events: none;
    left: 50%;
    width: 0%;
    height: 2px;
    background-color: #fff;
    transition: width, left, 250ms cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  &:before {
    top: -2px;
  }

  &:after {
    bottom: -2px;
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 100px; /* Position the button higher */
  left: 50%;
  transform: translateX(-50%);
  width: auto; /* Adjusted to let the button define its own width */
`;

const Background = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  font-family: 'Lato', sans-serif;
  color: #FFF;
  background: radial-gradient(ellipse at bottom, #0C1116 0%, #090a0f 100%);
`;

const App = () => {
    const generateShadows = (n) => {
      let shadows = [];
      for (let i = 0; i < n; i++) {
        shadows.push(`${Math.random() * 2000}px ${Math.random() * 2000}px #FFF`);
      }
      return shadows.join(', ');
    };
  
    // Function to handle the button click
    const handleButtonClick = () => {
      window.location.href = 'https://www.spigotmc.org/resources/bakteria-staff-moderation-plugin-1-8-1-21.117394/'; // Bytt til en bra bukgrunn fordi jeg finner ingen
    };
  
    return (
      <Background>
        <Stars shadows={generateShadows(700)} />
        <Stars2 shadows={generateShadows(200)} />
        <Stars3 shadows={generateShadows(100)} />
        <Horizon>
          <div className="glow"></div>
        </Horizon>
        <Earth />
        <Title>BAKTERIA</Title>
        <Subtitle>
          <span>Staff</span>
          <span>Moderation</span>
          <span>Plugin</span>
        </Subtitle>
        <ButtonContainer>
          <Button onClick={handleButtonClick}>Download</Button>
        </ButtonContainer>
      </Background>
    );
  };
  
  export default App;
