/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Neutral base — near-black surfaces
        ink: {
          950: '#080807',
          900: '#0d0c0b',
          850: '#121110',
          800: '#181614',
          700: '#211e1b',
          600: '#2c2825',
          500: '#3a3531',
        },
        // Brand accent — ember orange
        ember: {
          50: '#fff3ec',
          100: '#ffe0cf',
          200: '#ffc09e',
          300: '#ff9b6a',
          400: '#ff7a3d',
          500: '#f2581d',
          600: '#d8430f',
          700: '#b1330c',
        },
        sand: '#cfc8c0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        signature: ['"Mr Dafoe"', 'cursive'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      backgroundImage: {
        'ember-glow':
          'radial-gradient(60% 50% at 50% 0%, rgba(242,88,29,0.22) 0%, rgba(242,88,29,0) 70%)',
        'card-sheen':
          'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 40%)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        floaty: 'floaty 6s ease-in-out infinite',
        'fade-up': 'fade-up 0.6s ease-out both',
      },
    },
  },
  plugins: [],
}
