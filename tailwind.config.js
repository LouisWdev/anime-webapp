/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neon accent colors
        'neon-pink': '#ff0080',
        'neon-blue': '#00d4ff',
        'neon-purple': '#bf5af2',
        'neon-green': '#39ff14',
        'neon-yellow': '#fff200',
        // Background hierarchy
        'void': '#050508',
        'dark-surface': '#0d0d1a',
        'dark-card': '#111122',
        'dark-elevated': '#161628',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        jp: ['Noto Sans JP', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'neon-glow': 'linear-gradient(135deg, #ff0080, #bf5af2, #00d4ff)',
      },
      boxShadow: {
        'glow-pink': '0 0 20px rgba(255,0,128,0.4), 0 0 60px rgba(255,0,128,0.1)',
        'glow-blue': '0 0 20px rgba(0,212,255,0.4), 0 0 60px rgba(0,212,255,0.1)',
        'glow-purple': '0 0 20px rgba(191,90,242,0.4), 0 0 60px rgba(191,90,242,0.1)',
        'glow-card': '0 0 30px rgba(255,0,128,0.15)',
        'neon-border': 'inset 0 0 20px rgba(255,0,128,0.05)',
      },
      keyframes: {
        'pulse-neon': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255,0,128,0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(255,0,128,0.8), 0 0 80px rgba(255,0,128,0.3)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'scan': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 100%' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [],
}
