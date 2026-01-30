import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import Navbar from '../components/common/Navbar';
import AddProduct from '../components/admin/AddProduct';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        Admin Dashboard
                    </Typography>
                    <Button variant="outlined" onClick={() => navigate('/')}>
                        Go to Store
                    </Button>
                </Box>
                
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                    Upload new items to the inventory.
                </Typography>

                <AddProduct />
            </Container>
        </>
    );
};

export default Dashboard;