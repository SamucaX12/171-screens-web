import Link from "next/link";
import { getDiscordAuthUrl, getGoogleAuthUrl } from "@/lib/auth";
import { Clock, Crosshair, MessageCircle, Shield } from "lucide-react";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const discordUrl = getDiscordAuthUrl();
  const googleUrl = getGoogleAuthUrl();
  const error = params.error;

  return (
    <div className="flex min-h-screen items-center justify-center bg-screens-bg px-4 relative overflow-hidden">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-green-500/6 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-teal-500/4 blur-[100px] rounded-full" />
        <div className="absolute inset-0 cyber-grid opacity-15" />
      </div>

      <div className="w-full max-w-sm relative">
        {/* Status bar */}
        <div className="mb-4 flex items-center justify-center gap-2 text-[9px] font-mono text-green-400">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
          SISTEMA ONLINE · SECURE CONNECTION
        </div>

        <div className="surface p-8">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-green-500/30 bg-gradient-to-br from-green-500/20 to-teal-500/10">
              <Crosshair className="h-5 w-5 text-green-300" />
            </div>
            <div>
              <h1 className="text-lg font-black leading-tight">
                Deep Screen <span style={{ color: "#00ff88" }}>Share</span>
              </h1>
              <p className="text-[11px] text-screens-muted font-mono">Plataforma Premium · v3.0</p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-screens-border mb-5" />

          <p className="text-sm text-screens-muted leading-relaxed mb-1">
            Acessa com Discord para entrar. Cargo no servidor libera seu tier automaticamente.
          </p>

          {error && (
            <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/5 px-3 py-2.5 text-sm text-red-400 flex items-center gap-2">
              <Shield className="h-4 w-4 shrink-0" />
              {decodeURIComponent(error)}
            </div>
          )}

          <div className="mt-6 space-y-2.5">
            {discordUrl ? (
              <a
                href={discordUrl}
                className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#5865F2] py-3.5 text-sm font-semibold text-white hover:bg-[#4752C4] transition shadow-[0_0_24px_-6px_rgba(88,101,242,0.5)]"
              >
                <MessageCircle className="h-4 w-4" />
                Entrar com Discord
              </a>
            ) : (
              <p className="text-xs text-screens-muted text-center py-3">DISCORD_CLIENT_ID não configurado</p>
            )}

            {googleUrl ? (
              <a
                href={googleUrl}
                className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-screens-border bg-screens-card/40 py-3.5 text-sm font-medium text-zinc-200 hover:bg-screens-card/70 hover:border-screens-border-bright/50 transition"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Entrar com Google
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="relative flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-screens-border bg-screens-card/20 py-3.5 text-sm text-screens-muted opacity-50"
              >
                Google
                <span className="absolute -top-2 right-2 rounded bg-screens-card border border-screens-border px-1.5 py-0.5 text-[9px] uppercase">
                  <Clock className="inline h-2.5 w-2.5" /> Em breve
                </span>
              </button>
            )}
          </div>

          {/* Tier info */}
          <div className="mt-6 rounded-xl border border-screens-border/60 bg-screens-card/30 p-3.5">
            <p className="text-[9px] font-mono text-screens-muted/60 uppercase tracking-wider mb-2">Tiers disponíveis</p>
            <div className="flex gap-2">
              {[
                { label: "Básico", color: "#00ff88" },
                { label: "Avançado", color: "#00ffc8" },
                { label: "Privado", color: "#a8ff3e" },
              ].map((t) => (
                <div key={t.label} className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-[9px] font-bold"
                  style={{ background: `${t.color}10`, color: t.color, border: `1px solid ${t.color}25` }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: t.color }} />
                  {t.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        <Link href="/" className="mt-5 block text-center text-xs text-screens-muted hover:text-white transition">
          ← Voltar ao site
        </Link>
      </div>
    </div>
  );
}
