/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors")

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  plugins: [require("@tailwindcss/forms")],
  theme: {
    colors: {
      primary: "#005f94",
      "primary-dark": "#003c5a",
      "primary-light": "#eff4ff",
      secondary: "#fdb913",
      "secondary-dark": "#c08902",
      "secondary-light": "#fee7af",
      grey: "#8492a6",
      "grey-dark": "#273444",
      "grey-light": "#d3dce6",
      white: "#ffffff",
      black: "#000000",
      transparent: colors.transparent,
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      serif: ["serif"],
    },
    extend: {
      translate: ["last"],
    },
  },
}
