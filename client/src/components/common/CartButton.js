import React from 'react';
import { Button, Box, Typography, ButtonGroup } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, decreaseCart, getTotals } from '../../features/cart/cartSlice';

const CartButton = ({ product }) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    const existingItem = cart.cartItems.find(item => item._id === product._id);
    const quantity = existingItem ? existingItem.cartQuantity : 0;

    const handleAdd = () => {
        dispatch(addToCart(product));
        dispatch(getTotals());
    };

    const handleDecrease = () => {
        dispatch(decreaseCart(product));
        dispatch(getTotals());
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {quantity === 0 ? (
                <Button 
                    variant="outlined" 
                    color="primary" 
                    onClick={handleAdd}
                    sx={{ 
                        textTransform: 'none', 
                        fontWeight: 'bold', 
                        bgcolor: '#f7fff9',
                        border: '1px solid #0c831f',
                        color: '#0c831f',
                        minWidth: '80px',
                        '&:hover': { bgcolor: '#0c831f', color: 'white' }
                    }}
                >
                    ADD
                </Button>
            ) : (
                <ButtonGroup size="small" variant="contained" disableElevation sx={{ bgcolor: '#0c831f', borderRadius: 1 }}>
                    <Button 
                        onClick={handleDecrease} 
                        sx={{ color: 'white', minWidth: '30px', px: 1, borderRight: 'none!important' }}
                    >
                        -
                    </Button>
                    <Button 
                        disabled 
                        sx={{ 
                            color: 'white!important', 
                            fontWeight: 'bold', 
                            minWidth: '30px', 
                            px: 1,
                            '&.Mui-disabled': { color: 'white' } 
                        }}
                    >
                        {quantity}
                    </Button>
                    <Button 
                        onClick={handleAdd} 
                        sx={{ color: 'white', minWidth: '30px', px: 1 }}
                    >
                        +
                    </Button>
                </ButtonGroup>
            )}
        </Box>
    );
};

export default CartButton;