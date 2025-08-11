import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/tailwind-preset.ts'],
  clean: true,
  dts: true,
  format: ['esm', 'cjs'],
  sourcemap: true,
  minify: true,
  external: [
    'react',
    'react-dom',
    'tailwindcss',
    '@radix-ui/react-collapsible',
    '@radix-ui/react-tooltip',
    '@radix-ui/react-visually-hidden',
    '@radix-ui/react-dialog',
    'lucide-react',
    'class-variance-authority',
    'tailwind-merge',
    // mark dnd-kit externals so consumers can opt-in
    '@dnd-kit/core',
    '@dnd-kit/sortable',
    '@dnd-kit/utilities',
  ],
  treeshake: true,
  target: 'es2020',
})


