/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f8f7f4",
          100: "#f0ede6",
          200: "#e3ddd0",
          300: "#cdc3ad",
          400: "#b5a88a",
          500: "#9d8b6a",
          600: "#8a7859",
          700: "#72614a",
          800: "#5e5140",
          900: "#4f4437",
        },
        luxury: {
          gold: "#c9a961",
          darkGold: "#a98e4f",
          charcoal: "#2d2d2d",
          pearl: "#f8f8f6",
          champagne: "#f4ede4",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(0, 0, 0, 0.05)",
        card: "0 2px 12px rgba(0, 0, 0, 0.06)",
        "card-hover": "0 8px 24px rgba(0, 0, 0, 0.12)",
        luxury: "0 4px 20px rgba(201, 169, 97, 0.15)",
      },
      letterSpacing: {
        luxury: "0.05em",
      },
    },
  },
  plugins: [],
};
