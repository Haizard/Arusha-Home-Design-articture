import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import MaterialRange from '../models/MaterialRange';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/arusha_home_design';
const jsonPath = 'C:\\Users\\HAIZARD\\.gemini\\antigravity\\brain\\34f2a677-b78d-4376-b1c8-5e476eb47550\\scratch\\extracted_products.json';

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        if (!fs.existsSync(jsonPath)) {
            console.error('JSON file not found at', jsonPath);
            return;
        }

        const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        console.log(`Found ${data.length} products to seed.`);

        for (const item of data) {
            console.log(`Upserting ${item.name}...`);
            
            const materialData = {
                title: item.name,
                category: item.subTitle || 'Material Board',
                description: item.description,
                logo: item.logo,
                heroImage: item.image,
                howItIsMade: {
                    description: item.howItIsMade.description,
                    videoUrl: item.howItIsMade.videoId ? `https://www.youtube.com/watch?v=${item.howItIsMade.videoId}` : ''
                },
                downloads: item.downloads.map((d: any) => ({ label: d.title, url: d.url })),
                techSpecs: item.technicalSpecs ? [{ label: 'Technical Details', value: item.technicalSpecs }] : [],
                swatches: item.swatches.map((s: any) => ({
                    name: s.name,
                    image: s.image,
                    category: s.category
                }))
            };

            await MaterialRange.findOneAndUpdate(
                { title: item.name },
                materialData,
                { upsert: true, new: true }
            );
        }

        console.log('Seeding completed successfully.');
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        await mongoose.disconnect();
    }
}

seed();
