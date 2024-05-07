import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  margin: 10px;
  padding: 8px;
  width: 250px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  outline: none;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Feedback = styled.div`
  margin-top: 10px;
  color: red;
  font-size: 0.9rem;
`;

const Login = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [feedback, setFeedback] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', loginData);
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
    </Container>
  );
};

export default Login;

