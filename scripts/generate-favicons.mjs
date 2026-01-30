import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, '..', 'public');

// Read the SVG file
const svgPath = join(publicDir, 'logo.svg');
const svgBuffer = readFileSync(svgPath);

// Generate favicon-16x16.png
await sharp(svgBuffer)
  .resize(16, 16)
  .png()
  .toFile(join(publicDir, 'favicon-16x16.png'));
console.log('Created favicon-16x16.png');

// Generate favicon-32x32.png
await sharp(svgBuffer)
  .resize(32, 32)
  .png()
  .toFile(join(publicDir, 'favicon-32x32.png'));
console.log('Created favicon-32x32.png');

// Generate apple-touch-icon.png (180x180)
await sharp(svgBuffer)
  .resize(180, 180)
  .png()
  .toFile(join(publicDir, 'apple-touch-icon.png'));
console.log('Created apple-touch-icon.png');

// Generate favicon.ico (32x32 as ICO format - using PNG since sharp doesn't natively support ICO)
// For ICO format, we'll generate a 32x32 PNG and copy it
// Most modern browsers accept PNG for favicon.ico location
await sharp(svgBuffer)
  .resize(32, 32)
  .png()
  .toFile(join(publicDir, 'favicon.ico'));
console.log('Created favicon.ico');

console.log('All favicons generated successfully!');
