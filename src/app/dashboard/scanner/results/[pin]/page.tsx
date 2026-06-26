import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getScannerDb } from "@/lib/scanner-db";
import { trimScanForDisplay } from "@/lib/scanner-helpers";
import { ScanDoc } from "@/lib/scanner-types";
import { ScanResultView } from "@/components/ScanResultView";
import { ArrowLeft, Headphones } from "lucide-react";

export default async function ScannerResultDetailPage({
  params,
}: {
  params: Promise<{ pin: string }>;
}) {
  const { pin } = await params;
  const session = await getSession();
  if (!session) redirect("/login");

  const pinCode = pin.toUpperCase();
  const db = await getScannerDb();

  const pinDoc = await db.collection("pins").findOne({ pin: pinCode });
  if (!pinDoc) notFound();

  const canView =
    pinDoc.ownerId === session.id ||
    session.role === "owner" ||
    session.role === "admin";
  if (!canView) notFound();

  const scanRaw = await db
    .collection<ScanDoc>("scans")
    .find({ pin: pinCode })
    .sort({ createdAt: -1 })
    .limit(1)
    .next();

  const { scan, totals } = scanRaw ? trimScanForDisplay(scanRaw) : { scan: null, totals: null };

  return (
    <div className="min-h-full">
      <div className="border-b border-screens-border bg-screens-bg-elevated px-5 py-4 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div>
            <Link
              href="/dashboard/scanner/results"
              className="inline-flex items-center gap-1.5 text-xs text-screens-muted hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Results
            </Link>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <h1 className="font-mono text-xl font-semibold tracking-wider">{pinCode}</h1>
              <span className="text-sm text-screens-muted">
                {pinDoc.name ?? "Sem nome"} · {pinDoc.game}
              </span>
            </div>
          </div>
          <Link
            href={`/dashboard/tickets?pin=${pinCode}&type=scan`}
            className="btn-secondary text-xs"
          >
            <Headphones className="h-3.5 w-3.5" />
            Abrir ticket
          </Link>
        </div>
      </div>
      {scan ? (
        <ScanResultView scan={scan} totals={totals!} pinResult={pinDoc.result} pinCode={pinCode} />
      ) : (
        <div className="flex min-h-[50vh] flex-col items-center justify-center p-10 text-center">
          <p className="text-lg font-medium text-screens-muted">Scan ainda não recebido</p>
          <p className="mt-2 max-w-md text-sm text-screens-muted">
            O jogador precisa rodar o scanner com este pin.
          </p>
          <Link href="/dashboard/scanner/pins" className="btn-primary mt-6">
            Ver pins
          </Link>
        </div>
      )}
    </div>
  );
}
