// 1. Load Environment Variables (MUST BE TOP)
require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// 2. Import Route Files
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

// 3. Connect to MongoDB Atlas
connectDB();

const app = express();

// 4. Middleware
app.use(cors());           // Allows React to talk to this server
app.use(express.json());   // Parses incoming JSON data

// 5. Serve Static Images
// This makes http://localhost:5000/uploads/image.jpg work
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 6. Mount Routes
app.use('/api/auth', authRoutes);      // Login/Register
app.use('/api/products', productRoutes); // Add/Get Products

// 7. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));