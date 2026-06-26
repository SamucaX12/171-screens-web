import Link from "next/link";

import { getDiscordAuthUrl, getGoogleAuthUrl } from "@/lib/auth";

import { Clock, GraduationCap, MessageCircle } from "lucide-react";



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

    <div className="flex min-h-screen items-center justify-center bg-screens-bg px-4">

      <div className="w-full max-w-sm surface p-8">

        <div className="flex items-center gap-3 mb-6">

          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-screens-border bg-screens-bg">

            <GraduationCap className="h-5 w-5 text-screens-muted" />

          </div>

          <div>

            <h1 className="text-lg font-semibold">171 ScreenS</h1>

            <p className="text-[11px] text-screens-muted">Curso Emu</p>

          </div>

        </div>



        <p className="text-sm text-screens-muted leading-relaxed">

          Entra com Discord ou Google. Curso pelo cargo no servidor.

        </p>



        {error && (

          <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/5 px-3 py-2 text-sm text-red-400">

            Erro: {decodeURIComponent(error)}

          </div>

        )}



        <div className="mt-6 space-y-2">

          {discordUrl ? (

            <a href={discordUrl} className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#5865F2] py-3 text-sm font-medium text-white hover:bg-[#4752C4]">

              <MessageCircle className="h-4 w-4" />

              Entrar com Discord

            </a>

          ) : (

            <p className="text-xs text-screens-muted text-center">DISCORD_CLIENT_ID não configurado</p>

          )}



          {googleUrl ? (

            <a

              href={googleUrl}

              className="flex w-full items-center justify-center gap-2 rounded-lg border border-screens-border py-3 text-sm font-medium text-zinc-200 hover:bg-white/[0.04]"

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

              className="relative flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-screens-border py-3 text-sm text-screens-muted opacity-60"

            >

              Google

              <span className="absolute -top-2 right-2 rounded bg-screens-card border border-screens-border px-1.5 py-0.5 text-[9px] uppercase">

                <Clock className="inline h-2.5 w-2.5" /> Em breve

              </span>

            </button>

          )}

        </div>



        <Link href="/" className="mt-6 block text-center text-xs text-screens-muted hover:text-white">

          ← Voltar ao site

        </Link>

      </div>

    </div>

  );

}

