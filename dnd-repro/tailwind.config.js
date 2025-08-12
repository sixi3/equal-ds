/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/equal-ds-ui/dist/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('equal-ds-ui/tailwind-preset')],
}

