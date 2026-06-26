import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public", "lessons");

const tierFiles = [
  "src/lib/lessons/tier1.ts",
  "src/lib/lessons/tier1-extra.ts",
  "src/lib/lessons/tier2.ts",
  "src/lib/lessons/tier2-extra.ts",
  "src/lib/lessons/tier3.ts",
  "src/lib/lessons/tier3-extra.ts",
];

const lessons = [];
for (const f of tierFiles) {
  const text = fs.readFileSync(path.join(root, f), "utf8");
  const re = /L\(\s*(?:\d+\s*,\s*)?"([^"]+)"\s*,\s*"([^"]+)"\s*,\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(text))) {
    lessons.push({ id: m[1], title: m[2], categoryId: m[3] });
  }
}

const CAT_COLORS = {
  windows: { bg: "#052e16", accent: "#34d399", border: "#10b981" },
  bypass: { bg: "#431407", accent: "#fb923c", border: "#f97316" },
  ferramentas: { bg: "#083344", accent: "#22d3ee", border: "#06b6d4" },
  sysmon: { bg: "#2e1065", accent: "#c084fc", border: "#a855f7" },
  deteccoes: { bg: "#422006", accent: "#fbbf24", border: "#f59e0b" },
  analise: { bg: "#172554", accent: "#60a5fa", border: "#3b82f6" },
  avancado: { bg: "#3b0764", accent: "#e879f9", border: "#d946ef" },
  privado: { bg: "#500724", accent: "#f472b6", border: "#ec4899" },
};

const EXPLICIT = {
  prefetch: { where: "Prefetch", path: "Win+R → prefetch → C:\\Windows\\Prefetch", tool: "Explorer", hint: ".pf = exe executado" },
  "temp-recent": { where: "Temp + Recent", path: "%temp% · shell:recent · AppData", tool: "Explorer", hint: "Loaders esquecidos" },
  "system-informer-intro": { where: "DLLs emulador", path: "SI → HD-Player → Modules", tool: "System Informer", hint: "Filter .dll" },
  "bluestacks-paths": { where: "BlueStacks", path: "HD-Player.exe → Modules", tool: "System Informer", hint: "DLL Temp" },
  die: { where: "Autopsia .exe", path: "Arrasta pro DIE", tool: "DIE", hint: "Packer/entropia" },
  "fluxo-completo": { where: "Fluxo SS", path: "Pin→Prefetch→Temp→Veredito", tool: "171 ScreenS", hint: "Ordem sagrada" },
};

function getVisual(id, title, categoryId) {
  if (EXPLICIT[id]) return EXPLICIT[id];
  const hints = {
    windows: { where: "Windows", path: "Prefetch/Temp/Recent", tool: "Explorer", hint: "Artefatos nativos" },
    bypass: { where: "Bypass", path: "Journal + limpeza", tool: "Multi", hint: "Anti-forense" },
    ferramentas: { where: "Ferramenta", path: "SI / DIE / Event Viewer", tool: "Apps", hint: "Como admin" },
    sysmon: { where: "Sysmon", path: "eventvwr → Sysmon Operational", tool: "Sysmon", hint: "Event ID" },
    deteccoes: { where: "Detecção", path: "Correlaciona artefatos", tool: "Multi", hint: "2+ indícios" },
    analise: { where: "Análise", path: "Timeline → veredito", tool: "Relatório", hint: "Print datado" },
    avancado: { where: "Avançado", path: "UEFI/Dump/Volatility", tool: "Pro", hint: "Tier II" },
    privado: { where: "Private", path: "DMA/Remote/Fileless", tool: "Tier III", hint: "Exclusivo" },
  };
  const base = hints[categoryId] || hints.deteccoes;
  const short = title.split("—")[0]?.trim() || title;
  const sm = id.match(/sysmon-event-(\d+)/);
  if (sm) return { where: `Sysmon ID ${sm[1]}`, path: `Sysmon Operational → Event ${sm[1]}`, tool: "Sysmon", hint: "Filtra ID" };
  if (/^det-/.test(id)) return { where: short, path: "Ver checklist da aula", tool: "Multi", hint: "Rastro específico" };
  if (/event/.test(id)) return { where: short, path: "eventvwr → filtrar ID", tool: "Event Viewer", hint: "Log Windows" };
  return { ...base, where: short.slice(0, 35) };
}

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function wrap(text, max = 42) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const w of words) {
    if ((line + w).length > max) {
      lines.push(line.trim());
      line = w + " ";
    } else line += w + " ";
  }
  if (line.trim()) lines.push(line.trim());
  return lines.slice(0, 3);
}

