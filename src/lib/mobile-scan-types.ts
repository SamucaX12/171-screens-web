export type MobileScanPlatform = "ios" | "android";
export type MobileScanSeverity = "critical" | "warning" | "suspicious" | "clean";

export type MobileTrafficReport = {
  proxyEnabled?: boolean;
  proxyType?: "manual" | "pac" | "auto" | "none";
  proxyHost?: string;
  proxyPort?: number;
  vpnActive?: boolean;
  vpnApp?: string;
  remoteApps?: string[];
  screenMirror?: boolean;
  screenRecord?: boolean;
  dnsServers?: string[];
  devOptions?: boolean;
  rootDetected?: boolean;
  jailbreakApps?: string[];
  sideloadApps?: string[];
  hosts?: string[];
  sni?: string[];
  userAgents?: string[];
  tlsIntercept?: boolean;
  adbOverNetwork?: boolean;
  pacUrl?: string;
};

export type MobileDetectionResult = {
  id: string;
  category: string;
  title: string;
  description: string;
  severity: MobileScanSeverity;
  found: boolean;
  evidence?: string;
  score: number;
};

export type MobileScanSession = {
  sessionId: string;
  platform: MobileScanPlatform;
  ownerId: string;
  status: "idle" | "scanning" | "complete";
  progress: number;
  riskScore: number;
  log: string[];
  detections: MobileDetectionResult[];
  report?: MobileTrafficReport;
  createdAt: Date;
  updatedAt: Date;
};
