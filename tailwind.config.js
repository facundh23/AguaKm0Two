/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
   extend:{
    colors:{
      'calculate-color':'stealblue',
      'bg-first-color-hover': 'linear-gradient(90deg, rgba(0, 0, 3, 1) 0%, rgba(78, 77, 185, 0.964) 87%)' 
    }
   },
  plugins: [
    require('tailwindcss-animated')
  ],
}}