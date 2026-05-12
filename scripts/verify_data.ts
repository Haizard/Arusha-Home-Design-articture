import mongoose from 'mongoose';
import dotenv from 'dotenv';
import MaterialRange from './models/MaterialRange';

dotenv.config();

async function verify() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || '');
        const count = await MaterialRange.countDocuments();
        const products = await MaterialRange.find({}, 'title swatches').lean();
        
        console.log(`Verified: ${count} products found in database.`);
        products.forEach((p: any) => {
            console.log(`- ${p.title} (${p.swatches?.length || 0} swatches)`);
        });
    } catch (e) {
        console.error('Verification failed:', e);
    } finally {
        await mongoose.disconnect();
    }
}

verify();
