import React from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import HeaderComponent from '../components/header';

const fadeContent = keyframes`
  to {
    opacity: 1;
    transform: none;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem; /* Adjusted margin */
`;

const Header = styled.header`
  position: relative;
  padding-top: 10rem; /* Adjust padding-top to move content closer to the top */
  padding-bottom: 35rem; /* Add padding-bottom to maintain the overall height */
  background: linear-gradient(135deg, #f3f4f7, #e8eef2);
  overflow: hidden;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;


const Logo = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
`;

const Brackets = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  font-size: 18px;
  color: black;
  opacity: 0;
  transform: scale(1.7);
  animation: ${fadeContent} .5s 2.2s cubic-bezier(.2,1,.2,1) forwards;

  &::before,
  &::after {
    content: '「」';
    position: absolute;
    top: 30%;
    left: 50%;
    font-size: 5em;
    font-weight: bold;
    transform: translate(-50%, -50%);
  }
`;

const Slogan = styled.h2`
  max-width: 630px;
  margin: 0 auto 1.5rem; /* Adjusted margin */
  color: #333;
  font: 100 26px / 1.5 'Segoe UI', sans-serif;
  text-shadow: 0 1px 1px rgba(0,0,0,.2);
  text-transform: capitalize;
  opacity: 0;
  transform: perspective(800px) rotateX(-60deg) translateY(50px);
  animation: ${fadeContent} .85s 2.1s cubic-bezier(.2,1,.2,1) forwards;

`;

const PS = styled.span`
  color: #333;
  text-transform: lowercase;
  text-shadow: 0 1px 2px rgba(0,0,0,.15);
`;

const Button = styled.button`
  position: relative;
  padding: .75rem 1rem;
  border: none;
  border-radius: .25rem;
  outline: none;
  font-size: 14px;
  text-transform: capitalize;
  color: #fff;
  background: #333;
  text-shadow: 0 1px 0 #000;
  box-shadow:
    inset 0 1px 1px #fff,
    inset 0 -1px 4px rgba(23,78,138,.1),
    0 4px 20px -2px rgba(0,0,0,.2);
  cursor: pointer;
  opacity: 0.9;
  transform: perspective(800px) rotateX(-50deg) translateY(30px);
  animation: ${fadeContent} .7s 2.2s forwards;
  transition: all 0.3s ease-in-out;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit;
    color: rgba(0,0,0,.2);
    opacity: 0;
    box-shadow: 0 4px 20px -2px;
    transition-duration: .4s;
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover {
    transform: scale(1.05);
    background: #555;
  }

  &.primary {
    font-weight: 900;
    text-shadow: 0 1px 0 rgba(0,0,0,.1);
    box-shadow: 0 4px 16px -1px rgba(0,0,0,.4);
    background: #000;
    &::before {
      color: rgba(0,0,0,.3);
    }
  }

  & ~ & {
    margin-left: 1.5em;
    animation-delay: 2.4s;
  }
`;

const Circle = styled.div`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(135, 206, 235, 0.75), rgba(0, 191, 255, 0.75));
  transform: translate(100%, 500px);
  animation: ${fadeContent} 1.2s ${props => props.delay} cubic-bezier(.2,1,.2,1) forwards;
  mix-blend-mode: darken;
`;


const Hill = styled.div`
  position: relative;
  height: 8.5rem;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    border-radius: 50%;
    top: 1rem;
    left: 50%;
    width: 1000vw;
    height: 1000vw;
    transform: translate(calc(-50% + 35vw), 0);
    background-color: #fff;
    color: rgba(0,0,0,.1);
    box-shadow:
      0 0 .5rem,
      0 0 2rem,
      0 0 3rem;
  }
`;

const Wrapper = styled.div`
  width: min(100% - 4rem, 85rem);
  margin-inline: auto;
  padding-top: 100px; /* Ensure content starts 200px below the header */
`;

const Layout = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Main = styled.main`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 120ch;
  max-width: calc(100vw - 2rem);
  position: relative;
`;

const ClrPrimaryVariables = `
  --clr-primary-900: hsl(0, 0%, 10%);
  --clr-primary-800: hsl(0, 0%, 20%);
  --clr-primary-700: hsl(0, 0%, 30%);
  --clr-primary-600: hsl(0, 0%, 40%);
  --clr-primary-500: hsl(0, 0%, 50%);
  --clr-primary-400: hsl(0, 0%, 60%);
  --clr-primary-300: hsl(0, 0%, 70%);
  --clr-primary-200: hsl(0, 0%, 85%);
  --clr-primary-100: hsl(0, 0%, 95%);
