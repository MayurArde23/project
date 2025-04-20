// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SmartEmailReply from '../SmartEmailReply';
import { Snackbar, Alert } from '@mui/material';

function Dashboard() {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    if (!currentUser) {
      navigate('/', { replace: true });
    }

    // Prevent back navigation using browser
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, '', window.location.href);
    };

    return () => {
      window.onpopstate = null;
    };
  }, [navigate, currentUser]);

  const handleLogout = () => {
    console.log("User logged out");
    setSnackbar({ open: true, message: 'Logged out successfully!', severity: 'success' });
    setTimeout(() => {
      localStorage.removeItem('currentUser');
      navigate('/', { replace: true });
    }, 1500);
  };

  const toggleProfile = () => {
    const message = showProfile ? 'Profile hidden!' : 'Profile displayed!';
    setShowProfile(!showProfile);
    setSnackbar({ open: true, message, severity: 'info' });
    console.log('Profile section toggled');
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#f0f2f5'
    }}>

      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '12px 30px',
        backgroundColor: '#1976d2',
        color: 'white',
        height: '60px',
        alignItems: 'center'
      }}>
        <h3 style={{ margin: 0 }}>👋 Welcome, {currentUser?.fullName || "User"}!</h3>
        <div>
          <button
            onClick={toggleProfile}
            style={{
              marginRight: '10px',
              backgroundColor: 'white',
              color: '#1976d2',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {showProfile ? 'Hide Profile' : 'View Profile'}
          </button>

          <button
            onClick={handleLogout}
            style={{
              backgroundColor: '#d32f2f',
              color: 'white',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Section */}
      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
        padding: '30px 20px'
      }}>
        <div style={{ width: '100%', maxWidth: '900px' }}>
          <SmartEmailReply />
        </div>
      </div>

      {/* Profile Section */}
      {showProfile && (
        <div style={{
          position: 'fixed',
          top: '70px',
          right: '20px',
          width: '250px',
          backgroundColor: '#ffffff',
          boxShadow: '0 0 10px rgba(0,0,0,0.2)',
          borderRadius: '8px',
          padding: '15px',
          zIndex: 1000
        }}>
          <h4 style={{ color: '#1976d2', marginBottom: '10px' }}>👤 Profile</h4>
          <p><strong>Name:</strong> {currentUser?.fullName}</p>
          <p><strong>Username:</strong> {currentUser?.username}</p>
          <p><strong>Email:</strong> {currentUser?.email}</p>
          <p><strong>Phone:</strong> {currentUser?.phone}</p>
        </div>
      )}

      {/* Snackbar for actions */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Dashboard;
