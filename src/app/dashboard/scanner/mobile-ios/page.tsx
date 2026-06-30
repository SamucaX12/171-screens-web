import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { hasMobilePlatformAccess } from "@/lib/mobile-access";
import { MobileScanClient } from "@/components/scanner/MobileScanClient";
import Link from "next/link";
import { Apple, Lock } from "lucide-react";

export const metadata = { title: "Scan iOS · Deep Screen Share" };

export default async function ScanIOSPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const hasAccess = hasMobilePlatformAccess(session, "ios");

  if (!hasAccess) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-zinc-400/30 bg-zinc-400/8 mb-5">
            <Lock className="h-8 w-8 text-zinc-400" />
          </div>
          <h2 className="text-xl font-black mb-3">Acesso iOS necessário</h2>
          <p className="text-sm text-screens-muted leading-relaxed mb-6">
            O Scan iOS via passador exige o <span className="text-white font-semibold">Curso Mobile iOS</span>.
            Adquira no Discord para liberar esta funcionalidade.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/comprar"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-zinc-400/40 bg-zinc-400/10 px-6 py-3 text-sm font-bold text-zinc-100 hover:opacity-90 transition"
            >
              <Apple className="h-4 w-4" />
              Ver plano iOS
            </Link>
            <Link href="/dashboard" className="btn-secondary !py-3 !px-5 text-sm">
              Voltar
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <MobileScanClient platform="ios" />;
}
