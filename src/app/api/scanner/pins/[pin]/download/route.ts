import { NextRequest, NextResponse } from "next/server";
import { getScannerExePath, SCANNER_EXE_FILENAME } from "@/lib/scanner-installer";
import { getScannerDb } from "@/lib/scanner-db";
import type { PinDoc } from "@/lib/scanner-types";
import fs from "fs";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ pin: string }> }
) {
  const { pin: pinRaw } = await params;
  const pin = pinRaw.toUpperCase();

  const db = await getScannerDb();
  const doc = await db.collection<PinDoc>("pins").findOne({ pin });
  if (!doc) return NextResponse.json({ error: "pin_not_found" }, { status: 404 });

  if (doc.expiresAt && new Date(doc.expiresAt) < new Date()) {
    return NextResponse.json({ error: "pin_expired" }, { status: 410 });
  }

  const exePath = getScannerExePath();
  if (!exePath) {
    return NextResponse.json({ error: "exe_not_available" }, { status: 503 });
  }

  const buffer = fs.readFileSync(exePath);
  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${SCANNER_EXE_FILENAME}"`,
      "Cache-Control": "no-store",
    },
  });
}
