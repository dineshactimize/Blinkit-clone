import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper, Divider, Chip, CircularProgress, Button } from '@mui/material';
import axios from '../api/axiosConfig'; 
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            if(!user) return;
            try {
                const config = {
                    headers: { Authorization: `Bearer ${user.token}` },
                };
                const { data } = await axios.get('/orders/myorders', config);
                setOrders(data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress color="success" /></Box>;

    return (
        <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <Container maxWidth="md" sx={{ mt: 4, mb: 8, flexGrow: 1 }}>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>My Orders</Typography>

                {orders.length === 0 ? (
                    <Box sx={{ textAlign: 'center', mt: 8 }}>
                        <Typography variant="h6" color="text.secondary">No past orders found.</Typography>
                        <Button variant="contained" onClick={() => navigate('/')} sx={{ mt: 2, bgcolor: '#0c831f' }}>Start Shopping</Button>
                    </Box>
                ) : (
                    orders.map((order) => (
                        <Paper key={order._id} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">ORDER ID: {order._id}</Typography>
                                    <Typography variant="caption" color="text.secondary">{new Date(order.createdAt).toLocaleString()}</Typography>
                                </Box>
                                <Chip label={order.status} color="success" size="small" variant="outlined" />
                            </Box>
                            <Divider sx={{ mb: 2 }} />
                            {order.orderItems.map((item, index) => (
                                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <img src={`https://blinkit-clone-qd0s.onrender.com${item.image}`} alt={item.name} style={{ width: 50, height: 50, objectFit: 'contain', marginRight: 15 }} />
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography variant="body2" fontWeight="bold">{item.name}</Typography>
                                        <Typography variant="caption" color="text.secondary">Qty: {item.quantity}</Typography>
                                    </Box>
                                    <Typography variant="body2" fontWeight="bold">₹{item.price * item.quantity}</Typography>
                                </Box>
                            ))}
                            <Divider sx={{ my: 2 }} />
                            <Box sx={{ textAlign: 'right' }}>
                                <Typography variant="h6" fontWeight="bold">Total Paid: ₹{order.totalAmount}</Typography>
                            </Box>
                        </Paper>
                    ))
                )}
            </Container>
            <Footer />
        </Box>
    );
};

export default OrdersPage;