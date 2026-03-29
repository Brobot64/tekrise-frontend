/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-red': '#8a171a',
        'primary-blue': '#292e78',
      },
    },
  },
  plugins: [],
}
