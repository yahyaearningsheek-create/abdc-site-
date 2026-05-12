import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2E7D32", // Vert forêt
          dark: "#1B5E20",
          light: "#4CAF50",
        },
        secondary: {
          DEFAULT: "#1565C0", // Bleu institutionnel
          dark: "#0D47A1",
          light: "#42A5F5",
        },
        accent: {
          DEFAULT: "#F9A825", // Orange doré
          dark: "#F57F17",
          light: "#FBC02D",
        },
        background: {
          DEFAULT: "#FAFAFA", // Blanc cassé
          dark: "#121212", // Sombre
        },
        surface: {
          DEFAULT: "#FFFFFF",
          dark: "#1E1E1E",
        },
        text: {
          DEFAULT: "#333333",
          dark: "#E0E0E0",
          muted: "#666666",
          mutedDark: "#A0A0A0"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
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
      },
    },
  },
  plugins: [],
};
export default config;
