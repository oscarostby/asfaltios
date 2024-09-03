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
  margin-bottom: 40px;
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

const TasksContainer = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TaskInput = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  flex: 1;
  margin-right: 10px;
`;

const AddTaskButton = styled.button`
  background-color: #0078d7;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  
  &:hover {
    background-color: #005fa3;
  }
`;

const TaskList = styled.ul`
  list-style-type: none;
  padding: 0;
  max-height: 400px;
  overflow-y: auto;
`;

const TaskItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const ClaimButton = styled.button`
  background-color: #64ffda;
  color: #0a192f;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #52e6c4;
  }
`;

const DeleteButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #c0392b;
  }
`;

const ActiveTasks = ({ username }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://api.asfaltios.com/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async () => {
    if (newTask.trim()) {
      try {
        const response = await axios.post('https://api.asfaltios.com/api/tasks', { task: newTask });
        setTasks([...tasks, response.data]);
        setNewTask('');
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`https://api.asfaltios.com/api/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const claimTask = async (taskId) => {
    try {
      const response = await axios.put(`https://api.asfaltios.com/api/tasks/${taskId}`, { claimedBy: username });
      setTasks(tasks.map((task) => (task.id === taskId ? response.data : task)));
    } catch (error) {
      console.error('Error claiming task:', error);
    }
  };

  return (
    <TasksContainer>
      <h2>Active Tasks</h2>
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <TaskInput
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <AddTaskButton onClick={addTask}>Add Task</AddTaskButton>
      </div>
      <TaskList>
        {tasks.map((task) => (
          <TaskItem key={task.id}>
            <span>{task.task} {task.claimedBy && `(Claimed by: ${task.claimedBy})`}</span>
            <div>
              {!task.claimedBy && <ClaimButton onClick={() => claimTask(task.id)}>Claim</ClaimButton>}
              <DeleteButton onClick={() => deleteTask(task.id)}>Delete</DeleteButton>
            </div>
          </TaskItem>
        ))}
      </TaskList>
    </TasksContainer>
  );
};

const StaffPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);  // New state to track admin status
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
          setIsAdmin(response.data.admin);  // Set admin status
          setIsLoading(false); // Data fetched successfully

          if (!response.data.admin) {
            navigate('/no-access'); // Redirect to a no-access page if not admin
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          navigate('/login'); // Redirect to login on error
        }
      } else {
        navigate('/login'); // Redirect to login if no userId cookie found
      }
    };

    fetchProfileData();
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

          <ActiveTasks username={username} />
        </Sidebar>
      </MainContent>
      <ASPA />
    </>
  );
};

export default StaffPage;
