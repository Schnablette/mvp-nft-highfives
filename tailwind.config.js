/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        diamond: {
          DEFAULT: "#81B9CA",
          50: "#E2EFF3",
          100: "#D7E9EE",
          200: "#C2DDE5",
          300: "#ACD1DC",
          400: "#97C5D3",
          500: "#81B9CA",
          600: "#4895AC",
          700: "#2F606F",
          800: "#152B32",
          900: "#010303",
        },
      },
    },
  },
  plugins: [],
};
