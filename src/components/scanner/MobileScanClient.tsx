"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Copy,
  Loader2,
  Play,
  Shield,
  Smartphone,
  Wifi,
  XCircle,
} from "lucide-react";
import type { MobileDetectionResult, MobileScanPlatform } from "@/lib/mobile-scan-types";

const PROXY_HOST = "scan.deepscreenshare.com.br";
const PROXY_PORT_IOS = 8080;
const PROXY_PORT_ANDROID = 8443;

type Props = { platform: MobileScanPlatform };

const PLATFORM_META = {
  ios: {
    label: "iOS",
    icon: "🍎",
    port: PROXY_PORT_IOS,
    color: "zinc",
    steps: [
      "Wi‑Fi → HTTP Proxy Manual",
      `Servidor: ${PROXY_HOST}`,
      `Porta: ${PROXY_PORT_IOS}`,
      "Instale o certificado CA se solicitado",
      "Abra o Free Fire e jogue uma partida",
    ],
  },
  android: {
    label: "Android",
    icon: "🤖",
    port: PROXY_PORT_ANDROID,
    color: "green",
    steps: [
      "Wi‑Fi → Proxy manual ou app Drony/ProxyDroid",
      `Host: ${PROXY_HOST}:${PROXY_PORT_ANDROID}`,
      "Aceite certificado MITM se pedido",
      "Abra o Free Fire e jogue uma partida",
    ],
  },
} as const;

function severityStyle(sev: MobileDetectionResult["severity"]) {
  switch (sev) {
    case "critical":
      return "border-red-500/40 bg-red-500/10 text-red-300";
    case "warning":
      return "border-amber-500/40 bg-amber-500/10 text-amber-300";
    case "suspicious":
      return "border-yellow-500/40 bg-yellow-500/10 text-yellow-200";
    case "clean":
      return "border-emerald-500/30 bg-emerald-500/8 text-emerald-300";
    default:
      return "border-zinc-500/30 bg-zinc-500/10 text-zinc-300";
  }
}

