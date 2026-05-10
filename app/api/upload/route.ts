import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 60; // Allow 60 seconds for processing large images

function getErrorDetails(error: unknown) {
  if (error instanceof Error) {
    return {
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    };
  }

  return {
    message: 'Unknown upload error',
    stack: undefined,
  };
}

export async function POST(req: NextRequest) {
  console.log('--- Upload Request Started (Base64 Mode) ---');
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file || typeof file === 'string') {
      console.warn('Upload Error: No file or invalid file type in formData');
      return NextResponse.json({ success: false, message: 'No file uploaded or invalid file format' }, { status: 400 });
    }

    console.log(`Processing file: ${file.name}, type: ${file.type}, size: ${file.size} bytes`);

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Convert to Base64 Data URI
    // This allows storing the image directly in MongoDB as a string
    const base64Image = buffer.toString('base64');
    const dataUri = `data:${file.type};base64,${base64Image}`;

    console.log('File converted to Base64 successfully');

    return NextResponse.json({ 
      success: true, 
      url: dataUri 
    });

  } catch (error: unknown) {
    const errorDetails = getErrorDetails(error);
    console.error('CRITICAL Upload Error:', error);
    return NextResponse.json({ 
      success: false, 
      message: errorDetails.message,
      stack: errorDetails.stack
    }, { status: 500 });
  } finally {
    console.log('--- Upload Request Ended ---');
  }
}
