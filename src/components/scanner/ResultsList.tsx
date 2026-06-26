"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ExternalLink } from "lucide-react";
import { PinDoc, PinResult } from "@/lib/scanner-types";
import { PinBadge, StatusPill } from "@/components/scanner/PinBadge";

const RESULT_FILTERS: { key: "all" | PinResult; label: string }[] = [
  { key: "all", label: "Todos" },
  { key: "clean", label: "Clean" },
  { key: "warning", label: "Warning" },
  { key: "suspicious", label: "Suspeito" },
  { key: "cheating", label: "Cheat" },
];

const RESULT_ACCENT: Record<string, string> = {
  clean: "from-emerald-500/20 to-transparent border-emerald-500/25",
  warning: "from-amber-500/20 to-transparent border-amber-500/25",
  suspicious: "from-orange-500/20 to-transparent border-orange-500/25",
  cheating: "from-red-500/20 to-transparent border-red-500/25",
  none: "from-zinc-500/10 to-transparent border-screens-border",
  pending: "from-amber-500/15 to-transparent border-amber-500/20",
  scanning: "from-sky-500/15 to-transparent border-sky-500/20",
  finished: "from-emerald-500/15 to-transparent border-emerald-500/20",
};

function formatDate(d?: Date | string | null) {
  if (!d) return "—";
  const date = d instanceof Date ? d : new Date(d);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
}

export function ResultsList({ initialPins }: { initialPins: PinDoc[] }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | PinResult>("all");

  const stats = useMemo(
    () => ({
      total: initialPins.length,
      clean: initialPins.filter((p) => p.result === "clean").length,
      warning: initialPins.filter((p) => p.result === "warning").length,
      suspicious: initialPins.filter((p) => p.result === "suspicious").length,
      cheating: initialPins.filter((p) => p.result === "cheating").length,
    }),
    [initialPins]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return initialPins.filter((p) => {
      const matchSearch =
        !q ||
        p.pin.toLowerCase().includes(q) ||
        (p.name ?? "").toLowerCase().includes(q) ||
        p.game.toLowerCase().includes(q);
      const matchFilter = filter === "all" || p.result === filter;
      return matchSearch && matchFilter;
    });
  }, [initialPins, search, filter]);

  return (
    <div className="page-scanner min-h-full">
      <div className="border-b border-screens-border bg-screens-bg-elevated">
        <div className="max-w-6xl mx-auto px-5 py-8 md:px-8">
          <p className="label-xs">Scanner</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">Results</h1>
          <p className="mt-1 text-sm text-screens-muted">Relatórios de scan finalizados</p>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-2">
            {[
              { label: "Total", val: stats.total },
              { label: "Clean", val: stats.clean, accent: "text-emerald-400" },
              { label: "Warning", val: stats.warning, accent: "text-amber-400" },
              { label: "Suspeito", val: stats.suspicious, accent: "text-orange-400" },
              { label: "Cheat", val: stats.cheating, accent: "text-red-400" },
            ].map((s) => (
              <div key={s.label} className="surface px-4 py-3">
                <p className={`text-2xl font-semibold tabular-nums ${s.accent ?? ""}`}>{s.val}</p>
                <p className="text-[10px] text-screens-muted uppercase tracking-wider mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-5 md:p-8">
        <div className="flex flex-col gap-3 sm:flex-row mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-screens-muted" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar pin, nome ou jogo…"
              className="w-full rounded-lg border border-screens-border bg-screens-card py-2.5 pl-10 pr-4 text-sm outline-none focus:border-zinc-500"
            />
          </div>
          <div className="flex flex-wrap gap-1 rounded-lg border border-screens-border p-1">
            {RESULT_FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                  filter === f.key ? "bg-white text-black" : "text-screens-muted hover:text-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {filtered.map((p) => {
            const resultKey = p.result !== "none" ? p.result : p.status;
            const accent = RESULT_ACCENT[resultKey] ?? RESULT_ACCENT.none;
            return (
              <Link
                key={p.pin}
                href={`/dashboard/scanner/results/${p.pin}`}
                className={`group relative overflow-hidden rounded-xl border bg-gradient-to-br p-5 transition hover:scale-[1.01] ${accent}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <PinBadge pin={p.pin} />
                    <p className="mt-3 text-sm font-medium">{p.name || "Sem nome"}</p>
                    <p className="text-[11px] text-screens-muted">{p.game}</p>
                  </div>
                  <StatusPill value={resultKey} />
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-screens-muted border-t border-white/[0.06] pt-3">
                  <span>{p.finishedAt ? formatDate(p.finishedAt) : formatDate(p.createdAt)}</span>
                  <span className="inline-flex items-center gap-1 text-zinc-300 group-hover:text-white">
                    Abrir <ExternalLink className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {!filtered.length && (
          <div className="surface p-16 text-center mt-4">
            <p className="text-screens-muted">
              {initialPins.length ? "Nenhum resultado com esse filtro" : "Nenhum scan ainda"}
            </p>
            {!initialPins.length && (
              <Link href="/dashboard/scanner/pins" className="btn-primary mt-4 inline-flex">
                Criar pin
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
