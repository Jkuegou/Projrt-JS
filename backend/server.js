const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin'); 


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const connectDB = require('./config/db');
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes); 


// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Authentication API is running' });
});

const PORT = process.env.PORT || 5000;
//port message
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});