import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Label = styled.label`
  margin: 10px 0 5px;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007BFF;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const UploadMessage = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/message', { newMessage: message });
      alert('Message uploaded successfully');
    } catch (error) {
      console.error('Error uploading message:', error);
      alert('Failed to upload message');
    }
  };

  return (
    <UploadContainer>
      <h2>Upload Message</h2>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="message">Message</Label>
        <Input
          type="text"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="submit">Upload</Button>
      </Form>
    </UploadContainer>
  );
};

export default UploadMessage;
