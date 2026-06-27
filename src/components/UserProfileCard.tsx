"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { UserAvatar } from "@/components/UserAvatar";
import { scannerPlanLabel, hasScannerAccess } from "@/lib/scanner-access";
import { tierDisplay } from "@/lib/tier-theme";
import type { SessionUser } from "@/lib/types";

export function UserProfileCard({ user }: { user: SessionUser }) {
  const router = useRouter();
  const course = tierDisplay(user.courseTier, user.accessSource);
  const scannerLabel = scannerPlanLabel(user.scannerPlan);
  const hasScanner = hasScannerAccess(user.scannerPlan, user.role);
  const displayName = user.globalName || user.username;
  const showUsername = user.username && user.username !== displayName && !user.id.startsWith("google:");

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <div className="rounded-lg border border-screens-border bg-screens-card p-2.5">
      <div className="flex items-center gap-2.5">
        <UserAvatar userId={user.id} avatar={user.avatar} name={displayName} size={36} className="rounded-lg" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-medium">{displayName}</p>
          {showUsername && <p className="truncate text-[10px] text-screens-muted">@{user.username}</p>}
        </div>
      </div>

      <div className="mt-2 space-y-1 text-[10px]">
        <div className="flex justify-between gap-2 px-2 py-1.5 rounded-md bg-screens-bg">
          <span className="text-screens-muted">Curso</span>
          <span className={course.theme?.color ?? "text-screens-muted"}>{course.label}</span>
        </div>
        <div className="flex justify-between gap-2 px-2 py-1.5 rounded-md bg-screens-bg">
          <span className="text-screens-muted">Scanner</span>
          <span className="text-zinc-300">{hasScanner ? scannerLabel : "Sem key"}</span>
        </div>
        {(user.mobileIos || user.mobileAndroid) && (
          <div className="flex justify-between gap-2 px-2 py-1.5 rounded-md bg-screens-bg">
            <span className="text-screens-muted">Mobile</span>
            <span className="text-fuchsia-300 text-right">
              {[user.mobileIos && "iOS", user.mobileAndroid && "Android"].filter(Boolean).join(" · ")}
            </span>
          </div>
        )}
      </div>

      <button
        onClick={logout}
        className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-md py-2 text-[11px] text-screens-muted hover:bg-white/[0.04] hover:text-white transition"
      >
        <LogOut className="h-3 w-3" />
        Sair
      </button>
    </div>
  );
}
