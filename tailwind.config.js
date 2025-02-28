const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        primary: "#8AB69B",
        secondary: "#FFD3BA",
        tertiary: "#2C6E63",
        quaternary: "#B4A5C9",
        quinary: "#FF8C69",
        primaryText: "#333333",
        primaryBg: "#FFF8F0",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
