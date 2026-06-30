"use client";

import { useState } from "react";
import { CheckCircle2, Circle, ChevronRight, AlertTriangle } from "lucide-react";

/** Renderiza corpo da aula com passos visuais e checklist interativo */
export function LessonBody({
  body,
  accentClass = "text-zinc-400",
  accentColor,
}: {
  body: string;
  accentClass?: string;
  accentColor?: string;
}) {
  const blocks = parseBlocks(body);
  const color = accentColor ?? "#a78bfa";

  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        if (block.type === "steps") {
          return <StepList key={i} items={block.items} color={color} />;
        }
        if (block.type === "checklist") {
          return <CheckList key={i} items={block.items} color={color} />;
        }
        if (block.type === "bullets") {
          return (
            <ul key={i} className="space-y-2">
              {block.items.map((item, j) => (
                <li key={j} className="flex items-start gap-2.5 text-sm text-screens-muted leading-relaxed">
                  <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === "warning") {
          return (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl border px-4 py-3"
              style={{ borderColor: "#f59e0b30", background: "#f59e0b08" }}
            >
              <AlertTriangle className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
              <p className="text-sm text-amber-200/80 leading-6">{block.text}</p>
            </div>
          );
        }
        return (
          <p key={i} className="text-sm text-screens-muted leading-7 whitespace-pre-line">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}

function StepList({ items, color }: { items: string[]; color: string }) {
  return (
    <ol className="space-y-2">
      {items.map((step, j) => (
        <li
          key={j}
          className="flex gap-3 rounded-xl border border-screens-border/60 bg-screens-bg px-4 py-3 transition hover:border-screens-border"
        >
          <span
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-black mt-0.5"
            style={{ backgroundColor: `${color}18`, color }}
          >
            {j + 1}
          </span>
          <span className="text-sm text-screens-muted leading-relaxed">{step}</span>
        </li>
      ))}
    </ol>
  );
}

function CheckList({ items, color }: { items: string[]; color: string }) {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const pct = items.length ? Math.round((checked.size / items.length) * 100) : 0;

  return (
    <div className="rounded-xl border border-screens-border overflow-hidden">
      {/* Progress */}
      <div
        className="flex items-center gap-3 px-4 py-2.5 border-b border-screens-border"
        style={{ background: `${color}06` }}
      >
        <div className="flex-1 h-1 rounded-full bg-screens-border">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${pct}%`, backgroundColor: color }}
          />
        </div>
        <span className="text-[10px] font-mono text-screens-muted">
          {checked.size}/{items.length}
        </span>
      </div>

      <ul className="divide-y divide-screens-border/50">
        {items.map((item, j) => {
          const done = checked.has(j);
          return (
            <li key={j}>
              <button
                type="button"
                onClick={() => toggle(j)}
                className="flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-white/[0.015]"
              >
                {done ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color }} />
                ) : (
                  <Circle className="mt-0.5 h-4 w-4 shrink-0 text-zinc-700" />
                )}
                <span
                  className="text-sm leading-relaxed transition-colors"
                  style={{
                    color: done ? "#52525b" : "#a1a1aa",
                    textDecoration: done ? "line-through" : "none",
                  }}
                >
                  {item}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

type Block =
  | { type: "text"; text: string }
  | { type: "warning"; text: string }
  | { type: "steps"; items: string[] }
  | { type: "checklist"; items: string[] }
  | { type: "bullets"; items: string[] };

function parseBlocks(body: string): Block[] {
  const lines = body.split("\n");
  const blocks: Block[] = [];
  let textBuf: string[] = [];
  let stepBuf: string[] = [];
  let checkBuf: string[] = [];
  let bulletBuf: string[] = [];

  function flushAll(except?: string) {
    if (except !== "text" && textBuf.length) {
      blocks.push({ type: "text", text: textBuf.join("\n").trim() });
      textBuf = [];
    }
    if (except !== "steps" && stepBuf.length) {
      blocks.push({ type: "steps", items: [...stepBuf] });
      stepBuf = [];
    }
    if (except !== "checklist" && checkBuf.length) {
      blocks.push({ type: "checklist", items: [...checkBuf] });
      checkBuf = [];
    }
    if (except !== "bullets" && bulletBuf.length) {
      blocks.push({ type: "bullets", items: [...bulletBuf] });
      bulletBuf = [];
    }
  }

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flushAll();
      continue;
    }

    // ⚠️ WARNING lines
    if (line.startsWith("⚠️") || line.startsWith("AVISO:") || line.startsWith("ATENÇÃO:")) {
      flushAll();
      blocks.push({ type: "warning", text: line.replace(/^⚠️\s*|^AVISO:\s*|^ATENÇÃO:\s*/i, "") });
      continue;
    }

    // □ or [ ] → checklist
    if (line.match(/^[□☐\[\]\s]*□\s+|^\[ \]\s+/)) {
      flushAll("checklist");
      checkBuf.push(line.replace(/^[□☐\[\]\s]*□\s+|^\[ \]\s+/, "").trim());
      continue;
    }

    // Numbered step
    const stepMatch = line.match(/^(?:PASSO\s+\d+\s*[—\-–]\s*)?(\d+)\.\s+(.+)/i);
    if (stepMatch) {
      flushAll("steps");
      stepBuf.push(stepMatch[2].trim());
      continue;
    }

    // Bullet
    const bulletMatch = line.match(/^[•\-\*]\s+(.+)/);
    if (bulletMatch) {
      flushAll("bullets");
      bulletBuf.push(bulletMatch[1].trim());
      continue;
    }

    flushAll("text");
    textBuf.push(raw);
  }

  flushAll();
  return blocks.filter((b) => (b.type === "text" || b.type === "warning" ? b.text : b.items.length));
}
