/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        'lo':'330px',
        'ml':'1200px',
        },
    },
  },
  plugins: [],
}
