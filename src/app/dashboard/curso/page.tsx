import { getSession } from "@/lib/auth";
import { getLessonCounts, getLessonSummaries } from "@/lib/lessons";
import { CourseHub } from "@/components/CourseHub";

export default async function CursoHubPage() {
  const user = (await getSession())!;
  const counts = getLessonCounts();
  const catalog = getLessonSummaries();
  return <CourseHub user={user} counts={counts} catalog={catalog} />;
}
