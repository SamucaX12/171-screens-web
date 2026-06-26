"use client";

import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

export function ScannerPageShell({
  badge,
  title,
  subtitle,
  icon: Icon,
  actions,
  children,
}: {
  badge: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  accent?: "cyan" | "violet" | "amber" | "fuchsia";
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="page-scanner min-h-full p-5 md:p-8 max-w-5xl mx-auto">
      <header className="surface p-6 md:p-8 mb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-screens-muted">
              <Icon className="h-3.5 w-3.5" />
              {badge}
            </div>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight">{title}</h1>
            <p className="mt-1.5 max-w-xl text-sm text-screens-muted">{subtitle}</p>
          </div>
          {actions && <div className="shrink-0">{actions}</div>}
        </div>
      </header>
      {children}
    </div>
  );
}

export function ScannerPanel({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`surface ${className}`}>
      {title && (
        <div className="border-b border-screens-border px-5 py-3">
          <h2 className="text-xs font-medium uppercase tracking-wider text-screens-muted">{title}</h2>
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

export function FuturisticSaveBtn({
  onClick,
  saving,
  label = "Salvar",
}: {
  onClick: () => void;
  saving: boolean;
  label?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={saving}
      className="btn-primary disabled:opacity-50"
    >
      {saving ? "Salvando..." : label}
    </button>
  );
}
