import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

const mongo_url = process.env.MONGO_CONNECTION;

mongoose.connect(mongo_url)
  .then(() => {
    console.log('MongoDB Connected...');
  })
  .catch((err) => {
    console.log('MongoDB Connection error:', err);
  });
