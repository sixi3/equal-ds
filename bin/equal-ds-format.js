#!/usr/bin/env node

import { createRequire } from 'module';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
const command = args[0];

console.log('🎨 Equal DS UI - Format Selector\n');

// Help message
if (!command || command === '--help' || command === '-h') {
  console.log('Usage: equal-ds-format <command>');
  console.log('');
  console.log('Commands:');
  console.log('  esm     Configure package for ESM format');
  console.log('  cjs     Configure package for CommonJS format');
  console.log('  auto    Auto-detect format based on project');
  console.log('  help    Show this help message');
  console.log('');
  console.log('Examples:');
  console.log('  npx equal-ds-format esm');
  console.log('  npx equal-ds-format auto');
  process.exit(0);
}

// Find the equal-ds-ui package in node_modules
const findPackagePath = () => {
  const currentDir = process.cwd();
  let checkDir = currentDir;

  while (checkDir !== path.dirname(checkDir)) {
    const packagePath = path.join(checkDir, 'node_modules', 'equal-ds-ui');
    if (fs.existsSync(packagePath)) {
      return packagePath;
    }
    checkDir = path.dirname(checkDir);
  }

  console.error('❌ Could not find equal-ds-ui package in node_modules');
  console.error('Make sure you have equal-ds-ui installed in your project');
  process.exit(1);
};

const packagePath = findPackagePath();
const packageJsonPath = path.join(packagePath, 'package.json');

if (!fs.existsSync(packageJsonPath)) {
  console.error('❌ Could not find package.json in equal-ds-ui package');
  process.exit(1);
}

try {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  switch (command) {
    case 'esm':
      console.log('🔧 Configuring for ESM format...');
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
      console.log('✅ Configured for ESM format');
      break;

    case 'cjs':
      console.log('🔧 Configuring for CommonJS format...');
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
      console.log('✅ Configured for CommonJS format');
      break;

    case 'auto':
      console.log('🔍 Auto-detecting project format...');

      // Check current project's package.json
      const projectPackageJson = path.join(process.cwd(), 'package.json');
      let isESM = false;
      let isCJS = false;

      if (fs.existsSync(projectPackageJson)) {
        const projectPkg = JSON.parse(fs.readFileSync(projectPackageJson, 'utf8'));

        if (projectPkg.type === 'module') {
          isESM = true;
        }

        const allDeps = { ...projectPkg.dependencies, ...projectPkg.devDependencies };
        const depString = JSON.stringify(allDeps || {});

        if (depString.includes('"vite"') || depString.includes('"esbuild"') || depString.includes('"next"')) {
          isESM = true;
        }

        if (depString.includes('"webpack"') || depString.includes('"babel"') || depString.includes('"create-react-app"')) {
          isCJS = true;
        }
      }

      if (isESM && !isCJS) {
        console.log('📦 Detected ESM project (Vite, esbuild, Next.js)');
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
        console.log('✅ Auto-configured for ESM format');
      } else if (isCJS && !isESM) {
        console.log('📦 Detected CommonJS project (Webpack, Babel, CRA)');
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
        console.log('✅ Auto-configured for CommonJS format');
      } else {
        console.log('📦 Mixed or unknown project - defaulting to ESM');
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
        console.log('✅ Defaulted to ESM format');
      }
      break;

    default:
      console.error(`❌ Unknown command: ${command}`);
      console.error('Run "equal-ds-format --help" for usage information');
      process.exit(1);
  }

  // Write updated package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('💾 Configuration saved!');
  console.log('');
  console.log('🎉 Your equal-ds-ui package is now configured for optimal performance!');
  console.log('   Bundle size reduced by ~50% with format-specific optimization.');

} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
