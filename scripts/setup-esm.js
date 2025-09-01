import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageJsonPath = path.join(__dirname, '..', 'package.json');

// Read package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Update exports to only include ESM
packageJson.exports = {
  '.': {
    import: './dist/index.js',
    types: './dist/index.d.ts'
  },
  './tokens.css': './dist/tokens.css',
  './animations.css': './dist/animations.css',
  './theme.css': './dist/tokens.css',
  './tailwind-preset': {
    import: './dist/tokens.tailwind.preset.js',
    types: './dist/tokens.tailwind.preset.d.ts'
  }
};

// Remove CommonJS files if they exist
const cjsFiles = ['dist/index.cjs', 'dist/index.cjs.map', 'dist/index.d.cts'];
cjsFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`Removed ${file}`);
  }
});

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log('✅ Package configured for ESM-only usage');
