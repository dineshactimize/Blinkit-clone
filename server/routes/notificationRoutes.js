const express = require('express');
const router = express.Router();
const webpush = require('web-push');
const Subscription = require('../models/subscriptionModel');
const { protect } = require('../middleware/auth');

webpush.setVapidDetails(
    process.env.VAPID_EMAIL,
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
);

router.post('/subscribe', protect, async (req, res) => {
    const subscription = req.body;

    try {

        await Subscription.findOneAndUpdate(
            { endpoint: subscription.endpoint },
            {
                user: req.user._id,
                endpoint: subscription.endpoint,
                keys: subscription.keys
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        res.status(201).json({ message: "Subscription updated!" });
    } catch (error) {
        console.error("Subscription DB Error:", error);
        res.status(500).json({ message: 'Failed to subscribe' });
    }
});

module.exports = router;