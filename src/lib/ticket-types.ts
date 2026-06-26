export const TICKET_TYPES = {
  suporte: { label: "Suporte", desc: "Problema no curso, scanner ou site" },
  compra: { label: "Compra", desc: "Tier, booster, key ou pagamento" },
  scan: { label: "Scan / Pin", desc: "Dúvida sobre resultado ou pin" },
  duvida: { label: "Dúvida geral", desc: "Qualquer pergunta sobre o 171" },
} as const;

export type TicketType = keyof typeof TICKET_TYPES;
export type TicketStatus = "open" | "answered" | "closed";

export type TicketMessage = {
  id: string;
  role: "user" | "staff" | "system";
  content: string;
  createdAt: Date;
};

export type TicketDoc = {
  _id?: string;
  number: number;
  userId: string;
  username: string;
  globalName?: string | null;
  type: TicketType;
  subject: string;
  status: TicketStatus;
  pin?: string | null;
  discordChannelId?: string | null;
  messages: TicketMessage[];
  createdAt: Date;
  updatedAt: Date;
};
