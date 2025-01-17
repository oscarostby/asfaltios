import React from 'react';
import styled from 'styled-components';

const MainContent = styled.main`
  padding-top: 60px;
`;

const DevelopmentMessage = styled.h2`
  color: #000;
  font-size: 2rem;
  text-align: center;
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
`;

function Main() {
  return (
    <MainContent>
      <DevelopmentMessage>This website is under development.</DevelopmentMessage>
    </MainContent>
  );
}

export default Main;

