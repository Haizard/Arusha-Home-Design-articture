import mongoose from 'mongoose';

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var mongoose: MongooseCache | undefined;
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
const cached = global.mongoose ?? (global.mongoose = { conn: null, promise: null });

async function connectDB() {
  const URI = process.env.MONGODB_URI;
  if (!URI) {
    console.error('❌ MONGODB_URI is missing in environment variables');
    throw new Error('MONGODB_URI is not defined. Set it in .env or .env.local');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      family: 4, // Force IPv4
    };

    console.log('⏳ Connecting to MongoDB...');
    cached.promise = mongoose.connect(URI, opts).then((mongoose) => {
      console.log('✅ MongoDB Connected Successfully');
      return mongoose;
    }).catch((err) => {
      console.error('❌ MongoDB Connection Error:', err.message);
      throw err;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
