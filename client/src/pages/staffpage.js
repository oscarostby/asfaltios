import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import ASPA from '../components/Aspa';
import Header from '../components/header';

const MainContent = styled.main`
  padding-top: 200px;
  background-color: #f5f5f5;
  color: #0a192f;
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StaffContainer = styled.div`
  max-width: 900px;
  width: 100%;
  margin: 0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Sidebar = styled.aside`
  width: 400px;
  padding: 20px;
  background-color: #ffffff;
  border-left: 2px solid #e6e6e6;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const ProfilePicture = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #64ffda;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(100, 255, 218, 0.3);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 30px rgba(100, 255, 218, 0.5);
  }
`;

const InfoText = styled.p`
  font-size: 1.5em;
  color: #0a192f;
  margin: 10px 0;
`;

const Title = styled.h1`
  color: #0a192f;
  margin-bottom: 20px;
  text-align: center; /* Center the heading */
`;

const LinkList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const LinkItem = styled.li`
  margin: 10px 0;
`;

const StyledLink = styled.a`
  color: #0078d7;
  text-decoration: none;
  font-size: 1.2em;

  &:hover {
    color: #005fa3;
    text-decoration: underline;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: #0a192f;
  font-size: 1.5em;
`;

const BoxContainer = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 40px;
  justify-content: center;
  width: 100%;
`;

const Box = styled.div`
  background-color: white;
  color: #0a192f;
  padding: 40px;
  border-radius: 10px;
  border: 4px solid #0078d7; /* Blue border */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  flex: 1;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const PrioritizedTasksContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center the content */
  gap: 20px;
  width: 100%; /* Ensure full width */
`;

const RedBox = styled.div`
  background-color: white; /* White background */
  color: #e74c3c; /* Red text color */
  padding: 40px; /* Increase padding for a larger box */
  border-radius: 10px;
  border: 4px solid #e74c3c; /* Red border */
  width: 80%; /* Adjust width */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const TaskCreator = styled.span`
  display: block;
  margin-top: 10px;
  font-size: 0.8em;
  color: #333;
`;

const AddTaskButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  margin-bottom: 20px;
  cursor: pointer;
  
  &:hover {
    background-color: #c0392b;
  }
`;

const StaffPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      const userIdFromCookie = getCookie('userId');
      if (userIdFromCookie) {
        try {
          const response = await axios.get(`https://api.asfaltios.com/api/users/${userIdFromCookie}`);
          setUsername(response.data.username);
          setUserId(userIdFromCookie);
          setProfilePictureUrl(response.data.profilePictureUrl);
          setIsAdmin(response.data.admin);
          setIsLoading(false);

          if (!response.data.admin) {
            navigate('/no-access');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
    };

    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://api.asfaltios.com/api/prioritized-tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching prioritized tasks:', error);
      }
    };

    fetchProfileData();
    fetchTasks();
  }, [navigate]);

  const getCookie = (name) => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(`${name}=`)) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  };

  const addTask = async () => {
    const taskDescription = prompt('Enter the task description:');
    if (taskDescription && window.confirm('Are you sure you want to add this task?')) {
      try {
        const response = await axios.post('https://api.asfaltios.com/api/prioritized-tasks', {
          task: taskDescription,
          createdBy: username,
        });
        setTasks([...tasks, response.data]);
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const deleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`https://api.asfaltios.com/api/prioritized-tasks/${taskId}`);
        setTasks(tasks.filter((task) => task.id !== taskId));
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  if (isLoading) {
    return <LoadingContainer>Loading...</LoadingContainer>;
  }

  return (
    <>
      <Header />
      <MainContent>
        <StaffContainer>
          <ProfileSection>
            <ProfilePicture src={profilePictureUrl} alt="Profile Picture" />
            <InfoText>Username: {username}</InfoText>
            <InfoText>Staff ID: {userId}</InfoText>
          </ProfileSection>

          <BoxContainer>
            <Box>Active Chats</Box>
            <Box>Resolved Chats</Box>
            <Box>Unanswered Chats</Box>
          </BoxContainer>
        </StaffContainer>

        <PrioritizedTasksContainer>
          <Title>Prioritized Tasks</Title>
          <AddTaskButton onClick={addTask}>Add New Task</AddTaskButton>
          {tasks.map((task) => (
            <RedBox key={task.id} onDoubleClick={() => deleteTask(task.id)}>
              {task.task}
              <TaskCreator>Created by: {task.createdBy}</TaskCreator>
            </RedBox>
          ))}
        </PrioritizedTasksContainer>
        
        <Sidebar>
          <Title>Useful Links</Title>
          <LinkList>
            <LinkItem>
              <StyledLink href="https://github.com/oscarostby/asfaltios" target="_blank" rel="noopener noreferrer">
                Asfaltios GitHub Repository
              </StyledLink>
            </LinkItem>
            <LinkItem>
              <StyledLink href="https://github.com/Secker17/Bakteria" target="_blank" rel="noopener noreferrer">
                Bakteria GitHub Repository
              </StyledLink>
            </LinkItem>
            <LinkItem>
              <StyledLink href="https://dashboard.tawk.to/#/dashboard/66d01a6050c10f7a00a191c9" target="_blank" rel="noopener noreferrer">
                Tawk.to Dashboard
              </StyledLink>
            </LinkItem>
          </LinkList>
        </Sidebar>
      </MainContent>
      <ASPA />
    </>
  );
};

export default StaffPage;
