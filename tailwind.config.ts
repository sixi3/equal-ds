import type { Config } from 'tailwindcss'
import preset from './src/tailwind-preset'

export default {
  presets: [preset],
  content: ['src/**/*.{ts,tsx}', 'stories/**/*.{ts,tsx}'],
  darkMode: ['class'],
} satisfies Config


