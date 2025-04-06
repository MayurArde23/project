// src/pages/Dashboard.jsx
import React from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SmartEmailReply from '../SmartEmailReply';



const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/');
  };

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  return (
    <Container sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Welcome, {loggedInUser?.fullName || 'User'}!</Typography>
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      <SmartEmailReply />
    </Container>
  );
};

export default Dashboard;
