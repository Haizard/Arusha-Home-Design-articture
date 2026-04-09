const https = require('https');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, 'public', 'images');

if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

const images = [
  // Hero Slides
  { name: 'hero-1.jpg', url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=85&auto=format' },
  { name: 'hero-2.jpg', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=85&auto=format' },
  { name: 'hero-3.jpg', url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=85&auto=format' },
  { name: 'hero-4.jpg', url: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1920&q=85&auto=format' },
  
  // Page Headers
  { name: 'about-hero.jpg', url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1920&q=80&auto=format' },
  { name: 'services-hero.jpg', url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80&auto=format' },
  { name: 'projects-hero.jpg', url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1920&q=80&auto=format' },
  { name: 'products-hero.jpg', url: 'https://images.unsplash.com/photo-1556912177-c54030639a03?w=1920&q=80&auto=format' },
  { name: 'contact-hero.jpg', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80&auto=format' },
  
  // Team
  { name: 'team-1.jpg', url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80&auto=format' },
  { name: 'team-2.jpg', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80&auto=format' },
  { name: 'team-3.jpg', url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80&auto=format' },
  { name: 'team-4.jpg', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&auto=format' },
  
  // Services
  { name: 'service-kitchen.jpg', url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&auto=format' },
  { name: 'service-arch.jpg', url: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80&auto=format' },
  { name: 'service-interior.jpg', url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80&auto=format' },
  { name: 'service-3d.jpg', url: 'https://images.unsplash.com/photo-1545231027-637d2f6210f8?w=800&q=80&auto=format' },
  { name: 'service-const.jpg', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80&auto=format' },
  { name: 'service-renov.jpg', url: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&q=80&auto=format' },
  
  // Products
  { name: 'prod-tv.jpg', url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80&auto=format' },
  { name: 'prod-wardrobe.jpg', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format' },
  { name: 'prod-bed.jpg', url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80&auto=format' },
  { name: 'prod-bath.jpg', url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80&auto=format' },
  
  // Projects
  { name: 'proj-1.jpg', url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80&auto=format' },
  { name: 'proj-2.jpg', url: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80&auto=format' },
  { name: 'proj-3.jpg', url: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80&auto=format' }
];

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err.message);
    });
  });
};

async function main() {
  console.log('Starting images download...');
  for (const img of images) {
    const dest = path.join(IMAGES_DIR, img.name);
    try {
      if (!fs.existsSync(dest)) {
        console.log(`Downloading ${img.name}...`);
        await download(img.url, dest);
        console.log(`Finished ${img.name}`);
      } else {
        console.log(`${img.name} already exists, skipping.`);
      }
    } catch (err) {
      console.error(`Error downloading ${img.name}: ${err}`);
    }
  }
  console.log('All images downloaded successfully into /public/images/');
}

main();
