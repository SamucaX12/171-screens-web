import { Download, ExternalLink, Wrench } from "lucide-react";
import { getToolsForLesson } from "@/lib/course-tools";

export function LessonToolsBar({
  lessonId,
  categoryId,
}: {
  lessonId: string;
  categoryId?: string;
}) {
  const tools = getToolsForLesson(lessonId, categoryId);
  if (!tools.length) return null;

  return (
    <section className="surface p-4 md:p-5">
      <div className="flex items-center gap-2 mb-3">
        <Wrench className="h-4 w-4 text-screens-muted" />
        <h2 className="text-sm font-medium">Apps desta aula</h2>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {tools.map((tool) => (
          <a
            key={tool.id}
            href={tool.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="course-card block p-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-medium">{tool.name}</p>
                <p className="text-[10px] text-screens-muted mt-0.5">{tool.tag}</p>
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-screens-muted shrink-0" />
            </div>
            <p className="mt-2 text-xs text-screens-muted leading-relaxed">{tool.description}</p>
            {tool.note && <p className="mt-1.5 text-[10px] text-screens-muted">{tool.note}</p>}
            <span className="mt-2 inline-flex items-center gap-1 text-[11px] text-zinc-300">
              <Download className="h-3 w-3" /> Baixar
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
