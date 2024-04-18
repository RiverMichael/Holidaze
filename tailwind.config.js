const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    colors: {
      background: "#fefeff",
      text: "#000812",
      primary: "#394974",
      secondary: "#eaeef6",
      accent: "#feb903",
    },
    fontFamily: {
      heading: ["Montserrat", "sans-serif"],
      body: ["Lato", "sans-serif"],
    },
    extend: {},
  },
  plugins: [flowbite.plugin()],
};
