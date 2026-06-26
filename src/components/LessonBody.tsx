"use client";

/** Renderiza corpo da aula — listas numeradas viram passos visuais */
export function LessonBody({ body, accentClass = "text-zinc-400" }: { body: string; accentClass?: string }) {
  const blocks = parseBlocks(body);

  return (
    <div className="space-y-4">
      {blocks.map((block, i) => {
        if (block.type === "steps") {
          return (
            <ol key={i} className="space-y-2">
              {block.items.map((step, j) => (
                <li key={j} className="flex gap-3 rounded-lg border border-screens-border bg-screens-bg px-3 py-3">
                  <span className={`text-xs font-mono shrink-0 w-5 ${accentClass}`}>{j + 1}</span>
                  <span className="text-sm text-screens-muted leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          );
        }
        if (block.type === "bullets") {
          return (
            <ul key={i} className="space-y-2">
              {block.items.map((item, j) => (
                <li key={j} className="flex gap-2 text-sm text-screens-muted leading-relaxed">
                  <span className="text-screens-muted mt-1.5">·</span>
                  {item}
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="text-sm text-screens-muted leading-relaxed whitespace-pre-line">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}

type Block =
  | { type: "text"; text: string }
  | { type: "steps"; items: string[] }
  | { type: "bullets"; items: string[] };

function parseBlocks(body: string): Block[] {
  const lines = body.split("\n");
  const blocks: Block[] = [];
  let textBuf: string[] = [];
  let stepBuf: string[] = [];
  let bulletBuf: string[] = [];

  function flushText() {
    if (textBuf.length) {
      blocks.push({ type: "text", text: textBuf.join("\n").trim() });
      textBuf = [];
    }
  }
  function flushSteps() {
    if (stepBuf.length) {
      blocks.push({ type: "steps", items: [...stepBuf] });
      stepBuf = [];
    }
  }
  function flushBullets() {
    if (bulletBuf.length) {
      blocks.push({ type: "bullets", items: [...bulletBuf] });
      bulletBuf = [];
    }
  }

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flushSteps();
      flushBullets();
      continue;
    }

    const stepMatch = line.match(/^(?:PASSO\s+\d+\s*[—\-–]\s*)?(\d+)\.\s+(.+)/i);
    const bulletMatch = line.match(/^[•\-\*]\s+(.+)/);

    if (stepMatch) {
      flushText();
      flushBullets();
      stepBuf.push(stepMatch[2].trim());
    } else if (bulletMatch) {
      flushText();
      flushSteps();
      bulletBuf.push(bulletMatch[1].trim());
    } else {
      flushSteps();
      flushBullets();
      textBuf.push(raw);
    }
  }

  flushSteps();
  flushBullets();
  flushText();
  return blocks.filter((b) => (b.type === "text" ? b.text : b.items.length));
}
