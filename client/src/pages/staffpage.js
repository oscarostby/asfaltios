import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import HeaderComponent from '../components/header';

const MainContent = styled.main`
  padding-top: 200px;
  background-color: #0a192f;
  color: #e6f1ff;
  min-height: 100vh;
`;

const StaffContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  color: #64ffda;
  text-align: center;
  margin-bottom: 40px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  background-color: #1a1a2e;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.th`
  border: 1px solid #e0e0e0;
  padding: 10px;
  background-color: #172a45;
  color: #e6f1ff;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #112240;
  }

  &:nth-child(odd) {
    background-color: #0a192f;
  }

  &:hover {
    background-color: #243b55;
  }
`;

const TableCell = styled.td`
  border: 1px solid #e0e0e0;
  padding: 10px;
  color: #e6f1ff;
`;

const StaffPage = () => {
  const [staffData, setStaffData] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    fetchProfileData();
    fetchStaffData();
  }, []);

  const fetchProfileData = async () => {
    const userId = getCookie('userId');
    if (userId) {
      try {
        const response = await axios.get(`https://api.asfaltios.com/api/users/${userId}`);
        setUsername(response.data.username);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  };

  const fetchStaffData = async () => {
    try {
      const response = await axios.get('https://api.asfaltios.com/staff');
      setStaffData(response.data);
    } catch (error) {
      console.error('Error fetching staff data:', error);
    }
  };

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

  return (
    <>
      <HeaderComponent />
      <MainContent>
        <StaffContainer>
          <Title>Welcome, {username}! Here is the Staff Information</Title>
          <Table>
            <thead>
              <tr>
                <TableHeader>Username</TableHeader>
                <TableHeader>Password</TableHeader>
              </tr>
            </thead>
            <tbody>
              {staffData.map((staff, index) => (
                <TableRow key={index}>
                  <TableCell>{staff.username}</TableCell>
                  <TableCell>{staff.password}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </StaffContainer>
      </MainContent>
    </>
  );
};

export default StaffPage;
