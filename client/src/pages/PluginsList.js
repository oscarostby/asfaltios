import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import HeaderComponent from '../components/header';
import Plugin1 from '../components/plugin1';
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
  flex-direction: column; // Keeps the Plugin1 stacked
  align-items: flex-start; // Align Plugin1 to the start (left)
  margin-left: 150px;
`;

// App component that includes the Header, Plugin1, and the new Text component as a heading
function App() {
  return (
    <MainContainer>
      <Text />  
      <ContentSection>
        <PluginSection>
          <Plugin1 />
        </PluginSection>
        <HeaderComponent />
      </ContentSection>
    </MainContainer>
  );
}

export default App;
