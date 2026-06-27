import {
  Apple,
  Bot,
  Cpu,
  Globe,
  Radar,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

export type MobileModule = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  icon: LucideIcon;
  accent: string;
  border: string;
  glow: string;
  badge?: string;
};

export const mobileModules: MobileModule[] = [
  {
    id: "mobile-geral",
    title: "Suporte Mobile",
    subtitle: "Geral · Emulador & Campeonato",
    description:
      "Compatibilidade total com Android e iOS. Otimização de sensibilidade, redução de lag e performance estável pra ranked e campeonato.",
    highlights: [
      "Config de sensi e DPI por dispositivo",
      "Redução de input lag e frame drops",
      "Perfis prontos pra campeonato",
      "Checklist de setup antes da SS",
    ],
    icon: Smartphone,
    accent: "text-cyan-400",
    border: "border-cyan-500/40",
    glow: "hover:shadow-[0_0_40px_-8px_rgba(34,211,238,0.45)]",
  },
  {
    id: "ios",
    title: "Curso iOS",
    subtitle: "Apple · iPhone & iPad",
    description:
      "Técnicas exclusivas pra ecossistema Apple: bypass de detecção de emulador, utilitários seguros e otimização sem comprometer o sistema.",
    highlights: [
      "Bypass de detecção no iOS",
      "Utilitários e perfis de rede",
      "Otimização de touch e FPS",
      "Instalação segura sem jailbreak pesado",
    ],
    icon: Apple,
    accent: "text-zinc-200",
    border: "border-zinc-400/35",
    glow: "hover:shadow-[0_0_40px_-8px_rgba(228,228,231,0.25)]",
    badge: "Apple",
  },
  {
    id: "android",
    title: "Curso Android",
    subtitle: "Root · Magisk · Kernel",
    description:
      "Root seguro, Magisk, kernels personalizados e mods de sistema. Bypass de segurança de emulador e FPS extremo no Android.",
    highlights: [
      "Root seguro e Magisk modules",
      "Kernels custom e undervolt",
      "Bypass anti-emulador Android",
      "Mods de sistema sem brick",
    ],
    icon: Cpu,
    accent: "text-emerald-400",
    border: "border-emerald-500/40",
    glow: "hover:shadow-[0_0_40px_-8px_rgba(52,211,153,0.4)]",
    badge: "Android",
  },
  {
    id: "ia-mobile",
    title: "IA Mobile",
    subtitle: "Automação inteligente",
    description:
      "Introdução à automação e análise de padrões de jogo no celular. Lógica de IA pra otimização de mira e recoil de forma indetectável.",
    highlights: [
      "Análise de padrões em tempo real",
      "Ajuste dinâmico de recoil/mira",
      "Scripts leves no device",
      "Comportamento humanizado",
    ],
    icon: Bot,
    accent: "text-violet-400",
    border: "border-violet-500/40",
    glow: "hover:shadow-[0_0_40px_-8px_rgba(167,139,250,0.45)]",
    badge: "IA",
  },
];

export const mobileScanFeature = {
  title: "Scan Mobile via Site",
  subtitle: "Passador · Replay Proxy",
  description:
    "Scan mobile avançado que roda direto no navegador. O tráfego do celular passa pelo nosso passador web — interceptação via proxy/replay de requisições.",
  steps: [
    {
      step: "01",
      title: "Conecta o celular",
      desc: "Configura proxy Wi‑Fi ou perfil VPN leve apontando pro passador 171 ScreenS.",
    },
    {
      step: "02",
      title: "Replay intercepta",
      desc: "Requisições do jogo/emulador passam pelo proxy web. Analisamos padrões, tráfego e assinaturas suspeitas.",
    },
    {
      step: "03",
      title: "Result no painel",
      desc: "Veredito, otimização de rede ou bypass aplicado — sem root/jailbreak no aparelho do usuário.",
    },
  ],
  perks: [
    "Roda 100% no browser",
    "Sem instalar .exe no PC alvo",
    "Ideal pra SS mobile remota",
    "Replay de pacotes pra auditoria",
  ],
};

export const mobileCoursePricing = {
  name: "Curso Mobile Completo",
  price: 80,
  badge: "Mobile Pack",
  description:
    "iOS + Android + IA Mobile + acesso ao Scan Mobile via site. Complemento perfeito pro Curso Emu desktop.",
  features: [
    "Todos os módulos mobile inclusos",
    "Scan Mobile via passador web",
    "Cargo Mobile no Discord",
    "Updates de bypass mobile",
    "Suporte em grupo dedicado",
  ],
  accent: "text-fuchsia-400",
  border: "border-fuchsia-500/40",
};
