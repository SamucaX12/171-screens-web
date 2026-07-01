"use client";

import { useState, useEffect } from "react";
import {
  BookOpen,
  ChevronDown,
  Crosshair,
  GraduationCap,
  MessageCircle,
  Scan,
  Shield,
  Sparkles,
  Zap,
  Bot,
  Clock,
  Check,
  Smartphone,
  Terminal,
  ArrowRight,
  Users,
  Briefcase,
  Building2,
  Activity,
  ChevronRight,
  Target,
  Layers,
  Award,
  Wrench,
  Star,
  ExternalLink,
  FileSearch,
  Network,
  Cpu,
  Globe,
} from "lucide-react";
import {
  DISCORD_URL,
  sysmonEvents,
  tiers,
  tools,
  type TierId,
} from "@/lib/course-data";
import { courseProducts, mobileCourseProduct, scannerProducts, upcomingBots } from "@/lib/products";
import { TIER_ORDER, TIER_THEME } from "@/lib/tier-theme";
import { getLessonCounts } from "@/lib/lessons";
import { BOOSTER_LESSON_COUNT } from "@/lib/booster-lessons";
import MobileCourseSection from "@/components/MobileCourseSection";
import { BrandLogo } from "@/components/BrandLogo";
import { siteConfig } from "@/lib/site-config";

function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

const counts = getLessonCounts();

const services = [
  {
    icon: FileSearch,
    title: "Telagem Forense",
    description: "Análise profissional de screen share com relatório completo. Detecção de cheat, bypass, DMA, remote e UEFI.",
    accent: "text-green-400",
    border: "border-green-500/20",
    bg: "bg-green-500/5",
    tag: "Forense",
  },
  {
    icon: Cpu,
    title: "Setup de Scanner",
    description: "Implementação completa do Deep Screen Share para o seu servidor. Configuração de pins, GUI personalizada e enterprise.",
    accent: "text-amber-400",
    border: "border-amber-500/20",
    bg: "bg-amber-500/5",
    tag: "Scanner",
  },
  {
    icon: Users,
    title: "Treinamento de Staff",
    description: "Capacitação da sua equipe de teladores do zero ao avançado. Metodologia Deep Screen Share aplicada ao seu contexto.",
    accent: "text-teal-400",
    border: "border-teal-500/20",
    bg: "bg-teal-500/5",
    tag: "Educação",
  },
  {
    icon: Network,
    title: "Consultoria Anti-cheat",
    description: "Estratégia personalizada de detecção para o seu jogo ou plataforma. Fluxo de processo, ferramentas e workflow.",
    accent: "text-lime-400",
    border: "border-lime-500/20",
    bg: "bg-lime-500/5",
    tag: "Consultoria",
  },
  {
    icon: Globe,
    title: "Scan Mobile",
    description: "Análise forense de dispositivos mobile via passador web. iOS e Android com resultado completo em tempo real.",
    accent: "text-emerald-400",
    border: "border-emerald-500/20",
    bg: "bg-emerald-500/5",
    tag: "Mobile",
  },
  {
    icon: Wrench,
    title: "Integração Enterprise",
    description: "Deploy do scanner para organizações com múltiplos operadores, strings compartilhadas e ImGui personalizado.",
    accent: "text-green-300",
    border: "border-green-500/20",
    bg: "bg-green-500/5",
    tag: "Enterprise",
  },
];

const teamPlans = [
  {
    name: "Servidor",
    icon: Shield,
    price: "Consulte",
    accent: "text-teal-400",
    border: "border-teal-500/30",
    bg: "bg-teal-500/5",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(0,255,200,0.3)]",
    features: [
      "Scanner configurado pro seu servidor",
      "Até 5 operadores enterprise",
      "GUI com identidade visual própria",
      "Treinamento básico incluso",
      "Suporte prioritário via Discord",
    ],
  },
  {
    name: "Organização",
    icon: Building2,
    price: "Consulte",
    accent: "text-green-400",
    border: "border-green-500/30",
    bg: "bg-green-500/5",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(0,255,136,0.3)]",
    featured: true,
    features: [
      "Tudo do plano Servidor",
      "Treinamento completo da equipe",
      "Curso Deep licença para staff",
      "Scanner Mobile configurado",
      "Consultoria anti-cheat mensal",
      "SLA com resposta garantida",
    ],
  },
  {
    name: "Esports",
    icon: Award,
    price: "Consulte",
    accent: "text-lime-400",
    border: "border-lime-500/30",
    bg: "bg-lime-500/5",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(168,255,62,0.3)]",
    features: [
      "Tudo do plano Organização",
      "Relatório por torneio/evento",
      "Análise forense pós-ban",
      "Integração com plataforma própria",
      "Acesso Tier 3 para todos",
    ],
  },
];

