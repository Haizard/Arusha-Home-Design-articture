import connectDB from '../lib/mongodb';
import MaterialRange from '../models/MaterialRange';
import dotenv from 'dotenv';

dotenv.config();

const sampleMaterial = {
  title: 'MONTEO+',
  category: 'Melamine Faced Board',
  description: 'Welcome to a rich, new world of creative possibility, with Monteo+™, our luxury range of melamine faced board, built on our distinctive NobleCore™ substrate.\n\nMade for today and inspired by global trends, Monteo+™ is designed for surface detailing, panelling and decorative edge treatments in living areas, kitchens, offices and shopfitting applications.',
  logo: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&q=80',
  heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80',
  techSpecs: [
    { label: 'Substrate', value: 'NobleCore™' },
    { label: 'Finish', value: 'Natural Touch' },
    { label: 'Thickness', value: '16mm, 18mm' },
    { label: 'Sheet Size', value: '2750mm x 1830mm' }
  ],
  swatches: [
    { 
      name: 'Thornbury', 
      image: 'https://images.unsplash.com/photo-1596484552834-6a58f850d0fa?w=800&q=80',
      look: 'Wood',
      brand: 'Monteo+',
      finish: 'SupaTexture'
    },
    { 
      name: 'Kalapana', 
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
      look: 'Solid',
      brand: 'Monteo+',
      finish: 'Matte'
    },
    { 
      name: 'Dunblane Grey', 
      image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80',
      look: 'Solid',
      brand: 'Monteo+',
      finish: 'Matte'
    }
  ],
  profiles: [
    'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&q=80',
    'https://images.unsplash.com/photo-1558904541-efa843a96f0a?w=800&q=80'
  ]
};

async function seed() {
  await connectDB();
  await MaterialRange.deleteMany({});
  await MaterialRange.create(sampleMaterial);
  console.log('Sample Material seeded successfully!');
  process.exit(0);
}

seed();
