/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx}', './public/index.html'],
    theme: {
      extend: {
        colors: {
          background: '#111827',
          card: '#1f2937',
        },
      },
    },
    plugins: [],
  };