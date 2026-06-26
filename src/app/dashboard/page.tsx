import Link from "next/link";
import { getSession } from "@/lib/auth";
import { tierDisplay } from "@/lib/tier-theme";
import { getLessonCounts } from "@/lib/lessons";
import { lessons } from "@/lib/lessons";
import { hasLessonAccess } from "@/lib/tier-access";
import { BOOSTER_LESSON_COUNT } from "@/lib/booster-lessons";
import { SyncCargoButton } from "@/components/SyncCargoButton";
import { ComoUsarGuide } from "@/components/ComoUsarGuide";
import { BookOpen, Play, Sparkles, HelpCircle } from "lucide-react";

export default async function DashboardPage() {
  const user = (await getSession())!;
  const userTierInfo = tierDisplay(user.courseTier, user.accessSource);
  const counts = getLessonCounts();
  const accessible = lessons.filter((l) => hasLessonAccess(user, l));
  const first = accessible[0];

  return (
    <div className="max-w-3xl p-6 md:p-10 space-y-6">
      <section className="surface p-6 md:p-8">
        <p className="label-xs">Bem-vindo</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">{user.globalName || user.username}</h1>
        <p className="mt-1 text-sm text-screens-muted">
          {accessible.length} aulas liberadas · {counts.total} no curso
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {userTierInfo.theme ? (
            <span className="rounded-md border border-screens-border px-2.5 py-1 text-xs text-screens-muted">
              {userTierInfo.label}
            </span>
          ) : (
            <span className="rounded-md border border-screens-border px-2.5 py-1 text-xs text-screens-muted">
              Sem acesso
            </span>
          )}
          {user.accessSource === "booster" && (
            <span className="rounded-md border border-screens-border px-2.5 py-1 text-xs text-screens-muted flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> Booster
            </span>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Link href={first ? `/dashboard/curso/${first.id}` : "/dashboard/curso"} className="btn-primary">
            <Play className="h-4 w-4" />
            {first ? "Continuar curso" : "Ver curso"}
          </Link>
          <Link href="/dashboard/curso/booster" className="btn-secondary">
            <Sparkles className="h-4 w-4" />
            Booster
          </Link>
        </div>
      </section>

      <ComoUsarGuide compact />

      <div className="grid gap-3 grid-cols-3">
        {[
          { label: "Tier I", n: counts.tier1 },
          { label: "Tier II", n: counts.tier2 },
          { label: "Tier III", n: counts.tier3 },
        ].map((t) => (
          <div key={t.label} className="surface p-4 text-center">
            <p className="text-2xl font-semibold">{t.n}</p>
            <p className="text-[11px] text-screens-muted mt-0.5">{t.label}</p>
          </div>
        ))}
      </div>

      <SyncCargoButton />

      {!user.courseTier && user.role === "customer" && (
        <div className="surface-muted p-5 text-sm text-screens-muted">
          Deu boost? Ganha <strong className="text-zinc-300">{BOOSTER_LESSON_COUNT} aulas grátis</strong> no Tier I.
          Entra com Discord e sincroniza o cargo.
        </div>
      )}

      <section className="surface p-5">
        <h2 className="text-sm font-medium">Resumo rápido</h2>
        <ol className="mt-3 space-y-2 text-sm text-screens-muted list-decimal list-inside">
          <li>Login Discord → Sincronizar cargo</li>
          <li>Meu Curso → escolhe tier → abre a aula</li>
          <li>Segue o checklist no final de cada aula</li>
        </ol>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/dashboard/como-usar" className="btn-primary">
            <HelpCircle className="h-4 w-4" />
            Guia completo
          </Link>
          <Link href="/dashboard/curso" className="btn-secondary">
            <BookOpen className="h-4 w-4" />
            Meu Curso
          </Link>
        </div>
      </section>
    </div>
  );
}
