import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../features/products/productSlice';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);

    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('image', image);

        dispatch(createProduct(formData));


        setName('');
        setPrice('');
        setCategory('');
        setImage(null);
    };

    return (
        <Paper elevation={3} sx={{ p: 3, maxWidth: 500, margin: '20px auto' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Add New Product</Typography>
            <Box component="form" onSubmit={onSubmit}>
                <TextField
                    fullWidth label="Product Name" margin="normal"
                    value={name} onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    fullWidth label="Price" margin="normal" type="number"
                    value={price} onChange={(e) => setPrice(e.target.value)}
                />
                <TextField
                    fullWidth label="Category (e.g. Milk, Veg)" margin="normal"
                    value={category} onChange={(e) => setCategory(e.target.value)}
                />

                <Button variant="contained" component="label" sx={{ mt: 2, mb: 2 }}>
                    Upload Image
                    <input
                        type="file"
                        hidden
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </Button>
                {image && <Typography variant="caption" display="block">{image.name}</Typography>}

                <Button type="submit" fullWidth variant="contained" color="secondary">
                    Add Product
                </Button>
            </Box>
        </Paper>
    );
};

export default AddProduct;