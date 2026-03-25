/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // CRITICAL: Enables manual dark mode toggling via a class
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
      colors: {
        success: '#059669', // Emerald-600
        danger: '#e11d48',  // Rose-600
        primary: '#0f172a', // Slate-900 (Navy)
      }
    },
  },
  plugins: [],
}