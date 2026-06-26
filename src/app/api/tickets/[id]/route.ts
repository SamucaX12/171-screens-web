import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getSession } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { id } = await params;
  if (!ObjectId.isValid(id)) return NextResponse.json({ error: "not found" }, { status: 404 });

  const db = await getDb();
  const ticket = await db.collection("tickets").findOne({ _id: new ObjectId(id) });
  if (!ticket) return NextResponse.json({ error: "not found" }, { status: 404 });

  const isStaff = session.role === "owner" || session.role === "admin";
  if (ticket.userId !== session.id && !isStaff) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  return NextResponse.json({ ticket: { ...ticket, _id: ticket._id.toString() } });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { id } = await params;
  if (!ObjectId.isValid(id)) return NextResponse.json({ error: "not found" }, { status: 404 });

  const body = await req.json().catch(() => ({}));
  const content = String(body.message ?? "").trim().slice(0, 4000);
  if (!content) return NextResponse.json({ error: "mensagem vazia" }, { status: 400 });

  const db = await getDb();
  const ticket = await db.collection("tickets").findOne({ _id: new ObjectId(id) });
  if (!ticket) return NextResponse.json({ error: "not found" }, { status: 404 });

  const isStaff = session.role === "owner" || session.role === "admin";
  if (ticket.userId !== session.id && !isStaff) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  if (ticket.status === "closed") {
    return NextResponse.json({ error: "ticket fechado" }, { status: 400 });
  }

  const msg = {
    id: crypto.randomUUID(),
    role: isStaff ? ("staff" as const) : ("user" as const),
    content,
    createdAt: new Date(),
  };

  const updatedMessages = [...(ticket.messages ?? []), msg];
  await db.collection("tickets").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        messages: updatedMessages,
        updatedAt: new Date(),
        status: isStaff ? "answered" : "open",
      },
    }
  );

  if (ticket.discordChannelId && process.env.DISCORD_BOT_TOKEN) {
    const mention = isStaff ? `<@${ticket.userId}>` : "";
    await fetch(`https://discord.com/api/v10/channels/${ticket.discordChannelId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: `${mention} **${isStaff ? "Staff" : ticket.username}:** ${content}`.trim(),
      }),
    }).catch(console.error);
  }

  return NextResponse.json({ message: msg });
}
