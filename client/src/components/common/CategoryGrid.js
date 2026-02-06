import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const categories = [
    { 
        id: 1, 
        keyword: 'Dairy,bread & Eggs', 
        image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-2_10.png' 
    },
    { 
        id: 2, 
        keyword: 'Fruits & Vegetables', 
        image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-3_9.png' 
    },
    { 
        id: 3, 
        keyword: 'Cool Drinks & Juices', 
        image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-4_9.png' 
    },
    { 
        id: 4, 
        keyword: 'Snacks & Munchies', 
        image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-5_4.png' 
    },
    { 
        id: 5, 
        keyword: 'Breakfast & Instant Food',
        image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-6_5.png' 
    },
    { 
        id: 6, 
        keyword: 'Tea,Coffee & Health Drink', 
        image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2025-11/Slice-7-1_0.png' 
    },
    { 
        id: 7, 
        keyword: 'Atta,Rice & Dal', 
        image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-10.png' 
    },
    { 
        id: 8, 
        keyword: 'Masala,Oil & More', 
        image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-11.png' 
    }
];

const CategoryGrid = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ my: 3 }}>
            <Grid container spacing={2}>
                {categories.map((cat) => (
                    <Grid item xs={3} sm={2} md={1.5} key={cat.id}>
                        <Box 
                            onClick={() => navigate(`/category/${cat.keyword}`)}
                            sx={{ 
                                cursor: 'pointer', 
                                textAlign: 'center',
                                transition: 'transform 0.2s',
                                '&:hover': { transform: 'scale(1.05)' }
                            }}
                        >
                            <Box sx={{ 
                                bgcolor: '#eef4ff', 
                                borderRadius: 3, 
                                mb: 1, 
                                overflow: 'hidden',
                                // height: '100px', 
                                // width:'0px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <img 
                                    src={cat.image} 
                                    alt={cat.name} 
                                    style={{ 
                                        width: '130px', 
                                        height: '90%', 
                                        objectFit: 'contain' 
                                    }} 
                                />
                            </Box>
                            <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '11px', lineHeight: 1.2 }}>
                                {cat.name}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default CategoryGrid;