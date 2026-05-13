import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import MaterialRange from '../models/MaterialRange';

dotenv.config();

const DATA_FILE = path.join(process.cwd(), 'scripts', 'extracted_products.json');

async function seedProducts() {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in .env');
        }

        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const rawData = fs.readFileSync(DATA_FILE, 'utf8');
        const products = JSON.parse(rawData);

        for (const product of products) {
            // Clean up titles and names
            const cleanTitle = product.title.replace(/^I-/, ''); // Remove "I-" prefix if any
            
            // Transform swatches to match MaterialRange schema
            const cleanSwatches = product.swatches.map((s: any) => ({
                name: s.name === 'Colour' || s.name === 'Product' ? path.basename(s.image, path.extname(s.image)).split('_')[0].split('-')[0] : s.name,
                image: s.image,
                look: s.look,
                brand: product.title,
                finish: s.finish
            }));

            // Filter out swatches with placeholder names or empty images
            const filteredSwatches = cleanSwatches.filter((s: any) => s.image && s.name && s.name.length > 2);

            const updateData = {
                title: cleanTitle,
                category: product.category || 'Decorative Board',
                description: product.description,
                logo: product.logo,
                heroImage: product.heroImage,
                howItIsMade: product.howItIsMade,
                downloads: product.downloads,
                swatches: filteredSwatches,
                techSpecs: [] // To be filled if needed
            };

            await MaterialRange.findOneAndUpdate(
                { title: cleanTitle },
                updateData,
                { upsert: true, new: true }
            );
            console.log(`Upserted Product Range: ${cleanTitle} with ${filteredSwatches.length} swatches.`);
        }

        console.log('Seeding completed successfully!');
    } catch (error) {
        console.error('Error seeding products:', error);
    } finally {
        await mongoose.disconnect();
    }
}

seedProducts();
