import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  InputAdornment,
  IconButton,
  Avatar,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';

const AdminLogin = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    //   e.preventDefault();

    try {
      const res = await axios.post("http://localhost:2004/api/admin/login", {
  email: formData.email,
  password: formData.password
  
});
      console.log("Login success:", res.data);
       localStorage.setItem("adminToken", res.data.token); 
      enqueueSnackbar("Admin login successful!", { variant: "success" });

      navigate("/admin/dashboard");

    } catch (error) {
      console.error("Login error:", error.response.data.message);
      enqueueSnackbar(error.response.data.message || "Login failed", { variant: "error" });

    }
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="#f4f6f8"
    >
      <Card sx={{ maxWidth: 400, width: '100%', p: 3 }}>
        <CardContent>
          <Box display="flex" justifyContent="center" mb={2}>
            <Avatar
              src="https://cdn-icons-png.flaticon.com/512/295/295128.png"
              alt="Admin Logo"
              sx={{ width: 60, height: 60 }}
            />
          </Box>
          <Typography variant="h5" textAlign="center" gutterBottom>
            Admin Login
          </Typography>

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminLogin;
