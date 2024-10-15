// src/pages/PluginList.js
import React, { useState, useEffect } from 'react';
import styled, { keyframes, ThemeProvider } from 'styled-components';
import {
  FaArrowRight,
  FaTimes,
  FaShieldAlt,
  FaCogs,
  FaUserFriends,
  FaWrench,
  FaQuestionCircle,
  FaArrowUp,
  FaChevronDown,
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { animateScroll as scrollTo } from 'react-scroll';
import emailjs from 'emailjs-com';

// Import images from src/bilder
import simplegoldImg from '../bilder/logo2.png';
import archonAdminGuiImg from '../bilder/logo2.png';
import bacteriaStaffPluginImg from '../bilder/logo2.png';
import fireballPluginImg from '../bilder/logo2.png';

// Import video from src/bilder
import pluginsDemoVideo from '../bilder/logo2.png';

// Keyframe animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(-5px);
  }
  50% {
    transform: translateY(5px);
  }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-15px);
  }
  60% {
    transform: translateY(-7px);
  }
`;

const planetMove = keyframes`
  from {
    transform: translateX(-10%) translateY(0%);
  }
  to {
    transform: translateX(110%) translateY(0%);
  }
`;

const rocketFly = keyframes`
  0% {
    bottom: -20%;
    transform: translateX(-50%) translateY(0);
  }
  100% {
    bottom: 120%;
    transform: translateX(-50%) translateY(0);
  }
`;

// Theme Definitions
const lightTheme = {
  background: '#ffffff',
  text: '#000000',
  cardBackground: '#f9f9f9',
  buttonBackground: '#000000',
  buttonText: '#ffffff',
};

const darkTheme = {
  background: '#000000',
  text: '#ffffff',
  cardBackground: '#1a1a1a',
  buttonBackground: '#ffffff',
  buttonText: '#000000',
};

// Styled Components

// Global Styles for Smooth Scrolling and Fonts
const GlobalStyle = styled.div`
  scroll-behavior: smooth;
  font-family: 'Roboto', sans-serif;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

