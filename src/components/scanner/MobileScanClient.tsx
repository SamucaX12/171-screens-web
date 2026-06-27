"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Activity,
  AlertTriangle,
  Apple,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Cpu,
  Globe,
  HardDrive,
  Info,
  Monitor,
  Network,
  Phone,
  RefreshCw,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Signal,
  Smartphone,
  Wifi,
  WifiOff,
  XCircle,
  Zap,
} from "lucide-react";

type Platform = "ios" | "android";
type ScanState = "idle" | "connecting" | "scanning" | "complete";
type Severity = "critical" | "warning" | "suspicious" | "clean";

interface Detection {
  id: string;
  category: string;
  title: string;
  description: string;
  severity: Severity;
  found: boolean;
}

const IOS_DETECTIONS: Detection[] = [
  { id: "jailbreak", category: "SISTEMA", title: "Jailbreak Detectado", description: "Cydia, Sileo, Zebra ou artefatos de Checkra1n encontrados no dispositivo.", severity: "critical", found: false },
  { id: "mdm", category: "PERFIS", title: "Perfil MDM Suspeito", description: "Certificado ou perfil de configuração não verificado instalado no iPhone.", severity: "critical", found: false },
  { id: "gameguardian_ios", category: "CHEAT", title: "Game Guardian iOS", description: "App de modificação de memória detectado (GameGem, iGameGuardian, Cheat Engine iOS).", severity: "critical", found: false },
  { id: "udid_spoof", category: "IDENTIDADE", title: "UDID / Device ID Spoof", description: "Identificador do dispositivo foi manipulado via Xcon ou similar.", severity: "critical", found: false },
  { id: "testflight_sus", category: "APPS", title: "TestFlight Suspeito", description: "Aplicativos de versão beta via TestFlight com assinatura não confiável.", severity: "warning", found: false },
  { id: "vpn_proxy_ios", category: "REDE", title: "VPN / Proxy App Ativo", description: "Shadowrocket, Surge, Quantumult, NordVPN ou similar detectado e ativo.", severity: "warning", found: false },
  { id: "remote_ios", category: "REMOTE", title: "Acesso Remoto iOS", description: "TeamViewer, AnyDesk ou software de screen mirroring ativo durante sessão.", severity: "critical", found: false },
  { id: "screen_record", category: "GRAVAÇÃO", title: "Screen Recording Ativo", description: "Gravação de tela ativa durante a partida — ReplayKit ou app externo.", severity: "warning", found: false },
  { id: "dns_poison", category: "REDE", title: "DNS Manipulation", description: "Consultas DNS redirecionadas para servidor não oficial. Possível MITM.", severity: "suspicious", found: false },
  { id: "proxy_http", category: "PROXY", title: "Proxy HTTP Configurado", description: "Proxy HTTP ativo nas configurações de Wi-Fi — tráfego interceptado.", severity: "suspicious", found: false },
  { id: "ios_clean_net", category: "REDE", title: "Rede Direta Verificada", description: "Sem proxy ou VPN detectado. Conexão direta com servidores do jogo.", severity: "clean", found: false },
  { id: "ios_clean_app", category: "APPS", title: "Assinaturas Verificadas", description: "Todos os apps verificados pela App Store ou Apple Developer.", severity: "clean", found: false },
];

