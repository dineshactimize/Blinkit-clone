const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Order = require('../models/OrderModel');
const Cart = require('../models/CartModel'); 

router.post('/', protect, async (req, res) => {
    const { orderItems, shippingAddress, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
        return res.status(400).json({ message: 'No order items' });
    } else {
        try {
            const order = new Order({
                user: req.user._id,
                orderItems,
                shippingAddress,
                totalPrice
            });

            const createdOrder = await order.save();

            await Cart.findOneAndDelete({ user: req.user._id });

            res.status(201).json(createdOrder);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Order Creation Failed' });
        }
    }
});


router.get('/myorders', protect, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;