/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        tesla: {
          red: "#E82127",
          bg: "#0e0f12",
          ink: "#111111",
        },
      },
      fontFamily: {
        tesla: [
          "Inter", "SF Pro Text", "SF Pro Display", "ui-sans-serif",
          "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica Neue",
          "Arial", "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji"
        ],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        soft: "0 8px 30px rgba(0,0,0,0.20)",
      },
    },
  },
  plugins: [],
};
