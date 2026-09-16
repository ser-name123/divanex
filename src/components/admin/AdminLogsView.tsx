"use client";

import { useState } from "react";
import { AdminSystemLog } from "@/data/adminData";
import {
  Terminal,
  ShieldCheck,
  RotateCcw,
  Play,
  Pause,
  CheckCircle2,
  Server,
  Download,
  Zap
} from "lucide-react";

interface AdminLogsProps {
  logs: AdminSystemLog[];
  onClearLogs?: () => void;
}

export default function AdminLogsView({ logs, onClearLogs }: AdminLogsProps) {
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [isStreaming, setIsStreaming] = useState(true);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const filteredLogs = logs.filter((log) => {
    if (levelFilter === "all") return true;
    return log.level === levelFilter;
  });

  const exportLogs = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `divanex-telemetry-logs-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setExportNotice("Exported telemetry audit archive as JSON.");
    setTimeout(() => setExportNotice(null), 3000);
  };

  return (
    <div className="space-y-6 animate-fadeIn font-mono">
      {exportNotice && (
        <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-sky-800 text-xs flex items-center gap-2 shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-sky-600" />
          <span>{exportNotice}</span>
        </div>
      )}

      {/* Top Security & Compliance HUD */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-3 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-slate-900 font-bold text-sm font-sans">Zero Security Incidents</div>
            <div className="text-slate-500 text-[10px] font-sans">SOC-2 Type II Continuous Audit</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-3 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <div className="text-slate-900 font-bold text-sm font-sans">Edge TLS 1.3 Strict</div>
            <div className="text-slate-500 text-[10px] font-sans">Cloudflare Tier-1 Ingress Anycast</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-3 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-slate-900 font-bold text-sm font-sans">PostgreSQL Row-Level Sec</div>
            <div className="text-slate-500 text-[10px] font-sans">Zero Cross-Tenant Data Leakage</div>
          </div>
        </div>
      </div>

      {/* Terminal Log Console */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden font-mono">
        {/* Terminal Header Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
            </div>
            <span className="text-xs text-slate-900 font-bold uppercase tracking-wider flex items-center gap-1.5 ml-2">
              <Terminal className="w-3.5 h-3.5 text-sky-600" />
              <span>LIVE CLUSTER TELEMETRY AUDIT</span>
            </span>
            {isStreaming && (
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-bold animate-pulse">
                STREAMING
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200">
              {["all", "info", "warn", "error"].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setLevelFilter(lvl)}
                  className={`px-2.5 py-1 rounded-lg uppercase text-[10px] font-bold transition-all ${
                    levelFilter === lvl
                      ? "bg-sky-600 text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            {/* Stream Pause / Play Toggle */}
            <button
              type="button"
              onClick={() => setIsStreaming(!isStreaming)}
              className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
              title={isStreaming ? "Pause Live Stream" : "Resume Stream"}
            >
              {isStreaming ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>

            {/* Export JSON */}
            <button
              type="button"
              onClick={exportLogs}
              className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 hover:text-sky-700 border border-slate-200"
              title="Download Logs JSON"
            >
              <Download className="w-3.5 h-3.5" />
            </button>

            {/* Clear Logs */}
            {onClearLogs && (
              <button
                type="button"
                onClick={onClearLogs}
                className="p-1.5 rounded-lg bg-white hover:bg-red-50 text-slate-500 hover:text-red-700 border border-slate-200"
                title="Purge Memory Buffer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Terminal Monospace Stream Content */}
        <div className="p-5 space-y-2 text-xs max-h-[520px] overflow-y-auto scrollbar-thin bg-slate-950 text-slate-200">
          {filteredLogs.length === 0 ? (
            <div className="text-slate-500 text-center py-10">
              [SYSTEM]: No telemetry records matching current level filter.
            </div>
          ) : (
            filteredLogs.map((log) => {
              const isError = log.level === "error";
              const isWarn = log.level === "warn";
              return (
                <div
                  key={log.id}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3 p-2 rounded-lg hover:bg-slate-900 transition-colors border-b border-white/[0.04]"
                >
                  <span className="text-slate-400 shrink-0 text-[11px]">{log.timestamp}</span>

                  <span
                    className={`px-1.5 py-0.2 rounded uppercase text-[9px] font-bold shrink-0 ${
                      isError
                        ? "bg-red-950 text-red-300 border border-red-500/40"
                        : isWarn
                        ? "bg-amber-950 text-amber-300 border border-amber-500/40"
                        : "bg-cyan-950 text-cyan-300 border border-cyan-500/30"
                    }`}
                  >
                    {log.level}
                  </span>

                  <span className="text-purple-300 shrink-0 font-bold text-[11px]">
                    [{log.service}]
                  </span>

                  <span className="flex-1 text-slate-200 leading-relaxed font-mono">{log.message}</span>

                  <div className="flex items-center gap-3 shrink-0 text-[11px] text-slate-400 font-mono">
                    {log.latencyMs !== undefined && (
                      <span
                        className={
                          log.latencyMs > 200
                            ? "text-red-400"
                            : log.latencyMs > 50
                            ? "text-amber-400"
                            : "text-emerald-400 font-bold"
                        }
                      >
                        {log.latencyMs}ms
                      </span>
                    )}
                    <span className="text-slate-500">{log.ipAddress}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
