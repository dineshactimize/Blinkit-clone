import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, Box, Grid, Button, Paper, Divider, IconButton } from '@mui/material';
import { addToCart, decreaseCart, getTotals, clearCart } from '../features/cart/cartSlice';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axiosConfig';

import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const CartPage = () => {
    const cart = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getTotals());
    }, [cart, dispatch]);

    const handleDecrease = (item) => {
        dispatch(decreaseCart(item));
    };

    const handleIncrease = (item) => {
        dispatch(addToCart(item));
    };

    const handlePayment = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        const totalAmount = cart.cartTotalAmount + 5;

        try {
            const { data: order } = await axios.post('/payment/order', {
                amount: totalAmount
            });

            const options = {
                key: "rzp_test_SCpq9OgKYRyOR5",
                amount: order.amount,
                currency: "INR",
                name: "Blinkit Clone",
                description: "Grocery Order",
                order_id: order.id,
                handler: async function (response) {
                    try {
                        const verifyRes = await axios.post('/payment/verify', {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });

                        if (verifyRes.data.status === "success") {
                            alert("Payment Successful!");
                            dispatch(clearCart()); 
                            navigate('/'); 
                        }
                    } catch (error) {
                        alert("Payment verification failed");
                    }
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                    contact: "9999999999"
                },
                theme: {
                    color: "#eff636"
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error) {
            console.error("Payment Error:", error);
            alert("Something went wrong with payment initialization.");
        }
    };

    return (
        <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            <Container maxWidth="md" sx={{ mt: 4, mb: 8, flexGrow: 1 }}>
                
                {cart.cartItems.length === 0 ? (
                    <Box sx={{ textAlign: 'center', mt: 8 }}>
                        <img 
                            src="https://cdn.grofers.com/assets/ui/empty_states/emp_empty_cart.png" 
                            alt="Empty Cart" 
                            style={{ width: '200px', marginBottom: '20px' }} 
                        />
                        <Typography variant="h5" fontWeight="bold">You don't have any items in your cart</Typography>
                        <Typography color="text.secondary" sx={{ mb: 3 }}>Your favourite items are just a click away</Typography>
                        <Button variant="contained" color="primary" onClick={() => navigate('/')}>
                            Start Shopping
                        </Button>
                    </Box>
                ) : (
                    <>
                        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>My Cart ({cart.cartTotalQuantity} items)</Typography>

                        <Grid container spacing={3}>
                            
                            <Grid item xs={12} md={8}> 
                                <Paper elevation={0} variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden', bgcolor: 'white' }}>
                                    {cart.cartItems.map((item) => (
                                        <Box key={item._id}>
                                            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <img 
                                                    src={`http://localhost:5000${item.image}`} 
                                                    alt={item.name} 
                                                    style={{ width: 60, height: 60, objectFit: 'contain' }}
                                                />

                                                <Box sx={{ flexGrow: 1 }}>
                                                    <Typography variant="subtitle1">{item.name}</Typography>
                                                    <Typography variant="body2" color="text.secondary">{item.category}</Typography>
                                                    <Typography variant="subtitle2" fontWeight="bold">₹{item.price}</Typography>
                                                </Box>

                                                <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#0c831f', borderRadius: 1, color: 'white' }}>
                                                    <IconButton size="small" onClick={() => handleDecrease(item)} sx={{ color: 'white' }}>
                                                        <RemoveIcon fontSize="small" />
                                                    </IconButton>
                                                    <Typography sx={{ px: 1, fontWeight: 'bold' }}>{item.cartQuantity}</Typography>
                                                    <IconButton size="small" onClick={() => handleIncrease(item)} sx={{ color: 'white' }}>
                                                        <AddIcon fontSize="small" />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                            <Divider />
                                        </Box>
                                    ))}
                                </Paper>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Paper elevation={0} variant="outlined" sx={{ p: 3, borderRadius: 2, bgcolor: 'white' }}>
                                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Bill Details</Typography>
                                    
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography variant="body2">Item Total</Typography>
                                        <Typography variant="body2">₹{cart.cartTotalAmount}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography variant="body2">Delivery Charge</Typography>
                                        <Typography variant="body2" color="success.main">FREE</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography variant="body2">Handling Charge</Typography>
                                        <Typography variant="body2">₹5</Typography>
                                    </Box>

                                    <Divider sx={{ my: 2 }} />

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                                        <Typography variant="h6" fontWeight="bold">To Pay</Typography>
                                        <Typography variant="h6" fontWeight="bold">₹{cart.cartTotalAmount + 5}</Typography>
                                    </Box>

                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        fullWidth 
                                        size="large"
                                        onClick={handlePayment} 
                                        sx={{ fontWeight: 'bold', py: 1.5 }}
                                    >
                                        Proceed to Pay
                                    </Button>
                                </Paper>
                            </Grid>
                        </Grid>
                    </>
                )}
            </Container>
            <Footer />
        </Box>
    );
};

export default CartPage;