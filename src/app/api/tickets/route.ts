import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";
import { TICKET_TYPES, type TicketDoc, type TicketType } from "@/lib/ticket-types";
import { createDiscordTicketChannel } from "@/lib/discord-ticket";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const db = await getDb();
  const filter =
    session.role === "owner" || session.role === "admin"
      ? {}
      : { userId: session.id };

  const tickets = await db
    .collection<Omit<TicketDoc, "_id">>("tickets")
    .find(filter)
    .sort({ updatedAt: -1 })
    .limit(50)
    .toArray();

  return NextResponse.json({
    tickets: tickets.map((t) => ({ ...t, _id: t._id?.toString() })),
  });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const type = body.type as TicketType;
  const subject = String(body.subject ?? "").trim().slice(0, 120);
  const message = String(body.message ?? "").trim().slice(0, 4000);
  const pin = body.pin ? String(body.pin).trim().toUpperCase().slice(0, 12) : null;

  if (!type || !TICKET_TYPES[type]) {
    return NextResponse.json({ error: "tipo inválido" }, { status: 400 });
  }
  if (!subject || subject.length < 3) {
    return NextResponse.json({ error: "assunto muito curto" }, { status: 400 });
  }
  if (!message || message.length < 10) {
    return NextResponse.json({ error: "descreva o problema (mín. 10 caracteres)" }, { status: 400 });
  }

  const db = await getDb();

  const open = await db.collection("tickets").findOne({
    userId: session.id,
    status: { $in: ["open", "answered"] },
  });
  if (open && session.role === "customer") {
    return NextResponse.json(
      { error: "Você já tem um ticket aberto. Responda nele antes de abrir outro." },
      { status: 409 }
    );
  }

  const counter = await db.collection<{ _id: string; seq: number }>("counters").findOneAndUpdate(
    { _id: "ticket" },
    { $inc: { seq: 1 } },
    { upsert: true, returnDocument: "after" }
  );
  const number = (counter?.seq as number) ?? 1;

  const now = new Date();
  const firstMsg = {
    id: crypto.randomUUID(),
    role: "user" as const,
    content: message,
    createdAt: now,
  };

  let discordChannelId: string | null = null;
  try {
    discordChannelId = await createDiscordTicketChannel({
      userId: session.id,
      username: session.username,
      ticketNumber: number,
      type,
      subject,
      body: message,
      pin: pin ?? undefined,
    });
  } catch (e) {
    console.error("Discord ticket:", e);
  }

  const doc: Omit<TicketDoc, "_id"> = {
    number,
    userId: session.id,
    username: session.username,
    globalName: session.globalName,
    type,
    subject,
    status: "open",
    pin,
    discordChannelId,
    messages: [
      firstMsg,
      ...(discordChannelId
        ? [
            {
              id: crypto.randomUUID(),
              role: "system" as const,
              content: `Canal Discord criado — staff responde lá também.`,
              createdAt: now,
            },
          ]
        : []),
    ],
    createdAt: now,
    updatedAt: now,
  };

  const result = await db.collection("tickets").insertOne(doc);

  return NextResponse.json({
    ticket: { ...doc, _id: result.insertedId.toString() },
  });
}
