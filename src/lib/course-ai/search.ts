import { hasLessonAccess } from "@/lib/tier-access";
import type { SessionUser } from "@/lib/types";
import { getCourseKnowledge, type KnowledgeChunk } from "./knowledge";

const STOP = new Set([
  "que", "qual", "quais", "como", "onde", "quando", "por", "para", "com", "sem", "uma", "uns", "umas",
  "the", "and", "dos", "das", "nos", "nas", "aos", "pela", "pelo", "isso", "essa", "esse", "aqui",
  "voce", "você", "meu", "minha", "seu", "sua", "tem", "ter", "ser", "está", "esta", "isso", "muito",
]);

export type ScoredChunk = KnowledgeChunk & { score: number; excerpt: string };

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, " ");
}

function tokenize(text: string) {
  return normalize(text)
    .split(/\s+/)
    .filter((t) => t.length >= 2 && !STOP.has(t));
}

function excerpt(content: string, terms: string[], max = 320) {
  const lower = content.toLowerCase();
  let best = 0;
  for (const term of terms) {
    const idx = lower.indexOf(term);
    if (idx >= 0 && (best === 0 || idx < best)) best = idx;
  }
  const start = Math.max(0, best - 40);
  const slice = content.slice(start, start + max).trim();
  return (start > 0 ? "…" : "") + slice + (start + max < content.length ? "…" : "");
}

function scoreChunk(chunk: KnowledgeChunk, terms: string[]): number {
  if (!terms.length) return 0;
  const title = normalize(chunk.title);
  const body = normalize(chunk.content);
  let score = 0;

  for (const term of terms) {
    if (title.includes(term)) score += 8;
    if (body.includes(term)) {
      const count = body.split(term).length - 1;
      score += Math.min(count * 2, 10);
    }
  }

  if (chunk.type === "lesson-intro") score += 1;
  if (chunk.type === "faq" || chunk.type === "meta") score += 2;
  return score;
}

export function searchCourseKnowledge(
  query: string,
  user: SessionUser,
  opts?: { lessonId?: string; limit?: number }
): ScoredChunk[] {
  const terms = tokenize(query);
  const limit = opts?.limit ?? 8;
  const all = getCourseKnowledge();

  const accessible = all.filter((chunk) => {
    if (!chunk.lessonId) return true;
    const lesson = { id: chunk.lessonId, tier: chunk.tier! };
    return hasLessonAccess(user, lesson);
  });

  let scored = accessible
    .map((chunk) => {
      let score = scoreChunk(chunk, terms);
      if (opts?.lessonId && chunk.lessonId === opts.lessonId) score += 12;
      return {
        ...chunk,
        score,
        excerpt: excerpt(chunk.content, terms),
      };
    })
    .filter((c) => c.score > 0)
    .sort((a, b) => b.score - a.score);

  if (!scored.length && terms.length) {
    scored = accessible
      .map((chunk) => ({
        ...chunk,
        score: 1,
        excerpt: excerpt(chunk.content, terms, 200),
      }))
      .slice(0, limit);
  }

  return scored.slice(0, limit);
}

export function formatContext(chunks: ScoredChunk[]) {
  return chunks
    .map(
      (c, i) =>
        `[${i + 1}] ${c.title}\n${c.content.slice(0, 1800)}${c.link ? `\nLink: ${c.link}` : ""}`
    )
    .join("\n\n---\n\n");
}
