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
          charcoal: "#5a5347",
          pearl: "#f8f8f6",
          champagne: "#f4ede4",
          slate: "#6b6456",
          mist: "#fafaf9",
          taupe: "#8a7d6f",
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
        "luxury-lg": "0 10px 40px rgba(201, 169, 97, 0.2)",
        "inner-glow": "inset 0 1px 2px rgba(255, 255, 255, 0.3)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.08)",
        "elevation-1":
          "0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)",
        "elevation-2":
          "0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.08)",
        "elevation-3":
          "0 12px 48px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08)",
      },
      letterSpacing: {
        luxury: "0.05em",
        wide: "0.025em",
        wider: "0.1em",
      },
      backgroundImage: {
        "gradient-luxury": "linear-gradient(135deg, #c9a961 0%, #a98e4f 100%)",
        "gradient-dark": "linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)",
        "gradient-pearl": "linear-gradient(180deg, #ffffff 0%, #f8f8f6 100%)",
        "gradient-shimmer":
          "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
        shimmer: "shimmer 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [],
};
