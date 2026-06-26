import { NextResponse } from "next/server";
import { getScannerExePath, SCANNER_EXE_FILENAME } from "@/lib/scanner-installer";
import fs from "fs";

/** Download direto do scanner (.exe único — PIN é digitado no app) */
export async function GET() {
  const exePath = getScannerExePath();
  if (!exePath) {
    return NextResponse.json({ error: "exe_not_available" }, { status: 503 });
  }

  const buffer = fs.readFileSync(exePath);
  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${SCANNER_EXE_FILENAME}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
