/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}" // scan all React/TypeScript files in src
  ],
  theme: {
    extend: {
      colors: {
        brand: "#FF4655", // glowing accent color for buttons/CTAs
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"], // clean modern font
      },
      boxShadow: {
        glow: "0 0 20px rgba(255, 70, 85, 0.6)", // glowing shadow for premium look
      },
    },
  },
  plugins: [],
}