// Stars and Planets Background
const StarsBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  background: radial-gradient(circle at bottom, #020111 0%, #000000 80%);

  /* Stars */
  .stars {
    position: absolute;
    width: 1px;
    height: 1px;
    background: transparent;
    box-shadow:
      /* Multiple positions for stars */
      1vw 10vh #ffffff,
      3vw 20vh #ffffff,
      5vw 30vh #ffffff,
      7vw 40vh #ffffff,
      9vw 50vh #ffffff,
      11vw 60vh #ffffff,
      13vw 70vh #ffffff,
      15vw 80vh #ffffff,
      17vw 90vh #ffffff,
      19vw 100vh #ffffff,
      21vw 15vh #ffffff,
      23vw 25vh #ffffff,
      25vw 35vh #ffffff,
      27vw 45vh #ffffff,
      29vw 55vh #ffffff,
      31vw 65vh #ffffff,
      33vw 75vh #ffffff,
      35vw 85vh #ffffff,
      37vw 95vh #ffffff,
      39vw 5vh #ffffff,
      41vw 15vh #ffffff,
      43vw 25vh #ffffff,
      45vw 35vh #ffffff,
      47vw 45vh #ffffff,
      49vw 55vh #ffffff,
      51vw 65vh #ffffff,
      53vw 75vh #ffffff,
      55vw 85vh #ffffff,
      57vw 95vh #ffffff,
      59vw 5vh #ffffff,
      61vw 15vh #ffffff,
      63vw 25vh #ffffff,
      65vw 35vh #ffffff,
      67vw 45vh #ffffff,
      69vw 55vh #ffffff,
      71vw 65vh #ffffff,
      73vw 75vh #ffffff,
      75vw 85vh #ffffff,
      77vw 95vh #ffffff,
      79vw 5vh #ffffff,
      81vw 15vh #ffffff,
      83vw 25vh #ffffff,
      85vw 35vh #ffffff,
      87vw 45vh #ffffff,
      89vw 55vh #ffffff,
      91vw 65vh #ffffff,
      93vw 75vh #ffffff,
      95vw 85vh #ffffff,
      97vw 95vh #ffffff,
      99vw 5vh #ffffff;

    animation: animStar 150s linear infinite;
  }

  .stars:after {
    content: ' ';
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    height: 1px;
    background: transparent;
    box-shadow:
      /* Additional stars */
      2vw 12vh #ffffff,
      4vw 22vh #ffffff,
      6vw 32vh #ffffff,
      8vw 42vh #ffffff,
      10vw 52vh #ffffff,
      12vw 62vh #ffffff,
      14vw 72vh #ffffff,
      16vw 82vh #ffffff,
      18vw 92vh #ffffff,
      20vw 2vh #ffffff,
      22vw 12vh #ffffff,
      24vw 22vh #ffffff,
      26vw 32vh #ffffff,
      28vw 42vh #ffffff,
      30vw 52vh #ffffff,
      32vw 62vh #ffffff,
      34vw 72vh #ffffff,
      36vw 82vh #ffffff,
      38vw 92vh #ffffff,
      40vw 2vh #ffffff,
      42vw 12vh #ffffff,
      44vw 22vh #ffffff,
      46vw 32vh #ffffff,
      48vw 42vh #ffffff,
      50vw 52vh #ffffff,
      52vw 62vh #ffffff,
      54vw 72vh #ffffff,
      56vw 82vh #ffffff,
      58vw 92vh #ffffff,
      60vw 2vh #ffffff,
      62vw 12vh #ffffff,
      64vw 22vh #ffffff,
      66vw 32vh #ffffff,
      68vw 42vh #ffffff,
      70vw 52vh #ffffff,
      72vw 62vh #ffffff,
      74vw 72vh #ffffff,
      76vw 82vh #ffffff,
      78vw 92vh #ffffff,
      80vw 2vh #ffffff;

    animation: animStar 200s linear infinite;
  }

  @keyframes animStar {
    from {
      transform: translateY(0px);
    }
    to {
      transform: translateY(-2000px);
    }
  }

  /* Planets */
  .planet {
    position: absolute;
    border-radius: 50%;
    animation: ${planetMove} infinite linear;
  }

  .planet1 {
    width: 100px;
    height: 100px;
    background: radial-gradient(circle at 30% 30%, #ffcc00, #cc9900);
    top: 20%;
    left: -10%;
    animation-duration: 100s;
  }

  .planet2 {
    width: 80px;
    height: 80px;
    background: radial-gradient(circle at 30% 30%, #00ccff, #0066cc);
    top: 60%;
    left: -15%;
    animation-duration: 120s;
    animation-delay: 30s;
  }

  /* Rocket */
  .rocket {
    position: absolute;
    width: 60px;
    height: 120px;
    bottom: -20%; /* Start from below the screen */
    left: ${({ rocketPosition }) => rocketPosition}%;
    transform: translateX(-50%);
    animation: ${rocketFly} 15s linear infinite;
    z-index: 2;
  }

  .rocket-body {
    position: relative;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, #e6e6e6, #bfbfbf);
    border-radius: 30px;
    overflow: hidden;
    border: 2px solid #999999;
  }

  .nose-cone {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    border-bottom: 20px solid #e6e6e6;
  }

  .window {
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 20px;
    background: #1a73e8;
    border-radius: 50%;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
    border: 2px solid #ffffff;
  }

  .fin {
    position: absolute;
    bottom: 0;
    width: 50%;
    height: 30px;
    background: #ff4d4d;
    border-radius: 0 0 10px 10px;
  }

  .fin-left {
    left: 0;
    transform: rotate(-45deg);
    transform-origin: top left;
  }

  .fin-right {
    right: 0;
    transform: rotate(45deg);
    transform-origin: top right;
  }

  .fire {
    position: absolute;
    bottom: -40px;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 50px;
    background: radial-gradient(circle at 50% 0%, #ff8c00, rgba(255, 140, 0, 0));
    border-radius: 50%;
    animation: fire 0.5s infinite;
  }

  @keyframes fire {
    0% {
      height: 40px;
      opacity: 1;
    }
    100% {
      height: 50px;
      opacity: 0;
    }
  }
`;

// Hero Section without Background Image
const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  padding: 0 20px;
  overflow: hidden;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 4rem;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text};
  animation: ${fadeInUp} 1s ease-out;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.5rem;
  max-width: 700px;
  color: ${({ theme }) => theme.text};
  animation: ${fadeInUp} 1.5s ease-out;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

// Scroll Down Button
const ScrollDownButton = styled(motion.div)`
  position: absolute;
  bottom: -90px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  z-index: 1;
  animation: ${bounce} 2s infinite;

  svg {
    color: ${({ theme }) => theme.text};
    font-size: 2rem;
  }
`;
// Plugin Showcase
const PluginSection = styled.section`
  padding: 100px 80px;
  background-color: ${({ theme }) => theme.cardBackground};
  animation: ${fadeInUp} 1s ease-out;

  @media (max-width: 768px) {
    padding: 80px 40px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 60px;
  color: ${({ theme }) => theme.text};
  animation: ${fadeInUp} 1s ease-out;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const SearchBarContainer = styled.div`
  max-width: 800px;
  margin: 0 auto 40px auto;
  display: flex;
  justify-content: center;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 15px 20px;
  border-radius: 50px;
  border: none;
  font-size: 1rem;
  outline: none;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

  &:focus {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`;

const PluginGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  max-width: 1400px;
  margin: 0 auto;
`;

const PluginCard = styled(motion.div)`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  backdrop-filter: blur(5px);

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.text};
  }
`;

const PluginImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  animation: ${float} 6s ease-in-out infinite;
  transition: transform 0.3s;

  ${PluginCard}:hover & {
    transform: scale(1.05);
  }
`;

const PluginContent = styled.div`
  padding: 20px;
  text-align: center;
`;

const PluginName = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const PluginDescription = styled.p`
  font-size: 1rem;
  color: #aaaaaa;
`;

// Features Section
const FeaturesSection = styled.section`
  padding: 100px 80px;
  background: ${({ theme }) => theme.cardBackground};
  animation: ${fadeInUp} 1s ease-out;

  @media (max-width: 768px) {
    padding: 80px 40px;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled(motion.div)`
  background: ${({ theme }) => theme.background};
  border-radius: 15px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
  backdrop-filter: blur(5px);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 20px;
`;

const FeatureTitle = styled.h4`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: ${({ theme }) => theme.text};
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: #aaaaaa;
`;

// Video Section
const VideoSectionStyled = styled.section`
  padding: 100px 80px;
  background-color: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.text};
  text-align: center;
  animation: ${fadeInUp} 1s ease-out;
  position: relative;

  @media (max-width: 768px) {
    padding: 80px 40px;
  }
`;

const VideoTitle = styled.h2`
  font-size: 3rem;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.text};

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const VideoPlayer = styled.video`
  width: 80%;
  max-width: 800px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Button = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  padding: 15px 30px;
  background-color: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.buttonText};
  border-radius: 50px;
  font-size: 1.2rem;
  text-decoration: none;
  transition: background-color 0.3s ease, transform 0.3s ease;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: ${({ theme }) =>
      theme.buttonBackground === '#ffffff' ? '#dddddd' : '#333333'};
    transform: scale(1.05);
  }

  svg {
    margin-left: 10px;
  }
`;

// Testimonials Section
const TestimonialsSection = styled.section`
  padding: 100px 80px;
  background-color: ${({ theme }) => theme.background};
  animation: ${fadeInUp} 1s ease-out;

  @media (max-width: 768px) {
    padding: 80px 40px;
  }
`;

const CarouselContainer = styled.div`
  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .slick-dots li button:before {
    color: ${({ theme }) => theme.text};
    opacity: 1;
  }

  .slick-dots li.slick-active button:before {
    color: ${({ theme }) => theme.text};
    opacity: 1;
  }
`;

const TestimonialCard = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 15px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
  backdrop-filter: blur(5px);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.1);
  }
