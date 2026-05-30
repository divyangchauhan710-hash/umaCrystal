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
        heading: ["var(--font-cinzel)", "serif"],
        body: ["var(--font-outfit)", "sans-serif"],
        "serif-accent": ["var(--font-cormorant)", "serif"],
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.15", transform: "scale(1)" },
          "50%": { opacity: "0.3", transform: "scale(1.08)" },
        }
      },
      animation: {
        "fade-up": "fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "float": "float 5s ease-in-out infinite",
        "pulse-glow": "pulseGlow 8s ease-in-out infinite",
      }
    },
  },
  plugins: [],
};
