const flowbite = require("flowbite-react/tailwind");
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    colors: {
      neutral: "#fefeff",
      text: "#000812",
      primary: { light: "#657ab3", DEFAULT: "#394974", dark: "#222b44" },
      secondary: "#eaeef6",
      accent: "#feb903",
    },
    fontFamily: {
      heading: ["Montserrat", "sans-serif"],
      body: ["Lato", "sans-serif"],
    },
    extend: {},
  },
  plugins: [
    flowbite.plugin(),
    plugin(function ({ addComponents, theme }) {
      const buttons = {
        ".btn": {
          borderColor: theme("colors.primary.DEFAULT"),
          borderWidth: "2px",
          borderRadius: "0.3125rem",
          padding: "0.2rem 2rem",
          fontWeight: "600",
          transition: "all 0.25s ease-in-out",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textWrap: "nowrap",
        },
        ".btn-primary": {
          backgroundColor: theme("colors.primary.DEFAULT"),
          color: theme("colors.neutral"),
          "&:hover": {
            backgroundColor: theme("colors.neutral"),
            color: theme("colors.primary.light"),
            borderColor: theme("colors.primary.light"),
          },
        },
        ".btn-outlined": {
          backgroundColor: theme("colors.neutral"),
          color: theme("colors.primary"),
          "&:hover": {
            backgroundColor: theme("colors.primary.dark"),
            color: theme("colors.neutral"),
            borderColor: theme("colors.primary.dark"),
          },
        },
      };
      addComponents(buttons);
    }),
  ],
};
