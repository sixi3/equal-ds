#!/usr/bin/env node

/**
 * FULLY AUTOMATIC UPDATE SCRIPT
 * This script does everything automatically:
 * 1. Syncs tokens from Figma
 * 2. Generates Storybook controls
 * 3. Updates your stories with latest controls
 * 
 * NO MANUAL WORK REQUIRED!
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Starting FULLY AUTOMATIC update process...\n');

try {
  // Step 1: Sync tokens from Figma
  console.log('📡 Step 1: Syncing tokens from Figma...');
  execSync('npm run tokens:sync', { stdio: 'inherit' });
  console.log('✅ Tokens synced successfully!\n');

  // Step 2: Generate Storybook controls
  console.log('⚙️  Step 2: Generating Storybook controls...');
  execSync('npm run generate:controls', { stdio: 'inherit' });
  console.log('✅ Controls generated successfully!\n');

  // Step 3: Auto-update stories
  console.log('📝 Step 3: Updating Storybook stories...');
  execSync('npm run auto:update', { stdio: 'inherit' });
  console.log('✅ Stories updated successfully!\n');

  console.log('🎉 COMPLETE! Everything is now fully automatic:');
  console.log('   ✅ Design tokens synced from Figma');
  console.log('   ✅ Storybook controls generated');
  console.log('   ✅ Stories updated with latest controls');
  console.log('   ✅ NO MANUAL WORK REQUIRED!');
  console.log('\n🚀 You can now run "npm run storybook" to see your updated controls!');

} catch (error) {
  console.error('❌ Error during automatic update:', error.message);
  console.log('\n💡 Try running the steps manually:');
  console.log('   1. npm run tokens:sync');
  console.log('   2. npm run generate:controls');
  console.log('   3. npm run auto:update');
  process.exit(1);
}
