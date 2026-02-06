import React from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Button, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, decreaseCart } from '../../features/cart/cartSlice'; // Make sure path is correct
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const ProductRow = ({ title, products }) => {
    const dispatch = useDispatch();
    // Get cart items to check quantities
    const { cartItems } = useSelector((state) => state.cart);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    const handleDecrease = (product) => {
        dispatch(decreaseCart(product));
    };

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
                {products.map((product) => {
                    // CHECK IF PRODUCT IS IN CART
                    const cartItem = cartItems.find(item => item._id === product._id);
                    const quantity = cartItem ? cartItem.cartQuantity : 0;

                    return (
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
                                    
                                    {/* --- BUTTON LOGIC START --- */}
                                    {quantity > 0 ? (
                                        // COUNTER BUTTONS (+ 1 -)
                                        <Box sx={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            bgcolor: '#0c831f', 
                                            borderRadius: 1, 
                                            color: 'white',
                                            height: '32px'
                                        }}>
                                            <IconButton size="small" onClick={() => handleDecrease(product)} sx={{ color: 'white', p: 0.5 }}>
                                                <RemoveIcon fontSize="small" />
                                            </IconButton>
                                            <Typography sx={{ px: 1, fontWeight: 'bold', fontSize: '14px' }}>{quantity}</Typography>
                                            <IconButton size="small" onClick={() => handleAddToCart(product)} sx={{ color: 'white', p: 0.5 }}>
                                                <AddIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    ) : (
                                        // ADD BUTTON
                                        <Button 
                                            variant="outlined" 
                                            size="small" 
                                            onClick={() => handleAddToCart(product)}
                                            sx={{ 
                                                color: '#0c831f', 
                                                borderColor: '#0c831f', 
                                                fontWeight: 'bold',
                                                bgcolor: '#f7fff9',
                                                minWidth: '70px',
                                                textTransform: 'none'
                                            }}
                                        >
                                            ADD
                                        </Button>
                                    )}
                                    {/* --- BUTTON LOGIC END --- */}
                                    
                                </Box>
                            </CardContent>
                        </Card>
                    );
                })}
            </Box>
        </Box>
    );
};

export default ProductRow;