`;

const TestimonialText = styled.p`
  font-size: 1rem;
  color: #aaaaaa;
  margin-bottom: 20px;
`;

const TestimonialAuthor = styled.h5`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text};
`;

// FAQ Section
const FAQSection = styled.section`
  padding: 100px 80px;
  background-color: ${({ theme }) => theme.cardBackground};
  animation: ${fadeInUp} 1s ease-out;

  @media (max-width: 768px) {
    padding: 80px 40px;
  }
`;

const FAQTitle = styled.h2`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 60px;
  color: ${({ theme }) => theme.text};

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const FAQItem = styled.div`
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 20px;
  background: ${({ theme }) => theme.background};
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(5px);
`;

const FAQQuestion = styled(motion.h4)`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FAQAnswer = styled(motion.p)`
  font-size: 1rem;
  color: #aaaaaa;
  margin-top: 10px;
  line-height: 1.6;
`;

// Pricing Section
const PricingSection = styled.section`
  padding: 100px 80px;
  background-color: ${({ theme }) => theme.background};
  animation: ${fadeInUp} 1s ease-out;

  @media (max-width: 768px) {
    padding: 80px 40px;
  }
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
`;

const PricingCard = styled(motion.div)`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 15px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  backdrop-filter: blur(5px);

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
`;

const PricingPlan = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const PricingPrice = styled.p`
  font-size: 2rem;
  color: #aaaaaa;
  margin-bottom: 20px;
