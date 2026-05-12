/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1B3A6B",
        secondary: "#5B7DB1",
        light: "#A8BFDB",
        background: "#FAFBFF",
        text: "#1A1A2E",
        white: "#FFFFFF",
        gold: "#C9A84C",
      },
      fontFamily: {
        heading: ["var(--font-cormorant)"],
        body: ["var(--font-inter)"],
      },
    },
  },
  plugins: [],
};
