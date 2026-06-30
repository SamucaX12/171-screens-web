import type { CourseTier, CourseAccessSource } from "./types";
import { BOOSTER_LESSON_COUNT } from "./booster-lessons";

export type TierTheme = {
  id: CourseTier;
  short: string;
  name: string;
  badge: string;
  price: string;
  description: string;
  hexColor: string;
  color: string;
  colorMuted: string;
  bg: string;
  bgStrong: string;
  border: string;
  borderStrong: string;
  ring: string;
  dot: string;
  btn: string;
  icon: string;
};

export const TIER_ORDER: CourseTier[] = ["tier1", "tier2", "tier3"];

export const TIER_THEME: Record<CourseTier, TierTheme> = {
  tier1: {
    id: "tier1",
    short: "Tier I",
    name: "Básico",
    badge: "Iniciante",
    price: "R$ 60",
    description: "Do zero — Prefetch, Temp, Journal, AV e +20 detecções de cheat.",
    hexColor: "#00ff88",
    color: "text-green-400",
    colorMuted: "text-green-400/70",
    bg: "bg-green-500/10",
    bgStrong: "bg-green-500/15",
    border: "border-green-500/25",
    borderStrong: "border-green-500/50",
    ring: "ring-green-500/30",
    dot: "bg-green-400",
    btn: "bg-green-400 hover:bg-green-300 text-black",
    icon: "text-green-400",
  },
  tier2: {
    id: "tier2",
    short: "Tier II",
    name: "Avançado",
    badge: "Intermediário",
    price: "R$ 100",
    description: "UEFI, Sysmon completo, serviços, dump, crashdumps e +30 aulas avançadas.",
    hexColor: "#00ffc8",
    color: "text-teal-300",
    colorMuted: "text-teal-300/70",
    bg: "bg-teal-500/10",
    bgStrong: "bg-teal-500/15",
    border: "border-teal-500/25",
    borderStrong: "border-teal-500/50",
    ring: "ring-teal-500/30",
    dot: "bg-teal-300",
    btn: "bg-teal-400 hover:bg-teal-300 text-black",
    icon: "text-teal-300",
  },
  tier3: {
    id: "tier3",
    short: "Tier III",
    name: "Privado",
    badge: "Exclusivo",
    price: "R$ 140",
    description: "DMA, UEFI profundo, remote bypass, hollowing, fileless e grupo fechado.",
    hexColor: "#a8ff3e",
    color: "text-lime-400",
    colorMuted: "text-lime-400/70",
    bg: "bg-lime-500/10",
    bgStrong: "bg-lime-500/15",
    border: "border-lime-500/25",
    borderStrong: "border-lime-500/50",
    ring: "ring-lime-500/30",
    dot: "bg-lime-400",
    btn: "bg-lime-400 hover:bg-lime-300 text-black",
    icon: "text-lime-400",
  },
};

export function getTierTheme(tier: CourseTier) {
  return TIER_THEME[tier];
}

export function tierDisplay(tier: CourseTier | null, accessSource?: CourseAccessSource | null) {
  if (!tier) return { label: "Sem acesso", theme: null };
  const t = TIER_THEME[tier];
  const label =
    accessSource === "booster" && tier === "tier1"
      ? `Booster · ${BOOSTER_LESSON_COUNT} aulas grátis`
      : `${t.short} · ${t.name}`;
  return { label, theme: t };
}