`;

const PricingFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
`;

const PricingFeature = styled.li`
  font-size: 1rem;
  color: #aaaaaa;
  margin-bottom: 10px;

  &:before {
    content: '✔️';
    margin-right: 10px;
    color: ${({ theme }) => theme.text};
  }
`;

const PricingButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 25px;
  background-color: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.buttonText};
  border-radius: 50px;
  text-decoration: none;
  font-size: 1rem;
  transition: background-color 0.3s ease, transform 0.3s ease;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: ${({ theme }) =>
      theme.buttonBackground === '#ffffff' ? '#dddddd' : '#333333'};
    transform: scale(1.05);
  }

  svg {
    margin-left: 10px;
  }
`;

// Contact Section
const ContactSectionStyled = styled.section`
  padding: 100px 80px;
  background-color: ${({ theme }) => theme.cardBackground};
  animation: ${fadeInUp} 1s ease-out;

  @media (max-width: 768px) {
    padding: 80px 40px;
  }
`;

const ContactTitle = styled.h2`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 60px;
  color: ${({ theme }) => theme.text};

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const ContactForm = styled.form`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #aaaaaa;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;

  &:focus {
    border-color: ${({ theme }) => theme.text};
    outline: none;
    box-shadow: 0 0 10px ${({ theme }) => theme.text};
  }
`;

const TextArea = styled.textarea`
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #aaaaaa;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  resize: vertical;

  &:focus {
    border-color: ${({ theme }) => theme.text};
    outline: none;
    box-shadow: 0 0 10px ${({ theme }) => theme.text};
  }
`;

const SubmitButton = styled.button`
  padding: 15px 30px;
  background-color: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  border-radius: 50px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: ${({ theme }) =>
      theme.buttonBackground === '#ffffff' ? '#dddddd' : '#333333'};
    transform: scale(1.05);
  }
`;

// Back to Top Button
const BackToTop = styled(motion.button)`
  position: fixed;
  bottom: 40px;
  right: 40px;
  background-color: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  border-radius: 50%;
  padding: 15px;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease, transform 0.3s ease;
  z-index: 1000;

  &:hover {
    background-color: ${({ theme }) =>
      theme.buttonBackground === '#ffffff' ? '#dddddd' : '#333333'};
    transform: scale(1.2);
  }
`;

// Footer
const Footer = styled.footer`
  padding: 50px 80px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  text-align: center;

  @media (max-width: 768px) {
    padding: 30px 40px;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const FooterLink = styled.a`
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #aaaaaa;
  }
`;

const FooterText = styled.p`
  font-size: 0.9rem;
  color: #888888;
`;

// Modal Components
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: ${({ show }) => (show ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const ModalContent = styled(motion.div)`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 15px;
  padding: 40px;
  max-width: 600px;
  width: 90%;
  position: relative;
  color: ${({ theme }) => theme.text};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
