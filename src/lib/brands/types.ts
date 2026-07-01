export type BrandId = "171screens" | "deepscreenshare";

export type BrandUiStyle = "matrix" | "clean";

export interface SiteBrand {
  id: BrandId;
  name: string;
  nameHighlight: string;
  shortName: string;
  tagline: string;
  scannerName: string;
  domain: string;
  appUrl: string;
  proxyHost: string;
  proxyPortIos: number;
  proxyPortAndroid: number;
  discord: {
    guildName: string;
    inviteUrl: string;
  };
  colors: {
    primary: string;
    primarySoft: string;
    accent: string;
    bg: string;
    bgElevated: string;
    card: string;
    border: string;
    muted: string;
    text: string;
  };
  scanner: {
    primaryColor: string;
    spinnerColor1: string;
    spinnerColor2: string;
    spinnerColor3: string;
  };
  ui: {
    style: BrandUiStyle;
    watermark: string;
    dashboardClass: string;
  };
  metadata: {
    title: string;
    description: string;
    keywords: string[];
    ogTitle: string;
  };
}
