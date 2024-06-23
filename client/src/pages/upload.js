import React, { useState } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';

const UploadPageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: radial-gradient(ellipse at center, #1a1a1a 0%, #000000 100%);
  border-radius: 8px;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.5);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      ellipse at center,
      rgba(255, 255, 255, 0.2) 0%,
      rgba(255, 255, 255, 0) 70%
    );
  }
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const UploadForm = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background: linear-gradient(45deg, #ff00ff, #00ffff);
    border-radius: 8px;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  &:focus-within::before {
    opacity: 0.2;
  }
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #fff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
`;

const Input = styled.input`
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  transition: box-shadow 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
  }
`;

const Textarea = styled(Input).attrs({ as: 'textarea' })`
  resize: vertical;
  min-height: 100px;
`;

const Select = styled.select`
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  transition: box-shadow 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
  }
`;

const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      ellipse at center,
      rgba(255, 255, 255, 0.2) 0%,
      rgba(255, 255, 255, 0) 70%
    );
    animation: ${rotate} 10s infinite linear;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    background-color: #0056b3;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);

    &::before {
      opacity: 1;
    }
  }
`;

const MessageContainer = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: ${(props) => (props.success ? '#d4edda' : '#f8d7da')};
  color: ${(props) => (props.success ? '#155724' : '#721c24')};
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background: linear-gradient(45deg, #ff00ff, #00ffff);
    border-radius: 8px;
    opacity: 0.2;
    z-index: -1;
  }
`;

const UploadPage = () => {
  const [title, setTitle] = useState('');
  const [mainText, setMainText] = useState('');
  const [iconImageUrl, setIconImageUrl] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [pluginType, setPluginType] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('mainText', mainText);
      formData.append('iconImageUrl', iconImageUrl);
      formData.append('pluginType', pluginType);
      formData.append('file', fileUrl); // Append file

      const response = await axios.post('https://api.asfaltios.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.status === 200) {
        setMessage('Item uploaded successfully');
        setIsSuccess(true);
      } else {
        setMessage('Failed to upload item');
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage('An error occurred while uploading the item');
      setIsSuccess(false);
      console.error(error);
    }
  };

  return (
    <UploadPageContainer>
      <h2>Galactic Upload Portal</h2>
      <UploadForm onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Title:</Label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Main Text:</Label>
          <Textarea
            value={mainText}
            onChange={(e) => setMainText(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Icon Image URL:</Label>
          <Input
            type="text"
            value={iconImageUrl}
            onChange={(e) => setIconImageUrl(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>File Upload:</Label>
          <Input
            type="file"
            onChange={(e) => setFileUrl(e.target.files[0])}
            accept=".zip, .rar" // Specify accepted file types if needed
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="pluginType">Plugin Type:</Label>
          <Select
            id="pluginType"
            value={pluginType}
            onChange={(e) => setPluginType(e.target.value)}
            required
          >
            <option value="">Select a type</option>
            <option value="survival">Survival</option>
            <option value="economy">Economy</option>
            <option value="packages">Packages</option>
            <option value="security">Security</option>
          </Select>
        </FormGroup>
        <SubmitButton type="submit">Launch Into Orbit</SubmitButton>
      </UploadForm>
      {message && (
        <MessageContainer success={isSuccess}>{message}</MessageContainer>
      )}
    </UploadPageContainer>
  );
};

export default UploadPage;