export default function CourseSite({ loggedIn = false }: { loggedIn?: boolean }) {
  const [activeTier, setActiveTier] = useState<TierId>("tier1");
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [priceTab, setPriceTab] = useState<"curso" | "mobile" | "scanner">("curso");

  const tier = tiers.find((t) => t.id === activeTier)!;
  const theme = TIER_THEME[activeTier];

  const [clock, setClock] = useState("");
  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Global ambient */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-screens-bg" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-green-600/6 blur-[120px] rounded-full" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-teal-600/4 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-600/4 blur-[100px] rounded-full" />
      </div>

      {/* ─── HEADER ─── */}
      <header className="sticky top-0 z-50 border-b border-screens-border/60 bg-screens-bg/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          {/* Logo */}
          <a href="/" className="group block">
            <BrandLogo />
          </a>

          {/* Nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {[
              { href: "#conteudo", label: "Curso", color: "hover:text-green-300" },
              { href: "#curso-mobile", label: "Mobile", color: "hover:text-teal-300" },
              { href: "#scanner", label: "Scan", color: "hover:text-amber-300" },
              { href: "#bots", label: "Bots", color: "hover:text-lime-300" },
              { href: "#servicos", label: "Serviços", color: "hover:text-green-300" },
              { href: "#contratar", label: "Contratar", color: "hover:text-teal-300" },
              { href: "#precos", label: "Preços", color: "hover:text-white" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-xs font-medium text-screens-muted transition ${item.color}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center gap-1.5 rounded-lg border border-green-500/20 bg-green-500/5 px-2.5 py-1.5 text-[9px] font-mono text-green-400">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              SECURE
            </div>
            {loggedIn ? (
              <a href="/dashboard" className="btn-primary !py-2 !px-4 text-xs">
                <GraduationCap className="h-3.5 w-3.5" />
                Dashboard
              </a>
            ) : (
              <a href="/login" className="btn-secondary !py-2 !px-4 text-xs hidden sm:inline-flex">
                Entrar
              </a>
            )}
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#5865F2] px-3 py-2 text-xs font-semibold hover:bg-[#4752C4] transition"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Discord
            </a>
          </div>
        </div>
      </header>

      {/* ─── SYSTEM STATUS BAR ─── */}
      <div className="border-b border-white/[0.03] bg-screens-bg/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5">
          <div className="flex items-center gap-5 overflow-x-auto">
            {[
              { label: "SESSION CONNECTED", color: "text-green-400", dot: "bg-green-400" },
              { label: "SCAN ENGINE READY", color: "text-teal-400", dot: "bg-teal-400" },
              { label: "SECURITY LAYER ACTIVE", color: "text-lime-400", dot: "bg-lime-400" },
            ].map((s) => (
              <span key={s.label} className={`flex items-center gap-1.5 text-[9px] font-mono ${s.color} shrink-0`}>
                <span className={`h-1.5 w-1.5 rounded-full ${s.dot} animate-pulse`} />
                {s.label}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3 shrink-0 ml-4">
            {clock && (
              <span className="hidden sm:flex items-center gap-1.5 text-[9px] font-mono text-screens-muted">
                <Clock className="h-3 w-3" />
                {clock}
              </span>
            )}
            <span className="hidden md:block text-[9px] font-mono text-screens-muted/50">v3.0.0</span>
          </div>
        </div>
      </div>

      {/* ─── HERO ─── */}
      <section className="relative border-b border-screens-border overflow-hidden">
        <div className="pointer-events-none absolute inset-0 cyber-grid opacity-20" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-screens-bg/80" />

        <div className="mx-auto max-w-7xl px-4 pt-20 pb-16 md:pt-28 md:pb-24 relative">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            {/* Left */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1.5">
                <span className="flex items-center gap-1.5 text-[9px] font-mono text-green-400 shrink-0">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                  ONLINE
                </span>
                <span className="h-3 w-px bg-green-500/30" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-green-300">
                  Telagem Forense · Scanner · Mobile
                </span>
              </div>

              <h1 className="text-4xl font-black tracking-tight leading-[1.1] md:text-6xl">
                <span className="bg-gradient-to-r from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent">
                  Aprende telagem.
                </span>
                <br />
                <span className="bg-gradient-to-r from-green-300 via-teal-200 to-lime-300 bg-clip-text text-transparent">
                  Roda scan.
                </span>
              </h1>

              <p className="text-screens-muted leading-relaxed max-w-lg text-base">
                Curso do zero ao telador profissional. Scanner Deep Screen Share com pins, results e enterprise.
                Agora com <span className="text-teal-300 font-semibold">Curso Mobile</span> completo.
              </p>

              <p className="text-xs text-screens-muted font-mono border-l-2 border-green-500/40 pl-3">
                Booster — {BOOSTER_LESSON_COUNT} aulas grátis no Tier I
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                {loggedIn ? (
                  <a href="/dashboard" className="btn-primary gap-2 !py-3 !px-6">
                    <Activity className="h-4 w-4" />
                    Abrir Dashboard
                  </a>
                ) : (
                  <a href="/login" className="btn-primary gap-2 !py-3 !px-6">
                    <Zap className="h-4 w-4" />
                    Entrar no curso
                  </a>
                )}
                <a href="#curso-mobile" className="btn-secondary !border-teal-500/30 !text-teal-200 hover:!border-teal-400/50 !py-3 !px-5 gap-2">
                  <Smartphone className="h-4 w-4" />
                  Curso Mobile
                </a>
                <a href="#precos" className="btn-secondary !py-3 !px-5 gap-2">
                  <Scan className="h-4 w-4" />
                  Ver planos
                </a>
              </div>
              {loggedIn && (
                <div className="flex flex-wrap gap-2 pt-1">
                  <a href="/dashboard/scanner/pins" className="inline-flex items-center gap-1.5 rounded-lg border border-screens-border/60 bg-screens-card/30 px-3 py-1.5 text-[10px] font-mono text-screens-muted hover:text-white hover:border-green-500/30 transition">
                    <Scan className="h-3 w-3" />
                    Start Scan
                  </a>
                  <a href="/dashboard/scanner/results" className="inline-flex items-center gap-1.5 rounded-lg border border-screens-border/60 bg-screens-card/30 px-3 py-1.5 text-[10px] font-mono text-screens-muted hover:text-white hover:border-green-500/30 transition">
                    <FileSearch className="h-3 w-3" />
                    View Results
                  </a>
                  <a href="/dashboard/curso" className="inline-flex items-center gap-1.5 rounded-lg border border-screens-border/60 bg-screens-card/30 px-3 py-1.5 text-[10px] font-mono text-screens-muted hover:text-white hover:border-green-500/30 transition">
                    <BookOpen className="h-3 w-3" />
                    Curso
                  </a>
                </div>
              )}
            </div>

            {/* Right — Ops Center Panel */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/15 via-transparent to-teal-500/10 blur-2xl rounded-3xl" />
              <div className="relative rounded-2xl border border-white/[0.07] bg-screens-card/80 backdrop-blur-xl overflow-hidden">
                {/* Window chrome */}
                <div className="flex items-center gap-2 border-b border-screens-border/60 px-4 py-2.5 bg-screens-bg/60">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                  </div>
                  <span className="flex-1 text-center font-mono text-[10px] text-screens-muted">
                    dss-scanner · ops-center
                  </span>
                  <span className="flex items-center gap-1 text-[9px] text-green-400 font-mono">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                    ONLINE
                  </span>
                </div>

                {/* Live system metrics row */}
                <div className="grid grid-cols-3 divide-x divide-screens-border/40 border-b border-screens-border/40 bg-screens-bg/30">
                  {[
                    { label: "SCANNER", value: "READY", color: "text-green-400" },
                    { label: "SESSIONS", value: "17", color: "text-teal-400" },
                    { label: "FLAGS", value: "3", color: "text-red-400" },
                  ].map((m) => (
                    <div key={m.label} className="px-3 py-2 text-center">
                      <p className="text-[8px] font-mono text-screens-muted/60 uppercase tracking-wider">{m.label}</p>
                      <p className={`text-[11px] font-black font-mono ${m.color} mt-0.5`}>{m.value}</p>
                    </div>
                  ))}
                </div>

                {/* Active scan result */}
                <div className="p-4 font-mono text-xs space-y-2.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[8px] text-screens-muted/70 uppercase tracking-wider">ACTIVE SCAN</span>
                    <span className="text-green-300 font-bold tracking-widest text-[11px]">K7H2M9XP</span>
                  </div>
                  <div className="h-px bg-screens-border/50" />

                  {[
                    { label: "Prefetch", value: "12 entries", color: "text-green-400", status: "ok" },
                    { label: "Bypass List", value: "3 detected", color: "text-red-400", status: "alert" },
                    { label: "Sysmon Ev.10", value: "OpenProcess", color: "text-amber-400", status: "warn" },
                    { label: "Remote SW", value: "AnyDesk [OFF]", color: "text-orange-400", status: "warn" },
                    { label: "HWID", value: "A1B2C3D4…", color: "text-screens-muted", status: "ok" },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between gap-3 text-[10px]">
                      <span className="text-screens-muted w-24 shrink-0">{row.label}</span>
                      <span className={`${row.color} font-medium flex-1 text-right`}>{row.value}</span>
                      <span className={`text-[8px] uppercase font-bold w-10 text-right ${
                        row.status === "alert" ? "text-red-400" : row.status === "warn" ? "text-amber-400" : "text-green-400/40"
                      }`}>
                        {row.status === "alert" ? "ALRT" : row.status === "warn" ? "WARN" : "—"}
                      </span>
                    </div>
                  ))}

                  <div className="h-px bg-screens-border/50" />
                  <div className="flex items-center justify-between">
                    <span className="text-screens-muted text-[9px] font-mono">RISK SCORE</span>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-20 rounded-full bg-screens-border overflow-hidden">
                        <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-amber-500 to-red-500" />
                      </div>
                      <span className="text-red-400 font-black text-[11px] font-mono">72</span>
                    </div>
                  </div>
                  <div className="rounded-lg border border-red-500/30 bg-red-500/8 px-3 py-1.5 text-[9px] text-red-400 font-bold uppercase tracking-wider text-center font-mono">
                    ⚠ SUSPEITO — BYPASS GENÉRICO
                  </div>
                </div>

                {/* Recent activity log */}
                <div className="border-t border-screens-border/40 bg-screens-bg/50 px-4 py-3">
                  <p className="text-[8px] font-mono text-screens-muted/50 uppercase tracking-wider mb-2">Recent Activity</p>
                  <div className="space-y-1.5">
                    {[
                      { time: "14:32:07", pin: "K7H2M9XP", msg: "BYPASS DETECTED", color: "text-red-400" },
                      { time: "14:28:45", pin: "F3J9K2ZX", msg: "CLEAN", color: "text-green-400" },
                      { time: "14:21:13", pin: "R5M8Q1YP", msg: "RISK 58 · WARN", color: "text-amber-400" },
                    ].map((entry, i) => (
                      <div key={i} className="flex items-center gap-2 text-[9px] font-mono">
                        <span className="text-screens-muted/50 shrink-0 w-[50px]">{entry.time}</span>
                        <span className="text-screens-muted shrink-0">{entry.pin}</span>
                        <span className={`${entry.color} font-bold ml-auto shrink-0`}>→ {entry.msg}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Operational Metrics */}
          <div className="mt-14 grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-6">
            {[
              { label: "Scans Hoje", value: "47", color: "text-green-300", pulse: true, dot: "bg-green-400" },
              { label: "Operadores", value: "128+", color: "text-teal-300", pulse: false, dot: "bg-teal-400/50" },
              { label: "Flags Ativos", value: "3", color: "text-red-400", pulse: true, dot: "bg-red-400" },
              { label: "Módulos", value: `${counts.total}+`, color: "text-lime-300", pulse: false, dot: "bg-lime-400/50" },
              { label: "Uptime", value: "99.9%", color: "text-green-300", pulse: false, dot: "bg-green-400/50" },
              { label: "SLA Setup", value: "<24h", color: "text-amber-300", pulse: false, dot: "bg-amber-400/50" },
            ].map((s) => (
              <div key={s.label} className="group rounded-xl border border-screens-border/60 bg-screens-card/25 p-3.5 text-center hover:border-green-500/20 transition-all duration-200">
                <div className="flex justify-center mb-1.5">
                  <span className={`h-1.5 w-1.5 rounded-full ${s.dot} ${s.pulse ? "animate-pulse" : ""}`} />
                </div>
                <p className={`text-xl font-black font-mono ${s.color}`}>{s.value}</p>
                <p className="text-[9px] text-screens-muted mt-0.5 uppercase tracking-wider font-mono">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CURSO DEEP ─── */}
      <section id="conteudo" className="relative py-24 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-screens-border bg-screens-card/50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-screens-muted mb-4">
              <BookOpen className="h-3 w-3" />
              Curso Deep
            </div>
            <h2 className="text-3xl font-black md:text-5xl">
              <span className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                Conteúdo do curso
              </span>
            </h2>
            <p className="mt-4 text-screens-muted max-w-2xl mx-auto leading-relaxed">
              {counts.total} aulas em vídeo e texto — imagens e vídeos em cada módulo.
              Três tiers do básico ao privado. Acesso vitalício.
            </p>
          </div>

          {/* Tier indicator badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {TIER_ORDER.map((id) => {
              const th = TIER_THEME[id];
              return (
                <div key={id} className={`flex items-center gap-2 rounded-full border ${th.border} ${th.bg} px-4 py-1.5`}>
                  <span className={`h-2 w-2 rounded-full ${th.dot}`} />
                  <span className={`text-[11px] font-bold ${th.color}`}>{th.short} · {th.name}</span>
                </div>
              );
            })}
          </div>

          {/* Tier selector */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {tiers.map((t) => {
              const th = TIER_THEME[t.id];
              const active = activeTier === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => { setActiveTier(t.id); setExpandedModule(null); }}
                  className={`relative rounded-2xl px-7 py-4 text-sm font-semibold transition-all duration-300 border-2 ${
                    active
                      ? `${th.borderStrong} ${th.bgStrong} ${th.color} shadow-lg`
                      : "border-screens-border bg-screens-card/30 text-screens-muted hover:text-white hover:border-screens-border/80"
                  }`}
                >
                  <span className="flex items-center gap-2 font-bold">
                    <span className={`h-2.5 w-2.5 rounded-full ${th.dot} ${active ? "shadow-lg" : "opacity-50"}`} />
                    {t.label}
                  </span>
                  <span className="text-[11px] opacity-70 block mt-1">{t.badge}</span>
                  {active && (
                    <span className={`absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full ${th.dot} animate-pulse`} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active tier info */}
          <div className={`rounded-2xl border-2 ${theme.borderStrong} ${theme.bg} p-8 mb-8`}>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`rounded-lg border ${theme.border} ${theme.bg} p-2`}>
                    <BookOpen className={`h-5 w-5 ${theme.icon}`} />
                  </div>
                  <div>
                    <span className={`text-xs font-bold uppercase tracking-widest ${theme.color}`}>
                      {tier.label} — {tier.badge}
                    </span>
                    <p className="text-[10px] text-screens-muted">{tier.modules.length} módulos</p>
                  </div>
                </div>
                <p className="text-screens-muted leading-relaxed max-w-2xl">{tier.description}</p>
              </div>
              <div className="text-right shrink-0">
                <p className={`text-5xl font-black ${theme.color}`}>{formatPrice(tier.price)}</p>
                <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer"
                  className={`mt-4 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold ${theme.btn} transition`}>
                  Comprar agora
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
            <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
              {tier.includes.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-screens-muted">
                  <Check className={`h-4 w-4 shrink-0 mt-0.5 ${theme.icon}`} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Modules */}
          <div className="space-y-2">
            {tier.modules.map((mod, i) => {
              const open = expandedModule === mod.id;
              return (
                <div key={mod.id} className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                  open ? `${theme.border} bg-screens-card/60` : "border-screens-border bg-screens-card/30 hover:border-screens-border/80"
                }`}>
                  <button
                    onClick={() => setExpandedModule(open ? null : mod.id)}
                    className="flex w-full items-center gap-4 px-5 py-4 text-left"
                  >
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border font-mono text-xs font-bold ${
                      open ? `${theme.border} ${theme.bg} ${theme.color}` : "border-screens-border text-screens-muted"
                    }`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-sm">{mod.title}</h3>
                        {mod.tool && (
                          <span className={`rounded-md border px-2 py-0.5 text-[9px] font-bold uppercase ${theme.border} ${theme.color} ${theme.bg}`}>
                            {mod.tool}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-screens-muted mt-0.5">{mod.summary}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] text-screens-muted">{mod.topics.length} tópicos</span>
                      <ChevronDown className={`h-4 w-4 text-screens-muted transition-transform ${open ? "rotate-180" : ""}`} />
                    </div>
                  </button>
                  {open && (
                    <div className={`border-t ${theme.border} px-5 py-5 ${theme.bg}`}>
                      <ul className="space-y-2.5 grid sm:grid-cols-2 gap-x-8">
                        {mod.topics.map((topic) => (
                          <li key={topic} className="flex items-start gap-2.5 text-xs text-screens-muted">
                            <ChevronRight className={`h-3 w-3 shrink-0 mt-0.5 ${theme.icon}`} />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Tools grid */}
          <div className="mt-20">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold">Ferramentas que você domina</h3>
              <p className="mt-2 text-screens-muted text-sm max-w-xl mx-auto">
                Cada ferramenta explicada com exemplos práticos, imagens e vídeos nas aulas.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool) => (
                <div key={tool.name} className="group rounded-xl border border-screens-border bg-screens-card/40 p-5 hover:border-green-500/25 hover:bg-screens-card/60 transition-all duration-200">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold">{tool.name}</h4>
                    <span className="rounded-md bg-screens-bg border border-screens-border px-2 py-0.5 text-[9px] text-screens-muted uppercase font-mono">
                      {tool.tag}
                    </span>
                  </div>
                  <p className="text-xs text-screens-muted leading-relaxed">{tool.description}</p>
                  <div className="mt-3 pt-3 border-t border-screens-border">
                    <p className="text-[11px] text-green-400/90">
                      <span className="font-bold text-green-400">Na telagem:</span>{" "}
                      {tool.useCase}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Sysmon events */}
            <div className="mt-8 rounded-xl border border-screens-border bg-screens-card/40 p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-2">
                  <Activity className="h-4 w-4 text-amber-400" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Sysmon — Eventos essenciais</h4>
                  <p className="text-[11px] text-screens-muted">O que cada log significa e quando acusa bypass</p>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {sysmonEvents.map((ev) => (
                  <div key={ev.id} className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
                    <p className="font-mono text-xs font-bold text-amber-400">{ev.id}</p>
                    <p className="font-semibold text-sm mt-2">{ev.title}</p>
                    <p className="text-xs text-screens-muted mt-2 leading-relaxed">{ev.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MOBILE ─── */}
      <MobileCourseSection compact />

      {/* ─── SCANNER ─── */}
      <section id="scanner" className="relative border-y border-screens-border py-24 md:py-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 scan-grid opacity-40" />
        <div className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/5 blur-[150px] rounded-full" />

        <div className="mx-auto max-w-7xl px-4 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-green-300 mb-4">
              <Scan className="h-3 w-3" />
              Deep Screen Share Scanner
            </div>
            <h2 className="text-3xl font-black md:text-5xl">
              <span className="bg-gradient-to-r from-green-300 to-teal-200 bg-clip-text text-transparent">
                Painel do scanner
              </span>
            </h2>
            <p className="mt-4 text-screens-muted max-w-2xl mx-auto leading-relaxed">
              Quem tem plano acessa no dashboard: Pins, Results, Strings, GUI e Enterprise.
              Resultado em tempo real com detecções categorizadas.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-12">
            {[
              { t: "Pins", d: "Gera pin pro jogador digitar no .exe", icon: Target },
              { t: "Results", d: "Relatório completo com todas as detecções", icon: FileSearch },
              { t: "Strings", d: "SHA1, SHA256, DNS, .exe, .dll suspeitas", icon: Terminal },
              { t: "GUI", d: "Cor, nome, frases e logo do ImGui", icon: Layers },
              { t: "Enterprise", d: "Equipe até 5 membros por email", icon: Building2 },
            ].map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.t} className="group rounded-xl border border-green-500/15 bg-green-500/5 p-5 hover:border-green-500/35 hover:bg-green-500/10 transition-all duration-200 text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-green-500/25 bg-green-500/10 mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <Icon className="h-5 w-5 text-green-400" />
                  </div>
                  <p className="font-bold text-sm">{f.t}</p>
                  <p className="mt-1.5 text-[11px] text-screens-muted leading-relaxed">{f.d}</p>
                </div>
              );
            })}
          </div>

          {/* Result preview */}
          <div className="rounded-2xl border border-green-500/20 bg-screens-card/60 overflow-hidden">
            <div className="border-b border-green-500/20 bg-green-500/5 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                </div>
                <span className="font-mono text-[11px] text-green-400/80">result — K7H2M9XP</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-red-400 font-bold uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                Suspeito
              </div>
            </div>
            <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-screens-border">
              {/* Score */}
              <div className="p-6 flex flex-col items-center justify-center">
                <div className="relative">
                  <svg width="100" height="100" className="-rotate-90">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#0e2b16" strokeWidth="8" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="8"
                      strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 40}`} strokeDashoffset={`${2 * Math.PI * 40 * 0.28}`} />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-black text-amber-400">72</span>
                  </div>
                </div>
                <p className="text-sm font-semibold mt-2 text-amber-300">Suspeito</p>
                <p className="text-[10px] text-screens-muted mt-1">Risk Score</p>
              </div>
              {/* Counts */}
              <div className="p-6 grid grid-cols-2 gap-3 content-center">
                {[
                  { l: "Críticos", v: "3", c: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
                  { l: "Warnings", v: "5", c: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
                  { l: "Suspeitos", v: "2", c: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
                  { l: "Clean", v: "8", c: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
                ].map((s) => (
                  <div key={s.l} className={`rounded-lg border ${s.bg} p-3 text-center`}>
                    <p className={`text-2xl font-black ${s.c}`}>{s.v}</p>
                    <p className="text-[9px] text-screens-muted uppercase tracking-wider mt-0.5">{s.l}</p>
                  </div>
                ))}
              </div>
              {/* Top detections */}
              <div className="p-6 space-y-2.5">
                <p className="text-[10px] font-bold uppercase text-screens-muted tracking-wider mb-3">Top Detecções</p>
                {[
                  { t: "Bypass Genérico em BAM", s: "CRÍTICO", c: "text-red-400 border-red-500/30 bg-red-500/10" },
                  { t: "Process Hollowing ev.8", s: "CRÍTICO", c: "text-red-400 border-red-500/30 bg-red-500/10" },
                  { t: "AnyDesk instalado", s: "WARNING", c: "text-amber-400 border-amber-500/30 bg-amber-500/10" },
                  { t: "SHA256 não encontrado", s: "SUSPEITO", c: "text-orange-400 border-orange-500/30 bg-orange-500/10" },
                ].map((d, i) => (
                  <div key={i} className={`rounded-md border ${d.c} px-3 py-2`}>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[11px] font-medium text-zinc-200 truncate">{d.t}</p>
                      <span className={`text-[8px] font-bold uppercase shrink-0 ${d.c.split(" ")[0]}`}>{d.s}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="/login" className="inline-flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 px-6 py-3 text-sm font-semibold text-green-300 hover:bg-green-500/15 transition">
              <Scan className="h-4 w-4" />
              Acessar scanner
            </a>
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-screens-border px-6 py-3 text-sm text-screens-muted hover:text-white hover:border-screens-border/80 transition">
              <MessageCircle className="h-4 w-4" />
              Comprar key scanner
            </a>
          </div>
        </div>
      </section>

      {/* ─── BOTS ─── */}
      <section id="bots" className="py-24 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-lime-500/30 bg-lime-500/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-lime-300 mb-4">
              <Clock className="h-3 w-3" />
              Em breve
            </div>
            <h2 className="text-3xl font-black md:text-4xl">
              <span className="bg-gradient-to-r from-lime-300 to-green-300 bg-clip-text text-transparent">
                Bots de Screen Share
              </span>
            </h2>
            <p className="mt-4 text-screens-muted max-w-xl mx-auto leading-relaxed">
              Automação pro Discord. Fila, chamar telador, ranking e overlay ao vivo.
              Vendido separado — fica de olho.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Bot de Filas SS", desc: "Fila automática de screen share no Discord. Gerencia a ordem de entrada e saída.", icon: Users },
              { name: "Chamar SS", desc: "Chama telador e jogador na hora certa com notificação e log automático.", icon: MessageCircle },
              { name: "Rank SS", desc: "Ranking de teladores com estatísticas de precisão, bans e performance.", icon: Star },
              { name: "Ticker Profissional", desc: "Overlay ao vivo pra stream de telagem com dados em tempo real.", icon: Activity },
            ].map((bot) => {
              const Icon = bot.icon;
              return (
                <div key={bot.name} className="group relative rounded-xl border border-lime-500/15 bg-lime-500/5 p-6 hover:border-lime-500/30 hover:bg-lime-500/8 transition-all duration-200">
                  <span className="absolute right-3 top-3 rounded-full border border-lime-500/30 bg-lime-500/15 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-lime-300">
                    Em breve
                  </span>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-lime-500/25 bg-lime-500/10 mb-4 group-hover:scale-105 transition-transform">
                    <Icon className="h-5 w-5 text-lime-400" />
                  </div>
                  <p className="font-bold pr-14">{bot.name}</p>
                  <p className="mt-2 text-xs text-screens-muted leading-relaxed">{bot.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-lime-500/30 bg-lime-500/10 px-6 py-3 text-sm font-semibold text-lime-300 hover:bg-lime-500/15 transition">
              <MessageCircle className="h-4 w-4" />
              Entrar no Discord para novidades
            </a>
          </div>
        </div>
      </section>

      {/* ─── SERVIÇOS ─── */}
      <section id="servicos" className="relative border-y border-screens-border py-24 md:py-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 cyber-grid opacity-15" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-green-500/4 blur-[150px] rounded-full" />

        <div className="mx-auto max-w-7xl px-4 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-teal-300 mb-4">
              <Wrench className="h-3 w-3" />
              Serviços
            </div>
            <h2 className="text-3xl font-black md:text-5xl">
              <span className="bg-gradient-to-r from-teal-300 to-green-200 bg-clip-text text-transparent">
                O que oferecemos
              </span>
            </h2>
            <p className="mt-4 text-screens-muted max-w-2xl mx-auto leading-relaxed">
              Além do curso e scanner, a Deep Screen Share oferece serviços para servidores, organizações e equipes de esports.
              Implementação completa do ecossistema Deep no seu contexto.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((svc) => {
              const Icon = svc.icon;
              return (
                <div key={svc.title} className={`group rounded-xl border ${svc.border} ${svc.bg} p-6 hover:shadow-lg transition-all duration-200`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl border ${svc.border} bg-screens-bg/50 group-hover:scale-110 transition-transform`}>
                      <Icon className={`h-5 w-5 ${svc.accent}`} />
                    </div>
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${svc.border} ${svc.accent}`}>
                      {svc.tag}
                    </span>
                  </div>
                  <h3 className="font-bold text-base">{svc.title}</h3>
                  <p className="mt-2 text-xs text-screens-muted leading-relaxed">{svc.description}</p>
                  <div className="mt-4 pt-4 border-t border-screens-border/50">
                    <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer"
                      className={`flex items-center gap-1.5 text-xs ${svc.accent} font-semibold hover:opacity-80 transition`}>
                      Consultar <ArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CONTRATAR ─── */}
      <section id="contratar" className="relative py-24 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-green-300 mb-4">
              <Briefcase className="h-3 w-3" />
              Para organizações
            </div>
            <h2 className="text-3xl font-black md:text-5xl">
              <span className="bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                Contratar nossa equipe
              </span>
            </h2>
            <p className="mt-4 text-screens-muted max-w-2xl mx-auto leading-relaxed">
              Implemente o ecossistema Deep Screen Share completo na sua organização.
              Scanner configurado, equipe treinada e suporte contínuo.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-12">
            {teamPlans.map((plan) => {
              const Icon = plan.icon;
              return (
                <div key={plan.name} className={`relative group rounded-2xl border ${plan.border} ${plan.bg} p-7 flex flex-col transition-all duration-300 ${plan.glow} ${
                  plan.featured ? "ring-2 ring-green-500/30 scale-[1.02]" : ""
                }`}>
                  {plan.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-green-500/40 bg-green-500/20 px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-green-300">
                      Mais popular
                    </span>
                  )}
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${plan.border} bg-screens-bg/50 mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`h-6 w-6 ${plan.accent}`} />
                  </div>
                  <h3 className={`font-black text-xl ${plan.accent}`}>{plan.name}</h3>
                  <p className="text-sm text-screens-muted mt-1">Plano {plan.name}</p>
                  <div className={`mt-3 text-2xl font-black ${plan.accent}`}>{plan.price}</div>
                  <ul className="mt-5 flex-1 space-y-2.5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-screens-muted">
                        <Check className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${plan.accent}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={DISCORD_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-6 flex items-center justify-center gap-2 rounded-xl border ${plan.border} bg-screens-bg/40 py-3 text-sm font-semibold ${plan.accent} hover:bg-screens-bg/70 transition`}
                  >
                    <MessageCircle className="h-4 w-4" />
                    Consultar no Discord
                  </a>
                </div>
              );
            })}
          </div>

          {/* Operational Trust Strip */}
          <div className="rounded-2xl border border-screens-border bg-screens-card/30 p-8">
            <p className="text-[9px] font-mono text-screens-muted/50 uppercase tracking-wider text-center mb-6">System Status · Live Metrics</p>
            <div className="grid gap-6 md:grid-cols-4 text-center">
              {[
                { icon: Scan, label: "47 Scans Hoje", desc: "Sistema ativo — monitorado 24h", pulse: true, dot: "bg-teal-400" },
                { icon: Shield, label: "3 Bypasses Flagados", desc: "Detecções em tempo real", pulse: true, dot: "bg-red-400" },
                { icon: Users, label: "128+ Operadores", desc: "Staff certificado pelo método Deep", pulse: false, dot: "bg-green-400" },
                { icon: Zap, label: "< 24h Setup", desc: "Scanner ativo no mesmo dia", pulse: false, dot: "bg-green-400" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex flex-col items-center gap-2">
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-screens-border bg-screens-bg">
                      <Icon className="h-5 w-5 text-screens-muted" />
                      <span className={`absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full ${item.dot} ${item.pulse ? "animate-pulse" : ""}`} />
                    </div>
                    <p className="font-bold text-sm">{item.label}</p>
                    <p className="text-xs text-screens-muted">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── PREÇOS ─── */}
      <section id="precos" className="relative border-t border-screens-border py-24 md:py-28 bg-screens-card/10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black md:text-4xl">Preços</h2>
            <p className="mt-3 text-screens-muted">Curso e scanner são produtos separados — compra via Discord.</p>
          </div>

          {/* Tab selector */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[
              { id: "curso" as const, label: "Curso Deep", icon: GraduationCap },
              { id: "mobile" as const, label: "Curso Mobile", icon: Smartphone },
              { id: "scanner" as const, label: "Scanner", icon: Scan },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = priceTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setPriceTab(tab.id)}
                  className={`flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all ${
                    active
                      ? tab.id === "curso"
                        ? "bg-green-400 text-black shadow-lg shadow-green-500/20"
                        : tab.id === "mobile"
                          ? "bg-gradient-to-r from-teal-500 to-green-500 text-black shadow-[0_0_24px_-6px_rgba(0,255,200,0.4)]"
                          : "bg-amber-400 text-black shadow-lg"
                      : "border border-screens-border text-screens-muted hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Curso pricing */}
          {priceTab === "curso" && (
            <div className="grid gap-6 md:grid-cols-3">
              {courseProducts.map((t) => {
                const th = TIER_THEME[t.id as TierId];
                const featured = t.id === "tier2";
                return (
                  <div key={t.id} className={`flex flex-col rounded-2xl border-2 ${th.borderStrong} overflow-hidden ${featured ? `ring-2 ${th.ring} scale-[1.02]` : ""}`}>
                    <div className={`px-6 py-6 ${th.bgStrong} border-b ${th.border}`}>
                      {featured && (
                        <span className={`block text-center rounded-full border ${th.border} ${th.color} text-[9px] font-bold uppercase tracking-wider mb-3 py-0.5`}>
                          Mais vendido
                        </span>
                      )}
                      <p className={`text-xs font-bold uppercase tracking-wider ${th.color}`}>{t.badge}</p>
                      <p className="mt-2 text-xl font-bold">{t.name}</p>
                      <p className={`mt-4 text-5xl font-black ${th.color}`}>{formatPrice(t.price)}</p>
                    </div>
                    <div className="flex flex-col flex-1 p-6 bg-screens-card/30">
                      <p className="text-xs text-screens-muted mb-5 leading-relaxed">{t.description}</p>
                      <ul className="space-y-2.5 mb-8 flex-1">
                        {t.features.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-xs text-screens-muted">
                            <Check className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${th.icon}`} />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer"
                        className={`flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold transition ${th.btn}`}>
                        Comprar no Discord
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Mobile pricing */}
          {priceTab === "mobile" && (
            <div className="mx-auto max-w-md">
              <div className="rounded-2xl border-2 border-teal-500/40 overflow-hidden">
                <div className="border-b border-teal-500/25 bg-gradient-to-br from-teal-500/20 to-green-500/10 px-8 py-8 text-center">
                  <p className="text-xs font-bold uppercase tracking-widest text-teal-400">{mobileCourseProduct.badge}</p>
                  <p className="mt-2 text-2xl font-bold">{mobileCourseProduct.name}</p>
                  <p className="mt-4 text-5xl font-black text-teal-300">{formatPrice(mobileCourseProduct.price)}</p>
                </div>
                <div className="p-8 bg-screens-card/40">
                  <p className="text-sm text-screens-muted leading-relaxed mb-6">{mobileCourseProduct.description}</p>
                  <ul className="space-y-3 mb-8">
                    {mobileCourseProduct.features.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-screens-muted">
                        <Check className="h-4 w-4 shrink-0 mt-0.5 text-teal-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-green-500 py-3.5 text-sm font-bold text-black hover:opacity-90 transition">
                    Comprar Curso Mobile
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Scanner pricing */}
          {priceTab === "scanner" && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {scannerProducts.map((p) => (
                <div key={p.id} className={`glass-card flex flex-col p-6 border ${p.border}`}>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${p.accent} mb-3`}>{p.badge}</span>
                  <p className={`text-3xl font-black ${p.accent}`}>{formatPrice(p.price)}</p>
                  <p className="mt-2 font-bold text-sm">{p.name}</p>
                  <p className="mt-2 text-xs text-screens-muted flex-1 leading-relaxed">{p.description}</p>
                  <ul className="mt-5 space-y-2 mb-6">
                    {p.features.map((f) => (
                      <li key={f} className="text-xs text-screens-muted flex items-center gap-2">
                        <Check className={`h-3 w-3 ${p.accent}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 py-3 text-xs font-semibold text-green-300 hover:bg-green-500/15 transition">
                    <MessageCircle className="h-3.5 w-3.5" />
                    Comprar scanner
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── CTA FINAL ─── */}
      <section className="relative overflow-hidden py-24">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-green-600/8 via-transparent to-teal-600/6" />
        <div className="pointer-events-none absolute inset-0 cyber-grid opacity-10" />
        <div className="mx-auto max-w-2xl px-4 text-center relative">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-green-500/30 bg-green-500/10">
            <Crosshair className="h-8 w-8 text-green-300" />
          </div>
          <h2 className="text-3xl font-black md:text-4xl">
            <span className="bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
              Pronto pra virar telador?
            </span>
          </h2>
          <p className="mt-4 text-screens-muted leading-relaxed">
            Entra no Discord, escolhe curso ou scanner e começa hoje.
            {siteConfig.scannerName} — {siteConfig.tagline}.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#5865F2] px-8 py-4 text-sm font-bold hover:bg-[#4752C4] transition shadow-[0_0_40px_-8px_rgba(88,101,242,0.6)]">
              <MessageCircle className="h-5 w-5" />
              Entrar no Discord
            </a>
            <a href="#conteudo"
              className="inline-flex items-center gap-2 rounded-xl border border-screens-border bg-screens-card/40 px-8 py-4 text-sm font-semibold text-screens-muted hover:text-white hover:border-screens-border/80 transition">
              <BookOpen className="h-4 w-4" />
              Ver conteúdo
            </a>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-screens-border py-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 md:grid-cols-4 mb-10">
            {/* Brand */}
            <div>
              <div className="mb-3">
                <BrandLogo size="sm" />
              </div>
              <p className="text-xs text-screens-muted leading-relaxed">
                {siteConfig.metadata.description}
              </p>
            </div>

            {/* Produto */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-screens-muted mb-3">Produto</p>
              <ul className="space-y-2">
                {[
                  { href: "#conteudo", label: "Curso Deep" },
                  { href: "#curso-mobile", label: "Curso Mobile" },
                  { href: "#scanner", label: "Scanner" },
                  { href: "#bots", label: "Bots" },
                  { href: "#precos", label: "Preços" },
                ].map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-xs text-screens-muted hover:text-white transition">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Para Orgs */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-screens-muted mb-3">Para Organizações</p>
              <ul className="space-y-2">
                {[
                  { href: "#servicos", label: "Serviços" },
                  { href: "#contratar", label: "Contratar equipe" },
                  { href: "#scanner", label: "Enterprise scanner" },
                  { href: DISCORD_URL, label: "Suporte direto" },
                ].map((link) => (
                  <li key={link.label}>
                    <a href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined}
                      className="text-xs text-screens-muted hover:text-white transition">{link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-screens-muted mb-3">Legal</p>
              <ul className="space-y-2">
                {[
                  { href: "/termos", label: "Termos de uso" },
                  { href: "/privacidade", label: "Privacidade" },
                  { href: DISCORD_URL, label: "Contato", external: true },
                ].map((link) => (
                  <li key={link.label}>
                    <a href={link.href} target={link.external ? "_blank" : undefined}
                      className="text-xs text-screens-muted hover:text-white transition">{link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-screens-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-screens-muted">
              © 2026 {siteConfig.scannerName} — {siteConfig.tagline}
            </p>
            <div className="flex items-center gap-4">
              <a href="/login" className="text-xs text-screens-muted hover:text-screens-accent transition">Login</a>
              <a href="/termos" className="text-xs text-screens-muted hover:text-screens-accent transition">Termos</a>
              <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#5865F2]/20 border border-[#5865F2]/30 px-3 py-1.5 text-xs text-[#7289DA] hover:bg-[#5865F2]/30 transition">
                <MessageCircle className="h-3 w-3" />
                Discord
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
