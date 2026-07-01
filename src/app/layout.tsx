import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { CustomCursor } from "@/components/CustomCursor";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: siteConfig.metadata.title,
  description: siteConfig.metadata.description,
  keywords: siteConfig.metadata.keywords,
  openGraph: {
    title: siteConfig.metadata.ogTitle,
    description: siteConfig.metadata.description,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { id, colors } = siteConfig;

  return (
    <html
      lang="pt-BR"
      data-brand={id}
      className={`${inter.variable} ${jetbrains.variable}`}
      style={
        {
          "--brand-primary": colors.primary,
          "--brand-primary-soft": colors.primarySoft,
          "--brand-accent": colors.accent,
          "--brand-bg": colors.bg,
          "--brand-bg-elevated": colors.bgElevated,
          "--brand-card": colors.card,
          "--brand-border": colors.border,
          "--brand-muted": colors.muted,
          "--brand-text": colors.text,
        } as React.CSSProperties
      }
    >
      <body className={inter.className}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
