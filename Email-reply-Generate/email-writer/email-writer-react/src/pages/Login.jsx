// src/pages/Login.jsx
import React, { useState } from 'react';
import {
  Container, Paper, Avatar, Typography, TextField, Button,
  Grid, Link, Box, Snackbar, Alert
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'error' });

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || {};
    const user = users[username];

    if (user && user.password === password) {
      // Save logged in user to currentUser
      localStorage.setItem("currentUser", JSON.stringify(user));
      setSnackbar({ open: true, message: "Login successful!", severity: "success" });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } else {
      setSnackbar({ open: true, message: "Invalid username or password", severity: "error" });
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={6} sx={{ mt: 8, p: 4, borderRadius: 3 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ bgcolor: 'primary.main', mb: 1 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">Login</Typography>
          <Box sx={{ mt: 2 }}>
            <TextField fullWidth label="Username" value={username}
              onChange={(e) => setUsername(e.target.value)} margin="normal" />
            <TextField fullWidth label="Password" type="password" value={password}
              onChange={(e) => setPassword(e.target.value)} margin="normal" />
            <Button fullWidth variant="contained" sx={{ mt: 3 }} onClick={handleLogin}>
              Login
            </Button>
            <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
              <Grid item>
                <Link component="button" onClick={() => navigate('/signup')} variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
}

export default Login;
