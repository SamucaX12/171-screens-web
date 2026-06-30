"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Lock,
  Target,
  Lightbulb,
  AlertTriangle,
  List,
  Video,
} from "lucide-react";
import {
  getMobileLesson,
  getMobileLessonsByPlatform,
  MOBILE_CATEGORIES,
  MOBILE_PLATFORM_META,
} from "@/lib/mobile-lessons";
import { hasMobileLessonAccess } from "@/lib/mobile-access";
import type { SessionUser } from "@/lib/types";
import { LessonBody } from "@/components/LessonBody";
import { ContentProtection } from "@/components/ContentProtection";

// ── Video embed ───────────────────────────────────────────────────────────────
function VideoEmbed({ url }: { url: string }) {
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const id = url.match(/(?:v=|youtu\.be\/)([\w-]+)/)?.[1];
    if (id) {
      return (
        <div className="overflow-hidden rounded-xl border border-fuchsia-500/20">
          <iframe
            className="aspect-video w-full"
            src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`}
            title="Vídeo da aula"
            allow="accelerometer; autoplay; encrypted-media; gyroscope"
            sandbox="allow-scripts allow-same-origin allow-presentation"
          />
        </div>
      );
    }
  }
  return (
    <div className="overflow-hidden rounded-xl border border-fuchsia-500/20">
      <video
        controls
        controlsList="nodownload noremoteplayback"
        disablePictureInPicture
        className="w-full"
        src={url}
        preload="metadata"
      >
        Seu navegador não suporta vídeo.
      </video>
    </div>
  );
}

// ── Section kind badge ────────────────────────────────────────────────────────
const KIND_LABELS: Record<string, string> = {
  intro:    "Introdução",
  modulo:   "Passo a passo",
  tecnica:  "Técnica SS",
  veredito: "Veredito",
  normal:   "Conteúdo",
};

export function MobileLessonView({
  lessonId,
  user,
}: {
  lessonId: string;
  user: SessionUser;
}) {
  const lesson = getMobileLesson(lessonId);
  const [checkItems, setCheckItems] = useState<Record<number, boolean>>({});

  if (!lesson) {
    return (
      <div className="dash-invaded p-10">
        <p className="text-screens-muted">Aula mobile não encontrada.</p>
      </div>
    );
  }

  const theme = MOBILE_PLATFORM_META[lesson.platform];
  const allowed = hasMobileLessonAccess(user, lesson);
  const platformLessons = getMobileLessonsByPlatform(lesson.platform);
  const idx = platformLessons.findIndex((l) => l.id === lessonId);
  const prev = idx > 0 ? platformLessons[idx - 1] : null;
  const next = idx < platformLessons.length - 1 ? platformLessons[idx + 1] : null;
  const cat = MOBILE_CATEGORIES.find((c) => c.id === lesson.categoryId);
  const checkedCount = Object.values(checkItems).filter(Boolean).length;

  // ── Locked ───────────────────────────────────────────────────────────────
  if (!allowed) {
    return (
      <div className="dash-invaded flex min-h-[60vh] items-center justify-center p-10">
        <div className="neon-card max-w-md p-10 text-center border-fuchsia-500/30">
          <div className={`mx-auto h-14 w-14 rounded-2xl border flex items-center justify-center mb-6 ${theme.border}`}>
            <Lock className={`h-6 w-6 ${theme.color} opacity-60`} />
          </div>
          <h2 className="text-lg font-bold">Aula bloqueada</h2>
          <p className="mt-2 text-sm text-screens-muted">
            Você precisa do cargo{" "}
            <strong className={theme.color}>{theme.label}</strong> no Discord.
          </p>
          <Link href="/dashboard/curso-mobile" className="mt-6 inline-flex btn-secondary">
            ← Voltar ao hub
          </Link>
        </div>
      </div>
    );
  }

  return (
    <ContentProtection username={user.username} email={user.email}>
    <div className="dash-invaded min-h-full flex flex-col xl:flex-row">
      <div className="pointer-events-none fixed inset-0 cyber-grid opacity-15" />

      {/* ── Sidebar ────────────────────────────────────────────────────── */}
      <aside className="relative xl:w-64 shrink-0 border-b xl:border-b-0 xl:border-r border-white/5 bg-black/40 p-4 xl:sticky xl:top-0 xl:h-screen xl:overflow-y-auto backdrop-blur-xl">
        <Link
          href="/dashboard/curso-mobile"
          className="inline-flex items-center gap-1.5 text-xs text-screens-muted hover:text-white mb-5"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Curso Mobile
        </Link>

        {/* Lesson info */}
        <div className={`neon-card border ${theme.border} p-3 mb-4`}>
          <span className={`text-[10px] font-bold uppercase tracking-widest ${theme.color}`}>
            {theme.short} · {String(idx + 1).padStart(2, "0")}/{String(platformLessons.length).padStart(2, "0")}
          </span>
          <p className="mt-1 text-sm font-semibold leading-snug">{lesson.title}</p>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-screens-border">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${theme.accent}`}
              style={{ width: `${Math.round(((idx + 1) / platformLessons.length) * 100)}%` }}
            />
          </div>
        </div>

        {/* Index */}
        <p className="label-xs mb-2 flex items-center gap-1">
          <List className="h-3 w-3" /> Seções
        </p>
        <nav className="space-y-0.5">
          {lesson.sections.map((sec, i) => (
            <a
              key={i}
              href={`#sec-${i}`}
              className="block rounded-md px-2 py-1.5 text-[11px] text-screens-muted hover:bg-white/[0.03] hover:text-white line-clamp-2"
            >
              {sec.heading.replace(/📚|🕵️|🛠️/g, "").trim()}
            </a>
          ))}
          <a
            href="#checklist"
            className="block rounded-md px-2 py-1.5 text-[11px] text-screens-muted hover:text-white"
          >
            Checklist SS
          </a>
        </nav>

        {/* Nav prev/next */}
        <div className="mt-4 pt-4 border-t border-white/5 space-y-1">
          {prev && hasMobileLessonAccess(user, prev) && (
            <Link
              href={`/dashboard/curso-mobile/${prev.id}`}
              className="block text-[11px] text-screens-muted hover:text-white truncate px-2 py-1"
            >
              ← {prev.title}
            </Link>
          )}
          {next && hasMobileLessonAccess(user, next) && (
            <Link
              href={`/dashboard/curso-mobile/${next.id}`}
              className="block text-[11px] text-zinc-300 hover:text-white truncate px-2 py-1"
            >
              {next.title} →
            </Link>
          )}
        </div>
      </aside>

      {/* ── Article ────────────────────────────────────────────────────── */}
      <article className="relative flex-1 min-w-0 pb-24 xl:pb-10">
        <div className="p-5 md:p-8 max-w-2xl mx-auto">

          {/* Header */}
          <header className={`neon-card-highlight border ${theme.border} p-6 md:p-8 mb-8`}>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase ${theme.border} ${theme.color}`}>
                {theme.short}
              </span>
              {cat && (
                <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] text-screens-muted">
                  {cat.label}
                </span>
              )}
              <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] text-screens-muted font-mono">
                Aula {String(idx + 1).padStart(2, "0")}/{String(platformLessons.length).padStart(2, "0")}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-tight">
              {lesson.title}
            </h1>
            <p className="mt-3 text-sm text-screens-muted leading-relaxed">{lesson.intro}</p>
          </header>

          {/* Sections */}
          <div className="space-y-5">
            {lesson.sections.map((sec, i) => {
              const kind = sec.kind ?? "normal";
              const label = KIND_LABELS[kind] ?? "Conteúdo";
              const isVeredito = kind === "veredito";
              const isTecnica = kind === "tecnica";

              return (
                <section
                  id={`sec-${i}`}
                  key={i}
                  className={`neon-card scroll-mt-6 overflow-hidden ${
                    isVeredito ? "border-amber-500/25" : isTecnica ? "border-cyan-500/20" : ""
                  }`}
                >
                  <div className={`px-5 py-3 border-b border-white/5 flex items-center gap-2 ${
                    isVeredito ? "bg-amber-500/5" : isTecnica ? "bg-cyan-500/5" : "bg-white/[0.01]"
                  }`}>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${
                      isVeredito ? "text-amber-400" : isTecnica ? "text-cyan-400" : "text-screens-muted"
                    }`}>
                      {label}
                    </span>
                    <span className="text-screens-muted text-[10px]">·</span>
                    <span className="text-[10px] text-screens-muted">{i + 1}/{lesson.sections.length}</span>
                  </div>

                  <div className="p-5 md:p-6">
                    <h2 className="text-lg font-bold leading-snug mb-4">
                      {sec.heading.replace(/📚|🕵️|🛠️/g, "").trim()}
                    </h2>

                    <LessonBody body={sec.body} accentClass={theme.color} />

                    {/* Image */}
                    {sec.image && (
                      <figure className="mt-5 overflow-hidden rounded-xl border border-white/10 bg-screens-card">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={sec.image}
                          alt={sec.heading}
                          className="w-full object-contain max-h-80"
                          onError={(e) => {
                            const el = e.currentTarget as HTMLImageElement;
                            el.style.display = "none";
                          }}
                        />
                      </figure>
                    )}

                    {/* Video */}
                    {sec.video && (
                      <div className="mt-5">
                        <p className="label-xs mb-2 flex items-center gap-1.5">
                          <Video className="h-3 w-3" />
                          Vídeo demonstrativo
                        </p>
                        <VideoEmbed url={sec.video} />
                      </div>
                    )}

                    {/* Example */}
                    {sec.example && (
                      <div className={`mt-5 rounded-xl border p-4 ${
                        isVeredito
                          ? "border-amber-500/20 bg-amber-500/5"
                          : "border-cyan-500/15 bg-cyan-500/5"
                      }`}>
                        <p className="label-xs mb-2 flex items-center gap-1.5">
                          <Lightbulb className={`h-3 w-3 ${isVeredito ? "text-amber-400" : "text-cyan-400"}`} />
                          Exemplo real na SS
                        </p>
                        <p className={`text-sm leading-relaxed italic ${
                          isVeredito ? "text-amber-200/80" : "text-cyan-200/80"
                        }`}>
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
          {lesson.checklist.length > 0 && (
            <section
              id="checklist"
              className="scroll-mt-6 mt-8 neon-card overflow-hidden border-emerald-500/20"
            >
              <div className="border-b border-emerald-500/10 px-5 py-4 bg-emerald-500/5 flex items-center justify-between">
                <h3 className="font-bold flex items-center gap-2">
                  <Target className="h-4 w-4 text-emerald-400" />
                  Checklist da SS Mobile
                </h3>
                <span className="font-mono text-xs text-emerald-400">
                  {checkedCount}/{lesson.checklist.length}
                </span>
              </div>
              <ul className="p-4 space-y-1.5">
                {lesson.checklist.map((item, i) => (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() =>
                        setCheckItems((p) => ({ ...p, [i]: !p[i] }))
                      }
                      className={`w-full flex items-start gap-3 rounded-lg px-3 py-2.5 text-sm text-left transition hover:bg-white/[0.02] ${
                        checkItems[i] ? "text-emerald-300" : "text-screens-muted"
                      }`}
                    >
                      <CheckCircle2
                        className={`h-4 w-4 shrink-0 mt-0.5 transition ${
                          checkItems[i] ? "text-emerald-400" : "text-screens-muted/40"
                        }`}
                      />
                      <span className={checkItems[i] ? "line-through opacity-60" : ""}>{item}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Warning */}
          <div className="mt-5 flex items-start gap-2 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-xs text-amber-200/80">
            <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5 text-amber-400" />
            Cruza evidências antes do veredito. Print com data/hora visível e nomeia corretamente.
          </div>

          {/* Prev / Next */}
          <div className="mt-8 flex justify-between gap-4">
            {prev && hasMobileLessonAccess(user, prev) ? (
              <Link
                href={`/dashboard/curso-mobile/${prev.id}`}
                className="btn-secondary"
              >
                <ChevronLeft className="h-4 w-4" />
                Anterior
              </Link>
            ) : (
              <span />
            )}
            {next && hasMobileLessonAccess(user, next) && (
              <Link
                href={`/dashboard/curso-mobile/${next.id}`}
                className={`btn-primary ml-auto !bg-gradient-to-r !text-white border-0 ${
                  lesson.platform === "ios"
                    ? "!from-zinc-500 !to-zinc-700"
                    : "!from-emerald-600 !to-teal-600"
                }`}
              >
                Próxima
                <ChevronRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>

        {/* Mobile sticky nav */}
        <div className="xl:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-screens-border bg-screens-bg/95 backdrop-blur px-4 py-3 flex items-center justify-between">
          {prev && hasMobileLessonAccess(user, prev) ? (
            <Link href={`/dashboard/curso-mobile/${prev.id}`} className="text-xs text-screens-muted">
              ← Ant.
            </Link>
          ) : (
            <Link href="/dashboard/curso-mobile" className="text-xs text-screens-muted">
              Hub
            </Link>
          )}
          <span className={`text-xs font-mono ${theme.color}`}>
            {idx + 1}/{platformLessons.length}
          </span>
          {next && hasMobileLessonAccess(user, next) ? (
            <Link href={`/dashboard/curso-mobile/${next.id}`} className="text-xs text-white font-medium">
              Próx. →
            </Link>
          ) : (
            <span className="w-8" />
          )}
        </div>
      </article>
    </div>
    </ContentProtection>
  );
}
