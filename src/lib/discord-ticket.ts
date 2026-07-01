import type { TicketType } from "./ticket-types";
import { TICKET_TYPES } from "./ticket-types";
import { siteConfig } from "./site-config";

/** Cria canal de ticket no Discord (se bot + categoria configurados) */
export async function createDiscordTicketChannel(opts: {
  userId: string;
  username: string;
  ticketNumber: number;
  type: TicketType;
  subject: string;
  body: string;
  pin?: string;
}): Promise<string | null> {
  const token = process.env.DISCORD_BOT_TOKEN;
  const guildId = process.env.DISCORD_GUILD_ID;
  const categoryId = process.env.DISCORD_TICKET_CATEGORY_ID;
  const staffRoleId = process.env.DISCORD_TICKET_STAFF_ROLE_ID || process.env.DISCORD_ROLE_TIER1_ID;

  if (!token || !guildId) return null;

  const slug = opts.username.replace(/[^a-z0-9]/gi, "").slice(0, 12).toLowerCase() || "user";
  const name = `ticket-${opts.ticketNumber}-${slug}`.slice(0, 100);

  const overwrites: { id: string; type: number; allow?: string; deny?: string }[] = [
    { id: guildId, type: 0, deny: "1024" },
    {
      id: opts.userId,
      type: 1,
      allow: "3072|1024|2048|16384|512",
    },
  ];

  if (staffRoleId) {
    overwrites.push({
      id: staffRoleId,
      type: 0,
      allow: "3072|1024|2048|16384|512|8192",
    });
  }

  const payload: Record<string, unknown> = {
    name,
    type: 0,
    topic: `171 Ticket #${opts.ticketNumber} | ${TICKET_TYPES[opts.type].label} | ${opts.userId}`,
    permission_overwrites: overwrites,
  };

  if (categoryId) payload.parent_id = categoryId;

  const res = await fetch(`https://discord.com/api/v10/guilds/${guildId}/channels`, {
    method: "POST",
    headers: {
      Authorization: `Bot ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    console.error("Discord ticket channel:", await res.text());
    return null;
  }

  const channel = (await res.json()) as { id: string };
  const pinLine = opts.pin ? `\n**Pin:** \`${opts.pin}\`` : "";
  const content = `<@${opts.userId}>${staffRoleId ? ` <@&${staffRoleId}>` : ""}`;

  await fetch(`https://discord.com/api/v10/channels/${channel.id}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bot ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content,
      embeds: [
        {
          color: 0x5865f2,
          title: `Ticket #${opts.ticketNumber} · ${TICKET_TYPES[opts.type].label}`,
          description: `**${opts.subject}**\n\n${opts.body.slice(0, 1500)}${pinLine}`,
          footer: { text: `Aberto pelo site ${siteConfig.scannerName}` },
        },
      ],
    }),
  });

  return channel.id;
}
