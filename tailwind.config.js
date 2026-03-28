// tailwind.config.js - ES Module syntax
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tiber: '#0A3948',
        horizon: '#5794A4',
        downy: '#64CDD1',
        powder: '#B8E3E6',
      },
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'slide-right': 'slideRight 0.5s ease-out forwards',
        'fade-up': 'fadeInUp 0.6s ease-out forwards',
        'pulse-glow': 'pulse-glow 1.5s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        slideRight: {
          from: { transform: 'translateX(-20px)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(100, 205, 209, 0.6)' },
          '50%': { boxShadow: '0 0 0 12px rgba(100, 205, 209, 0)' },
        },
      },
    },
  },
  plugins: [],
}