#!/usr/bin/env node

/**
 * Fix Tailwind Config Content Paths
 * Adds the content option to auto-generated tailwind.config.js
 * This runs after design-tokens-sync generates the config
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const projectRoot = path.resolve(__dirname, '..')
const tailwindConfigPath = path.join(projectRoot, 'tailwind.config.js')

const CONTENT_PATHS = ['src/**/*.{ts,tsx}', 'stories/**/*.{ts,tsx}']

function fixTailwindConfig() {
  try {
    // Check if file exists
    if (!fs.existsSync(tailwindConfigPath)) {
      console.log('⚠️  tailwind.config.js not found, skipping fix')
      return
    }

    // Read the current config
    let configContent = fs.readFileSync(tailwindConfigPath, 'utf8')

    // Check if content already exists (check for content key in the config object)
    const contentRegex = /["']content["']\s*:/i
    if (contentRegex.test(configContent)) {
      console.log('✅ tailwind.config.js already has content option')
      return
    }

    // Find the export default block and add content before theme
    // Match: export default { ... "theme": {
    const themeRegex = /export\s+default\s+\{([\s\S]*?)"theme":/m
    const match = configContent.match(themeRegex)

    if (match) {
      // Add content option right after the opening brace, before theme
      const contentLine = `  "content": [${CONTENT_PATHS.map(p => `"${p}"`).join(', ')}],\n`
      
      // Insert content before theme
      configContent = configContent.replace(
        /(export\s+default\s+\{)/,
        `$1\n${contentLine}`
      )

      // Write back
      fs.writeFileSync(tailwindConfigPath, configContent, 'utf8')
      console.log('✅ Added content option to tailwind.config.js')
    } else {
      // Fallback: try to add after opening brace
      const contentLine = `  "content": [${CONTENT_PATHS.map(p => `"${p}"`).join(', ')}],`
      configContent = configContent.replace(
        /(export\s+default\s+\{)/,
        `$1\n${contentLine}`
      )
      fs.writeFileSync(tailwindConfigPath, configContent, 'utf8')
      console.log('✅ Added content option to tailwind.config.js (fallback method)')
    }
  } catch (error) {
    console.error('❌ Error fixing tailwind.config.js:', error.message)
    process.exit(1)
  }
}

fixTailwindConfig()

