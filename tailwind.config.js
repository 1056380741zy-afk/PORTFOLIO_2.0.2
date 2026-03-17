/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./App.tsx",
    "./index.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./contexts/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'base-bg': '#f7f6f3',
        'surface': '#FFFFFF',
        'surface-nested': '#f7f6f3',
        'text-main': '#2d2d2d',
        'brand-red': '#b3473d',
        'brand-blue': '#3fa1d8',
        'brand-yellow': '#e8ae41',
        'brand-purple': '#7e4ba6',
        'accent-purple': '#7e4ba6',
        'text-dark': '#2d2d2d',
        'card-bg': '#FFFFFF',
        // Chart colors
        'chart-green': '#53845d',
        'chart-orange': '#e59936',
        'chart-cyan': '#78baac',
        'shadow-color': '#ebe9e4',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      fontSize: {
        base: ['12px', '16px'],
      },
    },
  },
  plugins: [],
}
