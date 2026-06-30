import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { CustomCursor } from "@/components/CustomCursor";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Deep Screen Share — Plataforma Premium de Screen Share",
  description:
    "Plataforma premium de telagem forense, scanner e análise de bypass. Curso Básico, Avançado e Privado. Scanner enterprise com detecção em tempo real.",
  keywords: ["deep screen share", "screenshare", "telagem", "forense", "bypass", "scanner", "curso", "anti-cheat"],
  openGraph: {
    title: "Deep Screen Share",
    description: "Plataforma premium de telagem forense e scanner anti-cheat.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className={inter.className}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
