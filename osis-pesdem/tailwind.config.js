/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#050b1f',
          900: '#0a1633',
          800: '#0f2147',
          700: '#162d5e',
          600: '#1e3a78',
          500: '#2a4d96',
        },
        gold: {
          300: '#f5dd9b',
          400: '#ecc865',
          500: '#d4a72c',
          600: '#b48a1c',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        gold: '0 0 0 2px rgba(212,167,44,.9), 0 10px 40px -10px rgba(212,167,44,.55)',
      },
      keyframes: {
        bump: {
          '0%': { transform: 'scale(1)' },
          '40%': { transform: 'scale(1.12)', color: '#ecc865' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        bump: 'bump .6s ease-out',
      },
    },
  },
  plugins: [],
}
