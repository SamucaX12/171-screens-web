import {
  DetectionItem,
  PinDoc,
  PinResult,
  ScanDoc,
  ScannerPlan,
} from "./scanner-types";
import {
  getEnterpriseByOwnerId,
  getGlobalConfig,
  getProConfig,
  planFeatures,
} from "./scanner-helpers";

const CRITICAL_SEVERITY = /critical|cheat|high|severe|danger/i;

export function computePinResult(scan: Partial<ScanDoc>): PinResult {
  const detections = scan.detections ?? [];
  const warnings = scan.warnings ?? [];
  const suspicious = scan.suspicious ?? [];

  const hasCritical = detections.some((d) => CRITICAL_SEVERITY.test(d.severity ?? ""));
  if (hasCritical || detections.length >= 3) return "cheating";
  if (detections.length > 0) return "cheating";
  if (suspicious.length > 0) return "suspicious";
  if (warnings.length > 0) return "warning";
  return "clean";
}

export async function buildScannerConfigForPin(pinDoc: PinDoc) {
  const ownerId = pinDoc.ownerId;
  const enterpriseId = pinDoc.enterpriseId;

  let global = await getGlobalConfig(enterpriseId);
  let plan: ScannerPlan = "pro";
  let features = planFeatures("pro");

  if (enterpriseId) {
    const ent = await getEnterpriseByOwnerId(enterpriseId);
    if (ent) {
      plan = ent.plan;
      features = ent.features;
      if (ent.config) {
        global = {
          ...global,
          ...ent.config,
          scannerName: ent.config.scannerName || ent.name || global.scannerName,
          customPatterns: ent.config.customPatterns ?? global.customPatterns,
        };
      }
    }
  } else {
    const pro = await getProConfig(ownerId);
    if (pro.strings?.length || pro.customDetect?.length || pro.scannerName) {
      global = {
        ...global,
        scannerName: pro.scannerName ?? global.scannerName,
        primaryColor: pro.primaryColor ?? global.primaryColor,
        spinnerColor1: pro.spinnerColor1 ?? global.spinnerColor1,
        spinnerColor2: pro.spinnerColor2 ?? global.spinnerColor2,
        spinnerColor3: pro.spinnerColor3 ?? global.spinnerColor3,
        logoUrl: pro.logoUrl ?? global.logoUrl,
        loadingPhrases: pro.loadingPhrases ?? global.loadingPhrases,
        publicStrings: [
          ...(global.publicStrings ?? []),
          ...(pro.strings ?? []),
        ],
        publicCustomDetect: [
          ...(global.publicCustomDetect ?? []),
          ...(pro.customDetect ?? []),
        ],
      };
    }
  }

  const patterns = [
    ...(global.customPatterns ?? []),
    ...(global.publicStrings ?? []),
    ...(global.publicCustomDetect ?? []),
    ...(pinDoc.userPatterns ?? []),
  ];

  return {
    plan,
    features,
    scannerName: global.scannerName,
    primaryColor: global.primaryColor,
    spinnerColor1: global.spinnerColor1,
    spinnerColor2: global.spinnerColor2,
    spinnerColor3: global.spinnerColor3,
    logoUrl: global.logoUrl ?? "",
    loadingPhrases: global.loadingPhrases ?? [],
    customPatterns: patterns,
    publicStrings: global.publicStrings ?? [],
    publicCustomDetect: global.publicCustomDetect ?? [],
  };
}

export function normalizeScanPayload(
  body: Record<string, unknown>,
  pin: string,
  ownerId: string
): Omit<ScanDoc, "_id"> {
  const list = (key: string) => {
    const val = body[key];
    return Array.isArray(val) ? val : [];
  };

  const detections = list("detections") as DetectionItem[];

  return {
    pin,
    ownerId,
    isRumDump: Boolean(body.isRumDump),
    screenshotUrl: body.screenshotUrl ? String(body.screenshotUrl).slice(0, 2000) : undefined,
    systemInfo:
      body.systemInfo && typeof body.systemInfo === "object"
        ? (body.systemInfo as Record<string, string>)
        : undefined,
    discordInfo: body.discordInfo as ScanDoc["discordInfo"],
    steamList: list("steamList") as ScanDoc["steamList"],
    detections,
    warnings: list("warnings") as DetectionItem[],
    suspicious: list("suspicious") as DetectionItem[],
    integrity: list("integrity") as DetectionItem[],
    bamList: list("bamList"),
    bypassList: list("bypassList"),
    powershellHistory: list("powershellHistory"),
    recordingSoftware: list("recordingSoftware"),
    prefetchList: list("prefetchList"),
    processList: list("processList"),
    unsignedList: list("unsignedList"),
    adminLogs: list("adminLogs"),
    executedFilesList: list("executedFilesList"),
    browserList: list("browserList"),
    defenderList: list("defenderList"),
    regeditList: list("regeditList"),
    modsList: list("modsList") as ScanDoc["modsList"],
    pcaClientlist: list("pcaClientlist"),
    usbList: list("usbList"),
    streamModeDetected: Boolean(body.streamModeDetected),
    createdAt: new Date(),
  };
}

