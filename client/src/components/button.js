import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.a`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 50px;
  background: #fff;
  border-radius: 999px;
  cursor: pointer;

  &:hover {
    animation: burn 1000ms ease-out forwards;

    &::before, &::after {
      content: '';
      position: absolute;
      width: 100px;
      height: 40px;
      background: rgba(255, 230, 110, 1);
      border-radius: 100%;
      animation: flare 1000ms ease-out forwards;
    }

    &::before {
      left: 40px;
    }

    &::after {
      right: 40px;
    }
  }

  @keyframes flare {
    100% {
      transform: translateY(-20px) scale(1.5);
      filter: blur(10px);
      opacity: 0;
    }
  }

  @keyframes burn {
    0% {
      color: rgba(255, 130, 110, 1);
      background: rgba(255, 230, 110, 1);
      box-shadow: 0 0 5px 0 rgba(200, 0, 10, 1), 0 0 5px 0 rgba(230, 30, 10, 0.8), 0 0 5px 0 rgba(230, 230, 10, 0.6);
    }
    100% {
      color: rgba(0, 0, 0, 1);
      background: rgba(255, 255, 255, 1);
      box-shadow: 0 -35px 40px 30px rgba(255, 130, 10, 0), 0 -30px 30px 10px rgba(230, 30, 10, 0), 0 -20px 10px 0 rgba(255, 255, 10, 0);
    }
  }
`;

const Button = () => (
  <StyledButton>
    Kontakt
  </StyledButton>
);

export default Button;