function svgFor(lesson) {
  const v = getVisual(lesson.id, lesson.title, lesson.categoryId);
  const c = CAT_COLORS[lesson.categoryId] || CAT_COLORS.deteccoes;
  const titleLines = wrap(lesson.title, 38);
  const pathLines = wrap(v.path, 44);
  const tOff = titleLines.length * 28;

  const titleSvg = titleLines
    .map((l, i) => `<text x="40" y="${48 + i * 28}" fill="#fff" font-family="Segoe UI,Arial,sans-serif" font-size="22" font-weight="800">${esc(l)}</text>`)
    .join("\n");
  const pathSvg = pathLines
    .map((l, i) => `<text x="56" y="${200 + i * 22}" fill="${c.accent}" font-family="Consolas,monospace" font-size="14">${esc(l)}</text>`)
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${c.bg}"/><stop offset="100%" stop-color="#0a0a0c"/></linearGradient></defs>
  <rect width="800" height="450" fill="url(#g)"/>
  <rect x="20" y="20" width="760" height="410" rx="16" fill="#0c0c10" stroke="${c.border}" stroke-width="2"/>
  <rect x="20" y="20" width="760" height="6" rx="3" fill="${c.accent}"/>
  <text x="40" y="38" fill="${c.accent}" font-family="Segoe UI,Arial,sans-serif" font-size="11" font-weight="700" letter-spacing="2">171 SCREENS · ONDE ACHAR RASTRO</text>
  ${titleSvg}
  <rect x="40" y="${120 + tOff}" width="720" height="130" rx="12" fill="#000" fill-opacity="0.45" stroke="${c.border}" stroke-opacity="0.4"/>
  <text x="56" y="${160 + tOff}" fill="#94a3b8" font-family="Segoe UI,sans-serif" font-size="11" font-weight="700">ONDE PROCURAR</text>
  <text x="56" y="${180 + tOff}" fill="#fff" font-family="Segoe UI,sans-serif" font-size="16" font-weight="700">${esc(v.where)}</text>
  ${pathSvg}
  <text x="56" y="${200 + tOff + pathLines.length * 22 + 16}" fill="#64748b" font-family="Segoe UI,sans-serif" font-size="12">${esc(v.tool)} · ${esc(v.hint)}</text>
  <rect x="40" y="340" width="720" height="70" rx="8" fill="#111" stroke="#333"/>
  <text x="56" y="365" fill="${c.accent}" font-family="Consolas,monospace" font-size="11">${esc(lesson.id)}</text>
  <text x="56" y="385" fill="#64748b" font-family="Segoe UI,sans-serif" font-size="11">${esc(lesson.categoryId.toUpperCase())} · ${esc(v.path.slice(0, 60))}</text>
  <circle cx="720" cy="375" r="22" fill="${c.accent}" fill-opacity="0.15" stroke="${c.accent}"/>
  <text x="720" y="381" text-anchor="middle" fill="${c.accent}" font-size="16">?</text>
</svg>`;
}

fs.mkdirSync(outDir, { recursive: true });
for (const lesson of lessons) {
  fs.writeFileSync(path.join(outDir, `${lesson.id}.svg`), svgFor(lesson), "utf8");
}
console.log(`Generated ${lessons.length} lesson SVGs`);
