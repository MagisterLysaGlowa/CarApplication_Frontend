/** @type {import('tailwindcss').Config} */
const { heroui } = require("@heroui/react");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        check: "check 0.3s ease-in-out forwards",
      },
      colors: {
        BLACK: {
          700: "#0C0C0C",
          600: "#272727",
          500: "#363636",
          400: "#454545",
          300: "#555555",
          200: "#646464",
          100: "#747474",
        },
        WHITE: {
          600: "#B8B8B8",
          500: "#CACACA",
          400: "#D8D8D8",
          300: "#F3F3F3",
          200: "#FAFAFA",
          100: "#FFFFFF",
        },
        GOLD: {
          800: "#512006",
          700: "#AC440B",
          600: "#E14F00",
          500: "#FF6410",
          400: "#FF7124",
          300: "#FF9C67",
          200: "#FFDDCB",
          100: "#FFF7F2",
        },
        AQUA: {
          600: "#0049B6",
          500: "#0057DB",
          400: "#0066FF",
          300: "#79AFFF",
          200: "#DAE9FF",
          100: "#E9F2FF",
        },
        RED: {
          600: "#800000",
          500: "#C80000",
          400: "#FF0000",
          300: "#FF5B5B",
          200: "#FFA4A4",
          100: "#FFEDED ",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp"), heroui()],
};
