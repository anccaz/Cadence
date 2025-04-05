/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}', './public/index.html'], // Add your file paths here
  theme: {
    extend: {
      colors: {
        dark1: '#1a1a1a',
        dark2: '#2a2a2a',
        primary500: '#007bff',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
  plugins: [],
};
