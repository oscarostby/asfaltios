import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserIdPage = () => {
  const [message, setMessage] = useState('Loading...');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const cookies = document.cookie.split('; ');
        const userIdCookie = cookies.find(row => row.startsWith('userId='));
        
        if (!userIdCookie) {
          setMessage('No user ID found in cookies');
          return;
        }

        const userId = userIdCookie.split('=')[1];
        
        // Log the userId for debugging
        console.log('User ID from cookie:', userId);

        const response = await axios.get(`https://api.asfaltios.com/api/users/${userId}`);
        
        // Log the response for debugging
        console.log('API Response:', response.data);

        if (userId === 'admin') {
          setMessage('Makka Pakka, you are admin');
        } else {
          setMessage(`Your user ID is: ${userId}`);
        }
      } catch (error) {
        console.error('Error:', error);
        setError(error.message || 'An unknown error occurred');
        setMessage('Error fetching user data');
      }
    };

    fetchUserId();
  }, []);

  return (
    <div>
      <h1>User ID Page</h1>
      <p>{message}</p>
      {error && <p style={{color: 'red'}}>Error details: {error}</p>}
    </div>
  );
};

export default UserIdPage;