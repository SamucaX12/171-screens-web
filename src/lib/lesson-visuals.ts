/** Onde achar rastro/cheat — visual único por aula */
export type LessonVisual = {
  where: string;
  path: string;
  tool: string;
  hint: string;
};

const EXPLICIT: Record<string, LessonVisual> = {
  prefetch: { where: "Prefetch", path: "Win+R → prefetch → C:\\Windows\\Prefetch", tool: "Explorer", hint: "Arquivos .pf = exe executado" },
  "temp-recent": { where: "Temp + Recent", path: "Win+R → %temp% · shell:recent · %appdata%", tool: "Explorer", hint: "Loaders esquecidos aqui" },
  "uso-dados": { where: "Uso de Dados", path: "Config → Rede → Uso de dados", tool: "Windows", hint: "MB do loader/auth" },
  antivirus: { where: "Defender", path: "Segurança Windows → Histórico", tool: "Defender", hint: "Exclusões e ameaças" },
  "journal-trace": { where: "USN Journal", path: "171 export · fsutil usn", tool: "Journal", hint: "DELETE e RENAME" },
  "delete-mass": { where: "Anti-forense", path: "Prefetch vazio + Temp limpo + Journal", tool: "Multi", hint: "Limpeza coordenada" },
  "bypass-lento": { where: "Serviços OFF", path: "services.msc · System Informer", tool: "Services", hint: "SysMain/EventLog off" },
  "system-informer-intro": { where: "DLLs no emulador", path: "SI → HD-Player → Properties → Modules", tool: "System Informer", hint: "Filter: .dll · Temp" },
  die: { where: "Autopsia .exe", path: "Arrasta suspeito pro DIE", tool: "DIE", hint: "Packer + entropia" },
  "event-viewer": { where: "Event Viewer", path: "Win+R → eventvwr", tool: "Event Viewer", hint: "Application + System" },
  "fluxo-completo": { where: "Fluxo SS", path: "Pin → Prefetch → Temp → Veredito", tool: "171 ScreenS", hint: "Ordem sagrada" },
  "det-loader-temp": { where: "Loader Temp", path: "Win+R → %temp%", tool: "Explorer", hint: ".exe recente" },
  "det-prefetch-vazio": { where: "Prefetch vazio", path: "Win+R → prefetch", tool: "Explorer", hint: "<5 .pf = suspeito" },
  "det-dll-sem-assinatura": { where: "DLL unsigned", path: "SI → emulador → Modules", tool: "System Informer", hint: "Company vazio" },
  "bluestacks-paths": { where: "BlueStacks", path: "HD-Player.exe → Modules · Logs", tool: "System Informer", hint: "Inject emulador" },
  "ldplayer-paths": { where: "LDPlayer", path: "dnplayer.exe → Modules", tool: "System Informer", hint: "C:\\LDPlayer\\" },
  "det-veredito-basico": { where: "Veredito", path: "Evidência + print + horário", tool: "Relatório", hint: "CLEAN/SUSPEITO/BAN" },
};

const CAT: Record<string, LessonVisual> = {
  windows: { where: "Artefato Windows", path: "Prefetch · Temp · Recent · AppData", tool: "Explorer", hint: "Win+R atalhos" },
  bypass: { where: "Anti-forense", path: "Journal · Prefetch vazio · Serviços", tool: "Multi", hint: "Limpeza suspeita" },
  ferramentas: { where: "Ferramenta SS", path: "System Informer · DIE · Event Viewer", tool: "Apps", hint: "Admin required" },
  sysmon: { where: "Sysmon Event", path: "eventvwr → Sysmon Operational", tool: "Sysmon", hint: "Filtra Event ID" },
  deteccoes: { where: "Sinal de cheat", path: "Correlaciona 2+ artefatos", tool: "Multi", hint: "Print datado" },
  analise: { where: "Análise SS", path: "Timeline → veredito", tool: "Relatório", hint: "Sem achismo" },
  avancado: { where: "Forense avançado", path: "UEFI · Dump · Volatility", tool: "Pro", hint: "Tier II+" },
  privado: { where: "Método privado", path: "DMA · Remote · Fileless", tool: "Private", hint: "Tier III" },
};

export function getLessonVisual(id: string, title: string, categoryId: string): LessonVisual {
  if (EXPLICIT[id]) return EXPLICIT[id];

  const m = id.match(/sysmon-event-(\d+)/);
  if (m) {
    return { where: `Sysmon ID ${m[1]}`, path: `Sysmon Operational → Event ${m[1]}`, tool: "Sysmon", hint: "Filtra ID na SS" };
  }
  if (/^event-/.test(id)) {
    return { where: title.split("—")[0]?.trim() || "Event", path: "eventvwr → filtrar Event ID", tool: "Event Viewer", hint: "Log Windows" };
  }
  if (/^det-/.test(id)) {
    return { where: title.split("—")[0]?.trim() || "Detecção", path: "Ver checklist + path na aula", tool: "Multi", hint: "Rastro específico" };
  }
  if (/dma|uefi|remote|fileless|hollow|reflective|manual-map|kernel|atom|ipv6/.test(id)) {
    return { ...CAT.privado, where: title.split("—")[0]?.trim() || CAT.privado.where };
  }
  if (/emulador|bluestacks|ldplayer|dnplayer/.test(id)) {
    return { where: "Emulador", path: "SI → processo emu → Modules", tool: "System Informer", hint: "DLL inject" };
  }

  const base = CAT[categoryId] ?? CAT.deteccoes;
  return { ...base, where: (title.split("—")[0] || title).trim().slice(0, 40) };
}

export function lessonImagePath(id: string): string {
  return `/lessons/${id}.svg`;
}
