import mongoose from 'mongoose';
import dotenv from 'dotenv';
import MaterialRange from '../models/MaterialRange';
import Look from '../models/Look';

dotenv.config();

async function verify() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || '', {
            bufferCommands: false,
            serverSelectionTimeoutMS: 20000,
            connectTimeoutMS: 20000,
            socketTimeoutMS: 30000,
        });
        
        // Verify Products
        const materialCount = await MaterialRange.countDocuments();
        const products = await MaterialRange.find({}, 'title swatches').lean();
        console.log(`\nVerified: ${materialCount} products found in database.`);
        products.forEach((p: any) => {
            console.log(`- ${p.title} (${p.swatches?.length || 0} swatches)`);
        });

        // Verify Looks
        const lookCount = await Look.countDocuments();
        const looks = await Look.find({}, 'name slug categories').lean();
        console.log(`\nVerified: ${lookCount} look groups found in database.`);
        looks.forEach((l: any) => {
            console.log(`- ${l.name} (${l.slug}): ${l.categories?.length || 0} individual looks`);
        });

    } catch (e) {
        console.error('Verification failed:', e);
    } finally {
        await mongoose.disconnect();
    }
}

verify();
