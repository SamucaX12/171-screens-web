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
  Ticket,
  Trophy,
  Hash,
  ChevronDown,
  Crosshair,
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

const PARTNER_ORGS = [
  { name: "alfa",     color: "#f59e0b" },
  { name: "helipa",   color: "#3b82f6" },
  { name: "tokio",    color: "#ef4444" },
  { name: "delrio",   color: "#8b5cf6" },
  { name: "duck",     color: "#06b6d4" },
  { name: "kong",     color: "#f97316" },
  { name: "zombie",   color: "#22c55e" },
  { name: "colômbia", color: "#ec4899" },
];

const mainNav = [
  { href: "/dashboard",             label: "Início",       icon: LayoutDashboard },
  { href: "/dashboard/como-usar",   label: "Como Usar",    icon: HelpCircle },
  { href: "/dashboard/curso",       label: "Meu Curso",    icon: GraduationCap },
  { href: "/dashboard/curso/tutor", label: "Tutor IA",     icon: Bot, badge: "3 modos", badgeColor: "#00ff88" },
  { href: "/dashboard/curso/booster", label: "Booster",    icon: Sparkles },
  { href: "/dashboard/curso-mobile",  label: "Curso Mobile", icon: Smartphone },
  { href: "/dashboard/tickets",     label: "Tickets",      icon: Headphones },
  { href: "/comprar",               label: "Comprar",      icon: ShoppingBag },
];

const scannerNav = [
  { href: "/dashboard/scanner/pins",       label: "Pins",       icon: KeyRound },
  { href: "/dashboard/scanner/results",    label: "Results",    icon: FileBarChart },
  { href: "/dashboard/scanner/strings",    label: "Strings",    icon: Type },
  { href: "/dashboard/scanner/gui",        label: "GUI",        icon: Palette },
  { href: "/dashboard/scanner/enterprise", label: "Enterprise", icon: Building2 },
];

