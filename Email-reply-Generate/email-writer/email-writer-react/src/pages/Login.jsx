import React, { useState } from 'react';
import {
  Container, Paper, Avatar, Typography, TextField, Button,
  Grid, Link, Box, Snackbar, Alert, IconButton, InputAdornment
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'error' });
  const navigate = useNavigate();

  const handleLogin = () => {
    const storedData = localStorage.getItem(username);
    if (!storedData) {
      setSnackbar({ open: true, message: 'User not found', severity: 'error' });
      return;
    }

    const parsedUser = JSON.parse(storedData);
    if (parsedUser.password !== password) {
      setSnackbar({ open: true, message: 'Incorrect password', severity: 'error' });
      return;
    }

    localStorage.setItem('loggedInUser', JSON.stringify(parsedUser));
    setSnackbar({ open: true, message: `Welcome, ${parsedUser.fullName}!`, severity: 'success' });

    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ mt: 8, p: 4, borderRadius: 3 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ bgcolor: 'primary.main', mb: 1 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">Login</Typography>
          <Box component="form" sx={{ mt: 2 }} onSubmit={(e) => e.preventDefault()}>
            <TextField fullWidth required margin="normal" label="Username" value={username} onChange={(e) => setUsername(e.target.value)} autoFocus />
            <TextField
              fullWidth
              required
              margin="normal"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleLogin}>Sign In</Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">Forgot password?</Link>
              </Grid>
              <Grid item>
                <Link component="button" variant="body2" onClick={() => navigate('/signup')}>
                  Don’t have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Login;
