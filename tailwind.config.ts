import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        screens: {
          bg: "#050508",
          "bg-elevated": "#0a0a0f",
          card: "#0d0d12",
          "card-hover": "#12121a",
          border: "#1a1a24",
          muted: "#8b8b9a",
          accent: "#fafafa",
          "accent-dim": "#e4e4e7",
        },
        tier: {
          basic: "#34d399",
          advanced: "#7dd3fc",
          private: "#c084fc",
        },
        neon: {
          cyan: "#22d3ee",
          fuchsia: "#d946ef",
          violet: "#a78bfa",
        },
      },
      animation: {
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "scan-line": "scan-line 8s linear infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
