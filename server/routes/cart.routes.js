const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth'); 
const Cart = require('../models/CartModel');


router.post('/', protect, async (req, res) => {
    const { items, totalAmount } = req.body;
    const userId = req.user._id;

    try {
        const cart = await Cart.findOneAndUpdate(
            { user: userId },
            { 
                $set: { 
                    items: items, 
                    totalAmount: totalAmount 
                } 
            },
            { new: true, upsert: true } 
        );

        res.json(cart);
    } catch (error) {
        console.error("Cart Save Error:", error);
        res.status(500).json({ message: 'Server Error saving cart' });
    }
});


router.get('/', protect, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            return res.json({ items: [], totalAmount: 0 });
        }
        res.json(cart);
    } catch (error) {
        console.error("Cart Fetch Error:", error);
        res.status(500).json({ message: 'Server Error fetching cart' });
    }
});

module.exports = router;