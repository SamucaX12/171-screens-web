"use client";

import { usePathname } from "next/navigation";
import { CourseAIFab } from "@/components/CourseAIChat";

/** FAB do tutor IA nas páginas do curso (exceto a página full do tutor) */
export function CourseAIProvider() {
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard/curso/tutor")) return null;

  const isCourse = pathname === "/dashboard/curso" || pathname.startsWith("/dashboard/curso/");
  if (!isCourse) return null;

  const lessonMatch = pathname.match(/^\/dashboard\/curso\/([^/]+)$/);
  const rawId = lessonMatch?.[1];
  const lessonId =
    rawId && rawId !== "booster" && rawId !== "tutor" ? rawId : undefined;

  return <CourseAIFab lessonId={lessonId} />;
}
