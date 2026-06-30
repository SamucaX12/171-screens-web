import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getScannerDb } from "@/lib/scanner-db";
import {
  analyzeMobileTraffic,
  simulatePassadorTraffic,
} from "@/lib/mobile-scan-detector";
import type { MobileScanPlatform, MobileTrafficReport } from "@/lib/mobile-scan-types";
import { randomBytes } from "crypto";

const COLLECTION = "mobile_scan_sessions";
const SESSION_TTL_MS = 30 * 60 * 1000;

function newSessionId() {
  return randomBytes(12).toString("hex");
}

function mergeReports(a: MobileTrafficReport, b: MobileTrafficReport): MobileTrafficReport {
  const uniq = (arr?: string[]) => [...new Set([...(arr ?? [])])];
  return {
    ...a,
    ...b,
    hosts: uniq([...(a.hosts ?? []), ...(b.hosts ?? [])]),
    sni: uniq([...(a.sni ?? []), ...(b.sni ?? [])]),
    userAgents: uniq([...(a.userAgents ?? []), ...(b.userAgents ?? [])]),
    remoteApps: uniq([...(a.remoteApps ?? []), ...(b.remoteApps ?? [])]),
    jailbreakApps: uniq([...(a.jailbreakApps ?? []), ...(b.jailbreakApps ?? [])]),
    sideloadApps: uniq([...(a.sideloadApps ?? []), ...(b.sideloadApps ?? [])]),
    dnsServers: uniq([...(a.dnsServers ?? []), ...(b.dnsServers ?? [])]),
  };
}

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sessionId = req.nextUrl.searchParams.get("sessionId");
  if (!sessionId) return NextResponse.json({ error: "sessionId required" }, { status: 400 });

  const db = await getScannerDb();
  const doc = await db.collection(COLLECTION).findOne({ sessionId, ownerId: session.id });
  if (!doc) return NextResponse.json({ error: "Session not found" }, { status: 404 });

  return NextResponse.json({
    sessionId: doc.sessionId,
    platform: doc.platform,
    status: doc.status,
    progress: doc.progress,
    riskScore: doc.riskScore,
    log: doc.log,
    detections: doc.detections,
  });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const action = body.action as string;
  const db = await getScannerDb();
  const col = db.collection(COLLECTION);

  if (action === "start") {
    const platform = body.platform as MobileScanPlatform;
    if (platform !== "ios" && platform !== "android") {
      return NextResponse.json({ error: "Invalid platform" }, { status: 400 });
    }

    const sessionId = newSessionId();
    const now = new Date();
    await col.insertOne({
      sessionId,
      platform,
      ownerId: session.id,
      status: "scanning",
      progress: 0,
      riskScore: 0,
      log: ["Sessão iniciada — aguardando tráfego do passador..."],
      detections: [],
      report: {},
      phase: 0,
      createdAt: now,
      updatedAt: now,
      expiresAt: new Date(now.getTime() + SESSION_TTL_MS),
    });

    return NextResponse.json({ sessionId, status: "scanning" });
  }

  if (action === "report") {
    const { sessionId, report, phase, simulate } = body as {
      sessionId: string;
      report?: MobileTrafficReport;
      phase?: number;
      simulate?: boolean;
    };

    const doc = await col.findOne({ sessionId, ownerId: session.id });
    if (!doc) return NextResponse.json({ error: "Session not found" }, { status: 404 });

    const platform = doc.platform as MobileScanPlatform;
    let incoming = report ?? {};

    if (simulate && typeof phase === "number") {
      incoming = mergeReports(incoming, simulatePassadorTraffic(platform, phase));
    }

    const merged = mergeReports((doc.report as MobileTrafficReport) ?? {}, incoming);
    const { detections, riskScore, log } = analyzeMobileTraffic(platform, merged);
    const progress = Math.min(100, typeof phase === "number" ? phase * 16 : doc.progress + 10);
    const status = progress >= 96 ? "complete" : "scanning";

    await col.updateOne(
      { sessionId },
      {
        $set: {
          report: merged,
          detections,
          riskScore,
          log: [...new Set([...(doc.log as string[]), ...log])],
          progress,
          status,
          phase: phase ?? doc.phase,
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({ progress, status, riskScore, detections, log });
  }

  if (action === "finalize") {
    const { sessionId } = body;
    const doc = await col.findOne({ sessionId, ownerId: session.id });
    if (!doc) return NextResponse.json({ error: "Session not found" }, { status: 404 });

    const platform = doc.platform as MobileScanPlatform;
    const report = (doc.report as MobileTrafficReport) ?? {};
    const { detections, riskScore, log } = analyzeMobileTraffic(platform, report);

    await col.updateOne(
      { sessionId },
      {
        $set: {
          status: "complete",
          progress: 100,
          detections,
          riskScore,
          log: [...new Set([...(doc.log as string[]), ...log, "Scan finalizado."])],
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({ status: "complete", progress: 100, riskScore, detections });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
