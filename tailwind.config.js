/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "primery-color": "#61c527",
        "gray-dark": "#8c8c8c",
        "gray-light": "#a7a7a7",
      },
    },
  },
  plugins: [],
};
