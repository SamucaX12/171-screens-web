"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  ShoppingBag,
  Settings,
  Crown,
  ChevronRight,
  GraduationCap,
  MessageCircle,
  KeyRound,
  FileBarChart,
  Building2,
  Type,
  Palette,
  Sparkles,
  HelpCircle,
  Headphones,
  Bot,
  Zap,
  Menu,
  X,
  Smartphone,
  Apple,
  Cpu,
} from "lucide-react";
import { SessionUser } from "@/lib/types";
import { UserProfileCard } from "@/components/UserProfileCard";
import { CourseAIProvider } from "@/components/CourseAIProvider";
import {
  hasScannerAccess,
  hasEnterpriseAccess,
  hasProAccess,
  canAccessStrings,
  canAccessGui,
} from "@/lib/scanner-access";

const mainNav = [
  { href: "/dashboard", label: "Início", icon: LayoutDashboard },
  { href: "/dashboard/como-usar", label: "Como Usar", icon: HelpCircle },
  { href: "/dashboard/curso", label: "Meu Curso", icon: GraduationCap },
  { href: "/dashboard/curso/tutor", label: "Tutor IA", icon: Bot },
  { href: "/dashboard/curso/booster", label: "Curso Booster", icon: Sparkles },
  { href: "/dashboard/curso-mobile", label: "Curso Mobile", icon: Smartphone },
  { href: "/dashboard/tickets", label: "Tickets", icon: Headphones },
  { href: "/comprar", label: "Comprar", icon: ShoppingBag },
];

const scannerNav = [
  { href: "/dashboard/scanner/pins", label: "Pins", icon: KeyRound },
  { href: "/dashboard/scanner/results", label: "Results", icon: FileBarChart },
  { href: "/dashboard/scanner/strings", label: "Strings", icon: Type },
  { href: "/dashboard/scanner/gui", label: "GUI", icon: Palette },
  { href: "/dashboard/scanner/enterprise", label: "Enterprise", icon: Building2 },
];