const ANDROID_DETECTIONS: Detection[] = [
  { id: "root_magisk", category: "ROOT", title: "Root / Magisk Detectado", description: "Magisk, SuperSU, KernelSU ou artefatos de root encontrados no sistema.", severity: "critical", found: false },
  { id: "lsposed", category: "ROOT", title: "Xposed / LSPosed Framework", description: "Framework de hooking detectado — permite modificação de qualquer app.", severity: "critical", found: false },
  { id: "gameguardian", category: "CHEAT", title: "Game Guardian / Parallel Space", description: "App de modificação de memória ou virtualização de apps detectado.", severity: "critical", found: false },
  { id: "device_spoof", category: "IDENTIDADE", title: "Device Props Manipulados", description: "Build.FINGERPRINT, modelo ou fabricante alterados via Magisk module.", severity: "critical", found: false },
  { id: "adb_network", category: "DEV", title: "ADB over Network Ativo", description: "Android Debug Bridge habilitado via Wi-Fi — permite acesso remoto completo.", severity: "critical", found: false },
  { id: "remote_android", category: "REMOTE", title: "Acesso Remoto Android", description: "TeamViewer, AnyDesk, Vysor ou scrcpy detectado ativo na sessão.", severity: "critical", found: false },
  { id: "vpn_proxy_android", category: "REDE", title: "VPN / Proxy App Ativo", description: "Drony, ProxyDroid, Cloak, Shadowsocks ou VPN configurado detectado.", severity: "warning", found: false },
  { id: "sideload", category: "APPS", title: "APK Side-load Suspeito", description: "Aplicativo instalado fora da Play Store com permissões elevadas.", severity: "warning", found: false },
  { id: "dev_options", category: "DEV", title: "Opções de Dev Habilitadas", description: "Opções do desenvolvedor ativas — aumenta superfície de ataque.", severity: "suspicious", found: false },
  { id: "screen_mirror", category: "GRAVAÇÃO", title: "Screen Mirroring / Recording", description: "Gravação ou espelhamento de tela ativo durante a partida.", severity: "warning", found: false },
  { id: "proxy_http_android", category: "PROXY", title: "Proxy HTTP Configurado", description: "Proxy HTTP ativo nas configurações de Wi-Fi — tráfego interceptado.", severity: "suspicious", found: false },
  { id: "android_clean_root", category: "ROOT", title: "Sem Root Detectado", description: "Nenhum artefato de root ou Magisk encontrado no dispositivo.", severity: "clean", found: false },
  { id: "android_clean_net", category: "REDE", title: "Rede Direta Verificada", description: "Sem proxy ou VPN ativo detectado na sessão.", severity: "clean", found: false },
];

const PROXY_HOST = "scan.171screens.com.br";
const PROXY_PORT = "8080";
const PROXY_PORT_SSL = "8443";

const SEV_STYLE: Record<Severity, { border: string; bg: string; bar: string; badge: string; icon: string; label: string }> = {
  critical: { border: "border-red-500/30", bg: "bg-red-500/8", bar: "bg-red-500", badge: "bg-red-500/15 border-red-500/30 text-red-400", icon: "text-red-400", label: "CRÍTICO" },
  warning:  { border: "border-amber-500/30", bg: "bg-amber-500/8", bar: "bg-amber-500", badge: "bg-amber-500/15 border-amber-500/30 text-amber-400", icon: "text-amber-400", label: "WARNING" },
  suspicious: { border: "border-orange-500/30", bg: "bg-orange-500/8", bar: "bg-orange-500", badge: "bg-orange-500/15 border-orange-500/30 text-orange-400", icon: "text-orange-400", label: "SUSPEITO" },
  clean: { border: "border-emerald-500/25", bg: "bg-emerald-500/5", bar: "bg-emerald-500", badge: "bg-emerald-500/10 border-emerald-500/25 text-emerald-400", icon: "text-emerald-400", label: "CLEAN" },
};

