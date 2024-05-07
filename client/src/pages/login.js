import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import bgImage from '../bilder/bg.jpg';
import bgslid from '../bilder/bg.jpg';

const slideAnimation = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(100% - 20px));
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(${bgImage});
  background-size: cover;
`;

const Commode = styled.div`
  width: 70vw;
  height: 70vh;
  background-color: transparent;
  position: relative;
  display: flex;
`;

const Slide = styled.div`
  width: 50%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BlurredBackground = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  position: absolute;
  top: 0;
  left: 0;
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.3);
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
`;

const LeftSlide = styled(Slide)`
  left: 0;
`;

const RightSlide = styled(Slide)`
  right: 0;
`;

const CoverContainer = styled.div`
  width: calc(50% - 40px);
  height: 100%;
  position: absolute;
  background-image: url(${bgslid});
  background-size: cover;
  z-index: 1;
  transition: transform 0.5s, text-align 0.5s;
  transform: translateX(${props => props.active ? '0%' : '100%'});
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${props => props.active ? 'flex-end' : 'flex-start'};
  padding: 0 20px;
  overflow: hidden;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
  font-family: 'Arial', sans-serif;
`;

const MainText = styled.span`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: white;
`;

const SmallTextRight = styled.span`
  font-size: 1.2rem;
  color: white;
`;

const DoorButton = styled.button`
  position: absolute;
  bottom: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  transition: border-color 0.3s ease, background-color 0.3s ease;
`;

const LeftDoorButton = styled(DoorButton)`
  left: 20px;
  border: 2px solid white;
  background-color: white;
  color: black;

  &:hover {
    border: 2px solid white;
    color: white;
    background-color: rgba(255, 255, 255, 0);
  }
`;

const RightDoorButton = styled(DoorButton)`
  right: 20px;
  border: 2px solid white;
  background-color: white;
  color: black;

  &:hover {
    border: 2px solid white;
    color: white;
    background-color: rgba(255, 255, 255, 0);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  margin: 10px;
  padding: 5px 0;
  width: 200px;
  border: none;
  border-bottom: 1px solid white;
  background: transparent;
  color: white;
  font-size: 1rem;
  outline: none;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  background-color: white;
  color: black;
  border: 2px solid white;
  cursor: pointer;
  transition: border-color 0.3s ease, background-color 0.3s ease;

  &:hover {
    border: 2px solid white;
    color: white;
    background-color: rgba(255, 255, 255, 0);
  }
`;

const Feedback = styled.div`
  margin-top: 10px;
  color: red;
  font-size: 0.9rem;
`;

const App = () => {
  const [activeSlide, setActiveSlide] = useState('register');
  const [registerData, setRegisterData] = useState({ username: '', password: '', confirmPassword: '' });
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [feedback, setFeedback] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState('');

  useEffect(() => {
    const isLoggedInFromStorage = localStorage.getItem('isLoggedIn');
    const usernameFromStorage = localStorage.getItem('username');

    if (isLoggedInFromStorage === 'true' && usernameFromStorage) {
      setIsLoggedIn(true);
      setLoggedInUsername(usernameFromStorage);
      console.log(`User: ${usernameFromStorage}`);
    } else {
      console.log('User not logged in');
    }
  }, []);

  const toggleSlide = () => {
    setActiveSlide(activeSlide === 'register' ? 'login' : 'register');
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/register', registerData);
      if (response && response.data && response.data.message) {
        setFeedback(response.data.message);
        setIsLoggedIn(true);
        setLoggedInUsername(registerData.username);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', registerData.username);
        console.log(`User: ${registerData.username}`);
      } else {
        setFeedback('Unexpected response from server');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setFeedback(error.response.data.error);
      } else {
        setFeedback('An error occurred while processing your request');
      }
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', loginData);
      if (response && response.data && response.data.message) {
        setFeedback(response.data.message);
        setIsLoggedIn(true);
        setLoggedInUsername(loginData.username);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', loginData.username);
        console.log(`User: ${loginData.username}`);
      } else {
        setFeedback('Unexpected response from server');
      }
    } catch (error){
      if (error.response && error.response.data && error.response.data.error) {
      setFeedback(error.response.data.error);
      } else {
      setFeedback('An error occurred while processing your request');
      }
      }
      };
      
      const handleRegisterInputChange = (e) => {
      const { name, value } = e.target;
      setRegisterData({ ...registerData, [name]: value });
      };
      
      const handleLoginInputChange = (e) => {
      const { name, value } = e.target;
      setLoginData({ ...loginData, [name]: value });
      };
      
      return (
      <Container>
      <Commode>
      <LeftSlide active={activeSlide === 'register'}>
      <BlurredBackground />
      <Content>
      <Form onSubmit={handleRegisterSubmit}>
      <Input
                   type="text"
                   name="username"
                   placeholder="Username"
                   value={registerData.username}
                   onChange={handleRegisterInputChange}
                 />
      <Input
                   type="password"
                   name="password"
                   placeholder="Password"
                   value={registerData.password}
                   onChange={handleRegisterInputChange}
                 />
      <Input
                   type="password"
                   name="confirmPassword"
                   placeholder="Confirm Password"
                   value={registerData.confirmPassword}
                   onChange={handleRegisterInputChange}
                 />
      <Button type="submit">Register</Button>
      {feedback && <Feedback>{feedback}</Feedback>}
      </Form>
      </Content>
      </LeftSlide>
      <RightSlide active={activeSlide === 'login'}>
      <BlurredBackground />
      <Content>
      <Form onSubmit={handleLoginSubmit}>
      <Input
                   type="text"
                   name="username"
                   placeholder="Username"
                   value={loginData.username}
                   onChange={handleLoginInputChange}
                 />
      <Input
                   type="password"
                   name="password"
                   placeholder="Password"
                   value={loginData.password}
                   onChange={handleLoginInputChange}
                 />
      <Button type="submit">Login</Button>
      {feedback && <Feedback>{feedback}</Feedback>}
      </Form>
      </Content>
      </RightSlide>
      <CoverContainer active={activeSlide === 'register'}>
      <MainText>{activeSlide === 'register' ? 'Login' : 'Register'} to start downloading plugins on</MainText>
      <MainText>Asfaltios</MainText>
      <SmallTextRight>Your secure solution </SmallTextRight>/
      </CoverContainer>
      <LeftDoorButton onClick={toggleSlide}>Have an account?</LeftDoorButton>
      <RightDoorButton onClick={toggleSlide}>Don't have an account?</RightDoorButton>
      </Commode>
      </Container>
      );
      };
      
      export default App;