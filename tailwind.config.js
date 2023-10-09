/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        backdrop: 'rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
};
