import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../lib/mongodb';

dotenv.config();

async function check() {
  console.log('Testing MongoDB connection...');
  console.log('URI present:', !!process.env.MONGODB_URI);
  
  try {
    await connectDB();
    console.log('Database state:', mongoose.connection.readyState);
    console.log('Database name:', mongoose.connection.name);
    
    // Check if we can list collections
    if (!mongoose.connection.db) {
      throw new Error('MongoDB database handle is unavailable after connection');
    }

    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections found:', collections.map(c => c.name));
    
    process.exit(0);
  } catch (err) {
    console.error('Connection failed:', err);
    process.exit(1);
  }
}

check();
