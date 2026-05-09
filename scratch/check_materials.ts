import connectDB from '../lib/mongodb';
import MaterialRange from '../models/MaterialRange';
import dotenv from 'dotenv';

dotenv.config();

async function check() {
  await connectDB();
  const ranges = await MaterialRange.find({}).lean();
  console.log('Material Ranges:', JSON.stringify(ranges, null, 2));
  process.exit(0);
}

check();
