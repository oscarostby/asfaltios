import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import logo from '../bilder/logo2.png';
import logoMobile from '../bilder/logo3.png';

import bg from '../bilder/bg3.png';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;

  @media (max-width: 768px) {
    background-color: #fff;
  }
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    background-color: transparent;
    box-shadow: none;
    padding: 20px;
  }
`;

const Input = styled.input`
  margin: 10px;
  padding: 8px;
  width: 300px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  outline: none;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, 0.2);
  border: 2px solid black;
  color: white;
  border: none;
  border-radius: 2px;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const Feedback = styled.div`
  margin-top: 10px;
  color: red;
  font-size: 0.9rem;
`;

const Logo = styled.img`
  width: 200px;
  height: auto;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    content: url(${logoMobile});
    width: 150px;
  }
`;

const Title = styled.h2`
  color: white;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    color: black;
  }
`;

const Login = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [feedback, setFeedback] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://api.asfaltios.com/login', loginData);
      if (response && response.data && response.data.userId) {
        // Store the user ID in a cookie upon successful login
        document.cookie = `userId=${response.data.userId}`;
        setFeedback('Login successful');
        // Redirect to '/'
        window.location.href = '/';
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

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  return (
    <Container>
      <BackgroundImage />
      <Form onSubmit={handleLoginSubmit}>
        <Logo src={logo} alt="Logo" />
        <Title>Login</Title>
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
    </Container>
  );
};

export default Login;
