import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaUpload, FaImage, FaLink } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to right, #007bff, #00c6ff);
`;

const Card = styled.div`
  background-color: white;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 12px 18px rgba(0, 0, 0, 0.2);
  width: 600px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: #007bff;
  font-size: 3rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 1rem;
  color: #555;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Input = styled.input`
  padding: 1.2rem;
  border: 3px solid #ccc;
  border-radius: 8px;
  font-size: 1.2rem;
  transition: border-color 0.3s ease;
  background-color: #f5f5f5;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Textarea = styled.textarea`
  padding: 1.2rem;
  border: 3px solid #ccc;
  border-radius: 8px;
  resize: vertical;
  font-size: 1.2rem;
  transition: border-color 0.3s ease;
  background-color: #f5f5f5;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 1.2rem 2.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.4rem;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #0056b3;
  }
`;

const UploadIcon = styled(FaUpload)`
  font-size: 1.8rem;
`;

const ImageIcon = styled(FaImage)`
  font-size: 1.5rem;
`;

const LinkIcon = styled(FaLink)`
  font-size: 1.5rem;
`;

function Upload() {
  const [title, setTitle] = useState('');
  const [mainText, setMainText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [downloadLink, setDownloadLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/upload', {
        title,
        mainText,
        imageUrl,
        downloadLink,
      });
      alert('Item uploaded successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to upload item');
    }
  };

  return (
    <Container>
      <Card>
        <Title>Upload Page</Title>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>
              Title:
              <ImageIcon />
            </Label>
            <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </InputGroup>
          <InputGroup>
            <Label>
              Main Text:
              <ImageIcon />
            </Label>
            <Textarea value={mainText} onChange={(e) => setMainText(e.target.value)} />
          </InputGroup>
          <InputGroup>
            <Label>
              Image URL:
              <ImageIcon />
            </Label>
            <Input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
          </InputGroup>
          <InputGroup>
            <Label>
              Download Link:
              <LinkIcon />
            </Label>
            <Input type="text" value={downloadLink} onChange={(e) => setDownloadLink(e.target.value)} />
          </InputGroup>
          <SubmitButton type="submit">
            <UploadIcon />
            Upload
          </SubmitButton>
        </Form>
      </Card>
    </Container>
  );
}

export default Upload;
