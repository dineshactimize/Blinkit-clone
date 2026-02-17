import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  Container, Typography, Box, Grid, Button, Paper, Divider, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { addToCart, decreaseCart, getTotals, clearCart } from '../features/cart/cartSlice';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axiosConfig';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const CartPage = () => {
    const cart = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        dispatch(getTotals());
    }, [cart, dispatch]);

    const handleDecrease = (item) => dispatch(decreaseCart(item));
    const handleIncrease = (item) => dispatch(addToCart(item));

    const handlePayment = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };

        const totalAmount = cart.cartTotalAmount + 5;

        try {
            const { data: order } = await axios.post('/payment/order', { amount: totalAmount }, config);

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
                        }, config);

                        if (verifyRes.data.status === "success") {
                            const orderPayload = {
                                orderItems: cart.cartItems, 
                                totalAmount: totalAmount,
                                paymentId: response.razorpay_payment_id
                            };
                            await axios.post('/orders', orderPayload, config);
                            alert("Order Placed Successfully!");
                            dispatch(clearCart()); 
                            navigate('/orders'); 
                        }
                    } catch (error) {
                        console.error("Order Save Failed:", error);
                        alert("Payment successful but failed to save order.");
                    }
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                    contact: "9999999999"
                },
                theme: { color: "#0c831f" }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Payment Init Error:", error);
            alert("Payment initialization failed");
        }
    };

    return (
        <Box sx={{ bgcolor: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            
            <Container 
                maxWidth="md" 
                sx={{ 
                    mt: { xs: 1, md: 4 }, 
                    mb: { xs: 12, md: 8 }, 
                    flexGrow: 1,
                    px: { xs: 1, sm: 2 }
                }}
            >
                {cart.cartItems.length === 0 ? (
                    <Box sx={{ textAlign: 'center', mt: 8, px: 2 }}>
                        <img 
                            src="https://cdn.grofers.com/assets/ui/empty_states/emp_empty_cart.png" 
                            alt="Empty Cart" 
                            style={{ width: '150px', marginBottom: '20px' }} 
                        />
                        <Typography variant="h6" fontWeight="bold">Your cart is empty</Typography>
                        <Button 
                            variant="contained" 
                            onClick={() => navigate('/')} 
                            sx={{ mt: 2, bgcolor: '#0c831f', textTransform: 'none', px: 4 }}
                        >
                            Start Shopping
                        </Button>
                    </Box>
                ) : (
                    <Grid container spacing={isMobile ? 1 : 3}>
                        <Grid item xs={12} md={7}> 
                            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1, px: 1 }}>
                                <ShoppingBagOutlinedIcon /> {cart.cartItems.length} Items
                            </Typography>
                            <Paper elevation={0} sx={{ borderRadius: { xs: 2, md: 4 }, overflow: 'hidden', border: '1px solid #eee' }}>
                                {cart.cartItems.map((item, index) => (
                                    <Box key={item._id}>
                                        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, bgcolor: 'white' }}>
                                            <img 
                                                src={`https://blinkit-clone-qd0s.onrender.com${item.image}`} 
                                                alt={item.name} 
                                                style={{ width: 64, height: 64, objectFit: 'contain', borderRadius: '8px', border: '1px solid #f0f0f0' }} 
                                            />
                                            <Box sx={{ flexGrow: 1 }}>
                                                <Typography variant="body1" fontWeight="600" sx={{ fontSize: '0.95rem' }}>
                                                    {item.name}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">₹{item.price}</Typography>
                                            </Box>
                                            
                                            <Box sx={{ 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                border: '1px solid #0c831f', 
                                                borderRadius: '8px',
                                                bgcolor: '#f0fff2'
                                            }}>
                                                <IconButton size="small" onClick={() => handleDecrease(item)} sx={{ color: '#0c831f' }}>
                                                    <RemoveIcon fontSize="small" />
                                                </IconButton>
                                                <Typography sx={{ px: 1, fontWeight: 'bold', color: '#0c831f' }}>
                                                    {item.cartQuantity}
                                                </Typography>
                                                <IconButton size="small" onClick={() => handleIncrease(item)} sx={{ color: '#0c831f' }}>
                                                    <AddIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                        {index !== cart.cartItems.length - 1 && <Divider sx={{ mx: 2 }} />}
                                    </Box>
                                ))}
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={5} id="bill-details-section">
                            <Paper 
                                elevation={0} 
                                sx={{ 
                                    p: { xs: 2, md: 3 }, 
                                    borderRadius: 4, 
                                    bgcolor: '#f8f9fa',
                                    border: isMobile ? 'none' : '1px solid #e0e0e0',
                                    position: { md: 'sticky' },
                                    top: { md: 100 }
                                }}
                            >
                                <Typography variant="subtitle1" fontWeight="800" sx={{ mb: 2, color: '#1c1c1c' }}>
                                    Bill Details
                                </Typography>

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                           Item Total
                                        </Typography>
                                        <Typography variant="body2" fontWeight="500">₹{cart.cartTotalAmount}</Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                          convenience fee
                                        </Typography>
                                        <Typography variant="body2" color="#0c831f" fontWeight="500">₹5</Typography>
                                    </Box>

                                    <Divider sx={{ my: 1, borderStyle: 'dashed' }} />

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                                        <Typography variant="subtitle1" fontWeight="900">Grand Total</Typography>
                                        <Typography variant="subtitle1" fontWeight="900">₹{cart.cartTotalAmount + 5}</Typography>
                                    </Box>
                                </Box>

                                {!isMobile && (
                                    <Button 
                                        variant="contained" 
                                        fullWidth 
                                        size="large" 
                                        onClick={handlePayment} 
                                        sx={{ 
                                            mt: 3, fontWeight: 'bold', py: 1.5, bgcolor: '#0c831f', 
                                            borderRadius: 2, textTransform: 'none', fontSize: '1.1rem',
                                            '&:hover': { bgcolor: '#096317' } 
                                        }}
                                    >
                                        Proceed to Pay
                                    </Button>
                                )}
                                
                                <Box sx={{ mt: 3, p: 2, bgcolor: '#fff', borderRadius: 3, border: '1px solid #eee' }}>
                                    <Typography variant="body2" fontWeight="800" sx={{ mb: 0.5, color: '#1c1c1c' }}>
                                        Cancellation Policy
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.4, display: 'block' }}>
                                        Orders cannot be cancelled once packed for delivery. In case of unexpected delays, a refund will be provided, if applicable.
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                )}
            </Container>

            {isMobile && cart.cartItems.length > 0 && (
                <Paper 
                    elevation={10} 
                    sx={{ 
                        position: 'fixed', bottom: 0, left: 0, right: 0, 
                        p: '12px 20px', display: 'flex', justifyContent: 'space-between', 
                        alignItems: 'center', zIndex: 1000, borderRadius: '20px 20px 0 0',
                        background: '#ffffff', borderTop: '1px solid #eee'
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" fontWeight="900" sx={{ fontSize: '1.1rem', lineHeight: 1 }}>
                            ₹{cart.cartTotalAmount + 5}
                        </Typography>
                        <Typography 
                            variant="caption" 
                            onClick={() => document.getElementById('bill-details-section')?.scrollIntoView({ behavior: 'smooth' })}
                            sx={{ color: '#0c831f', fontWeight: '800', fontSize: '0.65rem', mt: 0.5, cursor: 'pointer' }}
                        >
                            VIEW BILL ❯
                        </Typography>
                    </Box>
                    <Button 
                        variant="contained" 
                        onClick={handlePayment}
                        sx={{ 
                            bgcolor: '#0c831f', px: 4, py: 1.2, borderRadius: '12px', 
                            fontWeight: 'bold', textTransform: 'none', fontSize: '1rem', boxShadow: 'none'
                        }}
                    >
                        Proceed to Pay
                    </Button>
                </Paper>
            )}

            {!isMobile && <Footer />}
        </Box>
    );
};

export default CartPage;