import { Box, Button, Typography } from '@mui/material';
import React from 'react'
// import AdminLogin from '../../Components/Admin/AdminLogin/AdminLogin'
import { useNavigate } from 'react-router';

const AdminDashboard = () => {
 const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // remove token
    navigate("/admin"); // redirect to login page
  };

  return (
    <Box sx={{display:"flex",alignItems:"center",justifyContent:"center"}}>
      <Typography variant='h4'>Welcome Admin</Typography>
      <Button variant='contained' color='error' onClick={handleLogout}>Logout</Button>
    </Box>
  );
};

export default AdminDashboard
