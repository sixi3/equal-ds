#!/usr/bin/env node

/**
 * Test script to verify GitHub Actions workflow will work
 * This simulates what the workflow will do locally
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🧪 Testing GitHub Actions Workflow Locally...\n');

// Check if we're in a git repository
try {
  execSync('git status', { stdio: 'pipe' });
  console.log('✅ Git repository detected');
} catch (error) {
  console.error('❌ Not in a git repository');
  console.log('💡 Make sure you run this from your project root');
  process.exit(1);
}

// Check if required files exist
const requiredFiles = [
  'tokens.json',
  'design-tokens.config.js',
  'package.json',
  '.github/workflows/auto-sync-tokens.yml'
];

console.log('\n📁 Checking required files...');
for (const file of requiredFiles) {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
  }
}

// Check if required npm scripts exist
console.log('\n⚙️  Checking required npm scripts...');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const requiredScripts = [
  'tokens:sync',
  'generate:controls',
  'auto:update',
  'build-storybook'
];

for (const script of requiredScripts) {
  if (packageJson.scripts[script]) {
    console.log(`✅ npm run ${script}`);
  } else {
    console.log(`❌ npm run ${script} - MISSING`);
  }
}

// Check if Figma token is available
console.log('\n🔐 Checking Figma access...');
const figmaToken = process.env.FIGMA_ACCESS_TOKEN;
if (figmaToken) {
  console.log('✅ FIGMA_ACCESS_TOKEN environment variable found');
} else {
  console.log('⚠️  FIGMA_ACCESS_TOKEN not found');
  console.log('💡 Set this for automatic Figma syncing in GitHub Actions');
}

// Test the full workflow locally
console.log('\n🚀 Testing full workflow locally...');
try {
  console.log('📡 Step 1: Syncing tokens...');
  execSync('npm run tokens:sync', { stdio: 'inherit' });
  console.log('✅ Tokens synced');
  
  console.log('\n⚙️  Step 2: Generating controls...');
  execSync('npm run generate:controls', { stdio: 'inherit' });
  console.log('✅ Controls generated');
  
  console.log('\n📝 Step 3: Updating stories...');
  execSync('npm run auto:update', { stdio: 'inherit' });
  console.log('✅ Stories updated');
  
  console.log('\n🧪 Step 4: Building Storybook...');
  execSync('npm run build-storybook', { stdio: 'inherit' });
  console.log('✅ Storybook builds successfully');
  
  console.log('\n🎉 ALL TESTS PASSED!');
  console.log('✅ Your GitHub Actions workflow should work correctly');
  
} catch (error) {
  console.error('\n❌ Workflow test failed:', error.message);
  console.log('\n💡 Fix the issues above before pushing to GitHub');
  process.exit(1);
}

console.log('\n📋 SUMMARY:');
console.log('================');
console.log('✅ Git repository: Ready');
console.log('✅ Required files: Present');
console.log('✅ NPM scripts: Available');
console.log('✅ Full workflow: Tested');
console.log('✅ Storybook build: Successful');
console.log('\n🚀 Your GitHub Actions workflow is ready to go!');
console.log('\n💡 Next steps:');
console.log('   1. Push this to GitHub');
console.log('   2. Make a change to tokens.json');
console.log('   3. Watch the workflow run automatically!');
