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
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 10000,
      // NOTE: family:4 intentionally removed — it prevents SRV DNS from resolving
      // on networks whose DNS server does not support SRV records over IPv4-only paths.
    };

    console.log('⏳ Connecting to MongoDB...');
    cached.promise = mongoose.connect(URI, opts)
      .then((mg) => {
        console.log('✅ MongoDB Connected Successfully');
        return mg;
      })
      .catch((err) => {
        // Reset so the NEXT request will retry a fresh connection
        cached.promise = null;
        console.error('❌ MongoDB Connection Error:', err.message);
        console.error(
          '\n🔧 Atlas checklist — work through these steps:\n' +
          '  1. Open https://cloud.mongodb.com → find your cluster\n' +
          '     → if it shows "Paused", click Resume and wait ~1 min\n' +
          '  2. Network Access → Add IP Address → 0.0.0.0/0  (allow all IPs)\n' +
          '  3. Database Access → confirm user "haithammisape_db_user" exists\n' +
          '     with the password in your MONGODB_URI\n' +
          '  4. Re-check the MONGODB_URI value in your .env file\n'
        );
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
