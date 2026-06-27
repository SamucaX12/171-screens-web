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

const PLATFORM_ICONS: Record<MobilePlatform, ComponentType<{ className?: string }>> = {
  ios:     Apple,
  android: Cpu,
};

export function MobileCourseHub({ user }: { user: SessionUser }) {
  const counts = getMobileLessonCounts();
  const defaultPlatform: MobilePlatform = user.mobileIos ? "ios" : "android";
  const [activePlatform, setActivePlatform] = useState<MobilePlatform>(defaultPlatform);
  const [query, setQuery] = useState("");
  const [openCats, setOpenCats] = useState<Record<string, boolean>>({});

  const theme = MOBILE_PLATFORM_META[activePlatform];
  const platformUnlocked = hasMobilePlatformAccess(user, activePlatform);
  const allLessons = getMobileLessonsByPlatform(activePlatform);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allLessons;
    return allLessons.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        l.intro.toLowerCase().includes(q)
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
  const progress = allLessons.length > 0 ? Math.round((accessibleCount / allLessons.length) * 100) : 0;
  const firstLesson = allLessons.find((l) => hasMobileLessonAccess(user, l));

  function toggleCat(id: string) {
    setOpenCats((p) => ({ ...p, [id]: p[id] === false ? true : false }));
  }

  return (
    <div className="dash-invaded min-h-full">
      <div className="pointer-events-none fixed inset-0 cyber-grid opacity-20" />

      <div className="relative flex flex-col lg:flex-row min-h-full">
        {/* ── Sidebar ─────────────────────────────────────── */}
        <aside className="lg:w-72 shrink-0 border-b lg:border-b-0 lg:border-r border-fuchsia-500/15 bg-black/40 p-5 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto backdrop-blur-xl">
          <div className="mb-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-fuchsia-400/80">
              // curso_mobile
            </p>
            <h1 className="mt-1 text-lg font-black gradient-text">Detecção Mobile</h1>
            <p className="text-[11px] text-screens-muted mt-1">
              {counts.total} aulas · iOS + Android
            </p>
          </div>

          <p className="label-xs mb-2 text-cyan-400/70">Plataforma</p>
          <div className="space-y-1.5">
            {PLATFORMS.map((p) => {
              const meta = MOBILE_PLATFORM_META[p];
              const Icon = PLATFORM_ICONS[p];
              const ok = hasMobilePlatformAccess(user, p);
              const active = activePlatform === p;
              const n = p === "ios" ? counts.ios : counts.android;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setActivePlatform(p)}
                  className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition border ${
                    active
                      ? `${meta.border} bg-white/[0.06] text-white ${meta.glow}`
                      : "border-transparent text-screens-muted hover:bg-white/[0.03] hover:border-white/5"
                  }`}
                >
                  <Icon className={`h-4 w-4 shrink-0 ${active ? meta.color : "opacity-40"}`} />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{meta.label}</p>
                    <p className="text-[10px] text-screens-muted">{n} aulas</p>
                  </div>
                  {!ok && <Lock className="h-3 w-3 opacity-40" />}
                </button>
              );
            })}
          </div>

          {!user.mobileIos && !user.mobileAndroid && user.role === "customer" && (
            <div className="mt-4 neon-card border-fuchsia-500/20 p-3 text-[11px] text-screens-muted leading-relaxed">
              Compra o Curso Mobile no Discord e sincroniza o cargo iOS ou Android para desbloquear.
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-white/5">
            <p className="label-xs mb-2 text-zinc-500">Categorias</p>
            <div className="space-y-1">
              {MOBILE_CATEGORIES.map((cat) => (
                <div key={cat.id} className="px-2 py-1.5 rounded-lg text-[11px] text-screens-muted">
                  <p className="font-semibold text-zinc-400">{cat.label}</p>
                  <p className="text-zinc-600 text-[10px] mt-0.5">{cat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* ── Main Content ────────────────────────────────── */}
        <div className="flex-1 min-w-0 p-5 lg:p-8">
          {/* Header card */}
          <div className="neon-card-highlight mb-6 p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className={`text-xs font-bold uppercase tracking-widest ${theme.color}`}>
                  {theme.label}
                </p>
                <h2 className="mt-2 text-2xl font-black">
                  Detectar Bypass {activePlatform === "ios" ? "iOS" : "Android"}
                </h2>
                <p className="mt-2 text-sm text-screens-muted max-w-xl">
                  {activePlatform === "ios"
                    ? "Jailbreak, Brevet, proxy, IPA modificado e fluxo completo de SS iOS."
                    : "Root, Magisk, GameGuardian, APK modificado, emulador e SS Android completa."}
                </p>
              </div>
              <div className="flex flex-col items-start md:items-end gap-3">
                <div className="text-right">
                  <p className={`font-mono text-3xl font-black ${theme.color}`}>{progress}%</p>
                  <p className="text-[10px] text-screens-muted uppercase tracking-wider">desbloqueado</p>
                </div>
                {firstLesson && platformUnlocked && (
                  <Link
                    href={`/dashboard/curso-mobile/${firstLesson.id}`}
                    className={`btn-primary !bg-gradient-to-r !text-white border-0 ${
                      activePlatform === "ios"
                        ? "!from-zinc-500 !to-zinc-700"
                        : "!from-emerald-600 !to-teal-600"
                    }`}
                  >
                    <Play className="h-4 w-4" />
                    Começar curso
                  </Link>
                )}
              </div>
            </div>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-black/50">
              <div
                className={`h-full rounded-full transition-all bg-gradient-to-r ${theme.accent}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-screens-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Buscar aula ${activePlatform === "ios" ? "iOS" : "Android"}...`}
              className="w-full rounded-xl border border-white/10 bg-black/40 py-3 pl-10 pr-4 text-sm backdrop-blur-sm focus:border-fuchsia-500/40 focus:outline-none"
            />
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: "Total de aulas", value: allLessons.length },
              { label: "Disponíveis", value: accessibleCount },
              { label: "Módulos", value: grouped.size },
            ].map(({ label, value }) => (
              <div key={label} className="neon-card p-4 text-center">
                <p className={`text-2xl font-black ${theme.color}`}>{value}</p>
                <p className="text-[11px] text-screens-muted mt-1">{label}</p>
              </div>
            ))}
          </div>

          {/* Locked state */}
          {!platformUnlocked ? (
            <div className="neon-card p-12 text-center">
              <div className={`mx-auto h-16 w-16 rounded-2xl border flex items-center justify-center mb-6 ${theme.border}`}>
                <Lock className={`h-7 w-7 ${theme.color} opacity-60`} />
              </div>
              <h3 className="text-xl font-black">Módulo bloqueado</h3>
              <p className="mt-3 text-sm text-screens-muted max-w-sm mx-auto">
                Você precisa do cargo <strong className={theme.color}>{theme.label}</strong> no
                Discord para acessar este módulo.
              </p>
              <a
                href="https://discord.gg/35Aw934hNh"
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 inline-flex btn-secondary border ${theme.border} ${theme.color}`}
              >
                Comprar no Discord
              </a>
            </div>
          ) : filtered.length === 0 ? (
            <div className="neon-card p-10 text-center">
              <Smartphone className="mx-auto h-10 w-10 text-screens-muted mb-4 opacity-40" />
              <p className="text-screens-muted text-sm">Nenhuma aula encontrada para "{query}".</p>
            </div>
          ) : (
            /* Lesson categories */
            <div className="space-y-4">
              {[...grouped.entries()].map(([catId, lessons]) => {
                const cat = MOBILE_CATEGORIES.find((c) => c.id === catId);
                const isOpen = openCats[catId] !== false;
                return (
                  <div key={catId} className="neon-card overflow-hidden">
                    <button
                      type="button"
                      onClick={() => toggleCat(catId)}
                      className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-white/[0.02] transition"
                    >
                      <div>
                        <p className={`font-mono text-[10px] ${theme.color}`}>
                          {cat?.label ?? catId.toUpperCase()} · {lessons.length} aulas
                        </p>
                        <p className="font-bold mt-0.5">{cat?.description ?? catId}</p>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 text-screens-muted transition ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {isOpen && (
                      <div className="border-t border-white/5 divide-y divide-white/5">
                        {lessons.map((lesson, idx) => {
                          const accessible = hasMobileLessonAccess(user, lesson);
                          return accessible ? (
                            <Link
                              key={lesson.id}
                              href={`/dashboard/curso-mobile/${lesson.id}`}
                              className="flex items-center gap-4 px-5 py-4 transition hover:bg-white/[0.04] group"
                            >
                              <div
                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${theme.border} bg-black/30`}
                              >
                                <span className={`font-mono text-[10px] font-bold ${theme.color}`}>
                                  {String(idx + 1).padStart(2, "0")}
                                </span>
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="font-semibold text-sm group-hover:text-white transition">
                                  {lesson.title}
                                </p>
                                <p className="text-xs text-screens-muted truncate mt-0.5">
                                  {lesson.intro}
                                </p>
                              </div>
                              <BookOpen className="h-4 w-4 text-screens-muted shrink-0 opacity-0 group-hover:opacity-100 transition" />
                            </Link>
                          ) : (
                            <div
                              key={lesson.id}
                              className="flex items-center gap-4 px-5 py-4 opacity-40"
                            >
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black/30">
                                <Lock className="h-3.5 w-3.5" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="font-medium text-sm">{lesson.title}</p>
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

          {platformUnlocked && filtered.length > 0 && (
            <div className="mt-6 flex items-center gap-2 rounded-xl border border-screens-border px-4 py-3 text-xs text-screens-muted">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              Cruza evidências antes de emitir veredito. Documenta com print e data/hora.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
