"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield,
  Monitor,
  XCircle,
  User,
  Cpu,
  FileText,
  LayoutGrid,
  Globe,
  Wifi,
  Usb,
  HardDrive,
  Headphones,
  ChevronRight,
} from "lucide-react";
import { ScanDoc, ScanDisplayTotals } from "@/lib/scanner-types";
import {
  filterThreatDetections,
  parseSiteEntry,
  siteCategoryStyle,
} from "@/lib/scan-threat-helpers";
import { StatusPill } from "@/components/scanner/PinBadge";

type ListEntry = string | Record<string, unknown>;
type MainTab = "overview" | "detections" | "threats" | "system" | "accounts" | "logs";
type DetectionTab = "critical" | "warning" | "suspicious" | "integrity";
type SystemTab = "bam" | "bypass" | "powershell" | "prefetch" | "process" | "stream" | "recorder";

const NAV: { id: MainTab; label: string; icon: typeof LayoutGrid }[] = [
  { id: "overview", label: "Visão geral", icon: LayoutGrid },
  { id: "detections", label: "Detecções", icon: XCircle },
  { id: "threats", label: "Ameaças", icon: Wifi },
  { id: "system", label: "Sistema", icon: Cpu },
  { id: "accounts", label: "Contas", icon: User },
  { id: "logs", label: "Logs", icon: FileText },
];

function parseListEntry(item: ListEntry): Record<string, unknown> | string {
  if (typeof item === "string") {
    const trimmed = item.trim();
    if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
      try {
        return parseListEntry(JSON.parse(trimmed) as Record<string, unknown>);
      } catch {
        return item;
      }
    }
    return item;
  }
  return item;
}

function formatListItem(item: ListEntry): string {
  const parsed = parseListEntry(item);
  if (typeof parsed === "string") return parsed;
  if ("pathValue" in parsed && "timeStamp" in parsed) {
    const path = String(parsed.pathValue ?? "");
    const time = String(parsed.timeStamp ?? "");
    return time ? `${path} · ${time}` : path;
  }
  if ("processName" in parsed) {
    const name = String(parsed.processName ?? "");
    const start = String(parsed.processStart ?? "");
    return start ? `${name} — ${start}` : name;
  }
  if ("fileName" in parsed) {
    const name = String(parsed.fileName ?? "");
    const size = parsed.fileSize ? ` · ${parsed.fileSize}` : "";
    const status = parsed.fileStatus ? ` · ${parsed.fileStatus}` : "";
    return `${name}${size}${status}`;
  }
  try {
    return JSON.stringify(parsed);
  } catch {
    return String(parsed);
  }
}

function isProcessActive(item: ListEntry): boolean | null {
  const parsed = parseListEntry(item);
  if (typeof parsed === "string") {
    if (parsed.includes("[Ativo]")) return true;
    if (parsed.includes("[OFF]")) return false;
    return null;
  }
  if (typeof parsed === "object" && parsed && "processName" in parsed) {
    const name = String(parsed.processName ?? "");
    if (name.includes("[Ativo]")) return true;
    if (name.includes("[OFF]")) return false;
  }
  return null;
}

function RiskRing({ score, label }: { score: number; label: string }) {
  const r = 54;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  const color = score >= 70 ? "#ef4444" : score >= 40 ? "#f59e0b" : "#34d399";

  return (
    <div className="relative flex flex-col items-center">
      <svg width="140" height="140" className="-rotate-90">
        <circle cx="70" cy="70" r={r} fill="none" stroke="#1f1f23" strokeWidth="8" />
        <circle
          cx="70"
          cy="70"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-semibold tabular-nums" style={{ color }}>{score}</span>
        <span className="text-[10px] uppercase tracking-wider text-screens-muted">risco</span>
      </div>
      <p className="mt-2 text-sm font-medium">{label}</p>
    </div>
  );
}

