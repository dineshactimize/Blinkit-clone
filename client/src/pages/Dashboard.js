import React from 'react';
import { Container, Typography, Box, Button, Divider } from '@mui/material';
import AddProduct from '../components/admin/AddProduct';
import AdminProductList from '../components/admin/AdminProductList';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/admin/login'); 
    };

    return (
        <Box sx={{ bgcolor: '#fff', minHeight: '100vh', pb: 5 }}>
            <Box sx={{ bgcolor: '#333', color: 'white', p: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">Blinkit Admin</Typography>
                <Box>
                    <Button color="inherit" onClick={() => navigate('/')}>View Store</Button>
                    <Button color="error" onClick={handleLogout} sx={{ ml: 2 }}>Logout</Button>
                </Box>
            </Box>

            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
                        Inventory Management
                    </Typography>
                </Box>
                
                <AddProduct />

                <Divider sx={{ my: 6 }} />

                <AdminProductList />
                
            </Container>
        </Box>
    );
};

export default Dashboard;