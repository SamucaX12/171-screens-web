"use client";

import { Crosshair } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

type Props = {
  size?: "sm" | "md";
  showTagline?: boolean;
  className?: string;
};

export function BrandLogo({ size = "md", showTagline = true, className = "" }: Props) {
  const { colors, name, nameHighlight, tagline } = siteConfig;
  const iconBox = size === "sm" ? "h-8 w-8 rounded-lg" : "h-9 w-9 rounded-xl";
  const icon = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  const title = size === "sm" ? "text-xs" : "text-sm";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`relative flex shrink-0 items-center justify-center overflow-hidden ${iconBox}`}>
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.primarySoft})` }}
        />
        <div className="absolute inset-[1px] rounded-[inherit] bg-screens-bg/80 backdrop-blur-sm" />
        <Crosshair
          className={`relative text-white ${icon}`}
          style={{ filter: `drop-shadow(0 0 6px ${colors.primary}cc)` }}
        />
      </div>
      <div>
        <p className={`font-black leading-tight tracking-tight text-white ${title}`}>
          {name}{" "}
          <span style={{ color: colors.primary }}>{nameHighlight}</span>
        </p>
        {showTagline && <p className="text-[10px] text-screens-muted">{tagline}</p>}
      </div>
    </div>
  );
}
