import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../features/products/productSlice';
import { Grid, Card, CardMedia, CardContent, Typography, Button, CircularProgress, Box } from '@mui/material';

const ProductList = () => {
    const dispatch = useDispatch();
    const { products, isLoading, isError, message } = useSelector((state) => state.product);


    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    if (isLoading) return <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />;
    if (isError) return <Typography color="error">Error: {message}</Typography>;

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>Fresh Items</Typography>

            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item key={product._id} xs={12} sm={6} md={3}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

                            <CardMedia
                                component="img"
                                height="140"

                                image={`http://localhost:5000${product.image}`}
                                alt={product.name}
                                sx={{ objectFit: 'contain', p: 2 }}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h6" component="div">
                                    {product.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {product.category}
                                </Typography>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                                    <Typography variant="h6" color="primary">
                                        ₹{product.price}
                                    </Typography>
                                    <Button variant="outlined" size="small" color="primary">
                                        ADD
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ProductList;