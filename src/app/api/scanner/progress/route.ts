import { NextRequest, NextResponse } from "next/server";
import { handleScannerPost } from "@/lib/scanner-client-api";

/** Compat: clientes que chamam /api/scanner/progress */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    const { status, data } = await handleScannerPost({ ...body, action: "progress" });
    return NextResponse.json(data, { status });
  } catch (e) {
    console.error("[scanner progress]", e);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
