const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');
const webpush = require('web-push');

connectDB();

const app = express();

// app.use(express.static(path.join(__dirname, '../client/dist')));

// app.get('/*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
// });

app.use(express.static(path.join(__dirname, '../client/build')));


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

webpush.setVapidDetails(
  'mailto:dinesh.actimize@gmail.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);


app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

app.use('/api/cart', require('./routes/cart.routes'));
app.use('/api/orders', require('./routes/order.routes'));

app.use('/api/payment', require('./routes/payment.routes'));
app.use('/api/orders', require('./routes/order.routes'));

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use('/api/notifications', require('./routes/notificationRoutes'));

app.use(errorHandler);

app.get('/*splat', (req, res) => {
  res.sendFile(
    path.resolve(__dirname, '../client/build', 'index.html')
  );
});
const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Server started on port ${port.yellow.bold}`)
);
