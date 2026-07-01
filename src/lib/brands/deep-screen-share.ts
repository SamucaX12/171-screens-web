import type { SiteBrand } from "./types";

/** Perfil salvo — Deep Screen Share (teal/matrix). Troque NEXT_PUBLIC_BRAND=deepscreenshare */
export const deepScreenShareBrand: SiteBrand = {
  id: "deepscreenshare",
  name: "Deep Screen",
  nameHighlight: "Share",
  shortName: "DSS",
  tagline: "Plataforma Premium",
  scannerName: "Deep Screen Share",
  domain: "deepscreenshare.com.br",
  appUrl: "https://deepscreenshare.vercel.app",
  proxyHost: "scan.deepscreenshare.com.br",
  proxyPortIos: 8080,
  proxyPortAndroid: 8443,
  discord: {
    guildName: "Deep Screen Share",
    inviteUrl: "https://discord.gg/CXkyv3QF9X",
  },
  colors: {
    primary: "#00ff88",
    primarySoft: "#00ffc8",
    accent: "#a8ff3e",
    bg: "#020705",
    bgElevated: "#040e08",
    card: "#061209",
    border: "#0e2b16",
    muted: "#3d6647",
    text: "#e8fff0",
  },
  scanner: {
    primaryColor: "#00ffc8",
    spinnerColor1: "#00ff88",
    spinnerColor2: "#00ffc8",
    spinnerColor3: "#a8ff3e",
  },
  ui: {
    style: "matrix",
    watermark: "DEEP SCREEN SHARE",
    dashboardClass: "dash-invaded",
  },
  metadata: {
    title: "Deep Screen Share — Plataforma Premium de Screen Share",
    description:
      "Plataforma premium de telagem forense, scanner e análise de bypass. Curso Básico, Avançado e Privado.",
    keywords: [
      "deep screen share",
      "screenshare",
      "telagem",
      "forense",
      "bypass",
      "scanner",
      "curso",
      "anti-cheat",
    ],
    ogTitle: "Deep Screen Share",
  },
};
