// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { Button, TextField, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function LoginPage(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Perform login logic (e.g., validation)
    if(email === "admin@123.com" && password=== "admin@123")
       navigate('/dashboard'); 
    else{
      alert("Invalid credentials");
    } // Navigate to student page
  };

  return (
    <Container>
    <div>
      <h2>Login Page</h2>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button onClick={handleLogin} variant="contained" color="primary">
        Login
      </Button>
      </div>
    </Container>
  );
}

export default LoginPage;
