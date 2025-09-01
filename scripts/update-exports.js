import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check which format files exist
const distDir = path.join(__dirname, '..', 'dist');
const packageJsonPath = path.join(__dirname, '..', 'package.json');

const hasESM = fs.existsSync(path.join(distDir, 'index.js'));
const hasCJS = fs.existsSync(path.join(distDir, 'index.cjs'));

console.log(`ESM build: ${hasESM ? '✓' : '✗'}`);
console.log(`CommonJS build: ${hasCJS ? '✓' : '✗'}`);

// Read package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Update exports based on available formats
const exports = {
  '.': {}
};

// Add types if they exist
if (fs.existsSync(path.join(distDir, 'index.d.ts'))) {
  exports['.'].types = './dist/index.d.ts';
}

// Add import if ESM exists
if (hasESM) {
  exports['.'].import = './dist/index.js';
}

// Add require if CommonJS exists
if (hasCJS) {
  exports['.'].require = './dist/index.cjs';
}

// Update main/module fields for backward compatibility
if (hasCJS) {
  packageJson.main = './dist/index.cjs';
}
if (hasESM) {
  packageJson.module = './dist/index.js';
}

// Keep existing CSS exports
exports['./tokens.css'] = './dist/tokens.css';
exports['./animations.css'] = './dist/animations.css';
exports['./theme.css'] = './dist/tokens.css';

// Tailwind preset exports (conditionally)
const tailwindPresetExports = {};
if (fs.existsSync(path.join(distDir, 'tokens.tailwind.preset.d.ts'))) {
  tailwindPresetExports.types = './dist/tokens.tailwind.preset.d.ts';
}
if (fs.existsSync(path.join(distDir, 'tokens.tailwind.preset.js'))) {
  tailwindPresetExports.import = './dist/tokens.tailwind.preset.js';
}
if (fs.existsSync(path.join(distDir, 'tokens.tailwind.preset.cjs'))) {
  tailwindPresetExports.require = './dist/tokens.tailwind.preset.cjs';
}

if (Object.keys(tailwindPresetExports).length > 0) {
  exports['./tailwind-preset'] = tailwindPresetExports;
}

packageJson.exports = exports;

// Write updated package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log('✅ Package.json exports updated based on built formats');
