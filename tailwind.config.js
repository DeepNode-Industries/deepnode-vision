/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        cyber: {
          50: '#f0fffe',
          100: '#ccfffe',
          200: '#99fffd',
          300: '#5cfffc',
          400: '#20f6f0',
          500: '#06e0d9',
          600: '#00b3b0',
          700: '#008e8b',
          800: '#006f70',
          900: '#005b5d',
        },
        dark: {
          950: '#020817',
          900: '#0a0f1e',
          800: '#0d1529',
          700: '#111827',
          600: '#1e293b',
        },
        neon: {
          cyan: '#06b6d4',
          purple: '#8b5cf6',
          green: '#10b981',
          amber: '#f59e0b',
        },
      },
      fontFamily: {
        display: ['SpaceGrotesk-Bold'],
        'display-semibold': ['SpaceGrotesk-SemiBold'],
        sans: ['Inter-Regular'],
        'sans-medium': ['Inter-Medium'],
        'sans-semibold': ['Inter-SemiBold'],
        'sans-bold': ['Inter-Bold'],
      },
    },
  },
}
