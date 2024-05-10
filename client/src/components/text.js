import React from 'react';
import styled, { keyframes } from 'styled-components';

const shineAnimation = keyframes`
  0% {
    background-position: 0;
  }
  60% {
    background-position: 600px;
  }
  100% {
    background-position: 600px;
  }
`;

const TextContainer = styled.h1`
  color: hsl(0, 0%, 28%);
  font-size: 50px !important;
  font-weight: bold !important;
  font-family: monospace;
  letter-spacing: 7px !important;
  cursor: pointer;
  text-transform: uppercase;
  padding: 64px;
  background: linear-gradient(to right, hsl(0, 0%, 30%) 0, hsl(0, 0%, 100%) 10%, hsl(0, 0%, 30%) 20%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-top: 200px;
  animation: ${shineAnimation} 3s infinite linear;
`;

const Text = () => {
  return <TextContainer>Top Plugins</TextContainer>;
};

export default Text;