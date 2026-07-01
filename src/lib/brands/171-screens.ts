import type { SiteBrand } from "./types";

/** Org ativa — 171 ScreenS (ciano, backend clean) */
export const screens171Brand: SiteBrand = {
  id: "171screens",
  name: "171",
  nameHighlight: "ScreenS",
  shortName: "171SS",
  tagline: "Telagem & Scanner",
  scannerName: "171 ScreenS",
  domain: "171screens.com.br",
  appUrl: "https://171-screens-wheat.vercel.app",
  proxyHost: "scan.171screens.com.br",
  proxyPortIos: 8080,
  proxyPortAndroid: 8443,
  discord: {
    guildName: "171 ScreenS",
    inviteUrl: "https://discord.gg/CXkyv3QF9X",
  },
  colors: {
    primary: "#22d3ee",
    primarySoft: "#06b6d4",
    accent: "#38bdf8",
    bg: "#030712",
    bgElevated: "#0f172a",
    card: "#111827",
    border: "#1e293b",
    muted: "#64748b",
    text: "#f1f5f9",
  },
  scanner: {
    primaryColor: "#22d3ee",
    spinnerColor1: "#67e8f9",
    spinnerColor2: "#22d3ee",
    spinnerColor3: "#06b6d4",
  },
  ui: {
    style: "clean",
    watermark: "171 SCREENS",
    dashboardClass: "dash-backend-clean",
  },
  metadata: {
    title: "171 ScreenS — Telagem, Scanner & Curso Mobile",
    description:
      "Plataforma 171 ScreenS: scanner forense, pins, results, curso mobile e backend limpo para sua org.",
    keywords: [
      "171 screens",
      "171screens",
      "telagem",
      "scanner",
      "screen share",
      "free fire",
      "curso mobile",
      "anti-cheat",
    ],
    ogTitle: "171 ScreenS",
  },
};
