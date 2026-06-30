"use client";

import Link from "next/link";
import { useMemo, useState, type ComponentType } from "react";
import {
  Apple,
  Cpu,
  Lock,
  Play,
  Search,
  ChevronDown,
  BookOpen,
  CheckCircle2,
  Smartphone,
  Shield,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import {
  getMobileLessonsByPlatform,
  getMobileLessonCounts,
  MOBILE_CATEGORIES,
  MOBILE_PLATFORM_META,
  type MobileLesson,
  type MobilePlatform,
} from "@/lib/mobile-lessons";
import { hasMobileLessonAccess, hasMobilePlatformAccess } from "@/lib/mobile-access";
import type { SessionUser } from "@/lib/types";

const PLATFORMS: MobilePlatform[] = ["ios", "android"];

const PLATFORM_ICONS: Record<MobilePlatform, ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  ios:     Apple,
  android: Cpu,
};

const PLATFORM_HEX: Record<MobilePlatform, { primary: string; secondary: string }> = {
  ios:     { primary: "#a78bfa", secondary: "#7c3aed" },
  android: { primary: "#34d399", secondary: "#059669" },
};

export function MobileCourseHub({ user }: { user: SessionUser }) {
  const counts          = getMobileLessonCounts();
  const defaultPlatform: MobilePlatform = user.mobileIos ? "ios" : "android";
  const [activePlatform, setActivePlatform] = useState<MobilePlatform>(defaultPlatform);
  const [query, setQuery]                   = useState("");
  const [openCats, setOpenCats]             = useState<Record<string, boolean>>({});

  const theme           = MOBILE_PLATFORM_META[activePlatform];
  const hex             = PLATFORM_HEX[activePlatform];
  const platformUnlocked = hasMobilePlatformAccess(user, activePlatform);
  const allLessons      = getMobileLessonsByPlatform(activePlatform);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allLessons;
    return allLessons.filter(
      (l) => l.title.toLowerCase().includes(q) || l.intro.toLowerCase().includes(q)
    );
  }, [allLessons, query]);

  const grouped = useMemo(() => {
    const map = new Map<string, MobileLesson[]>();
    for (const lesson of filtered) {
      const list = map.get(lesson.categoryId) ?? [];
      list.push(lesson);
      map.set(lesson.categoryId, list);
    }
    return map;
  }, [filtered]);

  const accessibleCount = allLessons.filter((l) => hasMobileLessonAccess(user, l)).length;
  const progress        = allLessons.length > 0 ? Math.round((accessibleCount / allLessons.length) * 100) : 0;
  const firstLesson     = allLessons.find((l) => hasMobileLessonAccess(user, l));

  function toggleCat(id: string) {
    setOpenCats((p) => ({ ...p, [id]: p[id] === false }));
  }

  return (
    <div className="page-course min-h-full">
      {/* Ambient background */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.06]"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${hex.primary}, transparent)`,
        }}
      />

      <div className="relative flex flex-col lg:flex-row min-h-full">

        {/* ── Sidebar ── */}
        <aside className="lg:w-72 shrink-0 border-b lg:border-b-0 lg:border-r border-white/[0.05] p-5 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto sidebar-surface">
          <div className="pointer-events-none absolute inset-0 dot-grid opacity-20 lg:block hidden" />
          <div className="relative">

            {/* Header */}
            <div className="mb-6">
              <p
                className="font-mono text-[10px] uppercase tracking-[0.2em]"
                style={{ color: `${hex.primary}90` }}
              >
                // curso_mobile
              </p>
              <h1 className="mt-1 text-xl font-black gradient-text">Detecção Mobile</h1>
              <p className="text-[11px] text-screens-muted mt-1">
                {counts.total} aulas · iOS + Android
              </p>
            </div>

            {/* Platform selector */}
            <p className="label-xs mb-3">Plataforma</p>
            <div className="space-y-2">
              {PLATFORMS.map((p) => {
                const meta    = MOBILE_PLATFORM_META[p];
                const plHex   = PLATFORM_HEX[p];
                const Icon    = PLATFORM_ICONS[p];
                const ok      = hasMobilePlatformAccess(user, p);
                const active  = activePlatform === p;
                const n       = p === "ios" ? counts.ios : counts.android;

                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setActivePlatform(p)}
                    className={`w-full flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition-all duration-200 ${
                      active ? "text-white" : "text-screens-muted hover:bg-white/[0.04] hover:text-screens-muted-bright"
                    }`}
                    style={
                      active
                        ? {
                            background: `linear-gradient(135deg, ${plHex.primary}18, ${plHex.primary}08)`,
                            border: `1px solid ${plHex.primary}30`,
                            boxShadow: `0 0 16px ${plHex.primary}10`,
                          }
                        : { border: "1px solid transparent" }
                    }
                  >
                    <Icon
                      className="h-4.5 w-4.5 shrink-0"
                      style={active ? { color: plHex.primary, filter: `drop-shadow(0 0 6px ${plHex.primary}60)` } : { opacity: 0.4 }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold">{meta.label}</p>
                      <p className="text-[10px] text-screens-muted">{n} aulas</p>
                    </div>
                    {!ok && <Lock className="h-3 w-3 opacity-30 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* No-access message */}
            {!user.mobileIos && !user.mobileAndroid && user.role === "customer" && (
              <div
                className="mt-4 rounded-xl p-3.5 text-[11px] text-screens-muted leading-relaxed"
                style={{
                  background: "rgba(168,85,247,0.06)",
                  border: "1px solid rgba(168,85,247,0.15)",
                }}
              >
                Compra o Curso Mobile no Discord e sincroniza o cargo iOS ou Android.
              </div>
            )}

            {/* Category list */}
            <div className="mt-6 pt-5 border-t border-white/[0.05]">
              <p className="label-xs mb-3">Módulos</p>
              <div className="space-y-1.5">
                {MOBILE_CATEGORIES.map((cat) => (
                  <div key={cat.id} className="rounded-xl px-3 py-2.5">
                    <p className="text-[12px] font-semibold text-screens-muted-bright">{cat.label}</p>
                    <p className="text-[10px] text-screens-muted mt-0.5 leading-relaxed">{cat.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <div className="flex-1 min-w-0 p-5 lg:p-8">

          {/* Platform header */}
          <div
            className="relative overflow-hidden rounded-2xl p-6 md:p-8 mb-6 animate-fade-in-up"
            style={{
              background: `linear-gradient(135deg, ${hex.primary}12 0%, ${hex.secondary}06 40%, rgba(12,12,24,0.85) 100%)`,
              border: `1px solid ${hex.primary}22`,
              boxShadow: `0 0 40px ${hex.primary}08, inset 0 1px 0 ${hex.primary}10`,
              backdropFilter: "blur(16px)",
            }}
          >
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-15 animate-pulse-glow"
              style={{
                background: `radial-gradient(circle, ${hex.primary}, transparent 70%)`,
                filter: "blur(40px)",
              }}
            />

            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              <div>
                <p
                  className="text-xs font-black uppercase tracking-widest mb-2"
                  style={{ color: hex.primary }}
                >
                  {theme.label}
                </p>
                <h2 className="text-2xl font-black text-white">
                  Detectar Bypass {activePlatform === "ios" ? "iOS" : "Android"}
                </h2>
                <p className="mt-2 text-sm text-screens-muted max-w-lg leading-relaxed">
                  {activePlatform === "ios"
                    ? "Jailbreak, Brevet, proxy, IPA modificado e fluxo completo de SS iOS."
                    : "Root, Magisk, GameGuardian, APK modificado, emulador e SS Android completa."}
                </p>
              </div>

              <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
                <div className="text-right">
                  <p
                    className="font-mono text-3xl font-black"
                    style={{ color: hex.primary, textShadow: `0 0 20px ${hex.primary}50` }}
                  >
                    {progress}%
                  </p>
                  <p className="text-[10px] text-screens-muted uppercase tracking-wider">
                    desbloqueado
                  </p>
                </div>
                {firstLesson && platformUnlocked && (
                  <Link
                    href={`/dashboard/curso-mobile/${firstLesson.id}`}
                    className="btn-primary"
                    style={{
                      background: `linear-gradient(135deg, ${hex.primary}, ${hex.secondary})`,
                      boxShadow: `0 0 20px ${hex.primary}40`,
                    }}
                  >
                    <Play className="h-4 w-4" />
                    Começar curso
                  </Link>
                )}
              </div>
            </div>

            {/* Progress bar */}
            <div className="relative mt-5">
              <div className="flex justify-between text-[11px] mb-1.5">
                <span className="text-screens-muted flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" /> Progresso
                </span>
                <span className="font-bold text-screens-muted-bright">
                  {accessibleCount}/{allLessons.length} aulas
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-screens-border/40">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${progress}%`,
                    background: `linear-gradient(90deg, ${hex.primary}, ${hex.secondary})`,
                    boxShadow: `0 0 8px ${hex.primary}60`,
                    transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 mb-5 animate-fade-in-up delay-100">
            {[
              { label: "Total de aulas", value: allLessons.length },
              { label: "Disponíveis",    value: accessibleCount },
              { label: "Módulos",        value: grouped.size },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-2xl border border-white/[0.07] p-4 text-center hover-lift"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                  backdropFilter: "blur(8px)",
                }}
              >
                <p
                  className="text-2xl font-black"
                  style={{ color: hex.primary, textShadow: `0 0 16px ${hex.primary}40` }}
                >
                  {value}
                </p>
                <p className="text-[11px] text-screens-muted mt-1">{label}</p>
              </div>
            ))}
          </div>

          {/* Search */}
          <div className="relative mb-5 animate-fade-in-up delay-150">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-screens-muted pointer-events-none" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Buscar aula ${activePlatform === "ios" ? "iOS" : "Android"}...`}
              className="input-premium pl-11"
            />
          </div>

          {/* Content */}
          {!platformUnlocked ? (
            <div
              className="rounded-2xl border border-white/[0.08] p-12 text-center animate-fade-in-up"
              style={{
                background: "linear-gradient(135deg, rgba(168,85,247,0.07), rgba(12,12,24,0.9))",
                backdropFilter: "blur(16px)",
              }}
            >
              <div
                className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl"
                style={{
                  background: `${hex.primary}12`,
                  border: `1px solid ${hex.primary}25`,
                }}
              >
                <Shield className="h-7 w-7" style={{ color: hex.primary, opacity: 0.8 }} />
              </div>
              <h3 className="text-xl font-black text-white">Módulo bloqueado</h3>
              <p className="mt-3 text-sm text-screens-muted max-w-sm mx-auto leading-relaxed">
                Você precisa do cargo{" "}
                <strong style={{ color: hex.primary }}>{theme.label}</strong> no Discord para
                acessar este módulo.
              </p>
              <a
                href="https://discord.gg/CXkyv3QF9X"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 btn-secondary inline-flex"
                style={{ borderColor: `${hex.primary}30`, color: hex.primary }}
              >
                Comprar no Discord
              </a>
            </div>
          ) : filtered.length === 0 ? (
            <div
              className="rounded-2xl border border-white/[0.07] p-10 text-center animate-fade-in"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <Smartphone className="mx-auto h-10 w-10 text-screens-muted mb-4 opacity-30" />
              <p className="text-screens-muted text-sm">
                Nenhuma aula encontrada para &ldquo;{query}&rdquo;.
              </p>
            </div>
          ) : (
            <div className="space-y-3 animate-fade-in-up delay-200">
              {[...grouped.entries()].map(([catId, catLessons], catIdx) => {
                const cat    = MOBILE_CATEGORIES.find((c) => c.id === catId);
                const isOpen = openCats[catId] !== false;
                const accessCount = catLessons.filter((l) => hasMobileLessonAccess(user, l)).length;
                const catPct = catLessons.length ? (accessCount / catLessons.length) * 100 : 0;

                return (
                  <div
                    key={catId}
                    className="overflow-hidden rounded-2xl border border-white/[0.07] transition-all duration-200"
                    style={{
                      background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                      backdropFilter: "blur(12px)",
                      animationDelay: `${catIdx * 60}ms`,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => toggleCat(catId)}
                      className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-white/[0.03] transition-colors duration-200"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="font-mono text-[10px] font-black uppercase tracking-wider"
                            style={{ color: hex.primary }}
                          >
                            {cat?.label ?? catId.toUpperCase()}
                          </span>
                          <span className="text-[10px] text-screens-muted">· {catLessons.length} aulas</span>
                        </div>
                        <p className="font-semibold text-sm text-white">{cat?.description ?? catId}</p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        {/* Category progress */}
                        <div className="hidden sm:flex items-center gap-2">
                          <div className="w-16 h-1.5 rounded-full bg-screens-border/40 overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-700"
                              style={{ width: `${catPct}%`, background: hex.primary }}
                            />
                          </div>
                          {accessCount === catLessons.length && accessCount > 0 && (
                            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" style={{ color: "#34d399" }} />
                          )}
                        </div>
                        <ChevronDown
                          className={`h-5 w-5 text-screens-muted transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="border-t border-white/[0.05] divide-y divide-white/[0.04]">
                        {catLessons.map((lesson, idx) => {
                          const accessible = hasMobileLessonAccess(user, lesson);
                          return accessible ? (
                            <Link
                              key={lesson.id}
                              href={`/dashboard/curso-mobile/${lesson.id}`}
                              className="group flex items-center gap-4 px-5 py-4 transition-all duration-200 hover:bg-white/[0.04]"
                            >
                              <div
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                                style={{
                                  background: `${hex.primary}12`,
                                  border: `1px solid ${hex.primary}25`,
                                }}
                              >
                                <span
                                  className="font-mono text-[10px] font-black"
                                  style={{ color: hex.primary }}
                                >
                                  {String(idx + 1).padStart(2, "0")}
                                </span>
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="font-semibold text-sm text-white group-hover:text-white/90 transition-colors">
                                  {lesson.title}
                                </p>
                                <p className="text-xs text-screens-muted truncate mt-0.5">
                                  {lesson.intro}
                                </p>
                              </div>
                              <ArrowRight className="h-4 w-4 text-screens-muted shrink-0 opacity-0 group-hover:opacity-60 transition-all duration-200 group-hover:translate-x-0.5" />
                            </Link>
                          ) : (
                            <div
                              key={lesson.id}
                              className="flex items-center gap-4 px-5 py-4 opacity-35"
                            >
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.02]">
                                <Lock className="h-3.5 w-3.5 text-screens-muted" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="font-medium text-sm text-screens-muted">{lesson.title}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Footer tip */}
          {platformUnlocked && filtered.length > 0 && (
            <div
              className="mt-5 flex items-center gap-2.5 rounded-xl px-4 py-3 text-xs text-screens-muted animate-fade-in-up"
              style={{
                background: "rgba(52,211,153,0.05)",
                border: "1px solid rgba(52,211,153,0.12)",
              }}
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-neon-green shrink-0" />
              Cruza evidências antes de emitir veredito. Documenta com print e data/hora.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
