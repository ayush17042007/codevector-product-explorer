import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#050508',
        'indigo-glow': '#6366f1',
        'violet-glow': '#8b5cf6',
        'cyan-glow': '#06b6d4',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        shimmer: 'shimmer 2.2s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'mesh-1': 'meshFloat1 14s ease-in-out infinite',
        'mesh-2': 'meshFloat2 18s ease-in-out infinite',
        'mesh-3': 'meshFloat3 22s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        meshFloat1: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(60px, -40px) scale(1.05)' },
          '66%': { transform: 'translate(-30px, 50px) scale(0.95)' },
        },
        meshFloat2: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(-80px, 40px) scale(0.95)' },
          '66%': { transform: 'translate(50px, -60px) scale(1.05)' },
        },
        meshFloat3: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(40px, 30px) scale(1.03)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundSize: {
        '200%': '200% 100%',
      },
    },
  },
  plugins: [],
};

export default config;
