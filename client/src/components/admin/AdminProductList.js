import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, deleteProduct, updateProduct } from '../../features/products/productSlice';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Typography, Box, Avatar, CircularProgress, IconButton, Dialog,
    DialogTitle, DialogContent, TextField, DialogActions, Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const AdminProductList = () => {
    const dispatch = useDispatch();
    const { products, isLoading } = useSelector((state) => state.product);

    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState({
        id: '', name: '', price: '', category: '', image: '', description: ''
    });

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteProduct(id));
        }
    };

    const handleEditClick = (product) => {
        setEditData({
            id: product._id,
            name: product.name,
            price: product.price,
            category: product.category,
            image: product.image,
            description: product.description || ''
        });
        setOpen(true);
    };

    const handleChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleUpdate = () => {
        const { id, ...productData } = editData;
        dispatch(updateProduct({ id, productData }));
        setOpen(false);
    };

    if (isLoading && products.length === 0) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;

    const sortedProducts = [...products].reverse();

    return (
        <Box sx={{ mt: 5 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Current Inventory ({products.length} items)
            </Typography>

            <TableContainer component={Paper} elevation={2}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell><b>Image</b></TableCell>
                            <TableCell><b>Name</b></TableCell>
                            <TableCell><b>Category</b></TableCell>
                            <TableCell><b>Price</b></TableCell>
                            <TableCell align="center"><b>Actions</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedProducts.map((product) => (
                            <TableRow key={product._id}>
                                <TableCell>
                                    <Avatar src={`ttps://blinkit-clone-qd0s.onrender.com${product.image}`} variant="rounded" sx={{ width: 50, height: 50 }} />
                                </TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>
                                    <span style={{ backgroundColor: '#e8f5e9', padding: '4px 8px', borderRadius: '4px', color: '#0c831f', fontWeight: 'bold', fontSize: '12px' }}>
                                        {product.category}
                                    </span>
                                </TableCell>
                                <TableCell>₹{product.price}</TableCell>
                                <TableCell align="center">
                                    <IconButton color="primary" onClick={() => handleEditClick(product)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleDelete(product._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 2, width: 400 }}>
                        <TextField label="Name" name="name" value={editData.name} onChange={handleChange} fullWidth />
                        <TextField label="Price" name="price" type="number" value={editData.price} onChange={handleChange} fullWidth />
                        <TextField label="Category" name="category" value={editData.category} onChange={handleChange} fullWidth />
                        <TextField label="Image URL" name="image" value={editData.image} onChange={handleChange} fullWidth />
                        <TextField label="Description" name="description" value={editData.description} onChange={handleChange} fullWidth multiline rows={3} />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleUpdate} variant="contained" color="primary">Update</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AdminProductList;