const botNav = [
  { href: "/dashboard/bots/tickets", label: "Ticket Bot",  icon: Ticket, color: "#00ff88" },
  { href: "/dashboard/bots/ranking", label: "Ranking Bot", icon: Trophy, color: "#fbbf24" },
  { href: "/dashboard/bots/screens", label: "Bot SS",      icon: Hash,   color: "#00ffc8" },
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
  const [botsOpen, setBotsOpen] = useState(false);

  const scannerAccess  = hasScannerAccess(user.scannerPlan, user.role);
  const showEnterprise = hasEnterpriseAccess(user.scannerPlan, user.role);
  const showStrings    = canAccessStrings(user.scannerPlan, user.role);
  const showGui        = canAccessGui(user.scannerPlan, user.role);
  const showPins       = hasProAccess(user.scannerPlan, user.role);
  const isOwnerOrAdmin = user.role === "admin" || user.role === "owner";

  const visibleScannerNav = scannerNav.filter((item) => {
    if (item.href.includes("/pins") || item.href.includes("/results")) return showPins;
    if (item.href.includes("/strings")) return showStrings;
    if (item.href.includes("/gui")) return showGui;
    if (item.href.includes("/enterprise")) return showEnterprise;
    return true;
  });

  function navActive(href: string) {
    if (href === "/dashboard/como-usar") return pathname === href || pathname.startsWith(href + "/");
    if (href === "/dashboard/curso/tutor") return pathname === href || pathname.startsWith(href + "/");
    if (href === "/dashboard/curso/booster") return pathname === href || pathname.startsWith(href + "/");
    if (href === "/dashboard/curso") {
      return (
        pathname === href ||
        (pathname.startsWith("/dashboard/curso/") &&
          !pathname.startsWith("/dashboard/curso/booster") &&
          !pathname.startsWith("/dashboard/curso/tutor"))
      );
    }
    if (href === "/dashboard/curso-mobile") return pathname === href || pathname.startsWith("/dashboard/curso-mobile/");
    return pathname === href;
  }

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* ── Logo ── */}
      <div className="px-4 pt-5 pb-4 border-b border-white/[0.05]">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 group"
          onClick={() => setMobileOpen(false)}
        >
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl overflow-hidden">
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #00ff88, #00ffc8)" }} />
            <div className="absolute inset-[1px] rounded-[10px] bg-screens-bg/80 backdrop-blur-sm" />
            <Crosshair className="relative h-4 w-4 text-white" style={{ filter: "drop-shadow(0 0 6px rgba(0,255,136,0.8))" }} />
          </div>
          <div>
            <p className="text-sm font-black leading-tight tracking-tight text-white">
              Deep Screen <span style={{ color: "#00ff88" }}>Share</span>
            </p>
            <p className="text-[10px] text-screens-muted">Plataforma Premium</p>
          </div>
        </Link>
      </div>

      {/* ── Nav body ── */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5">

        {/* Main nav */}
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
                <item.icon
                  className="h-4 w-4 shrink-0"
                  style={active ? { color: "#00ff88", filter: "drop-shadow(0 0 6px rgba(0,255,136,0.5))" } : { opacity: 0.5 }}
                />
                <span className="flex-1 truncate">{item.label}</span>
                {"badge" in item && item.badge && (
                  <span
                    className="shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-black"
                    style={{
                      backgroundColor: `${item.badgeColor}18`,
                      color: item.badgeColor,
                      border: `1px solid ${item.badgeColor}30`,
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bots accordion */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setBotsOpen((v) => !v)}
            className="nav-item w-full justify-between"
          >
            <span className="flex items-center gap-3">
              <Bot className="h-4 w-4 opacity-50" />
              <span>Bots</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="badge-amber text-[9px]">{botNav.length}</span>
              <ChevronDown
                className={`h-3 w-3 text-screens-muted transition-transform duration-300 ${botsOpen ? "rotate-180" : ""}`}
              />
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${botsOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div className="mt-0.5 pl-3 space-y-0.5 pb-1">
              {botNav.map((b) => (
                <Link
                  key={b.href}
                  href={b.href}
                  onClick={() => setMobileOpen(false)}
                  className={`nav-item text-[12px] ${pathname.startsWith(b.href) ? "nav-item-active" : ""}`}
                >
                  <b.icon
                    className="h-3.5 w-3.5 shrink-0"
                    style={{ color: b.color, opacity: 0.85, filter: `drop-shadow(0 0 4px ${b.color}60)` }}
                  />
                  {b.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Scanner section */}
        <div className="pt-3">
          <p className="label-xs px-3 pb-2">Scanner</p>
          <nav className="space-y-0.5">
            <Link
              href="/dashboard/ativar"
              onClick={() => setMobileOpen(false)}
              className={`nav-item ${pathname === "/dashboard/ativar" ? "nav-item-active" : ""}`}
            >
              <Zap
                className="h-4 w-4 shrink-0"
                style={
                  pathname === "/dashboard/ativar"
                    ? { color: "#fbbf24", filter: "drop-shadow(0 0 6px rgba(251,191,36,0.5))" }
                    : { opacity: 0.5 }
                }
              />
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
                    <item.icon
                      className="h-4 w-4 shrink-0"
                      style={active ? { color: "#00ff88", filter: "drop-shadow(0 0 5px rgba(0,255,136,0.5))" } : { opacity: 0.5 }}
                    />
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
        </div>

        {/* Scan Mobile */}
        {(user.mobileIos || user.mobileAndroid || isOwnerOrAdmin) && (
          <div className="pt-3">
            <p className="label-xs px-3 pb-2">Scan Mobile</p>
            <nav className="space-y-0.5">
              {(user.mobileIos || isOwnerOrAdmin) && (
                <Link
                  href="/dashboard/scanner/mobile-ios"
                  onClick={() => setMobileOpen(false)}
                  className={`nav-item ${pathname === "/dashboard/scanner/mobile-ios" ? "nav-item-active" : ""}`}
                >
                  <Apple className="h-4 w-4 shrink-0" style={{ opacity: 0.6 }} />
                  <span className="flex-1">Scan iOS</span>
                  <span className="badge-teal text-[9px]">iOS</span>
                </Link>
              )}
              {(user.mobileAndroid || isOwnerOrAdmin) && (
                <Link
                  href="/dashboard/scanner/mobile-android"
                  onClick={() => setMobileOpen(false)}
                  className={`nav-item ${pathname === "/dashboard/scanner/mobile-android" ? "nav-item-active" : ""}`}
                >
                  <Cpu className="h-4 w-4 shrink-0" style={{ opacity: 0.6 }} />
                  <span className="flex-1">Scan Android</span>
                  <span className="badge-green text-[9px]">APK</span>
                </Link>
              )}
            </nav>
          </div>
        )}

        {/* Partner Orgs */}
        <div className="pt-3">
          <p className="label-xs px-3 pb-2">Orgs Parceiras</p>
          <div className="flex flex-wrap gap-1.5 px-3 pb-1">
            {PARTNER_ORGS.map((org) => (
              <span
                key={org.name}
                className="flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-semibold transition-all duration-200 hover:scale-105"
                style={{
                  background: `${org.color}10`,
                  color: org.color,
                  border: `1px solid ${org.color}25`,
                }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: org.color, boxShadow: `0 0 4px ${org.color}` }}
                />
                {org.name}
              </span>
            ))}
          </div>
        </div>

        {/* Discord */}
        <div className="pt-2">
          <a
            href="https://discord.gg/CXkyv3QF9X"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-item justify-between"
          >
            <span className="flex items-center gap-3">
              <MessageCircle className="h-4 w-4 opacity-50" />
              Discord
            </span>
            <ChevronRight className="h-3.5 w-3.5 opacity-25" />
          </a>
        </div>

        {/* Admin / Owner */}
        {isOwnerOrAdmin && (
          <div className="pt-1 space-y-0.5">
            <Link
              href="/admin"
              onClick={() => setMobileOpen(false)}
              className={`nav-item ${pathname.startsWith("/admin") ? "nav-item-active" : ""}`}
            >
              <Settings className="h-4 w-4 opacity-50" />
              Admin
            </Link>
            {user.role === "owner" && (
              <Link
                href="/owner"
                onClick={() => setMobileOpen(false)}
                className={`nav-item ${pathname.startsWith("/owner") ? "nav-item-active" : ""}`}
              >
                <Crown
                  className="h-4 w-4"
                  style={{ color: "#fbbf24", opacity: 0.8, filter: "drop-shadow(0 0 5px rgba(251,191,36,0.5))" }}
                />
                Owner
              </Link>
            )}
          </div>
        )}
      </div>

      {/* ── User card ── */}
      <div className="border-t border-white/[0.05] p-2">
        <UserProfileCard user={user} />
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-screens-bg">
      {/* Ambient background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute -top-32 -left-32 h-96 w-96 rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle, #00ff88, transparent 70%)", filter: "blur(60px)" }}
        />
        <div
          className="absolute top-1/2 -right-32 h-80 w-80 rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, #00ffc8, transparent 70%)", filter: "blur(60px)" }}
        />
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex relative z-10 w-[232px] shrink-0 flex-col border-r border-white/[0.05] sidebar-surface">
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-30" />
        <div className="relative flex flex-col h-full">
          {sidebarContent}
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Fechar menu"
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden animate-fade-in"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[min(288px,88vw)] flex-col border-r border-white/[0.07] sidebar-surface transition-transform duration-300 md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
      >
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-20" />
        <button
          type="button"
          aria-label="Fechar menu"
          className="absolute right-3 top-4 z-10 rounded-lg p-2 text-screens-muted hover:bg-white/[0.06] hover:text-white transition-colors"
          onClick={() => setMobileOpen(false)}
        >
          <X className="h-5 w-5" />
        </button>
        <div className="relative flex flex-col h-full">
          {sidebarContent}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile header */}
        <header className="flex items-center gap-3 border-b border-white/[0.06] bg-screens-bg-elevated/80 backdrop-blur-xl px-4 py-3 md:hidden sticky top-0 z-30">
          <button
            type="button"
            aria-label="Abrir menu"
            className="rounded-xl p-2 text-screens-muted hover:bg-white/[0.06] hover:text-white transition-colors"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-sm font-black text-white">
              Deep Screen <span style={{ color: "#00ff88" }}>Share</span>
            </span>
          </Link>
        </header>

        <main className="flex-1 overflow-auto">{children}</main>
      </div>

      <CourseAIProvider />
    </div>
  );
}
