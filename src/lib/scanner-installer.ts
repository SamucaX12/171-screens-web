import fs from "fs";
import path from "path";
import { getAppUrl } from "./auth";

export function getScannerExePath(): string | null {
  const envPath = process.env.SCANNER_EXE_PATH;
  if (envPath && fs.existsSync(envPath)) return envPath;

  const candidates = [
    path.join(process.cwd(), "public", "scanner", "171-screens.exe"),
    path.join(process.cwd(), "scanner", "171-screens.exe"),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

export function readScannerExe(): Buffer | null {
  const exePath = getScannerExePath();
  if (!exePath) return null;
  return fs.readFileSync(exePath);
}

export function buildInstallUrl(pin: string) {
  return `${getAppUrl()}/install/${pin}`;
}

export const SCANNER_EXE_FILENAME = "171-screens.exe";
