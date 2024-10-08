import React, { useState, useEffect, useRef } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { motion, AnimatePresence, useViewportScroll, useTransform } from 'framer-motion';
import creeperImage from '../bilder/creeper.png';
import beeImage from '../bilder/bee.png';

import { 
  FaSearch, FaShieldAlt, FaLock, FaUserShield, FaServer, 
  FaChevronDown, FaChevronUp, FaDiscord, FaGithub, 
  FaDownload, FaStar, FaCode, FaUsers, FaQuestionCircle,
  FaBug, FaComments, FaNewspaper, FaAngleDown,
  FaArrowDown
} from 'react-icons/fa';
import Header from '../components/header';
import Footer from "../components/footer";
import ASPA from '../components/Aspa';
import ChatbotIframe from '../components/ChatbotIframe'; // Husk å justere stien om nødvendig


const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;700&display=swap');

  body {
    margin: 0;
    padding: 0;
    font-family: 'Exo 2', sans-serif;
    background: #ffffff; // White background
    color: #000000; // Black text
    overflow-x: hidden;

    * {
      box-sizing: border-box;
    }

    ::-webkit-scrollbar {
      width: 10px;
    }

    ::-webkit-scrollbar-track {
      background: #f0f0f0; // Light gray track
    }

    ::-webkit-scrollbar-thumb {
      background: #cccccc; // Gray thumb
      border-radius: 5px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #aaaaaa; // Darker gray on hover
    }
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

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const HeroSection = styled(motion.section)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 5rem 2rem;
  background: white;
  position: relative; // Add this to allow absolute positioning of the image
`;

const ChatbotSection = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 400px;
  height: 500px;
  border: 1px solid #ccc;
  background-color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
`;

const CreeperImage = styled.img`
  position: absolute;
  bottom: 10%;
  right: 10%;
  width: 13%; // Adjust the size as needed
  height: auto;
  @media (max-width: 768px) {
    display: none;
  }
`;
const BeeImage = styled.img`
  position: absolute;
  left: 5%;
  top: 22%;
  width: 13%; // Adjust the size as needed
  height: auto;
  @media (max-width: 768px) {
    display: none;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #000000; // Black text
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  margin: 0 auto 2rem;
  max-width: 600px;
  color: #333333; // Dark gray text
  line-height: 1.6;
  text-align: center;
`;

const SearchBar = styled(motion.form)`
  display: flex;
  width: 100%;
  max-width: 500px;
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  flex-grow: 1;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  border: 2px solid rgba(0, 0, 0, 0.3);
  border-radius: 50px 0 0 50px;
  background-color: #ffffff; // White background
  color: #000000; // Black text
  outline: none;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(0, 0, 0, 0.5); // Gray placeholder
  }

  &:focus {
    background-color: #f0f0f0; // Light gray on focus
    border-color: #000000; // Black border on focus
  }
`;

const SearchButton = styled.button`
  background-color: #000000; // Black button
  color: white; // White text
  border: none;
  padding: 0.8rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 0 50px 50px 0;
  transition: all 0.3s ease;

  &:hover {
    background-color: #333333; // Dark gray on hover
  }
`;

const PluginButton = styled(motion.button)`
  background-color: transparent;
  color: #000000; // Black text
  border: 2px solid #000000; // Black border
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 50px;
  transition: all 0.3s ease, width 0.3s ease;
  margin-top: 1rem;
  width: 18rem; // Set an initial width

  &:hover {
    background-color: black; // Light gray background on hover
    color: white; // Keep text black
    width: 20%;
  }
`;

const Section = styled(motion.section)`
  padding: 5rem 2rem;
  background-color: #ffffff; // White background
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  color: #000000; // Black text
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Card = styled(motion.div)`
  background-color: rgba(0, 0, 0, 0.05); // Very light gray background
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1); // Light shadow
  }
`;

const IconWrapper = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #000000; // Black icons
`;

const ScrollButton = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  background-color: rgba(0, 0, 0, 0.1); // Light gray background
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
    background-color: rgba(0, 0, 0, 0.2); // Darker gray on hover
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const RocketIcon = styled(motion.div)`
  font-size: 1.5rem;
  color: #000000; // Black icon
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
    color: #000000; // Black text
    transition: color 0.3s ease;

    &:hover {
      color: #333333; // Dark gray on hover
      transform: scale(1.1);
    }
  }
`;

const MotionSocialIcon = styled(motion.div)`
  color: #000000; // Black text
  transition: color 0.3s ease;

  &:hover {
    color: #333333; // Dark gray on hover
    transform: scale(1.1);
  }
`;

const FeaturesSection = styled(Section)`
  background-color: #f9f9f9; // Light gray background
`;

