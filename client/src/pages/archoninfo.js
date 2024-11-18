// archoninfo.js
import React, { useEffect, useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import smileGif from '../bilder/smile.gif'; // Import first GIF
import glitchGif from '../bilder/afglitch.gif'; // Import second GIF
import logoImage from '../bilder/logoA.png'; // Import your logo image

const Container = styled.div`
  padding-top: 200px;
  background: #000;
  color: #fff;
  overflow-x: hidden;
  font-family: 'VT323', monospace; /* Futuristic font */
`;

const FixedImageTopRight = styled.div`
  position: fixed;
  top: 100px;
  right: -50px;
  width: 400px;
  height: 400px;
  background: url(${smileGif}) no-repeat center center;
  background-size: contain;
  mix-blend-mode: screen;
  opacity: 0.8;
`;

const FixedImageBottomLeft = styled.div`
  position: fixed;
  bottom: 0px;
  left: -50px;
  width: 200px;
  height: 100px;
  background: url(${glitchGif}) no-repeat center center;
  background-size: contain;
  mix-blend-mode: screen;
  opacity: 0.8;
`;

/* Exaggerated glitch animation! */
const glitchAnimation = keyframes`
  0% {
    clip: rect(0, 9999px, 0, 0);
    transform: translate(0) skew(0deg);
  }
  5% {
    clip: rect(10px, 9999px, 130px, 0);
    transform: translate(-3px, -3px) skew(-0.5deg);
  }
  10% {
    clip: rect(20px, 9999px, 80px, 0);
    transform: translate(3px, 3px) skew(0.5deg);
  }
  15% {
    clip: rect(15px, 9999px, 90px, 0);
    transform: translate(-3px, -3px) skew(-0.5deg);
  }
  20% {
    clip: rect(30px, 9999px, 70px, 0);
    transform: translate(3px, 3px) skew(0.5deg);
  }
  25% {
    clip: rect(25px, 9999px, 85px, 0);
    transform: translate(-3px, -3px) skew(-0.5deg);
  }
  30% {
    clip: rect(40px, 9999px, 60px, 0);
    transform: translate(3px, 3px) skew(0.5deg);
  }
  35% {
    clip: rect(35px, 9999px, 75px, 0);
    transform: translate(-3px, -3px) skew(-0.5deg);
  }
  40% {
    clip: rect(50px, 9999px, 50px, 0);
    transform: translate(3px, 3px) skew(0.5deg);
  }
  45% {
    clip: rect(45px, 9999px, 65px, 0);
    transform: translate(-3px, -3px) skew(-0.5deg);
  }
  50% {
    clip: rect(60px, 9999px, 40px, 0);
    transform: translate(3px, 3px) skew(0.5deg);
  }
  55% {
    clip: rect(55px, 9999px, 55px, 0);
    transform: translate(-3px, -3px) skew(-0.5deg);
  }
  60% {
    clip: rect(70px, 9999px, 30px, 0);
    transform: translate(3px, 3px) skew(0.5deg);
  }
  65% {
    clip: rect(65px, 9999px, 45px, 0);
    transform: translate(-3px, -3px) skew(-0.5deg);
  }
  70% {
    clip: rect(80px, 9999px, 20px, 0);
    transform: translate(3px, 3px) skew(0.5deg);
  }
  75% {
    clip: rect(75px, 9999px, 35px, 0);
    transform: translate(-3px, -3px) skew(-0.5deg);
  }
  80% {
    clip: rect(90px, 9999px, 10px, 0);
    transform: translate(3px, 3px) skew(0.5deg);
  }
  85% {
    clip: rect(85px, 9999px, 25px, 0);
    transform: translate(-3px, -3px) skew(-0.5deg);
  }
  90% {
    clip: rect(100px, 9999px, 0, 0);
    transform: translate(3px, 3px) skew(0.5deg);
  }
  95% {
    clip: rect(95px, 9999px, 15px, 0);
    transform: translate(-3px, -3px) skew(-0.5deg);
  }
  100% {
    clip: rect(0, 9999px, 0, 0);
    transform: translate(0) skew(0deg);
  }
`;

const GlitchText = styled.span`
  position: relative;
  display: inline-block;
  color: #fff;
  font-size: ${(props) => props.size || 'inherit'};
  &:before,
  &:after {
    content: '${(props) => props.children}';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    background: transparent;
    overflow: hidden;
    animation: ${glitchAnimation} 2s infinite;
  }
  &:before {
    left: 2px;
    text-shadow: -2px 0 magenta;
    clip: rect(0, 900px, 0, 0);
  }
  &:after {
    left: -2px;
    text-shadow: -2px 0 cyan;
    clip: rect(0, 900px, 0, 0);
    animation-delay: 1s;
  }
`;

const Logo = styled.img`
  width: 150px;
  margin-bottom: 20px;
`;

const InfoSection = styled.section`
  margin-top: 100px;
  padding: 0 20px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`;

const NeonLine = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, magenta, cyan);
`;

const InfoText = styled.div`
  text-align: center;
  font-size: 32px;
  line-height: 1.8;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: ${(props) => (props.isVisible ? 'none' : 'translateY(20px)')};
  transition: opacity 0.8s ease-in-out, transform 0.8s ease-in-out;
  color: #fff;
  position: relative;
