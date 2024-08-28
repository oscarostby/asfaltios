import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    background: #0f0f1f;
    color: #e0e0ff;
  }
`;

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(45deg, #0f0f1f, #1f1f3f);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
`;

const Header = styled.h1`
  font-size: 3rem;
  text-align: center;
  color: #50c8ff;
  margin-bottom: 2rem;
  text-shadow: 0 0 10px rgba(80, 200, 255, 0.5);
`;

const Card = styled.div`
  background: rgba(30, 30, 60, 0.7);
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  margin-bottom: 2rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 48px 0 rgba(31, 38, 135, 0.5);
  }
`;

const Form = styled.form`
  display: grid;
  gap: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  background: rgba(60, 60, 100, 0.5);
  color: #e0e0ff;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #50c8ff;
    background: rgba(80, 80, 120, 0.5);
  }
`;

const TextArea = styled(Input).attrs({ as: 'textarea' })`
  resize: vertical;
  min-height: 120px;
`;

const Select = styled.select`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  background: rgba(60, 60, 100, 0.5);
  color: #e0e0ff;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #50c8ff;
    background: rgba(80, 80, 120, 0.5);
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  background: linear-gradient(45deg, #50c8ff, #8080ff);
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(80, 200, 255, 0.5);
  }
`;

const PostList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const PostItem = styled.li`
  background: rgba(60, 60, 100, 0.5);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(80, 80, 120, 0.5);
  }
`;

const DeleteButton = styled(Button)`
  background: linear-gradient(45deg, #ff5050, #ff8080);
  padding: 0.5rem 1rem;
  font-size: 0.9rem;

  &:hover {
    background: linear-gradient(45deg, #ff6060, #ff9090);
  }
`;

const GalacticPortal = () => {
  const [title, setTitle] = useState('');
  const [mainText, setMainText] = useState('');
  const [iconImageUrl, setIconImageUrl] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [pluginType, setPluginType] = useState('');
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPosts();
  }, [searchTerm]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`https://api.asfaltios.com/list/${searchTerm || ' '}`);
      console.log('Fetched posts:', response.data);
      setPosts(response.data.items || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = {
        title,
        mainText,
        iconImageUrl,
        fileUrl,
      };

      console.log('Submitting post:', postData);

      const response = await axios.post('https://api.asfaltios.com/upload', postData);

      console.log('Upload response:', response.data);

      if (response.status === 200) {
        alert('Item uploaded successfully');
        setTitle('');
        setMainText('');
        setIconImageUrl('');
        setFileUrl('');
        setPluginType('');
        fetchPosts();
      }
    } catch (error) {
      console.error('Error uploading item:', error);
      alert('Failed to upload item');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://api.asfaltios.com/items/${id}`);
      fetchPosts();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Header>Galactic Upload Portal</Header>
        <Card>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <TextArea
              placeholder="Main Text"
              value={mainText}
              onChange={(e) => setMainText(e.target.value)}
              required
            />
            <Input
              type="url"
              placeholder="Icon Image URL"
              value={iconImageUrl}
              onChange={(e) => setIconImageUrl(e.target.value)}
              required
            />
            <Input
              type="text"
              placeholder="File URL"
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
              required
            />
            <Select
              value={pluginType}
              onChange={(e) => setPluginType(e.target.value)}
              required
            >
              <option value="">Select Plugin Type</option>
              <option value="survival">Survival</option>
              <option value="economy">Economy</option>
              <option value="packages">Packages</option>
              <option value="security">Security</option>
            </Select>
            <Button type="submit">Launch Into Orbit</Button>
          </Form>
        </Card>
        <Card>
          <Input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <PostList>
            {posts.length > 0 ? (
              posts.map((post) => (
                <PostItem key={post._id}>
                  <span>{post.title}</span>
                  <DeleteButton onClick={() => handleDelete(post._id)}>Delete</DeleteButton>
                </PostItem>
              ))
            ) : (
              <p>No posts found in this galaxy</p>
            )}
          </PostList>
        </Card>
      </AppContainer>
    </>
  );
};

export default GalacticPortal;