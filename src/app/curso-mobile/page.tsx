import Link from "next/link";
import { ArrowLeft, Crosshair, MessageCircle } from "lucide-react";
import MobileCourseSection from "@/components/MobileCourseSection";
import { DISCORD_URL } from "@/lib/course-data";

export const metadata = {
  title: "Curso Mobile — Deep Screen Share",
  description:
    "iOS, Android, IA Mobile e Scan Mobile via passador web. Ecossistema mobile do Curso Deep.",
};

export default function CursoMobilePage() {
  return (
    <div className="min-h-screen relative">
      <div className="pointer-events-none fixed inset-0 hero-glow -z-10" />

      <header className="sticky top-0 z-50 border-b border-screens-border/80 bg-screens-bg/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-fuchsia-500/20 bg-fuchsia-500/10">
              <Crosshair className="h-4 w-4 text-fuchsia-300" />
            </div>
            <div>
              <p className="text-sm font-semibold">Deep Screen Share</p>
              <p className="text-[10px] text-screens-muted">Curso Mobile</p>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/" className="btn-secondary !py-2 !px-4 text-sm hidden sm:inline-flex">
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Link>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#5865F2] px-3 py-2 text-sm hover:bg-[#4752C4]"
            >
              <MessageCircle className="h-4 w-4" />
              Discord
            </a>
          </div>
        </div>
      </header>

      <MobileCourseSection />
    </div>
  );
}
