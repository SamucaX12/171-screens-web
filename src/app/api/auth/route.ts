import { NextRequest, NextResponse } from "next/server";
import { handlePinAuth } from "@/lib/scanner-client-api";

/** Scanner .exe valida PIN via POST /api/auth */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    const { status, data } = await handlePinAuth(body);
    return NextResponse.json(data, { status });
  } catch (e) {
    console.error("[scanner auth]", e);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
