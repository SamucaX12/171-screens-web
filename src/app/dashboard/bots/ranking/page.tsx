import { getSession } from "@/lib/auth";
import { BotPageShell } from "@/components/BotPageShell";
import { Trophy, Star, BarChart2, Award, Zap, Users } from "lucide-react";

export default async function RankingBotPage() {
  const session = await getSession();
  const isOwner = session?.role === "owner" || session?.role === "admin";

  const stats = [
    { label: "Analistas rankeados", value: "—", icon: Users, color: "#fbbf24" },
    { label: "Detecções essa semana", value: "—", icon: Zap, color: "#34d399" },
    { label: "Top 1 da semana", value: "—", icon: Trophy, color: "#f59e0b" },
    { label: "Total de pontos", value: "—", icon: Star, color: "#a78bfa" },
  ];

  const features = [
    { icon: Trophy, title: "Leaderboard automático", desc: "Ranking semanal e mensal atualizado em tempo real. Staff vê quem mais detectou." },
    { icon: Star, title: "Pontos por detecção", desc: "Cada detecção confirmada vale pontos. Staff define o peso por tipo de cheat encontrado." },
    { icon: Award, title: "Emblemas automáticos", desc: "10 detecções, 50 detecções, 100 detecções — cargo e emblema automático no Discord." },
    { icon: BarChart2, title: "Histórico completo", desc: "Veja todas as detecções de um analista, quando foram, qual cheat e quem confirmou." },
    { icon: Users, title: "Times e grupos", desc: "Cria times de analistas. Ranking por time além do individual." },
    { icon: Zap, title: "Integração com tickets", desc: "Quando um ticket de telagem é fechado como 'confirmado', pontua automaticamente." },
  ];

  return (
    <BotPageShell
      name="Ranking Bot"
      icon={<Trophy className="h-6 w-6" />}
      color="#fbbf24"
      tagline="Gamificação para analistas de telagem"
      description="Pontuação, leaderboard e emblemas automáticos. Motiva o staff a telar mais e melhor."
      status="inactive"
      isOwner={isOwner}
      stats={stats}
      features={features}
      discordUrl="https://discord.gg/CXkyv3QF9X"
    />
  );
}
