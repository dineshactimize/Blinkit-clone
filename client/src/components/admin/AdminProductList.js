import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../features/products/productSlice';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,Typography, Box, Avatar, CircularProgress } from '@mui/material';

const AdminProductList = () => {
    const dispatch = useDispatch();
    const { products, isLoading } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    if (isLoading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;

    const sortedProducts = [...products].reverse();

    return (
        <Box sx={{ mt: 5 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Current Inventory ({products.length} items)
            </Typography>

            <TableContainer component={Paper} elevation={2}>
                <Table sx={{ minWidth: 650 }} aria-label="product table">
                    <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Image</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Product Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedProducts.map((product) => (
                            <TableRow
                                key={product._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Avatar 
                                        src={`http://localhost:5000${product.image}`} 
                                        variant="rounded" 
                                        sx={{ width: 50, height: 50 }}
                                    />
                                </TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>
                                    <span style={{ 
                                        backgroundColor: '#e8f5e9', 
                                        padding: '4px 8px', 
                                        borderRadius: '4px', 
                                        color: '#0c831f', 
                                        fontSize: '12px',
                                        fontWeight: 'bold'
                                    }}>
                                        {product.category}
                                    </span>
                                </TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>₹{product.price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default AdminProductList;