import { lessons, CATEGORY_META } from "@/lib/lessons";
import { getLessonVisual } from "@/lib/lesson-visuals";
import { GUIDE_STEPS, QUICK_FAQ } from "@/lib/como-usar-data";
import { COURSE_TOOLS } from "@/lib/course-tools";
import { TIER_THEME } from "@/lib/tier-theme";
import type { CourseTier } from "@/lib/types";

export type KnowledgeChunk = {
  id: string;
  lessonId?: string;
  lessonTitle?: string;
  tier?: CourseTier;
  categoryId?: string;
  type: "lesson-intro" | "lesson-section" | "lesson-checklist" | "guide" | "faq" | "tool" | "meta";
  title: string;
  content: string;
  link?: string;
};

let cache: KnowledgeChunk[] | null = null;

export function getCourseKnowledge(): KnowledgeChunk[] {
  if (cache) return cache;

  const chunks: KnowledgeChunk[] = [];

  for (const lesson of lessons) {
    const visual = getLessonVisual(lesson.id, lesson.title, lesson.categoryId);
    const cat = CATEGORY_META[lesson.categoryId]?.label ?? lesson.categoryId;
    const tierName = TIER_THEME[lesson.tier].name;

    chunks.push({
      id: `lesson-${lesson.id}-intro`,
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      tier: lesson.tier,
      categoryId: lesson.categoryId,
      type: "lesson-intro",
      title: lesson.title,
      content: [
        `Aula: ${lesson.title}`,
        `Tier: ${tierName} (${lesson.tier})`,
        `Categoria: ${cat}`,
        `Intro: ${lesson.intro}`,
        `Onde achar rastro: ${visual.where}`,
        `Caminho: ${visual.path}`,
        `Ferramenta: ${visual.tool}`,
        `Dica: ${visual.hint}`,
      ].join("\n"),
      link: `/dashboard/curso/${lesson.id}`,
    });

    lesson.sections.forEach((sec, i) => {
      chunks.push({
        id: `lesson-${lesson.id}-sec-${i}`,
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        tier: lesson.tier,
        categoryId: lesson.categoryId,
        type: "lesson-section",
        title: `${lesson.title} — ${sec.heading}`,
        content: [
          `Aula: ${lesson.title}`,
          `Seção: ${sec.heading}`,
          sec.body,
          sec.example ? `Exemplo: ${sec.example}` : "",
        ]
          .filter(Boolean)
          .join("\n\n"),
        link: `/dashboard/curso/${lesson.id}#sec-${i}`,
      });
    });

    if (lesson.checklist.length) {
      chunks.push({
        id: `lesson-${lesson.id}-checklist`,
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        tier: lesson.tier,
        categoryId: lesson.categoryId,
        type: "lesson-checklist",
        title: `${lesson.title} — Checklist SS`,
        content: `Checklist da aula ${lesson.title}:\n${lesson.checklist.map((c, i) => `${i + 1}. ${c}`).join("\n")}`,
        link: `/dashboard/curso/${lesson.id}#checklist`,
      });
    }
  }

  for (const step of GUIDE_STEPS) {
    chunks.push({
      id: `guide-${step.id}`,
      type: "guide",
      title: `Guia: ${step.title}`,
      content: [
        step.title,
        step.subtitle,
        step.bullets.join("\n"),
        step.faq?.map((f) => `P: ${f.q}\nR: ${f.a}`).join("\n\n") ?? "",
      ]
        .filter(Boolean)
        .join("\n\n"),
      link: "/dashboard/como-usar",
    });
  }

  for (const faq of QUICK_FAQ) {
    chunks.push({
      id: `faq-${faq.q.slice(0, 24)}`,
      type: "faq",
      title: faq.q,
      content: `Pergunta: ${faq.q}\nResposta: ${faq.a}`,
      link: "/dashboard/como-usar",
    });
  }

  for (const tool of COURSE_TOOLS) {
    chunks.push({
      id: `tool-${tool.id}`,
      type: "tool",
      title: tool.name,
      content: [
        `Ferramenta: ${tool.name}`,
        `Tag: ${tool.tag}`,
        tool.description,
        tool.note ? `Nota: ${tool.note}` : "",
        `Download: ${tool.downloadUrl}`,
      ]
        .filter(Boolean)
        .join("\n"),
    });
  }

  chunks.push({
    id: "meta-tiers",
    type: "meta",
    title: "Tiers do curso",
    content: Object.values(TIER_THEME)
      .map((t) => `${t.short} ${t.name} (${t.price}): ${t.description}`)
      .join("\n"),
    link: "/dashboard/curso",
  });

  chunks.push({
    id: "meta-booster",
    type: "meta",
    title: "Booster",
    content:
      "Booster no Discord libera 5 aulas grátis de degustação no Tier I. Não libera o curso inteiro. Para Tier completo, compre no site ou Discord. Sincronize o cargo no Início do dashboard.",
    link: "/dashboard/curso/booster",
  });

  cache = chunks;
  return chunks;
}

export function clearKnowledgeCache() {
  cache = null;
}
