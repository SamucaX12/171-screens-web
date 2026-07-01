import type {
  MobileDetectionResult,
  MobileScanPlatform,
  MobileTrafficReport,
} from "./mobile-scan-types";

const PROXY_TOOLS = [
  "charles", "fiddler", "proxyman", "mitmproxy", "burp", "httpcanary", "pcapdroid",
  "shadowrocket", "surge", "quantumult", "potatso", "drony", "proxydroid",
  "postern", "clash", "v2ray", "shadowsocks", "socks", "proxifier",
];

const REMOTE_APPS = [
  "teamviewer", "anydesk", "rustdesk", "parsec", "scrcpy", "vysor", "dwagent",
  "sunshine", "chrome remote", "splashtop", "ultraviewer", "supremo",
];

const C2_PROXY_HOSTS = [
  "bluestacksmsi.com", "76.13.171.238", "waitersyze.shop", "realpecinhaslol.uk",
  "hiddens.centralcart.ai", "licenseauth.cloud", "confirm_injection.php",
];

const MITM_CA = [
  "charles proxy", "fiddler", "burp suite", "proxyman", "mitmproxy", "portswigger",
];

const JB_IOS = ["cydia", "sileo", "zebra", "filza", "checkra1n", "palera1n", "dopamine", "brevet", "igamegod"];
const ROOT_ANDROID = ["magisk", "kernelsu", "supersu", "lsposed", "edxposed", "zygisk"];
const CHEAT_MOBILE = ["gameguardian", "game gem", "parallel space", "mt manager", "lucky patcher", "cheat engine"];

function hasAny(haystack: string[], needles: string[]) {
  const joined = haystack.join(" ").toLowerCase();
  return needles.some((n) => joined.includes(n));
}

function hostHit(hosts: string[], list: string[]) {
  const lower = hosts.map((h) => h.toLowerCase());
  return list.some((bad) => lower.some((h) => h.includes(bad)));
}

function isPrivateLan(host: string) {
  const h = host.toLowerCase();
  return (
    h.startsWith("192.168.") ||
    h.startsWith("10.") ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(h) ||
    h === "localhost" ||
    h === "127.0.0.1"
  );
}

function isSuspiciousProxyHost(host: string) {
  const h = host.toLowerCase().trim();
  if (!h) return false;
  if (isPrivateLan(h)) return true;
  if (h.includes("171screens") || h.includes("deepscreenshare") || h.includes("scan.")) return false;
  return PROXY_TOOLS.some((t) => h.includes(t)) || hostHit([h], C2_PROXY_HOSTS);
}

type DetectionTemplate = Omit<MobileDetectionResult, "found" | "evidence" | "score"> & {
  score: number;
};

function tpl(
  id: string,
  category: string,
  title: string,
  description: string,
  severity: MobileDetectionResult["severity"],
  score: number
): DetectionTemplate {
  return { id, category, title, description, severity, score };
}

const IOS_TEMPLATES: DetectionTemplate[] = [
  tpl("jailbreak", "SISTEMA", "Jailbreak Detectado", "Cydia, Sileo, Filza ou artefatos de jailbreak encontrados.", "critical", 35),
  tpl("mdm", "PERFIS", "Perfil MDM / CA Suspeito", "Perfil de configuração ou certificado MITM não confiável.", "critical", 30),
  tpl("gameguardian_ios", "CHEAT", "Ferramenta de Cheat iOS", "GameGem, iGameGod, Brevet ou similar detectado.", "critical", 40),
  tpl("vpn_proxy_ios", "REDE", "VPN / Proxy App Ativo", "App de proxy/VPN interceptando tráfego (Shadowrocket, Surge, etc.).", "warning", 18),
  tpl("remote_ios", "REMOTE", "Acesso Remoto Ativo", "TeamViewer, AnyDesk ou screen mirroring durante sessão.", "critical", 35),
  tpl("screen_record", "GRAVAÇÃO", "Gravação / Mirror Ativo", "ReplayKit ou espelhamento de tela ativo na partida.", "warning", 12),
  tpl("dns_poison", "REDE", "DNS Manipulation", "DNS apontando para resolver não padrão ou suspeito.", "suspicious", 15),
  tpl("proxy_http", "PROXY", "Proxy HTTP Configurado", "Proxy manual/PAC ativo — tráfego passando por interceptador.", "suspicious", 22),
  tpl("tls_mitm", "PROXY", "Interceptação TLS (MITM)", "Certificado CA de Charles/Fiddler/Burp detectado no fluxo.", "critical", 38),
  tpl("c2_proxy", "PROXY", "C2 / Proxy Remoto Conhecido", "Conexão para host de bypass/proxy remoto conhecido.", "critical", 45),
  tpl("ios_clean_net", "REDE", "Rede Direta Verificada", "Sem proxy/VPN suspeito no tráfego analisado.", "clean", 0),
  tpl("ios_clean_app", "APPS", "Assinaturas Verificadas", "Nenhum app de cheat/jailbreak no relatório.", "clean", 0),
];