`;

const ClrAccentVariables = `
  --clr-accent-600: hsl(0, 0%, 20%);
  --clr-accent-500: hsl(0, 0%, 40%);
  --clr-accent-400: hsl(0, 0%, 60%);
  --clr-accent-300: hsl(0, 0%, 75%);
  --clr-accent-200: hsl(0, 0%, 90%);
`;

const GlobalStyle = createGlobalStyle`
  :root {
    ${ClrPrimaryVariables}
    ${ClrAccentVariables}
    --backdrop: hsl(0 0% 60% / 0.12);
    --radius: 14;
    --border: 3;
    --backup-border: var(--backdrop);
    --size: 200;
  }

  * {
    margin: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', sans-serif;
    line-height: 1.7;
    background: #f8f9fa;
    color: #333;
  }

  h1,
  h2,
  h3 {
    color: #333;
  }

  h1,
  h2 {
    line-height: 1.1;
  }

  h1 {
    font-size: clamp(2.75rem, 10vw - 1rem, 4.5rem);
  }

  h1 + p {
    font-size: 1.275rem;
    margin-block: 1rem 3.25rem;
  }

  h3 {
    line-height: 1.35;
  }
`;

const usePointerGlow = () => {
  const [status, setStatus] = React.useState(null)
  React.useEffect(() => {
    const syncPointer = ({ x: pointerX, y: pointerY }) => {
      const x = pointerX.toFixed(2)
      const y = pointerY.toFixed(2)
      const xp = (pointerX / window.innerWidth).toFixed(2)
      const yp = (pointerY / window.innerHeight).toFixed(2)
      document.documentElement.style.setProperty('--x', x)
      document.documentElement.style.setProperty('--xp', xp)
      document.documentElement.style.setProperty('--y', y)
      document.documentElement.style.setProperty('--yp', yp)
      setStatus({ x, y, xp, yp })
    }
    document.body.addEventListener('pointermove', syncPointer)
    return () => {
      document.body.removeEventListener('pointermove', syncPointer)
    }
  }, [])
  return [status]
}

const PluginsList = () => {
  const [status] = usePointerGlow();

  return (
    <>
      <GlobalStyle />
      
      <HeaderComponent />
      <Header className="header">
        <Circle top="calc(50% - 10vw)" left="calc(50% - 50vw)" size="200vw" gradient="linear-gradient(45deg, rgba(255,255,255, .75), rgba(0,0,0, .75))" delay=".7s" />
        <Circle top="calc(50% - 1vw)" left="calc(50% - 90vw)" size="250vw" gradient="linear-gradient(45deg, rgba(255,255,255, .75), rgba(0,0,0, .75))" delay=".5s" />
        <Logo className="Brackets">
          <Brackets className="arrow" />
        </Logo>
        
        <Slogan className="slogan">
          World Global <PS>and the most secure and efficient plugins!</PS>
        </Slogan>
        
        <Buttons className="btns">
          <Button className="btn primary">Contact</Button>
          <Button className="btn">Discord</Button>
        </Buttons>
        
        <Hill className="hill" />
      </Header>
      <Wrapper>
        <div style={{ paddingTop: '6rem', textAlign: 'center' }}>
          <h1>Our Minecraft Plugins</h1>
          <p>Discover our amazing collection of Minecraft plugins designed to enhance your gaming experience.</p>
        </div>
        <Layout>
          <Main>
            {/* Removed GlowWrapper components */}
          </Main>
        </Layout>

        <BannerSection>
          <Container>
            <BannerText>
              <h1>Optimize</h1>
              <p>
                <strong>We make it easy to maximize your gaming experience.</strong> Our plugins provide robust features to enhance your server's performance and ensure seamless gameplay for all users.
              </p>
              <button>Get Started</button>
            </BannerText>
          </Container>
          <BannerImage src="https://preview.ibb.co/bMi5Y6/banner_img.png" alt="monitoring" />
        </BannerSection>

        <Container>
          <Row>
            <Card>
              <CardIcon src="https://image.ibb.co/cFV8mR/monitoring.png" alt="monitoring" />
              <CardTitle>SimpleGold</CardTitle>
              <CardText>Efficient gold management to keep your economy balanced and fair for all players on your server.</CardText>
              <CardLink href="https://www.spigotmc.org/resources/simple-gold-1-20-1-21-vault-towny.115987/">Learn more</CardLink>
            </Card>
            <Card>
              <CardIcon src="https://image.ibb.co/jfmg6R/cloud_firewalls.png" alt="cloud firewalls" />
              <CardTitle>Bakteria Staff Plugin</CardTitle>
              <CardText>Monitor staff activities and ensure a healthy and productive server environment. We give you all the tools your staff member need!</CardText>
              <CardLink href="https://www.spigotmc.org/resources/bakteria-staff-moderation-plugin-1-8-1-21.117394/">Learn more</CardLink>
            </Card>
            <Card>
              <CardIcon src="https://image.ibb.co/fcnzt6/team_management.png" alt="team management" />
              <CardTitle>Asfaltios Basic</CardTitle>
              <CardText>Basic tools to get your server up and running with essential features and easy management.</CardText>
              <CardLink href="#">Coming soon!</CardLink>
            </Card>
            <Card>
              <CardIcon src="https://image.ibb.co/evyiLm/backups.png" alt="backups" />
              <CardTitle>AutoBackup</CardTitle>
              <CardText>Automatic backups to ensure your server data is always secure and can be restored easily.</CardText>
              <CardLink href="#">Coming soon!</CardLink>
            </Card>
            <Card>
              <CardIcon src="https://image.ibb.co/g9bERR/snapshots.png" alt="snapshots" />
              <CardTitle>Asfaltios AFK</CardTitle>
              <CardText>Stops automated systems when players go AFK, preventing unfair AFK farming in Minecraft.</CardText>
              <CardLink href="#">Coming soon!</CardLink>
            </Card>
            <Card>
              <CardIcon src="https://image.ibb.co/cFV8mR/monitoring.png" alt="monitoring" />
              <CardTitle>Asfaltios Firewall</CardTitle>
              <CardText>Comprehensive security features to protect your server from threats and unauthorized access.</CardText>
              <CardLink href="#">Coming soon!</CardLink>
            </Card>
          </Row>
        </Container>
      </Wrapper>
      <br />
      <br />

    </>
  );
};

const BannerSection = styled.section`
  height: auto;
  margin: 32px 0;
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
  z-index: 1;

  @media (min-width: 768px) {
    height: 450px;
    margin-bottom: 32px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
`;

const BannerText = styled.div`
  max-width: 550px;
  float: left;

  h1 {
    color: #00106a;
    font-size: 3rem;
    font-weight: 700;
    letter-spacing: 3px;
    margin-bottom: 1rem;
  }

  p {
    color: #00106a;
    font-size: 1.05rem;
    line-height: 1.75;
  }

  button {
    border: 0;
    border-radius: 50px;
    padding: .75rem 2.75rem;
    background: #4b71ff;
    color: #ffffff;
    box-shadow: 0 .5rem 1.5rem rgba(0,0,0,.25);
    cursor: pointer;
    position: relative;
    font-size: 1rem;
    font-weight: 400;
    letter-spacing: 1px;
    transition: all 0.3s ease-in-out;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 1rem 1.5rem rgba(0,0,0,.25);
    }
  }
