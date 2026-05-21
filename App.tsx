import React, { useState, useEffect } from "react";
import { Cpu, Terminal, Layers, RefreshCw, Activity, Sparkles, CheckCircle2 } from "lucide-react";

export default function Observability() {
  const [latency, setLatency] = useState(140);
  const [tokensUsed, setTokensUsed] = useState(145022);
  const [errorCount, setErrorCount] = useState(0);
  const [ramUsage, setRamUsage] = useState(42.5);
  const [activeNodes, setActiveNodes] = useState(12);

  // Dynamic status logging ticker simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency((prev) => Math.max(90, Math.min(210, prev + Math.floor(Math.random() * 31) - 15)));
      setTokensUsed((prev) => prev + Math.floor(Math.random() * 12) + 2);
      setRamUsage((prev) => Math.max(38, Math.min(64, prev + parseFloat((Math.random() * 0.4 - 0.2).toFixed(2)))));
      if (Math.random() > 0.95) {
        setActiveNodes((prev) => Math.max(8, Math.min(16, prev + (Math.random() > 0.5 ? 1 : -1))));
      }
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 bg-slate-950 p-6 text-slate-100 font-sans selection:bg-indigo-500/30 overflow-y-auto min-h-[calc(100vh-64px)]">
      {/* Header telemetry info */}
      <div className="border-b border-slate-900 pb-5 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">ForgeAI telemetry dashboard</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">System Observability Core</h2>
        </div>
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
          <span className="text-xs font-semibold uppercase px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Prometheus Active
          </span>
        </div>
      </div>

      {/* Grid of vitals card indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {/* Latency meter */}
        <div className="p-5 bg-slate-900/40 border border-slate-900 rounded-xl">
          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">Prometheus SLA latency</div>
          <div className="text-3xl font-extrabold text-white tracking-tight">{latency} ms</div>
          <span className="text-[9px] font-mono text-slate-500">Node cluster ping response times</span>
        </div>

        {/* Tokens consumed tracker */}
        <div className="p-5 bg-slate-900/40 border border-slate-900 rounded-xl">
          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">SaaS API token volume</div>
          <div className="text-3xl font-extrabold text-indigo-400 tracking-tight">{tokensUsed.toLocaleString()}</div>
          <span className="text-[9px] font-mono text-slate-500">Active tokens count processed this hour</span>
        </div>

        {/* RAM tracker */}
        <div className="p-5 bg-slate-900/40 border border-slate-900 rounded-xl">
          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">Kubernetes memory usage</div>
          <div className="text-3xl font-extrabold text-white tracking-tight">{ramUsage.toFixed(1)}%</div>
          <span className="text-[9px] font-mono text-slate-500">Shared engine capacity load</span>
        </div>

        {/* Sentry exception meter */}
        <div className="p-5 bg-slate-900/40 border border-slate-900 rounded-xl">
          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">Active Docker Sandbox</div>
          <div className="text-3xl font-extrabold text-white tracking-tight">{activeNodes}</div>
          <span className="text-[9px] font-mono text-slate-500">Simultaneously orchestrating containers</span>
        </div>
      </div>

      {/* Custom High-Fidelity SVG Charts Representation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-6">
        {/* Memory cluster telemetry chart */}
        <div className="p-6 bg-slate-900/40 border border-slate-900 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold text-white tracking-wider uppercase flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-400" />
              Kubernetes Resource Distribution
            </h3>
            <span className="text-[9px] uppercase font-mono text-slate-400">Nodes 1-4 telemetry</span>
          </div>

          {/* Simple crisp responsive custom SVG bar charts */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1.5 font-medium">
                <span>Node 01 Core / scheduler-engine</span>
                <span className="text-white font-semibold">54% RAM</span>
              </div>
              <div className="h-2 bg-slate-950 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full" style={{ width: "54%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1.5 font-medium">
                <span>Node 02 Core / postgresql-primary</span>
                <span className="text-white font-semibold">72% RAM</span>
              </div>
              <div className="h-2 bg-slate-950 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full" style={{ width: "72%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1.5 font-medium">
                <span>Node 03 Core / gemini-proxy-v3</span>
                <span className="text-white font-semibold">39% RAM</span>
              </div>
              <div className="h-2 bg-slate-950 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full" style={{ width: "39%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1.5 font-medium">
                <span>Node 04 Core / sandbox-builder-master</span>
                <span className="text-white font-semibold">81% RAM</span>
              </div>
              <div className="h-2 bg-slate-950 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full" style={{ width: "81%" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Latency Over Time Grafana Line simulation */}
        <div className="p-6 bg-slate-900/40 border border-slate-900 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold text-white tracking-wider uppercase flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              API Server Response SLA (24h)
            </h3>
            <span className="text-[9px] uppercase font-mono text-slate-400">Grafana chart module</span>
          </div>

          {/* Elegant SVG Line chart that simulates actual performance stats */}
          <div className="relative h-44 border-b border-l border-slate-800/80 p-2 flex items-end">
            <svg viewBox="0 0 400 150" className="w-full h-full text-indigo-500 overflow-visible" preserveAspectRatio="none">
              <path
                d="M 0 100 Q 80 50 160 120 T 320 40 T 400 80"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="animate-pulse"
              />
              {/* Reference Grid lines */}
              <line x1="0" y1="50" x2="400" y2="50" stroke="#1e293b" strokeDasharray="3" />
              <line x1="0" y1="100" x2="400" y2="100" stroke="#1e293b" strokeDasharray="3" />
            </svg>
            <div className="absolute top-2 left-4 text-[9px] text-slate-600 font-mono">200 ms Threshold</div>
            <div className="absolute top-1/2 left-4 text-[9px] text-slate-600 font-mono">100 ms Target</div>
          </div>

          <div className="flex justify-between text-[10px] text-slate-500 font-semibold tracking-wider uppercase mt-4">
            <span>00:00 UTC</span>
            <span>06:00 UTC</span>
            <span>12:00 UTC</span>
            <span>18:00 UTC</span>
          </div>
        </div>
      </div>
    </div>
  );
}
