import { getSession } from "@/lib/auth";
import { TicketThread } from "@/components/tickets/TicketHub";

export default async function TicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await getSession();
  const { id } = await params;
  return <TicketThread ticketId={id} />;
}
