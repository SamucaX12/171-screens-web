import type { Lesson, LessonSection } from "./lessons/types";
import { lessonImagePath } from "./lesson-visuals";

function hasAnyImage(sections: LessonSection[]) {
  return sections.some((s) => s.image);
}

function enrichSections(lesson: Lesson): LessonSection[] {
  const uniqueImg = lessonImagePath(lesson.id);
  let imagePlaced = hasAnyImage(lesson.sections);

  return lesson.sections.map((sec) => {
    if (sec.image) {
      // Troca PNG genérico repetido por SVG único da aula
      if (sec.image.includes("tutorial-") && sec.image.endsWith(".png")) {
        return { ...sec, image: uniqueImg };
      }
      return sec;
    }

    const kind = sec.kind ?? "normal";
    const isStepSection =
      kind === "modulo" ||
      kind === "tecnica" ||
      /passo|módulo|modulo|🛠|🕵|📚/i.test(sec.heading);

    if (!imagePlaced && isStepSection) {
      imagePlaced = true;
      return { ...sec, image: uniqueImg };
    }

    return sec;
  });
}

export function enrichLesson(lesson: Lesson): Lesson {
  return {
    ...lesson,
    sections: enrichSections(lesson),
  };
}

export function enrichLessons(all: Lesson[]): Lesson[] {
  return all.map(enrichLesson);
}
