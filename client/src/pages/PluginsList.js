// src/components/PluginsList.js
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components'; // Import createGlobalStyle
import HeaderComponent from '../components/header';

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
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr));
  grid-auto-rows: 120px auto auto;
  container-type: inline-size;
`;

const Product = styled.div`
  --_padding: 1rem;
  grid-row: span 3;
  display: grid;
  grid-template-rows: subgrid;
  gap: 1rem;
  background: var(--clr-primary-700);
  border-radius: 0.5rem;
  overflow: hidden;
  background: var(--clr-primary-100);
  color: var(--clr-primary-900);

  > img {
    width: 100%;
    height: 120px;
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
  color: var(--clr-primary-900);
  line-height: 1.35;
`;

const ProductPrice = styled.p`
  line-height: 1;

  span {
    display: block;
    font-size: 2rem;
    color: var(--clr-accent-500);
    font-weight: 900;
  }
`;

const Button = styled.button`
  font: inherit;
  line-height: 1;
  display: inline-flex;
  cursor: pointer;
  text-decoration: none;
  padding: 0.5em 1.25em 0.7em;
  border-radius: 0.25em;
  color: var(--button-color, var(--clr-primary-900));
  background: var(--clr-primary-100);
  border: 2px solid var(--clr-primary-900);

  &[data-type='outline'] {
    --button-color: var(--clr-accent-500);
    font-weight: 700;
    background: transparent;
    border: 2px solid var(--button-color);
  }

  &[data-type='outline']:hover,
  &[data-type='outline']:focus {
    background: var(--button-color);
    color: var(--clr-primary-100);
  }
`;

const FeaturedProduct = styled(Product)`
  @container (min-width: 850px) {
    grid-column: span 2;
    grid-template-columns: subgrid;

    > img {
      grid-column: 1 / -1;
    }

    > .product__title {
      font-size: 2rem;
      grid-column: 1 / -1;
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
  background: var(--clr-primary-100);
  color: var(--clr-primary-900);
`;

const VideoButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75em 1.5em;
  margin-top: 2rem;
  font-size: 1rem;
  font-weight: 700;
  color: var(--clr-primary-100);
  background-color: var(--clr-primary-900);
  border: 2px solid var(--clr-primary-100);
  border-radius: 0.25em;
  text-decoration: none;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover,
  &:focus {
    background-color: var(--clr-primary-100);
    color: var(--clr-primary-900);
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
    color-scheme: dark;
  }

  body {
    font-family: system-ui;
    line-height: 1.7;
    background: var(--clr-primary-900);
    color: var(--clr-primary-100);
    padding: 12rem 0; // Further increased padding to 12rem to move content even further down
  }

  img {
    max-width: 100%;
    display: block;
  }

  h1,
  h2,
  h3 {
    color: var(--clr-primary-100);
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
      <Wrapper>
        <h1>Our Minecraft Plugins</h1>
        <p>Discover our amazing collection of Minecraft plugins designed to enhance your gaming experience.</p>
        <Layout>
          <Main>
            <Product>
              <img src="https://i.ibb.co/VxkDf2q/simplegold-logo.png" alt="Example Plugin 1" />
              <ProductTitle>SimpleGold</ProductTitle>
              <div className="flex-group space-between v-center">
                <ProductPrice>From <span>$FREE</span></ProductPrice>
                <Button data-type="outline">Download</Button>
              </div>
            </Product>
            <Product>
              <img src="https://example.com/plugin-image2.jpg" alt="Example Plugin 2" />
              <ProductTitle>Plugin Two</ProductTitle>
              <div className="flex-group space-between v-center">
                <ProductPrice>From <span>$15</span></ProductPrice>
                <Button data-type="outline">Buy</Button>
              </div>
            </Product>
            <Product>
              <img src="https://example.com/plugin-image3.jpg" alt="Example Plugin 3" />
              <ProductTitle>Plugin Three</ProductTitle>
              <div className="flex-group space-between v-center">
                <ProductPrice>From <span>$12</span></ProductPrice>
                <Button data-type="outline">Buy</Button>
              </div>
            </Product>
            <Product>
              <img src="https://example.com/plugin-image4.jpg" alt="Example Plugin 4" />
              <ProductTitle>Plugin Four</ProductTitle>
              <div className="flex-group space-between v-center">
                <ProductPrice>From <span>$8</span></ProductPrice>
                <Button data-type="outline">Buy</Button>
              </div>
            </Product>
            <FeaturedProduct data-featured="true">
              <img src="https://example.com/featured-plugin-image.jpg" alt="Featured Plugin" />
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
              <img src="https://example.com/plugin-image5.jpg" alt="Example Plugin 5" />
              <ProductTitle>Plugin Five</ProductTitle>
              <div className="flex-group space-between v-center">
                <ProductPrice>From <span>$10</span></ProductPrice>
                <Button data-type="outline">Buy</Button>
              </div>
            </Product>
            <Product>
              <img src="https://example.com/plugin-image6.jpg" alt="Example Plugin 6" />
              <ProductTitle>Plugin Six</ProductTitle>
              <div className="flex-group space-between v-center">
                <ProductPrice>From <span>$12</span></ProductPrice>
                <Button data-type="outline">Buy</Button>
              </div>
            </Product>
            <Product>
              <img src="https://example.com/plugin-image7.jpg" alt="Example Plugin 7" />
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
