"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Bot, Loader2, Send, X, Minimize2, Maximize2, BookOpen } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: { title: string; link?: string }[];
};

const SUGGESTIONS = [
  "Como achar cheat no Prefetch?",
  "DLL List do BlueStacks?",
  "Diferença Tier I e II?",
  "Como funciona o booster?",
];

function renderText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-medium text-white">{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

export function CourseAIChat({
  lessonId,
  variant = "page",
  onClose,
}: {
  lessonId?: string;
  variant?: "page" | "panel" | "fab";
  onClose?: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = useCallback(
    async (text: string) => {
      const q = text.trim();
      if (!q || loading) return;

      const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: q };
      setMessages((m) => [...m, userMsg]);
      setInput("");
      setLoading(true);

      try {
        const history = [...messages, userMsg].map((m) => ({ role: m.role, content: m.content }));
        const res = await fetch("/api/course-ai/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: q, lessonId, history }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "erro");

        setMessages((m) => [
          ...m,
          { id: crypto.randomUUID(), role: "assistant", content: data.reply, sources: data.sources },
        ]);
      } catch {
        setMessages((m) => [
          ...m,
          { id: crypto.randomUUID(), role: "assistant", content: "Erro ao processar. Tenta de novo." },
        ]);
      } finally {
        setLoading(false);
        inputRef.current?.focus();
      }
    },
    [loading, messages, lessonId]
  );

  const isCompact = variant === "fab" || variant === "panel";

  return (
    <div
      className={`flex flex-col bg-screens-bg ${
        variant === "page"
          ? "min-h-full"
          : isCompact
            ? "h-full max-h-[min(560px,calc(100vh-100px))] rounded-xl border border-screens-border overflow-hidden"
            : ""
      }`}
    >
      <div className="shrink-0 flex items-center justify-between border-b border-screens-border px-4 py-3">
        <div className="flex items-center gap-2.5">
          <Bot className="h-4 w-4 text-screens-muted" />
          <div>
            <p className="text-sm font-medium">171 Tutor IA</p>
            <p className="text-[10px] text-screens-muted">Dúvidas do curso</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {variant === "page" && (
            <Link href="/dashboard/curso" className="text-[11px] text-screens-muted hover:text-white px-2">
              Curso
            </Link>
          )}
          {onClose && (
            <button type="button" onClick={onClose} className="p-1.5 text-screens-muted hover:text-white rounded-md hover:bg-white/[0.04]">
              {variant === "fab" ? <Minimize2 className="h-4 w-4" /> : <X className="h-4 w-4" />}
            </button>
          )}
        </div>
      </div>

      <div className={`flex-1 overflow-y-auto p-4 space-y-3 ${variant === "page" ? "max-w-2xl mx-auto w-full" : ""}`}>
        {messages.length === 0 && (
          <div className="py-8 text-center">
            <p className="text-sm font-medium">Pergunta qualquer coisa do curso</p>
            <p className="mt-1 text-xs text-screens-muted">Prefetch, Sysmon, bypass, tiers…</p>
            <div className="mt-5 flex flex-wrap justify-center gap-1.5">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="rounded-full border border-screens-border px-3 py-1 text-[11px] text-screens-muted hover:bg-white/[0.04] hover:text-white transition"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[90%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                m.role === "user"
                  ? "bg-white text-black"
                  : "border border-screens-border bg-screens-card text-screens-muted"
              }`}
            >
              {renderText(m.content)}
              {m.sources && m.sources.length > 0 && (
                <div className="mt-2 pt-2 border-t border-screens-border space-y-1">
                  {m.sources.map((s, i) =>
                    s.link ? (
                      <Link key={i} href={s.link} className="flex items-center gap-1 text-[11px] text-zinc-300 hover:text-white">
                        <BookOpen className="h-3 w-3" /> {s.title}
                      </Link>
                    ) : (
                      <p key={i} className="text-[11px]">{s.title}</p>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-screens-muted">
            <Loader2 className="h-3.5 w-3.5 animate-spin" /> Pensando…
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className={`shrink-0 border-t border-screens-border p-3 ${variant === "page" ? "max-w-2xl mx-auto w-full" : ""}`}>
        <form
          onSubmit={(e) => { e.preventDefault(); send(input); }}
          className="flex gap-2"
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); }
            }}
            rows={1}
            placeholder="Sua dúvida…"
            className="flex-1 resize-none rounded-lg border border-screens-border bg-screens-card px-3 py-2.5 text-sm outline-none focus:border-zinc-500"
          />
          <button type="submit" disabled={loading || !input.trim()} className="btn-primary !px-3 disabled:opacity-40">
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

export function CourseAIFab({ lessonId }: { lessonId?: string }) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full border border-screens-border bg-screens-card px-4 py-2.5 text-sm font-medium text-white shadow-lg hover:bg-screens-card-hover transition"
      >
        <Bot className="h-4 w-4" />
        Tutor IA
      </button>
    );
  }

  return (
    <div className={`fixed z-50 ${expanded ? "inset-4 md:inset-8" : "bottom-4 right-4 w-[min(100vw-2rem,380px)]"}`}>
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="absolute -top-2 -left-2 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-screens-border bg-screens-card text-screens-muted hover:text-white"
      >
        {expanded ? <Minimize2 className="h-3 w-3" /> : <Maximize2 className="h-3 w-3" />}
      </button>
      <CourseAIChat lessonId={lessonId} variant="fab" onClose={() => { setOpen(false); setExpanded(false); }} />
    </div>
  );
}
