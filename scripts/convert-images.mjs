/**
 * convert-images.mjs
 * Converts all JPEG and PNG images in src/images/ to WebP using sharp.
 * Run once: npm run images
 * Original files are left untouched as fallbacks.
 */

import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const INPUT_DIR  = join(__dirname, '../src/images');
const QUALITY    = 82; // WebP quality — good balance of size vs visual fidelity

const CONVERTIBLE = new Set(['.jpg', '.jpeg', '.png']);

async function convertImages() {
    const files = await readdir(INPUT_DIR);
    const targets = files.filter(f => CONVERTIBLE.has(extname(f).toLowerCase()));

    if (targets.length === 0) {
        console.log('No convertible images found.');
        return;
    }

    console.log(`Converting ${targets.length} image(s) to WebP (quality: ${QUALITY})...\n`);

    let saved = 0;
    for (const file of targets) {
        const inputPath  = join(INPUT_DIR, file);
        const outputName = basename(file, extname(file)) + '.webp';
        const outputPath = join(INPUT_DIR, outputName);

        try {
            const before = (await stat(inputPath)).size;
            await sharp(inputPath)
                .webp({ quality: QUALITY })
                .toFile(outputPath);
            const after = (await stat(outputPath)).size;
            const saving = Math.round((1 - after / before) * 100);

            console.log(`  ✅  ${file.padEnd(35)} ${(before / 1024).toFixed(0).padStart(5)}KB → ${(after / 1024).toFixed(0).padStart(5)}KB   (${saving}% smaller)`);
            saved += before - after;
        } catch (err) {
            console.error(`  ❌  ${file}: ${err.message}`);
        }
    }

    console.log(`\n  Total saved: ${(saved / 1024).toFixed(0)}KB`);
    console.log('\nDone. Original files unchanged — browser uses WebP via <picture> element fallback.');
}

convertImages().catch(err => {
    console.error('Conversion failed:', err.message);
    process.exit(1);
});
