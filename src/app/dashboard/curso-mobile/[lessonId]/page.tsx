import { getSession } from "@/lib/auth";
import { MobileLessonView } from "@/components/MobileLessonView";

export default async function MobileLessonPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;
  const user = (await getSession())!;
  return <MobileLessonView lessonId={lessonId} user={user} />;
}
