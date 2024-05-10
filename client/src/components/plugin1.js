import React from 'react';
import styled, { keyframes } from 'styled-components';
import logoBilde from '../bilder/logo.png'; // Sørger for at bildet importeres korrekt

// Definerer animasjoner for anførselstegnene
const openQuotes = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.2);  // En liten økning i skala for visuell effekt
  }
`;

// Oppdatert StyledForm med animasjoner og bildestil
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

  img {
    width: 50%;  // Reduserer bredden på bildet til 50% av formbredden
    height: auto; // Bevarer bildets aspektratio
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
    bottom: 20px;
  }
`;

class Plugin1 extends React.Component {
  render() {
    return (
      <StyledForm>
        <img src={logoBilde} alt="Descriptive Text" />
        <h1>FireWall</h1>
        <p>Your protection</p>
      </StyledForm>
    );
  }
}

export default Plugin1;