const FeatureGrid = styled(Grid)`
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`;

const FeatureCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
`;

const FeatureIcon = styled(IconWrapper)`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  color: #000000; // Black text
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: #333333; // Dark gray text
`;

const StatsSection = styled(Section)`
  background-color: white; // Light gray background
`;

const StatCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StatNumber = styled.h3`
  font-size: 3rem;
  margin: 1rem 0;
  color: #000000; // Black text
`;

const StatLabel = styled.p`
  font-size: 1.1rem;
  color: #333333; // Dark gray text
`;

const TestimonialSection = styled(Section)`
  background-color: #f9f9f9; // Light gray background
`;

const TestimonialCard = styled(Card)`
  text-align: left;
  position: relative;
`;

const QuoteIcon = styled.div`
  position: absolute;
  top: -1rem;
  left: -1rem;
  font-size: 3rem;
  color: rgba(0, 0, 0, 0.3); // Soft gray
`;

const TestimonialText = styled.p`
  font-style: italic;
  margin-bottom: 1rem;
  color: #000000; // Black text
`;

const TestimonialAuthor = styled.p`
  font-weight: bold;
  color: #333333; // Dark gray text
`;

const FAQSection = styled(Section)`
  background-color: white; // Light gray background
`;

const FAQItem = styled(motion.div)`
  background-color: rgba(0, 0, 0, 0.05); // Very light gray background
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1); // Light gray on hover
  }
`;

const FAQQuestion = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  color: #000000; // Black text
  font-weight: bold;
`;

const FAQAnswer = styled(motion.div)`
  color: #333333; // Dark gray text
  margin-top: 1rem;
`;

const FAQIcon = styled(motion.div)`
  color: #000000; // Black text
`;

const NewsletterSection = styled(Section)`
  background-color: #f9f9f9; // Light gray background
`;

const NewsletterForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  margin: 0 auto;
`;

const NewsletterInput = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  border: 2px solid rgba(0, 0, 0, 0.3);
  border-radius: 50px;
  background-color: #ffffff; // White background
  color: #000000; // Black text
  outline: none;
  transition: all 0.3s ease;
  margin-bottom: 1rem;

  &::placeholder {
    color: rgba(0, 0, 0, 0.5); // Gray placeholder
  }

  &:focus {
    background-color: #f0f0f0; // Light gray on focus
    border-color: #000000; // Black border on focus
  }
`;

const SpaceBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at bottom, #1e293b 0%, #0f172a 100%); // Dark gradient
  z-index: -1;
`;

const Star = styled.div`
  position: absolute;
  background: #ffffff; // White stars
  border-radius: 50%;
  animation: ${starTwinkle} ${props => props.duration}s ease-in-out infinite;
`;

const Nebula = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(30px);
  animation: ${nebulaPulse} 10s ease-in-out infinite;
`;

const NewsletterButton = styled.button`
  background-color: #000000; // Black button
  color: white; // White text
  border: none;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 50px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #333333; // Dark gray on hover
  }
`;

