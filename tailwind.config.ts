import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f3f0ff",
          100: "#e9e0ff",
          200: "#d4c4ff",
          300: "#b89aff",
          400: "#9966ff",
          500: "#6C3CE1",
          600: "#5a2dc7",
          700: "#4b24a8",
          800: "#3d1d89",
          900: "#2f166b",
          DEFAULT: "#6C3CE1",
        },
        secondary: {
          50: "#fff4ed",
          100: "#ffe6d4",
          200: "#ffc9a8",
          300: "#ffa370",
          400: "#FF6B35",
          500: "#f04e1a",
          600: "#d13510",
          700: "#ad2510",
          800: "#8a1f14",
          900: "#701d14",
          DEFAULT: "#FF6B35",
        },
        accent: {
          50: "#ecfdf7",
          100: "#d1fae8",
          200: "#a7f3d5",
          300: "#6ee7bb",
          400: "#00C9A7",
          500: "#00b396",
          600: "#009079",
          700: "#007363",
          800: "#005b50",
          900: "#004b43",
          DEFAULT: "#00C9A7",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        float: "float 3s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
