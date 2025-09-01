import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.join(__dirname, '..', '..');
const packageJsonPath = path.join(__dirname, '..', 'package.json');

// Check for common ESM indicators
const esmIndicators = [
  'type: "module"',
  '"vite"',
  '"esbuild"',
  '"next"',
  '"@vitejs"',
  '"rollup"'
];

// Check for common CommonJS indicators
const cjsIndicators = [
  '"webpack"',
  '"babel"',
  '"create-react-app"',
  '"react-scripts"',
  '"@babel/"'
];

let isESM = false;
let isCJS = false;

// Check project's package.json
const projectPackageJson = path.join(projectRoot, 'package.json');
if (fs.existsSync(projectPackageJson)) {
  const projectPkg = JSON.parse(fs.readFileSync(projectPackageJson, 'utf8'));

  // Check type field
  if (projectPkg.type === 'module') {
    isESM = true;
  }

  // Check dependencies and devDependencies
  const allDeps = { ...projectPkg.dependencies, ...projectPkg.devDependencies };
  const depString = JSON.stringify(allDeps);

  esmIndicators.forEach(indicator => {
    if (depString.includes(indicator)) {
      isESM = true;
    }
  });

  cjsIndicators.forEach(indicator => {
    if (depString.includes(indicator)) {
      isCJS = true;
    }
  });
}

// Check for config files
const esmConfigFiles = ['vite.config.js', 'vite.config.ts', 'next.config.js', 'rollup.config.js'];
const cjsConfigFiles = ['webpack.config.js', 'babel.config.js'];

esmConfigFiles.forEach(file => {
  if (fs.existsSync(path.join(projectRoot, file))) {
    isESM = true;
  }
});

cjsConfigFiles.forEach(file => {
  if (fs.existsSync(path.join(projectRoot, file))) {
    isCJS = true;
  }
});

// Determine format
if (isESM && !isCJS) {
  console.log('🔍 Detected ESM project (Vite, esbuild, Next.js, etc.)');
  import('./setup-esm.js');
} else if (isCJS && !isESM) {
  console.log('🔍 Detected CommonJS project (Webpack, Babel, CRA, etc.)');
  import('./setup-cjs.js');
} else {
  console.log('🔍 Mixed or unknown project type - defaulting to ESM');
  import('./setup-esm.js');
}
