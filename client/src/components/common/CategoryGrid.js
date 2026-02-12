import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import dairyImg from '../../assets/Dairy.avif';
import attaImg from '../../assets/atta.avif';
import breakfastImg from '../../assets/breakfast.avif';
import cooldrinksImg from '../../assets/cooldrinks.avif';
import fruitsImg from '../../assets/fruits.avif';
import masalaImg from '../../assets/masala.avif';
import snacksImg from '../../assets/snacks.avif';
import teaImg from '../../assets/tea.avif';



const categories = [
    {
        id: 1,
        keyword: 'Dairy,bread & Eggs',
        image: dairyImg
    },
    {
        id: 2,
        keyword: 'Fruits & Vegetables',
        image: fruitsImg
    },
    {
        id: 3,
        keyword: 'Cool Drinks & Juices',
        image: cooldrinksImg
    },
    {
        id: 4,
        keyword: 'Snacks & Munchies',
        image: snacksImg
    },
    {
        id: 5,
        keyword: 'Breakfast & Instant Food',
        image: breakfastImg
    },
    {
        id: 6,
        keyword: 'Tea,Coffee & Health Drink',
        image: teaImg
    },
    {
        id: 7,
        keyword: 'Atta,Rice & Dal',
        image: attaImg
    },
    {
        id: 8,
        keyword: 'Masala,Oil & More',
        image: masalaImg
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