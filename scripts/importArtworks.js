/**
 * Standalone script to import artworks from a CSV file into Sanity CMS.
 * 
 * Usage:
 * 1. Install dependencies: npm install @sanity/client csv-parser dotenv
 * 2. Set up .env with SANITY_PROJECT_ID, SANITY_DATASET, and SANITY_WRITE_TOKEN
 * 3. Run: node scripts/importArtworks.js
 */

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { createClient } = require('@sanity/client');
require('dotenv').config();

// 1. Configure Sanity Client
const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET || 'production',
    token: process.env.SANITY_WRITE_TOKEN, // Requires a token with WRITE permissions
    useCdn: false, // Must be false for mutations
    apiVersion: '2024-02-25',
});

const CSV_FILE_PATH = path.join(__dirname, '../inventory.csv');

// Helper: Slugify text
function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')     // Replace spaces with -
        .replace(/[^\w-]+/g, '')   // Remove all non-word chars
        .replace(/--+/g, '-');    // Replace multiple - with single -
}

async function importArtworks() {
    if (!fs.existsSync(CSV_FILE_PATH)) {
        console.error(`Error: CSV file not found at ${CSV_FILE_PATH}`);
        process.exit(1);
    }

    console.log('🚀 Starting Artwork Import...');
    let count = 0;
    let successCount = 0;
    let errorCount = 0;

    const results = [];

    // Read CSV and parse rows
    fs.createReadStream(CSV_FILE_PATH)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            console.log(`📦 Loaded ${results.length} rows from CSV. Processing...`);

            for (const row of results) {
                count++;
                try {
                    const {
                        sku,
                        title,
                        artist,
                        medium,
                        dimensions,
                        showPrice,
                        packagedWeight
                    } = row;

                    // Prepare the document
                    // Note: Mapping 'medium' to 'material' to match the existing Sanity schema
                    const doc = {
                        _type: 'artwork',
                        sku: sku || `SKU-${Date.now()}-${count}`,
                        title: title || 'Untitled Artwork',
                        slug: {
                            _type: 'slug',
                            current: slugify(title || sku || `artwork-${count}`),
                        },
                        artist: artist || 'Unknown Master',
                        material: medium,
                        dimensions: dimensions,
                        showPrice: showPrice?.toUpperCase() === 'TRUE',
                        packagedWeight: parseFloat(packagedWeight) || 0,
                        status: 'available', // Default status
                    };

                    // Create document in Sanity
                    await client.create(doc);
                    successCount++;
                    console.log(`[${count}/${results.length}] ✅ Imported: ${doc.title} (${doc.sku})`);
                } catch (error) {
                    errorCount++;
                    console.error(`[${count}/${results.length}] ❌ Error importing row ${count}:`, error.message);
                }
            }

            console.log('\n--- Import Summary ---');
            console.log(`Total Rows: ${results.length}`);
            console.log(`Successfully Imported: ${successCount}`);
            console.log(`Errors: ${errorCount}`);
            console.log('----------------------\n');
        });
}

importArtworks();
