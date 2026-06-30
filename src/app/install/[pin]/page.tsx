import { notFound } from "next/navigation";
import Image from "next/image";
import { KeyRound, Monitor } from "lucide-react";
import { getScannerDb } from "@/lib/scanner-db";
import type { PinDoc } from "@/lib/scanner-types";
import { getScannerExePath } from "@/lib/scanner-installer";
import { InstallDownloadButton } from "@/components/scanner/InstallDownloadButton";

export default async function InstallPage({ params }: { params: Promise<{ pin: string }> }) {
  const { pin: pinRaw } = await params;
  const pin = pinRaw.toUpperCase();

  const db = await getScannerDb();
  const doc = await db.collection<PinDoc>("pins").findOne({ pin });
  if (!doc) notFound();

  const expired = doc.expiresAt && new Date(doc.expiresAt) < new Date();
  const hasExe = !!getScannerExePath();

  return (
    <div className="min-h-screen bg-[#050508] text-white scan-grid">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(251,191,36,0.12)_0%,_transparent_55%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-lg flex-col justify-center px-6 py-16">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10">
            <Monitor className="h-8 w-8 text-amber-400" />
          </div>
          <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.35em] text-amber-300/80">
            Deep Screen Share
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight">Baixar o Scanner</h1>
          <p className="mt-3 text-sm text-zinc-400">
            {doc.name ? `Telagem: ${doc.name}` : "Baixa o app, abre e digita o PIN abaixo"}
          </p>
        </div>

        <div className="mt-8 relative aspect-video w-full overflow-hidden rounded-2xl border border-amber-500/20">
          <Image
            src="/guide/como-usar-04-download.png"
            alt="Como baixar e usar o app Deep Screen Share"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="mt-8 rounded-3xl border border-amber-500/25 bg-zinc-950/80 p-8 backdrop-blur-sm">
          {expired ? (
            <p className="text-center text-red-400 font-semibold">Este pin expirou. Pede um novo pro telador.</p>
          ) : (
            <>
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-center">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-2">Seu PIN</p>
                <p className="font-mono text-3xl font-black tracking-[0.2em] text-white">{doc.pin}</p>
                <p className="mt-2 text-xs text-emerald-200/70">Copia e cola no app depois de abrir</p>
              </div>

              <InstallDownloadButton pin={doc.pin} className="mt-6" />

              <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-4">Como usar</p>
                <ol className="space-y-4 text-sm text-zinc-400">
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-300">1</span>
                    <span>Baixa o <strong className="text-white">dss-scanner.exe</strong> (botão acima)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-300">2</span>
                    <span>Abre o programa e digita o <strong className="text-white">PIN</strong> de 8 caracteres</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-300">3</span>
                    <span>Clica em <strong className="text-white">INICIAR SCAN</strong> e espera terminar</span>
                  </li>
                </ol>
              </div>

              {!hasExe && (
                <p className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-[11px] text-amber-200/80">
                  O .exe ainda não está no servidor. O telador precisa colocar{" "}
                  <code className="text-amber-300">dss-scanner.exe</code> em{" "}
                  <code className="text-amber-300">public/scanner/</code> e fazer deploy na Vercel.
                </p>
              )}
            </>
          )}
        </div>

        <p className="mt-8 flex items-center justify-center gap-2 text-[11px] text-zinc-600">
          <KeyRound className="h-3 w-3" />
          Pin válido por 24h · {doc.game}
        </p>
      </div>
    </div>
  );
}
