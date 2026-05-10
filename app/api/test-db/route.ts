import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Unknown database error';
}

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ success: true, message: 'MongoDB connected successfully' });
  } catch (error: unknown) {
    return NextResponse.json({ success: false, error: getErrorMessage(error) }, { status: 500 });
  }
}
