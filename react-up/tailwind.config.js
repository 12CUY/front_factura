/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      cursor: {
        custom: "url('/cursor.png'), pointer", // Cursor personalizado
        
      },
    },
  },
  plugins: [],
};
