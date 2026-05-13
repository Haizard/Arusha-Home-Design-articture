import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import Look from '../models/Look';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/arusha_home_design';
const jsonPath = path.join(process.cwd(), 'scripts', 'extracted_looks.json');

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        if (!fs.existsSync(jsonPath)) {
            console.error('JSON file not found at', jsonPath);
            return;
        }

        const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        console.log(`Found ${data.length} look groups to seed.`);

        for (const group of data) {
            console.log(`Upserting Look Group: ${group.slug} (${group.name})...`);
            
            // Transform extracted data to match Look schema
            const lookData = {
                name: group.slug.charAt(0).toUpperCase() + group.slug.slice(1), // Use slug as name if name is generic
                slug: group.slug,
                description: group.description,
                coverImage: group.coverImage,
                categories: group.categories.map((cat: any) => ({
                    name: cat.name,
                    slug: cat.slug,
                    description: cat.description,
                    coverImage: cat.coverImage,
                    gallery: cat.gallery,
                    coloursDesignsUsed: cat.coloursDesignsUsed,
                    productRange: cat.productRange.map((pr: any) => ({
                        name: pr.name === 'alt tag' ? 'PG Bison Product' : pr.name,
                        image: pr.image
                    }))
                }))
            };

            // Fix the name if it was "Choose Your Look"
            if (group.name === 'Choose Your Look') {
                lookData.name = group.slug.charAt(0).toUpperCase() + group.slug.slice(1);
            } else {
                lookData.name = group.name;
            }

            await Look.findOneAndUpdate(
                { slug: group.slug },
                lookData,
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
