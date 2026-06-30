import Link from "next/link";
import { LessonToolsBar } from "@/components/LessonToolsBar";
import { LessonBody } from "@/components/LessonBody";
import { SafeLessonImage } from "@/components/SafeLessonImage";
import { ContentProtection } from "@/components/ContentProtection";
import {
  Lock,
  CheckCircle2,
  Lightbulb,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  List,
  HelpCircle,
  Play,
  ArrowLeft,
  BookOpen,
} from "lucide-react";
import { getLesson, getCategory, lessons } from "@/lib/lessons";
import { hasLessonAccess, isBoosterLimited } from "@/lib/tier-access";
import { BOOSTER_LESSON_COUNT } from "@/lib/booster-lessons";
import { TIER_THEME } from "@/lib/tier-theme";
import type { LessonSectionKind } from "@/lib/lessons/types";
import { getLessonVisual } from "@/lib/lesson-visuals";
import type { SessionUser } from "@/lib/types";

function embedVideo(url: string) {
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const id = url.match(/(?:v=|youtu\.be\/)([\w-]+)/)?.[1];
    if (id) {
      return (
        <iframe
          className="aspect-video w-full rounded-xl border border-white/[0.07]"
          src={`https://www.youtube.com/embed/${id}?modestbranding=1&rel=0`}
          title="Vídeo da aula"
          allow="accelerometer; autoplay; encrypted-media; gyroscope"
          sandbox="allow-scripts allow-same-origin allow-presentation"
        />
      );
    }
  }
  return (
    <video
      controls
      controlsList="nodownload noremoteplayback"
      disablePictureInPicture
      className="w-full rounded-xl border border-white/[0.07]"
      src={url}
    >
      Seu navegador não suporta vídeo.
    </video>
  );
}

const SECTION_LABEL: Record<LessonSectionKind, string> = {
  intro:   "Introdução",
  modulo:  "Passo a passo",
  tecnica: "Técnica SS",
  zuera:   "Zuera na call",
  veredito: "Veredito",
  normal:  "Conteúdo",
};

const SECTION_COLORS: Record<LessonSectionKind, string> = {
  intro:   "#38bdf8",
  modulo:  "#a855f7",
  tecnica: "#22d3ee",
  zuera:   "#fbbf24",
  veredito: "#34d399",
  normal:  "#9090c0",
};

function detectKind(heading: string, explicit?: LessonSectionKind): LessonSectionKind {
  if (explicit) return explicit;
  const h = heading.toLowerCase();
  if (h.includes("zuera") || h.includes("🤣")) return "zuera";
  if (h.includes("passo") || h.includes("módulo") || h.includes("modulo") || h.includes("📚")) return "modulo";
  if (h.includes("veredito") || h.includes("gran finale")) return "veredito";
  if (h.includes("técnica") || h.includes("tecnica") || h.includes("🕵") || h.includes("🛠")) return "tecnica";
  if (h.includes("bem-vindo") || h.includes("o que é")) return "intro";
  return "normal";
}

