import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        screens: {
          bg: "#09090b",
          "bg-elevated": "#0c0c0e",
          card: "#111113",
          "card-hover": "#161618",
          border: "#1f1f23",
          muted: "#71717a",
          accent: "#fafafa",
          "accent-dim": "#e4e4e7",
        },
        tier: {
          basic: "#34d399",
          advanced: "#7dd3fc",
          private: "#c084fc",
        },
      },
    },
  },
  plugins: [],
};

export default config;
