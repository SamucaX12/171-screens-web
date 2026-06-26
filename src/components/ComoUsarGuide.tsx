"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ChevronDown,
  Download,
  ExternalLink,
  HelpCircle,
  MessageCircle,
  Play,
} from "lucide-react";
import { GUIDE_STEPS, QUICK_FAQ, DISCORD_URL } from "@/lib/como-usar-data";

export function ComoUsarGuide({ compact = false }: { compact?: boolean }) {
  const [openStep, setOpenStep] = useState<string | null>(compact ? null : "login");
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  if (compact) {
    return (
      <section className="surface p-5">
        <div className="flex flex-col md:flex-row md:items-center gap-5">
          <div className="relative h-28 w-full md:w-40 shrink-0 overflow-hidden rounded-lg border border-screens-border">
            <Image src="/guide/como-usar-02-curso.png" alt="Como usar" fill className="object-cover" />
          </div>
          <div className="flex-1">
            <p className="label-xs">Primeira vez?</p>
            <h2 className="mt-1 text-lg font-medium">Guia completo do curso</h2>
            <p className="mt-1 text-sm text-screens-muted">Login, cargo, aulas e download do app.</p>
            <Link href="/dashboard/como-usar" className="btn-primary mt-4">
              <Play className="h-4 w-4" />
              Ver guia
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Hero download CTA */}
      <section className="surface p-6 md:p-8">
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          <div className="relative h-40 w-full lg:w-56 shrink-0 overflow-hidden rounded-lg border border-screens-border">
            <Image src="/guide/como-usar-04-download.png" alt="Baixar app" fill className="object-cover" priority />
          </div>
          <div className="flex-1 text-center lg:text-left">
            <p className="label-xs">App Scanner</p>
            <h1 className="mt-1 text-2xl font-semibold">Como baixar o app</h1>
            <p className="mt-2 text-sm text-screens-muted max-w-lg">
              Link <code className="rounded bg-screens-bg px-1.5 py-0.5 text-xs">/install/SEUPIN</code> →
              baixa o <strong className="text-zinc-300">171-screens.exe</strong> → digita o PIN → INICIAR SCAN
            </p>
            <div className="mt-4 flex flex-wrap gap-2 justify-center lg:justify-start">
              <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <MessageCircle className="h-4 w-4" />
                Discord
              </a>
              <Link href="/dashboard/scanner/pins" className="btn-secondary">
                <Download className="h-4 w-4" />
                Criar pin
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section>
        <h2 className="text-2xl font-black mb-2">Passo a passo do curso</h2>
        <p className="text-screens-muted text-sm mb-8">
          Segue na ordem. Se travar, abre a pergunta frequente de cada passo.
        </p>

        <div className="space-y-4">
          {GUIDE_STEPS.map((s) => {
            const open = openStep === s.id;
            return (
              <article
                key={s.id}
                className={`rounded-2xl border overflow-hidden transition ${
                  open ? "border-screens-accent/40 bg-screens-card/60" : "border-screens-border bg-screens-card/30"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenStep(open ? null : s.id)}
                  className="flex w-full items-center gap-4 p-5 text-left hover:bg-white/[0.02]"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-screens-accent/15 text-lg font-black text-screens-accent">
                    {s.step}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-lg">{s.title}</p>
                    <p className="text-sm text-screens-muted">{s.subtitle}</p>
                  </div>
                  <ChevronDown className={`h-5 w-5 text-screens-muted transition ${open ? "rotate-180" : ""}`} />
                </button>

                {open && (
                  <div className="border-t border-screens-border/50 p-5 md:p-6 space-y-6">
                    <div className="relative aspect-video w-full max-w-2xl mx-auto overflow-hidden rounded-xl border border-screens-border">
                      <Image
                        src={s.image}
                        alt={s.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <ol className="space-y-3">
                      {s.bullets.map((b, i) => (
                        <li key={i} className="flex gap-3 text-sm text-screens-muted">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-screens-accent/20 text-xs font-bold text-screens-accent">
                            {i + 1}
                          </span>
                          <span
                            className="pt-0.5"
                            dangerouslySetInnerHTML={{
                              __html: b.replace(/\*\*(.*?)\*\*/g, "<strong class='text-white'>$1</strong>"),
                            }}
                          />
                        </li>
                      ))}
                    </ol>

                    {s.cta && (
                      <Link
                        href={s.cta.href}
                        {...(s.cta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="inline-flex items-center gap-2 rounded-xl bg-screens-accent px-5 py-2.5 text-sm font-bold text-screens-bg"
                      >
                        {s.cta.label}
                        {s.cta.external && <ExternalLink className="h-3.5 w-3.5" />}
                      </Link>
                    )}

                    {s.faq && s.faq.length > 0 && (
                      <div className="rounded-xl border border-screens-border/60 bg-screens-bg/50 p-4">
                        <p className="text-xs font-bold uppercase tracking-wider text-screens-muted flex items-center gap-2 mb-3">
                          <HelpCircle className="h-3.5 w-3.5" /> Dúvidas comuns deste passo
                        </p>
                        <div className="space-y-2">
                          {s.faq.map((f) => (
                            <details key={f.q} className="group">
                              <summary className="cursor-pointer text-sm font-medium text-white/90 hover:text-screens-accent list-none flex items-center gap-2">
                                <ChevronDown className="h-3.5 w-3.5 text-screens-muted group-open:rotate-180 transition" />
                                {f.q}
                              </summary>
                              <p className="mt-2 pl-5 text-sm text-screens-muted">{f.a}</p>
                            </details>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* Global FAQ */}
      <section className="rounded-2xl border border-screens-border p-6 md:p-8">
        <h2 className="text-xl font-black flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-screens-accent" />
          Perguntas que todo mundo faz
        </h2>
        <div className="mt-6 space-y-3">
          {QUICK_FAQ.map((f) => (
            <div key={f.q} className="rounded-xl border border-screens-border/50 overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === f.q ? null : f.q)}
                className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm font-semibold hover:bg-white/[0.02]"
              >
                {f.q}
                <ChevronDown className={`h-4 w-4 shrink-0 text-screens-muted transition ${openFaq === f.q ? "rotate-180" : ""}`} />
              </button>
              {openFaq === f.q && (
                <p className="border-t border-screens-border/50 px-4 py-3 text-sm text-screens-muted">{f.a}</p>
              )}
            </div>
          ))}
        </div>
        <a
          href={DISCORD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-screens-accent hover:underline"
        >
          <MessageCircle className="h-4 w-4" />
          Ainda com dúvida? Abre ticket no Discord →
        </a>
      </section>
    </div>
  );
}