function DetectionCards({
  items,
  total,
  variant,
  empty,
}: {
  items: ScanDoc["detections"];
  total?: number;
  variant: "critical" | "warning" | "suspicious" | "integrity";
  empty: string;
}) {
  const border = {
    critical: "border-red-500/20",
    warning: "border-amber-500/20",
    suspicious: "border-orange-500/20",
    integrity: "border-emerald-500/20",
  }[variant];

  if (!items?.length) {
    return <div className={`rounded-lg border border-dashed ${border} px-4 py-12 text-center text-sm text-screens-muted`}>{empty}</div>;
  }
  const hidden = (total ?? items.length) - items.length;
  return (
    <div className="space-y-2">
      {items.map((d, i) => (
        <div key={i} className={`rounded-lg border ${border} bg-screens-bg p-4`}>
          <div className="flex gap-2 text-[10px] uppercase tracking-wider text-screens-muted">
            <span>{d.severity}</span>
            <span>·</span>
            <span>{d.category}</span>
          </div>
          <p className="mt-2 font-medium text-sm">{d.title}</p>
          <p className="mt-1 text-sm text-screens-muted leading-relaxed">{d.description}</p>
        </div>
      ))}
      {hidden > 0 && <p className="text-center text-xs text-screens-muted">+{hidden} ocultos</p>}
    </div>
  );
}

function ListBlock({
  items,
  total,
  empty,
  variant = "default",
}: {
  items?: ListEntry[];
  total?: number;
  empty: string;
  variant?: "default" | "bypass" | "process";
}) {
  if (!items?.length) {
    return <div className="rounded-lg border border-dashed border-screens-border px-4 py-12 text-center text-sm text-screens-muted">{empty}</div>;
  }
  const hidden = (total ?? items.length) - items.length;
  return (
    <ul className="max-h-[420px] space-y-1.5 overflow-y-auto font-mono text-[11px]">
      {items.map((item, i) => {
        const active = variant === "process" ? isProcessActive(item) : null;
        return (
          <li key={i} className="rounded-md border border-screens-border bg-screens-bg px-3 py-2.5 text-screens-muted break-all">
            {active !== null && (
              <span className={`mr-2 text-[9px] font-bold uppercase ${active ? "text-emerald-400" : "text-red-400"}`}>
                {active ? "on" : "off"}
              </span>
            )}
            {formatListItem(item)}
          </li>
        );
      })}
      {hidden > 0 && <li className="py-2 text-center text-xs text-screens-muted">+{hidden} ocultos</li>}
    </ul>
  );
}