const MinecraftSecurityPluginHomepage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [email, setEmail] = useState('');

  const { scrollYProgress } = useViewportScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const featuresRef = useRef(null);
  const statsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const faqRef = useRef(null);

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
      featuresRef.current.scrollIntoView({ behavior: 'smooth' });
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

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log('Subscribed with email:', email);
    setEmail('');
    alert('Thank you for subscribing!');
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
      { color: '', top: '10%', left: '5%', size: '300px' },
      { color: '', top: '60%', right: '10%', size: '250px' },
      { color: '', bottom: '15%', left: '15%', size: '200px' },
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

  const features = [
    { icon: <FaShieldAlt />, title: "Advanced Anti-Cheat", description: "Detect and prevent cheating with our state-of-the-art anti-cheat system" },
    { icon: <FaLock />, title: "Secure Authentication", description: "Protect player accounts with robust login and verification mechanisms" },
    { icon: <FaUserShield />, title: "Grief Prevention", description: "Safeguard your world with intelligent grief detection and rollback features" },
    { icon: <FaServer />, title: "DDoS Protection", description: "Keep your server online with our advanced DDoS mitigation techniques" },
    { icon: <FaCode />, title: "Custom Configurations", description: "Tailor the plugin to your server's needs with extensive customization options" },
    { icon: <FaBug />, title: "Regular Updates", description: "Stay protected with frequent updates and rapid response to new threats" },
  ];

  const stats = [
    { icon: <FaDownload />, number: "385+", label: "Downloads" },
    { icon: <FaUsers />, number: "200+", label: "Active Users" },
    { icon: <FaStar />, number: "5.0", label: "Average Rating" },
    { icon: <FaServer />, number: "300+", label: "Protected Servers" },
  ];

  const testimonials = [
    {
      text: "This security plugin saved my server from numerous attacks. Highly recommended!",
      author: "Alex, Server Owner"
    },
    {
      text: "Easy to set up and incredibly effective. My players feel much safer now.",
      author: "Sarah, Community Manager"
    },
    {
      text: "The best investment I've made for my Minecraft server. Top-notch security features!",
      author: "Mike, Developer"
    },
  ];

  const faqs = [
    {
      question: "How do I install the security plugin?",
      answer: "Installation is simple! Just download the plugin file and place it in your server's plugins folder. Restart your server, and you're good to go!"
    },
    {
      question: "Is this plugin compatible with other popular Minecraft plugins?",
      answer: "Yes, our security plugin is designed to be compatible with most popular Minecraft plugins. However, we recommend checking our compatibility list for specific details."
    },
    {
      question: "How often do you release updates?",
      answer: "We release updates regularly, typically once a month for minor updates and bug fixes. Major feature updates are released quarterly."
    },
    {
      question: "Do you offer customer support?",
      answer: "Absolutely! We provide customer support through our Discord server and email. Premium users also get access to priority support."
    },
  ];


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
            <motion.div style={{ opacity, width: '100%' }}>
              <HeroTitle
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Secure Your Minecraft Server
              </HeroTitle>
              <HeroSubtitle
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Protect your server, players, and creations with our advanced security plugins.
                Join thousands of server owners in building safer Minecraft communities.
              </HeroSubtitle>
            </motion.div>
            
            <SearchBar
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              onSubmit={handleSearch}
            >
              <SearchInput 
                type="text" 
                placeholder="Search for plugins..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchButton type="submit"><FaSearch /></SearchButton>
            </SearchBar>
            <PluginButton
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExploreClick}
            >
              Or Explore Our Plugins Here
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
              {/* Add the Creeper image */}
            <CreeperImage src={creeperImage} alt="Creeper" />
                          {/* Add the Creeper image */}
                          <BeeImage src={beeImage} alt="bee" />
          </HeroSection>
          <ChatbotIframe />
       

          <FeaturesSection ref={featuresRef}>
            <SectionTitle
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Key Features
            </SectionTitle>
            <FeatureGrid>
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <FeatureIcon>{feature.icon}</FeatureIcon>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription>{feature.description}</FeatureDescription>
                </FeatureCard>
              ))}
            </FeatureGrid>
          </FeaturesSection>

          <StatsSection ref={statsRef}>
            <SectionTitle
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Our Impact
            </SectionTitle>
            <Grid>
              {stats.map((stat, index) => (
                <StatCard
                  key={index}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <IconWrapper>{stat.icon}</IconWrapper>
                  <StatNumber>{stat.number}</StatNumber>
                  <StatLabel>{stat.label}</StatLabel>
                </StatCard>
              ))}
            </Grid>
          </StatsSection>

          <TestimonialSection ref={testimonialsRef}>
            <SectionTitle
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              What Our Users Say
            </SectionTitle>
            <Grid>
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <QuoteIcon>"</QuoteIcon>
                  <TestimonialText>{testimonial.text}</TestimonialText>
                  <TestimonialAuthor>{testimonial.author}</TestimonialAuthor>
                </TestimonialCard>
              ))}
            </Grid>
          </TestimonialSection>

          <FAQSection ref={faqRef}>
            <SectionTitle
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Frequently Asked Questions
            </SectionTitle>
            {faqs.map((faq, index) => (
              <FAQItem 
                key={index}
                onClick={() => setActiveQuestion(activeQuestion === index ? null : index)}
              >
                <FAQQuestion>
                  {faq.question}
                  <FAQIcon
                    animate={{ rotate: activeQuestion === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaAngleDown />
                  </FAQIcon>
                </FAQQuestion>
                <AnimatePresence>
                  {activeQuestion === index && (
                    <FAQAnswer
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {faq.answer}
                    </FAQAnswer>
                  )}
                </AnimatePresence>
              </FAQItem>
            ))}
          </FAQSection>

          <NewsletterSection>
            <SectionTitle
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Stay Updated
            </SectionTitle>
            <NewsletterForm onSubmit={handleNewsletterSubmit}>
              <NewsletterInput
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <NewsletterButton type="submit">Subscribe</NewsletterButton>
            </NewsletterForm>
          </NewsletterSection>
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
              animate={{ rotate: isScrolled ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isScrolled ? <FaChevronDown /> : <FaChevronDown />}
            </RocketIcon>
          </ScrollButton>
        </AnimatePresence>
        <Footer />
      </PageContainer>
      
    </>
  );
};

export default MinecraftSecurityPluginHomepage;