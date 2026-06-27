"use client";

import {
  ArrowRight,
  Globe,
  Radar,
  Sparkles,
  Wifi,
  Zap,
} from "lucide-react";
import {
  mobileCoursePricing,
  mobileModules,
  mobileScanFeature,
} from "@/lib/mobile-course-data";
import { DISCORD_URL } from "@/lib/course-data";

function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function MobileCourseSection({ compact = false }: { compact?: boolean }) {
  return (
    <section
      id="curso-mobile"
      className="relative overflow-hidden border-y border-screens-border py-20 md:py-28"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 cyber-grid opacity-40" />
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-fuchsia-600/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-cyan-500/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className={`text-center ${compact ? "mb-12" : "mb-16"}`}>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-fuchsia-300">
            <Sparkles className="h-3.5 w-3.5" />
            Novo · Ecossistema Mobile
          </div>
          <h2 className="gradient-text text-3xl font-black tracking-tight md:text-5xl">
            Curso Mobile
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-screens-muted leading-relaxed">
            Domine emulador no celular: iOS, Android, IA e o scan mobile via passador web.
            Mesma identidade 171 ScreenS — agora no bolso.
          </p>
        </div>

        {/* Module cards */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {mobileModules.map((mod) => {
            const Icon = mod.icon;
            return (
              <article
                key={mod.id}
                className={`neon-card group flex flex-col p-6 transition-all duration-300 hover:-translate-y-1 ${mod.border} ${mod.glow}`}
              >
                {mod.badge && (
                  <span className="mb-4 w-fit rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-screens-muted">
                    {mod.badge}
                  </span>
                )}
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] ${mod.accent}`}
                >
                  <Icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <p className={`text-xs font-bold uppercase tracking-wider ${mod.accent}`}>
                  {mod.subtitle}
                </p>
                <h3 className="mt-2 text-lg font-bold">{mod.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-screens-muted">
                  {mod.description}
                </p>
                <ul className="mt-5 space-y-2 border-t border-white/5 pt-5">
                  {mod.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2 text-xs text-screens-muted"
                    >
                      <Zap className={`mt-0.5 h-3 w-3 shrink-0 ${mod.accent}`} />
                      {h}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        {/* Featured: Scan Mobile via Site */}
        <div className="neon-card-highlight relative mt-10 overflow-hidden p-8 md:p-10">
          <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-cyan-500/5 to-transparent" />
          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-cyan-300">
                <Radar className="h-3.5 w-3.5" />
                Destaque
              </div>
              <h3 className="text-2xl font-black md:text-3xl">
                {mobileScanFeature.title}
              </h3>
              <p className="mt-1 text-sm font-semibold text-cyan-400/90">
                {mobileScanFeature.subtitle}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-screens-muted">
                {mobileScanFeature.description}
              </p>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {mobileScanFeature.perks.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-2 text-xs text-zinc-300"
                  >
                    <Globe className="h-3.5 w-3.5 text-cyan-400" />
                    {p}
                  </li>
                ))}
              </ul>
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-6 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-500/20 hover:shadow-[0_0_30px_-5px_rgba(34,211,238,0.5)]"
              >
                Quero acesso mobile
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* Flow diagram */}
            <div className="space-y-4">
              {mobileScanFeature.steps.map((s, i) => (
                <div key={s.step} className="relative flex gap-4">
                  {i < mobileScanFeature.steps.length - 1 && (
                    <div className="absolute left-5 top-12 h-[calc(100%-8px)] w-px bg-gradient-to-b from-cyan-500/50 to-transparent" />
                  )}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-500/10 font-mono text-xs font-bold text-cyan-300">
                    {s.step}
                  </div>
                  <div className="neon-card !rounded-lg p-4 flex-1">
                    <div className="flex items-center gap-2">
                      {i === 0 && <Wifi className="h-4 w-4 text-cyan-400" />}
                      {i === 1 && <Radar className="h-4 w-4 text-cyan-400" />}
                      {i === 2 && <Globe className="h-4 w-4 text-cyan-400" />}
                      <p className="font-semibold text-sm">{s.title}</p>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-screens-muted">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}

              {/* Mini proxy visual */}
              <div className="mt-6 rounded-xl border border-dashed border-cyan-500/25 bg-black/30 p-4 font-mono text-[10px] text-cyan-300/80">
                <p className="text-cyan-400/60">// replay proxy flow</p>
                <p className="mt-1">
                  [Celular] → <span className="text-fuchsia-400">passador.171screens</span> →
                  [Análise] → [Result]
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile pricing card */}
        {!compact && (
          <div className="mx-auto mt-12 max-w-lg">
            <div className="neon-card border-fuchsia-500/30 p-8 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-fuchsia-400">
                {mobileCoursePricing.badge}
              </p>
              <h3 className="mt-2 text-xl font-bold">{mobileCoursePricing.name}</h3>
              <p className="mt-4 text-4xl font-black text-fuchsia-300">
                {formatPrice(mobileCoursePricing.price)}
              </p>
              <p className="mt-3 text-sm text-screens-muted">
                {mobileCoursePricing.description}
              </p>
              <ul className="mt-6 space-y-2 text-left">
                {mobileCoursePricing.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-xs text-screens-muted"
                  >
                    <Sparkles className="h-3 w-3 text-fuchsia-400" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 block rounded-xl bg-gradient-to-r from-fuchsia-600 to-violet-600 py-3.5 text-sm font-bold text-white transition hover:opacity-90 hover:shadow-[0_0_30px_-5px_rgba(217,70,239,0.6)]"
              >
                Comprar Curso Mobile
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
