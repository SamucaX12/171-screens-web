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
    id: "ios-card",
    title: "Curso iOS",
    subtitle: "Apple · iPhone & iPad",
    description:
      "Técnicas exclusivas pra ecossistema Apple: bypass de detecção, utilitários seguros e otimização sem jailbreak pesado.",
    highlights: [
      "Bypass de detecção no iOS",
      "Perfis de rede e utilitários",
      "Otimização de touch e FPS",
      "Instalação segura sem jailbreak",
    ],
    icon: Apple,
    accent: "text-zinc-200",
    border: "border-zinc-400/35",
    glow: "hover:shadow-[0_0_40px_-8px_rgba(228,228,231,0.25)]",
    badge: "Apple",
  },
  {
    id: "android-card",
    title: "Curso Android",
    subtitle: "Root · Magisk · Kernel",
    description:
      "Root seguro, Magisk, kernels custom e bypass de anti-emulador. FPS extremo e controle total do dispositivo.",
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
      "Introdução à automação e análise de padrões de jogo no celular. Lógica de IA pra otimização de mira e recoil.",
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

export type MobilePlatformCourse = {
  id: string;
  platform: "ios" | "android";
  title: string;
  subtitle: string;
  description: string;
  accent: string;
  border: string;
  borderStrong: string;
  bg: string;
  bgStrong: string;
  dot: string;
  icon: LucideIcon;
  modules: {
    id: string;
    title: string;
    summary: string;
    topics: string[];
  }[];
};

export const mobilePlatformCourses: MobilePlatformCourse[] = [
  {
    id: "ios",
    platform: "ios",
    title: "Curso iOS",
    subtitle: "iPhone · iPad · Apple Ecosystem",
    description:
      "Domina o ecossistema Apple: bypass de detecção de emulador, perfis de rede, utilitários seguros e otimização de performance sem jailbreak pesado.",
    accent: "text-zinc-100",
    border: "border-zinc-400/30",
    borderStrong: "border-zinc-300/50",
    bg: "bg-zinc-400/5",
    bgStrong: "bg-zinc-400/10",
    dot: "bg-zinc-300",
    icon: Apple,
    modules: [
      {
        id: "ios-intro",
        title: "Setup inicial iOS",
        summary: "Configurar o dispositivo Apple pra gameplay e screen share seguro.",
        topics: [
          "Verificação de versão iOS e compatibilidade",
          "Limpeza de logs antes da sessão",
          "Configurações de privacidade que interferem na SS",
          "Perfis de rede e configuração de proxy",
          "Ativar modo desenvolvedor sem jailbreak",
        ],
      },
      {
        id: "ios-bypass",
        title: "Bypass de Detecção iOS",
        summary: "Como identificar e lidar com detecção de emulador no ecossistema Apple.",
        topics: [
          "Como o emulador é detectado no iOS",
          "Leitura de gyroscope e acelerômetro falso",
          "Bypass de Device ID e UDID",
          "Perfis de configuração (MDM) e seus riscos",
          "TestFlight e builds não assinadas — quando suspeitar",
          "Diferença entre jogo native ARM vs emulado",
        ],
      },
      {
        id: "ios-performance",
        title: "Performance & Otimização iOS",
        summary: "FPS estável, input lag mínimo e configuração pra ranked.",
        topics: [
          "120Hz em iPhones compatíveis — como verificar",
          "Modo alto desempenho e thermal throttling",
          "Sensibilidade e DPI por modelo de iPhone/iPad",
          "Reduzir lag de input no touch screen",
          "Fechar processos em background corretamente",
          "Modo avião parcial — rede sem interferência",
        ],
      },
      {
        id: "ios-ss",
        title: "Screen Share no iOS",
        summary: "Como realizar e passar pela SS em dispositivo Apple.",
        topics: [
          "Compartilhar tela via ReplayKit / AirPlay",
          "O que a SS vê no iOS — limitações do sistema",
          "Evidências que aparecem na captura Apple",
          "Como o telador lê SS mobile iOS",
          "Checklist pré-SS pra jogador iOS",
        ],
      },
    ],
  },
  {
    id: "android",
    platform: "android",
    title: "Curso Android",
    subtitle: "Root · Magisk · Kernel Custom",
    description:
      "Root seguro com Magisk, kernels customizados, mods de sistema e bypass completo de anti-emulador. FPS extremo e controle total do dispositivo Android.",
    accent: "text-emerald-400",
    border: "border-emerald-500/25",
    borderStrong: "border-emerald-500/50",
    bg: "bg-emerald-500/5",
    bgStrong: "bg-emerald-500/10",
    dot: "bg-emerald-400",
    icon: Cpu,
    modules: [
      {
        id: "android-root",
        title: "Root & Magisk",
        summary: "Root seguro sem brick — Magisk modules e hide do sistema.",
        topics: [
          "O que é root e por que usamos no Android",
          "Magisk vs KernelSU — qual usar em 2025",
          "Instalar Magisk sem perder garantia (método fastboot)",
          "Módulos essenciais: Zygisk, LSPosed, MagiskHide",
          "Esconder root do jogo (MagiskHide / Shamiko)",
          "SafetyNet e Play Integrity — como passar",
        ],
      },
      {
        id: "android-kernel",
        title: "Kernels Custom & Undervolt",
        summary: "Kernels modificados pra FPS alto e temperatura baixa.",
        topics: [
          "O que muda no kernel custom vs stock",
          "Kernels populares: KernelSU, Sultan, CAF",
          "Undervolt via Kernel Adiutor ou Franco",
          "Perfil de energia: Gaming vs Balanced",
          "Temperatura e throttling — como monitorar",
          "Overclocking seguro de GPU no Snapdragon/Dimensity",
        ],
      },
      {
        id: "android-bypass",
        title: "Bypass Anti-Emulador Android",
        summary: "Como o anti-cheat detecta Android e como contornar.",
        topics: [
          "Detecção de emulador no Android (Build.FINGERPRINT, props)",
          "Magisk modules pra spoof de device",
          "props fake: modelo, fabricante, Android ID",
          "Patcher de APK — quando é necessário",
          "Xposed/LSPosed hooks de detecção",
          "GMS spoof e Google Play protect bypass",
          "Checklist pré-match anti-detecção",
        ],
      },
      {
        id: "android-mods",
        title: "Mods de Sistema sem Brick",
        summary: "Modificações avançadas com segurança — backup e recovery.",
        topics: [
          "TWRP e recovery customizado",
          "Backup completo com TWRP antes de qualquer mod",
          "Flashar ZIPs com segurança",
          "Desativar services desnecessários do sistema",
          "Bloatware removal sem quebrar o telefone",
          "Como recuperar de soft brick",
        ],
      },
      {
        id: "android-ss",
        title: "Screen Share Android",
        summary: "Como o telador analisa a SS Android e o que procurar.",
        topics: [
          "ADB e o que expõe no Android",
          "scrcpy — mirroring e análise do telador",
          "O que aparece no logcat durante SS",
          "Evidências de Magisk/root na SS",
          "Checklist pré-SS pra jogador Android",
          "Como o telador identifica device rooteado",
        ],
      },
    ],
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
      desc: "Configura proxy Wi‑Fi ou perfil VPN leve apontando pro passador Deep Screen Share.",
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
    "iOS + Android + IA Mobile + acesso ao Scan Mobile via site. Complemento perfeito pro Curso Deep desktop.",
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
