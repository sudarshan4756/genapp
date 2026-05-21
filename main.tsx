import React, { useState } from "react";
import { ShieldCheck, Key, Lock, RefreshCw, Layers, CheckCircle, Flame, Plus, Copy } from "lucide-react";

export default function SecurityPortal() {
  const [rateLimitMode, setRateLimitMode] = useState<"standard" | "enhanced" | "paranoid">("enhanced");
  const [generatedApiKey, setGeneratedApiKey] = useState("");
  const [apiKeyCreated, setApiKeyCreated] = useState(false);
  const [apiKeysList, setApiKeysList] = useState<string[]>([]);

  const handleGenerateKey = () => {
    const key = `fa_live_${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`;
    setGeneratedApiKey(key);
    setApiKeyCreated(true);
    setApiKeysList((prev) => [...prev, key]);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Secure API Key copied to clipboard clipboard!");
  };

  const securityAudits = [
    { rule: "Helmet.js HTTP headers mapping", status: "Enabled", detail: "Hides server type technology signals & enforces CSP routes" },
    { rule: "SQL Injection & XSS Input Sanitization", status: "Secure", detail: "Cleans parameters using standard validation patterns" },
    { rule: "CORS domain whitelist configuration", status: "Active", detail: "Allows custom sandbox client operations exclusively" },
    { rule: "JWT cryptographical secrets rotation", status: "Enforced", detail: "Rotates secret keys every 15 minutes seamlessly" },
    { rule: "Workspace tenant storage isolation", status: "Isolated", detail: "Provides separate secure database parameters" }
  ];

  return (
    <div className="flex-1 bg-slate-950 p-6 text-slate-100 font-sans selection:bg-indigo-500/30 overflow-y-auto min-h-[calc(100vh-64px)]">
      {/* Header credentials audit */}
      <div className="border-b border-slate-900 pb-5 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Lock className="w-4 h-4 text-indigo-400" />
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">ForgeAI core vault</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Enterprise Security Policies</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Keys Creator & Rate Limits Throttlers (7 columns) */}
        <div className="lg:col-span-7 space-y-6">
          {/* API Key Creator */}
          <div className="p-6 bg-slate-900/40 border border-slate-900 rounded-2xl">
            <h3 className="font-semibold text-white tracking-wider flex items-center gap-2 mb-4 text-sm uppercase">
              <Key className="w-4.5 h-4.5 text-indigo-400" />
              SaaS API Credentials Creator
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Create cryptographically secure tokens. Use these keys to trigger automated monorepo generation directly from your own third-party applications.
            </p>

            <button
              id="generate-api-key-btn"
              onClick={handleGenerateKey}
              className="px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-xs rounded-xl hover:opacity-95 transition flex items-center gap-2 cursor-pointer mb-5 shadow-lg shadow-indigo-505/10"
            >
              <Plus className="w-4 h-4" />
              <span>Generate API Key</span>
            </button>

            {apiKeyCreated && (
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between gap-4 mb-5">
                <span className="text-xs font-mono text-indigo-400 break-all">{generatedApiKey}</span>
                <button
                  onClick={() => copyToClipboard(generatedApiKey)}
                  className="p-2 bg-slate-900 hover:bg-slate-800 transition text-slate-300 hover:text-white rounded-lg cursor-pointer"
                >
                  <Copy className="w-4.5 h-4.5" />
                </button>
              </div>
            )}

            {apiKeysList.length > 0 && (
              <div className="space-y-2 pt-2">
                <h4 className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Your Active Keys</h4>
                {apiKeysList.map((k, i) => (
                  <div key={i} className="flex justify-between items-center text-xs p-2.5 bg-slate-950/40 border border-slate-900 rounded-lg">
                    <span className="font-mono text-slate-400">{k.substring(0, 16)}••••••••</span>
                    <span className="text-[10px] text-emerald-400 font-semibold px-2 py-0.5 bg-emerald-500/5 rounded border border-emerald-500/10">Active</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Rate Throtlling config */}
          <div className="p-6 bg-slate-900/40 border border-slate-900 rounded-2xl">
            <h3 className="font-semibold text-white tracking-wider flex items-center gap-2 mb-4 text-sm uppercase">
              <RefreshCw className="w-4.5 h-4.5 text-purple-400 animate-spin" />
              Security Shields Throttling Rate
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Toggle API gateway defenses configurations. paranoid enforces strict multi-IP constraints to prevent scrapers or Denial of Service attacks.
            </p>

            <div className="grid grid-cols-3 gap-3.5">
              <button
                onClick={() => setRateLimitMode("standard")}
                className={`p-3 border rounded-xl flex flex-col items-center justify-center transition gap-1.5 cursor-pointer ${
                  rateLimitMode === "standard"
                    ? "bg-indigo-500/10 border-indigo-500 text-white"
                    : "bg-transparent border-slate-800 text-slate-400"
                }`}
              >
                <Layers className="w-5 h-5" />
                <span className="text-xs font-extrabold uppercase">Standard</span>
                <span className="text-[9px] text-slate-500">100 reqs / min</span>
              </button>

              <button
                onClick={() => setRateLimitMode("enhanced")}
                className={`p-3 border rounded-xl flex flex-col items-center justify-center transition gap-1.5 cursor-pointer ${
                  rateLimitMode === "enhanced"
                    ? "bg-indigo-500/10 border-indigo-500 text-white"
                    : "bg-transparent border-slate-800 text-slate-400"
                }`}
              >
                <ShieldCheck className="w-5 h-5" />
                <span className="text-xs font-extrabold uppercase">Enhanced</span>
                <span className="text-[9px] text-slate-500">30 reqs / min</span>
              </button>

              <button
                onClick={() => setRateLimitMode("paranoid")}
                className={`p-3 border rounded-xl flex flex-col items-center justify-center transition gap-1.5 cursor-pointer ${
                  rateLimitMode === "paranoid"
                    ? "bg-indigo-500/10 border-indigo-500 text-white"
                    : "bg-transparent border-slate-800 text-slate-400"
                }`}
              >
                <Flame className="w-5 h-5" />
                <span className="text-xs font-extrabold uppercase">Paranoid</span>
                <span className="text-[9px] text-slate-400">10 reqs / min</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Compliance Checklist & Audit records (5 columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-slate-900/40 border border-slate-900 rounded-2xl h-full">
            <h3 className="font-semibold text-white tracking-wider flex items-center gap-2 mb-5 text-sm uppercase">
              <ShieldCheck className="w-4.5 h-4.5 text-emerald-400" />
              SaaS Shield Compliance Checklist
            </h3>

            <div className="space-y-4">
              {securityAudits.map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-950/40 border border-slate-900 rounded-xl relative">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-white tracking-wide">{item.rule}</span>
                    <span className="text-[9px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-extrabold uppercase px-1.5 py-0.5 rounded">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
