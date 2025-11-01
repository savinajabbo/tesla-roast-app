/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        tesla: {
          red: "#E82127",
          black: "#0e0f12",
          white: "#ffffff",
        },
      },
      fontFamily: {
        tesla: ["Inter", "SF Pro Text", "Helvetica Neue", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
