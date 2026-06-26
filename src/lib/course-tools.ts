export type CourseTool = {
  id: string;
  name: string;
  tag: string;
  description: string;
  downloadUrl: string;
  note?: string;
};

export const COURSE_TOOLS: CourseTool[] = [
  {
    id: "system-informer",
    name: "System Informer",
    tag: "Processos · DLLs · Rede",
    description: "Ver módulos/DLLs no emulador, filtrar por path e assinatura.",
    downloadUrl: "https://systeminformer.sourceforge.io/",
    note: "Abre sempre como Administrador na SS.",
  },
  {
    id: "die",
    name: "DIE (Detect It Easy)",
    tag: "Análise de .exe",
    description: "Packer, entropia e assinatura de executáveis suspeitos.",
    downloadUrl: "https://github.com/horsicq/DIE-engine/releases",
    note: "Arrasta o .exe pro DIE antes de rodar.",
  },
  {
    id: "winprefetchview",
    name: "WinPrefetchView",
    tag: "Prefetch avançado",
    description: "Lista .pf com caminho original do executável.",
    downloadUrl: "https://www.nirsoft.net/utils/win_prefetch_view.html",
  },
  {
    id: "everything",
    name: "Everything Search",
    tag: "Busca rápida",
    description: "Achar .dll / .exe por nome em segundos.",
    downloadUrl: "https://www.voidtools.com/downloads/",
  },
  {
    id: "bluestacks",
    name: "BlueStacks 5",
    tag: "Emulador",
    description: "Processo alvo na SS: HD-Player.exe",
    downloadUrl: "https://www.bluestacks.com/download.html",
  },
  {
    id: "sysmon",
    name: "Sysmon",
    tag: "Monitoramento",
    description: "Logs avançados — Event ID 8, 10, 11 (servidor competitive).",
    downloadUrl: "https://learn.microsoft.com/sysinternals/downloads/sysmon",
  },
  {
    id: "event-viewer",
    name: "Event Viewer",
    tag: "Nativo Windows",
    description: "Já vem no Windows — eventvwr.msc",
    downloadUrl: "https://support.microsoft.com/windows/event-viewer",
    note: "Win+R → eventvwr → Enter",
  },
];

/** Por categoria — TODAS as aulas ganham apps relevantes */
export const CATEGORY_TOOLS: Record<string, string[]> = {
  windows: ["winprefetchview", "everything", "event-viewer"],
  bypass: ["everything", "winprefetchview", "system-informer"],
  ferramentas: ["system-informer", "die", "everything"],
  sysmon: ["sysmon", "system-informer", "event-viewer"],
  deteccoes: ["system-informer", "bluestacks", "die"],
  analise: ["system-informer", "die", "winprefetchview", "everything"],
  avancado: ["system-informer", "die", "sysmon"],
  privado: ["system-informer", "die", "sysmon"],
};

/** Override por aula específica */
const LESSON_TOOLS: Record<string, string[]> = {
  prefetch: ["winprefetchview"],
  die: ["die"],
  "system-informer-intro": ["system-informer"],
  "bluestacks-paths": ["system-informer", "bluestacks"],
  "ldplayer-paths": ["system-informer"],
  "fluxo-completo": ["system-informer", "die", "winprefetchview"],
};

export function getToolsForLesson(lessonId: string, categoryId?: string): CourseTool[] {
  const explicit = LESSON_TOOLS[lessonId];
  const fromCat = categoryId ? CATEGORY_TOOLS[categoryId] : [];
  const ids = [...new Set([...(explicit ?? []), ...(fromCat ?? [])])];
  return COURSE_TOOLS.filter((t) => ids.includes(t.id));
}
