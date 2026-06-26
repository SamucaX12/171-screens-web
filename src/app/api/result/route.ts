import { NextRequest, NextResponse } from "next/server";
import { handleScannerPost } from "@/lib/scanner-client-api";

/** Scanner .exe envia resultado completo via POST /api/result */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    const { status, data } = await handleScannerPost(body);
    return NextResponse.json(data, { status });
  } catch (e) {
    console.error("[scanner result]", e);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
