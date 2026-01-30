const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const Product = require('../models/product');


router.post('/', protect, upload.single('image'), async (req, res) => {
    try {
     
        
        if (!req.file) {
            return res.status(400).send('No image uploaded');
        }

        const product = new Product({
            user: req.user,
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            image: `/uploads/${req.file.filename}` 
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});


router.get('/', async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

module.exports = router;