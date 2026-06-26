import { NextResponse } from "next/server";
import { getPublicScannerConfig } from "@/lib/scanner-client-api";

/** Scanner .exe busca config global via GET /api/config */
export async function GET() {
  try {
    const config = await getPublicScannerConfig();
    return NextResponse.json(config);
  } catch (e) {
    console.error("[scanner config]", e);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
