/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#08090d',
        panel: '#11131a',
        line: '#262a36',
        mint: '#2dd4bf',
        ember: '#f59e0b',
        orchid: '#a78bfa',
        // New design system tokens
        bg: {
          deep: '#0f131c',
          surface: '#141824',
          elevated: '#1a1f2e',
        },
        brand: {
          primary: '#4d8eff',
          cyan: '#4cd7f6',
          violet: '#a078ff',
        },
        text: {
          primary: '#e8ecf5',
          secondary: '#9aa3b8',
          muted: '#6b7280',
        },
      },
      boxShadow: {
        glow: '0 18px 70px rgba(45, 212, 191, 0.13)',
        'glass-sm': '0 4px 24px rgba(0, 0, 0, 0.35)',
        'glass-md': '0 8px 40px rgba(0, 0, 0, 0.45)',
        'glass-lg': '0 16px 60px rgba(0, 0, 0, 0.55)',
        'brand-glow': '0 8px 40px rgba(77, 142, 255, 0.25)',
        'cyan-glow': '0 8px 40px rgba(76, 215, 246, 0.20)',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      borderColor: {
        glass: 'rgba(255, 255, 255, 0.08)',
        'glass-strong': 'rgba(255, 255, 255, 0.14)',
      },
    },
  },
  plugins: [],
};
