// src/components/PluginsList.js
import React from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components'; // Import createGlobalStyle
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
  padding-top: 6.5rem;
  background: linear-gradient(#e8eef2, #d3dde4);
  overflow: hidden;
  margin-top: -20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Logo = styled.div`
  position: relative;
  width: 100px; /* Adjust size as needed */
  height: 100px; /* Adjust size as needed */
`;

const Brackets = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  font-size: 18px;
  color: black; /* Make characters black */
  opacity: 0;
  transform: scale(1.7);
  animation: ${fadeContent} .5s 2.2s cubic-bezier(.2,1,.2,1) forwards;

  &::before,
  &::after {
    content: '「」';
    position: absolute;
    top: 30%;
    left: 50%;
    font-size: 5em; /* Make characters bigger */
    font-weight: bold; /* Make characters bolder */
    transform: translate(-50%, -50%);
  }
`;

const Slogan = styled.h2`
  max-width: 630px;
  margin: 0 auto 3.5rem;
  color: #000;
  font: 100 26px / 1.5 sans-serif;
  text-shadow: 0 1px 1px rgba(0,0,0,.2);
  text-transform: capitalize;
  opacity: 0;
  transform: perspective(800px) rotateX(-60deg) translateY(50px);
  animation: ${fadeContent} .85s 2.1s cubic-bezier(.2,1,.2,1) forwards;
`;

const PS = styled.span`
  color: #000;
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
  opacity: 0;
  transform: perspective(800px) rotateX(-50deg) translateY(30px);
  animation: ${fadeContent} .7s 2.2s forwards;

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
`;

const Layout = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 240px;
`;

const Main = styled.main`
  display: grid;
  grid-auto-flow: dense;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr));
  grid-auto-rows: auto;
  container-type: inline-size;
`;

const Product = styled.div`
  --_padding: 1rem;
  display: grid;
  gap: 1rem;
  background: #000; // Set to black
  border-radius: 0.5rem;
  overflow: hidden;
  color: #fff; // Set content color to white

  > img {
    width: 100%;
    height: auto;
    max-height: 180px; // Ensure the entire image fits well
    object-fit: cover;
  }

  > :not(img) {
    margin-inline: var(--_padding);
  }

  > :last-child:not(img) {
    margin-block-end: var(--_padding);
  }
`;

const ProductTitle = styled.h3`
  color: #fff; // Set to white
  line-height: 1.35;
`;

const ProductPrice = styled.p`
  line-height: 1;

  span {
    display: block;
    font-size: 1.5rem;
    color: #ff6347;
    font-weight: 900;
  }
`;

const FeaturedProduct = styled(Product)`
  @container (min-width: 850px) {
    grid-column: span 2;

    > img {
      height: auto;
      max-height: 250px; // Ensure the entire image fits well
    }

    > .product__title {
      font-size: 2rem;
    }

    .product__description {
      display: block;
      margin-bottom: var(--_padding);
    }
  }

  @container (min-width: 1000px) {
    grid-column: span 3;

    .product__description {
      grid-column: span 2;
    }
  }
`;

const Aside = styled.aside`
  padding: 1rem;
  border-radius: 0.5rem;
  background: #1a1a1a; // Dark gray
  color: #f0f0f0; // Light gray
`;

const VideoButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75em 1.5em;
  margin-top: 2rem;
  font-size: 1rem;
  font-weight: 700;
  color: #000;
  background-color: #fff;
  border: 2px solid #000;
  border-radius: 0.25em;
  text-decoration: none;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover,
  &:focus {
    background-color: #000;
    color: #fff;
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
  }

  * {
    margin: 0;
  }

  html {
    color-scheme: light;
  }

  body {
    font-family: system-ui;
    line-height: 1.7;
    background: #fff; // Set to white
    color: #000; // Set to black
    padding: 14rem 0; // Further increased padding to move content even further down
  }

  img {
    max-width: 100%;
    display: block;
  }

  h1,
  h2,
  h3 {
    color: #000; // Set to black
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

  .product__description {
    display: none;
  }
`;

const PluginsList = () => {
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
        <div style={{ paddingTop: '6rem', textAlign: 'center' }}> {/* Added padding to move content down */}
          <h1>Our Minecraft Plugins</h1>
          <p>Discover our amazing collection of Minecraft plugins designed to enhance your gaming experience.</p>
        </div>
        <Layout>
          <Main>
            <Product>
              <img src="https://i.ibb.co/VxkDf2q/simplegold-logo.png" alt="SimpleGold Plugin" />
              <ProductTitle>SimpleGold</ProductTitle>
              <div className="flex-group space-between v-center">
                <ProductPrice>From <span>$FREE</span></ProductPrice>
                <Button data-type="outline">Download</Button>
              </div>
            </Product>
            <Product>
              <img src="https://i.ibb.co/5vJqzfs/staff.png" alt="Plugin Two" />
              <ProductTitle>Asfaltios staff</ProductTitle>
              <div className="flex-group space-between v-center">
                <ProductPrice>From <span>$15</span></ProductPrice>
                <Button data-type="outline">Buy</Button>
              </div>
            </Product>
            <Product>
              <img src="https://example.com/plugin-image3.jpg" alt="Plugin Three" />
              <ProductTitle>Plugin Three</ProductTitle>
              <div className="flex-group space-between v-center">
                <ProductPrice>From <span>$12</span></ProductPrice>
                <Button data-type="outline">Buy</Button>
              </div>
            </Product>
            <Product>
              <img src="https://example.com/plugin-image4.jpg" alt="Plugin Four" />
              <ProductTitle>Plugin Four</ProductTitle>
              <div className="flex-group space-between v-center">
                <ProductPrice>From <span>$8</span></ProductPrice>
                <Button data-type="outline">Buy</Button>
              </div>
            </Product>
            <FeaturedProduct data-featured="true">
              <img src="https://i.ibb.co/DwcN4Xm/Firewall.png" alt="Featured Plugin" />
              <ProductTitle>Featured Plugin</ProductTitle>
              <p className="product__description">
                This is our featured Minecraft plugin, offering unique features and amazing gameplay enhancements.
              </p>
              <div className="flex-group space-between v-center">
                <ProductPrice>From <span>$20</span></ProductPrice>
                <Button data-type="outline">Buy</Button>
              </div>
            </FeaturedProduct>
            <Product>
              <img src="https://example.com/plugin-image5.jpg" alt="Plugin Five" />
              <ProductTitle>Plugin Five</ProductTitle>
              <div className="flex-group space-between v-center">
                <ProductPrice>From <span>$10</span></ProductPrice>
                <Button data-type="outline">Buy</Button>
              </div>
            </Product>
            <Product>
              <img src="https://example.com/plugin-image6.jpg" alt="Plugin Six" />
              <ProductTitle>Plugin Six</ProductTitle>
              <div className="flex-group space-between v-center">
                <ProductPrice>From <span>$12</span></ProductPrice>
                <Button data-type="outline">Buy</Button>
              </div>
            </Product>
            <Product>
              <img src="https://example.com/plugin-image7.jpg" alt="Plugin Seven" />
              <ProductTitle>Plugin Seven</ProductTitle>
              <div className="flex-group space-between v-center">
                <ProductPrice>From <span>$14</span></ProductPrice>
                <Button data-type="outline">Buy</Button>
              </div>
            </Product>
          </Main>
          <Aside>
            <h2>Enhance Your Minecraft Experience</h2>
            <p>Our plugins provide a variety of features to make your Minecraft adventures more exciting and fun.</p>
          </Aside>
        </Layout>
        <VideoButton href="https://youtu.be/pKHKQwAsZLI">
          Watch the tutorial
        </VideoButton>
      </Wrapper>
    </>
  );
};

export default PluginsList;
