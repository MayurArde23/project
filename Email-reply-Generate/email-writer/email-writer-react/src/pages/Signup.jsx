// src/pages/Signup.jsx
import React, { useState } from 'react';
import {
  Container, Paper, Avatar, Typography, TextField, Button,
  Grid, Link, Box, Snackbar, Alert, IconButton, InputAdornment
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '', username: '', email: '', phone: '', password: '', confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'error' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    const { fullName, username, email, phone, password, confirmPassword } = form;
    if (!fullName || !username || !email || !phone || !password || !confirmPassword) {
      return setSnackbar({ open: true, message: "All fields required", severity: "error" });
    }

    if (password !== confirmPassword) {
      return setSnackbar({ open: true, message: "Passwords do not match", severity: "error" });
    }

    const users = JSON.parse(localStorage.getItem("users")) || {};
    if (users[username]) {
      return setSnackbar({ open: true, message: "Username already exists", severity: "error" });
    }

    users[username] = { fullName, username, email, phone, password };
    localStorage.setItem("users", JSON.stringify(users));

    setSnackbar({ open: true, message: "Signup successful! Please login.", severity: "success" });
    setTimeout(() => navigate("/"), 1500);
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={6} sx={{ mt: 8, p: 4, borderRadius: 3 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ bgcolor: 'primary.main', mb: 1 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">Sign Up</Typography>
          <Box sx={{ mt: 2 }}>
            {["fullName", "username", "email", "phone"].map((field) => (
              <TextField key={field} fullWidth margin="normal" label={field.charAt(0).toUpperCase() + field.slice(1)}
                name={field} value={form[field]} onChange={handleChange} />
            ))}
            <TextField fullWidth label="Password" margin="normal"
              type={showPassword ? 'text' : 'password'} name="password" value={form.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField fullWidth label="Confirm Password" margin="normal"
              type={showPassword ? 'text' : 'password'} name="confirmPassword"
              value={form.confirmPassword} onChange={handleChange} />
            <Button fullWidth variant="contained" sx={{ mt: 3 }} onClick={handleSubmit}>Sign Up</Button>
            <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
              <Grid item>
                <Link component="button" onClick={() => navigate('/')} variant="body2">
                  Already have an account? Login
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

export default Signup;
