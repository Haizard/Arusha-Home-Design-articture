import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';

const CLONE_PATH = 'D:\\clone pgbson\\pgbison.co.za';
const OUTPUT_FILE = path.join(process.cwd(), 'scripts', 'extracted_looks.json');

interface DesignUsed {
    name: string;
    image: string;
}

interface ProductRange {
    name: string;
    image: string;
    images: string[];
}

interface LookCategory {
    name: string;
    slug: string;
    description: string;
    coverImage: string;
    gallery: { image: string; alt?: string; caption?: string }[];
    coloursDesignsUsed: DesignUsed[];
    productRange: ProductRange[];
}

interface LookGroup {
    name: string;
    slug: string;
    description: string;
    coverImage: string;
    categories: LookCategory[];
}

function parseLookPage(lookSlug: string): LookCategory | null {
    const filePath = path.join(CLONE_PATH, 'look', lookSlug, 'index.html');
    if (!fs.existsSync(filePath)) return null;

    const html = fs.readFileSync(filePath, 'utf8');
    const $ = cheerio.load(html);

    const name = $('h1').first().text().trim();
    const description = $('.single-excerpt p').text().trim();
    
    // Cover image from hero section
    const heroStyle = $('.single-hero').attr('style') || '';
    const coverImageMatch = heroStyle.match(/url\((.*?)\)/);
    const coverImage = coverImageMatch ? coverImageMatch[1].replace(/['"]/g, '') : '';

    // Gallery images
    const gallery: { image: string; alt?: string; caption?: string }[] = [];
    $('.main-looks-slider img').each((_, img) => {
        const src = $(img).attr('data-src') || $(img).attr('src');
        if (src) {
            gallery.push({
                image: src,
                alt: $(img).attr('alt') || '',
                caption: ''
            });
        }
    });

    // Colours & Designs Used
    const designs: DesignUsed[] = [];
    $('.look-colors-container .color-wrapper').each((_, wrapper) => {
        const img = $(wrapper).find('img');
        const nameText = $(wrapper).find('span').text().trim();
        const src = img.attr('data-src') || img.attr('src');
        if (src && nameText) {
            designs.push({ name: nameText, image: src });
        }
    });

    // Product Range
    const productRange: ProductRange[] = [];
    $('.color-ranges-grid a').each((_, a) => {
        const img = $(a).find('img');
        const src = img.attr('data-src') || img.attr('src');
        // Product name usually in the link or image alt
        const productName = img.attr('alt') || 'Product';
        if (src) {
            productRange.push({ name: productName, image: src, images: [src] });
        }
    });

    return {
        name,
        slug: lookSlug,
        description,
        coverImage,
        gallery,
        coloursDesignsUsed: designs,
        productRange
    };
}

function main() {
    const lookTypesDir = path.join(CLONE_PATH, 'look-type');
    const lookTypes = fs.readdirSync(lookTypesDir).filter(f => fs.statSync(path.join(lookTypesDir, f)).isDirectory());

    const allData: LookGroup[] = [];

    for (const typeSlug of lookTypes) {
        console.log(`Processing look-type: ${typeSlug}...`);
        const typePath = path.join(lookTypesDir, typeSlug, 'index.html');
        if (!fs.existsSync(typePath)) continue;

        const html = fs.readFileSync(typePath, 'utf8');
        const $ = cheerio.load(html);

        const name = $('.choose-a-look-title').text().trim() || typeSlug;
        const description = $('meta[name="description"]').attr('content') || '';
        
        const heroStyle = $('.slide-wrapper').attr('style') || '';
        const coverImageMatch = heroStyle.match(/url\((.*?)\)/);
        const coverImage = coverImageMatch ? coverImageMatch[1].replace(/['"]/g, '') : '';

        const categories: LookCategory[] = [];

        // Find linked looks
        $('.look-inner-flex-item a').each((_, a) => {
            const href = $(a).attr('href') || '';
            const lookSlugMatch = href.match(/\/look\/(.*?)\//);
            if (lookSlugMatch) {
                const lookSlug = lookSlugMatch[1];
                console.log(`  Found look: ${lookSlug}`);
                const lookData = parseLookPage(lookSlug);
                if (lookData) {
                    categories.push(lookData);
                }
            }
        });

        allData.push({
            name,
            slug: typeSlug,
            description,
            coverImage,
            categories
        });
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allData, null, 2));
    console.log(`Extraction complete! Data saved to ${OUTPUT_FILE}`);
}

main();
