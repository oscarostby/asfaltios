import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { motion } from 'framer-motion';
import Header from '../components/header';
import Footer from "../components/footer";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;700&display=swap');

  body {
    margin: 0;
    padding: 0;
    font-family: 'Exo 2', sans-serif;
    background: #f5f7fa;
    color: #000000;
    overflow-x: hidden;

    * {
      box-sizing: border-box;
    }

    ::-webkit-scrollbar {
      width: 10px;
    }

    ::-webkit-scrollbar-track {
      background: #e0e0e0;
    }

    ::-webkit-scrollbar-thumb {
      background: #a0a0a0;
      border-radius: 5px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #888;
    }
  }
`;

const PageContainer = styled.div`
  min-height: 100vh;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  padding-top: 150px;
  text-align: center;
`;

const SectionWrapper = styled.section`
  padding: 4rem 2rem;
  text-align: center;
`;

const SectionTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 2rem;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  gap: 1rem;
`;

const FilterButton = styled.button`
  padding: 0.8rem 2rem;
  border: 2px solid #333;
  background-color: ${props => (props.active ? '#333' : 'white')};
  color: ${props => (props.active ? 'white' : '#333')};
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #333;
    color: white;
  }
`;

const PluginGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 plugins in a row */
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr); /* Fallback for smaller screens */
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr); /* Fallback for mobile */
  }
`;

const PluginCard = styled(motion.div)`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
`;

const PluginImage = styled.img`
  width: 80%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 1.5rem;
`;

const PluginTitle = styled.h3`
  font-size: 1.8rem;
  color: #000;
  margin-bottom: 0.5rem;
`;

const PluginDescription = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 1.5rem;
`;

const PluginStats = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 0.9rem;
  color: #777;
  padding: 0.5rem 0;
`;

const Badge = styled.span`
  background-color: ${props => props.bgColor || '#333'};
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 15px;
  font-size: 0.9rem;
`;

const PluginsList = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const plugins = [
    { 
      title: "Bakteria Staff Plugin", 
      description: "Moderation plugin for Minecraft.", 
      image: 'https://www.spigotmc.org/data/resource_icons/117/117394.jpg', 
      url: 'https://www.spigotmc.org/resources/bakteria-staff-moderation-plugin-1-8-1-21.117394/', 
      downloads: '277', 
      rating: '5.0', 
      category: 'Moderation' 
    },
    { 
      title: "Simple Gold Plugin", 
      description: "Economy plugin for Minecraft.", 
      image: 'https://www.spigotmc.org/data/resource_icons/115/115987.jpg', 
      url: 'https://www.spigotmc.org/resources/simple-gold-1-20-1-21-vault-towny.115987/', 
      downloads: '368', 
      rating: '5.0', 
      category: 'Economy' 
    },
    { 
      title: "Grief Prevention Plugin", 
      description: "Prevent griefing.", 
      image: 'https://example.com/plugin-image.png', 
      downloads: '1.5K', 
      rating: '5.0', 
      category: 'Protection' 
    },
    { 
      title: "DDoS Protection Plugin", 
      description: "Protect from DDoS attacks.", 
      image: 'https://example.com/plugin-image.png', 
      downloads: '2K', 
      rating: '4.9', 
      category: 'Protection' 
    }
  ];

  const filters = ['All', 'Moderation', 'Economy', 'Protection'];

  const filteredPlugins = activeFilter === 'All' ? plugins : plugins.filter(plugin => plugin.category === activeFilter);

  return (
    <>
      <GlobalStyle />
      <PageContainer>
        <Header />
        <ContentWrapper>

          <SectionWrapper>
            <SectionTitle>Our Plugins</SectionTitle>

            {/* Filter Buttons */}
            <FilterContainer>
              {filters.map((filter, index) => (
                <FilterButton
                  key={index}
                  active={filter === activeFilter}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </FilterButton>
              ))}
            </FilterContainer>

            {/* Plugin Grid */}
            <PluginGrid>
              {filteredPlugins.map((plugin, index) => (
                <PluginCard
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <a href={plugin.url} target="_blank" rel="noopener noreferrer">
                    <PluginImage src={plugin.image} alt={plugin.title} />
                  </a>
                  <PluginTitle>{plugin.title}</PluginTitle>
                  <PluginDescription>{plugin.description}</PluginDescription>

                  <PluginStats>
                    <span>Downloads: {plugin.downloads}</span>
                    <span>Rating: {plugin.rating}</span>
                  </PluginStats>

                  <Badge bgColor={plugin.category === 'Moderation' ? '#2D87F0' : '#E67E22'}>{plugin.category}</Badge>
                </PluginCard>
              ))}
            </PluginGrid>

          </SectionWrapper>

        </ContentWrapper>
        <Footer />
      </PageContainer>
    </>
  );
};

export default PluginsList;
