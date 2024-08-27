import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaSearch, FaShieldAlt, FaLock, FaUserShield, FaServer, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Header from '../components/header';
import Footer from "../components/footer";

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const PageContainer = styled.div`
  font-family: 'Minecraft', sans-serif;
  color: #ffffff;
  min-height: 100vh;
  background-color: #1e2327;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(to right, #2c3e50 1px, transparent 1px),
      linear-gradient(to bottom, #2c3e50 1px, transparent 1px);
    background-size: 20px 20px;
    opacity: 0.2;
  }
`;

const FloatingCube = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: rgba(100, 149, 237, 0.3);
  animation: ${float} 6s ease-in-out infinite;
  box-shadow: 0 0 20px rgba(100, 149, 237, 0.5);
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;

`;

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 80px 20px 0;
  background: rgba(44, 62, 80, 0.6);

  @media (max-width: 768px) {
    padding: 30px 20px 0; /* Move the section content up by reducing top padding */
  }
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
  color: #6495ED;
  text-shadow: 0 0 10px rgba(100, 149, 237, 0.5);
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 600px;
  color: #ecf0f1;
`;

const SearchBar = styled.form`
  display: flex;
  width: 100%;
  max-width: 600px;
  margin-bottom: 1rem;
`;

const SearchInput = styled.input`
  flex-grow: 1;
  padding: 15px;
  font-size: 1rem;
  border: 2px solid #6495ED;
  border-radius: 5px 0 0 5px;
  background-color: rgba(44, 62, 80, 0.8);
  color: #ecf0f1;

  &::placeholder {
    color: #bdc3c7;
  }
`;

const SearchButton = styled.button`
  background-color: #6495ED;
  color: white;
  border: none;
  padding: 15px 25px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 0 5px 5px 0;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4169E1;
  }
`;

const PluginButton = styled.button`
  background-color: transparent;
  color: #6495ED;
  border: 2px solid #6495ED;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background-color: #6495ED;
    color: white;
  }
`;

const FeaturedSection = styled.section`
  padding: 100px 0;
  background-color: rgba(44, 62, 80, 0.8);
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 50px;
  font-size: 2.5rem;
  color: #6495ED;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const CategoryCard = styled.div`
  background-color: rgba(52, 73, 94, 0.8);
  border-radius: 10px;
  padding: 30px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(100, 149, 237, 0.3);
  }
`;

const IconWrapper = styled.div`
  font-size: 3rem;
  margin-bottom: 20px;
  color: #6495ED;
`;

const ScrollIndicator = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: rgba(100, 149, 237, 0.8);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  z-index: 2000;

  &:hover {
    background-color: rgba(100, 149, 237, 1);
  }

  svg {
    transition: transform 0.3s ease;
  }
`;

const MinecraftSecurityPluginHomepage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const createFloatingCube = () => {
      const cube = document.createElement('div');
      cube.className = FloatingCube.styledComponentId;
      cube.style.left = `${Math.random() * 100}vw`;
      cube.style.top = `${Math.random() * 100}vh`;
      cube.style.animationDelay = `${Math.random() * 5}s`;
      document.body.appendChild(cube);

      setTimeout(() => {
        document.body.removeChild(cube);
      }, 10000);
    };

    const interval = setInterval(createFloatingCube, 2000);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight / 2);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = () => {
    if (isScrolled) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/plugins/${encodeURIComponent(searchTerm.trim())}`;
    }
  };

  const navigateToPlugins = () => {
    window.location.href = '/plugins';
  };

  return (
    <PageContainer>
      <Header />
      <ContentWrapper>
        <HeroSection>
          <HeroTitle>Minecraft Security Hub</HeroTitle>
          <HeroSubtitle>
            Protect your Minecraft server with cutting-edge security plugins. 
            Safeguard your world, players, and data.
          </HeroSubtitle>
          <SearchBar onSubmit={handleSearch}>
            <SearchInput 
              type="text" 
              placeholder="Search for security plugins..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchButton type="submit"><FaSearch /></SearchButton>
          </SearchBar>
          <PluginButton onClick={navigateToPlugins}>Or look at our plugins here</PluginButton>
        </HeroSection>

        <FeaturedSection>
          <SectionTitle>Security Solutions</SectionTitle>
          <CategoryGrid>
            <CategoryCard>
              <IconWrapper><FaShieldAlt /></IconWrapper>
              <h3>Anti-Cheat</h3>
              <p>Detect and prevent cheating on your server</p>
            </CategoryCard>
            <CategoryCard>
              <IconWrapper><FaLock /></IconWrapper>
              <h3>Authentication</h3>
              <p>Secure login and player verification systems</p>
            </CategoryCard>
            <CategoryCard>
              <IconWrapper><FaUserShield /></IconWrapper>
              <h3>Grief Prevention</h3>
              <p>Protect builds and prevent unwanted modifications</p>
            </CategoryCard>
            <CategoryCard>
              <IconWrapper><FaServer /></IconWrapper>
              <h3>DDoS Protection</h3>
              <p>Shield your server from malicious attacks</p>
            </CategoryCard>
          </CategoryGrid>
        </FeaturedSection>
      </ContentWrapper>
      <ScrollIndicator onClick={scrollToSection}>
        {isScrolled ? <FaChevronUp /> : <FaChevronDown />}
      </ScrollIndicator>
      <Footer />
    </PageContainer>
  );
};

export default MinecraftSecurityPluginHomepage;