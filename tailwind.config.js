/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'rgb(var(--primary-50, 239 246 255) / <alpha-value>)',
          100: 'rgb(var(--primary-100, 219 234 254) / <alpha-value>)',
          200: 'rgb(var(--primary-200, 191 219 254) / <alpha-value>)',
          300: 'rgb(var(--primary-300, 147 197 253) / <alpha-value>)',
          400: 'rgb(var(--primary-400, 96 165 250) / <alpha-value>)',
          500: 'rgb(var(--primary-500, 59 130 246) / <alpha-value>)',
          600: 'rgb(var(--primary-600, 37 99 235) / <alpha-value>)',
          700: 'rgb(var(--primary-700, 29 78 216) / <alpha-value>)',
          800: 'rgb(var(--primary-800, 30 64 175) / <alpha-value>)',
          900: 'rgb(var(--primary-900, 30 58 138) / <alpha-value>)',
          950: 'rgb(var(--primary-950, 23 37 84) / <alpha-value>)',
        },
        dark: {
          100: '#1E1E1E',
          200: '#2D2D2D',
          300: '#3D3D3D',
          400: '#4D4D4D',
          500: '#5D5D5D',
          600: '#6D6D6D',
          700: '#7D7D7D',
          800: '#8D8D8D',
          900: '#9D9D9D',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-glass': 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0))',
        'gradient-glass-dark': 'linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2))',
        'gradient-dark': 'linear-gradient(to bottom right, rgba(30, 30, 30, 0.8), rgba(30, 30, 30, 0.4))',
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
        'slide-down': 'slide-down 0.5s ease-out',
        'blob': 'blob 7s infinite',
        'pulse-slow': 'pulse 6s infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'glass': '0 0 15px 0 rgba(255, 255, 255, 0.1)',
        'glass-dark': '0 0 15px 0 rgba(0, 0, 0, 0.3)',
        'glass-sm': '0 2px 8px 0 rgba(255, 255, 255, 0.1)',
        'glass-sm-dark': '0 2px 8px 0 rgba(0, 0, 0, 0.2)',
        'inner-light': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.05)',
        'inner-dark': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
} 