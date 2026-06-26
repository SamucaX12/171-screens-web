import { NextRequest, NextResponse } from "next/server";
import {
  buildScannerConfigForPin,
  handleScannerPost,
  loadPinForClient,
} from "@/lib/scanner-client-api";

export async function GET(req: NextRequest) {
  try {
    const pinRaw = req.nextUrl.searchParams.get("pin") ?? "";
    const loaded = await loadPinForClient(pinRaw);
    if (!loaded) return NextResponse.json({ error: "not found" }, { status: 404 });
    if (loaded.expired) return NextResponse.json({ error: "pin expired" }, { status: 410 });

    const config = await buildScannerConfigForPin(loaded.doc);

    return NextResponse.json({
      ok: true,
      pin: loaded.pin,
      name: loaded.doc.name ?? "",
      game: loaded.doc.game,
      status: loaded.doc.status,
      config,
    });
  } catch (e) {
    console.error("[scanner GET]", e);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    const { status, data } = await handleScannerPost(body);
    return NextResponse.json(data, { status });
  } catch (e) {
    console.error("[scanner POST]", e);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
