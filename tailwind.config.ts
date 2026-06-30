import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        screens: {
          bg: "#020705",
          "bg-elevated": "#040e08",
          card: "#061209",
          "card-hover": "#091a0d",
          border: "#0e2b16",
          "border-bright": "#1a4824",
          muted: "#3d6647",
          "muted-bright": "#6aad74",
          accent: "#e8fff0",
          "accent-dim": "#b4d9bc",
        },
        tier: {
          basic: "#00ff88",
          advanced: "#00d4a0",
          private: "#a8ff3e",
        },
        neon: {
          green: "#00ff88",
          teal: "#00ffc8",
          lime: "#a8ff3e",
          matrix: "#39ff14",
          emerald: "#10b981",
          cyan: "#00e8d4",
          blue: "#00ff88",
          purple: "#00e676",
          fuchsia: "#a8ff3e",
          violet: "#00ffc8",
          pink: "#00d4a0",
        },
      },
      animation: {
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "scan-line": "scan-line 8s linear infinite",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "fade-in-down": "fade-in-down 0.5s ease-out forwards",
        "slide-in-left": "slide-in-left 0.4s ease-out forwards",
        "slide-in-right": "slide-in-right 0.4s ease-out forwards",
        "scale-in": "scale-in 0.3s cubic-bezier(0.16,1,0.3,1) forwards",
        shimmer: "shimmer 2s linear infinite",
        "glow-pulse": "glow-pulse 2.5s ease-in-out infinite",
        "border-glow": "border-glow 3s ease-in-out infinite",
        "bounce-subtle": "bounce-subtle 2s ease-in-out infinite",
        "slide-up": "slide-up 0.5s cubic-bezier(0.16,1,0.3,1) forwards",
        "gradient-shift": "gradient-shift 6s ease infinite",
        "typing-dot": "typing-dot 1.4s ease-in-out infinite",
        "spin-slow": "spin 3s linear infinite",
        "ripple": "ripple 0.6s linear forwards",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-down": {
          from: { opacity: "0", transform: "translateY(-24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          from: { opacity: "0", transform: "translateX(-24px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(24px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.9)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.9" },
        },
        "border-glow": {
          "0%, 100%": { borderColor: "rgba(0,255,136,0.25)" },
          "50%": { borderColor: "rgba(0,255,136,0.6)" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(32px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "typing-dot": {
          "0%, 60%, 100%": { opacity: "0.2", transform: "scale(0.8)" },
          "30%": { opacity: "1", transform: "scale(1.1)" },
        },
        "ripple": {
          "0%": { transform: "scale(0)", opacity: "0.6" },
          "100%": { transform: "scale(2.5)", opacity: "0" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-glow": "radial-gradient(ellipse 90% 60% at 50% -10%, rgba(0,255,136,0.12) 0%, transparent 70%)",
        "card-shine": "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)",
        "neon-gradient": "linear-gradient(135deg, #00ff88, #00ffc8, #a8ff3e)",
        "dot-grid": "radial-gradient(circle at 1px 1px, rgba(0,255,136,0.08) 1px, transparent 0)",
        "subtle-grid":
          "linear-gradient(rgba(0,255,136,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.04) 1px, transparent 1px)",
        "shimmer-gradient":
          "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.07) 50%, transparent 100%)",
      },
      boxShadow: {
        "neon-green": "0 0 20px rgba(0,255,136,0.4), 0 0 60px rgba(0,255,136,0.15)",
        "neon-teal": "0 0 20px rgba(0,255,200,0.4), 0 0 60px rgba(0,255,200,0.15)",
        "neon-lime": "0 0 20px rgba(168,255,62,0.4), 0 0 60px rgba(168,255,62,0.15)",
        "card-hover":
          "0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,255,136,0.06), inset 0 1px 0 rgba(255,255,255,0.04)",
        "glow-sm": "0 0 12px rgba(0,255,136,0.3)",
        "glow-md": "0 0 24px rgba(0,255,136,0.25), 0 0 8px rgba(0,255,136,0.1)",
        "inner-glow": "inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -1px 0 rgba(0,0,0,0.2)",
        "sidebar-active": "0 2px 12px rgba(0,255,136,0.15), inset 0 1px 0 rgba(255,255,255,0.04)",
        dark: "0 4px 24px rgba(0,0,0,0.6)",
        "xl-dark": "0 20px 60px rgba(0,0,0,0.8)",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.16,1,0.3,1)",
        smooth: "cubic-bezier(0.4,0,0.2,1)",
        bounce: "cubic-bezier(0.34,1.56,0.64,1)",
      },
      blur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
