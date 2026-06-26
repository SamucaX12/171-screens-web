import { Suspense } from "react";
import { getSession } from "@/lib/auth";
import { TicketHub } from "@/components/tickets/TicketHub";

export default async function TicketsPage() {
  await getSession();
  return (
    <Suspense fallback={<div className="p-10 text-screens-muted text-sm">Carregando…</div>}>
      <TicketHub />
    </Suspense>
  );
}
