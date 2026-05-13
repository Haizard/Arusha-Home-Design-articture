import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';

const CLONE_PATH = 'D:\\clone pgbson\\pgbison.co.za';
const OUTPUT_FILE = path.join(process.cwd(), 'scripts', 'extracted_products.json');

interface Swatch {
    name: string;
    image: string;
    category?: string;
    look?: string;
    brand?: string;
    finish?: string;
}

interface ProductRange {
    title: string;
    slug: string;
    category: string;
    description: string;
    logo: string;
    heroImage: string;
    howItIsMade: {
        description: string;
        videoUrl: string;
    };
    downloads: { label: string; url: string }[];
    swatches: Swatch[];
}

function cleanText(value: string | undefined) {
    return (value || '').replace(/\s+/g, ' ').trim();
}

function usableText(value: string | undefined) {
    const text = cleanText(value);
    return text && text !== 'Colour' && text !== 'Color' && text !== 'Product' ? text : '';
}

function resolvePgUrl(value: string | undefined) {
    const src = cleanText(value);
    if (!src || src.startsWith('data:image/svg')) return '';
    if (src.startsWith('//')) return `https:${src}`;
    if (src.startsWith('/')) return `https://pgbison.co.za${src}`;
    return src;
}

function parseField($: cheerio.CheerioAPI, label: string) {
    const field = $('.field-label').filter((_, item) => cleanText($(item).text()).startsWith(label)).first();
    const parentText = cleanText(field.parent().text());
    return cleanText(parentText.replace(label, ''));
}

function parseSwatchPage(filePath: string, fallbackName: string, fallbackImage: string): Swatch | null {
    if (!fs.existsSync(filePath) && !fallbackImage) return null;
    const html = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
    const $ = cheerio.load(html);

    const fieldName = parseField($, 'Colour');
    const h1Name = $('h1').first().text();
    const name = usableText(fieldName) || usableText(fallbackName) || usableText(h1Name) || path.basename(filePath, '.html');
    
    // Main image from the large scrollable image
    const image = resolvePgUrl(
        $('.scrollable-image-container').attr('data-src')
        || $('.scrollable-image-container').attr('src')
        || fallbackImage
    );
    
    const look = parseField($, 'Look');
    
    const finishes: string[] = [];
    $('.finish-item').each((_, item) => {
        finishes.push(cleanText($(item).text()));
    });
    const finish = finishes.join(', ') || parseField($, 'Finish');

    return {
        name,
        image,
        category: '', // Will determine from range
        look,
        brand: '', // Will determine from range
        finish
    };
}

function main() {
    const productDir = path.join(CLONE_PATH, 'product');
    const ranges = fs.readdirSync(productDir).filter(f => fs.statSync(path.join(productDir, f)).isDirectory());

    const allProducts: ProductRange[] = [];

    for (const rangeSlug of ranges) {
        console.log(`Processing Product Range: ${rangeSlug}...`);
        const rangePath = path.join(productDir, rangeSlug, 'index.html');
        if (!fs.existsSync(rangePath)) continue;

        const html = fs.readFileSync(rangePath, 'utf8');
        const $ = cheerio.load(html);

        const title = $('h1').first().text().trim() || rangeSlug;
        const description = $('.product-intro p').first().text().trim();
        const logo = $('.product-intro img').attr('data-src') || $('.product-intro img').attr('src') || '';
        
        const heroStyle = $('.single-hero').attr('style') || '';
        const heroMatch = heroStyle.match(/url\((.*?)\)/);
        const heroImage = heroMatch ? heroMatch[1].replace(/['"]/g, '') : '';

        const howItIsMadeDesc = $('#pg_bison_products_howto .col-md-8').text().trim();
        const videoId = $('.youtube-video-frame').attr('id') || '';
        const videoUrl = videoId ? `https://www.youtube.com/watch?v=${videoId}` : '';

        const downloads: { label: string; url: string }[] = [];
        $('.download-item').each((_, a) => {
            downloads.push({
                label: $(a).text().trim().replace(/\s+/g, ' '),
                url: $(a).attr('href') || ''
            });
        });

        const swatches: Swatch[] = [];
        
        // Find all color containers (some use different classes but most have products-colors-container or color-selector-container)
        const colorContainers = $('.products-colors-container, .color-selector-container');
        if (colorContainers.length === 0) {
            console.log(`  [DEBUG] No color containers found for ${rangeSlug} using standard selectors.`);
        }

        colorContainers.each((i, container) => {
            const $container = $(container);
            // Try to find a category title for this group of swatches
            const groupCategory = $container.find('h2').first().text().trim();
            const swatchLinks = $container.find('a[href*="/products/"]');
            
            console.log(`  [DEBUG] Container ${i} group: "${groupCategory}", links found: ${swatchLinks.length}`);

            const seenHrefs = new Set<string>();
            swatchLinks.each((_, a) => {
                const href = $(a).attr('href') || '';
                // Match pattern like /products/supagloss/urbino or /products/melawood/nata
                // Also handle cases where it might have a query param or trailing slash
                // Updated regex to be more flexible: looks for /products/ followed by two segments
                const match = href.match(/\/products\/([^\/]+)\/([^\/?#]+)/);
                
                if (match && !seenHrefs.has(href)) {
                    seenHrefs.add(href);
                    const subDir = match[1];
                    const swatchSlug = match[2].replace(/\/$/, '');
                    const fallbackName = cleanText($(a).text()) || $(a).find('img').attr('alt') || swatchSlug;
                    const fallbackImage = resolvePgUrl($(a).find('img').attr('data-src') || $(a).find('img').attr('src'));
                    
                    const swatchFilePath = path.join(CLONE_PATH, 'products', subDir, `${swatchSlug}.html`);
                    
                    // console.log(`  [DEBUG] Attempting to parse swatch: ${swatchSlug} at ${swatchFilePath}`);

                    const swatchData = parseSwatchPage(swatchFilePath, fallbackName, fallbackImage);
                    if (swatchData) {
                        swatchData.brand = title;
                        // If we found a group category (e.g. "Woodgrains"), use it, otherwise fallback to range category
                        swatchData.category = groupCategory || swatchData.category;
                        
                        // Avoid duplicates if the same swatch appears in multiple carousels (unlikely but safe)
                        if (!swatches.find(s => s.name === swatchData.name && s.image === swatchData.image)) {
                            swatches.push(swatchData);
                        }
                    } else {
                        // console.log(`  [DEBUG] Failed to parse swatch file: ${swatchFilePath}`);
                    }
                }
            });
        });
        console.log(`  [DEBUG] Total swatches found for ${rangeSlug}: ${swatches.length}`);

        allProducts.push({
            title,
            slug: rangeSlug,
            category: "Decorative Board", // Default category
            description,
            logo,
            heroImage,
            howItIsMade: {
                description: howItIsMadeDesc,
                videoUrl
            },
            downloads,
            swatches
        });
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allProducts, null, 2));
    console.log(`Extraction complete! Data saved to ${OUTPUT_FILE}`);
}

main();
