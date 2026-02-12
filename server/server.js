const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');


connectDB();

const app = express();


app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));


app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));


app.use('/api/cart', require('./routes/cart.routes'));   
app.use('/api/orders', require('./routes/order.routes')); 

app.use('/api/payment', require('./routes/payment.routes'));
app.use('/api/orders', require('./routes/order.routes'));

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use('/api/notifications', require('./routes/notificationRoutes'));
// app.use('/api/notifications', require('./routes/notificationRoutes'));

app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port.yellow.bold}`));