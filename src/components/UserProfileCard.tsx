"use client";

import { LogOut, Shield, Smartphone } from "lucide-react";
import { useRouter } from "next/navigation";
import { UserAvatar } from "@/components/UserAvatar";
import { scannerPlanLabel, hasScannerAccess } from "@/lib/scanner-access";
import { tierDisplay } from "@/lib/tier-theme";
import type { SessionUser } from "@/lib/types";

export function UserProfileCard({ user }: { user: SessionUser }) {
  const router = useRouter();
  const course      = tierDisplay(user.courseTier, user.accessSource);
  const scannerLabel = scannerPlanLabel(user.scannerPlan);
  const hasScanner  = hasScannerAccess(user.scannerPlan, user.role);
  const displayName = user.globalName || user.username;
  const showUsername =
    user.username && user.username !== displayName && !user.id.startsWith("google:");

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <div
      className="rounded-xl border border-white/[0.07] p-2.5 transition-all duration-200 hover:border-white/[0.1]"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Avatar + name row */}
      <div className="flex items-center gap-2.5">
        <div className="relative shrink-0">
          <div
            className="absolute inset-0 rounded-xl opacity-60"
            style={{
              background: "linear-gradient(135deg, #00ff88, #00ffc8)",
              padding: "1.5px",
              borderRadius: "12px",
            }}
          />
          <UserAvatar
            userId={user.id}
            avatar={user.avatar}
            name={displayName}
            size={36}
            className="relative rounded-xl"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-semibold text-white leading-tight">
            {displayName}
          </p>
          {showUsername && (
            <p className="truncate text-[10px] text-screens-muted leading-none mt-0.5">
              @{user.username}
            </p>
          )}
        </div>
      </div>

      {/* Status rows */}
      <div className="mt-2.5 space-y-1">
        {/* Course tier */}
        <div className="flex items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 bg-screens-bg/60">
          <span className="flex items-center gap-1.5 text-[10px] text-screens-muted">
            <Shield className="h-3 w-3 opacity-60" />
            Curso
          </span>
          <span
            className="text-[10px] font-bold"
            style={{ color: course.theme?.hexColor ?? "#6060a0" }}
          >
            {course.label}
          </span>
        </div>

        {/* Scanner */}
        <div className="flex items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 bg-screens-bg/60">
          <span className="flex items-center gap-1.5 text-[10px] text-screens-muted">
            <svg className="h-3 w-3 opacity-60" viewBox="0 0 16 16" fill="currentColor">
              <path d="M1 2h2v12H1zm3 0h1v12H4zm2 0h2v12H6zm3 0h1v12H9zm2 0h2v12h-2zm3 0h1v12h-1z" />
            </svg>
            Scanner
          </span>
          <span className={`text-[10px] font-bold ${hasScanner ? "text-neon-green" : "text-screens-muted"}`}>
            {hasScanner ? scannerLabel : "Sem key"}
          </span>
        </div>

        {/* Mobile access */}
        {(user.mobileIos || user.mobileAndroid) && (
          <div className="flex items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 bg-screens-bg/60">
            <span className="flex items-center gap-1.5 text-[10px] text-screens-muted">
              <Smartphone className="h-3 w-3 opacity-60" />
              Mobile
            </span>
            <span className="text-[10px] font-bold text-neon-teal">
              {[user.mobileIos && "iOS", user.mobileAndroid && "Android"].filter(Boolean).join(" · ")}
            </span>
          </div>
        )}
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg py-1.5 text-[11px] font-medium text-screens-muted hover:bg-white/[0.05] hover:text-white transition-all duration-200"
      >
        <LogOut className="h-3 w-3" />
        Sair
      </button>
    </div>
  );
}
