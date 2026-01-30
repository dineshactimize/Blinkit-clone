import React from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';

const Footer = () => {
    return (
        <Box sx={{ bgcolor: '#333', color: 'white', py: 6, mt: 8 }}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom color="secondary">blinkit</Typography>
                        <Typography variant="body2">India's Last Minute App</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>Useful Links</Typography>
                        <Typography variant="body2">About Us</Typography>
                        <Typography variant="body2">Partner with us</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>Categories</Typography>
                        <Typography variant="body2">Vegetables & Fruits</Typography>
                        <Typography variant="body2">Cold Drinks & Juices</Typography>
                    </Grid>
                </Grid>
                <Box textAlign="center" pt={5}>
                    <Typography variant="body2">© {new Date().getFullYear()} Blinkit Clone. All rights reserved.</Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;