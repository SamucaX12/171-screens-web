"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  BookOpen,
  ChevronDown,
  GraduationCap,
  HelpCircle,
  LayoutGrid,
  List,
  Lock,
  Play,
  Search,
  Bot,
  Sparkles,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import type { LessonSummary } from "@/lib/lessons";
import { categories } from "@/lib/lessons/types";
import { CATEGORY_META, groupLessonsByCategory } from "@/lib/lessons/meta";
import { hasTierAccess, hasLessonAccess, isBoosterLimited } from "@/lib/tier-access";
import { BOOSTER_LESSON_COUNT } from "@/lib/booster-lessons";
import { TIER_ORDER, TIER_THEME } from "@/lib/tier-theme";
import type { CourseTier, SessionUser } from "@/lib/types";

export function CourseHub({
  user,
  counts,
  catalog,
}: {
  user: SessionUser;
  counts: { tier1: number; tier2: number; tier3: number; total: number };
  catalog: LessonSummary[];
}) {
  const [query, setQuery]         = useState("");
  const [activeTier, setActiveTier] = useState<CourseTier>(user.courseTier ?? "tier1");
  const [openCats, setOpenCats]   = useState<Record<string, boolean>>({});
  const [viewMode, setViewMode]   = useState<"grid" | "list">("grid");

  const boosterMode = isBoosterLimited(user.courseTier, user.accessSource, user.role);

  const accessible = useMemo(
    () => catalog.filter((l) => hasLessonAccess(user, l)),
    [catalog, user]
  );

  const tierLessons = useMemo(() => {
    const q = query.trim().toLowerCase();
    return catalog
      .filter((l) => l.tier === activeTier)
      .filter((l) => {
        if (!q) return true;
        return (
          l.title.toLowerCase().includes(q) ||
          l.intro.toLowerCase().includes(q) ||
          CATEGORY_META[l.categoryId]?.label.toLowerCase().includes(q)
        );
      });
  }, [catalog, activeTier, query]);

  const grouped = useMemo(() => groupLessonsByCategory(tierLessons), [tierLessons]);
  const theme   = TIER_THEME[activeTier];
  const tierUnlocked     = hasTierAccess(user.courseTier, activeTier, user.role);
  const boosterTierActive = boosterMode && activeTier === "tier1";
  const progressDenominator = boosterTierActive ? BOOSTER_LESSON_COUNT : tierLessons.length;
  const progressNumerator   = boosterTierActive
    ? accessible.filter((l) => l.tier === "tier1").length
    : accessible.filter((l) => l.tier === activeTier).length;
  const progress = progressDenominator > 0 ? Math.round((progressNumerator / progressDenominator) * 100) : 0;
  const firstAccessible = tierLessons.find((l) => hasLessonAccess(user, l));

  function toggleCat(id: string) {
    setOpenCats((p) => ({ ...p, [id]: !(p[id] ?? true) }));
  }

  const tierCountKey: Record<CourseTier, number> = {
    tier1: counts.tier1,
    tier2: counts.tier2,
    tier3: counts.tier3,
  };

  return (
    <div className="page-course min-h-full">
      <div className="flex flex-col lg:flex-row min-h-full">

        {/* ── Sidebar ── */}
        <aside className="lg:w-64 shrink-0 border-b lg:border-b-0 lg:border-r border-white/[0.05] p-5 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto sidebar-surface">
          <div className="pointer-events-none absolute inset-0 dot-grid opacity-20 lg:block hidden" />
          <div className="relative">

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl shrink-0"
                style={{ background: "linear-gradient(135deg, #a855f7, #0ea5e9)", boxShadow: "0 0 16px rgba(168,85,247,0.3)" }}
              >
                <GraduationCap className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Meu Curso</p>
                <p className="text-[11px] text-screens-muted">{counts.total} aulas</p>
              </div>
            </div>

            {/* Tier selector */}
            <p className="label-xs mb-3">Selecionar Tier</p>
            <div className="space-y-1.5">
              {TIER_ORDER.map((tierId) => {
                const th  = TIER_THEME[tierId];
                const ok  = hasTierAccess(user.courseTier, tierId, user.role);
                const act = activeTier === tierId;
                const n   = tierCountKey[tierId];
                return (
                  <button
                    key={tierId}
                    type="button"
                    onClick={() => setActiveTier(tierId)}
                    className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-all duration-200 ${
                      act ? "text-white" : "text-screens-muted hover:bg-white/[0.04] hover:text-screens-muted-bright"
                    }`}
                    style={
                      act
                        ? {
                            background: `linear-gradient(135deg, ${th.hexColor}18, ${th.hexColor}08)`,
                            border: `1px solid ${th.hexColor}30`,
                            boxShadow: `0 0 16px ${th.hexColor}12, inset 0 1px 0 ${th.hexColor}10`,
                          }
                        : { border: "1px solid transparent" }
                    }
                  >
                    <span
                      className="h-2 w-2 rounded-full shrink-0 transition-all duration-200"
                      style={{
                        backgroundColor: th.hexColor,
                        boxShadow: act ? `0 0 8px ${th.hexColor}` : "none",
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-[13px]">{th.name}</p>
                      <p className="text-[10px] text-screens-muted">{n} aulas · {th.price}</p>
                    </div>
                    {!ok && <Lock className="h-3 w-3 opacity-30 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Booster info */}
            {user.accessSource === "booster" && (
              <div
                className="mt-4 rounded-xl p-3 text-[11px] text-screens-muted"
                style={{ background: "rgba(168,85,247,0.06)", border: "1px solid rgba(168,85,247,0.15)" }}
              >
                <Sparkles className="h-3 w-3 inline mr-1" style={{ color: "#a855f7" }} />
                Booster · {BOOSTER_LESSON_COUNT} aulas grátis.{" "}
                <Link href="/comprar" className="text-white hover:text-neon-purple underline transition-colors">
                  Upgrade
                </Link>
              </div>
            )}

            {/* Guide link */}
            <Link
              href="/dashboard/como-usar"
              className="mt-4 flex items-center gap-2 rounded-xl px-3 py-2.5 text-[12px] text-screens-muted hover:bg-white/[0.04] hover:text-white transition-all duration-200"
            >
              <HelpCircle className="h-3.5 w-3.5 shrink-0" />
              Guia completo
            </Link>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main className="flex-1 min-w-0 p-5 md:p-8 max-w-5xl">

          {/* Tier header card */}
          <div
            className="relative overflow-hidden rounded-2xl p-6 md:p-8 mb-6 animate-fade-in-up"
            style={{
              background: `linear-gradient(135deg, ${theme.hexColor}14 0%, ${theme.hexColor}06 40%, rgba(12,12,24,0.8) 100%)`,
              border: `1px solid ${theme.hexColor}25`,
              boxShadow: `0 0 40px ${theme.hexColor}08, inset 0 1px 0 ${theme.hexColor}12`,
              backdropFilter: "blur(16px)",
            }}
          >
            <div
              className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-20 animate-pulse-glow"
              style={{ background: `radial-gradient(circle, ${theme.hexColor}, transparent 70%)`, filter: "blur(40px)" }}
            />

            <div className="relative flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="rounded-lg px-2.5 py-1 text-[10px] font-black uppercase tracking-widest"
                    style={{
                      background: `${theme.hexColor}18`,
                      color: theme.hexColor,
                      border: `1px solid ${theme.hexColor}30`,
                    }}
                  >
                    {theme.short}
                  </span>
                  <span className="text-[10px] text-screens-muted">{theme.badge}</span>
                </div>
                <h1 className="text-xl font-black tracking-tight text-white">
                  {theme.name} — {theme.description.split(".")[0]}
                </h1>
                <p className="mt-1.5 text-sm text-screens-muted">
                  {boosterTierActive
                    ? `${BOOSTER_LESSON_COUNT} aulas liberadas (booster)`
                    : `${tierLessons.length} aulas neste tier`}
                  {!tierUnlocked && " · Compra para liberar"}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 shrink-0">
                {tierUnlocked && firstAccessible && (
                  <Link href={`/dashboard/curso/${firstAccessible.id}`} className="btn-primary">
                    <Play className="h-4 w-4" />
                    Começar
                  </Link>
                )}
                <Link href="/dashboard/curso/tutor" className="btn-secondary">
                  <Bot className="h-4 w-4" />
                  Tutor IA
                </Link>
              </div>
            </div>

            {/* Progress */}
            {tierUnlocked && (
              <div className="relative mt-6">
                <div className="flex justify-between text-[11px] mb-2">
                  <span className="text-screens-muted flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> Progresso
                  </span>
                  <span className="font-black" style={{ color: theme.hexColor }}>
                    {progress}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-screens-border/40">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${progress}%`,
                      background: `linear-gradient(90deg, ${theme.hexColor}, ${theme.hexColor}90)`,
                      boxShadow: `0 0 8px ${theme.hexColor}60`,
                      transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
                    }}
                  />
                </div>
                <p className="mt-1 text-[10px] text-screens-muted">
                  {progressNumerator} de {progressDenominator} aulas acessadas
                </p>
              </div>
            )}
          </div>

          {/* Search + view mode */}
          <div className="flex flex-col sm:flex-row gap-2 mb-5 animate-fade-in-up delay-100">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-screens-muted pointer-events-none" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Buscar em ${theme.name}...`}
                className="input-premium pl-10"
              />
            </div>
            <div
              className="flex rounded-xl border border-screens-border/70 p-1 shrink-0"
              style={{ background: "rgba(12,12,24,0.8)", backdropFilter: "blur(8px)" }}
            >
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-all duration-200 ${
                  viewMode === "grid"
                    ? "bg-white/[0.08] text-white"
                    : "text-screens-muted hover:text-screens-muted-bright"
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" /> Grid
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-all duration-200 ${
                  viewMode === "list"
                    ? "bg-white/[0.08] text-white"
                    : "text-screens-muted hover:text-screens-muted-bright"
                }`}
              >
                <List className="h-3.5 w-3.5" /> Lista
              </button>
            </div>
          </div>

          {/* Category groups */}
          <div className="space-y-3 animate-fade-in-up delay-200">
            {categories
              .filter((c) => grouped.has(c.id))
              .map((cat, catIndex) => {
                const items       = grouped.get(cat.id)!;
                const meta        = CATEGORY_META[cat.id];
                const isOpen      = openCats[cat.id] ?? true;
                const accessCount = items.filter((l) => hasLessonAccess(user, l)).length;
                const catProgress = items.length ? (accessCount / items.length) * 100 : 0;

                return (
                  <section
                    key={cat.id}
                    className="overflow-hidden rounded-2xl border border-white/[0.07] transition-all duration-200"
                    style={{
                      background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                      backdropFilter: "blur(12px)",
                      animationDelay: `${catIndex * 50}ms`,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => toggleCat(cat.id)}
                      className="flex w-full items-center gap-3 px-5 py-4 text-left hover:bg-white/[0.03] transition-colors duration-200"
                    >
                      <span
                        className="text-[10px] font-black uppercase tracking-widest w-10 shrink-0"
                        style={{ color: theme.hexColor }}
                      >
                        {meta?.short}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-white">{meta?.label ?? cat.label}</p>
                        <p className="text-xs text-screens-muted">
                          {accessCount}/{items.length} aulas
                          {accessCount === items.length && (
                            <span className="ml-1.5 text-neon-green">· completo</span>
                          )}
                        </p>
                      </div>

                      {/* Mini progress */}
                      <div className="hidden sm:flex items-center gap-3 shrink-0">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 rounded-full bg-screens-border/40 overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-700"
                              style={{
                                width: `${catProgress}%`,
                                background: theme.hexColor,
                                boxShadow: `0 0 4px ${theme.hexColor}60`,
                              }}
                            />
                          </div>
                          {accessCount === items.length && (
                            <CheckCircle2 className="h-3.5 w-3.5 text-neon-green shrink-0" />
                          )}
                        </div>
                        <ChevronDown
                          className={`h-4 w-4 text-screens-muted transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        />
                      </div>
                      <ChevronDown
                        className={`sm:hidden h-4 w-4 text-screens-muted transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {isOpen && (
                      <div className="border-t border-white/[0.05] p-3 md:p-4">
                        {viewMode === "grid" ? (
                          <div className="grid gap-3 sm:grid-cols-2">
                            {items.map((l, i) => (
                              <LessonCard key={l.id} lesson={l} index={i} user={user} boosterMode={boosterMode} theme={theme} />
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-0.5">
                            {items.map((l, i) => (
                              <LessonRow key={l.id} lesson={l} index={i} user={user} boosterMode={boosterMode} theme={theme} />
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </section>
                );
              })}

            {!tierLessons.length && (
              <div className="glass-card p-12 text-center text-screens-muted text-sm">
                Nenhuma aula encontrada para &ldquo;{query}&rdquo;
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

/* ── Lesson Card (Grid) ── */
function LessonCard({
  lesson: l,
  index: i,
  user,
  boosterMode,
  theme,
}: {
  lesson: LessonSummary;
  index: number;
  user: SessionUser;
  boosterMode: boolean;
  theme: (typeof TIER_THEME)[keyof typeof TIER_THEME];
}) {
  const ok = hasLessonAccess(user, l);
  const lockedReason = !ok && boosterMode && l.tier === "tier1" ? "booster" : "tier";

  return (
    <Link
      href={ok ? `/dashboard/curso/${l.id}` : "/comprar"}
      className={`group block overflow-hidden rounded-xl border transition-all duration-300 ${
        ok
          ? "border-white/[0.07] hover:border-white/[0.13]"
          : "border-white/[0.04] opacity-40 pointer-events-none"
      }`}
      style={{
        background: ok
          ? "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))"
          : "rgba(255,255,255,0.02)",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/7] overflow-hidden bg-screens-bg border-b border-white/[0.05]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/lessons/${l.id}.svg`}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover object-top opacity-40 group-hover:opacity-60 transition-opacity duration-300"
        />

        {/* Number badge */}
        <span
          className="absolute top-2 left-2 rounded-md px-1.5 py-0.5 font-mono text-[10px] font-black"
          style={{
            color: theme.hexColor,
            background: "rgba(3,3,6,0.85)",
            border: `1px solid ${theme.hexColor}25`,
          }}
        >
          {String(i + 1).padStart(2, "0")}
        </span>

        {!ok && (
          <div className="absolute inset-0 flex items-center justify-center bg-screens-bg/80">
            <Lock className="h-4 w-4 text-screens-muted" />
          </div>
        )}

        {ok && (
          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-full"
              style={{ background: theme.hexColor, boxShadow: `0 0 12px ${theme.hexColor}60` }}
            >
              <Play className="h-3 w-3 text-black" />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3.5">
        <p className="text-sm font-semibold line-clamp-2 text-white group-hover:text-white/90 transition-colors">
          {l.title}
        </p>
        <p className="mt-1 text-[11px] text-screens-muted line-clamp-2 leading-relaxed">
          {lockedReason === "booster" ? "Compra Tier I para liberar" : l.intro}
        </p>
        {ok && (
          <div className="mt-2.5 flex items-center gap-1 text-[10px] text-screens-muted group-hover:text-screens-muted-bright transition-colors">
            <ArrowRight className="h-3 w-3" />
            Abrir aula
          </div>
        )}
      </div>
    </Link>
  );
}

/* ── Lesson Row (List) ── */
function LessonRow({
  lesson: l,
  index: i,
  user,
  boosterMode,
  theme,
}: {
  lesson: LessonSummary;
  index: number;
  user: SessionUser;
  boosterMode: boolean;
  theme: (typeof TIER_THEME)[keyof typeof TIER_THEME];
}) {
  const ok = hasLessonAccess(user, l);
  const lockedReason = !ok && boosterMode && l.tier === "tier1" ? "booster" : "tier";

  return (
    <Link
      href={ok ? `/dashboard/curso/${l.id}` : "/comprar"}
      className={`group flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-200 ${
        ok ? "hover:bg-white/[0.05]" : "opacity-40 pointer-events-none"
      }`}
    >
      <span
        className="text-[10px] font-black font-mono w-6 shrink-0"
        style={{ color: theme.hexColor }}
      >
        {String(i + 1).padStart(2, "0")}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium truncate text-white group-hover:text-white/90">{l.title}</p>
        <p className="text-[11px] text-screens-muted truncate mt-0.5">
          {lockedReason === "booster" ? "Compra Tier I para liberar" : l.intro}
        </p>
      </div>
      {ok ? (
        <BookOpen
          className="h-3.5 w-3.5 shrink-0 opacity-0 group-hover:opacity-60 transition-opacity"
          style={{ color: theme.hexColor }}
        />
      ) : (
        <Lock className="h-3 w-3 text-screens-muted shrink-0" />
      )}
    </Link>
  );
}
