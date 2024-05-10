import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import HeaderComponent from '../components/header';
import Plugin1 from '../components/plugin1';
import Plugin2 from '../components/Plugin2';
import Plugin3 from '../components/Plugin3';
import Plugin4 from '../components/Plugin4';
import Plugin5 from '../components/Plugin5';

import Text from '../components/text';  // Assuming Text.js is in the same directory

// Styling for the main container that holds the entire page
const MainContainer = styled.div`
  display: flex;
  flex-direction: column; // Stack elements vertically
  align-items: center; // Center align children in the cross axis
  min-height: 100vh;
  width: 100%; // Ensure full width
`;

// Styling for the header and plugin sections
const ContentSection = styled.div`
  display: flex;
  width: 100%; // Take full width
  justify-content: space-between; // Distribute children to start and end
`;

// Styling for the plugin section that contains the Plugin1
const PluginSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 150px;
  & > *:not(:last-child) {  // Adds margin-right to all children except the last one
    margin-right: 190px; // Adjust this value as needed for spacing
  }
`;


// Styled component for adding margin around Plugin1
const PluginWrapper = styled.div`
  margin-right: 20px; // Adjust this value as needed for spacing
`;

function App() {
  return (
    <MainContainer>
      <Text />  
      <ContentSection>
        <PluginSection>
          <PluginWrapper><Plugin1 /></PluginWrapper>
          <PluginWrapper><Plugin2 /></PluginWrapper>
          <PluginWrapper><Plugin3 /></PluginWrapper>
          <PluginWrapper><Plugin4 /></PluginWrapper>
          <PluginWrapper><Plugin5 /></PluginWrapper>

        </PluginSection>
        <HeaderComponent />
      </ContentSection>
    </MainContainer>
  );
}


export default App;
