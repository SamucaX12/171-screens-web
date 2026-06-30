import Link from "next/link";
import { getSession } from "@/lib/auth";
import { tierDisplay } from "@/lib/tier-theme";
import { getLessonCounts, lessons } from "@/lib/lessons";
import { hasLessonAccess } from "@/lib/tier-access";
import { BOOSTER_LESSON_COUNT } from "@/lib/booster-lessons";
import { SyncCargoButton } from "@/components/SyncCargoButton";
import {
  BookOpen,
  Play,
  Sparkles,
  HelpCircle,
  Bot,
  GraduationCap,
  TrendingUp,
  Zap,
  ArrowRight,
} from "lucide-react";

export default async function DashboardPage() {
  const user       = (await getSession())!;
  const userTierInfo = tierDisplay(user.courseTier, user.accessSource);
  const counts     = getLessonCounts();
  const accessible = lessons.filter((l) => hasLessonAccess(user, l));
  const first      = accessible[0];
  const progressPct = counts.total > 0 ? Math.round((accessible.length / counts.total) * 100) : 0;

  const statsCards = [
    { label: "Tier I",   value: counts.tier1, color: "#34d399", glow: "rgba(52,211,153,0.3)" },
    { label: "Tier II",  value: counts.tier2, color: "#38bdf8", glow: "rgba(56,189,248,0.3)" },
    { label: "Tier III", value: counts.tier3, color: "#c084fc", glow: "rgba(192,132,252,0.3)" },
  ];

  return (
    <div className="min-h-full p-5 md:p-8 space-y-5 max-w-4xl">

      {/* ── Hero Welcome Card ── */}
      <div
        className="relative overflow-hidden rounded-2xl border border-white/[0.08] p-6 md:p-8 animate-fade-in-up"
        style={{
          background: "linear-gradient(135deg, rgba(168,85,247,0.12) 0%, rgba(14,165,233,0.07) 50%, rgba(12,12,24,0.9) 100%)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 0 60px rgba(168,85,247,0.08), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* Background glow orbs */}
        <div
          className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full opacity-20 animate-pulse-glow"
          style={{ background: "radial-gradient(circle, #a855f7, transparent 70%)", filter: "blur(40px)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full opacity-15 animate-pulse-glow delay-300"
          style={{ background: "radial-gradient(circle, #0ea5e9, transparent 70%)", filter: "blur(30px)" }}
        />

        <div className="relative">
          {/* Greeting */}
          <div className="flex items-center gap-2 mb-3">
            <div
              className="h-8 w-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #a855f7, #0ea5e9)" }}
            >
              <GraduationCap className="h-4 w-4 text-white" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-screens-muted">
              Bem-vindo de volta
            </p>
          </div>

          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white leading-tight">
            {user.globalName || user.username}
          </h1>
          <p className="mt-2 text-sm text-screens-muted">
            {accessible.length} aulas liberadas de {counts.total} no curso
          </p>

          {/* Tier badge */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {userTierInfo.theme ? (
              <span
                className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold"
                style={{
                  background: `${userTierInfo.theme.color}15`,
                  color: userTierInfo.theme.color,
                  border: `1px solid ${userTierInfo.theme.color}30`,
                  boxShadow: `0 0 12px ${userTierInfo.theme.color}20`,
                }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: userTierInfo.theme.color, boxShadow: `0 0 4px ${userTierInfo.theme.color}` }}
                />
                {userTierInfo.label}
              </span>
            ) : (
              <span className="rounded-full border border-screens-border px-3 py-1 text-xs text-screens-muted">
                Sem acesso
              </span>
            )}
            {user.accessSource === "booster" && (
              <span className="badge-amber flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> Booster
              </span>
            )}
          </div>

          {/* Progress bar */}
          {accessible.length > 0 && (
            <div className="mt-5">
              <div className="flex justify-between text-[11px] mb-1.5">
                <span className="text-screens-muted flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" /> Progresso geral
                </span>
                <span
                  className="font-black"
                  style={{
                    background: "linear-gradient(135deg, #a855f7, #0ea5e9)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {progressPct}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-screens-border/50">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${progressPct}%`,
                    background: "linear-gradient(90deg, #a855f7, #0ea5e9)",
                    boxShadow: "0 0 8px rgba(168,85,247,0.5)",
                    transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
                  }}
                />
              </div>
            </div>
          )}

          {/* CTA buttons */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={first ? `/dashboard/curso/${first.id}` : "/dashboard/curso"}
              className="btn-primary"
            >
              <Play className="h-4 w-4" />
              {first ? "Continuar curso" : "Ver curso"}
              <ArrowRight className="h-3.5 w-3.5 ml-0.5" />
            </Link>
            <Link href="/dashboard/curso/tutor" className="btn-secondary">
              <Bot className="h-4 w-4" />
              Tutor IA
            </Link>
            <Link href="/dashboard/curso/booster" className="btn-secondary">
              <Sparkles className="h-4 w-4" />
              Booster
            </Link>
          </div>
        </div>
      </div>

      {/* ── Stats Grid ── */}
      <div className="grid gap-4 grid-cols-3 animate-fade-in-up delay-100">
        {statsCards.map((stat) => (
          <div
            key={stat.label}
            className="relative overflow-hidden rounded-2xl border border-white/[0.07] p-4 md:p-5 text-center hover-lift transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
              backdropFilter: "blur(12px)",
            }}
          >
            <div
              className="absolute inset-0 opacity-5 rounded-2xl"
              style={{ background: `radial-gradient(circle at 50% 0%, ${stat.color}, transparent 70%)` }}
            />
            <p
              className="relative text-3xl font-black tabular-nums"
              style={{ color: stat.color, textShadow: `0 0 20px ${stat.glow}` }}
            >
              {stat.value}
            </p>
            <p className="relative text-[11px] text-screens-muted mt-1 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* ── Quick Actions ── */}
      <div className="grid gap-3 sm:grid-cols-2 animate-fade-in-up delay-200">
        <Link
          href="/dashboard/curso"
          className="group flex items-center gap-4 rounded-2xl border border-white/[0.07] p-4 transition-all duration-300 hover:border-white/[0.12]"
          style={{
            background: "linear-gradient(135deg, rgba(168,85,247,0.07), rgba(255,255,255,0.02))",
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
            style={{ background: "linear-gradient(135deg, rgba(168,85,247,0.3), rgba(168,85,247,0.1))", border: "1px solid rgba(168,85,247,0.3)" }}
          >
            <BookOpen className="h-5 w-5" style={{ color: "#a855f7" }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white">Meu Curso</p>
            <p className="text-xs text-screens-muted mt-0.5">Tier I, II e III completo</p>
          </div>
          <ArrowRight className="h-4 w-4 text-screens-muted group-hover:text-white group-hover:translate-x-0.5 transition-all duration-200 shrink-0" />
        </Link>

        <Link
          href="/dashboard/como-usar"
          className="group flex items-center gap-4 rounded-2xl border border-white/[0.07] p-4 transition-all duration-300 hover:border-white/[0.12]"
          style={{
            background: "linear-gradient(135deg, rgba(14,165,233,0.07), rgba(255,255,255,0.02))",
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
            style={{ background: "linear-gradient(135deg, rgba(14,165,233,0.3), rgba(14,165,233,0.1))", border: "1px solid rgba(14,165,233,0.3)" }}
          >
            <HelpCircle className="h-5 w-5" style={{ color: "#0ea5e9" }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white">Guia Completo</p>
            <p className="text-xs text-screens-muted mt-0.5">Como usar passo a passo</p>
          </div>
          <ArrowRight className="h-4 w-4 text-screens-muted group-hover:text-white group-hover:translate-x-0.5 transition-all duration-200 shrink-0" />
        </Link>
      </div>

      {/* ── Sync + Tips ── */}
      <div className="animate-fade-in-up delay-300">
        <SyncCargoButton />
      </div>

      {/* No-access tip */}
      {!user.courseTier && user.role === "customer" && (
        <div
          className="flex items-start gap-3 rounded-2xl border border-neon-purple/[0.15] p-4 animate-fade-in-up delay-400"
          style={{ background: "rgba(168,85,247,0.06)", backdropFilter: "blur(12px)" }}
        >
          <Zap className="h-4 w-4 shrink-0 mt-0.5" style={{ color: "#a855f7" }} />
          <p className="text-sm text-screens-muted">
            Deu boost? Ganha{" "}
            <strong className="text-white">{BOOSTER_LESSON_COUNT} aulas grátis</strong> no Tier I.
            Entre com Discord e sincronize o cargo.
          </p>
        </div>
      )}

      {/* Quick summary card */}
      <div
        className="rounded-2xl border border-white/[0.07] p-5 md:p-6 animate-fade-in-up delay-500"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
          backdropFilter: "blur(12px)",
        }}
      >
        <h2 className="text-sm font-semibold text-white flex items-center gap-2">
          <span
            className="flex h-5 w-5 items-center justify-center rounded-md text-[10px] font-black"
            style={{ background: "linear-gradient(135deg, #a855f7, #0ea5e9)" }}
          >
            ?
          </span>
          Resumo rápido
        </h2>
        <ol className="mt-4 space-y-2.5">
          {[
            "Login Discord → Sincronizar cargo no painel",
            "Meu Curso → escolhe o tier → abre a aula",
            "Segue o checklist no final de cada aula",
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-screens-muted">
              <span
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-black mt-0.5"
                style={{
                  background: "linear-gradient(135deg, rgba(168,85,247,0.2), rgba(14,165,233,0.1))",
                  border: "1px solid rgba(168,85,247,0.2)",
                  color: "#a855f7",
                }}
              >
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link href="/dashboard/como-usar" className="btn-primary">
            <HelpCircle className="h-4 w-4" />
            Guia completo
          </Link>
          <Link href="/dashboard/curso" className="btn-secondary">
            <BookOpen className="h-4 w-4" />
            Meu Curso
          </Link>
        </div>
      </div>
    </div>
  );
}
