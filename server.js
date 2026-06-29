const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const { connectDB } = require('./config/db');
const portfolioRoutes = require('./routes/portfolioRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Middleware & Security
app.use(helmet({
  contentSecurityPolicy: false // Allow external images from Unsplash & font loads for demo UI
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api', portfolioRoutes);
app.use('/api/contact', contactRoutes);

// Fallback to index.html for SPA/Client routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Centralized Error Handler Middleware
app.use((err, req, res, next) => {
  console.error('[Unhandled Server Error]', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error occurred.',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`🚀 Portfolio Server running on http://localhost:${PORT}`);
  console.log(`==================================================`);
});
