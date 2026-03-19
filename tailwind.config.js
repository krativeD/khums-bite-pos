export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0B0B',
        'primary-gold': '#D4AF37',
        card: '#121212',
      },
      boxShadow: {
        'gold-glow': '0 0 15px #D4AF37',
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
