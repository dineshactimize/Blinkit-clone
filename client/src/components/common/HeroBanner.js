import React from 'react';
import { Box, Grid } from '@mui/material';
import bannerImg from '../../assets/HeroBanner.jpg';


const HeroBanner = () => {
    return (
        <Box
            sx={{
                mt: { xs: 1, sm: 2 },
                mb: { xs: 1, sm: 2 },
                px: { xs: 1, sm: 2 },
            }}
        >
            <Grid container>
                <Grid item xs={12}>
                    <Box
                        component="img"
                        src={bannerImg}
                        alt="Hero Banner"
                        sx={{
                            width: '100%',
                            height: 'auto',
                            maxHeight: {
                                xs: 220,
                                sm: 300,
                                md: 380,
                            },
                            objectFit: 'contain',
                            borderRadius: '12px',
                            display: 'block',
                            backgroundColor: '#f5f5f5',
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default HeroBanner;
