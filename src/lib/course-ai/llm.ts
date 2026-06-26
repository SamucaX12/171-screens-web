export type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

function apiKey() {
  return process.env.COURSE_AI_API_KEY || process.env.OPENAI_API_KEY || "";
}

export function hasLlmConfigured() {
  return apiKey().length > 10;
}

export async function chatCompletion(messages: ChatMessage[]) {
  const key = apiKey();
  if (!key) throw new Error("COURSE_AI_API_KEY não configurada");

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
      temperature: 0.35,
      max_tokens: 900,
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
