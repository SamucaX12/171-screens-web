export type MobilePlatform = "ios" | "android";

export type MobileLessonSection = {
  heading: string;
  body: string;
  kind?: "intro" | "modulo" | "tecnica" | "veredito" | "normal";
  example?: string;
  image?: string;
  video?: string;
};

export type MobileLesson = {
  id: string;
  title: string;
  platform: MobilePlatform;
  categoryId: string;
  order: number;
  intro: string;
  coverImage?: string;
  sections: MobileLessonSection[];
  checklist: string[];
};

export type MobileLessonCategory = {
  id: string;
  label: string;
  description: string;
};

export const MOBILE_CATEGORIES: MobileLessonCategory[] = [
  { id: "introducao", label: "INTRODUÇÃO", description: "Visão geral e conceitos base do bypass mobile" },
  { id: "sistema",    label: "SISTEMA",    description: "Jailbreak, root, Magisk, KernelSU e indicadores de sistema" },
  { id: "ferramentas", label: "FERRAMENTAS", description: "Brevet, GameGuardian, MT Manager, Filza" },
  { id: "rede",       label: "REDE",       description: "Proxy, VPN, SSL Kill Switch e tráfego suspeito" },
  { id: "analise",    label: "ANÁLISE",    description: "Fluxo completo de SS e como montar o veredito" },
];

export const MOBILE_PLATFORM_META = {
  ios: {
    label:  "Curso iOS",
    short:  "iOS",
    color:  "text-zinc-100",
    border: "border-zinc-500/40",
    dot:    "bg-zinc-300",
    glow:   "shadow-[0_0_30px_-8px_rgba(228,228,231,0.3)]",
    accent: "from-zinc-400 to-zinc-600",
  },
  android: {
    label:  "Curso Android",
    short:  "AND",
    color:  "text-emerald-400",
    border: "border-emerald-500/40",
    dot:    "bg-emerald-400",
    glow:   "shadow-[0_0_30px_-8px_rgba(52,211,153,0.35)]",
    accent: "from-emerald-400 to-teal-600",
  },
} as const;
