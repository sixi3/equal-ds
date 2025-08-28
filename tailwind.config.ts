import type { Config } from 'tailwindcss'
import preset from './tokens.tailwind.preset.js'

export default {
  presets: [preset],
  content: ['src/**/*.{ts,tsx}', 'stories/**/*.{ts,tsx}'],
  darkMode: ['class'],
} satisfies Config


