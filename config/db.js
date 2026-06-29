const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio_db', {
      serverSelectionTimeoutMS: 3000 // Quick timeout so fallback can kick in if local mongo isn't active
    });
    isConnected = true;
    console.log(`[Database] MongoDB Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    isConnected = false;
    console.warn(`[Database Warning] MongoDB Connection failed (${error.message}). Running with in-memory fallback store.`);
  }
};

const getIsConnected = () => isConnected;

module.exports = { connectDB, getIsConnected };
