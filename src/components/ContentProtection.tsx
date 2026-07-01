"use client";

import { useEffect } from "react";
import { siteConfig } from "@/lib/site-config";

interface ContentProtectionProps {
  children: React.ReactNode;
  username: string;
  email?: string | null;
}

export function ContentProtection({ children, username, email }: ContentProtectionProps) {

  useEffect(() => {
    /* ── Force user-select off on the document body ── */
    const prev = document.body.style.userSelect;
    document.body.style.userSelect         = "none";
    (document.body.style as CSSStyleDeclaration & { webkitUserSelect: string }).webkitUserSelect = "none";

    /* ── Block keyboard shortcuts ── */
    const onKeyDown = (e: KeyboardEvent) => {
      const ctrl = e.ctrlKey || e.metaKey;
      const k    = e.key.toLowerCase();
      if (ctrl && ["c","x","a","s","p","u","f"].includes(k)) { e.preventDefault(); e.stopPropagation(); }
      if (["f12","printscreen"].includes(k))                  { e.preventDefault(); e.stopPropagation(); }
      if (ctrl && e.shiftKey && ["i","j","c","k"].includes(k)) { e.preventDefault(); e.stopPropagation(); }
    };

    /* ── Block copy / context menu / drag ── */
    const block = (e: Event) => { e.preventDefault(); e.stopPropagation(); };

    const opts = { capture: true } as const;
    document.addEventListener("keydown",     onKeyDown, opts);
    document.addEventListener("contextmenu", block,     opts);
    document.addEventListener("copy",        block,     opts);
    document.addEventListener("cut",         block,     opts);
    document.addEventListener("selectstart", block,     opts);
    document.addEventListener("dragstart",   block,     opts);

    return () => {
      document.body.style.userSelect = prev;
      document.removeEventListener("keydown",     onKeyDown, opts);
      document.removeEventListener("contextmenu", block,     opts);
      document.removeEventListener("copy",        block,     opts);
      document.removeEventListener("cut",         block,     opts);
      document.removeEventListener("selectstart", block,     opts);
      document.removeEventListener("dragstart",   block,     opts);
    };
  }, []);

  const displayName  = username || "usuário";
  const displayEmail = email ? ` · ${email.slice(0, 4)}***` : "";
  const wm           = `${displayName}${displayEmail} · ${siteConfig.ui.watermark}`;

  return (
    <div style={{ position: "relative" }}>
      {/* ── Watermark via CSS background pattern — zero JS overhead ── */}
      <div
        aria-hidden="true"
        style={{
          position:       "fixed",
          inset:          0,
          pointerEvents:  "none",
          zIndex:         9000,
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
            `<svg xmlns='http://www.w3.org/2000/svg' width='320' height='120'>` +
            `<text x='50%' y='60' text-anchor='middle' dominant-baseline='middle' ` +
            `font-family='monospace' font-size='11' font-weight='bold' ` +
            `fill='rgba(255,255,255,0.042)' transform='rotate(-28,160,60)'>` +
            wm +
            `</text></svg>`
          )}")`,
          backgroundRepeat: "repeat",
          backgroundSize:   "320px 120px",
        }}
      />
      {children}
    </div>
  );
}
