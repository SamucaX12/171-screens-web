import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { buildSystemPrompt } from "@/lib/course-ai/prompt";
import { searchCourseKnowledge } from "@/lib/course-ai/search";
import { buildFallbackReply } from "@/lib/course-ai/fallback";
import { chatCompletion, hasLlmConfigured } from "@/lib/course-ai/llm";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const message = String(body.message ?? "").trim();
  const lessonId = body.lessonId ? String(body.lessonId) : undefined;
  const history = Array.isArray(body.history) ? body.history : [];

  if (!message || message.length > 2000) {
    return NextResponse.json({ error: "mensagem inválida" }, { status: 400 });
  }

  const chunks = searchCourseKnowledge(message, session, { lessonId, limit: 8 });
  const sources = chunks.slice(0, 5).map((c) => ({
    title: c.lessonTitle ?? c.title,
    link: c.link,
  }));

  if (!hasLlmConfigured()) {
    const { reply } = buildFallbackReply(message, chunks);
    return NextResponse.json({ reply, sources, mode: "fallback" });
  }

  try {
    const system = buildSystemPrompt(session, chunks, lessonId);
    const recent = history
      .slice(-6)
      .filter((m: { role?: string; content?: string }) => m.role && m.content)
      .map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: String(m.content).slice(0, 1500),
      }));

    const reply = await chatCompletion([
      { role: "system", content: system },
      ...recent,
      { role: "user", content: message },
    ]);

    return NextResponse.json({ reply, sources, mode: "llm" });
  } catch (err) {
    console.error("Course AI:", err);
    const { reply } = buildFallbackReply(message, chunks);
    return NextResponse.json({
      reply: `${reply}\n\n_(IA externa indisponível — resposta do banco do curso.)_`,
      sources,
      mode: "fallback",
    });
  }
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return NextResponse.json({ llm: hasLlmConfigured() });
}