`;

// Search Bar Component
const SearchBar = ({ searchTerm, setSearchTerm }) => (
  <SearchBarContainer>
    <SearchInput
      type="text"
      placeholder="Search Plugins..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      aria-label="Search Plugins"
    />
  </SearchBarContainer>
);

// Plugin data
const plugins = [
  {
    name: 'SimpleGold',
    description:
      'Gold-based economy plugin for seamless integration with Vault and Towny.',
    image: simplegoldImg,
    details:
      'SimpleGold offers a robust economy system for your Minecraft server, perfectly integrated with Vault and Towny. It provides a seamless experience for both players and administrators, with easy configuration and reliable performance.',
  },
  {
    name: 'Archon Admin GUI',
    description:
      'Powerful GUI plugin for server admins to manage the game environment efficiently.',
    image: archonAdminGuiImg,
    details:
      'Archon Admin GUI provides a powerful and user-friendly graphical interface for server administrators. Manage players, regions, and settings with ease, all from a centralized dashboard.',
  },
  {
    name: 'Bakteria Staff Plugin',
    description:
      'Enhanced tools for staff to keep servers secure from unwanted threats.',
    image: bacteriaStaffPluginImg,
    details:
      'Bakteria Staff Plugin offers advanced tools for server staff, including anti-grief mechanisms, monitoring tools, and automated security protocols to protect your server from unwanted threats.',
  },
  {
    name: 'Asfaltios Firewall',
    description: 'Fun firewall plugin that helps you keep your server secure.',
    image: fireballPluginImg,
    details:
      'Asfaltios Firewall gives you the perfect server protection. It will stop DDoS attacks, lag machines, and much more!',
  },
];

// Features data
const features = [
  {
    icon: <FaShieldAlt />,
    title: 'Seamless Integration',
    description:
      'Our plugins integrate smoothly with existing server setups, ensuring minimal downtime.',
  },
  {
    icon: <FaCogs />,
    title: 'Enhanced Security',
    description:
      'Protect your servers with advanced security features that guard against threats.',
  },
  {
    icon: <FaUserFriends />,
    title: 'User-Friendly',
    description:
      'Intuitive interfaces and easy-to-use commands make managing plugins a breeze.',
  },
  {
    icon: <FaWrench />,
    title: 'Customizable',
    description:
      "Tailor plugins to fit your server's unique needs with extensive customization options.",
  },
];

// Testimonials data
const testimonials = [
  {
    text: 'Asfaltios plugins have transformed our server’s performance and security. Highly recommend!',
    author: 'Minecraft Server Admin, XYZ',
  },
  {
    text: 'The Archon Admin GUI is a game-changer. Managing our server has never been easier.',
    author: 'Server Owner, ABC',
  },
  {
    text: 'Excellent support and top-notch plugins. Our players love the enhanced experience.',
    author: 'Community Manager, DEF',
  },
];

// FAQ data
const faqs = [
  {
    question: 'How do I install a plugin?',
    answer:
      "To install a plugin, download the plugin file and place it in the 'plugins' folder on your server. Restart or start the server to activate the plugin.",
  },
  {
    question: 'Are the plugins compatible with all server versions?',
    answer:
      "Our plugins are developed to be compatible with the latest versions of Minecraft. Check each plugin's specifications for details.",
  },
  {
    question: 'Do you offer support for the plugins?',
    answer:
      'Yes, we provide comprehensive support for all our plugins. Contact our support team via the contact section for assistance.',
  },
];

// Pricing data
const pricingPlans = [
  {
    name: 'Basic',
    price: '$0',
    features: [
      'All of our plugins',
      'Basic setup and configuration support',
      'Basic security and server support',
    ],
  },
  {
    name: 'Pro',
    price: '$49',
    features: [
      'Custom plugin requests',
      'Multiple addon tools',
      'Everything in Basic',
      'Priority support',
    ],
  },
  {
    name: 'Enterprise',
    price: '$99',
    features: [
      'Fully customizable solutions',
      'Unlimited plugins',
      'Dedicated support',
      'Regular updates',
    ],
  },
];

// Modal Component
const PluginModal = ({ show, onClose, plugin }) => {
  if (!plugin) return null;

  return (
    <AnimatePresence>
      {show && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          aria-modal="true"
          role="dialog"
        >
          <ModalContent
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={onClose} aria-label="Close Modal">
              <FaTimes />
            </CloseButton>
            <h2 style={{ marginBottom: '20px' }}>{plugin.name}</h2>
            <img
              src={plugin.image}
              alt={plugin.name}
              style={{
                width: '100%',
                borderRadius: '10px',
                marginBottom: '20px',
              }}
            />
            <p>{plugin.details}</p>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

// Main Component
const PluginList = () => {
  const [selectedPlugin, setSelectedPlugin] = useState(null);
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [theme] = useState('dark');

  // State for rocket position
  const [rocketPosition, setRocketPosition] = useState(50);

  // Function to generate random rocket position
  const generateRandomPosition = () => {
    const min = 10;
    const max = 90;
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  useEffect(() => {
    // Set initial random position
    setRocketPosition(generateRandomPosition());

    // Set interval to update rocket position after each animation cycle
    const interval = setInterval(() => {
      setRocketPosition(generateRandomPosition());
    }, 15000); // Match the duration of the rocketFly animation (15s)

    return () => clearInterval(interval);
  }, []);

  // Slider settings for testimonials
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  // State for Back to Top Button visibility
  const [showTopBtn, setShowTopBtn] = useState(false);

  // Handle scroll to show/hide Back to Top Button
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filtered plugins based on search term
  const filteredPlugins = plugins.filter(
    (plugin) =>
      plugin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plugin.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form submission
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        e.target,
        'YOUR_USER_ID'
      )
      .then(
        (result) => {
          console.log(result.text);
          alert('Message Sent Successfully!');
          e.target.reset();
        },
        (error) => {
          console.log(error.text);
          alert('An error occurred, please try again.');
        }
      );
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <ParallaxProvider>
        <GlobalStyle>
          {/* Hero Section */}
          <HeroSection>
            {/* Stars and Planets Background */}
            <StarsBackground rocketPosition={rocketPosition}>
              <div className="stars"></div>
              <div className="planet planet1"></div>
              <div className="planet planet2"></div>
              {/* Rocket */}
              <div className="rocket">
                <div className="rocket-body">
                  <div className="nose-cone"></div>
                  <div className="window"></div>
                  <div className="fin fin-left"></div>
                  <div className="fin fin-right"></div>
                </div>
                <div className="fire"></div>
              </div>
            </StarsBackground>
            <HeroContent>
              <Parallax y={[-20, 20]} tagOuter="div">
                <HeroTitle
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  Discover Our Plugins
                </HeroTitle>
              </Parallax>
              <Parallax y={[30, -30]} tagOuter="div">
                <HeroSubtitle
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5 }}
                >
                  Enhance your Minecraft server with Asfaltios' powerful and
                  user-friendly plugins.
                </HeroSubtitle>
              </Parallax>
              {/* Scroll Down Button */}
              <ScrollDownButton
                onClick={() => {
                  const nextSection = document.getElementById('plugins');
                  if (nextSection) {
                    scrollTo.scrollTo(nextSection.offsetTop - 70, {
                      duration: 800,
                      delay: 0,
                      smooth: 'easeInOutQuart',
                    });
                  }
                }}
                aria-label="Scroll Down"
              >
                <FaChevronDown />
              </ScrollDownButton>
            </HeroContent>
          </HeroSection>


          {/* Plugin Showcase */}
          <PluginSection id="plugins">
            <SectionTitle>Our Plugins</SectionTitle>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <PluginGrid>
              {filteredPlugins.map((plugin, index) => (
                <PluginCard
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedPlugin(plugin)}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  tabIndex={0}
                  role="button"
                  aria-pressed={selectedPlugin === plugin}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      setSelectedPlugin(plugin);
                    }
                  }}
                >
                  <PluginImage
                    src={plugin.image}
                    alt={plugin.name}
                    loading="lazy"
                  />
                  <PluginContent>
                    <PluginName>{plugin.name}</PluginName>
                    <PluginDescription>{plugin.description}</PluginDescription>
                  </PluginContent>
                </PluginCard>
              ))}
            </PluginGrid>
          </PluginSection>

          {/* Features Section */}
          <FeaturesSection id="features">
            <SectionTitle>Main Features</SectionTitle>
            <FeaturesGrid>
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                >
                  <FeatureIcon>{feature.icon}</FeatureIcon>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription>{feature.description}</FeatureDescription>
                </FeatureCard>
              ))}
            </FeaturesGrid>
          </FeaturesSection>

          {/* Video Section */}
          <VideoSectionStyled id="video">
            <VideoTitle>See Our Plugins in Action</VideoTitle>
            <Parallax y={[20, -20]} tagOuter="div">
              <VideoPlayer controls>
                <source src={pluginsDemoVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </VideoPlayer>
            </Parallax>
            <Button href="#contact">
              Contact Us <FaArrowRight />
            </Button>
          </VideoSectionStyled>

          {/* Testimonials Section */}
          <TestimonialsSection id="testimonials">
            <SectionTitle>What Our Customers Say</SectionTitle>
            <CarouselContainer>
              <Slider {...sliderSettings}>
                {testimonials.map((testimonial, index) => (
                  <TestimonialCard key={index}>
                    <TestimonialText>"{testimonial.text}"</TestimonialText>
                    <TestimonialAuthor>- {testimonial.author}</TestimonialAuthor>
                  </TestimonialCard>
                ))}
              </Slider>
            </CarouselContainer>
          </TestimonialsSection>

          {/* FAQ Section */}
          <FAQSection id="faq">
            <FAQTitle>Frequently Asked Questions</FAQTitle>
            {faqs.map((faq, index) => (
              <FAQItem key={index}>
                <FAQQuestion
                  onClick={() =>
                    setActiveFAQ(activeFAQ === index ? null : index)
                  }
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  tabIndex={0}
                  role="button"
                  aria-expanded={activeFAQ === index}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      setActiveFAQ(activeFAQ === index ? null : index);
                    }
                  }}
                >
                  {faq.question}
                  <FaQuestionCircle />
                </FAQQuestion>
                <AnimatePresence>
                  {activeFAQ === index && (
                    <FAQAnswer
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {faq.answer}
                    </FAQAnswer>
                  )}
                </AnimatePresence>
              </FAQItem>
            ))}
          </FAQSection>

          {/* Pricing Section */}
          <PricingSection id="pricing">
            <SectionTitle>Pricing Plans</SectionTitle>
            <PricingGrid>
              {pricingPlans.map((plan, index) => (
                <PricingCard
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                >
                  <PricingPlan>{plan.name}</PricingPlan>
                  <PricingPrice>{plan.price}</PricingPrice>
                  <PricingFeatures>
                    {plan.features.map((feature, idx) => (
                      <PricingFeature key={idx}>{feature}</PricingFeature>
                    ))}
                  </PricingFeatures>
                  <PricingButton href="#contact">
                    Choose Plan <FaArrowRight />
                  </PricingButton>
                </PricingCard>
              ))}
            </PricingGrid>
          </PricingSection>

          {/* Contact Section */}
          <ContactSectionStyled id="contact">
            <ContactTitle>Contact Us</ContactTitle>
            <ContactForm onSubmit={sendEmail}>
              <Input
                type="text"
                placeholder="Name"
                name="user_name"
                required
              />
              <Input
                type="email"
                placeholder="Email"
                name="user_email"
                required
              />
              <Input type="text" placeholder="Subject" name="subject" required />
              <TextArea
                rows="5"
                placeholder="Your Message"
                name="message"
                required
              />
              <SubmitButton type="submit">Send Message</SubmitButton>
            </ContactForm>
          </ContactSectionStyled>

          {/* Back to Top Button */}
          {showTopBtn && (
            <BackToTop
              onClick={() => scrollTo.scrollToTop()}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.2 }}
              aria-label="Back to Top"
            >
              <FaArrowUp />
            </BackToTop>
          )}

          {/* Footer */}
          <Footer>
            <FooterLinks>
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Terms of Service</FooterLink>
              <FooterLink href="#">Contact</FooterLink>
            </FooterLinks>
            <FooterText>
              &copy; {new Date().getFullYear()} Asfaltios. All rights reserved.
            </FooterText>
          </Footer>

          {/* Plugin Modal */}
          <PluginModal
            show={selectedPlugin !== null}
            onClose={() => setSelectedPlugin(null)}
            plugin={selectedPlugin}
          />
        </GlobalStyle>
      </ParallaxProvider>
    </ThemeProvider>
  );
};

export default PluginList;