const PLATFORM_CFG = {
  ios: {
    name: "iOS",
    label: "iPhone / iPad",
    accent: "text-zinc-100",
    accentBright: "text-white",
    border: "border-zinc-400/30",
    borderStrong: "border-zinc-300/50",
    bg: "bg-zinc-400/8",
    bgStrong: "bg-zinc-300/12",
    dot: "bg-zinc-300",
    glow: "shadow-[0_0_60px_-15px_rgba(228,228,231,0.2)]",
    glowLine: "rgba(228,228,231,0.25)",
    badgeBg: "bg-zinc-800/80",
    scanColor: "#e4e4e7",
    steps: [
      { n: "01", title: "Conecte ao Wi-Fi", desc: "O iPhone e o passador devem estar na mesma rede — ou configure manualmente o proxy." },
      { n: "02", title: "Configurar Proxy", desc: "Vá em Ajustes → Wi-Fi → sua rede → Configurar Proxy → Manual. Insira o host e porta abaixo." },
      { n: "03", title: "Instale o certificado", desc: "Acesse scan.171screens.com.br/cert no Safari para instalar o certificado SSL. Confie em Ajustes → Geral → Sobre → Confiar." },
      { n: "04", title: "Abra o jogo e escaneie", desc: "Inicie a partida com o proxy ativo. Clique em Iniciar Scan — o sistema analisa o tráfego em tempo real." },
    ],
    detections: IOS_DETECTIONS,
    Icon: Apple,
  },
  android: {
    name: "Android",
    label: "Android · Root / ADB",
    accent: "text-emerald-400",
    accentBright: "text-emerald-300",
    border: "border-emerald-500/30",
    borderStrong: "border-emerald-500/55",
    bg: "bg-emerald-500/8",
    bgStrong: "bg-emerald-500/12",
    dot: "bg-emerald-400",
    glow: "shadow-[0_0_60px_-15px_rgba(52,211,153,0.25)]",
    glowLine: "rgba(52,211,153,0.3)",
    badgeBg: "bg-emerald-950/60",
    scanColor: "#34d399",
    steps: [
      { n: "01", title: "Conecte ao Wi-Fi", desc: "O Android e o servidor de scan devem estar na mesma rede, ou configure o proxy manualmente." },
      { n: "02", title: "Configurar Proxy", desc: "Acesse Configurações → Wi-Fi → segure na rede → Modificar rede → Avançado → Proxy Manual. Insira host e porta." },
      { n: "03", title: "Instale o certificado (HTTPS)", desc: "Abra scan.171screens.com.br/cert no Chrome. Baixe e instale o cert em Configurações → Segurança → Instalar certificado." },
      { n: "04", title: "ADB opcional (profundo)", desc: "Para detecção de root/Magisk ativa: adb tcpip 5555 e adb connect <IP> — libera análise do sistema de arquivos." },
      { n: "05", title: "Abra o jogo e escaneie", desc: "Com proxy ativo, inicie a partida e clique em Iniciar Scan. Detecção em tempo real de root, proxy, remote e mais." },
    ],
    detections: ANDROID_DETECTIONS,
    Icon: Cpu,
  },
} as const;

function RiskBadge({ score }: { score: number }) {
  const color = score >= 70 ? "#ef4444" : score >= 40 ? "#f59e0b" : "#34d399";
  const label = score >= 70 ? "ALTO RISCO" : score >= 40 ? "SUSPEITO" : "LIMPO";
  const r = 44;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ filter: `drop-shadow(0 0 12px ${color}55)` }}>
        <svg width="110" height="110" className="-rotate-90">
          <circle cx="55" cy="55" r={r} fill="none" stroke="#1a1a24" strokeWidth="8" />
          <circle cx="55" cy="55" r={r} fill="none" stroke={color + "22"} strokeWidth="8" />
          <circle cx="55" cy="55" r={r} fill="none" stroke={color} strokeWidth="8"
            strokeLinecap="round" strokeDasharray={c} strokeDashoffset={offset}
            className="transition-all duration-1000" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-black tabular-nums" style={{ color }}>{score}</span>
          <span className="text-[8px] uppercase tracking-widest text-screens-muted">risco</span>
        </div>
      </div>
      <span className="mt-1 text-xs font-bold" style={{ color }}>{label}</span>
    </div>
  );
}

