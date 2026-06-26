import { getSession } from "@/lib/auth";
import { CourseAIChat } from "@/components/CourseAIChat";

export default async function TutorPage() {
  await getSession();
  return (
    <div className="page-course min-h-full">
      <CourseAIChat variant="page" />
    </div>
  );
}
