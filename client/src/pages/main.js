import React from 'react';
import Header from '../components/header';
import styled from 'styled-components';

const PageWrapper = styled.div`
  background-color: #070F2B;
  min-height: 100vh; /* Ensure the wrapper takes up at least the full height of the viewport */
  padding-top: 140px; /* Add padding top to compensate for the fixed header height */
`;

const Container = styled.div`
  color: white;
  text-align: center;
  padding: 20px;
`;

const Text = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

const App = () => {
  return (
    <PageWrapper>
      <Header />
      <Container>
        <Text>This is the text under the header.</Text>
      </Container>
    </PageWrapper>
  );
}

export default App;