function DetectionCard({ d }: { d: Detection }) {
  const [open, setOpen] = useState(false);
  const s = SEV_STYLE[d.severity];
  if (!d.found) return null;
  return (
    <div className={`rounded-xl border ${s.border} ${s.bg} overflow-hidden transition-all`}>
      <button onClick={() => setOpen(!open)} className="flex w-full items-center gap-0 text-left">
        <div className={`w-1 self-stretch shrink-0 ${s.bar}`} />
        <div className="flex-1 flex items-center gap-3 px-4 py-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-0.5">
              <span className={`rounded-md border px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider ${s.badge}`}>
                {s.label}
              </span>
              <span className="text-[9px] text-screens-muted">{d.category}</span>
            </div>
            <p className="font-semibold text-sm">{d.title}</p>
          </div>
          <ChevronDown className={`h-4 w-4 text-screens-muted shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
        </div>
      </button>
      {open && (
        <div className={`px-5 pb-4 pt-1 border-t ${s.border}`}>
          <p className="text-xs text-screens-muted leading-relaxed">{d.description}</p>
        </div>
      )}
    </div>
  );
}

export function MobileScanClient({ platform }: { platform: Platform }) {
  const cfg = PLATFORM_CFG[platform];
  const Icon = cfg.Icon;

  const [state, setState] = useState<ScanState>("idle");
  const [sessionId] = useState(() => Math.random().toString(36).slice(2, 10).toUpperCase());
  const [progress, setProgress] = useState(0);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [detections, setDetections] = useState<Detection[]>(cfg.detections.map(d => ({ ...d, found: false })));
  const [scanLog, setScanLog] = useState<string[]>([]);
  const [riskScore, setRiskScore] = useState(0);
  const [connected, setConnected] = useState(false);
  const [expandedStep, setExpandedStep] = useState<number | null>(0);

  const addLog = useCallback((msg: string) => {
    setScanLog(prev => [`[${new Date().toLocaleTimeString("pt-BR")}] ${msg}`, ...prev].slice(0, 20));
  }, []);

  // Fake scan simulation
  useEffect(() => {
    if (state !== "scanning") return;
    let tick = 0;
    const interval = setInterval(() => {
      tick++;
      setElapsedSec(tick);
      setProgress(Math.min(100, Math.floor((tick / 28) * 100)));

      if (tick === 2) { setConnected(true); addLog("Dispositivo conectado via proxy Wi-Fi"); }
      if (tick === 3) addLog(`Interceptando tráfego HTTPS — session ${sessionId}`);
      if (tick === 5) addLog("Analisando handshake TLS e certificados...");
      if (tick === 7) addLog("Escaneando configurações de rede do dispositivo...");
      if (tick === 9) {
        const key = platform === "ios" ? "proxy_http" : "proxy_http_android";
        setDetections(prev => prev.map(d => d.id === key ? { ...d, found: true } : d));
        addLog("⚠ Proxy HTTP detectado nas configurações de Wi-Fi");
        setRiskScore(s => Math.min(100, s + 18));
      }
      if (tick === 11) addLog("Verificando apps instalados e assinaturas...");
      if (tick === 13) {
        const key = platform === "ios" ? "vpn_proxy_ios" : "vpn_proxy_android";
        setDetections(prev => prev.map(d => d.id === key ? { ...d, found: true } : d));
        addLog("⚠ App de VPN/Proxy ativo detectado");
        setRiskScore(s => Math.min(100, s + 12));
      }
      if (tick === 15) addLog("Verificando acesso remoto e screen mirroring...");
      if (tick === 17) {
        const key = platform === "ios" ? "screen_record" : "screen_mirror";
        setDetections(prev => prev.map(d => d.id === key ? { ...d, found: true } : d));
        addLog("⚠ Gravação de tela ativa durante a sessão");
        setRiskScore(s => Math.min(100, s + 10));
      }
      if (tick === 19) addLog(`Verificando integridade do sistema ${cfg.name}...`);
      if (tick === 21) {
        if (platform === "android") {
          setDetections(prev => prev.map(d => d.id === "dev_options" ? { ...d, found: true } : d));
          addLog("⚠ Opções de desenvolvedor habilitadas");
          setRiskScore(s => Math.min(100, s + 8));
        }
      }
      if (tick === 23) {
        const key = platform === "ios" ? "ios_clean_net" : "android_clean_root";
        setDetections(prev => prev.map(d => d.id === key ? { ...d, found: true } : d));
        addLog("✓ Verificação de sistema base concluída");
      }
      if (tick === 25) addLog("Gerando relatório de detecções...");
      if (tick === 27) {
        const key = platform === "ios" ? "ios_clean_app" : "android_clean_net";
        setDetections(prev => prev.map(d => d.id === key ? { ...d, found: true } : d));
        addLog("Análise completa — gerando veredito final");
      }
      if (tick >= 28) {
        clearInterval(interval);
        setState("complete");
        addLog("✓ Scan concluído com sucesso");
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [state, addLog, sessionId, platform, cfg.name]);

  const foundDetections = detections.filter(d => d.found && d.severity !== "clean");
  const foundClean = detections.filter(d => d.found && d.severity === "clean");
  const criticals = foundDetections.filter(d => d.severity === "critical").length;
  const warnings  = foundDetections.filter(d => d.severity === "warning").length;
  const suspicious = foundDetections.filter(d => d.severity === "suspicious").length;

  return (
    <div className="min-h-full bg-screens-bg">

      {/* ── TOP HEADER ── */}
      <div className={`border-b border-screens-border bg-screens-bg-elevated`}
        style={{ boxShadow: `0 1px 0 0 ${cfg.glowLine}` }}>
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Platform badge */}
            <div className="flex items-center gap-3">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border-2 ${cfg.borderStrong} ${cfg.bg}`}
                style={{ boxShadow: `0 0 24px -6px ${cfg.glowLine}` }}>
                <Icon className={`h-6 w-6 ${cfg.accent}`} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className={`text-lg font-black ${cfg.accentBright}`}>Scan {cfg.name}</h1>
                  <span className={`rounded-full border px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest ${cfg.border} ${cfg.bg} ${cfg.accent}`}>
                    {cfg.label}
                  </span>
                </div>
                <p className="text-xs text-screens-muted font-mono">
                  Sessão: <span className={cfg.accent}>{sessionId}</span>
                </p>
              </div>
            </div>

            {/* Status + action */}
            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold ${
                state === "complete" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400" :
                state === "scanning" ? `${cfg.border} ${cfg.bg} ${cfg.accent}` :
                "border-screens-border text-screens-muted"
              }`}>
                <span className={`h-2 w-2 rounded-full ${
                  state === "complete" ? "bg-emerald-400" :
                  state === "scanning" ? `${cfg.dot} animate-pulse` :
                  "bg-zinc-600"
                }`} />
                {state === "idle" ? "Aguardando" :
                 state === "connecting" ? "Conectando…" :
                 state === "scanning" ? `Analisando ${progress}%` :
                 "Scan Completo"}
              </div>

              {(state === "idle" || state === "complete") && (
                <button
                  onClick={() => {
                    setDetections(cfg.detections.map(d => ({ ...d, found: false })));
                    setProgress(0); setElapsedSec(0); setRiskScore(0);
                    setScanLog([]); setConnected(false);
                    setState("scanning");
                  }}
                  className={`flex items-center gap-2 rounded-xl border-2 ${cfg.borderStrong} ${cfg.bg} px-5 py-2.5 text-sm font-bold ${cfg.accent} hover:opacity-90 transition`}
                  style={{ boxShadow: `0 0 20px -6px ${cfg.glowLine}` }}
                >
                  {state === "complete" ? <RefreshCw className="h-4 w-4" /> : <Zap className="h-4 w-4" />}
                  {state === "complete" ? "Novo scan" : "Iniciar Scan"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">

          {/* ── LEFT — Main area ── */}
          <div className="space-y-5 min-w-0">

            {/* Proxy config card */}
            <div className={`rounded-2xl border-2 ${cfg.border} ${cfg.bg} overflow-hidden`}>
              <div className={`flex items-center justify-between border-b ${cfg.border} px-5 py-4`}>
                <div className="flex items-center gap-2">
                  <Network className={`h-4 w-4 ${cfg.accent}`} />
                  <span className="font-bold text-sm">Configuração do Passador</span>
                </div>
                <div className={`flex items-center gap-1.5 rounded-lg border ${cfg.border} ${connected ? "bg-emerald-500/10 border-emerald-500/30" : cfg.bg} px-2.5 py-1 text-[10px] font-bold ${connected ? "text-emerald-400" : cfg.accent}`}>
                  {connected ? <Signal className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
                  {connected ? "Conectado" : "Aguardando"}
                </div>
              </div>

              <div className="p-5">
                {/* Proxy details */}
                <div className="grid sm:grid-cols-3 gap-3 mb-5">
                  {[
                    { l: "Proxy Host", v: PROXY_HOST, mono: true },
                    { l: "Porta HTTP", v: PROXY_PORT, mono: true },
                    { l: "Porta HTTPS", v: PROXY_PORT_SSL, mono: true },
                  ].map(f => (
                    <div key={f.l} className={`rounded-xl border ${cfg.border} bg-screens-bg/60 px-4 py-3`}>
                      <p className="text-[9px] uppercase tracking-wider text-screens-muted mb-1">{f.l}</p>
                      <p className={`${f.mono ? "font-mono" : ""} text-sm font-bold ${cfg.accent}`}>{f.v}</p>
                    </div>
                  ))}
                </div>

                {/* Steps accordion */}
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-screens-muted mb-3">
                    Guia de configuração
                  </p>
                  {cfg.steps.map((step, i) => {
                    const open = expandedStep === i;
                    return (
                      <div key={i} className={`rounded-xl border transition-colors ${open ? `${cfg.border} ${cfg.bg}` : "border-screens-border hover:border-screens-border/80"}`}>
                        <button onClick={() => setExpandedStep(open ? null : i)}
                          className="flex w-full items-center gap-3 px-4 py-3 text-left">
                          <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border font-mono text-[11px] font-bold transition-colors ${open ? `${cfg.border} ${cfg.bg} ${cfg.accent}` : "border-screens-border text-screens-muted"}`}>
                            {step.n}
                          </span>
                          <span className="flex-1 text-sm font-semibold">{step.title}</span>
                          <ChevronDown className={`h-4 w-4 text-screens-muted transition-transform ${open ? "rotate-180" : ""}`} />
                        </button>
                        {open && (
                          <div className={`border-t ${cfg.border} px-4 pb-4 pt-3`}>
                            <p className="text-xs text-screens-muted leading-relaxed">{step.desc}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Scan progress / results */}
            {(state === "scanning" || state === "complete") && (
              <div className="rounded-2xl border border-screens-border bg-screens-card/60 overflow-hidden">
                {/* Progress bar */}
                <div className="border-b border-screens-border px-5 py-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-screens-muted uppercase tracking-wider">Progresso do scan</span>
                    <span className={`font-mono text-sm font-bold ${cfg.accent}`}>{progress}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-screens-border overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500`}
                      style={{
                        width: `${progress}%`,
                        background: `linear-gradient(90deg, ${cfg.scanColor}99, ${cfg.scanColor})`,
                        boxShadow: `0 0 12px -2px ${cfg.scanColor}88`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-[9px] text-screens-muted">
                    <span>Conexão → Tráfego → Apps → Sistema → Resultado</span>
                    <span>{elapsedSec}s</span>
                  </div>
                </div>

                {/* Detection counts */}
                {state === "complete" && (
                  <div className="border-b border-screens-border px-5 py-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { l: "Críticos", v: criticals, c: "text-red-400", bg: "bg-red-500/10 border-red-500/25" },
                        { l: "Warnings",  v: warnings,  c: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/25" },
                        { l: "Suspeitos", v: suspicious, c: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/25" },
                        { l: "Clean",     v: foundClean.length, c: "text-emerald-400", bg: "bg-emerald-500/8 border-emerald-500/20" },
                      ].map(s => (
                        <div key={s.l} className={`rounded-xl border ${s.bg} p-3 text-center`}>
                          <p className={`text-2xl font-black ${s.c}`}>{s.v}</p>
                          <p className="text-[9px] text-screens-muted uppercase tracking-wider mt-0.5">{s.l}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Detection list */}
                <div className="p-5 space-y-2.5">
                  {state === "scanning" && foundDetections.length === 0 && (
                    <div className="text-center py-8">
                      <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border-2 ${cfg.border} ${cfg.bg} mb-3`}>
                        <Activity className={`h-6 w-6 ${cfg.accent} animate-pulse`} />
                      </div>
                      <p className="text-sm text-screens-muted">Analisando tráfego em tempo real…</p>
                    </div>
                  )}
                  {foundDetections.map(d => <DetectionCard key={d.id} d={d} />)}
                  {foundClean.length > 0 && (
                    <div className="pt-2">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400/70 mb-2">Verificações limpas</p>
                      {foundClean.map(d => <DetectionCard key={d.id} d={d} />)}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Idle state */}
            {state === "idle" && (
              <div className="rounded-2xl border border-dashed border-screens-border p-12 text-center">
                <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl border-2 ${cfg.border} ${cfg.bg} mb-4`}
                  style={{ boxShadow: `0 0 40px -10px ${cfg.glowLine}` }}>
                  <Smartphone className={`h-8 w-8 ${cfg.accent}`} />
                </div>
                <h3 className="font-bold text-base mb-2">Pronto para escanear</h3>
                <p className="text-sm text-screens-muted max-w-sm mx-auto leading-relaxed">
                  Configure o proxy no dispositivo {cfg.name} e clique em{" "}
                  <span className={`font-bold ${cfg.accent}`}>Iniciar Scan</span>.
                </p>
              </div>
            )}
          </div>

          {/* ── RIGHT — Sidebar ── */}
          <div className="space-y-5">

            {/* Risk score */}
            {(state === "scanning" || state === "complete") && (
              <div className={`rounded-2xl border-2 ${cfg.border} ${cfg.bg} p-5 text-center`}
                style={{ boxShadow: `0 0 40px -10px ${cfg.glowLine}` }}>
                <p className="text-[10px] font-bold uppercase tracking-widest text-screens-muted mb-4">Risco atual</p>
                <div className="flex justify-center">
                  <RiskBadge score={riskScore} />
                </div>
                {state === "complete" && (
                  <div className={`mt-4 rounded-xl border ${
                    riskScore >= 70 ? "border-red-500/30 bg-red-500/10 text-red-400" :
                    riskScore >= 40 ? "border-amber-500/30 bg-amber-500/10 text-amber-400" :
                    "border-emerald-500/25 bg-emerald-500/8 text-emerald-400"
                  } px-3 py-2 text-xs font-bold uppercase tracking-wider text-center`}>
                    {riskScore >= 70 ? "⚠ Suspeito — Cheater provável" :
                     riskScore >= 40 ? "⚠ Atenção — Verificar manualmente" :
                     "✓ Limpo — Sem ameaças graves"}
                  </div>
                )}
              </div>
            )}

            {/* Live terminal log */}
            <div className="rounded-2xl border border-screens-border bg-screens-card/50 overflow-hidden">
              <div className="flex items-center gap-2 border-b border-screens-border px-4 py-3 bg-screens-bg/60">
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-500/60" />
                  <span className="h-2 w-2 rounded-full bg-amber-500/60" />
                  <span className="h-2 w-2 rounded-full bg-emerald-500/60" />
                </div>
                <span className="font-mono text-[10px] text-screens-muted flex-1 text-center">scan-log — {sessionId}</span>
                {state === "scanning" && (
                  <span className={`flex items-center gap-1 text-[9px] ${cfg.accent} font-bold`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot} animate-pulse`} />
                    LIVE
                  </span>
                )}
              </div>
              <div className="h-56 overflow-y-auto p-4 space-y-1.5 font-mono text-[10px]">
                {scanLog.length === 0 ? (
                  <p className="text-screens-muted text-center py-6">Aguardando início do scan…</p>
                ) : (
                  scanLog.map((line, i) => (
                    <p key={i} className={
                      line.includes("⚠") ? "text-amber-400/90" :
                      line.includes("✓") ? "text-emerald-400/90" :
                      "text-screens-muted"
                    }>{line}</p>
                  ))
                )}
              </div>
            </div>

            {/* Detection categories overview */}
            <div className="rounded-2xl border border-screens-border bg-screens-card/40 p-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-screens-muted mb-4">O que é detectado</p>
              <div className="space-y-2">
                {[
                  { icon: Globe, label: "Proxy / VPN", desc: "HTTP proxy, VPN ativo, MITM" },
                  { icon: Monitor, label: "Acesso Remoto", desc: "TeamViewer, AnyDesk, mirroring" },
                  { icon: Shield, label: "Bypass de Sistema", desc: platform === "ios" ? "Jailbreak, MDM, UDID spoof" : "Root, Magisk, LSPosed" },
                  { icon: Activity, label: "Screen Recording", desc: "Gravação ou espelhamento ativo" },
                  { icon: HardDrive, label: "Apps Suspeitos", desc: platform === "ios" ? "TestFlight, iPA não assinado" : "APK side-load, Game Guardian" },
                  { icon: Network, label: "Tráfego de Rede", desc: "DNS, TLS, handshake, pacotes" },
                ].map(item => {
                  const ItemIcon = item.icon;
                  return (
                    <div key={item.label} className="flex items-start gap-3 py-1">
                      <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border ${cfg.border} ${cfg.bg}`}>
                        <ItemIcon className={`h-3.5 w-3.5 ${cfg.accent}`} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold">{item.label}</p>
                        <p className="text-[10px] text-screens-muted">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Info box */}
            <div className="rounded-xl border border-screens-border bg-screens-bg/40 p-4">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-screens-muted shrink-0 mt-0.5" />
                <p className="text-[11px] text-screens-muted leading-relaxed">
                  O scan mobile analisa o tráfego via passador proxy. O certificado SSL precisa ser instalado no dispositivo para interceptar conexões HTTPS.
                  Dados do scan ficam disponíveis por 72h.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
