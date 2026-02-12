import React from 'react';
import { Box, Typography, Container, Grid, Stack } from '@mui/material';

const Footer = () => {
    return (
        <Box sx={{ bgcolor: '#f5f5f5', borderTop: '1px solid #f2f2f2', mt: 8, pt: 8, pb: 4 }}>
            <Container maxWidth="lg">
                <Grid container spacing={{ xs: 4, md: 8 }}>

                    <Grid item xs={12} sm={3}>
                        <Typography
                            variant="h5"
                            sx={{ fontWeight: 900, mb: 1, color: '#000', letterSpacing: '-0.5px' }}
                        >
                            blinkit
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                            India’s Last Minute App
                        </Typography>
                    </Grid>

                    <Grid item xs={6} sm={3}>
                        <Typography variant="body1" sx={{ fontWeight: 700, mb: 2, color: '#1c1c1c' }}>
                            Useful Links
                        </Typography>
                        <Stack spacing={1.2}>
                            {['About', 'Careers', 'Partner with us', 'Blog', 'Terms', 'Privacy'].map((text) => (
                                <Typography
                                    key={text}
                                    variant="body2"
                                    sx={{ color: '#666', cursor: 'pointer', '&:hover': { color: '#0c831f' } }}
                                >
                                    {text}
                                </Typography>
                            ))}
                        </Stack>
                    </Grid>

                    <Grid item xs={6} sm={3}>
                        <Typography variant="body1" sx={{ fontWeight: 700, mb: 2, color: '#1c1c1c' }}>
                            Categories
                        </Typography>
                        <Stack spacing={1.2}>
                            {['Vegetables & Fruits', 'Cold Drinks & Juices', 'Snacks & Munchies', 'Dairy & Bakery', 'Instant Food'].map((text) => (
                                <Typography
                                    key={text}
                                    variant="body2"
                                    sx={{ color: '#666', cursor: 'pointer', '&:hover': { color: '#0c831f' } }}
                                >
                                    {text}
                                </Typography>
                            ))}
                        </Stack>
                    </Grid>
                </Grid>

                <Box
                    sx={{
                        borderTop: '1px solid #f2f2f2',
                        mt: 8,
                        pt: 4,
                        pb: 2,
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 2
                    }}
                >
                    <Typography variant="caption" color="text.secondary" sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                        © {new Date().getFullYear()} Blinkit Clone. All rights reserved.
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ maxWidth: '600px', textAlign: { xs: 'center', md: 'right' }, lineHeight: 1.6 }}>
                        “Blinkit” is owned & managed by "Blink Commerce Private Limited" and is not related, linked or interconnected in whatsoever manner or nature, to “GROFFR.COM” which is a real estate services business operated by “Redstone Consultancy Services Private Limited”.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;