const ANDROID_TEMPLATES: DetectionTemplate[] = [
  tpl("root_magisk", "ROOT", "Root / Magisk Detectado", "Magisk, KernelSU ou artefatos de root no dispositivo.", "critical", 40),
  tpl("lsposed", "ROOT", "Xposed / LSPosed", "Framework de hooking ativo no sistema.", "critical", 35),
  tpl("gameguardian", "CHEAT", "Game Guardian / Cheat Tool", "GG, Parallel Space ou ferramenta de memória detectada.", "critical", 40),
  tpl("adb_network", "DEV", "ADB over Network", "Debug USB/Wi-Fi ADB ativo — acesso remoto ao device.", "critical", 30),
  tpl("remote_android", "REMOTE", "Acesso Remoto Android", "TeamViewer, AnyDesk, scrcpy ou Vysor ativo.", "critical", 35),
  tpl("vpn_proxy_android", "REDE", "VPN / Proxy App Ativo", "Drony, ProxyDroid, Clash ou VPN de interceptação.", "warning", 18),
  tpl("sideload", "APPS", "APK Side-load Suspeito", "App instalado fora da Play Store com permissões elevadas.", "warning", 15),
  tpl("dev_options", "DEV", "Opções de Dev Habilitadas", "Developer options ativas — superfície de ataque maior.", "suspicious", 8),
  tpl("screen_mirror", "GRAVAÇÃO", "Screen Mirroring / Recording", "Espelhamento ou gravação ativa durante partida.", "warning", 12),
  tpl("proxy_http_android", "PROXY", "Proxy HTTP Configurado", "Proxy manual ativo no Wi‑Fi — passador interceptando.", "suspicious", 22),
  tpl("tls_mitm_android", "PROXY", "Interceptação TLS (MITM)", "HTTPS sendo decifrado via certificado custom.", "critical", 38),
  tpl("c2_proxy_android", "PROXY", "C2 / Proxy Remoto Conhecido", "Host remoto de bypass/C2 no tráfego do Free Fire.", "critical", 45),
  tpl("android_clean_root", "ROOT", "Sem Root Detectado", "Nenhum artefato Magisk/root no relatório.", "clean", 0),
  tpl("android_clean_net", "REDE", "Rede Direta Verificada", "Sem proxy/VPN suspeito na sessão.", "clean", 0),
];

export function getDetectionTemplates(platform: MobileScanPlatform) {
  return platform === "ios" ? IOS_TEMPLATES : ANDROID_TEMPLATES;
}

