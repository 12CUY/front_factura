/** @type {import('tailwindcss').Config} */
export default {

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      cursor: {
        custom: "url('/gotar(3).png'), pointer",

      },
      fontFamily: {
        sans: ['"Open Sans"', 'sans-serif'],
      },

      colors: {
        'azul-agua': '#9ACFE2',
        'azul-oscuro-metalico': '#2C3E50',
        'gris-frio-claro': '#D5DEE3',
        'blanco-puro': '#FFFFFF',
        'azul-celeste-claro': '#B7E0F2',
      },
      keyframes: {
        fadeInDownExt: {
          'from': { opacity: '0', transform: 'translateY(-50px)', filter: 'blur(10px)' },
          'to': { opacity: '1', transform: 'translateY(0)', filter: 'blur(0)' },
        },
        slideInFromLeftExt: {
          'from': { opacity: '0', transform: 'translateX(-100px)' },
          'to': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInUpExt: {
          'from': { opacity: '0', transform: 'translateY(50px)', filter: 'blur(10px)' },
          'to': { opacity: '1', transform: 'translateY(0)', filter: 'blur(0)' },
        },
        spinSlow: {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
        pulseSearch: {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0px 0px rgba(154, 207, 226, 0.7)' },
          '50%': { transform: 'scale(1.01)', boxShadow: '0 0 0px 8px rgba(154, 207, 226, 0)' },
        },
        fadeInRow: {
          'from': { opacity: '0', transform: 'translateY(10px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        blobOne: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '30%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '60%': { transform: 'translate(-20px, 40px) scale(0.9)' },
        },
        blobTwo: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '40%': { transform: 'translate(-40px, 60px) scale(1.2)' },
          '70%': { transform: 'translate(50px, -30px) scale(0.95)' },
        },
      },
      animation: {
        'fade-in-down-ext': 'fadeInDownExt 1.2s ease-out forwards',
        'slide-in-from-left-ext': 'slideInFromLeftExt 1s ease-out forwards',
        'fade-in-up-ext': 'fadeInUpExt 1s ease-out forwards',
        'spin-slow': 'spinSlow 3s linear infinite',
        'pulse-search': 'pulseSearch 2s ease-out infinite',
        'fade-in-row': 'fadeInRow 0.4s ease-out forwards',
        'blob-one': 'blobOne 18s infinite alternate ease-in-out',
        'blob-two': 'blobTwo 22s infinite alternate ease-in-out',
      },
    },
  },
  plugins: [],
};
