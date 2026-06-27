"use client";

import { useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Globe,
  MessageCircle,
  Radar,
  Smartphone,
  Sparkles,
  Wifi,
  Zap,
} from "lucide-react";
import {
  mobileCoursePricing,
  mobileModules,
  mobilePlatformCourses,
  mobileScanFeature,
} from "@/lib/mobile-course-data";
import { DISCORD_URL } from "@/lib/course-data";

function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function PlatformCourse({ course }: { course: typeof mobilePlatformCourses[0] }) {
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const Icon = course.icon;

  return (
    <div className={`rounded-2xl border-2 ${course.borderStrong} overflow-hidden`}>
      {/* Platform header */}
      <div className={`${course.bgStrong} border-b-2 ${course.border} px-6 py-6 md:px-8`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${course.border} bg-screens-bg/60`}>
              <Icon className={`h-7 w-7 ${course.accent}`} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`h-2 w-2 rounded-full ${course.dot}`} />
                <span className={`text-[10px] font-bold uppercase tracking-widest ${course.accent}`}>
                  {course.subtitle}
                </span>
              </div>
              <h3 className="text-2xl font-black">{course.title}</h3>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className={`rounded-xl border ${course.border} ${course.bg} px-3 py-1.5 text-xs font-bold ${course.accent}`}>
              {course.modules.length} módulos
            </span>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 rounded-xl border ${course.border} ${course.bg} px-4 py-2 text-xs font-semibold ${course.accent} hover:opacity-80 transition`}
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Comprar
            </a>
          </div>
        </div>
        <p className="mt-4 text-sm text-screens-muted leading-relaxed max-w-2xl">
          {course.description}
        </p>
      </div>

      {/* Modules accordion */}
      <div className="divide-y divide-screens-border">
        {course.modules.map((mod, i) => {
          const open = expandedModule === mod.id;
          return (
            <div key={mod.id} className={`transition-colors ${open ? course.bg : "hover:bg-screens-card/30"}`}>
              <button
                onClick={() => setExpandedModule(open ? null : mod.id)}
                className="flex w-full items-center gap-4 px-6 py-4 text-left"
              >
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border font-mono text-xs font-bold transition-colors ${
                  open ? `${course.border} ${course.bg} ${course.accent}` : "border-screens-border text-screens-muted"
                }`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{mod.title}</p>
                  <p className="text-xs text-screens-muted mt-0.5">{mod.summary}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] text-screens-muted hidden sm:block">{mod.topics.length} tópicos</span>
                  <ChevronDown className={`h-4 w-4 text-screens-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
                </div>
              </button>

              {open && (
                <div className={`border-t ${course.border} px-6 pb-5 pt-4`}>
                  <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
                    {mod.topics.map((topic) => (
                      <li key={topic} className="flex items-start gap-2.5 text-xs text-screens-muted">
                        <ChevronRight className={`h-3 w-3 shrink-0 mt-0.5 ${course.accent}`} />
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
    </div>
  );
}

export default function MobileCourseSection({ compact = false }: { compact?: boolean }) {
  const [activePlatform, setActivePlatform] = useState<"overview" | "ios" | "android">("overview");

  return (
    <section
      id="curso-mobile"
      className="relative overflow-hidden border-y border-screens-border py-20 md:py-28"
    >
      {/* Ambient */}
      <div className="pointer-events-none absolute inset-0 cyber-grid opacity-30" />
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-fuchsia-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-cyan-500/8 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4">

        {/* Header */}
        <div className={`text-center ${compact ? "mb-12" : "mb-16"}`}>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-fuchsia-300">
            <Sparkles className="h-3 w-3" />
            Novo · Ecossistema Mobile
          </div>
          <h2 className="text-3xl font-black tracking-tight md:text-5xl">
            <span className="bg-gradient-to-r from-fuchsia-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
              Curso Mobile
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-screens-muted leading-relaxed">
            iOS, Android, IA Mobile e scan via passador web.
            Mesma metodologia 171 ScreenS — agora no bolso.
          </p>
        </div>

        {/* Overview cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-12">
          {mobileModules.map((mod) => {
            const Icon = mod.icon;
            return (
              <article
                key={mod.id}
                className={`neon-card group flex flex-col p-6 transition-all duration-300 hover:-translate-y-1 ${mod.border} ${mod.glow}`}
              >
                {mod.badge && (
                  <span className="mb-3 w-fit rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-screens-muted">
                    {mod.badge}
                  </span>
                )}
                <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] ${mod.accent}`}>
                  <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <p className={`text-[10px] font-bold uppercase tracking-wider ${mod.accent}`}>
                  {mod.subtitle}
                </p>
                <h3 className="mt-2 font-bold text-base">{mod.title}</h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-screens-muted">
                  {mod.description}
                </p>
                <ul className="mt-4 space-y-1.5 border-t border-white/5 pt-4">
                  {mod.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-xs text-screens-muted">
                      <Zap className={`mt-0.5 h-3 w-3 shrink-0 ${mod.accent}`} />
                      {h}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        {/* Platform switcher */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setActivePlatform("overview")}
              className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all ${
                activePlatform === "overview"
                  ? "border-2 border-fuchsia-500/50 bg-fuchsia-500/15 text-fuchsia-300 shadow-[0_0_24px_-6px_rgba(217,70,239,0.4)]"
                  : "border border-screens-border text-screens-muted hover:text-white"
              }`}
            >
              <Smartphone className="h-4 w-4" />
              Visão geral
            </button>
            {mobilePlatformCourses.map((c) => {
              const Icon = c.icon;
              const active = activePlatform === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setActivePlatform(c.id as "ios" | "android")}
                  className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all border-2 ${
                    active
                      ? `${c.borderStrong} ${c.bgStrong} ${c.accent} shadow-lg`
                      : "border-screens-border text-screens-muted hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {c.title}
                  <span className={`rounded-md px-1.5 py-0.5 text-[9px] font-bold ${active ? `${c.bg} ${c.accent}` : "bg-screens-bg text-screens-muted"}`}>
                    {c.modules.length} módulos
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Platform course content */}
        {activePlatform !== "overview" && (
          <div className="mb-12">
            {mobilePlatformCourses
              .filter((c) => c.id === activePlatform)
              .map((course) => (
                <PlatformCourse key={course.id} course={course} />
              ))}
          </div>
        )}

        {/* Both platforms side by side (overview) */}
        {activePlatform === "overview" && (
          <div className="grid gap-6 md:grid-cols-2 mb-12">
            {mobilePlatformCourses.map((course) => {
              const Icon = course.icon;
              return (
                <button
                  key={course.id}
                  onClick={() => setActivePlatform(course.id as "ios" | "android")}
                  className={`group rounded-2xl border-2 ${course.border} ${course.bg} p-6 text-left hover:${course.borderStrong} transition-all duration-200 hover:shadow-lg`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${course.border} bg-screens-bg/60 group-hover:scale-110 transition-transform`}>
                      <Icon className={`h-6 w-6 ${course.accent}`} />
                    </div>
                    <div>
                      <p className={`text-[10px] font-bold uppercase tracking-wider ${course.accent}`}>{course.subtitle}</p>
                      <h3 className="font-black text-lg">{course.title}</h3>
                    </div>
                  </div>
                  <p className="text-xs text-screens-muted leading-relaxed mb-4">{course.description}</p>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${course.accent}`}>{course.modules.length} módulos completos</span>
                    <span className={`flex items-center gap-1 text-xs ${course.accent} font-semibold`}>
                      Ver conteúdo <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                  <ul className="mt-4 pt-4 border-t border-screens-border grid grid-cols-2 gap-1.5">
                    {course.modules.slice(0, 4).map((m) => (
                      <li key={m.id} className="flex items-center gap-1.5 text-[11px] text-screens-muted">
                        <Check className={`h-3 w-3 ${course.accent} shrink-0`} />
                        <span className="truncate">{m.title}</span>
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>
        )}

        {/* Scan Mobile feature */}
        <div className="neon-card-highlight relative overflow-hidden p-8 md:p-10 mb-10">
          <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-cyan-500/5 to-transparent" />
          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-cyan-300">
                <Radar className="h-3.5 w-3.5" />
                Destaque · Exclusivo
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
                  <li key={p} className="flex items-center gap-2 text-xs text-zinc-300">
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
                    <p className="mt-2 text-xs leading-relaxed text-screens-muted">{s.desc}</p>
                  </div>
                </div>
              ))}
              <div className="mt-4 rounded-xl border border-dashed border-cyan-500/25 bg-black/30 p-4 font-mono text-[10px] text-cyan-300/80">
                <p className="text-cyan-400/60">// replay proxy flow</p>
                <p className="mt-1">
                  [Celular] → <span className="text-fuchsia-400">passador.171screens</span> →
                  [Análise] → [Result]
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing card */}
        <div className="mx-auto max-w-lg">
          <div className="rounded-2xl border-2 border-fuchsia-500/40 overflow-hidden">
            <div className="border-b border-fuchsia-500/25 bg-gradient-to-br from-fuchsia-500/20 to-violet-500/10 px-8 py-8 text-center">
              <p className="text-[10px] font-bold uppercase tracking-widest text-fuchsia-400 mb-1">
                {mobileCoursePricing.badge}
              </p>
              <h3 className="text-xl font-bold">{mobileCoursePricing.name}</h3>
              <p className="mt-4 text-5xl font-black text-fuchsia-300">
                {formatPrice(mobileCoursePricing.price)}
              </p>
              <p className="mt-2 text-xs text-screens-muted">iOS + Android + IA + Scan Mobile</p>
            </div>
            <div className="p-8 bg-screens-card/40">
              <p className="text-sm text-screens-muted leading-relaxed mb-6">
                {mobileCoursePricing.description}
              </p>
              <ul className="space-y-3 mb-8">
                {mobileCoursePricing.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-screens-muted">
                    <Check className="h-4 w-4 shrink-0 text-fuchsia-400" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-violet-600 py-3.5 text-sm font-bold text-white hover:opacity-90 transition hover:shadow-[0_0_30px_-5px_rgba(217,70,239,0.6)]"
              >
                Comprar Curso Mobile
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