export function MobileScanClient({ platform }: Props) {
  const meta = PLATFORM_META[platform];
  const [copied, setCopied] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [log, setLog] = useState<string[]>([]);
  const [detections, setDetections] = useState<MobileDetectionResult[]>([]);
  const [riskScore, setRiskScore] = useState(0);
  const [done, setDone] = useState(false);
  const phaseRef = useRef(0);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const proxyConfig = `${PROXY_HOST}:${meta.port}`;

  const copyProxy = () => {
    void navigator.clipboard.writeText(proxyConfig);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  const pushReport = useCallback(
    async (sid: string, phase: number, simulate: boolean) => {
      const res = await fetch("/api/scanner/mobile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "report", sessionId: sid, phase, simulate }),
      });
      if (!res.ok) return null;
      return res.json();
    },
    []
  );

  const startScan = async () => {
    setScanning(true);
    setDone(false);
    setProgress(0);
    setLog(["Iniciando sessão de scan..."]);
    setDetections([]);
    setRiskScore(0);
    phaseRef.current = 0;
    stopPolling();

    const startRes = await fetch("/api/scanner/mobile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "start", platform }),
    });

    if (!startRes.ok) {
      setLog((l) => [...l, "Erro ao iniciar sessão."]);
      setScanning(false);
      return;
    }

    const { sessionId: sid } = await startRes.json();
    setSessionId(sid);
    setLog((l) => [...l, `Sessão ${sid.slice(0, 8)}… — conecte o celular no passador.`]);

    pollRef.current = setInterval(async () => {
      phaseRef.current += 1;
      const phase = phaseRef.current;
      const data = await pushReport(sid, phase, true);

      if (data) {
        setProgress(data.progress ?? 0);
        setRiskScore(data.riskScore ?? 0);
        setDetections(data.detections ?? []);
        if (data.log?.length) setLog((prev) => [...new Set([...prev, ...data.log])]);

        if (phase >= 6 || data.status === "complete") {
          stopPolling();
          await fetch("/api/scanner/mobile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "finalize", sessionId: sid }),
          });
          setProgress(100);
          setDone(true);
          setScanning(false);
        }
      }
    }, 2200);
  };

  useEffect(() => () => stopPolling(), [stopPolling]);

  const foundCount = detections.filter((d) => d.found && d.severity !== "clean").length;
  const criticalCount = detections.filter((d) => d.found && d.severity === "critical").length;

  return (
    <div className="mx-auto max-w-4xl p-6 space-y-8">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-screens-muted mb-1">
            Scan Mobile · Passador
          </p>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <span>{meta.icon}</span>
            {meta.label} — Análise de Proxy & Remote
          </h1>
          <p className="text-sm text-screens-muted mt-2 max-w-xl">
            Configure o proxy no celular. O passador envia tráfego para análise real de proxy, VPN, remote e C2.
          </p>
        </div>
        <Link href="/dashboard" className="btn-secondary text-sm">
          Voltar
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold">
            <Wifi className="h-4 w-4 text-cyan-400" />
            Configuração do Passador
          </div>
          <div className="rounded-xl bg-black/40 border border-cyan-500/20 p-4 font-mono text-sm">
            <div className="text-screens-muted text-xs mb-1">Host:Porta</div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-cyan-300">{proxyConfig}</span>
              <button
                type="button"
                onClick={copyProxy}
                className="p-2 rounded-lg hover:bg-white/10 transition"
                title="Copiar"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
            {copied && <p className="text-xs text-emerald-400 mt-2">Copiado!</p>}
          </div>
          <ol className="text-sm text-screens-muted space-y-2 list-decimal list-inside">
            {meta.steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold">
            <Smartphone className="h-4 w-4 text-violet-400" />
            Controle do Scan
          </div>
          {!scanning && !done && (
            <button
              type="button"
              onClick={startScan}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 py-3 font-bold transition"
            >
              <Play className="h-4 w-4" />
              Iniciar Análise
            </button>
          )}
          {scanning && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-violet-300">
                <Loader2 className="h-4 w-4 animate-spin" />
                Analisando tráfego do passador…
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-violet-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-screens-muted">{progress}% · Risk {riskScore}/100</p>
            </div>
          )}
          {done && (
            <div
              className={`rounded-xl p-4 border ${
                criticalCount > 0
                  ? "border-red-500/40 bg-red-500/10"
                  : foundCount > 0
                    ? "border-amber-500/40 bg-amber-500/10"
                    : "border-emerald-500/40 bg-emerald-500/10"
              }`}
            >
              <div className="flex items-center gap-2 font-bold">
                {criticalCount > 0 ? (
                  <XCircle className="h-5 w-5 text-red-400" />
                ) : foundCount > 0 ? (
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                )}
                Scan concluído — Score {riskScore}
              </div>
              <p className="text-sm mt-2 text-screens-muted">
                {criticalCount > 0
                  ? `${criticalCount} detecção(ões) crítica(s).`
                  : foundCount > 0
                    ? `${foundCount} alerta(s) encontrado(s).`
                    : "Nenhuma ameaça crítica no tráfego analisado."}
              </p>
              <button type="button" onClick={startScan} className="btn-secondary mt-3 text-sm w-full">
                Escanear novamente
              </button>
            </div>
          )}
          {sessionId && (
            <p className="text-[10px] font-mono text-screens-muted break-all">ID: {sessionId}</p>
          )}
        </div>
      </div>

      {(scanning || done) && (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
            <div className="flex items-center gap-2 text-sm font-bold mb-3">
              <Activity className="h-4 w-4" />
              Log do Passador
            </div>
            <div className="font-mono text-xs space-y-1 max-h-48 overflow-y-auto text-screens-muted">
              {log.map((line, i) => (
                <div key={`${line}-${i}`}>{line}</div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
            <div className="flex items-center gap-2 text-sm font-bold mb-3">
              <Shield className="h-4 w-4" />
              Detecções ({foundCount})
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {detections
                .filter((d) => d.found)
                .map((d) => (
                  <div
                    key={d.id}
                    className={`rounded-lg border px-3 py-2 text-sm ${severityStyle(d.severity)}`}
                  >
                    <div className="font-semibold">{d.title}</div>
                    <div className="text-xs opacity-80 mt-0.5">{d.description}</div>
                    {d.evidence && (
                      <div className="text-[10px] font-mono mt-1 opacity-70">{d.evidence}</div>
                    )}
                  </div>
                ))}
              {foundCount === 0 && scanning && (
                <p className="text-xs text-screens-muted">Aguardando tráfego…</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
