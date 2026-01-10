/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ec4899",
        secondary: "#8b5cf6",
      },
      borderRadius: {
        button: "8px",
      },
    },
  },
  plugins: [],
};
