const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');

connectDB();
const app = express();

// 1. MIDDLEWARE
app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

// 2. API ROUTES (Must be ABOVE the static files)
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cart.routes'));   
app.use('/api/orders', require('./routes/order.routes')); 
app.use('/api/payment', require('./routes/payment.routes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// 3. STATIC FILES (Serve React from /client/dist)
const buildPath = path.join(__dirname, '../client/dist');
app.use(express.static(buildPath));

// 4. THE CATCH-ALL (Must be BELOW API routes)
// Using (.*) fixes the "PathError: Missing parameter name"
app.get('(.*)', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

// 5. ERROR HANDLER
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', () => console.log(`Server started on port ${port.yellow.bold}`));