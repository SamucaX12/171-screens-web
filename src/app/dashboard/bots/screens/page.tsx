import { getSession } from "@/lib/auth";
import { BotPageShell } from "@/components/BotPageShell";
import { Monitor, Hash, Clock, Users, Mic, FileText } from "lucide-react";

export default async function ScreensBotPage() {
  const session = await getSession();
  const isOwner = session?.role === "owner" || session?.role === "admin";

  const stats = [
    { label: "SS hoje", value: "—", icon: Monitor, color: "#38bdf8" },
    { label: "Em andamento", value: "—", icon: Mic, color: "#34d399" },
    { label: "Aguardando", value: "—", icon: Clock, color: "#fbbf24" },
    { label: "Analistas online", value: "—", icon: Users, color: "#a78bfa" },
  ];

  const features = [
    { icon: Monitor, title: "Agendamento de SS", desc: "Player pede screen share via comando. Bot enfileira e avisa quando é a vez." },
    { icon: Hash, title: "Sala de voz temporária", desc: "Cria canal de voz privado só para o SS. Fecha automaticamente quando termina." },
    { icon: Users, title: "Aviso para analistas", desc: "Ping automático no cargo de analista quando tem SS esperando na fila." },
    { icon: Clock, title: "Fila com prioridade", desc: "Define prioridade por cargo. VIP e Suspeito passam na frente." },
    { icon: Mic, title: "Relatório pós-SS", desc: "Ao fechar o canal, bot pede resultado: Limpo / Suspeito / Banido. Salva tudo." },
    { icon: FileText, title: "Histórico de SS", desc: "Consulta histórico completo de todas as screen shares de um jogador." },
  ];

  return (
    <BotPageShell
      name="Bot SS"
      icon={<Monitor className="h-6 w-6" />}
      color="#38bdf8"
      tagline="Gestão de fila e screen shares no Discord"
      description="Fila automática, salas temporárias, avisos para analistas e relatório pós-SS. Tudo integrado."
      status="inactive"
      isOwner={isOwner}
      stats={stats}
      features={features}
      discordUrl="https://discord.gg/CXkyv3QF9X"
    />
  );
}
