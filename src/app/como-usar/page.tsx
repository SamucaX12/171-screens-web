import Link from "next/link";
import { GraduationCap, LogIn } from "lucide-react";
import { ComoUsarGuide } from "@/components/ComoUsarGuide";

export const metadata = {
  title: "Como Usar · 171 ScreenS",
  description: "Guia passo a passo do curso e download do app",
};

export default function PublicComoUsarPage() {
  return (
    <div className="min-h-screen bg-screens-bg">
      <header className="border-b border-screens-border bg-[#0a0a0c]/95 backdrop-blur-xl sticky top-0 z-50">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-screens-accent/15">
              <GraduationCap className="h-5 w-5 text-screens-accent" />
            </div>
            <div>
              <p className="text-sm font-bold">171 ScreenS</p>
              <p className="text-[10px] text-screens-muted">Guia do curso</p>
            </div>
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-xl bg-screens-accent px-4 py-2 text-sm font-bold text-screens-bg"
          >
            <LogIn className="h-4 w-4" />
            Entrar
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-400">Tutorial oficial</p>
          <h1 className="mt-2 text-3xl font-black">Como usar o curso 171</h1>
          <p className="mt-2 text-screens-muted text-sm">
            Login · cargo · aulas · app — tudo explicado. Manda esse link pros alunos.
          </p>
        </div>
        <ComoUsarGuide />
      </div>
    </div>
  );
}
