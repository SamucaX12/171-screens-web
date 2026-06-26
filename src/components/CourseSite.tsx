"use client";

import { useState } from "react";
import {
  BookOpen,
  ChevronDown,
  Crosshair,
  GraduationCap,
  Lock,
  MessageCircle,
  Monitor,
  Scan,
  Shield,
  Sparkles,
  Zap,
  Bot,
  Clock,
  Check,
} from "lucide-react";
import {
  DISCORD_URL,
  sysmonEvents,
  tiers,
  tools,
  type TierId,
} from "@/lib/course-data";
import { courseProducts, scannerProducts, upcomingBots } from "@/lib/products";
import { TIER_ORDER, TIER_THEME } from "@/lib/tier-theme";
import { getLessonCounts } from "@/lib/lessons";
import { BOOSTER_LESSON_COUNT } from "@/lib/booster-lessons";

function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

const counts = getLessonCounts();

export default function CourseSite({ loggedIn = false }: { loggedIn?: boolean }) {
  const [activeTier, setActiveTier] = useState<TierId>("tier1");
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [priceTab, setPriceTab] = useState<"curso" | "scanner">("curso");

  const tier = tiers.find((t) => t.id === activeTier)!;
  const theme = TIER_THEME[activeTier];

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-screens-border bg-screens-bg/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-screens-border bg-screens-card">
              <Crosshair className="h-4 w-4 text-screens-muted" />
            </div>
            <div>
              <p className="text-sm font-semibold">171 ScreenS</p>
              <p className="text-[10px] text-screens-muted">Curso · Scanner</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-screens-muted md:flex">
            <a href="#conteudo" className="hover:text-white transition">Curso</a>
            <a href="/como-usar" className="hover:text-white transition">Como Usar</a>
            <a href="#scanner" className="hover:text-white transition">Scanner</a>
            <a href="#precos" className="hover:text-white transition">Preços</a>
          </nav>
          <div className="flex items-center gap-2">
            {loggedIn ? (
              <a href="/dashboard" className="btn-primary !py-2 !px-4 text-sm">
                <GraduationCap className="h-4 w-4" />
                Dashboard
              </a>
            ) : (
              <a href="/login" className="btn-secondary !py-2 !px-4 text-sm hidden sm:inline-flex">Entrar</a>
            )}
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-[#5865F2] px-3 py-2 text-sm hover:bg-[#4752C4]">
              <MessageCircle className="h-4 w-4" />
              Discord
            </a>
          </div>
        </div>
      </header>

      <section className="border-b border-screens-border">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="label-xs mb-4">Telagem forense + Scanner</p>
              <h1 className="text-3xl font-semibold tracking-tight md:text-5xl leading-[1.15]">
                Aprende telagem.
                <br />
                Roda scan.
              </h1>
              <p className="mt-5 max-w-lg text-screens-muted leading-relaxed">
                Curso do zero ao telador pro. Scanner 171 ScreenS com pins, results e enterprise.
              </p>
              <p className="mt-4 text-sm text-screens-muted">
                Booster — {BOOSTER_LESSON_COUNT} aulas grátis no Tier I
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                <a href="/login" className="btn-primary">
                  <Zap className="h-4 w-4" />
                  Entrar no curso
                </a>
                <a href="#precos" className="btn-secondary">
                  <Scan className="h-4 w-4" />
                  Ver planos
                </a>
                <a href="/como-usar" className="btn-secondary">
                  <BookOpen className="h-4 w-4" />
                  Como usar
                </a>
              </div>
            </div>

            <div className="surface p-6">
              <div className="flex items-center justify-between border-b border-screens-border pb-3">
                <span className="font-mono text-sm">171 Scanner</span>
                <span className="text-[10px] text-screens-muted uppercase">Online</span>
              </div>
              <div className="mt-4 space-y-3 font-mono text-xs text-screens-muted">
                <div className="flex justify-between">
                  <span>PIN</span>
                  <span className="text-zinc-300">K7H2M9XP</span>
                </div>
                <div className="h-1 overflow-hidden rounded-full bg-screens-border">
                  <div className="h-full w-3/4 rounded-full bg-zinc-400" />
                </div>
                <p>Prefetch · Sysmon Event 10…</p>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-5">
            {[
              { label: "Aulas", value: `${counts.total}+` },
              { label: "Tiers", value: "3" },
              { label: "Scanner", value: "4" },
              { label: "Tools", value: "7+" },
              { label: "Do zero", value: "100%" },
            ].map((s) => (
              <div key={s.label} className="surface p-4">
                <p className="text-xl font-semibold">{s.value}</p>
                <p className="text-[11px] text-screens-muted mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course content */}
      <section id="conteudo" className="mx-auto max-w-7xl px-4 py-20 md:py-24">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-screens-muted mb-3">Curso Emu</p>
          <h2 className="text-3xl md:text-4xl font-bold">Conteúdo do curso</h2>
          <p className="mt-4 text-screens-muted max-w-2xl mx-auto leading-relaxed">
            {counts.total} aulas em vídeo e texto — com suporte a imagens e vídeos em cada módulo.
            Três tiers do básico ao privado.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {TIER_ORDER.map((id) => {
            const th = TIER_THEME[id];
            return (
              <div key={id} className={`flex items-center gap-2 rounded-full border ${th.border} ${th.bg} px-4 py-2`}>
                <span className={`h-2 w-2 rounded-full ${th.dot}`} />
                <span className={`text-xs font-bold ${th.color}`}>{th.short} · {th.name}</span>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {tiers.map((t) => {
            const th = TIER_THEME[t.id];
            return (
              <button
                key={t.id}
                onClick={() => {
                  setActiveTier(t.id);
                  setExpandedModule(null);
                }}
                className={`rounded-xl px-6 py-3.5 text-sm font-medium transition border-2 ${
                  activeTier === t.id
                    ? `${th.borderStrong} ${th.bgStrong} ${th.color}`
                    : "border-screens-border bg-screens-card/30 text-screens-muted hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2 font-bold">
                  <span className={`h-2 w-2 rounded-full ${th.dot}`} />
                  {t.label}
                </span>
                <span className="text-xs opacity-80 block mt-0.5">{t.badge}</span>
              </button>
            );
          })}
        </div>

        <div className={`rounded-2xl border-2 ${theme.borderStrong} ${theme.bg} glass-card p-8 mb-10`}>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className={`h-5 w-5 ${theme.icon}`} />
                <span className={`text-sm font-bold uppercase tracking-wider ${theme.color}`}>
                  {tier.label} — {tier.badge}
                </span>
              </div>
              <p className="text-screens-muted max-w-2xl leading-relaxed">{tier.description}</p>
            </div>
            <p className={`text-4xl font-black shrink-0 ${theme.color}`}>{formatPrice(tier.price)}</p>
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {tier.includes.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-screens-muted">
                <Shield className={`h-4 w-4 shrink-0 mt-0.5 ${theme.icon}`} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          {tier.modules.map((mod, i) => {
            const open = expandedModule === mod.id;
            return (
              <div
                key={mod.id}
                className={`glass-card overflow-hidden transition hover:border-screens-accent/20`}
              >
                <button
                  onClick={() => setExpandedModule(open ? null : mod.id)}
                  className="flex w-full items-center gap-5 px-6 py-5 text-left"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-screens-bg font-mono text-sm font-bold text-screens-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-base">{mod.title}</h3>
                      {mod.tool && (
                        <span className="rounded-md bg-screens-accent/10 px-2 py-0.5 text-[10px] font-bold text-screens-accent uppercase">
                          {mod.tool}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-screens-muted mt-1">{mod.summary}</p>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-screens-muted transition-transform ${open ? "rotate-180" : ""}`}
                  />
                </button>
                {open && (
                  <div className="border-t border-screens-border px-6 py-5 bg-screens-bg/40">
                    <ul className="space-y-2.5">
                      {mod.topics.map((topic) => (
                        <li key={topic} className="flex items-start gap-3 text-sm text-screens-muted">
                          <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${theme.dot}`} />
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
      </section>

      {/* Scanner highlight */}
      <section id="scanner" className="border-y border-screens-border bg-screens-card/20 py-20 md:py-24 scan-grid">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.2em] text-amber-400/80 mb-3">171 ScreenS Scanner</p>
            <h2 className="text-3xl md:text-4xl font-bold">Painel do scanner</h2>
            <p className="mt-4 text-screens-muted max-w-2xl mx-auto">
              Quem tem plano acessa direto no dashboard: Pins, Results, Strings, GUI e Enterprise.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { t: "Pins", d: "Gera pin pro jogador digitar no .exe" },
              { t: "Results", d: "Relatório completo com detecções" },
              { t: "Strings", d: "SHA1, SHA256, DNS, .exe, .dll" },
              { t: "GUI", d: "Cor, nome, frases e logo do ImGui" },
              { t: "Enterprise", d: "Equipe até 5 membros por email" },
            ].map((f) => (
              <div key={f.t} className="glass-card p-6 text-center hover:border-amber-500/30 transition">
                <Scan className="h-6 w-6 text-amber-400 mx-auto mb-3" />
                <p className="font-bold">{f.t}</p>
                <p className="mt-2 text-xs text-screens-muted leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section id="ferramentas" className="mx-auto max-w-7xl px-4 py-20 md:py-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold">Ferramentas que você domina</h2>
          <p className="mt-3 text-screens-muted max-w-xl mx-auto">
            Cada app explicado com exemplos, imagens e vídeos nas aulas.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <div key={tool.name} className="glass-card p-6 hover:border-screens-accent/25 transition">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold">{tool.name}</h3>
                <span className="rounded-md bg-screens-bg px-2 py-0.5 text-[10px] text-screens-muted uppercase">
                  {tool.tag}
                </span>
              </div>
              <p className="text-sm text-screens-muted leading-relaxed">{tool.description}</p>
              <p className="mt-4 text-xs border-t border-screens-border pt-4 text-screens-accent/90">
                <span className="font-semibold text-screens-accent">Na telagem: </span>
                {tool.useCase}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 glass-card p-8">
          <h3 className="text-xl font-bold mb-2">Sysmon — Eventos essenciais</h3>
          <p className="text-sm text-screens-muted mb-8">O que cada log significa e quando acusa bypass.</p>
          <div className="grid gap-5 md:grid-cols-3">
            {sysmonEvents.map((ev) => (
              <div key={ev.id} className="rounded-xl border border-screens-border bg-screens-bg p-5">
                <p className="text-screens-accent font-mono text-sm font-bold">{ev.id}</p>
                <p className="font-semibold mt-2">{ev.title}</p>
                <p className="text-sm text-screens-muted mt-2 leading-relaxed">{ev.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing — Curso + Scanner tabs */}
      <section id="precos" className="border-t border-screens-border bg-screens-card/10 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold">Preços</h2>
            <p className="mt-3 text-screens-muted">Curso e scanner são produtos separados — compra no Discord.</p>
          </div>

          <div className="flex justify-center gap-3 mb-12">
            <button
              onClick={() => setPriceTab("curso")}
              className={`flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition ${
                priceTab === "curso"
                  ? "bg-screens-accent text-screens-bg"
                  : "border border-screens-border text-screens-muted hover:text-white"
              }`}
            >
              <GraduationCap className="h-4 w-4" /> Curso Emu
            </button>
            <button
              onClick={() => setPriceTab("scanner")}
              className={`flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition ${
                priceTab === "scanner"
                  ? "bg-amber-400 text-black"
                  : "border border-screens-border text-screens-muted hover:text-white"
              }`}
            >
              <Scan className="h-4 w-4" /> Scanner 171 ScreenS
            </button>
          </div>

          {priceTab === "curso" ? (
            <div className="grid gap-6 md:grid-cols-3">
              {courseProducts.map((t) => {
                const th = TIER_THEME[t.id as TierId];
                return (
                  <div
                    key={t.id}
                    className={`flex flex-col rounded-2xl border-2 ${th.borderStrong} glass-card overflow-hidden ${
                      t.id === "tier2" ? `ring-2 ${th.ring}` : ""
                    }`}
                  >
                    <div className={`px-6 py-6 ${th.bgStrong} border-b ${th.border}`}>
                      <p className={`text-xs font-bold uppercase ${th.color}`}>{t.badge}</p>
                      <p className="mt-2 text-xl font-bold">{t.name}</p>
                      <p className={`mt-3 text-4xl font-black ${th.color}`}>{formatPrice(t.price)}</p>
                    </div>
                    <div className="flex flex-col flex-1 p-6">
                      <p className="text-sm text-screens-muted mb-5 leading-relaxed">{t.description}</p>
                      <ul className="space-y-2 mb-8 flex-1">
                        {t.features.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-xs text-screens-muted">
                            <Check className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${th.icon}`} />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <a
                        href={DISCORD_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-center rounded-xl py-3.5 text-sm font-bold ${th.btn}`}
                      >
                        Comprar curso
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2">
              {scannerProducts.map((p) => (
                <div key={p.id} className={`glass-card p-7 flex flex-col border ${p.border}`}>
                  <p className={`text-3xl font-black ${p.accent}`}>{formatPrice(p.price)}</p>
                  <p className="mt-2 text-lg font-bold">{p.name}</p>
                  <p className="mt-3 text-sm text-screens-muted flex-1 leading-relaxed">{p.description}</p>
                  <ul className="mt-5 space-y-2">
                    {p.features.map((f) => (
                      <li key={f} className="text-xs text-screens-muted flex items-center gap-2">
                        <Check className={`h-3 w-3 ${p.accent}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={DISCORD_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-500/15"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Comprar scanner
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Coming soon bots */}
      <section id="em-breve" className="mx-auto max-w-7xl px-4 py-20 md:py-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs text-violet-300 mb-4">
            <Clock className="h-3.5 w-3.5" />
            Em breve — futuro do ecossistema
          </div>
          <h2 className="text-3xl font-bold">Bots de Screen Share</h2>
          <p className="mt-3 text-screens-muted max-w-xl mx-auto">
            Estamos desenvolvendo automação pro Discord. Vai vender separado — fica de olho.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {upcomingBots.map((bot) => (
            <div
              key={bot.name}
              className="relative glass-card p-6 opacity-90 hover:opacity-100 transition"
            >
              <span className="absolute right-4 top-4 rounded-full bg-violet-500/20 px-2 py-0.5 text-[9px] font-bold uppercase text-violet-300">
                Em breve
              </span>
              <Bot className="h-8 w-8 text-violet-400 mb-4" />
              <p className="font-bold pr-16">{bot.name}</p>
              <p className="mt-2 text-sm text-screens-muted leading-relaxed">{bot.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-screens-border py-16">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="text-2xl font-bold">Pronto pra virar telador?</h2>
          <p className="mt-3 text-screens-muted leading-relaxed">
            Entra no Discord, escolhe curso ou scanner e começa hoje. 171 ScreenS by Samuca.
          </p>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#5865F2] px-8 py-4 text-sm font-semibold hover:bg-[#4752C4]"
          >
            <MessageCircle className="h-5 w-5" />
            discord.gg/35Aw934hNh
          </a>
        </div>
      </section>

      <footer className="border-t border-screens-border py-8 text-center text-xs text-screens-muted">
        <p>© 2026 171 ScreenS · Curso Emu by Samuca</p>
        <p className="mt-2 flex justify-center gap-4">
          <a href="/login" className="text-screens-accent hover:underline">Login</a>
          <a href={DISCORD_URL} className="text-screens-accent hover:underline" target="_blank" rel="noopener noreferrer">
            Discord
          </a>
        </p>
      </footer>
    </div>
  );
}
