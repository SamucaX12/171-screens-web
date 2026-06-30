"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Bot,
  GraduationCap,
  Loader2,
  Maximize2,
  Minimize2,
  Monitor,
  Send,
  Trash2,
  X,
  Zap,
  Sparkles,
  Copy,
  Check,
} from "lucide-react";

export type AIMode = "professor" | "screenshare" | "resenha";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: { title: string; link?: string }[];
};

const MODES: {
  id: AIMode;
  label: string;
  icon: React.ReactNode;
  color: string;
  hint: string;
  tagline: string;
  emoji: string;
}[] = [
  {
    id: "professor",
    label: "Professor",
    icon: <GraduationCap className="h-3.5 w-3.5" />,
    color: "#a855f7",
    hint: "Como detectar uma .dll sem assinatura?",
    tagline: "Explica completo, passo a passo",
    emoji: "🎓",
  },
  {
    id: "screenshare",
    label: "Screen Share",
    icon: <Monitor className="h-3.5 w-3.5" />,
    color: "#38bdf8",
    hint: "Player abriu o PC, por onde começo?",
    tagline: "Guia em tempo real durante a SS",
    emoji: "🖥️",
  },
  {
    id: "resenha",
    label: "Resenha",
    icon: <Zap className="h-3.5 w-3.5" />,
    color: "#fbbf24",
    hint: "Explica ADB remoto mermão",
    tagline: "Sem censura. Xinga mas ensina.",
    emoji: "🔥",
  },
];

function renderContent(text: string) {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <CodeBlock key={i} code={codeLines.join("\n")} lang={lang} />
      );
    } else if (line.startsWith("**") && line.endsWith("**") && line.length > 4) {
      elements.push(
        <p key={i} className="font-bold text-white mt-1">
          {line.slice(2, -2)}
        </p>
      );
    } else if (line.startsWith("- ") || line.startsWith("• ")) {
      elements.push(
        <li key={i} className="ml-3 text-screens-muted-bright list-disc list-inside">
          {parseBold(line.slice(2))}
        </li>
      );
    } else if (line === "") {
      elements.push(<br key={i} />);
    } else {
      elements.push(
        <p key={i} className="text-screens-muted-bright leading-relaxed">
          {parseBold(line)}
        </p>
      );
    }
  }

  return <div className="space-y-1 text-sm">{elements}</div>;
}

