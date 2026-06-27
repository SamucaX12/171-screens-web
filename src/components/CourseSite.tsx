"use client";

import { useState } from "react";
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

function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

const counts = getLessonCounts();

const services = [
  {
    icon: FileSearch,
    title: "Telagem Forense",
    description: "Análise profissional de screen share com relatório completo. Detecção de cheat, bypass, DMA, remote e UEFI.",
    accent: "text-cyan-400",
    border: "border-cyan-500/20",
    bg: "bg-cyan-500/5",
    tag: "Forense",
  },
  {
    icon: Cpu,
    title: "Setup de Scanner",
    description: "Implementação completa do 171 ScreenS para o seu servidor. Configuração de pins, GUI personalizada e enterprise.",
    accent: "text-amber-400",
    border: "border-amber-500/20",
    bg: "bg-amber-500/5",
    tag: "Scanner",
  },
  {
    icon: Users,
    title: "Treinamento de Staff",
    description: "Capacitação da sua equipe de teladores do zero ao avançado. Metodologia 171 ScreenS aplicada ao seu contexto.",
    accent: "text-emerald-400",
    border: "border-emerald-500/20",
    bg: "bg-emerald-500/5",
    tag: "Educação",
  },
  {
    icon: Network,
    title: "Consultoria Anti-cheat",
    description: "Estratégia personalizada de detecção para o seu jogo ou plataforma. Fluxo de processo, ferramentas e workflow.",
    accent: "text-violet-400",
    border: "border-violet-500/20",
    bg: "bg-violet-500/5",
    tag: "Consultoria",
  },
  {
    icon: Globe,
    title: "Scan Mobile",
    description: "Análise forense de dispositivos mobile via passador web. iOS e Android com resultado completo em tempo real.",
    accent: "text-fuchsia-400",
    border: "border-fuchsia-500/20",
    bg: "bg-fuchsia-500/5",
    tag: "Mobile",
  },
  {
    icon: Wrench,
    title: "Integração Enterprise",
    description: "Deploy do scanner para organizações com múltiplos operadores, strings compartilhadas e ImGui personalizado.",
    accent: "text-sky-400",
    border: "border-sky-500/20",
    bg: "bg-sky-500/5",
    tag: "Enterprise",
  },
];

