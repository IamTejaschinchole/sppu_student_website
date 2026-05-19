/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#08090d',
        panel: '#11131a',
        line: '#262a36',
        mint: '#2dd4bf',
        ember: '#f59e0b',
        orchid: '#a78bfa',
      },
      boxShadow: {
        glow: '0 18px 70px rgba(45, 212, 191, 0.13)',
      },
    },
  },
  plugins: [],
};
