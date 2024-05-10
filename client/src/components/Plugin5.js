import React from 'react';
import styled, { keyframes } from 'styled-components';
import logoBilde from '../bilder/logo.png';
import Button from '../components/button';

// Animations for quotation marks
const openQuotes = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.2);
  }
`;

// Keyframes for scaling and shadow on hover
const scaleAndShadow = keyframes`
  0% {
    transform: scale(1);
    box-shadow: none;
  }
  100% {
    transform: scale(1.05);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }
`;

// StyledForm with animations and image style
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 250px;
  min-height: 300px;
  padding: 20px;
  position: relative;
  font-size: 1em;
  color: #000;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s; // Smooth transition for transforms and shadows

  img {
    width: 50%;
    height: auto;
  }

  &:hover {
    animation: ${scaleAndShadow} 0.5s ease-out forwards;
  }

  &::before, &::after {
    font-size: 4em;
    font-weight: bold;
    color: black;
    position: absolute;
    animation: ${openQuotes} 1s ease-in-out forwards;
  }

  &::before {
    content: '「';
    left: -5px;
    top: 30px;
  }

  &::after {
    content: '」';
    right: -15px;
    bottom: 10px;
  }
`;

class Plugin5 extends React.Component {
  render() {
    return (
      <StyledForm>
        <img src={logoBilde} alt="Logo Image" />
        <h1>Coming</h1>
        <p>Coming soon</p>
        <Button />  {/* Here the Button component is added */}
      </StyledForm>
    );
  }
}

export default Plugin5;
