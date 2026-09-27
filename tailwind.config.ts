import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        /** Page background — near-black, like the Figma canvas. */
        ink: "#08090a",
        /** Raised surfaces: cards, panels, list rows. */
        surface: {
          DEFAULT: "#0e0f11",
          soft: "#141517",
          raised: "#1a1c1e",
        },
        /** FitLog's single accent — the lime pill / badge colour. */
        accent: {
          DEFAULT: "#ccff00",
          strong: "#b8e600",
          dim: "#1d2606",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-oswald)", "Impact", "sans-serif"],
      },
      boxShadow: {
        glow: "0 18px 45px -22px rgba(204, 255, 0, 0.55)",
        card: "0 24px 60px -40px rgba(0, 0, 0, 0.9)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "toast-in": {
          from: { opacity: "0", transform: "translateY(14px) scale(0.97)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.75" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.45s ease-out both",
        "toast-in": "toast-in 0.25s cubic-bezier(0.22, 1, 0.36, 1) both",
        "spin-slow": "spin-slow 0.9s linear infinite",
        "pulse-soft": "pulse-soft 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
