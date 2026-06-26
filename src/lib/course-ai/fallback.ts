import type { ScoredChunk } from "./search";

const GREETINGS = /^(oi|ola|olá|eai|eae|bom dia|boa tarde|boa noite|salve|fala|hey|hi)\b/i;

export function buildFallbackReply(query: string, chunks: ScoredChunk[]) {
  const q = query.trim();

  if (!q) {
    return {
      reply:
        "Manda tua dúvida! Posso explicar qualquer aula do curso: Prefetch, DLL, Sysmon, bypass, tiers, booster, ferramentas…",
      sources: [],
    };
  }

  if (GREETINGS.test(q)) {
    return {
      reply:
        "Salve! Sou o **171 Tutor IA** 🤖\n\nTiro dúvida de **qualquer aula** do curso — Prefetch, DLL List, Sysmon, bypass, tiers, checklist na SS…\n\nManda a pergunta específica que eu te guio passo a passo.",
      sources: [],
    };
  }

  if (!chunks.length) {
    return {
      reply:
        "Não achei isso no material que você tem liberado. Tenta reformular (ex: \"prefetch cheat\", \"dll bluestacks\", \"sysmon evento 10\") ou abre **Meu Curso** e busca pela aula.",
      sources: [],
    };
  }

  const top = chunks[0];
  const related = chunks.slice(1, 4);

  let reply = `**${top.lessonTitle ?? top.title}**\n\n${top.excerpt}\n`;

  if (top.type === "lesson-checklist") {
    reply = `**Checklist — ${top.lessonTitle}**\n\n${top.content.slice(0, 600)}`;
  }

  if (related.length) {
    reply += "\n\n**Também pode ajudar:**\n";
    for (const r of related) {
      reply += `• ${r.lessonTitle ?? r.title}\n`;
    }
  }

  if (top.link) {
    reply += `\n📚 Abre a aula completa: **${top.link}**`;
  }

  reply +=
    "\n\n_Resposta baseada no material do curso. Abre a aula completa pra ver todos os passos._";

  return {
    reply,
    sources: chunks.slice(0, 5).map((c) => ({
      title: c.lessonTitle ?? c.title,
      link: c.link,
    })),
  };
}
