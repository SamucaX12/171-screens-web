import Link from "next/link";
import { LessonToolsBar } from "@/components/LessonToolsBar";
import { LessonBody } from "@/components/LessonBody";
import { SafeLessonImage } from "@/components/SafeLessonImage";
import {
  Lock,
  CheckCircle2,
  BookOpen,
  Lightbulb,
  AlertTriangle,
  MessageSquareQuote,
  Target,
  ChevronLeft,
  ChevronRight,
  List,
  HelpCircle,
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
          className="aspect-video w-full rounded-lg border border-screens-border"
          src={`https://www.youtube.com/embed/${id}`}
          title="Vídeo da aula"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }
  }
  return (
    <video controls className="w-full rounded-lg border border-screens-border" src={url}>
      Seu navegador não suporta vídeo.
    </video>
  );
}

const SECTION_LABEL: Record<LessonSectionKind, string> = {
  intro: "Introdução",
  modulo: "Passo a passo",
  tecnica: "Técnica SS",
  zuera: "Zuera na call",
  veredito: "Veredito",
  normal: "Conteúdo",
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
      <div className="page-course p-10">
        <p className="text-screens-muted">Aula não encontrada.</p>
      </div>
    );
  }

  const category = getCategory(lesson.categoryId);
  const theme = TIER_THEME[lesson.tier];
  const boosterMode = isBoosterLimited(user.courseTier, user.accessSource, user.role);
  const allowed = hasLessonAccess(user, lesson);
  const tierLessons = lessons.filter((l) => {
    if (l.tier !== lesson.tier) return false;
    if (boosterMode) return hasLessonAccess(user, l);
    return true;
  });
  const idx = tierLessons.findIndex((l) => l.id === lessonId);
  const prev = idx > 0 ? tierLessons[idx - 1] : null;
  const next = idx < tierLessons.length - 1 ? tierLessons[idx + 1] : null;
  const progressPct = Math.round(((idx + 1) / tierLessons.length) * 100);
  const visual = getLessonVisual(lesson.id, lesson.title, lesson.categoryId);

  if (!allowed) {
    const boosterLocked = boosterMode && lesson.tier === "tier1";
    return (
      <div className="page-course flex min-h-[60vh] items-center justify-center p-10">
        <div className="surface max-w-md p-10 text-center">
          <Lock className="mx-auto h-8 w-8 text-screens-muted mb-4" />
          <h2 className="text-lg font-semibold">
            {boosterLocked ? "Aula exclusiva do Tier I pago" : "Conteúdo bloqueado"}
          </h2>
          <p className="mt-2 text-sm text-screens-muted">
            {boosterLocked
              ? `Booster libera só ${BOOSTER_LESSON_COUNT} aulas.`
              : `${theme.short} · ${theme.name}`}
          </p>
          <Link href="/comprar" className="btn-primary mt-6">
            {boosterLocked ? "Comprar Tier I" : `Desbloquear — ${theme.price}`}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-course min-h-full flex flex-col xl:flex-row">
      <aside className="xl:w-60 shrink-0 border-b xl:border-b-0 xl:border-r border-screens-border p-4 xl:sticky xl:top-0 xl:h-screen xl:overflow-y-auto">
        <Link href="/dashboard/curso" className="inline-flex items-center gap-1 text-xs text-screens-muted hover:text-white mb-4">
          <ChevronLeft className="h-3.5 w-3.5" /> Curso
        </Link>

        <div className="surface p-3 mb-4">
          <p className="text-[10px] text-screens-muted">{theme.short} · {idx + 1}/{tierLessons.length}</p>
          <p className="mt-1 text-sm font-medium leading-snug">{lesson.title}</p>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-screens-border">
            <div className={`h-full ${theme.dot}`} style={{ width: `${progressPct}%` }} />
          </div>
        </div>

        <p className="label-xs mb-2 flex items-center gap-1"><List className="h-3 w-3" /> Índice</p>
        <nav className="space-y-0.5">
          {lesson.sections.map((sec, i) => (
            <a
              key={i}
              href={`#sec-${i}`}
              className="block rounded-md px-2 py-1.5 text-[11px] text-screens-muted hover:bg-white/[0.03] hover:text-white line-clamp-2"
            >
              {sec.heading.replace(/📚|🕵️|🕒|❌|🛠️|🤣/g, "").trim()}
            </a>
          ))}
          <a href="#checklist" className="block rounded-md px-2 py-1.5 text-[11px] text-screens-muted hover:text-white">
            Checklist SS
          </a>
        </nav>

        <div className="mt-4 pt-4 border-t border-screens-border space-y-1">
          <Link href="/dashboard/como-usar" className="flex items-center gap-1.5 text-[11px] text-screens-muted hover:text-white px-2 py-1">
            <HelpCircle className="h-3 w-3" /> Guia
          </Link>
          {prev && hasLessonAccess(user, prev) && (
            <Link href={`/dashboard/curso/${prev.id}`} className="block text-[11px] text-screens-muted hover:text-white truncate px-2 py-1">
              ← {prev.title}
            </Link>
          )}
          {next && hasLessonAccess(user, next) && (
            <Link href={`/dashboard/curso/${next.id}`} className="block text-[11px] text-zinc-300 hover:text-white truncate px-2 py-1">
              {next.title} →
            </Link>
          )}
        </div>
      </aside>

      <article className="flex-1 min-w-0 pb-24 xl:pb-8">
        <div className="p-5 md:p-8 max-w-2xl mx-auto">
          <header className="mb-8">
            <p className="label-xs">{category?.label}</p>
            <h1 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight leading-tight">{lesson.title}</h1>
            <p className="mt-3 text-sm text-screens-muted leading-relaxed">{lesson.intro}</p>

            <div className="mt-5 surface p-4">
              <p className="label-xs">Onde achar rastro</p>
              <p className="mt-2 font-medium">{visual.where}</p>
              <p className="mt-2 font-mono text-xs text-zinc-400 bg-screens-bg rounded-md px-3 py-2">{visual.path}</p>
              <p className="mt-2 text-xs text-screens-muted">{visual.tool} · {visual.hint}</p>
            </div>
          </header>

          <LessonToolsBar lessonId={lesson.id} categoryId={lesson.categoryId} />

          <div className="mt-8 space-y-4">
            {lesson.sections.map((sec, i) => {
              const kind = detectKind(sec.heading, sec.kind);
              const label = SECTION_LABEL[kind];

              return (
                <section id={`sec-${i}`} key={`${sec.heading}-${i}`} className="scroll-mt-6 surface p-5 md:p-6">
                  <p className="label-xs">{label} · {i + 1}/{lesson.sections.length}</p>
                  <h2 className="mt-1 text-lg font-medium leading-snug">
                    {sec.heading.replace(/📚|🕵️|🕒|❌|🛠️|🤣/g, "").trim()}
                  </h2>

                  <div className="mt-4">
                    <LessonBody body={sec.body} />
                  </div>

                  {sec.image && (
                    <figure className="mt-5 overflow-hidden rounded-lg border border-screens-border">
                      <SafeLessonImage src={sec.image} alt={sec.heading} variant="content" />
                    </figure>
                  )}

                  {sec.video && <div className="mt-4">{embedVideo(sec.video)}</div>}

                  {sec.example && (
                    <div className="mt-4 rounded-lg border border-screens-border bg-screens-bg p-4">
                      <p className="label-xs flex items-center gap-1 mb-2">
                        <Lightbulb className="h-3 w-3" />
                        {kind === "zuera" ? "Fala na call" : "Exemplo na SS"}
                      </p>
                      <p className={`text-sm leading-relaxed whitespace-pre-wrap ${kind === "zuera" ? "italic text-zinc-400" : "text-screens-muted"}`}>
                        {sec.example}
                      </p>
                    </div>
                  )}
                </section>
              );
            })}
          </div>

          <section id="checklist" className="scroll-mt-6 mt-8 surface overflow-hidden">
            <div className="border-b border-screens-border px-5 py-4">
              <h3 className="font-medium flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-screens-muted" />
                Checklist na SS
              </h3>
            </div>
            <ul className="p-4 space-y-1.5">
              {lesson.checklist.map((item, i) => (
                <li key={item} className="flex items-start gap-3 rounded-lg px-3 py-2.5 text-sm text-screens-muted">
                  <span className="text-[11px] font-mono text-screens-muted w-5 shrink-0">{i + 1}</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-5 flex items-start gap-2 rounded-lg border border-screens-border px-4 py-3 text-xs text-screens-muted">
            <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
            Cruza evidências antes do veredito. Print com data/hora visível.
          </div>

          <div className="mt-6 hidden xl:flex justify-between gap-4">
            {prev && hasLessonAccess(user, prev) ? (
              <Link href={`/dashboard/curso/${prev.id}`} className="btn-secondary">
                <ChevronLeft className="h-4 w-4" /> Anterior
              </Link>
            ) : <span />}
            {next && hasLessonAccess(user, next) && (
              <Link href={`/dashboard/curso/${next.id}`} className="btn-primary ml-auto">
                Próxima <ChevronRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>

        <div className="xl:hidden fixed bottom-0 left-[220px] right-0 z-40 border-t border-screens-border bg-screens-bg/95 backdrop-blur px-4 py-3 flex items-center justify-between">
          {prev && hasLessonAccess(user, prev) ? (
            <Link href={`/dashboard/curso/${prev.id}`} className="text-xs text-screens-muted">← Ant.</Link>
          ) : (
            <Link href="/dashboard/curso" className="text-xs text-screens-muted">Curso</Link>
          )}
          <span className="text-xs text-screens-muted">{progressPct}%</span>
          {next && hasLessonAccess(user, next) ? (
            <Link href={`/dashboard/curso/${next.id}`} className="text-xs text-white font-medium">Próx. →</Link>
          ) : <span className="w-8" />}
        </div>
      </article>
    </div>
  );
}