export function isPinExpired(pinDoc: PinDoc): boolean {
  return !!(pinDoc.expiresAt && new Date(pinDoc.expiresAt) < new Date());
}

export async function loadPinForClient(pinRaw: string) {
  const pin = pinRaw.trim().toUpperCase();
  if (!pin || pin.length < 4) return null;
  const { getScannerDb } = await import("./scanner-db");
  const db = await getScannerDb();
  const doc = await db.collection<PinDoc>("pins").findOne({ pin });
  if (!doc || doc.disabled) return null;
  if (isPinExpired(doc)) return { expired: true as const, pin, doc };
  return { expired: false as const, pin, doc };
}

export async function handlePinAuth(body: Record<string, unknown>) {
  const pinRaw = String(body.pin ?? "");
  const loaded = await loadPinForClient(pinRaw);
  if (!loaded) return { status: 404, data: { error: "not found" } };
  if (loaded.expired) return { status: 403, data: { error: "pin expired" } };

  const { pin, doc } = loaded;
  if (doc.status === "finished" || doc.status === "expired") {
    return { status: 403, data: { error: "pin closed" } };
  }

  const config = await buildScannerConfigForPin(doc);
  const { getScannerDb } = await import("./scanner-db");
  const db = await getScannerDb();

  await db.collection("pins").updateOne(
    { pin },
    {
      $set: {
        status: "scanning",
        used: true,
        scanningStartedAt: doc.scanningStartedAt ?? new Date(),
        progress: 0,
        scanMessage: "PIN validado — iniciando scan...",
      },
    }
  );

  return {
    status: 200,
    data: {
      ok: true,
      pin,
      scannerName: config.scannerName,
      primaryColor: config.primaryColor,
      spinnerColor1: config.spinnerColor1,
      spinnerColor2: config.spinnerColor2,
      spinnerColor3: config.spinnerColor3,
      logoUrl: config.logoUrl,
      userPatterns: doc.userPatterns ?? [],
      customPatterns: config.customPatterns,
    },
  };
}

export async function getPublicScannerConfig() {
  const global = await getGlobalConfig();
  return {
    scannerName: global.scannerName,
    primaryColor: global.primaryColor,
    spinnerColor1: global.spinnerColor1,
    spinnerColor2: global.spinnerColor2,
    spinnerColor3: global.spinnerColor3,
    logoUrl: global.logoUrl ?? "",
    customPatterns: [
      ...(global.customPatterns ?? []),
      ...(global.publicStrings ?? []),
      ...(global.publicCustomDetect ?? []),
    ],
  };
}

export async function handleScannerPost(body: Record<string, unknown>) {
  const pinRaw = String(body.pin ?? "");
  const loaded = await loadPinForClient(pinRaw);
  if (!loaded) return { status: 404, data: { error: "not found" } };
  if (loaded.expired) return { status: 410, data: { error: "pin expired" } };

  const { pin, doc } = loaded;
  const { getScannerDb } = await import("./scanner-db");
  const db = await getScannerDb();

  if (doc.status === "finished" || doc.status === "expired") {
    return { status: 403, data: { error: "pin closed" } };
  }

  const action = String(body.action ?? "").toLowerCase();

  if (action === "start" || body.start === true) {
    await db.collection("pins").updateOne(
      { pin },
      {
        $set: {
          status: "scanning",
          used: true,
          scanningStartedAt: doc.scanningStartedAt ?? new Date(),
          progress: 0,
          scanMessage: "Iniciando scan...",
        },
      }
    );
    return { status: 200, data: { ok: true, status: "scanning" } };
  }

  const hasProgress =
    body.progress !== undefined && body.progress !== null && !body.detections;
  if (action === "progress" || hasProgress) {
    const progress = Math.min(100, Math.max(0, Number(body.progress ?? 0)));
    const message = String(body.message ?? body.scanMessage ?? "").slice(0, 120);

    await db.collection("pins").updateOne(
      { pin },
      {
        $set: {
          status: "scanning",
          used: true,
          progress,
          scanMessage: message || doc.scanMessage || "Escaneando...",
          scanningStartedAt: doc.scanningStartedAt ?? new Date(),
        },
      }
    );

    return { status: 200, data: { ok: true, progress } };
  }

  const scan = normalizeScanPayload(body, pin, doc.ownerId);
  const result = computePinResult(scan);
  const now = new Date();

  await db.collection<ScanDoc>("scans").insertOne(scan);
  await db.collection("pins").updateOne(
    { pin },
    {
      $set: {
        status: "finished",
        used: true,
        result,
        progress: 100,
        scanMessage: "Scan concluído",
        finishedAt: now,
        scanningStartedAt: doc.scanningStartedAt ?? now,
      },
    }
  );

  return { status: 200, data: { ok: true, result, pin } };
}
