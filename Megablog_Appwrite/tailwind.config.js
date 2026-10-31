/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: { 900: '#161c2b', 800: '#1e2536', 700: '#2a3350', 600: '#3a4466' },
        coral: { 400: '#ff8a8a', 500: '#ff6f78', 600: '#f0525e' },
        paper: '#eef0f5',
      },
    },
  },
  plugins: [],
}
