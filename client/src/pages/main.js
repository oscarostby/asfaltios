import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaShieldAlt, FaLock, FaUserShield, FaServer, FaChevronDown, FaChevronUp, FaDiscord, FaGithub } from 'react-icons/fa';
import Header from '../components/header';
import Footer from "../components/footer";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;700&display=swap');

  body {
    margin: 0;
    padding: 0;
    font-family: 'Exo 2', sans-serif;
    background: #0a0b1e;
    color: #ffffff;
    overflow-x: hidden;
  }
`;

const starTwinkle = keyframes`
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
`;

const nebulaPulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.1); opacity: 0.7; }
`;

const PageContainer = styled.div`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

const SpaceBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  z-index: -1;
`;

const Star = styled.div`
  position: absolute;
  background: #ffffff;
  border-radius: 50%;
  animation: ${starTwinkle} ${props => props.duration}s ease-in-out infinite;
`;

const Nebula = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(30px);
  animation: ${nebulaPulse} 10s ease-in-out infinite;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const HeroSection = styled(motion.section)`
  min-height: 95vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  background: rgba(10, 11, 30, 0.7);
  backdrop-filter: blur(10px);
`;

const HeroTitle = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #7b68ee;
  text-shadow: 0 0 20px rgba(123, 104, 238, 0.5);

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 600px;
  color: #b8c7e0;
`;

const SearchBar = styled(motion.form)`
  display: flex;
  width: 100%;
  max-width: 600px;
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  flex-grow: 1;
  padding: 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 50px 0 0 50px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  outline: none;
  transition: background-color 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const SearchButton = styled.button`
  background-color: #7b68ee;
  color: white;
  border: none;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 0 50px 50px 0;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #6a5acd;
  }
`;

const PluginButton = styled(motion.button)`
  background-color: transparent;
  color: #7b68ee;
  border: 2px solid #7b68ee;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 50px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #7b68ee;
    color: white;
  }
`;

const FeaturedSection = styled(motion.section)`
  padding: 5rem 2rem;
  background-color: rgba(10, 11, 30, 0.8);
  min-height: 40vh;
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  color: #7b68ee;
`;

const CategoryGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const CategoryCard = styled(motion.div)`
  background-color: rgba(123, 104, 238, 0.1);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(123, 104, 238, 0.3);
  }
`;

const IconWrapper = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #7b68ee;
`;

const ScrollButton = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background-color: rgba(123, 104, 238, 0.8);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  z-index: 1000;

  &:hover {
    background-color: #7b68ee;
  }
`;

const RocketIcon = styled(motion.div)`
  font-size: 1.5rem;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const SocialIcons = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 2rem;
  font-size: 1.5rem;

  a {
    color: #7b68ee;
    transition: color 0.3s ease;

    &:hover {
      color: white; /* Hover effect with blue accent color */
      transform: scale(1.1); /* Slight scale effect on hover */
      
    }
  }
`;
const MotionSocialIcon = styled(motion.div)`
  color: #7b68ee;
  transition: color 0.3s ease;
  
  &:hover {
    color: white; /* Hover effect with blue accent color */
    transform: scale(1.1); /* Slight scale effect on hover */
  }
`;

const MinecraftSecurityPluginHomepage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  const handleExploreClick = () => {
    window.location.href = '/plugins';
  };

  const createStars = () => {
    const stars = [];
    for (let i = 0; i < 200; i++) {
      const size = Math.random() * 2;
      stars.push(
        <Star
          key={i}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          duration={Math.random() * 5 + 3}
        />
      );
    }
    return stars;
  };

  const createNebulas = () => {
    const nebulas = [
      { color: '#ff6b6b', top: '10%', left: '5%', size: '300px' },
      { color: '#4ecdc4', top: '60%', right: '10%', size: '250px' },
      { color: '#45b7d1', bottom: '15%', left: '15%', size: '200px' },
    ];

    return nebulas.map((nebula, index) => (
      <Nebula
        key={index}
        style={{
          backgroundColor: nebula.color,
          top: nebula.top,
          left: nebula.left,
          right: nebula.right,
          bottom: nebula.bottom,
          width: nebula.size,
          height: nebula.size,
        }}
      />
    ));
  };

  const socialIconVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  

  return (
    <>
      <GlobalStyle />
      <PageContainer>
        <SpaceBackground>
          {createStars()}
          {createNebulas()}
        </SpaceBackground>
        <Header />
        <ContentWrapper>
          <HeroSection
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <HeroTitle
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Minecraft Security Hub
            </HeroTitle>
            <HeroSubtitle
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Protect your Minecraft server with cutting-edge security plugins. 
              Safeguard your world, players, and data.
            </HeroSubtitle>
            <SearchBar
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              onSubmit={handleSearch}
            >
              <SearchInput 
                type="text" 
                placeholder="Search for security plugins..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchButton type="submit"><FaSearch /></SearchButton>
            </SearchBar>
            <PluginButton
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExploreClick}
            >
              Explore Our Plugins
            </PluginButton>
            <SocialIcons>
              <MotionSocialIcon
                variants={socialIconVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.6, delay: 1.5 }}
              >
                <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
                  <FaDiscord />
                </a>
              </MotionSocialIcon>
              <MotionSocialIcon
                variants={socialIconVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.6, delay: 1.8 }}
              >
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <FaGithub />
                </a>
              </MotionSocialIcon>
            </SocialIcons>
          </HeroSection>

          <FeaturedSection
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <SectionTitle
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Security Solutions
            </SectionTitle>
            <CategoryGrid>
              {[
                { icon: <FaShieldAlt />, title: "Anti-Cheat", description: "Detect and prevent cheating on your server" },
                { icon: <FaLock />, title: "Authentication", description: "Secure login and player verification systems" },
                { icon: <FaUserShield />, title: "Grief Prevention", description: "Protect builds and prevent unwanted modifications" },
                { icon: <FaServer />, title: "DDoS Protection", description: "Shield your server from malicious attacks" },
              ].map((category, index) => (
                <CategoryCard
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconWrapper>{category.icon}</IconWrapper>
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                </CategoryCard>
              ))}
            </CategoryGrid>
          </FeaturedSection>
        </ContentWrapper>
        <AnimatePresence>
          <ScrollButton
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToSection}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <RocketIcon
              animate={{ rotate: isScrolled ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {isScrolled ? <FaChevronUp /> : <FaChevronDown />}
            </RocketIcon>
          </ScrollButton>
        </AnimatePresence>
        <Footer />
      </PageContainer>
    </>
  );
};

export default MinecraftSecurityPluginHomepage;
