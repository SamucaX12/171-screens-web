export type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

function apiKey() {
  return process.env.COURSE_AI_API_KEY || process.env.OPENAI_API_KEY || "";
}

function isAnthropicKey(key: string) {
  return key.startsWith("sk-ant-");
}

export function hasLlmConfigured() {
  return apiKey().length > 10;
}

async function chatCompletionAnthropic(messages: ChatMessage[]) {
  const key = apiKey();
  const model = process.env.COURSE_AI_MODEL || "claude-haiku-4-5-20251001";

  const system = messages.find((m) => m.role === "system")?.content ?? "";
  const userMessages = messages
    .filter((m) => m.role !== "system")
    .map((m) => ({ role: m.role as "user" | "assistant", content: m.content }));

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      max_tokens: 1024,
      system,
      messages: userMessages,
    }),
  });

  if (!res.ok) {
    const err = await res.text().catch(() => "");
    throw new Error(`Anthropic ${res.status}: ${err.slice(0, 200)}`);
  }

  const data = (await res.json()) as {
    content?: { type: string; text: string }[];
  };

  return data.content?.find((b) => b.type === "text")?.text?.trim() || "Sem resposta da IA.";
}

async function chatCompletionOpenAI(messages: ChatMessage[]) {
  const key = apiKey();
  const base = (process.env.COURSE_AI_BASE_URL || "https://api.openai.com/v1").replace(/\/$/, "");
  const model = process.env.COURSE_AI_MODEL || "gpt-4o-mini";

  const res = await fetch(`${base}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.4,
      max_tokens: 1024,
      messages,
    }),
  });

  if (!res.ok) {
    const err = await res.text().catch(() => "");
    throw new Error(`LLM ${res.status}: ${err.slice(0, 200)}`);
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };

  return data.choices?.[0]?.message?.content?.trim() || "Sem resposta da IA.";
}

export async function chatCompletion(messages: ChatMessage[]) {
  const key = apiKey();
  if (!key) throw new Error("COURSE_AI_API_KEY não configurada");

  if (isAnthropicKey(key)) {
    return chatCompletionAnthropic(messages);
  }
  return chatCompletionOpenAI(messages);
}