export function DashboardShell({
  user,
  children,
}: {
  user: SessionUser;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const scannerAccess = hasScannerAccess(user.scannerPlan, user.role);
  const showEnterprise = hasEnterpriseAccess(user.scannerPlan, user.role);
  const showStrings = canAccessStrings(user.scannerPlan, user.role);
  const showGui = canAccessGui(user.scannerPlan, user.role);
  const showPins = hasProAccess(user.scannerPlan, user.role);

  const visibleScannerNav = scannerNav.filter((item) => {
    if (item.href.includes("/pins") || item.href.includes("/results")) return showPins;
    if (item.href.includes("/strings")) return showStrings;
    if (item.href.includes("/gui")) return showGui;
    if (item.href.includes("/enterprise")) return showEnterprise;
    return true;
  });

  function navActive(href: string) {
    if (href === "/dashboard/como-usar") {
      return pathname === href || pathname.startsWith(href + "/");
    }
    if (href === "/dashboard/curso/tutor") {
      return pathname === href || pathname.startsWith(href + "/");
    }
    if (href === "/dashboard/curso/booster") {
      return pathname === href || pathname.startsWith(href + "/");
    }
    if (href === "/dashboard/curso") {
      return (
        pathname === href ||
        (pathname.startsWith("/dashboard/curso/") &&
          !pathname.startsWith("/dashboard/curso/booster") &&
          !pathname.startsWith("/dashboard/curso/tutor"))
      );
    }
    if (href === "/dashboard/curso-mobile") {
      return pathname === href || pathname.startsWith("/dashboard/curso-mobile/");
    }
    return pathname === href;
  }

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const sidebarContent = (
    <>
      <div className="px-4 py-5">
        <Link href="/dashboard" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-screens-border bg-screens-card">
            <GraduationCap className="h-4 w-4 text-zinc-300" />
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight">171 ScreenS</p>
            <p className="text-[10px] text-screens-muted">Curso Emu</p>
          </div>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-4">
        <nav className="space-y-0.5">
          {mainNav.map((item) => {
            const active = navActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`nav-item ${active ? "nav-item-active" : ""}`}
              >
                <item.icon className="h-4 w-4 shrink-0 opacity-70" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <p className="label-xs px-3 pt-6 pb-2">Scanner</p>
        <nav className="space-y-0.5">
          <Link
            href="/dashboard/ativar"
            onClick={() => setMobileOpen(false)}
            className={`nav-item ${pathname === "/dashboard/ativar" ? "nav-item-active" : ""}`}
          >
            <Zap className="h-4 w-4 shrink-0 opacity-70" />
            Ativar Key
          </Link>

          {scannerAccess ? (
            visibleScannerNav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`nav-item ${active ? "nav-item-active" : ""}`}
                >
                  <item.icon className="h-4 w-4 shrink-0 opacity-70" />
                  {item.label}
                </Link>
              );
            })
          ) : (
            <p className="px-3 py-2 text-[11px] text-screens-muted leading-relaxed">
              Ativa a key para liberar Pins e Results.
            </p>
          )}
        </nav>

        {(user.mobileIos || user.mobileAndroid || user.role === "owner" || user.role === "admin") && (
          <>
            <p className="label-xs px-3 pt-5 pb-2">Scan Mobile</p>
            <nav className="space-y-0.5">
              {(user.mobileIos || user.role === "owner" || user.role === "admin") && (
                <Link
                  href="/dashboard/scanner/mobile-ios"
                  onClick={() => setMobileOpen(false)}
                  className={`nav-item ${pathname === "/dashboard/scanner/mobile-ios" ? "nav-item-active" : ""}`}
                >
                  <Apple className="h-4 w-4 shrink-0 opacity-70" />
                  <span className="flex-1">Scan iOS</span>
                  <span className="text-[9px] rounded-md border border-zinc-500/30 bg-zinc-500/10 px-1.5 py-0.5 text-zinc-400 font-bold uppercase">iOS</span>
                </Link>
              )}
              {(user.mobileAndroid || user.role === "owner" || user.role === "admin") && (
                <Link
                  href="/dashboard/scanner/mobile-android"
                  onClick={() => setMobileOpen(false)}
                  className={`nav-item ${pathname === "/dashboard/scanner/mobile-android" ? "nav-item-active" : ""}`}
                >
                  <Cpu className="h-4 w-4 shrink-0 opacity-70" />
                  <span className="flex-1">Scan Android</span>
                  <span className="text-[9px] rounded-md border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 text-emerald-400 font-bold uppercase">APK</span>
                </Link>
              )}
            </nav>
          </>
        )}

        <div className="mt-4 px-1">
          <a
            href="https://discord.gg/35Aw934hNh"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-item justify-between"
          >
            <span className="flex items-center gap-3">
              <MessageCircle className="h-4 w-4 opacity-70" />
              Discord
            </span>
            <ChevronRight className="h-3.5 w-3.5 opacity-30" />
          </a>
        </div>

        {(user.role === "admin" || user.role === "owner") && (
          <div className="mt-2 space-y-0.5">
            <Link
              href="/admin"
              onClick={() => setMobileOpen(false)}
              className={`nav-item ${pathname.startsWith("/admin") ? "nav-item-active" : ""}`}
            >
              <Settings className="h-4 w-4 opacity-70" />
              Admin
            </Link>
            {user.role === "owner" && (
              <Link
                href="/owner"
                onClick={() => setMobileOpen(false)}
                className={`nav-item ${pathname.startsWith("/owner") ? "nav-item-active" : ""}`}
              >
                <Crown className="h-4 w-4 opacity-70" />
                Owner
              </Link>
            )}
          </div>
        )}
      </div>

      <div className="border-t border-screens-border p-2">
        <UserProfileCard user={user} />
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-screens-bg">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-[220px] shrink-0 flex-col border-r border-screens-border bg-screens-bg-elevated">
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Fechar menu"
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[min(280px,85vw)] flex-col border-r border-screens-border bg-screens-bg-elevated transition-transform duration-200 md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          type="button"
          aria-label="Fechar menu"
          className="absolute right-3 top-4 rounded-lg p-2 text-screens-muted hover:bg-white/5"
          onClick={() => setMobileOpen(false)}
        >
          <X className="h-5 w-5" />
        </button>
        {sidebarContent}
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-3 border-b border-screens-border bg-screens-bg-elevated px-4 py-3 md:hidden">
          <button
            type="button"
            aria-label="Abrir menu"
            className="rounded-lg p-2 text-screens-muted hover:bg-white/5"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link href="/dashboard" className="text-sm font-semibold">
            171 ScreenS
          </Link>
        </header>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
      <CourseAIProvider />
    </div>
  );
}
