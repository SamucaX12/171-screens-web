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
  const [query, setQuery] = useState("");
  const [activeTier, setActiveTier] = useState<CourseTier>(user.courseTier ?? "tier1");
  const [openCats, setOpenCats] = useState<Record<string, boolean>>({});
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

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
  const theme = TIER_THEME[activeTier];
  const tierUnlocked = hasTierAccess(user.courseTier, activeTier, user.role);
  const boosterTierActive = boosterMode && activeTier === "tier1";
  const progressDenominator = boosterTierActive ? BOOSTER_LESSON_COUNT : tierLessons.length;
  const progressNumerator = boosterTierActive
    ? accessible.filter((l) => l.tier === "tier1").length
    : accessible.filter((l) => l.tier === activeTier).length;
  const progress =
    progressDenominator > 0 ? Math.round((progressNumerator / progressDenominator) * 100) : 0;

  const firstAccessible = tierLessons.find((l) => hasLessonAccess(user, l));

  function toggleCat(id: string) {
    setOpenCats((p) => ({ ...p, [id]: !(p[id] ?? true) }));
  }

  return (
    <div className="page-course min-h-full">
      <div className="flex flex-col lg:flex-row min-h-full">
        <aside className="lg:w-64 shrink-0 border-b lg:border-b-0 lg:border-r border-screens-border p-5 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-screens-border bg-screens-card">
              <GraduationCap className="h-4 w-4 text-zinc-400" />
            </div>
            <div>
              <p className="text-sm font-semibold">Meu Curso</p>
              <p className="text-[11px] text-screens-muted">{counts.total} aulas</p>
            </div>
          </div>

          <p className="label-xs mb-2">Tier</p>
          <div className="space-y-1">
            {TIER_ORDER.map((tierId) => {
              const th = TIER_THEME[tierId];
              const ok = hasTierAccess(user.courseTier, tierId, user.role);
              const active = activeTier === tierId;
              const n = counts[tierId];
              return (
                <button
                  key={tierId}
                  type="button"
                  onClick={() => setActiveTier(tierId)}
                  className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                    active ? "bg-white/[0.06] text-white" : "text-screens-muted hover:bg-white/[0.03]"
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full shrink-0 ${th.dot}`} />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{th.name}</p>
                    <p className="text-[10px] text-screens-muted">{n} aulas · {th.price}</p>
                  </div>
                  {!ok && <Lock className="h-3 w-3 opacity-40 shrink-0" />}
                </button>
              );
            })}
          </div>

          {user.accessSource === "booster" && (
            <div className="mt-4 surface-muted p-3 text-[11px] text-screens-muted">
              Booster · {BOOSTER_LESSON_COUNT} aulas grátis no Tier I.{" "}
              <Link href="/comprar" className="text-zinc-300 hover:text-white underline">
                Upgrade
              </Link>
            </div>
          )}

          <Link href="/dashboard/como-usar" className="mt-4 flex items-center gap-2 rounded-lg px-3 py-2.5 text-[12px] text-screens-muted hover:bg-white/[0.03] hover:text-white transition">
            <HelpCircle className="h-3.5 w-3.5" />
            Guia completo
          </Link>
        </aside>

        <main className="flex-1 min-w-0 p-5 md:p-8 max-w-5xl">
          <div className="surface p-6 md:p-8 mb-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <p className="label-xs">{theme.short} · {theme.name}</p>
                <h1 className="mt-2 text-2xl font-semibold tracking-tight">{theme.description.split(".")[0]}</h1>
                <p className="mt-2 text-sm text-screens-muted">
                  {boosterTierActive
                    ? `${BOOSTER_LESSON_COUNT} aulas liberadas (booster)`
                    : `${tierLessons.length} aulas neste tier`}
                  {!tierUnlocked && " · Compra ou boost para liberar"}
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
            {tierUnlocked && (
              <div className="mt-5">
                <div className="flex justify-between text-[11px] text-screens-muted mb-1.5">
                  <span>Progresso</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-1 overflow-hidden rounded-full bg-screens-border">
                  <div className={`h-full rounded-full ${theme.dot}`} style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mb-5">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-screens-muted" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Buscar em ${theme.name}...`}
                className="w-full rounded-lg border border-screens-border bg-screens-card py-2.5 pl-10 pr-4 text-sm outline-none focus:border-zinc-500 placeholder:text-screens-muted/60"
              />
            </div>
            <div className="flex rounded-lg border border-screens-border p-0.5 shrink-0">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-2 text-xs font-medium ${viewMode === "grid" ? "bg-white/[0.08] text-white" : "text-screens-muted"}`}
              >
                <LayoutGrid className="h-3.5 w-3.5" /> Grid
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-2 text-xs font-medium ${viewMode === "list" ? "bg-white/[0.08] text-white" : "text-screens-muted"}`}
              >
                <List className="h-3.5 w-3.5" /> Lista
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {categories
              .filter((c) => grouped.has(c.id))
              .map((cat) => {
                const items = grouped.get(cat.id)!;
                const meta = CATEGORY_META[cat.id];
                const isOpen = openCats[cat.id] ?? true;

                return (
                  <section key={cat.id} className="surface overflow-hidden">
                    <button
                      type="button"
                      onClick={() => toggleCat(cat.id)}
                      className="flex w-full items-center gap-3 px-4 py-3.5 text-left hover:bg-white/[0.02] transition"
                    >
                      <span className="text-[11px] font-mono text-screens-muted w-8">{meta?.short}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{meta?.label ?? cat.label}</p>
                        <p className="text-xs text-screens-muted">{items.length} aulas</p>
                      </div>
                      <ChevronDown className={`h-4 w-4 text-screens-muted transition ${isOpen ? "rotate-180" : ""}`} />
                    </button>

                    {isOpen && (
                      <div className="border-t border-screens-border p-3 md:p-4">
                        {viewMode === "grid" ? (
                          <div className="grid gap-2 sm:grid-cols-2">
                            {items.map((l, i) => (
                              <LessonCard key={l.id} lesson={l} index={i} user={user} boosterMode={boosterMode} />
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-0.5">
                            {items.map((l, i) => (
                              <LessonRow key={l.id} lesson={l} index={i} user={user} boosterMode={boosterMode} />
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </section>
                );
              })}

            {!tierLessons.length && (
              <div className="surface p-12 text-center text-screens-muted text-sm">Nenhuma aula encontrada.</div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function LessonCard({
  lesson: l,
  index: i,
  user,
  boosterMode,
}: {
  lesson: LessonSummary;
  index: number;
  user: SessionUser;
  boosterMode: boolean;
}) {
  const ok = hasLessonAccess(user, l);
  const lockedReason = !ok && boosterMode && l.tier === "tier1" ? "booster" : "tier";

  return (
    <Link
      href={ok ? `/dashboard/curso/${l.id}` : "/comprar"}
      className={`course-card block overflow-hidden ${ok ? "" : "opacity-50"}`}
    >
      <div className="relative aspect-[2/1] overflow-hidden bg-screens-bg border-b border-screens-border">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/lessons/${l.id}.svg`}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover object-top opacity-60"
        />
        <span className="absolute top-2 left-2 text-[10px] font-mono text-screens-muted bg-screens-card/90 px-1.5 py-0.5 rounded">
          {String(i + 1).padStart(2, "0")}
        </span>
        {!ok && (
          <div className="absolute inset-0 flex items-center justify-center bg-screens-bg/60">
            <Lock className="h-4 w-4 text-screens-muted" />
          </div>
        )}
      </div>
      <div className="p-3">
        <p className="text-sm font-medium line-clamp-2">{l.title}</p>
        <p className="mt-1 text-[11px] text-screens-muted line-clamp-1">
          {lockedReason === "booster" ? "Comprar Tier I" : l.intro}
        </p>
      </div>
    </Link>
  );
}

function LessonRow({
  lesson: l,
  index: i,
  user,
  boosterMode,
}: {
  lesson: LessonSummary;
  index: number;
  user: SessionUser;
  boosterMode: boolean;
}) {
  const ok = hasLessonAccess(user, l);
  const lockedReason = !ok && boosterMode && l.tier === "tier1" ? "booster" : "tier";

  return (
    <Link
      href={ok ? `/dashboard/curso/${l.id}` : "/comprar"}
      className={`flex items-center gap-3 rounded-lg px-2 py-2 transition ${ok ? "hover:bg-white/[0.03]" : "opacity-50"}`}
    >
      <span className="text-[10px] font-mono text-screens-muted w-6">{String(i + 1).padStart(2, "0")}</span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium truncate">{l.title}</p>
        <p className="text-[11px] text-screens-muted truncate">
          {lockedReason === "booster" ? "Comprar Tier I" : l.intro}
        </p>
      </div>
      {ok ? <BookOpen className="h-3.5 w-3.5 text-screens-muted shrink-0" /> : <Lock className="h-3 w-3 text-screens-muted shrink-0" />}
    </Link>
  );
}
