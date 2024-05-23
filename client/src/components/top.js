import React from 'react';
import styled from 'styled-components';

// Styled component for overskriften
const Heading = styled.h1`
  text-align: center;
  border: 3px solid white;
  padding: 20px;
  box-sizing: border-box;
  margin: 20px;
  color: black;
  background-color: transparent;
  border: 15px solid black; /* Gjør rammen tykkere */
  margin-top: 200px;

`;

// Styled component for sponsorbilder
const SponsorImage = styled.img`
  width: 150px;
  height: auto;
  margin: 10px;
`;

// Container for sponsorbilder
const SponsorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  
`;

// Top-komponenten
const Top = () => {
  return (
    <div>
      <Heading>Asfaltios</Heading>
      <SponsorContainer>
        {/* Eksempelbilder av sponsorer, erstatt src med faktiske bilde-URLer */}
        <SponsorImage src="https://i.ibb.co/R71QW73/Firewall.png" alt="Sponsor 1" />
        <SponsorImage src="https://i.ibb.co/R71QW73/Firewall.png" alt="Sponsor 2" />
        <SponsorImage src="https://i.ibb.co/R71QW73/Firewall.png" alt="Sponsor 3" />
        <SponsorImage src="https://i.ibb.co/R71QW73/Firewall.png" alt="Sponsor 4" />
        <SponsorImage src="https://i.ibb.co/R71QW73/Firewall.png" alt="Sponsor 5" />
      </SponsorContainer>
    </div>
  );
};

export default Top;