export function ScanResultView({
  scan,
  totals,
  pinResult,
  pinCode,
}: {
  scan: ScanDoc;
  totals?: ScanDisplayTotals;
  pinResult?: string;
  pinCode?: string;
}) {
  const sys = scan.systemInfo ?? {};
  const [mainTab, setMainTab] = useState<MainTab>("overview");
  const [detectionTab, setDetectionTab] = useState<DetectionTab>("critical");
  const [systemTab, setSystemTab] = useState<SystemTab>("bam");

  const remote = filterThreatDetections(scan, "remote");
  const dma = filterThreatDetections(scan, "dma");
  const usb = filterThreatDetections(scan, "usb");

  const counts = {
    critical: totals?.detections ?? scan.detections?.length ?? 0,
    warning: totals?.warnings ?? scan.warnings?.length ?? 0,
    suspicious: totals?.suspicious ?? scan.suspicious?.length ?? 0,
    integrity: totals?.integrity ?? scan.integrity?.length ?? 0,
    discord: scan.discordInfo?.accounts?.length ?? 0,
    steam: scan.steamList?.length ?? 0,
    bam: totals?.bamList ?? scan.bamList?.length ?? 0,
    bypass: totals?.bypassList ?? scan.bypassList?.length ?? scan.unsignedList?.length ?? 0,
    powershell: totals?.powershellHistory ?? scan.powershellHistory?.length ?? 0,
    prefetch: totals?.prefetchList ?? scan.prefetchList?.length ?? 0,
    process: totals?.processList ?? scan.processList?.length ?? 0,
    admin: totals?.adminLogs ?? scan.adminLogs?.length ?? 0,
    recorder: totals?.recordingSoftware ?? scan.recordingSoftware?.length ?? 0,
    sites: totals?.browserList ?? scan.browserList?.length ?? 0,
    threats: remote.length + dma.length + usb.length + (scan.usbList?.length ?? 0),
  };

  const detectionTotal = counts.critical + counts.warning + counts.suspicious + counts.integrity;
  const systemTotal = counts.bam + counts.bypass + counts.powershell + counts.prefetch + counts.process + counts.recorder;

  const riskScore = Math.min(
    100,
    Math.round(counts.critical * 12 + counts.warning * 4 + counts.suspicious * 6 - counts.integrity * 0.5)
  );

  const verdictLabel =
    pinResult === "cheating"
      ? "Cheat detectado"
      : pinResult === "suspicious"
        ? "Suspeito"
        : pinResult === "warning"
          ? "Warning"
          : pinResult === "clean"
            ? "Clean"
            : "Análise";

  return (
    <div className="page-scanner min-h-full flex flex-col lg:flex-row">
      {/* Sidebar nav */}
      <aside className="lg:w-52 shrink-0 border-b lg:border-b-0 lg:border-r border-screens-border p-4 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
        <p className="label-xs mb-3">Relatório</p>
        <nav className="space-y-0.5">
          {NAV.map((item) => {
            const count =
              item.id === "detections"
                ? detectionTotal
                : item.id === "threats"
                  ? counts.threats + counts.sites
                  : item.id === "system"
                    ? systemTotal
                    : item.id === "accounts"
                      ? counts.discord + counts.steam
                      : item.id === "logs"
                        ? counts.admin
                        : undefined;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setMainTab(item.id)}
                className={`w-full flex items-center justify-between rounded-lg px-3 py-2 text-[13px] transition ${
                  mainTab === item.id ? "bg-white/[0.06] text-white" : "text-screens-muted hover:bg-white/[0.03]"
                }`}
              >
                <span className="flex items-center gap-2">
                  <item.icon className="h-3.5 w-3.5 opacity-70" />
                  {item.label}
                </span>
                {count !== undefined && count > 0 && (
                  <span className="text-[10px] font-mono text-screens-muted">{count}</span>
                )}
              </button>
            );
          })}
        </nav>

        {pinCode && (
          <Link
            href={`/dashboard/tickets?pin=${pinCode}&type=scan`}
            className="mt-6 flex items-center gap-2 rounded-lg border border-screens-border px-3 py-2.5 text-[12px] text-screens-muted hover:text-white hover:bg-white/[0.03] transition"
          >
            <Headphones className="h-3.5 w-3.5" />
            Ticket sobre este scan
          </Link>
        )}
      </aside>

      <div className="flex-1 min-w-0">
        {/* Hero verdict */}
        <div className="border-b border-screens-border bg-screens-bg-elevated">
          <div className="max-w-4xl mx-auto p-6 md:p-8 flex flex-col md:flex-row items-center gap-8">
            <RiskRing score={riskScore} label={verdictLabel} />
            <div className="flex-1 w-full">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {pinResult && pinResult !== "none" && <StatusPill value={pinResult} />}
                {scan.streamModeDetected && (
                  <span className="rounded-md border border-amber-500/30 px-2 py-0.5 text-[10px] text-amber-400 uppercase">
                    Stream mode
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { l: "Críticos", v: counts.critical, c: "text-red-400" },
                  { l: "Warnings", v: counts.warning, c: "text-amber-400" },
                  { l: "Suspeitos", v: counts.suspicious, c: "text-orange-400" },
                  { l: "Clean", v: counts.integrity, c: "text-emerald-400" },
                ].map((s) => (
                  <div key={s.l} className="surface px-3 py-2.5 text-center">
                    <p className={`text-xl font-semibold tabular-nums ${s.c}`}>{s.v}</p>
                    <p className="text-[9px] text-screens-muted uppercase tracking-wider">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-5 md:p-8 space-y-5">
          {mainTab === "overview" && (
            <>
              <section className="surface p-5">
                <h3 className="text-sm font-medium flex items-center gap-2 mb-4">
                  <Monitor className="h-4 w-4 text-screens-muted" /> Sistema
                </h3>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    { label: "PC", value: sys.pcName ?? "—" },
                    { label: "Usuário", value: sys.username ?? "—" },
                    { label: "HWID", value: sys.hwid ? `${sys.hwid.slice(0, 16)}…` : "—" },
                    { label: "IP", value: sys.ip ?? "—" },
                  ].map((f) => (
                    <div key={f.label} className="rounded-lg bg-screens-bg border border-screens-border px-3 py-2.5">
                      <p className="text-[9px] uppercase text-screens-muted">{f.label}</p>
                      <p className="mt-0.5 font-mono text-xs truncate">{f.value}</p>
                    </div>
                  ))}
                </div>
              </section>

              {scan.screenshotUrl && (
                <section className="surface p-5">
                  <h3 className="text-sm font-medium mb-3">Screenshot</h3>
                  <img
                    src={scan.screenshotUrl}
                    alt="Screenshot"
                    className="w-full max-h-80 rounded-lg border border-screens-border object-contain bg-black"
                  />
                </section>
              )}

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setMainTab("detections")}
                  className="surface p-5 text-left hover:bg-screens-card-hover transition group"
                >
                  <p className="text-sm font-medium">Detecções</p>
                  <p className="text-2xl font-semibold mt-1">{detectionTotal}</p>
                  <ChevronRight className="h-4 w-4 text-screens-muted mt-2 group-hover:translate-x-0.5 transition" />
                </button>
                <button
                  type="button"
                  onClick={() => setMainTab("system")}
                  className="surface p-5 text-left hover:bg-screens-card-hover transition group"
                >
                  <p className="text-sm font-medium">Artefatos sistema</p>
                  <p className="text-2xl font-semibold mt-1">{systemTotal}</p>
                  <ChevronRight className="h-4 w-4 text-screens-muted mt-2 group-hover:translate-x-0.5 transition" />
                </button>
              </div>
            </>
          )}

          {mainTab === "detections" && (
            <>
              <div className="flex flex-wrap gap-1">
                {(["critical", "warning", "suspicious", "integrity"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setDetectionTab(t)}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium ${
                      detectionTab === t ? "bg-white text-black" : "text-screens-muted hover:text-white"
                    }`}
                  >
                    {t === "critical" ? "Críticos" : t === "warning" ? "Warnings" : t === "suspicious" ? "Suspeitos" : "Clean"}{" "}
                    ({counts[t === "critical" ? "critical" : t]})
                  </button>
                ))}
              </div>
              {detectionTab === "critical" && (
                <DetectionCards items={scan.detections} total={totals?.detections} variant="critical" empty="Nenhum crítico" />
              )}
              {detectionTab === "warning" && (
                <DetectionCards items={scan.warnings} total={totals?.warnings} variant="warning" empty="Nenhum warning" />
              )}
              {detectionTab === "suspicious" && (
                <DetectionCards items={scan.suspicious} total={totals?.suspicious} variant="suspicious" empty="Nenhum suspeito" />
              )}
              {detectionTab === "integrity" && (
                <DetectionCards items={scan.integrity} total={totals?.integrity} variant="integrity" empty="Nenhum clean" />
              )}
            </>
          )}

          {mainTab === "threats" && (
            <div className="space-y-4">
              <section className="surface p-5">
                <h3 className="text-sm font-medium flex items-center gap-2 mb-3"><Wifi className="h-4 w-4" /> Remote</h3>
                <DetectionCards items={remote} variant="critical" empty="Nenhum remote" />
              </section>
              <section className="surface p-5">
                <h3 className="text-sm font-medium flex items-center gap-2 mb-3"><HardDrive className="h-4 w-4" /> DMA</h3>
                <DetectionCards items={dma} variant="critical" empty="Nenhum DMA" />
              </section>
              <section className="surface p-5">
                <h3 className="text-sm font-medium flex items-center gap-2 mb-3"><Usb className="h-4 w-4" /> USB</h3>
                <DetectionCards items={usb} variant="warning" empty="Nenhum USB" />
                {(scan.usbList?.length ?? 0) > 0 && <div className="mt-3"><ListBlock items={scan.usbList} empty="—" /></div>}
              </section>
              <section className="surface p-5">
                <h3 className="text-sm font-medium flex items-center gap-2 mb-3"><Globe className="h-4 w-4" /> Sites</h3>
                {!scan.browserList?.length ? (
                  <p className="text-sm text-screens-muted py-6 text-center">Nenhum site</p>
                ) : (
                  <ul className="space-y-1.5 max-h-96 overflow-y-auto">
                    {(scan.browserList as string[]).map((entry, i) => {
                      const { category, url } = parseSiteEntry(String(entry));
                      return (
                        <li key={i} className="rounded-md border border-screens-border bg-screens-bg px-3 py-2">
                          <span className={`text-[9px] font-bold uppercase ${siteCategoryStyle(category)}`}>{category}</span>
                          <p className="mt-1 font-mono text-[11px] text-screens-muted break-all">{url}</p>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </section>
            </div>
          )}

          {mainTab === "system" && (
            <>
              <div className="flex flex-wrap gap-1">
                {(
                  [
                    ["bam", "BAM", counts.bam],
                    ["bypass", "Bypass", counts.bypass],
                    ["powershell", "PS", counts.powershell],
                    ["prefetch", "Prefetch", counts.prefetch],
                    ["process", "Processos", counts.process],
                    ["recorder", "Gravador", counts.recorder],
                    ["stream", "Stream", 0],
                  ] as const
                ).map(([key, label, count]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSystemTab(key)}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium ${
                      systemTab === key ? "bg-white text-black" : "text-screens-muted"
                    }`}
                  >
                    {label} {count > 0 ? `(${count})` : ""}
                  </button>
                ))}
              </div>
              {systemTab === "bam" && <ListBlock items={scan.bamList} total={totals?.bamList} empty="Vazio" />}
              {systemTab === "bypass" && (
                <ListBlock items={scan.bypassList ?? scan.unsignedList} total={totals?.bypassList} empty="Vazio" variant="bypass" />
              )}
              {systemTab === "powershell" && (
                <ListBlock items={scan.powershellHistory} total={totals?.powershellHistory} empty="Vazio" />
              )}
              {systemTab === "prefetch" && <ListBlock items={scan.prefetchList} total={totals?.prefetchList} empty="Vazio" />}
              {systemTab === "process" && (
                <ListBlock items={scan.processList} total={totals?.processList} empty="Vazio" variant="process" />
              )}
              {systemTab === "recorder" && (
                <ListBlock items={scan.recordingSoftware} total={totals?.recordingSoftware} empty="Vazio" />
              )}
              {systemTab === "stream" && (
                <div className={`rounded-lg border px-6 py-10 text-center font-medium ${
                  scan.streamModeDetected ? "border-amber-500/30 text-amber-400" : "border-emerald-500/30 text-emerald-400"
                }`}>
                  {scan.streamModeDetected ? "STREAM MODE DETECTADO" : "STREAM MODE NÃO DETECTADO"}
                </div>
              )}
            </>
          )}

          {mainTab === "accounts" && (
            <div className="grid gap-4 lg:grid-cols-2">
              <section className="surface p-5">
                <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Shield className="h-4 w-4" /> Discord</h3>
                {scan.discordInfo?.accounts?.length ? (
                  scan.discordInfo.accounts.map((a) => (
                    <div key={a.id} className="rounded-lg border border-screens-border bg-screens-bg p-3 mb-2">
                      <p className="text-sm font-medium">{a.username}</p>
                      <p className="font-mono text-[10px] text-screens-muted mt-1">{a.id}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-screens-muted text-center py-4">Nenhuma conta</p>
                )}
              </section>
              <section className="surface p-5">
                <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><Shield className="h-4 w-4" /> Steam</h3>
                {scan.steamList?.length ? (
                  scan.steamList.map((s) => (
                    <div key={s.steamId} className="rounded-lg border border-screens-border bg-screens-bg p-3 mb-2">
                      <p className="text-sm font-medium">{s.steamName}</p>
                      <p className="font-mono text-[10px] text-screens-muted mt-1">{s.steamId}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-screens-muted text-center py-4">Nenhuma conta</p>
                )}
              </section>
            </div>
          )}

          {mainTab === "logs" && <ListBlock items={scan.adminLogs} total={totals?.adminLogs} empty="Nenhum log" />}
        </div>
      </div>
    </div>
  );
}