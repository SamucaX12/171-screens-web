import { getSession } from "@/lib/auth";
import { MobileCourseHub } from "@/components/MobileCourseHub";

export const metadata = {
  title: "Curso Mobile — Deep Screen Share",
  description: "Detectar bypass iOS e Android: jailbreak, root, APK mod, GameGuardian, emulador e mais.",
};

export default async function CursoMobileHubPage() {
  const user = (await getSession())!;
  return <MobileCourseHub user={user} />;
}
