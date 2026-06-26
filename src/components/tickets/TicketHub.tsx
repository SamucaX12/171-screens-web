"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Headphones,
  Loader2,
  MessageSquarePlus,
  Send,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { TICKET_TYPES, type TicketDoc, type TicketType } from "@/lib/ticket-types";

const STATUS_LABEL = {
  open: { label: "Aberto", cls: "text-amber-400" },
  answered: { label: "Respondido", cls: "text-emerald-400" },
  closed: { label: "Fechado", cls: "text-screens-muted" },
};

export function TicketHub() {
  const searchParams = useSearchParams();
  const prefillPin = searchParams.get("pin") ?? "";
  const prefillType = (searchParams.get("type") as TicketType) || undefined;

  const [tickets, setTickets] = useState<TicketDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(!!prefillPin || prefillType === "scan");

  useEffect(() => {
    fetch("/api/tickets")
      .then((r) => r.json())
      .then((d) => setTickets(d.tickets ?? []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-3xl p-6 md:p-10 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="label-xs">Suporte</p>
          <h1 className="text-2xl font-semibold tracking-tight">Tickets</h1>
          <p className="mt-1 text-sm text-screens-muted">
            Abre chamado direto no site — staff responde aqui e no Discord.
          </p>
        </div>
        <button type="button" onClick={() => setShowForm(true)} className="btn-primary shrink-0">
          <MessageSquarePlus className="h-4 w-4" />
          Novo ticket
        </button>
      </div>

      {showForm && (
        <NewTicketForm
          initialPin={prefillPin}
          initialType={prefillType === "scan" ? "scan" : undefined}
          onClose={() => setShowForm(false)}
          onCreated={(t) => {
            setTickets((prev) => [t, ...prev]);
            setShowForm(false);
          }}
        />
      )}

      {loading ? (
        <div className="flex justify-center py-16 text-screens-muted">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : tickets.length === 0 ? (
        <div className="surface p-12 text-center">
          <Headphones className="h-10 w-10 text-screens-muted mx-auto mb-3 opacity-50" />
          <p className="font-medium">Nenhum ticket ainda</p>
          <p className="mt-1 text-sm text-screens-muted">Problema no curso, compra ou scan? Abre um chamado.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {tickets.map((t) => {
            const st = STATUS_LABEL[t.status];
            return (
              <Link
                key={t._id}
                href={`/dashboard/tickets/${t._id}`}
                className="surface flex items-center gap-4 p-4 hover:bg-screens-card-hover transition group"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-screens-bg border border-screens-border font-mono text-xs">
                  #{t.number}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium truncate">{t.subject}</p>
                  <p className="text-[11px] text-screens-muted mt-0.5">
                    {TICKET_TYPES[t.type].label}
                    {t.pin ? ` · PIN ${t.pin}` : ""}
                  </p>
                </div>
                <span className={`text-[11px] font-medium ${st.cls}`}>{st.label}</span>
                <ChevronRight className="h-4 w-4 text-screens-muted opacity-0 group-hover:opacity-100 transition" />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function NewTicketForm({
  initialPin = "",
  initialType,
  onClose,
  onCreated,
}: {
  initialPin?: string;
  initialType?: TicketType;
  onClose: () => void;
  onCreated: (t: TicketDoc) => void;
}) {
  const router = useRouter();
  const [type, setType] = useState<TicketType>(initialType ?? "suporte");
  const [subject, setSubject] = useState(initialPin ? `Scan PIN ${initialPin}` : "");
  const [message, setMessage] = useState("");
  const [pin, setPin] = useState(initialPin);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, subject, message, pin: pin || undefined }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "erro");
      onCreated(data.ticket);
      router.push(`/dashboard/tickets/${data.ticket._id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar ticket");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="surface p-5 md:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-medium">Abrir ticket</h2>
        <button type="button" onClick={onClose} className="text-xs text-screens-muted hover:text-white">
          Cancelar
        </button>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {(Object.keys(TICKET_TYPES) as TicketType[]).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setType(k)}
            className={`rounded-lg border p-3 text-left transition ${
              type === k ? "border-zinc-500 bg-white/[0.04]" : "border-screens-border hover:bg-white/[0.02]"
            }`}
          >
            <p className="text-sm font-medium">{TICKET_TYPES[k].label}</p>
            <p className="text-[11px] text-screens-muted mt-0.5">{TICKET_TYPES[k].desc}</p>
          </button>
        ))}
      </div>

      <input
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Assunto (ex: Não libera Tier I)"
        className="w-full rounded-lg border border-screens-border bg-screens-bg px-4 py-2.5 text-sm outline-none focus:border-zinc-500"
        required
      />

      {(type === "scan" || pin) && (
        <input
          value={pin}
          onChange={(e) => setPin(e.target.value.toUpperCase())}
          placeholder="PIN do scan (opcional)"
          className="w-full rounded-lg border border-screens-border bg-screens-bg px-4 py-2.5 text-sm font-mono outline-none focus:border-zinc-500"
        />
      )}

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Descreva o problema com detalhes — prints, o que tentou, etc."
        rows={4}
        className="w-full resize-none rounded-lg border border-screens-border bg-screens-bg px-4 py-3 text-sm outline-none focus:border-zinc-500"
        required
      />

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto disabled:opacity-50">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        Enviar ticket
      </button>
    </form>
  );
}

export function TicketThread({ ticketId }: { ticketId: string }) {
  const [ticket, setTicket] = useState<TicketDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  function load() {
    fetch(`/api/tickets/${ticketId}`)
      .then((r) => r.json())
      .then((d) => setTicket(d.ticket))
      .finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, [ticketId]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim() || sending) return;
    setSending(true);
    try {
      const res = await fetch(`/api/tickets/${ticketId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setMessage("");
      setTicket((t) =>
        t
          ? {
              ...t,
              messages: [...t.messages, data.message],
              updatedAt: new Date(),
            }
          : t
      );
    } finally {
      setSending(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-screens-muted" />
      </div>
    );
  }

  if (!ticket) {
    return <p className="p-10 text-screens-muted">Ticket não encontrado.</p>;
  }

  const st = STATUS_LABEL[ticket.status];

  return (
    <div className="max-w-2xl p-6 md:p-10">
      <Link href="/dashboard/tickets" className="text-xs text-screens-muted hover:text-white">
        ← Tickets
      </Link>

      <div className="mt-4 surface p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-mono text-xs text-screens-muted">#{ticket.number}</p>
            <h1 className="mt-1 text-xl font-semibold">{ticket.subject}</h1>
            <p className="mt-1 text-sm text-screens-muted">
              {TICKET_TYPES[ticket.type].label}
              {ticket.pin ? ` · PIN ${ticket.pin}` : ""}
            </p>
          </div>
          <span className={`text-sm font-medium ${st.cls}`}>{st.label}</span>
        </div>

        {ticket.discordChannelId && (
          <a
            href="https://discord.gg/35Aw934hNh"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-xs text-[#5865F2] hover:underline"
          >
            <ExternalLink className="h-3 w-3" /> Abrir Discord (canal do ticket)
          </a>
        )}
      </div>

      <div className="mt-4 space-y-3">
        {ticket.messages.map((m) => (
          <div
            key={m.id}
            className={`rounded-xl px-4 py-3 text-sm ${
              m.role === "user"
                ? "bg-white text-black ml-8"
                : m.role === "staff"
                  ? "surface border-emerald-500/20 mr-8"
                  : "text-center text-[11px] text-screens-muted"
            }`}
          >
            {m.role !== "system" && (
              <p className="text-[10px] font-medium uppercase tracking-wider opacity-60 mb-1">
                {m.role === "staff" ? "Staff" : "Você"}
              </p>
            )}
            <p className="whitespace-pre-wrap leading-relaxed">{m.content}</p>
          </div>
        ))}
      </div>

      {ticket.status !== "closed" && (
        <form onSubmit={send} className="mt-4 flex gap-2">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Adicionar mensagem…"
            className="flex-1 rounded-lg border border-screens-border bg-screens-card px-4 py-2.5 text-sm outline-none focus:border-zinc-500"
          />
          <button type="submit" disabled={sending || !message.trim()} className="btn-primary !px-4 disabled:opacity-40">
            <Send className="h-4 w-4" />
          </button>
        </form>
      )}
    </div>
  );
}
