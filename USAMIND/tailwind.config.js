/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/holographic-ui/**/*.{js,ts,jsx,tsx,mdx}',
    './src/citizen-dashboards/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'quantum-blue': '#00f3ff',
        'neural-purple': '#b967ff',
        'ai-green': '#00ff9d',
        'alert-red': '#ff2e63',
        'data-gray': '#0a0e17',
      },
      backgroundImage: {
        'neural-gradient': 'linear-gradient(90deg, #00f3ff, #b967ff, #00ff9d)',
        'quantum-gradient': 'linear-gradient(135deg, #00f3ff, #00ff9d)',
        'glass-bg': 'rgba(255, 255, 255, 0.05)',
      },
      backdropBlur: {
        'glass': '20px',
      },
      animation: {
        'neural-pulse': 'neural-pulse 2s infinite',
        'quantum-shimmer': 'quantum-shimmer 3s infinite',
        'data-stream': 'data-stream 10s linear infinite',
        'gradient-flow': 'gradient-flow 3s ease infinite',
        'glow-pulse': 'glow-pulse 1s infinite',
      },
      keyframes: {
        'neural-pulse': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        'quantum-shimmer': {
          '0%': { left: '-100%' },
          '100%': { left: '200%' },
        },
        'data-stream': {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
        },
        'gradient-flow': {
          '0%, 100%': { backgroundPosition: '0% center' },
          '50%': { backgroundPosition: '100% center' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.5)' },
        },
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'quantum': '0 0 30px rgba(0, 243, 255, 0.2)',
        'neural': '0 0 30px rgba(185, 103, 255, 0.2)',
      },
      borderColor: {
        'glass': 'rgba(255, 255, 255, 0.1)',
      },
    },
  },
  plugins: [],
}
