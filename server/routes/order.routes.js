const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');
const Cart = require('../models/CartModel'); 
const Subscription = require('../models/subscriptionModel');
const webpush = require('web-push'); 
const { protect } = require('../middleware/auth'); 

router.post('/', protect, async (req, res) => {
    const { orderItems, totalAmount, paymentId } = req.body;

    if (!orderItems || orderItems.length === 0) {
        return res.status(400).json({ message: 'No order items' });
    }

    try {
        
        const order = new Order({
            user: req.user._id,
            orderItems: orderItems.map((item) => ({
                product: item.product || item._id, 
                name: item.name,
                quantity: item.quantity || item.cartQuantity,
                image: item.image,
                price: item.price
            })),
            totalAmount,
            paymentId,
            isPaid: true
        });

        const createdOrder = await order.save();

        await Cart.findOneAndDelete({ user: req.user._id });

        try {
            const sub = await Subscription.findOne({ user: req.user._id });
            
            if (sub) {
                const payload = JSON.stringify({
                    title: 'Order Placed!',
                    body: `Your order for ₹${totalAmount} is confirmed.`
                });

                await webpush.sendNotification(sub, payload)
                    .then(() => console.log("Notification sent successfully."))
                    .catch(async (err) => {
                        console.error("Notification Send Error:", err.statusCode);
                        
                        if (err.statusCode === 410 || err.statusCode === 404) {
                            console.log("Subscription expired. Removing from database...");
                            await Subscription.deleteOne({ _id: sub._id });
                        }
                    });
            }
        } catch (notifyError) {
            console.error("Notification Logic Error:", notifyError);
        }

        res.status(201).json(createdOrder);

    } catch (error) {
        console.error("Order Creation Error:", error);
        res.status(500).json({ message: 'Server Error: Could not create order' });
    }
});

router.get('/myorders', protect, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.error("Order Fetch Error:", error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;