`;

const Section = styled.div`
  margin: 60px 0;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: ${(props) => (props.isVisible ? 'none' : 'translateY(30px)')};
  transition: opacity 0.8s ease-in-out, transform 0.8s ease-in-out;
  position: relative;
`;

const SectionTitle = styled.h2`
  font-size: 42px;
  color: #fff;
  position: relative;
  overflow: visible;
  margin-bottom: 30px;
`;

const SectionContent = styled.div`
  font-size: 24px;
  line-height: 1.6;
  color: #fff;
`;

const ArchonInfo = () => {
  const [sectionsVisible, setSectionsVisible] = useState({
    intro: false,
    features: false,
    benefits: false,
    community: false,
  });

  const introRef = useRef(null);
  const featuresRef = useRef(null);
  const benefitsRef = useRef(null);
  const communityRef = useRef(null);

  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight;

    if (introRef.current && scrollPosition > introRef.current.offsetTop + 100) {
      setSectionsVisible((prev) => ({ ...prev, intro: true }));
    }
    if (featuresRef.current && scrollPosition > featuresRef.current.offsetTop + 100) {
      setSectionsVisible((prev) => ({ ...prev, features: true }));
    }
    if (benefitsRef.current && scrollPosition > benefitsRef.current.offsetTop + 100) {
      setSectionsVisible((prev) => ({ ...prev, benefits: true }));
    }
    if (communityRef.current && scrollPosition > communityRef.current.offsetTop + 100) {
      setSectionsVisible((prev) => ({ ...prev, community: true }));
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Container>
      <FixedImageTopRight />
      <FixedImageBottomLeft />
      <InfoSection>
        <Logo src={logoImage} alt="Logo" />
        <InfoText ref={introRef} isVisible={sectionsVisible.intro}>
          <GlitchText size="72px">Archon Admin GUI</GlitchText>
          <NeonLine />
          <p>
            Welcome to the <GlitchText>ULTIMATE</GlitchText> all-in-one administration solution for your Minecraft server!
          </p>
        </InfoText>
        <Section ref={featuresRef} isVisible={sectionsVisible.features}>
          <SectionTitle>
            <GlitchText>Features</GlitchText>
            <NeonLine />
          </SectionTitle>
          <SectionContent>
            <ul>
              <li>⚡ <GlitchText>Advanced game administration tools</GlitchText></li>
              <li>🌐 <GlitchText>World management and editing capabilities</GlitchText></li>
              <li>🎨 <GlitchText>User-friendly graphical interface</GlitchText></li>
              <li>🛠️ <GlitchText>Support for Minecraft versions 1.20 - 1.21</GlitchText></li>
              <li>🔧 <GlitchText>Extensive customization options</GlitchText></li>
              <li>📈 <GlitchText>Real-time server monitoring</GlitchText></li>
              <li>🔌 <GlitchText>Integrated plugin support</GlitchText></li>
            </ul>
          </SectionContent>
        </Section>
        <Section ref={benefitsRef} isVisible={sectionsVisible.benefits}>
          <SectionTitle>
            <GlitchText>Benefits</GlitchText>
            <NeonLine />
          </SectionTitle>
          <SectionContent>
            <ul>
              <li>🚀 <GlitchText>Simplify server administration</GlitchText></li>
              <li>💎 <GlitchText>Enhance player experience with efficient management</GlitchText></li>
              <li>⏱️ <GlitchText>Save time with streamlined tools</GlitchText></li>
              <li>🎮 <GlitchText>Maintain full control over server settings and configurations</GlitchText></li>
              <li>⚙️ <GlitchText>Improve performance with optimized administration</GlitchText></li>
            </ul>
          </SectionContent>
        </Section>
        <Section ref={communityRef} isVisible={sectionsVisible.community}>
          <SectionTitle>
            <GlitchText>Join Our Community</GlitchText>
            <NeonLine />
          </SectionTitle>
          <SectionContent>
            Become a part of our growing community! Connect with other server administrators, share tips, and get the latest updates on <GlitchText>Archon Admin GUI</GlitchText>. Together, we can elevate your gaming experience to the <GlitchText>NEXT LEVEL!</GlitchText>
          </SectionContent>
        </Section>
      </InfoSection>
    </Container>
  );
};

export default ArchonInfo;
