/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#0f0e0d",
        secondary: "#9a9488",
        tertiary: "#1c1a17",
        "black-100": "#1c1a17",
        "black-200": "#141210",
        "white-100": "#f2efe8",
        accent: {
          DEFAULT: "#c4a35a",
          hover: "#a88642",
          soft: "rgba(196, 163, 90, 0.14)",
        },
        sage: {
          DEFAULT: "#6b8f71",
          soft: "rgba(107, 143, 113, 0.14)",
        },
        clay: "#b87d5c",
      },
      boxShadow: {
        card: "0px 24px 64px -20px rgba(0, 0, 0, 0.55)",
      },
      screens: {
        xs: "450px",
      },
      fontFamily: {
        display: ['"Fraunces"', "Georgia", "serif"],
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
    },
  },
  plugins: [],
};
