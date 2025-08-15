#!/usr/bin/env node

/**
 * Auto-generates Storybook controls from design tokens
 * Run this after `npm run tokens:sync` to keep controls in sync
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the generated tokens
const tokensPath = path.join(__dirname, '../tokens.json');
const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));

// Generate controls configuration
function generateControls() {
  const controls = {
    borderColor: {
      control: { type: 'select' },
      options: [],
      mapping: {},
      description: 'Border color from design tokens',
      defaultValue: '#E7EDF0',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#E7EDF0 (--color-border-default)' },
        category: 'Design Tokens',
      },
    },
    backgroundColor: {
      control: { type: 'select' },
      options: [],
      mapping: {},
      description: 'Background color from design tokens',
      defaultValue: '#FFFFFF',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#FFFFFF (--color-gray-50)' },
        category: 'Design Tokens',
      },
    },
    textColor: {
      control: { type: 'select' },
      options: [],
      mapping: {},
      description: 'Text color from design tokens',
      defaultValue: '#0F3340',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#0F3340 (--color-text-primary)' },
        category: 'Design Tokens',
      },
    },
    padding: {
      control: { type: 'select' },
      options: [],
      mapping: {},
      description: 'Padding from design tokens',
      defaultValue: '1rem',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '1rem (--spacing-4)' },
        category: 'Design Tokens',
      },
    },
    borderRadius: {
      control: { type: 'select' },
      options: [],
      mapping: {},
      description: 'Border radius from design tokens',
      defaultValue: '0.375rem',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0.375rem (--border-radius-md)' },
        category: 'Design Tokens',
      },
    },
  };

  // Generate border color options from tokens
  if (tokens.core?.colors) {
    // Add primary colors
    if (tokens.core.colors.primary) {
      Object.entries(tokens.core.colors.primary).forEach(([key, token]) => {
        controls.borderColor.options.push(token.value);
        controls.borderColor.mapping[token.value] = `--color-primary-${key} (Primary ${key})`;
      });
    }
    
    // Add gray colors
    if (tokens.core.colors.gray) {
      Object.entries(tokens.core.colors.gray).forEach(([key, token]) => {
        controls.borderColor.options.push(token.value);
        controls.borderColor.mapping[token.value] = `--color-gray-${key} (Gray ${key})`;
      });
    }
  }

  // Generate background color options
  if (tokens.core?.colors) {
    // Add primary colors
    if (tokens.core.colors.primary) {
      Object.entries(tokens.core.colors.primary).forEach(([key, token]) => {
        controls.backgroundColor.options.push(token.value);
        controls.backgroundColor.mapping[token.value] = `--color-primary-${key} (Primary ${key})`;
      });
    }
    
    // Add gray colors
    if (tokens.core.colors.gray) {
      Object.entries(tokens.core.colors.gray).forEach(([key, token]) => {
        controls.backgroundColor.options.push(token.value);
        controls.backgroundColor.mapping[token.value] = `--color-primary-${key} (Primary ${key})`;
      });
    }
  }

  // Generate text color options
  if (tokens.core?.colors) {
    // Add primary colors
    if (tokens.core.colors.primary) {
      Object.entries(tokens.core.colors.primary).forEach(([key, token]) => {
        controls.textColor.options.push(token.value);
        controls.textColor.mapping[token.value] = `--color-primary-${key} (Primary ${key})`;
      });
    }
    
    // Add gray colors
    if (tokens.core.colors.gray) {
      Object.entries(tokens.core.colors.gray).forEach(([key, token]) => {
        controls.textColor.options.push(token.value);
        controls.textColor.mapping[token.value] = `--color-primary-${key} (Primary ${key})`;
      });
    }
  }

  // Generate spacing options
  if (tokens.core?.spacing) {
    Object.entries(tokens.core.spacing).forEach(([key, token]) => {
      const pxValue = Math.round(parseFloat(token.value) * 16); // Convert rem to px
      controls.padding.options.push(token.value);
      controls.padding.mapping[token.value] = `--spacing-${key} (${key} - ${pxValue}px)`;
    });
  }

  // Generate border radius options
  if (tokens.core?.borderRadius) {
    Object.entries(tokens.core.borderRadius).forEach(([key, token]) => {
      const pxValue = Math.round(parseFloat(token.value) * 16); // Convert rem to px
      controls.borderRadius.options.push(token.value);
      controls.borderRadius.mapping[token.value] = `--border-radius-${key} (${key} - ${pxValue}px)`;
    });
  }

  return controls;
}

// Generate the controls configuration
const controls = generateControls();

// Create the output file
const outputPath = path.join(__dirname, '../src/storybook-controls.ts');
const output = `// Auto-generated from design tokens - DO NOT EDIT MANUALLY
// Run 'npm run generate:controls' to regenerate

export const STORYBOOK_CONTROLS = ${JSON.stringify(controls, null, 2)};
`;

fs.writeFileSync(outputPath, output);

console.log('✅ Storybook controls generated successfully!');
console.log('📁 Output: src/storybook-controls.ts');
console.log('🔄 Controls are now in sync with your design tokens');
console.log('\n💡 Tip: Run this after updating tokens with "npm run tokens:sync"');
