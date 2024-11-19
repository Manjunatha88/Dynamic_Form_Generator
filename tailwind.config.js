/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Enable dark mode using class strategy
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--color-background))',
        surface: 'rgb(var(--color-surface))',
        primary: 'rgb(var(--color-primary))',
        accent: 'rgb(var(--color-accent))',
        rose: 'rgb(var(--color-rose))',
        sage: 'rgb(var(--color-sage))',
        cyan: 'rgb(var(--color-cyan))',
        amber: 'rgb(var(--color-amber))',
        text: 'rgb(var(--color-text))', // Added text color variable
      },
      animation: {
        fadeIn: 'fadeIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        luxury: '0 4px 20px -2px rgba(var(--color-primary), 0.25)',
      },
    },
  },
  plugins: [],
};