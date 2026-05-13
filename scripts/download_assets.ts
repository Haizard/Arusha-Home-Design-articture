import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import dotenv from 'dotenv';
import Look from '../models/Look';
import MaterialRange from '../models/MaterialRange';

dotenv.config();

const PUBLIC_DIR = path.join(process.cwd(), 'public', 'assets', 'pg-bison');

// Ensure public directory exists
if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

async function downloadImage(url: string): Promise<string | null> {
    if (!url || !url.startsWith('http')) return url; // Already local or empty

    try {
        const fileName = path.basename(new URL(url).pathname);
        const localPath = path.join(PUBLIC_DIR, fileName);
        const publicPath = `/assets/pg-bison/${fileName}`;

        if (fs.existsSync(localPath)) {
            return publicPath; // Already downloaded
        }

        console.log(`Downloading: ${url}...`);
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream',
            timeout: 10000 // 10s timeout
        });

        const writer = fs.createWriteStream(localPath);
        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', () => resolve(publicPath));
            writer.on('error', reject);
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(`Failed to download ${url}:`, message);
        return url; // Keep remote if failed
    }
}

async function downloadImageList(urls: string[] | undefined): Promise<string[]> {
    const migrated: string[] = [];
    for (const url of urls || []) {
        const next = await downloadImage(url);
        if (next) migrated.push(next);
    }
    return migrated;
}

async function migrateAssets() {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in .env');
        }

        await mongoose.connect(process.env.MONGODB_URI, {
            bufferCommands: false,
            serverSelectionTimeoutMS: 20000,
            connectTimeoutMS: 20000,
            socketTimeoutMS: 30000,
        });
        console.log('Connected to MongoDB');

        // 1. Migrate Looks
        const looks = await Look.find({});
        console.log(`Checking ${looks.length} looks for remote assets...`);
        for (const look of looks) {
            look.coverImage = await downloadImage(look.coverImage) || look.coverImage;
            for (const cat of look.categories) {
                cat.coverImage = await downloadImage(cat.coverImage) || cat.coverImage;
                for (const img of cat.gallery) {
                    img.image = await downloadImage(img.image) || img.image;
                }
                for (const design of cat.coloursDesignsUsed || []) {
                    design.image = await downloadImage(design.image) || design.image;
                    design.images = await downloadImageList(design.images);
                }
                for (const productRange of cat.productRange || []) {
                    productRange.image = await downloadImage(productRange.image) || productRange.image;
                    productRange.images = await downloadImageList(productRange.images);
                }
            }
            await look.save();
        }

        // 2. Migrate Material Ranges
        const ranges = await MaterialRange.find({});
        console.log(`Checking ${ranges.length} material ranges for remote assets...`);
        for (const range of ranges) {
            range.logo = await downloadImage(range.logo) || range.logo;
            range.heroImage = await downloadImage(range.heroImage) || range.heroImage;
            for (const swatch of range.swatches) {
                swatch.image = await downloadImage(swatch.image) || swatch.image;
            }
            for (const lookGroup of range.lookGroups || []) {
                lookGroup.coverImage = await downloadImage(lookGroup.coverImage) || lookGroup.coverImage;
                for (const category of lookGroup.categories || []) {
                    category.coverImage = await downloadImage(category.coverImage) || category.coverImage;
                    for (const img of category.gallery || []) {
                        img.image = await downloadImage(img.image) || img.image;
                    }
                }
            }
            await range.save();
        }

        console.log('Asset migration completed!');
    } catch (error) {
        console.error('Error migrating assets:', error);
    } finally {
        await mongoose.disconnect();
    }
}

migrateAssets();
