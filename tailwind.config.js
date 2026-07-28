/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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
        'brand-yellow': '#f5b002',
        'brand-purple': '#9f8fdb',
        'accent-purple': '#9f8fdb',
        'text-dark': '#2d2d2d',
        'card-bg': '#FFFFFF',
        // Chart colors
        'chart-green': '#53845d',
        'chart-orange': '#f5b002',
        'chart-cyan': '#78baac',
        'shadow-color': '#ebe9e4',
      },
      fontFamily: {
        sans: ['DengXian', '等线', 'Segoe UI', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '8px',
        sm: '8px',
        md: '8px',
        lg: '8px',
        xl: '8px',
        '2xl': '8px',
        '3xl': '8px',
      },
    },
  },
  plugins: [],
}
