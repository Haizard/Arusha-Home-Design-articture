import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { randomUUID } from 'crypto';

export async function POST(req: NextRequest) {
  console.log('--- Upload Request Started ---');
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file || typeof file === 'string') {
      console.warn('Upload Error: No file or invalid file type in formData');
      return NextResponse.json({ success: false, message: 'No file uploaded or invalid file format' }, { status: 400 });
    }

    console.log(`Uploading file: ${file.name}, size: ${file.size} bytes`);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const ext = file.name.split('.').pop();
    const filename = `${randomUUID()}.${ext}`;
    
    // Improved path resolution
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    console.log(`Target upload directory: ${uploadDir}`);
    console.log(`Current working directory: ${process.cwd()}`);

    try {
      await mkdir(uploadDir, { recursive: true });
      console.log('Upload directory checked/created');
    } catch (e: any) {
      console.error('Error creating upload directory:', e.message);
    }

    const path = join(uploadDir, filename);
    console.log(`Writing file to: ${path}`);
    
    await writeFile(path, buffer);
    console.log('File written successfully');

    return NextResponse.json({ 
      success: true, 
      url: `/uploads/${filename}` 
    });

  } catch (error: any) {
    console.error('CRITICAL Upload Error:', error);
    return NextResponse.json({ 
      success: false, 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined 
    }, { status: 500 });
  } finally {
    console.log('--- Upload Request Ended ---');
  }
}
