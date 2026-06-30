"use client";

import { useState } from "react";
import { ExternalLink, Settings, ToggleLeft, ToggleRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Stat {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export function BotPageShell({
  name,
  icon,
  color,
  tagline,
  description,
  status: initialStatus,
  isOwner,
  stats,
  features,
  discordUrl,
}: {
  name: string;
  icon: React.ReactNode;
  color: string;
  tagline: string;
  description: string;
  status: "active" | "inactive";
  isOwner: boolean;
  stats: Stat[];
  features: Feature[];
  discordUrl: string;
}) {
  const [status, setStatus] = useState(initialStatus);
  const active = status === "active";

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      {/* Header card */}
      <div
        className="rounded-2xl border p-6"
        style={{
          borderColor: `${color}30`,
          background: `linear-gradient(135deg, ${color}0a 0%, transparent 60%)`,
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}
            >
              {icon}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: active ? "#34d399" : "#52525b" }}
                />
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  {active ? "Online" : "Offline"}
                </span>
              </div>
              <h1 className="text-2xl font-black text-white">{name}</h1>
              <p className="text-sm text-screens-muted mt-0.5">{tagline}</p>
            </div>
          </div>

          {isOwner && (
            <button
              onClick={() => setStatus(active ? "inactive" : "active")}
              className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition-all"
              style={
                active
                  ? { borderColor: "#27272a", color: "#71717a" }
                  : { borderColor: `${color}40`, color, backgroundColor: `${color}10` }
              }
            >
              {active ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
              {active ? "Desativar" : "Ativar"}
            </button>
          )}
        </div>

        <p className="mt-4 text-sm text-screens-muted leading-6">{description}</p>

        {!isOwner && (
          <p className="mt-3 text-xs text-zinc-600">
            Ativação disponível apenas para owners. Fala no Discord para contratar.
          </p>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-screens-border bg-screens-card/40 p-4"
          >
            <s.icon className="h-4 w-4 mb-2" style={{ color: s.color }} />
            <p className="text-xl font-black text-white">{s.value}</p>
            <p className="text-[11px] text-screens-muted mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Features grid */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-zinc-600 mb-3">Funcionalidades</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-screens-border bg-screens-card/30 p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <f.icon className="h-4 w-4 shrink-0" style={{ color }} />
                <p className="text-sm font-semibold text-white">{f.title}</p>
              </div>
              <p className="text-xs text-screens-muted leading-5">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="flex gap-3">
        <a
          href={discordUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition hover:opacity-80"
          style={{ borderColor: `${color}40`, color, backgroundColor: `${color}10` }}
        >
          <ExternalLink className="h-4 w-4" />
          Suporte no Discord
        </a>
        {isOwner && (
          <button className="flex items-center gap-2 rounded-xl border border-screens-border px-4 py-2.5 text-sm font-medium text-zinc-400 transition hover:border-zinc-600 hover:text-white">
            <Settings className="h-4 w-4" />
            Configurar
          </button>
        )}
      </div>
    </div>
  );
}
