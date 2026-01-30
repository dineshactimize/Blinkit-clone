import React from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Button } from '@mui/material';

const ProductRow = ({ title, products }) => {
    return (
        <Box sx={{ mb: 5 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                {title}
            </Typography>
            
            <Box sx={{ 
                display: 'flex', 
                overflowX: 'auto', 
                gap: 2, 
                pb: 2,
                '&::-webkit-scrollbar': { display: 'none' } 
            }}>
                {products.map((product) => (
                    <Card key={product._id} sx={{ minWidth: 200, maxWidth: 200, borderRadius: 3, boxShadow: 1, border: '1px solid #eee' }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={`http://localhost:5000${product.image}`}
                            alt={product.name}
                            sx={{ p: 2, objectFit: 'contain' }}
                        />
                        <CardContent sx={{ p: 1.5 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '12px' }}>
                                10 mins
                            </Typography>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', height: '40px', overflow: 'hidden' }}>
                                {product.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                {product.category}
                            </Typography>
                            
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                    ₹{product.price}
                                </Typography>
                                <Button variant="outlined" size="small" color="primary" sx={{ textTransform: 'none', fontWeight: 'bold' }}>
                                    ADD
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default ProductRow;