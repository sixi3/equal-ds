import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageJsonPath = path.join(__dirname, '..', 'package.json');

// Read package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Update exports to only include CommonJS
packageJson.exports = {
  '.': {
    require: './dist/index.cjs',
    types: './dist/index.d.cts'
  },
  './tokens.css': './dist/tokens.css',
  './animations.css': './dist/animations.css',
  './theme.css': './dist/tokens.css',
  './tailwind-preset': {
    require: './dist/tokens.tailwind.preset.cjs',
    types: './dist/tokens.tailwind.preset.d.ts'
  }
};

// Remove ESM files if they exist
const esmFiles = ['dist/index.js', 'dist/index.js.map', 'dist/index.d.ts'];
esmFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`Removed ${file}`);
  }
});

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log('✅ Package configured for CommonJS-only usage');