function parseBold(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

function CodeBlock({ code, lang }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="relative my-2 overflow-hidden rounded-xl border border-white/[0.08]" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.06]">
        <span className="text-[10px] font-mono text-screens-muted">{lang || "code"}</span>
        <button
          onClick={copy}
          className="flex items-center gap-1 text-[10px] text-screens-muted hover:text-white transition-colors"
        >
          {copied ? <Check className="h-3 w-3 text-neon-green" /> : <Copy className="h-3 w-3" />}
          {copied ? "Copiado" : "Copiar"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-xs font-mono text-zinc-300 leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function TypingDots({ color }: { color: string }) {
  return (
    <div className="flex items-center gap-1.5 py-1">
      {[0, 200, 400].map((delay) => (
        <span
          key={delay}
          className="h-2 w-2 rounded-full"
          style={{
            backgroundColor: color,
            opacity: 0.6,
            animation: `typing-dot 1.4s ease-in-out infinite ${delay}ms`,
          }}
        />
      ))}
    </div>
  );
}

export function CourseAIChat({
  lessonId,
  variant = "page",
  onClose,
  initialMode,
}: {
  lessonId?: string;
  variant?: "page" | "panel" | "fab";
  onClose?: () => void;
  initialMode?: AIMode;
}) {
  const [mode, setMode]         = useState<AIMode>(initialMode ?? "professor");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput]       = useState("");
  const [loading, setLoading]   = useState(false);
  const bottomRef  = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLTextAreaElement>(null);
  const currentMode = MODES.find((m) => m.id === mode)!;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  function switchMode(m: AIMode) {
    setMode(m);
    setMessages([]);
  }

  const send = useCallback(
    async (text: string) => {
      const q = text.trim();
      if (!q || loading) return;

      const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: q };
      setMessages((m) => [...m, userMsg]);
      setInput("");
      setLoading(true);

      try {
        const history = [...messages, userMsg].map((m) => ({
          role: m.role,
          content: m.content,
        }));
        const res  = await fetch("/api/course-ai/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: q, lessonId, history, mode }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "erro");

        setMessages((m) => [
          ...m,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: data.reply,
            sources: data.sources,
          },
        ]);
      } catch {
        setMessages((m) => [
          ...m,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: "Erro ao processar. Tenta de novo.",
          },
        ]);
      } finally {
        setLoading(false);
        inputRef.current?.focus();
      }
    },
    [loading, messages, lessonId, mode]
  );

  const isCompact = variant === "fab" || variant === "panel";

  return (
    <div
      className={`flex flex-col ${
        variant === "page"
          ? "min-h-full"
          : isCompact
            ? "h-full max-h-[min(640px,calc(100vh-80px))] rounded-2xl border border-white/[0.08] overflow-hidden"
            : ""
      }`}
      style={{
        background:
          variant !== "page"
            ? "linear-gradient(180deg, rgba(7,7,14,0.97) 0%, rgba(3,3,6,0.99) 100%)"
            : undefined,
        backdropFilter: variant !== "page" ? "blur(24px)" : undefined,
      }}
    >
      {/* ── Header ── */}
      <div
        className="shrink-0 border-b border-white/[0.06]"
        style={{ background: "rgba(3,3,6,0.6)" }}
      >
        {/* Title row */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg shrink-0"
              style={{
                background: `linear-gradient(135deg, ${currentMode.color}30, ${currentMode.color}10)`,
                border: `1px solid ${currentMode.color}30`,
                color: currentMode.color,
              }}
            >
              {currentMode.icon}
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-none">171 Tutor IA</p>
              <p className="text-[10px] text-screens-muted leading-none mt-0.5">
                {currentMode.tagline}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {variant === "page" && (
              <Link
                href="/dashboard/curso"
                className="text-[11px] text-screens-muted hover:text-white px-2 py-1 rounded-lg hover:bg-white/[0.05] transition-all"
              >
                Curso
              </Link>
            )}
            {messages.length > 0 && (
              <button
                type="button"
                onClick={() => setMessages([])}
                title="Limpar conversa"
                className="p-1.5 text-screens-muted hover:text-red-400 rounded-lg hover:bg-white/[0.05] transition-all"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            )}
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-screens-muted hover:text-white rounded-lg hover:bg-white/[0.05] transition-all"
              >
                {variant === "fab" ? <Minimize2 className="h-4 w-4" /> : <X className="h-4 w-4" />}
              </button>
            )}
          </div>
        </div>

        {/* Mode tabs */}
        <div className="flex border-t border-white/[0.05]">
          {MODES.map((m) => {
            const active = mode === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => switchMode(m.id)}
                className="flex flex-1 items-center justify-center gap-1.5 px-2 py-2.5 text-[11px] font-semibold transition-all duration-200"
                style={
                  active
                    ? {
                        color: m.color,
                        background: `${m.color}0d`,
                        borderBottom: `2px solid ${m.color}`,
                      }
                    : {
                        color: "#6060a0",
                        borderBottom: "2px solid transparent",
                      }
                }
              >
                <span style={active ? { filter: `drop-shadow(0 0 4px ${m.color}60)` } : {}}>
                  {m.icon}
                </span>
                {m.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Messages ── */}
      <div
        className={`flex-1 overflow-y-auto ${
          variant === "page" ? "max-w-2xl mx-auto w-full px-4 py-5" : "px-4 py-4"
        } space-y-4`}
      >
        {/* Empty state */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-center animate-fade-in">
            <div
              className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl"
              style={{
                background: `linear-gradient(135deg, ${currentMode.color}20, ${currentMode.color}08)`,
                border: `1px solid ${currentMode.color}25`,
              }}
            >
              {currentMode.emoji}
            </div>
            <p className="text-sm font-semibold text-white">
              Modo{" "}
              <span style={{ color: currentMode.color }}>{currentMode.label}</span>
            </p>
            <p className="mt-1 text-xs text-screens-muted max-w-48">{currentMode.tagline}</p>

            {/* Quick prompts */}
            <div className="mt-5 w-full max-w-sm space-y-2">
              {MODES.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => { switchMode(m.id); send(m.hint); }}
                  className="w-full rounded-xl border border-white/[0.07] px-4 py-3 text-left text-[12px] transition-all duration-200 hover:border-white/[0.13] hover:bg-white/[0.04]"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  <span className="font-bold" style={{ color: m.color }}>
                    {m.emoji} {m.label}
                  </span>
                  <span className="text-screens-muted ml-2">&ldquo;{m.hint}&rdquo;</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message bubbles */}
        {messages.map((m, idx) => (
          <div
            key={m.id}
            className={`flex animate-fade-in-up ${m.role === "user" ? "justify-end" : "justify-start"}`}
            style={{ animationDelay: `${idx * 20}ms` }}
          >
            {m.role === "assistant" && (
              <div
                className="mr-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full self-end mb-1"
                style={{
                  background: `linear-gradient(135deg, ${currentMode.color}25, ${currentMode.color}10)`,
                  border: `1px solid ${currentMode.color}25`,
                }}
              >
                <Bot className="h-3.5 w-3.5" style={{ color: currentMode.color }} />
              </div>
            )}

            <div
              className={`max-w-[88%] rounded-2xl ${
                m.role === "user"
                  ? "rounded-br-sm px-4 py-3"
                  : "rounded-bl-sm border border-white/[0.07] px-4 py-3.5"
              }`}
              style={
                m.role === "user"
                  ? {
                      background: `linear-gradient(135deg, ${currentMode.color}, ${currentMode.color}cc)`,
                      color: "black",
                      fontWeight: "500",
                      fontSize: "14px",
                      lineHeight: "1.5",
                    }
                  : {
                      background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                      backdropFilter: "blur(8px)",
                    }
              }
            >
              {m.role === "user" ? (
                <p className="text-sm whitespace-pre-wrap" style={{ color: "rgba(0,0,0,0.9)" }}>
                  {m.content}
                </p>
              ) : (
                renderContent(m.content)
              )}

              {/* Sources */}
              {m.sources && m.sources.length > 0 && (
                <div className="mt-3 pt-3 border-t border-white/[0.07] space-y-1">
                  <p className="text-[10px] text-screens-muted font-semibold uppercase tracking-wider mb-1.5">
                    Referências
                  </p>
                  {m.sources.map((s, i) =>
                    s.link ? (
                      <Link
                        key={i}
                        href={s.link}
                        className="flex items-center gap-1.5 text-[11px] text-screens-muted hover:text-white transition-colors"
                      >
                        <GraduationCap className="h-3 w-3 shrink-0" />
                        {s.title}
                      </Link>
                    ) : (
                      <p key={i} className="text-[11px] text-screens-muted opacity-60">
                        {s.title}
                      </p>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div className="flex justify-start animate-fade-in">
            <div
              className="mr-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full self-end mb-1"
              style={{
                background: `linear-gradient(135deg, ${currentMode.color}25, ${currentMode.color}10)`,
                border: `1px solid ${currentMode.color}25`,
              }}
            >
              <Bot className="h-3.5 w-3.5" style={{ color: currentMode.color }} />
            </div>
            <div
              className="rounded-2xl rounded-bl-sm border border-white/[0.07] px-4 py-3.5"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                backdropFilter: "blur(8px)",
              }}
            >
              <TypingDots color={currentMode.color} />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── Input ── */}
      <div
        className={`shrink-0 border-t border-white/[0.06] p-3 ${
          variant === "page" ? "max-w-2xl mx-auto w-full" : ""
        }`}
        style={{ background: "rgba(3,3,6,0.6)" }}
      >
        <form
          onSubmit={(e) => { e.preventDefault(); send(input); }}
          className="flex gap-2 items-end"
        >
          <div className="relative flex-1">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              rows={1}
              placeholder={`${currentMode.emoji} ${currentMode.label} — Enter para enviar`}
              className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm outline-none text-white transition-all duration-200 placeholder:text-screens-muted/50"
              style={{ minHeight: "44px", maxHeight: "120px" }}
              onInput={(e) => {
                const el = e.currentTarget;
                el.style.height = "auto";
                el.style.height = Math.min(el.scrollHeight, 120) + "px";
              }}
            />
          </div>
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-xl transition-all duration-200 disabled:opacity-30 disabled:scale-95"
            style={{
              background: `linear-gradient(135deg, ${currentMode.color}, ${currentMode.color}cc)`,
              boxShadow: loading || !input.trim() ? "none" : `0 0 16px ${currentMode.color}50`,
            }}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin text-black" />
            ) : (
              <Send className="h-4 w-4 text-black" />
            )}
          </button>
        </form>
        <p className="mt-1.5 text-center text-[10px] text-screens-muted/50">
          Shift+Enter para nova linha · Enter para enviar
        </p>
      </div>
    </div>
  );
}

/* ── Floating Button ── */
export function CourseAIFab({ lessonId }: { lessonId?: string }) {
  const [open, setOpen]         = useState(false);
  const [expanded, setExpanded] = useState(false);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
        style={{
          background: "linear-gradient(135deg, #a855f7, #0ea5e9)",
          boxShadow: "0 0 30px rgba(168,85,247,0.4), 0 8px 32px rgba(0,0,0,0.5)",
        }}
      >
        <Sparkles className="h-4 w-4" />
        Tutor IA
        <span
          className="ml-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-black"
          style={{ background: "rgba(0,0,0,0.25)" }}
        >
          3 modos
        </span>
      </button>
    );
  }

  return (
    <div
      className={`fixed z-50 ${
        expanded ? "inset-4 md:inset-8" : "bottom-4 right-4 w-[min(100vw-2rem,420px)]"
      } transition-all duration-300`}
      style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
    >
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="absolute -top-2 -left-2 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-white/[0.1] text-screens-muted hover:text-white shadow-xl transition-all"
        style={{ background: "rgba(7,7,14,0.95)", backdropFilter: "blur(12px)" }}
      >
        {expanded ? <Minimize2 className="h-3 w-3" /> : <Maximize2 className="h-3 w-3" />}
      </button>
      <CourseAIChat
        lessonId={lessonId}
        variant="fab"
        onClose={() => {
          setOpen(false);
          setExpanded(false);
        }}
      />
    </div>
  );
}
