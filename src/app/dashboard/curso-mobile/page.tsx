import { getSession } from "@/lib/auth";
import { MobileCourseHub } from "@/components/MobileCourseHub";

export const metadata = {
  title: "Curso Mobile — 171 ScreenS",
  description: "Detectar bypass iOS e Android: jailbreak, root, APK mod, GameGuardian, emulador e mais.",
};

export default async function CursoMobileHubPage() {
  const user = (await getSession())!;
  return <MobileCourseHub user={user} />;
}