`;

const BannerImage = styled.img`
  position: absolute;
  opacity: .25;
  left: 76%;
  top: 0;
  height: 300px;
  z-index: -1;
  filter: drop-shadow(0 3rem 0.05rem rgba(191, 216, 255, 1));

  @media (min-width: 768px) {
    display: inherit;
    height: 400px;
    top: 0;
    opacity: 0.5;
  }

  @media (min-width: 992px) {
    height: 500px;
    top: -50px;
    opacity: 1;
  }
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -16px;
`;

const Card = styled.div`
  padding: 16px 24px;
  background: #ffffff;
  height: 100%;
  position: relative;
  border: none;
  box-shadow: 0 .5rem 1.5rem rgba(0,0,0,.15);
  border: 2px solid transparent;
  transition: all 0.3s ease-in-out;
  z-index: 10;
  flex: 0 0 calc(33.333% - 32px);
  margin: 16px;

  &:hover {
    transform: translateY(-15px);
    box-shadow: 0 1rem 1.5rem rgba(0,0,0,.15);
    cursor: pointer;
  }
`;

const CardIcon = styled.img`
  width: 60px;
  margin-bottom: 8px;
  position: relative;
  top: 0;
  left: -12px;
`;

const CardTitle = styled.h3`
  font-weight: 700;
  font-size: 1.3rem;
  color: #00106a;
`;

const CardText = styled.p`
  color: #989dc5;
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 72px;
`;

const CardLink = styled.a`
  position: absolute;
  bottom: 18px;
  color: #4b71ff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default PluginsList;
