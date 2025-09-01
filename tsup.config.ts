import { defineConfig } from 'tsup'

// Allow selective format building via environment variable
// BUILD_FORMAT=esm - builds only ESM
// BUILD_FORMAT=cjs - builds only CommonJS
// default - builds both formats
const buildFormat = process.env.BUILD_FORMAT
const formats = buildFormat === 'esm'
  ? ['esm']
  : buildFormat === 'cjs'
  ? ['cjs']
  : ['esm', 'cjs']

export default defineConfig({
  entry: ['src/index.ts'],
  clean: true,
  dts: true,
  format: formats,
  sourcemap: true,
  minify: true,
  external: [
    'react',
    'react-dom',
    'tailwindcss',
    '@radix-ui/react-collapsible',
    '@radix-ui/react-dropdown-menu',
    '@radix-ui/react-tooltip',
    '@radix-ui/react-visually-hidden',
    '@radix-ui/react-dialog',
    'lucide-react',
    'class-variance-authority',
    'tailwind-merge',
  ],
  treeshake: true,
  target: 'es2020',
})


