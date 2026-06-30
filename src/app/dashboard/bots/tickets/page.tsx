import { getSession } from "@/lib/auth";
import { BotPageShell } from "@/components/BotPageShell";
import { Ticket, Hash, Users, Clock, CheckCircle2, Plus } from "lucide-react";

export default async function TicketBotPage() {
  const session = await getSession();
  const isOwner = session?.role === "owner" || session?.role === "admin";

  const stats = [
    { label: "Tickets abertos", value: "—", icon: Ticket, color: "#a78bfa" },
    { label: "Em atendimento", value: "—", icon: Users, color: "#38bdf8" },
    { label: "Fechados hoje", value: "—", icon: CheckCircle2, color: "#34d399" },
    { label: "Tempo médio", value: "—", icon: Clock, color: "#fbbf24" },
  ];

  const features = [
    { icon: Ticket, title: "Abre ticket com 1 clique", desc: "Botão fixo no canal — o player clica e abre um canal privado de atendimento instantâneo." },
    { icon: Hash, title: "Canal privado por ticket", desc: "Cada ticket vira um canal privado entre o player e o staff. Histórico completo salvo." },
    { icon: CheckCircle2, title: "Fechamento automático", desc: "Ticket inativo por X horas é fechado e arquivado automaticamente." },
    { icon: Users, title: "Categorias de assunto", desc: "Ticket de Suporte, Compra, Recurso de Ban, Dúvida — cada categoria com flow diferente." },
    { icon: Clock, title: "SLA e prazo", desc: "Define prazo de resposta por categoria. Bot avisa o staff quando estiver atrasado." },
    { icon: Plus, title: "Logs e transcripts", desc: "Toda conversa do ticket é salva em HTML e enviada para o canal de logs." },
  ];

  return (
    <BotPageShell
      name="Ticket Bot"
      icon={<Ticket className="h-6 w-6" />}
      color="#a78bfa"
      tagline="Sistema de suporte profissional via Discord"
      description="Gerencie atendimentos, bugs e recursos de ban com tickets organizados, logs automáticos e categorias customizáveis."
      status="active"
      isOwner={isOwner}
      stats={stats}
      features={features}
      discordUrl="https://discord.gg/CXkyv3QF9X"
    />
  );
}
