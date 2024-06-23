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
  margin-bottom: 5rem;
`;

const Header = styled.header`
  position: relative;
  padding-top: 9.5rem;
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
  margin: 0 auto 3.5rem;
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
  background-color: rgba(0,0,0,.1);
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

const Product = styled.article`
  --base: ${props => props.base || 80};
  --spread: ${props => props.spread || 500};
  --outer: ${props => props.outer || 1};
  aspect-ratio: 3 / 4;
  border-radius: 14px;
  width: 260px;
  position: relative;
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: 0 1rem 2rem -1rem black;
  padding: 1rem;
  border: 1px solid hsl(0 0% 100% / 0.15);
  backdrop-filter: blur(5px);
  background: ${props => `url(${props.bgImage}) no-repeat center center/cover`};
  color: white;
  touch-action: none;
`;

const ProductTitle = styled.h3`
  color: #fff;
  line-height: 1.35;
`;

const GlowWrapper = styled.div`
  --border-size: 3px;
  --spotlight-size: 200px;
  --hue: calc(var(--base) + (var(--xp, 0) * var(--spread, 0)));
  background-image: radial-gradient(
    var(--spotlight-size) var(--spotlight-size) at
    calc(var(--x, 0) * 1px)
    calc(var(--y, 0) * 1px),
    hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / 0.1), transparent
  );
  background-color: transparent;
  background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
  background-position: 50% 50%;
  background-attachment: fixed;
  border: var(--border-size) solid var(--backup-border);
  position: relative;
  touch-action: none;
  border-radius: 14px;
`;

const GlowBefore = styled.div`
  content: "";
  position: absolute;
  inset: calc(var(--border-size) * -1);
  border: var(--border-size) solid transparent;
  border-radius: 14px;
  background-attachment: fixed;
  background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
  background-repeat: no-repeat;
  background-position: 50% 50%;
  mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
  mask-clip: padding-box, border-box;
  mask-composite: intersect;
  background-image: radial-gradient(
    calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
    calc(var(--x, 0) * 1px)
    calc(var(--y, 0) * 1px),
    hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 50) * 1%) / 1), transparent 100%
  );
  filter: brightness(2);
`;

const GlowAfter = styled.div`
  content: "";
  position: absolute;
  inset: calc(var(--border-size) * -1);
  border: var(--border-size) solid transparent;
  border-radius: 14px;
  background-attachment: fixed;
  background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
  background-repeat: no-repeat;
  background-position: 50% 50%;
  mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
  mask-clip: padding-box, border-box;
  mask-composite: intersect;
  background-image: radial-gradient(
    calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
    calc(var(--x, 0) * 1px)
    calc(var(--y, 0) * 1px),
    hsl(0 100% 100% / 1), transparent 100%
  );
`;

const GlowButton = styled.button`
  padding: 0.75rem 2rem;
  align-self: end;
  color: hsl(0 0% 100%);
  background: rgba(0, 0, 0, 0.5); /* Halvtransparent sort bakgrunn for kontrast */
  border: 2px solid hsl(0 0% 100%); /* Hvit kantlinje for å fremheve knappen */
  border-radius: 0.5rem; /* Gjør hjørnene litt avrundet */
  cursor: pointer;
  transition: background 0.3s ease, border-color 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.7); /* Mørkere bakgrunn ved hover for bedre visuell tilbakemelding */
    border-color: hsl(0 0% 80%); /* Litt mørkere kantlinje ved hover */
  }

  & span {
    font-weight: bold;
    background-image: radial-gradient(
      var(--spotlight-size) var(--spotlight-size) at
      calc(var(--x, 0) * 1px)
      calc(var(--y, 0) * 1px),
      hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / 1), transparent
    );
    background-color: var(--backdrop, transparent);
    background-position: 50% 50%;
    background-clip: text;
    filter: brightness(1.5);
  }
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
            <GlowWrapper data-glow>
              <Product bgImage="https://static.vecteezy.com/system/resources/previews/002/184/738/non_2x/polygon-black-gold-background-free-vector.jpg">
                <GlowBefore />
                <GlowAfter />
                <ProductTitle>SimpleGold</ProductTitle>
                <p>A simple and efficient gold management plugin.</p>
                <GlowButton data-glow>
                  <span>Download</span>
                </GlowButton>
              </Product>
            </GlowWrapper>
            <GlowWrapper data-glow>
              <Product base={220} spread={200} bgImage="https://static.vecteezy.com/system/resources/thumbnails/003/127/954/small_2x/abstract-template-blue-background-white-squares-free-vector.jpg">
                <GlowBefore />
                <GlowAfter />
                <ProductTitle>Asfaltios staff</ProductTitle>
                <p>Manage your staff effectively with this plugin.</p>
                <GlowButton data-glow>
                  <span>Buy for $15</span>
                </GlowButton>
              </Product>
            </GlowWrapper>
            <GlowWrapper data-glow>
              <Product bgImage="https://static.vecteezy.com/system/resources/previews/004/447/761/non_2x/abstract-red-fluid-wave-background-free-vector.jpg">
                <GlowBefore />
                <GlowAfter />
                <ProductTitle>Asfltios Firewall</ProductTitle>
                <p>Enhance your Minecraft experience with unique features.</p>
                <GlowButton data-glow>
                  <span>Buy for $12</span>
                </GlowButton>
              </Product>
            </GlowWrapper>
          </Main>
        </Layout>
      </Wrapper>
      <br></br>
      <br></br>

    </>
  );
};

export default PluginsList;
