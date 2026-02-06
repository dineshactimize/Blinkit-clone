import React from 'react';
import { Box, Grid } from '@mui/material';

const HeroBanner = () => {
    return (
        <Box sx={{ mt: 2, mb: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <Box 
                        component="img"
                        src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=2700/layout-engine/2026-01/Frame-1437256605-2-2.jpg"
                        sx={{ 
                            width: '100%', 
                            height: { xs: '150px', md: '250px' },
                            objectFit: 'cover',
                            borderRadius: '12px',
                            cursor: 'pointer'
                        }}
                    />
                </Grid>
               
            </Grid>
        </Box>
    );
};

export default HeroBanner;