export function LessonView({ lessonId, user }: { lessonId: string; user: SessionUser }) {
  const lesson = getLesson(lessonId);
  if (!lesson) {
    return (
      <div className="page-course flex items-center justify-center min-h-[60vh] p-10">
        <p className="text-screens-muted">Aula não encontrada.</p>
      </div>
    );
  }

  const category   = getCategory(lesson.categoryId);
  const theme      = TIER_THEME[lesson.tier];
  const boosterMode = isBoosterLimited(user.courseTier, user.accessSource, user.role);
  const allowed    = hasLessonAccess(user, lesson);

  const tierLessons = lessons.filter((l) => {
    if (l.tier !== lesson.tier) return false;
    if (boosterMode) return hasLessonAccess(user, l);
    return true;
  });
  const idx  = tierLessons.findIndex((l) => l.id === lessonId);
  const prev = idx > 0 ? tierLessons[idx - 1] : null;
  const next = idx < tierLessons.length - 1 ? tierLessons[idx + 1] : null;
  const progressPct = Math.round(((idx + 1) / tierLessons.length) * 100);
  const visual      = getLessonVisual(lesson.id, lesson.title, lesson.categoryId);

  /* ── Locked state ── */
  if (!allowed) {
    const boosterLocked = boosterMode && lesson.tier === "tier1";
    return (
      <div className="page-course flex min-h-[60vh] items-center justify-center p-10">
        <div
          className="max-w-md w-full rounded-2xl border border-white/[0.08] p-10 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(168,85,247,0.07), rgba(12,12,24,0.95))",
            backdropFilter: "blur(20px)",
          }}
        >
          <div
            className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{ background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.2)" }}
          >
            <Lock className="h-6 w-6" style={{ color: "#a855f7" }} />
          </div>
          <h2 className="text-lg font-black text-white">
            {boosterLocked ? "Aula exclusiva do Tier I pago" : "Conteúdo bloqueado"}
          </h2>
          <p className="mt-3 text-sm text-screens-muted leading-relaxed">
            {boosterLocked
              ? `Booster libera só ${BOOSTER_LESSON_COUNT} aulas.`
              : `${theme.short} · ${theme.name} — ${theme.price}`}
          </p>
          <Link href="/comprar" className="btn-primary mt-6 w-full justify-center">
            {boosterLocked ? "Comprar Tier I" : `Desbloquear — ${theme.price}`}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <ContentProtection username={user.username} email={user.email}>
    <div className="page-course min-h-full flex flex-col xl:flex-row">

      {/* ── Sidebar ── */}
      <aside className="xl:w-64 shrink-0 border-b xl:border-b-0 xl:border-r border-white/[0.05] p-4 xl:sticky xl:top-0 xl:h-screen xl:overflow-y-auto sidebar-surface">
        <div className="relative">
          <Link
            href="/dashboard/curso"
            className="inline-flex items-center gap-1.5 text-xs text-screens-muted hover:text-white mb-5 transition-colors duration-200"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Voltar ao Curso
          </Link>

          {/* Progress card */}
          <div
            className="rounded-xl p-3.5 mb-5"
            style={{
              background: `linear-gradient(135deg, ${theme.hexColor}12, rgba(12,12,24,0.8))`,
              border: `1px solid ${theme.hexColor}22`,
            }}
          >
            <div className="flex items-center justify-between text-[10px] mb-2">
              <span className="text-screens-muted font-medium">
                {theme.short} · Aula {idx + 1}/{tierLessons.length}
              </span>
              <span className="font-black" style={{ color: theme.hexColor }}>
                {progressPct}%
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-screens-border/40">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${progressPct}%`,
                  background: theme.hexColor,
                  boxShadow: `0 0 6px ${theme.hexColor}60`,
                  transition: "width 0.8s cubic-bezier(0.16,1,0.3,1)",
                }}
              />
            </div>
            <p className="mt-2 text-sm font-semibold text-white leading-snug line-clamp-2">
              {lesson.title}
            </p>
          </div>

          {/* Section index */}
          <p className="label-xs mb-2 flex items-center gap-1.5">
            <List className="h-3 w-3" /> Índice
          </p>
          <nav className="space-y-0.5">
            {lesson.sections.map((sec, i) => {
              const kind  = detectKind(sec.heading, sec.kind);
              const color = SECTION_COLORS[kind];
              return (
                <a
                  key={i}
                  href={`#sec-${i}`}
                  className="flex items-start gap-2 rounded-lg px-2.5 py-1.5 text-[11px] text-screens-muted hover:bg-white/[0.04] hover:text-white transition-all duration-200 group line-clamp-2"
                >
                  <span
                    className="mt-1 h-1.5 w-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: color, opacity: 0.7 }}
                  />
                  {sec.heading.replace(/📚|🕵️|🕒|❌|🛠️|🤣/g, "").trim()}
                </a>
              );
            })}
            <a
              href="#checklist"
              className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[11px] text-screens-muted hover:bg-white/[0.04] hover:text-white transition-all duration-200"
            >
              <CheckCircle2 className="h-3 w-3 shrink-0 opacity-60" />
              Checklist SS
            </a>
          </nav>

          {/* Navigation */}
          <div className="mt-5 pt-4 border-t border-white/[0.05] space-y-1.5">
            <Link
              href="/dashboard/como-usar"
              className="flex items-center gap-1.5 text-[11px] text-screens-muted hover:text-white px-2 py-1 rounded-lg hover:bg-white/[0.04] transition-all"
            >
              <HelpCircle className="h-3 w-3" /> Guia
            </Link>
            {prev && hasLessonAccess(user, prev) && (
              <Link
                href={`/dashboard/curso/${prev.id}`}
                className="flex items-center gap-1.5 text-[11px] text-screens-muted hover:text-white truncate px-2 py-1 rounded-lg hover:bg-white/[0.04] transition-all"
              >
                <ChevronLeft className="h-3 w-3 shrink-0" />
                <span className="truncate">{prev.title}</span>
              </Link>
            )}
            {next && hasLessonAccess(user, next) && (
              <Link
                href={`/dashboard/curso/${next.id}`}
                className="flex items-center gap-1.5 text-[11px] text-white hover:text-neon-purple truncate px-2 py-1 rounded-lg hover:bg-white/[0.04] transition-all font-medium"
              >
                <span className="truncate">{next.title}</span>
                <ChevronRight className="h-3 w-3 shrink-0" />
              </Link>
            )}
          </div>
        </div>
      </aside>

      {/* ── Article content ── */}
      <article className="flex-1 min-w-0 pb-24 xl:pb-10">
        <div className="p-5 md:p-8 max-w-2xl mx-auto">

          {/* Header */}
          <header className="mb-8 animate-fade-in-up">
            <div className="flex items-center gap-2 mb-3">
              <span
                className="rounded-lg px-2 py-0.5 text-[10px] font-black uppercase tracking-widest"
                style={{
                  background: `${theme.hexColor}15`,
                  color: theme.hexColor,
                  border: `1px solid ${theme.hexColor}30`,
                }}
              >
                {theme.short}
              </span>
              {category && (
                <span className="text-[10px] text-screens-muted">{category.label}</span>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-tight text-white">
              {lesson.title}
            </h1>
            <p className="mt-3 text-sm text-screens-muted leading-relaxed">{lesson.intro}</p>

            {/* Visual info card */}
            <div
              className="mt-5 rounded-xl p-4"
              style={{
                background: "linear-gradient(135deg, rgba(14,165,233,0.07), rgba(12,12,24,0.8))",
                border: "1px solid rgba(14,165,233,0.15)",
              }}
            >
              <div className="flex items-center gap-1.5 mb-2">
                <BookOpen className="h-3 w-3" style={{ color: "#0ea5e9" }} />
                <p className="label-xs" style={{ color: "#0ea5e9" }}>Onde achar rastro</p>
              </div>
              <p className="font-semibold text-sm text-white">{visual.where}</p>
              <code
                className="mt-2 block rounded-lg px-3 py-2 font-mono text-xs text-screens-muted-bright"
                style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                {visual.path}
              </code>
              <p className="mt-2 text-xs text-screens-muted">
                {visual.tool} · {visual.hint}
              </p>
            </div>
          </header>

          {/* Tools bar */}
          <LessonToolsBar lessonId={lesson.id} categoryId={lesson.categoryId} />

          {/* Sections */}
          <div className="mt-8 space-y-4">
            {lesson.sections.map((sec, i) => {
              const kind  = detectKind(sec.heading, sec.kind);
              const label = SECTION_LABEL[kind];
              const color = SECTION_COLORS[kind];

              return (
                <section
                  id={`sec-${i}`}
                  key={`${sec.heading}-${i}`}
                  className="scroll-mt-6 overflow-hidden rounded-2xl border border-white/[0.07] animate-fade-in-up"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                    backdropFilter: "blur(12px)",
                    animationDelay: `${i * 40}ms`,
                  }}
                >
                  {/* Section header */}
                  <div
                    className="flex items-center gap-3 px-5 py-3 border-b border-white/[0.05]"
                    style={{ background: `${color}06` }}
                  >
                    <span
                      className="h-2 w-2 rounded-full shrink-0"
                      style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}
                    />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.15em]" style={{ color }}>
                      {label}
                    </span>
                    <span className="text-[10px] text-screens-muted ml-auto">
                      {i + 1}/{lesson.sections.length}
                    </span>
                  </div>

                  <div className="p-5 md:p-6">
                    <h2 className="text-base font-semibold leading-snug text-white">
                      {sec.heading.replace(/📚|🕵️|🕒|❌|🛠️|🤣/g, "").trim()}
                    </h2>

                    <div className="mt-4">
                      <LessonBody body={sec.body} />
                    </div>

                    {sec.image && (
                      <figure className="mt-5 overflow-hidden rounded-xl border border-white/[0.07]">
                        <SafeLessonImage src={sec.image} alt={sec.heading} variant="content" />
                      </figure>
                    )}

                    {sec.video && <div className="mt-4">{embedVideo(sec.video)}</div>}

                    {sec.example && (
                      <div
                        className="mt-4 rounded-xl p-4"
                        style={{
                          background: `${color}08`,
                          border: `1px solid ${color}18`,
                        }}
                      >
                        <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color }}>
                          <Lightbulb className="h-3 w-3" />
                          {kind === "zuera" ? "Fala na call" : "Exemplo na SS"}
                        </p>
                        <p
                          className={`text-sm leading-relaxed whitespace-pre-wrap ${
                            kind === "zuera" ? "italic text-zinc-400" : "text-screens-muted"
                          }`}
                        >
                          {sec.example}
                        </p>
                      </div>
                    )}
                  </div>
                </section>
              );
            })}
          </div>

          {/* Checklist */}
          <section
            id="checklist"
            className="scroll-mt-6 mt-6 overflow-hidden rounded-2xl border border-white/[0.08] animate-fade-in-up"
            style={{
              background: "linear-gradient(135deg, rgba(52,211,153,0.06), rgba(12,12,24,0.9))",
              backdropFilter: "blur(12px)",
            }}
          >
            <div className="border-b border-white/[0.06] px-5 py-4 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" style={{ color: "#34d399" }} />
              <h3 className="font-semibold text-white text-sm">Checklist na SS</h3>
            </div>
            <ul className="p-4 space-y-1">
              {lesson.checklist.map((item, i) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl px-3 py-2.5 text-sm text-screens-muted hover:bg-white/[0.03] hover:text-screens-muted-bright transition-colors duration-200"
                >
                  <span
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[10px] font-black mt-0.5"
                    style={{
                      background: "rgba(52,211,153,0.12)",
                      border: "1px solid rgba(52,211,153,0.2)",
                      color: "#34d399",
                    }}
                  >
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Warning */}
          <div
            className="mt-4 flex items-start gap-2.5 rounded-xl px-4 py-3 text-xs text-screens-muted"
            style={{ background: "rgba(251,191,36,0.05)", border: "1px solid rgba(251,191,36,0.12)" }}
          >
            <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: "#fbbf24", opacity: 0.7 }} />
            Cruza evidências antes do veredito. Print com data/hora visível.
          </div>

          {/* Navigation buttons (desktop) */}
          <div className="mt-8 hidden xl:flex justify-between gap-4">
            {prev && hasLessonAccess(user, prev) ? (
              <Link href={`/dashboard/curso/${prev.id}`} className="btn-secondary">
                <ChevronLeft className="h-4 w-4" /> Anterior
              </Link>
            ) : (
              <span />
            )}
            {next && hasLessonAccess(user, next) && (
              <Link href={`/dashboard/curso/${next.id}`} className="btn-primary ml-auto">
                Próxima <ChevronRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>

        {/* Mobile bottom nav */}
        <div
          className="xl:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-white/[0.06] px-4 py-3 flex items-center justify-between"
          style={{ background: "rgba(3,3,6,0.95)", backdropFilter: "blur(20px)" }}
        >
          {prev && hasLessonAccess(user, prev) ? (
            <Link href={`/dashboard/curso/${prev.id}`} className="flex items-center gap-1 text-xs text-screens-muted hover:text-white transition-colors">
              <ChevronLeft className="h-3.5 w-3.5" /> Ant.
            </Link>
          ) : (
            <Link href="/dashboard/curso" className="text-xs text-screens-muted hover:text-white transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" />
            </Link>
          )}
          <div className="flex items-center gap-2">
            <div className="w-16 h-1 rounded-full bg-screens-border/40 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${progressPct}%`, background: theme.hexColor }}
              />
            </div>
            <span className="text-[11px] text-screens-muted font-mono">{progressPct}%</span>
          </div>
          {next && hasLessonAccess(user, next) ? (
            <Link href={`/dashboard/curso/${next.id}`} className="flex items-center gap-1 text-xs text-white font-semibold hover:text-neon-purple transition-colors">
              Próx. <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          ) : (
            <span className="w-10" />
          )}
        </div>
      </article>
    </div>
    </ContentProtection>
  );
}
