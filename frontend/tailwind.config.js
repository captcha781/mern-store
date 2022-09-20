/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx,ts,jsx,js}","./public/index.html"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
      xxl: "1920px"
    },
    extend: {
      fontFamily: {
        outfit: "Outfit",
        fredoka: "Fredoka One"
      }
    },
  },
  plugins: [],
}