export function analyzeMobileTraffic(
  platform: MobileScanPlatform,
  report: MobileTrafficReport
): { detections: MobileDetectionResult[]; riskScore: number; log: string[] } {
  const templates = getDetectionTemplates(platform);
  const log: string[] = [];
  const found = new Map<string, MobileDetectionResult>();

  const hosts = [...(report.hosts ?? []), ...(report.sni ?? [])];
  const apps = [
    ...(report.remoteApps ?? []),
    ...(report.jailbreakApps ?? []),
    ...(report.sideloadApps ?? []),
    report.vpnApp ?? "",
  ].filter(Boolean);
  const ua = (report.userAgents ?? []).join(" ");

  function mark(id: string, evidence: string, extraScore = 0) {
    const t = templates.find((x) => x.id === id);
    if (!t) return;
    found.set(id, {
      ...t,
      found: true,
      evidence,
      score: t.score + extraScore,
    });
    log.push(`⚠ ${t.title}: ${evidence}`);
  }

  if (report.proxyEnabled || report.proxyType === "manual" || report.proxyType === "pac") {
    const host = report.proxyHost ?? "desconhecido";
    const port = report.proxyPort ? `:${report.proxyPort}` : "";
    mark(platform === "ios" ? "proxy_http" : "proxy_http_android", `Proxy ${report.proxyType ?? "manual"} → ${host}${port}`);
    if (isSuspiciousProxyHost(host)) {
      mark(platform === "ios" ? "c2_proxy" : "c2_proxy_android", `Host proxy suspeito: ${host}`, 10);
    }
  }

  if (report.pacUrl) {
    mark(platform === "ios" ? "proxy_http" : "proxy_http_android", `PAC URL: ${report.pacUrl}`);
  }

  if (report.vpnActive || report.vpnApp) {
    mark(platform === "ios" ? "vpn_proxy_ios" : "vpn_proxy_android", report.vpnApp ?? "VPN ativa");
  }

  if (report.tlsIntercept || hasAny([ua, ...hosts], MITM_CA)) {
    mark(platform === "ios" ? "tls_mitm" : "tls_mitm_android", "Certificado MITM / TLS intercept detectado");
  }

  if (hostHit(hosts, C2_PROXY_HOSTS)) {
    const hit = hosts.find((h) => C2_PROXY_HOSTS.some((c) => h.toLowerCase().includes(c)));
    mark(platform === "ios" ? "c2_proxy" : "c2_proxy_android", `Host remoto: ${hit ?? "C2 conhecido"}`);
  }

  if (hasAny(hosts, PROXY_TOOLS)) {
    mark(platform === "ios" ? "vpn_proxy_ios" : "vpn_proxy_android", `Domínio proxy no tráfego: ${hosts.find((h) => PROXY_TOOLS.some((p) => h.toLowerCase().includes(p)))}`);
  }

  if (hasAny(apps, REMOTE_APPS) || (report.remoteApps?.length ?? 0) > 0) {
    mark(platform === "ios" ? "remote_ios" : "remote_android", apps.join(", ") || report.remoteApps!.join(", "));
  }

  if (report.screenMirror || report.screenRecord) {
    mark(platform === "ios" ? "screen_record" : "screen_mirror", "Espelhamento/gravação ativo");
  }

  if (report.dnsServers?.some((d) => !["8.8.8.8", "8.8.4.4", "1.1.1.1", "1.0.0.1", "9.9.9.9"].includes(d))) {
    mark("dns_poison", `DNS: ${report.dnsServers?.join(", ")}`);
  }

  if (platform === "ios" && hasAny(apps, JB_IOS)) {
    mark("jailbreak", apps.filter((a) => JB_IOS.some((j) => a.toLowerCase().includes(j))).join(", "));
  }

  if (platform === "android" && (report.rootDetected || hasAny(apps, ROOT_ANDROID))) {
    mark("root_magisk", "Root/Magisk detectado");
    if (hasAny(apps, ["lsposed", "edxposed", "xposed"])) mark("lsposed", "Framework Xposed/LSPosed");
  }

  if (hasAny(apps, CHEAT_MOBILE)) {
    mark(platform === "ios" ? "gameguardian_ios" : "gameguardian", "Ferramenta de cheat mobile");
  }

  if (platform === "android" && report.adbOverNetwork) mark("adb_network", "ADB via rede ativo");
  if (platform === "android" && report.devOptions) mark("dev_options", "Opções de desenvolvedor ON");
  if (platform === "android" && (report.sideloadApps?.length ?? 0) > 0) {
    mark("sideload", report.sideloadApps!.join(", "));
  }

  const criticalIds = new Set(found.keys());
  const hasBadNet = criticalIds.has("proxy_http") || criticalIds.has("proxy_http_android") ||
    criticalIds.has("vpn_proxy_ios") || criticalIds.has("vpn_proxy_android") ||
    criticalIds.has("c2_proxy") || criticalIds.has("c2_proxy_android") ||
    criticalIds.has("tls_mitm") || criticalIds.has("tls_mitm_android");

  if (!hasBadNet) {
    const cleanId = platform === "ios" ? "ios_clean_net" : "android_clean_net";
    const t = templates.find((x) => x.id === cleanId)!;
    found.set(cleanId, { ...t, found: true, score: 0 });
    log.push("✓ Rede direta — sem proxy suspeito");
  }

  const hasBadApp = criticalIds.has("jailbreak") || criticalIds.has("root_magisk") ||
    criticalIds.has("gameguardian") || criticalIds.has("gameguardian_ios");
  if (!hasBadApp) {
    const cleanApp = platform === "ios" ? "ios_clean_app" : "android_clean_root";
    const t = templates.find((x) => x.id === cleanApp)!;
    found.set(cleanApp, { ...t, found: true, score: 0 });
  }

  const detections = templates.map((t) => found.get(t.id) ?? { ...t, found: false, score: 0 });
  const riskScore = Math.min(100, detections.filter((d) => d.found && d.severity !== "clean").reduce((s, d) => s + d.score, 0));

  return { detections, riskScore, log };
}

/** Simula tráfego que o passador captura quando device conecta (até passador real existir) */
export function simulatePassadorTraffic(
  platform: MobileScanPlatform,
  phase: number
): MobileTrafficReport {
  const base: MobileTrafficReport = {
    proxyEnabled: phase >= 2,
    proxyType: phase >= 2 ? "manual" : "none",
    proxyHost: phase >= 2 ? "192.168.0.114" : undefined,
    proxyPort: phase >= 2 ? 8080 : undefined,
    hosts: [],
    sni: [],
    userAgents: [],
  };

  if (phase >= 3) {
    base.hosts = ["client.freefiremobile.com", "garena.com"];
    base.sni = ["client.freefiremobile.com"];
  }
  if (phase >= 4) {
    base.vpnActive = true;
    base.vpnApp = platform === "ios" ? "Shadowrocket" : "Drony";
  }
  if (phase >= 5) {
    base.remoteApps = platform === "ios" ? ["TeamViewer"] : ["AnyDesk"];
    base.screenMirror = true;
  }
  if (phase >= 6 && platform === "android") {
    base.devOptions = true;
    base.rootDetected = false;
  }

  return base;
}
