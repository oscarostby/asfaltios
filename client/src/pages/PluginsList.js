import React from 'react';
import styled, { keyframes } from 'styled-components';
import HeaderComponent from '../components/header';

// Keyframes for bakgrunnsanimasjon
const bgAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Keyframes for tekstanimasjon
const animGravity = keyframes`
  0% { transform: translateY(-26px); opacity: 0; }
  30%, 80% { letter-spacing: 40px; padding-left: 40px; transform: translateY(0px); opacity: 1; }
`;

const Title = styled.div`
  position: absolute;
  font-weight: 700; /* Gjør teksten tykkere */
  top: 30%; /* Plassert øverst på skjermen */
  left: 0;
  right: 0;
  margin-top: -80px;
  font-size: 130px;
  text-align: center;
  letter-spacing: 20px;
  padding-left: 20px;
  background: linear-gradient(120deg, #00A4D8, #FFFFFF, #00203F); /* Justert gradient for bedre samsvar */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${animGravity} 6s ease forwards;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  position: relative;
  padding-top: 20px;
  background: linear-gradient(120deg, #00203F, #4A75A8, #00A4D8); /* Gradient bakgrunn */
  background-size: 200% 200%;
  animation: ${bgAnimation} 10s ease infinite; /* Animert gradient */
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  position: absolute;
  bottom: 20px;
  width: 90%;
  left: 50%;
  transform: translateX(-50%);
`;

const TopImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  position: absolute;
  bottom: 380px; /* Justert for å gi mer plass til større bilder */
  width: 90%;
  left: 50%;
  transform: translateX(-50%);
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px; /* Økt høyde for betydelig større bilder */
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const GoldText = styled.div`
  font-size: 18px;
  color: #FFD700; /* Gullfarge */
  margin-bottom: 10px;
  font-weight: 700;
  text-shadow: 1px 1px 5px rgba(255, 215, 0, 0.6); /* Skinnende effekt */
`;

const SecurityText = styled.div`
  font-size: 18px;
  color: #4CAF50; /* Grønn farge som symboliserer sikkerhet */
  margin-bottom: 10px;
  font-weight: 700;
  text-transform: uppercase; /* Gjør teksten mer robust og solid */
  letter-spacing: 1px; /* Litt mer avstand mellom bokstavene */
`;

const PluginList = () => {
  return (
    <Container>
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
          <Button className="btn">Contact</Button>
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
              <CardIcon src="https://i.ibb.co/rdLyxmf/3dgif-Simplegold.gif" alt="monitoring" />
              <CardTitle>SimpleGold</CardTitle>
              <CardText>Efficient gold management to keep your economy balanced and fair for all players on your server.</CardText>
              <CardLink href="https://www.spigotmc.org/resources/simple-gold-1-20-1-21-vault-towny.115987/">Learn more</CardLink>
            </Card>
            <Card>
              <CardIcon src="https://i.ibb.co/V9wby5w/3dgifmaker37576.gif" alt="cloud firewalls" />
              <CardTitle>Bakteria Staff Plugin</CardTitle>
              <CardText>Monitor staff activities and ensure a healthy and productive server environment. We give you all the tools your staff member need!</CardText>
              <CardLink href="https://asfaltios.vercel.app/bakteriainfo">Learn more</CardLink>
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
=======
      <Title>PLUGINS</Title>
      <TopImageGrid>
        <ImageWrapper>
          <GoldText>Test 1</GoldText>
          <Image src="https://i.ibb.co/WyKFSH5/3dgif-Simplegold.gif" alt="image 1" />
        </ImageWrapper>
        <ImageWrapper>
          <SecurityText>Test 2</SecurityText>
          <Image src="https://i.ibb.co/WyKFSH5/3dgif-Simplegold.gif" alt="image 2" />
        </ImageWrapper>
        <ImageWrapper>
          <GoldText>Test 1</GoldText>
          <Image src="https://i.ibb.co/WyKFSH5/3dgif-Simplegold.gif" alt="image 3" />
        </ImageWrapper>
        <ImageWrapper>
          <SecurityText>Test 2</SecurityText>
          <Image src="https://i.ibb.co/WyKFSH5/3dgif-Simplegold.gif" alt="image 4" />
        </ImageWrapper>
      </TopImageGrid>
      <ImageGrid>
        <ImageWrapper>
          <Image src="https://i.ibb.co/hBh3kf7/DALL-E-2024-08-28-12-58-58-A-Minecraft-character-with-a-blocky-appearance-facing-directly-towards-th.png" alt="image 5" />
        </ImageWrapper>
        <ImageWrapper>
          <Image src="https://i.ibb.co/hBh3kf7/DALL-E-2024-08-28-12-58-58-A-Minecraft-character-with-a-blocky-appearance-facing-directly-towards-th.png" alt="image 6" />
        </ImageWrapper>
        <ImageWrapper>
          <Image src="https://i.ibb.co/hBh3kf7/DALL-E-2024-08-28-12-58-58-A-Minecraft-character-with-a-blocky-appearance-facing-directly-towards-th.png" alt="image 7" />
        </ImageWrapper>
        <ImageWrapper>
          <Image src="https://i.ibb.co/hBh3kf7/DALL-E-2024-08-28-12-58-58-A-Minecraft-character-with-a-blocky-appearance-facing-directly-towards-th.png" alt="image 8" />
        </ImageWrapper>
      </ImageGrid>
    </Container>
  );
};

export default PluginList;
