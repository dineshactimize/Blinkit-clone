import React from 'react';
import { Box, Grid } from '@mui/material';

const categories = [
    { name: 'Vegetables', img: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-2_10.png' },
    { name: 'Dairy', img: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-3_9.png' },
    { name: 'Munchies', img: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-4_9.png' },
    { name: 'Cold Drinks', img: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-5_4.png' },
    { name: 'Instant Food', img: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-6_5.png' },
    { name: 'Pharmacy', img: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-9_3.png' },
    { name: 'Organic', img: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-10.png' },
    { name: 'Baby Care', img: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-11.png' },
    
];

const CategoryGrid = () => {
    return (
        <Box sx={{ mb: 4 }}>
            <Grid container spacing={2}> {/* Increased spacing for better separation */}
                {categories.map((cat, index) => (
                    // Adjusted sizing: xs={3} means 4 items per row on mobile
                    // md={1.2} means 10 items per row on desktop
                    <Grid item xs={3} sm={2} md={1.2} key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
                        <Box 
                            component="img"
                            src={cat.img} 
                            alt={cat.name} 
                            sx={{ 
                                width: '100%', 
                                maxWidth: '120px', // INCREASED from 80px to 120px
                                height: 'auto',
                                transition: 'transform 0.2s',
                                '&:hover': { transform: 'scale(1.05)' } // Subtle zoom effect
                            }} 
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default CategoryGrid;