const teamPlans = [
  {
    name: "Servidor",
    icon: Shield,
    price: "Consulte",
    accent: "text-cyan-400",
    border: "border-cyan-500/30",
    bg: "bg-cyan-500/5",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(34,211,238,0.3)]",
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
    accent: "text-fuchsia-400",
    border: "border-fuchsia-500/30",
    bg: "bg-fuchsia-500/5",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(217,70,239,0.3)]",
    featured: true,
    features: [
      "Tudo do plano Servidor",
      "Treinamento completo da equipe",
      "Curso Emu licença para staff",
      "Scanner Mobile configurado",
      "Consultoria anti-cheat mensal",
      "SLA com resposta garantida",
    ],
  },
  {
    name: "Esports",
    icon: Award,
    price: "Consulte",
    accent: "text-amber-400",
    border: "border-amber-500/30",
    bg: "bg-amber-500/5",
    glow: "hover:shadow-[0_0_40px_-10px_rgba(251,191,36,0.3)]",
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

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Global ambient */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-screens-bg" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-cyan-600/8 blur-[120px] rounded-full" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-fuchsia-600/6 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-600/5 blur-[100px] rounded-full" />
      </div>

      {/* ─── HEADER ─── */}
      <header className="sticky top-0 z-50 border-b border-screens-border/60 bg-screens-bg/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 group">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/10 group-hover:border-cyan-500/50 transition">
              <Crosshair className="h-4 w-4 text-cyan-300" />
              <div className="absolute inset-0 rounded-xl bg-cyan-400/10 blur-sm opacity-0 group-hover:opacity-100 transition" />
            </div>
            <div>
              <p className="text-sm font-bold tracking-tight">171 ScreenS</p>
              <p className="text-[9px] text-screens-muted font-mono">Scan · Curso · Mobile</p>
            </div>
          </a>

          {/* Nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {[
              { href: "#conteudo", label: "Curso", color: "hover:text-emerald-300" },
              { href: "#curso-mobile", label: "Mobile", color: "hover:text-fuchsia-300" },
              { href: "#scanner", label: "Scan", color: "hover:text-amber-300" },
              { href: "#bots", label: "Bots", color: "hover:text-violet-300" },
              { href: "#servicos", label: "Serviços", color: "hover:text-sky-300" },
              { href: "#contratar", label: "Contratar", color: "hover:text-cyan-300" },
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

      {/* ─── HERO ─── */}
      <section className="relative border-b border-screens-border overflow-hidden">
        <div className="pointer-events-none absolute inset-0 cyber-grid opacity-20" />
        {/* Scanline overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-screens-bg/80" />

        <div className="mx-auto max-w-7xl px-4 pt-20 pb-16 md:pt-28 md:pb-24 relative">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            {/* Left */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-cyan-300">
                  Telagem Forense · Scanner · Mobile
                </span>
              </div>

              <h1 className="text-4xl font-black tracking-tight leading-[1.1] md:text-6xl">
                <span className="bg-gradient-to-r from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent">
                  Aprende telagem.
                </span>
                <br />
                <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-violet-400 bg-clip-text text-transparent">
                  Roda scan.
                </span>
              </h1>

              <p className="text-screens-muted leading-relaxed max-w-lg text-base">
                Curso do zero ao telador profissional. Scanner 171 ScreenS com pins, results e enterprise.
                Agora com <span className="text-fuchsia-300 font-semibold">Curso Mobile</span> completo.
              </p>

              <p className="text-xs text-screens-muted font-mono border-l-2 border-cyan-500/40 pl-3">
                Booster — {BOOSTER_LESSON_COUNT} aulas grátis no Tier I
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <a href="/login" className="btn-primary gap-2 !py-3 !px-6">
                  <Zap className="h-4 w-4" />
                  Entrar no curso
                </a>
                <a href="#curso-mobile" className="btn-secondary !border-fuchsia-500/30 !text-fuchsia-200 hover:!border-fuchsia-400/50 !py-3 !px-5 gap-2">
                  <Smartphone className="h-4 w-4" />
                  Curso Mobile
                </a>
                <a href="#precos" className="btn-secondary !py-3 !px-5 gap-2">
                  <Scan className="h-4 w-4" />
                  Ver planos
                </a>
              </div>
            </div>

            {/* Right — Terminal card */}
            <div className="relative">
              {/* Glow behind */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/15 via-transparent to-fuchsia-500/10 blur-2xl rounded-3xl" />
              <div className="relative rounded-2xl border border-cyan-500/25 bg-screens-card/80 backdrop-blur-xl overflow-hidden">
                {/* Terminal bar */}
                <div className="flex items-center gap-2 border-b border-screens-border px-4 py-3 bg-screens-bg/60">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
                  </div>
                  <span className="flex-1 text-center font-mono text-[10px] text-screens-muted">
                    171-scanner — results
                  </span>
                  <span className="flex items-center gap-1 text-[9px] text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    ONLINE
                  </span>
                </div>

                {/* Scanner output */}
                <div className="p-5 font-mono text-xs space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-screens-muted">PIN</span>
                    <span className="text-cyan-300 font-bold tracking-widest">K7H2M9XP</span>
                  </div>
                  <div className="h-px bg-screens-border" />

                  {[
                    { label: "Prefetch", value: "12 entries", color: "text-emerald-400", status: "ok" },
                    { label: "Bypass List", value: "3 detected", color: "text-red-400", status: "alert" },
                    { label: "Sysmon Ev.10", value: "OpenProcess", color: "text-amber-400", status: "warn" },
                    { label: "Remote SW", value: "AnyDesk [OFF]", color: "text-orange-400", status: "warn" },
                    { label: "HWID", value: "A1B2C3D4…", color: "text-screens-muted", status: "ok" },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between gap-4 text-[11px]">
                      <span className="text-screens-muted w-24 shrink-0">{row.label}</span>
                      <span className={`${row.color} font-medium flex-1 text-right`}>{row.value}</span>
                      <span className={`text-[9px] uppercase font-bold w-10 text-right ${
                        row.status === "alert" ? "text-red-400" : row.status === "warn" ? "text-amber-400" : "text-emerald-400/60"
                      }`}>
                        {row.status === "alert" ? "ALRT" : row.status === "warn" ? "WARN" : "—"}
                      </span>
                    </div>
                  ))}

                  <div className="h-px bg-screens-border" />
                  <div className="flex items-center justify-between">
                    <span className="text-screens-muted text-[10px]">Risk Score</span>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-24 rounded-full bg-screens-border overflow-hidden">
                        <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-amber-500 to-red-500" />
                      </div>
                      <span className="text-red-400 font-bold text-[11px]">72</span>
                    </div>
                  </div>
                  <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-[10px] text-red-400 font-bold uppercase tracking-wider text-center">
                    ⚠ Suspeito — Bypass Genérico
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats strip */}
          <div className="mt-16 grid grid-cols-3 gap-3 md:grid-cols-6">
            {[
              { label: "Aulas", value: `${counts.total}+`, color: "text-cyan-300" },
              { label: "Tiers", value: "3", color: "text-emerald-300" },
              { label: "Mobile", value: "4", color: "text-fuchsia-300" },
              { label: "Scanner", value: "4", color: "text-amber-300" },
              { label: "Tools", value: "7+", color: "text-violet-300" },
              { label: "Do zero", value: "100%", color: "text-sky-300" },
            ].map((s) => (
              <div key={s.label} className="group rounded-xl border border-screens-border bg-screens-card/40 p-4 text-center hover:border-screens-border/80 transition">
                <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
                <p className="text-[10px] text-screens-muted mt-1 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CURSO EMU ─── */}
      <section id="conteudo" className="relative py-24 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-screens-border bg-screens-card/50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-screens-muted mb-4">
              <BookOpen className="h-3 w-3" />
              Curso Emu
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
                <div key={tool.name} className="group rounded-xl border border-screens-border bg-screens-card/40 p-5 hover:border-cyan-500/25 hover:bg-screens-card/60 transition-all duration-200">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold">{tool.name}</h4>
                    <span className="rounded-md bg-screens-bg border border-screens-border px-2 py-0.5 text-[9px] text-screens-muted uppercase font-mono">
                      {tool.tag}
                    </span>
                  </div>
                  <p className="text-xs text-screens-muted leading-relaxed">{tool.description}</p>
                  <div className="mt-3 pt-3 border-t border-screens-border">
                    <p className="text-[11px] text-cyan-400/90">
                      <span className="font-bold text-cyan-400">Na telagem:</span>{" "}
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
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-amber-300 mb-4">
              <Scan className="h-3 w-3" />
              171 ScreenS Scanner
            </div>
            <h2 className="text-3xl font-black md:text-5xl">
              <span className="bg-gradient-to-r from-amber-300 to-amber-100 bg-clip-text text-transparent">
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
                <div key={f.t} className="group rounded-xl border border-amber-500/15 bg-amber-500/5 p-5 hover:border-amber-500/35 hover:bg-amber-500/10 transition-all duration-200 text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-amber-500/25 bg-amber-500/10 mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <Icon className="h-5 w-5 text-amber-400" />
                  </div>
                  <p className="font-bold text-sm">{f.t}</p>
                  <p className="mt-1.5 text-[11px] text-screens-muted leading-relaxed">{f.d}</p>
                </div>
              );
            })}
          </div>

          {/* Result preview */}
          <div className="rounded-2xl border border-amber-500/20 bg-screens-card/60 overflow-hidden">
            <div className="border-b border-amber-500/20 bg-amber-500/5 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
                </div>
                <span className="font-mono text-[11px] text-amber-400/80">result — K7H2M9XP</span>
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
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#1a1a24" strokeWidth="8" />
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
                  { l: "Clean", v: "8", c: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
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
            <a href="/login" className="inline-flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-6 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-500/15 transition">
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
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-violet-300 mb-4">
              <Clock className="h-3 w-3" />
              Em breve
            </div>
            <h2 className="text-3xl font-black md:text-4xl">
              <span className="bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
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
                <div key={bot.name} className="group relative rounded-xl border border-violet-500/15 bg-violet-500/5 p-6 hover:border-violet-500/30 hover:bg-violet-500/8 transition-all duration-200">
                  <span className="absolute right-3 top-3 rounded-full border border-violet-500/30 bg-violet-500/15 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-violet-300">
                    Em breve
                  </span>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-500/25 bg-violet-500/10 mb-4 group-hover:scale-105 transition-transform">
                    <Icon className="h-5 w-5 text-violet-400" />
                  </div>
                  <p className="font-bold pr-14">{bot.name}</p>
                  <p className="mt-2 text-xs text-screens-muted leading-relaxed">{bot.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-violet-500/30 bg-violet-500/10 px-6 py-3 text-sm font-semibold text-violet-300 hover:bg-violet-500/15 transition">
              <MessageCircle className="h-4 w-4" />
              Entrar no Discord para novidades
            </a>
          </div>
        </div>
      </section>

      {/* ─── SERVIÇOS ─── */}
      <section id="servicos" className="relative border-y border-screens-border py-24 md:py-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 cyber-grid opacity-15" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-sky-500/5 blur-[150px] rounded-full" />

        <div className="mx-auto max-w-7xl px-4 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-sky-300 mb-4">
              <Wrench className="h-3 w-3" />
              Serviços
            </div>
            <h2 className="text-3xl font-black md:text-5xl">
              <span className="bg-gradient-to-r from-sky-300 to-cyan-200 bg-clip-text text-transparent">
                O que oferecemos
              </span>
            </h2>
            <p className="mt-4 text-screens-muted max-w-2xl mx-auto leading-relaxed">
              Além do curso e scanner, a 171 ScreenS oferece serviços para servidores, organizações e equipes de esports.
              Implementação completa do ecossistema 171 no seu contexto.
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
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-cyan-300 mb-4">
              <Briefcase className="h-3 w-3" />
              Para organizações
            </div>
            <h2 className="text-3xl font-black md:text-5xl">
              <span className="bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                Contratar nossa equipe
              </span>
            </h2>
            <p className="mt-4 text-screens-muted max-w-2xl mx-auto leading-relaxed">
              Implemente o ecossistema 171 ScreenS completo na sua organização.
              Scanner configurado, equipe treinada e suporte contínuo.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-12">
            {teamPlans.map((plan) => {
              const Icon = plan.icon;
              return (
                <div key={plan.name} className={`relative group rounded-2xl border ${plan.border} ${plan.bg} p-7 flex flex-col transition-all duration-300 ${plan.glow} ${
                  plan.featured ? "ring-2 ring-fuchsia-500/30 scale-[1.02]" : ""
                }`}>
                  {plan.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-fuchsia-500/40 bg-fuchsia-500/20 px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-fuchsia-300">
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

          {/* Trust strip */}
          <div className="rounded-2xl border border-screens-border bg-screens-card/30 p-8">
            <div className="grid gap-6 md:grid-cols-4 text-center">
              {[
                { icon: Shield, label: "Metodologia 171", desc: "Processo validado por teladores profissionais" },
                { icon: Users, label: "Equipe dedicada", desc: "Suporte direto com Samuca e a equipe" },
                { icon: Star, label: "Resultados comprovados", desc: "+125 aulas criadas com casos reais" },
                { icon: Zap, label: "Implementação rápida", desc: "Scanner ativo em menos de 24h" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex flex-col items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-screens-border bg-screens-bg">
                      <Icon className="h-5 w-5 text-screens-muted" />
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
              { id: "curso" as const, label: "Curso Emu", icon: GraduationCap },
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
                        ? "bg-screens-accent text-screens-bg shadow-lg"
                        : tab.id === "mobile"
                          ? "bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white shadow-[0_0_24px_-6px_rgba(217,70,239,0.5)]"
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
              <div className="rounded-2xl border-2 border-fuchsia-500/40 overflow-hidden">
                <div className="border-b border-fuchsia-500/25 bg-gradient-to-br from-fuchsia-500/20 to-violet-500/10 px-8 py-8 text-center">
                  <p className="text-xs font-bold uppercase tracking-widest text-fuchsia-400">{mobileCourseProduct.badge}</p>
                  <p className="mt-2 text-2xl font-bold">{mobileCourseProduct.name}</p>
                  <p className="mt-4 text-5xl font-black text-fuchsia-300">{formatPrice(mobileCourseProduct.price)}</p>
                </div>
                <div className="p-8 bg-screens-card/40">
                  <p className="text-sm text-screens-muted leading-relaxed mb-6">{mobileCourseProduct.description}</p>
                  <ul className="space-y-3 mb-8">
                    {mobileCourseProduct.features.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-screens-muted">
                        <Check className="h-4 w-4 shrink-0 mt-0.5 text-fuchsia-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-violet-600 py-3.5 text-sm font-bold text-white hover:opacity-90 transition">
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
                    className="flex items-center justify-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 py-3 text-xs font-semibold text-amber-300 hover:bg-amber-500/15 transition">
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
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-600/10 via-transparent to-fuchsia-600/8" />
        <div className="pointer-events-none absolute inset-0 cyber-grid opacity-10" />
        <div className="mx-auto max-w-2xl px-4 text-center relative">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10">
            <Crosshair className="h-8 w-8 text-cyan-300" />
          </div>
          <h2 className="text-3xl font-black md:text-4xl">
            <span className="bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
              Pronto pra virar telador?
            </span>
          </h2>
          <p className="mt-4 text-screens-muted leading-relaxed">
            Entra no Discord, escolhe curso ou scanner e começa hoje.
            171 ScreenS by Samuca.
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
              <div className="flex items-center gap-2 mb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-500/25 bg-cyan-500/10">
                  <Crosshair className="h-3.5 w-3.5 text-cyan-300" />
                </div>
                <span className="font-bold text-sm">171 ScreenS</span>
              </div>
              <p className="text-xs text-screens-muted leading-relaxed">
                Curso de telagem forense, scanner e mobile. Ecossistema completo para teladores profissionais.
              </p>
            </div>

            {/* Produto */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-screens-muted mb-3">Produto</p>
              <ul className="space-y-2">
                {[
                  { href: "#conteudo", label: "Curso Emu" },
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
              © 2026 171 ScreenS · Curso Emu + Mobile by Samuca
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
