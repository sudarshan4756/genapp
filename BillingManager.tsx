import React, { useState, useEffect, useRef } from "react";
import { 
  Sparkles, Terminal, Play, Folder, FileCode, CheckCircle2, AlertCircle, 
  Smartphone, Monitor, Download, Github, RefreshCw, Layers, ShieldCheck, 
  Database, UserCheck, Cpu, Send, CheckCircle, Flame, Eye, ExternalLink, QrCode
} from "lucide-react";
import JSZip from "jszip";
import { GeneratedAppSchema } from "../types";
import { MODEL_CONFIGS, MOCK_LOGS } from "../data";

interface WorkspaceProps {
  onBackToLanding: () => void;
  userEmail: string;
}

export default function Workspace({ onBackToLanding, userEmail }: WorkspaceProps) {
  const [prompt, setPrompt] = useState("");
  const [selectedModel, setSelectedModel] = useState("gemini-3.5-flash");
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState<"idle" | "planning" | "database" | "frontend" | "backend" | "security" | "testing" | "deploying" | "complete">("idle");
  const [generationOutput, setGenerationOutput] = useState<GeneratedAppSchema | null>(null);
  
  // Sidebar/Tab Controls
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<"code" | "schema" | "apis" | "docker">("code");
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"web" | "mobile">("web");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [visibleLogsCount, setVisibleLogsCount] = useState(0);

  // Active agents states
  const agentsList = [
    { id: "planner", name: "Planner", desc: "Monorepo Architect", step: "planning", icon: Layers, color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
    { id: "db", name: "Database", desc: "Data Engineer", step: "database", icon: Database, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
    { id: "frontend", name: "Frontend", desc: "React Developer", step: "frontend", icon: FileCode, color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
    { id: "backend", name: "Backend", desc: "API Integrator", step: "backend", icon: Cpu, color: "text-pink-400 bg-pink-500/10 border-pink-500/20" },
    { id: "security", name: "Security", desc: "WAF Auditor", step: "security", icon: ShieldCheck, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    { id: "qa", name: "QA Tester", desc: "Jest Evaluator", step: "testing", icon: CheckCircle2, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
    { id: "devops", name: "DevOps", desc: "Docker Deployer", step: "deploying", icon: Terminal, color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" }
  ];

  // Helper template loads on mount or buttons click
  const selectQuickTemplate = (presetPrompt: string) => {
    setPrompt(presetPrompt);
  };

  const handleTriggerGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setTerminalLogs([]);
    setVisibleLogsCount(0);
    setGenerationOutput(null);
    setCurrentStep("planning");

    // Initiate simulated log updates
    let logCounter = 0;
    const logInterval = setInterval(() => {
      if (logCounter < MOCK_LOGS.length) {
        const item = MOCK_LOGS[logCounter];
        setTerminalLogs((prev) => [...prev, `[${item.time}] [${item.agent}] ${item.message}`]);
        logCounter++;
      } else {
        clearInterval(logInterval);
      }
    }, 400);

    // Dynamic timeline transitions
    const steps: Array<typeof currentStep> = [
      "planning", "database", "frontend", "backend", "security", "testing", "deploying", "complete"
    ];
    let stepIdx = 0;
    const stepInterval = setInterval(() => {
      if (stepIdx < steps.length - 1) {
        stepIdx++;
        setCurrentStep(steps[stepIdx]);
      } else {
        clearInterval(stepInterval);
      }
    }, 1800);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, model: selectedModel })
      });
      const resData = await response.json();
      
      if (resData.success) {
        setGenerationOutput(resData.data);
      } else {
        throw new Error(resData.error || "Generation query failed");
      }
    } catch (e: any) {
      console.error(e);
      setTerminalLogs((prev) => [...prev, `[ERROR] [Platform] Failover activated. Error details: ${e.message}`]);
    } finally {
      // Ensure all sequences complete
      setTimeout(() => {
        setIsGenerating(false);
        setCurrentStep("complete");
      }, 1000 * 8);
    }
  };

  // Automatically start with default view on template trigger
  useEffect(() => {
    // Scaffold default portfolio template to preview landing immediately
    setPrompt("Create a custom photographer portfolio system");
  }, []);

  const downloadProjectZip = async () => {
    if (!generationOutput) return;
    try {
      const zip = new JSZip();
      
      // Determine app name file slug safely
      const appFolderName = (generationOutput.appName || "forge-app").toLowerCase().replace(/\s+/g, "-");

      // 1. Root documentation README file
      const readmeContent = `# ${generationOutput.appName}
      
${generationOutput.description}

### Tech Stack / Key Platforms Selected
${generationOutput.techStack.map(tech => `- ${tech}`).join("\n")}

### Autonomous Scaffold Modules
${generationOutput.modules.map(mod => `* **${mod.name}**: ${mod.description}\n  * Key Files: ${mod.keyFiles.join(", ")}`).join("\n")}

---
Generated autonomously via ForgeAI Platform Core on ${new Date().toLocaleDateString()}.
`;
      zip.file("README.md", readmeContent);

      // 2. Database schemas setup
      zip.file("prisma/schema.prisma", generationOutput.dbSchema);

      // 3. API route outlines structures
      zip.file("docs/API_ROUTES.md", generationOutput.apiStructure);

      // 4. Docker orchestrator compose files
      zip.file("docker-compose.yml", generationOutput.dockerConfig);

      // 5. Codefiles with native multi-folder structure preservation
      generationOutput.sampleCode.forEach((scaffoldFile) => {
        // Clean any double points or path traversal security escapes
        const safePath = scaffoldFile.path.replace(/^\/+/, "");
        zip.file(safePath, scaffoldFile.code);
      });

      // Compress and build binary download package stream
      const zipBlob = await zip.generateAsync({ type: "blob" });
      const downloadUrl = URL.createObjectURL(zipBlob);
      
      const tempLink = document.createElement("a");
      tempLink.href = downloadUrl;
      tempLink.download = `${appFolderName}-sources.zip`;
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      URL.revokeObjectURL(downloadUrl);
    } catch (e) {
      console.error(e);
      alert("Folder ZIP packing compilation failed, please retry.");
    }
  };

  return (
    <div className="flex-1 bg-slate-950 font-sans text-slate-200 flex flex-col p-6 min-h-[calc(100vh-64px)] overflow-y-auto">
      {/* Top Console Command Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-900 pb-5 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">ForgeAI Autonomous Workspace</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Code Generation Studio</h2>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex gap-2">
            <button 
              id="preset-food-btn"
              onClick={() => selectQuickTemplate("Build a premium food delivery dashboard")}
              className="px-3 py-1.5 bg-slate-900/60 border border-slate-800 text-xs text-slate-300 rounded-lg hover:border-slate-700 hover:text-white transition"
            >
              Food Delivery Dashboard
            </button>
            <button 
              id="preset-school-btn"
              onClick={() => selectQuickTemplate("Build a school records administrator")}
              className="px-3 py-1.5 bg-slate-900/60 border border-slate-800 text-xs text-slate-300 rounded-lg hover:border-slate-700 hover:text-white transition"
            >
              School Admin App
            </button>
            <button 
              id="preset-portfolio-btn"
              onClick={() => selectQuickTemplate("Create a custom photographer portfolio system")}
              className="px-3 py-1.5 bg-slate-900/60 border border-slate-800 text-xs text-slate-300 rounded-lg hover:border-slate-700 hover:text-white transition"
            >
              Portfolio Page
            </button>
          </div>
          <button 
            id="back-btn"
            onClick={onBackToLanding}
            className="px-4 py-1.5 bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 transition text-sm font-semibold"
          >
            Exit Workspace
          </button>
        </div>
      </div>

      {/* Workspace split columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Prompt Input + Orchestration (4 columns) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Prompter Config Box */}
          <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-6 relative overflow-hidden backdrop-blur-md">
            <h3 className="font-semibold text-white mb-3 text-sm flex items-center gap-2">
              <Terminal className="w-4 h-4 text-indigo-400" />
              Describe Your Application Platform
            </h3>

            <textarea
              id="generation-prompt-input"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Build a fully integrated real-estate marketplace with payment logs..."
              rows={4}
              className="w-full bg-slate-950 border border-slate-800/80 rounded-xl p-3.5 text-sm font-medium text-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none resize-none transition"
              disabled={isGenerating}
            />

            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mt-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Model:</span>
                <select
                  id="model-selector"
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="bg-slate-950 border border-slate-850 px-2.5 py-1.5 text-xs text-slate-300 rounded-lg focus:border-indigo-400 outline-none font-medium"
                  disabled={isGenerating}
                >
                  {MODEL_CONFIGS.map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </div>

              <button
                id="generation-trigger-btn"
                onClick={handleTriggerGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-sm rounded-xl hover:opacity-95 transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 cursor-pointer disabled:opacity-40"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Forging Components...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    <span>Compile & Build</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* ACTIVE MULTI-AGENT ORCHESTRATION TIMELINE */}
          <div className="bg-slate-900/40 border border-slate-905 rounded-2xl p-6 relative backdrop-blur-md">
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-900/70">
              <h3 className="font-semibold text-white text-sm flex items-center gap-2">
                <Cpu className="w-4 h-4 text-purple-400" />
                Active Agent Orchestration Nodes
              </h3>
              {isGenerating && (
                <span className="inline-flex gap-1.5 items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/15 text-indigo-400 border border-indigo-500/10 animate-pulse">
                  <span>● Active Engine</span>
                </span>
              )}
            </div>

            <div className="space-y-3.5">
              {agentsList.map((agent) => {
                const AgentIcon = agent.icon;
                const isCurrent = currentStep === agent.step;
                const stepsList = ["planning", "database", "frontend", "backend", "security", "testing", "deploying", "complete"];
                const isPassed = stepsList.indexOf(currentStep) > stepsList.indexOf(agent.step) || currentStep === "complete";

                return (
                  <div
                    key={agent.id}
                    className={`flex items-center justify-between p-3.5 rounded-xl border transition ${
                      isCurrent 
                        ? "bg-slate-900 border-indigo-505/50 shadow-inner" 
                        : isPassed 
                        ? "bg-slate-900/20 border-slate-900" 
                        : "bg-transparent border-slate-900/30 opacity-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${agent.color}`}>
                        <AgentIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-white tracking-wide">{agent.name} Agent</h4>
                        <p className="text-[10px] text-slate-500">{agent.desc}</p>
                      </div>
                    </div>

                    <div className="text-xs">
                      {isCurrent ? (
                        <div className="flex items-center gap-1.5 text-indigo-400 font-bold">
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span className="text-[10px] tracking-wider uppercase">Active</span>
                        </div>
                      ) : isPassed ? (
                        <div className="flex items-center gap-1 text-emerald-400 font-bold">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span className="text-[10px] tracking-wider uppercase text-emerald-500">Fixed & Green</span>
                        </div>
                      ) : (
                        <span className="text-[10px] text-slate-600 font-medium uppercase tracking-wider">Standby</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Code Output + Emulator Live Device Preview (7 columns) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Split layout: 7 cols for editor, 5 cols for Live Browser/iPhone preview */}
            <div className="md:col-span-12 lg:col-span-7 bg-slate-900/40 border border-slate-900 rounded-2xl overflow-hidden flex flex-col justify-between max-h-[85vh] min-h-[500px]">
              {/* Workspace Navigation Header tabs */}
              <div className="bg-slate-950/60 p-3.5 border-b border-slate-900 flex justify-between items-center flex-wrap gap-2">
                <div className="flex gap-1">
                  <button
                    id="code-explorer-tab"
                    onClick={() => setActiveWorkspaceTab("code")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                      activeWorkspaceTab === "code" 
                        ? "bg-slate-900 text-white" 
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <FileCode className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Front Files</span>
                  </button>
                  <button
                    id="db-schema-tab"
                    onClick={() => setActiveWorkspaceTab("schema")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                      activeWorkspaceTab === "schema" 
                        ? "bg-slate-900 text-white" 
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Database className="w-3.5 h-3.5 text-amber-500" />
                    <span>Prisma models</span>
                  </button>
                  <button
                    id="api-tab"
                    onClick={() => setActiveWorkspaceTab("apis")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                      activeWorkspaceTab === "apis" 
                        ? "bg-slate-900 text-white" 
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5 text-purple-400" />
                    <span>API routes</span>
                  </button>
                </div>

                {generationOutput && (
                  <button
                    id="download-code-zip-btn"
                    onClick={downloadProjectZip}
                    className="px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/20 transition rounded text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3 h-3" />
                    <span>ZIP Export</span>
                  </button>
                )}
              </div>

              {/* Sub directory files toggle list */}
              {activeWorkspaceTab === "code" && generationOutput?.sampleCode && (
                <div className="bg-slate-950/20 px-4 py-2 border-b border-slate-900 flex gap-2 overflow-x-auto">
                  {generationOutput.sampleCode.map((f, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedFileIndex(index)}
                      className={`text-[10px] font-mono px-2.5 py-1 rounded transition border shrink-0 ${
                        selectedFileIndex === index
                          ? "bg-indigo-505/10 text-indigo-400 border-indigo-505/20 font-bold"
                          : "bg-slate-950/40 text-slate-500 border-transparent hover:text-slate-300"
                      }`}
                    >
                      {f.path}
                    </button>
                  ))}
                </div>
              )}

              {/* ACTIVE TAB EDITOR PANEL */}
              <div className="flex-1 p-5 bg-slate-950/80 overflow-y-auto max-h-[60vh] min-h-[350px] font-mono text-xs text-slate-300 relative">
                {!generationOutput && !isGenerating && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 p-6 text-center">
                    <Layers className="w-10 h-10 mb-3 text-slate-700 animate-pulse" />
                    <p className="text-sm font-semibold mb-1">Source Code Explorer Stack</p>
                    <p className="text-[10px] max-w-sm">Enter prompt and click 'Compile & Build' to trigger Gemini orchestrations.</p>
                  </div>
                )}

                {isGenerating && (!generationOutput || generationOutput.sampleCode.length === 0) && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-indigo-400 bg-slate-950/90 max-w-full p-6 text-center">
                    <RefreshCw className="w-8 h-8 mb-4 animate-spin text-indigo-500" />
                    <p className="text-sm font-semibold mb-1">Synthesizing platform structure...</p>
                    <p className="text-[10px] text-slate-500 font-mono">Running AST evaluations. Orchestrating Multi-Agents pipeline.</p>
                  </div>
                )}

                {/* File Contents display */}
                {generationOutput && (
                  <>
                    {activeWorkspaceTab === "code" && generationOutput.sampleCode?.[selectedFileIndex] && (
                      <pre className="whitespace-pre-wrap selection:bg-indigo-500/20 text-[11px] leading-relaxed select-text">
                        <code>{generationOutput.sampleCode[selectedFileIndex].code}</code>
                      </pre>
                    )}
                    {activeWorkspaceTab === "schema" && (
                      <pre className="whitespace-pre-wrap text-[11px] leading-relaxed selection:bg-amber-500/20 select-text">
                        <code>{generationOutput.dbSchema}</code>
                      </pre>
                    )}
                    {activeWorkspaceTab === "apis" && (
                      <pre className="whitespace-pre-wrap text-[11px] leading-relaxed selection:bg-purple-500/20 select-text">
                        <code>{generationOutput.apiStructure}</code>
                      </pre>
                    )}
                  </>
                )}
              </div>

              {/* DYNAMIC LOGS TERMINAL footer */}
              <div className="border-t border-slate-900 bg-slate-950 h-32 p-3 font-mono text-[10px] text-slate-500 overflow-y-auto flex flex-col gap-1">
                <div className="flex items-center justify-between border-b border-slate-900 pb-1 mb-1 font-bold tracking-wider text-slate-400 text-[9px] uppercase">
                  <span>Terminal Dev logs</span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                    Container Status: Live
                  </span>
                </div>
                {terminalLogs.length === 0 ? (
                  <span className="text-slate-700 italic">No console audits logged in this session...</span>
                ) : (
                  terminalLogs.map((log, i) => (
                    <div key={i} className={log.includes("ERROR") ? "text-rose-400" : log.includes("success") || log.includes("passed") ? "text-emerald-400" : "text-slate-400"}>
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* INTEGRATED VIRTUAL SIMULATOR VIEW (5 columns) */}
            <div className="md:col-span-12 lg:col-span-5 flex flex-col h-full bg-slate-900/40 border border-slate-900 rounded-2xl overflow-hidden min-h-[500px]">
              <div className="bg-slate-950/60 p-4 border-b border-slate-900 flex justify-between items-center flex-wrap gap-2">
                <h3 className="text-xs font-bold text-white tracking-wider flex items-center gap-2">
                  <Monitor className="w-3.5 h-3.5 text-indigo-400" />
                  Live Preview Sandbox
                </h3>
                <div className="flex bg-slate-950 border border-slate-800 p-0.5 rounded-lg">
                  <button
                    id="simulator-web-btn"
                    onClick={() => setViewMode("web")}
                    className={`px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1 transition ${
                      viewMode === "web" 
                        ? "bg-slate-800 text-white shadow-sm" 
                        : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    <Monitor className="w-3 h-3" />
                    <span>Web</span>
                  </button>
                  <button
                    id="simulator-mobile-btn"
                    onClick={() => setViewMode("mobile")}
                    className={`px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1 transition ${
                      viewMode === "mobile" 
                        ? "bg-slate-800 text-white shadow-sm" 
                        : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    <Smartphone className="w-3 h-3" />
                    <span>Mobile App</span>
                  </button>
                </div>
              </div>

              {/* REAL PREVIEW CONTENT FRAME */}
              <div className="flex-1 bg-slate-950 p-4 flex items-center justify-center min-h-[350px]">
                {viewMode === "mobile" ? (
                  /* SIMULATOR SMARTPHONE FRAME */
                  <div className="relative w-64 h-[440px] bg-slate-900 border-[8px] border-slate-800 rounded-[32px] shadow-2xl flex flex-col justify-between overflow-hidden">
                    {/* Camera Island */}
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-800 rounded-lg z-20 flex justify-center items-center">
                      <div className="w-2 h-2 bg-slate-950 rounded-full" />
                    </div>

                    {/* Integrated Dynamic Demo View inside device */}
                    <div className="flex-1 bg-slate-950 overflow-y-auto pt-6 text-slate-100 flex flex-col justify-between p-4 font-sans leading-relaxed">
                      {generationOutput ? (
                        <div className="text-left space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="font-extrabold text-xs text-white bg-indigo-500/15 px-2 py-0.5 rounded uppercase">{generationOutput.appName.substring(0,8)}</span>
                            <span className="text-[8px] text-emerald-400">● Live</span>
                          </div>

                          <h4 className="text-sm font-bold text-white tracking-tight">{generationOutput.appName}</h4>
                          <p className="text-[10px] text-slate-400 leading-snug">{generationOutput.description.substring(0, 100)}...</p>

                          <div className="space-y-2.5 pt-2">
                            <h5 className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Dynamic App Modules</h5>
                            {generationOutput.modules.map((m, i) => (
                              <div key={i} className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg">
                                <h6 className="text-[10px] font-bold text-white mb-0.5">{m.name}</h6>
                                <p className="text-[9px] text-slate-400 leading-snug">{m.description.substring(0, 50)}...</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-500 gap-3">
                          <Smartphone className="w-8 h-8 text-slate-700 animate-bounce" />
                          <div>
                            <p className="text-[11px] font-bold text-slate-400">Mobile Simulator</p>
                            <p className="text-[9px] text-slate-600">Pending app compilation build output.</p>
                          </div>
                        </div>
                      )}

                      {/* Device Footer */}
                      <div className="pt-3 border-t border-slate-900 flex justify-around text-[9px] text-slate-500 font-semibold uppercase tracking-wider">
                        <span>Home</span>
                        <span>API Data</span>
                        <span>Settings</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* SIMULATOR FULL WIDTH WEB BROWSER SCREEN */
                  <div className="w-full h-[400px] bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col shadow-xl">
                    {/* Browser Address Bar header */}
                    <div className="bg-slate-950 p-2 border-b border-slate-900 flex gap-2 items-center">
                      <div className="flex gap-1.5 ml-1">
                        <span className="w-2.5 h-2.5 bg-rose-500/30 rounded-full" />
                        <span className="w-2.5 h-2.5 bg-amber-500/30 rounded-full" />
                        <span className="w-2.5 h-2.5 bg-emerald-500/30 rounded-full" />
                      </div>
                      <div className="flex-1 bg-slate-900 text-[9px] text-slate-400 px-3.5 py-1 rounded-md font-mono flex items-center gap-1.5 truncate">
                        <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                        <span>https://dev-preview-forge-ai-applet-host.run</span>
                      </div>
                    </div>

                    {/* Web browser Content Area */}
                    <div className="flex-1 bg-slate-950 overflow-y-auto p-5 text-slate-200 text-left font-sans flex flex-col justify-between">
                      {generationOutput ? (
                        <>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-slate-900 pb-3">
                              <div className="flex items-center gap-2">
                                <span className="p-1 px-1.5 bg-gradient-to-br from-indigo-500 to-purple-500 rounded text-[9px] text-white font-extrabold">FA</span>
                                <h4 className="font-extrabold text-xs text-white tracking-wider">{generationOutput.appName}</h4>
                              </div>
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[8px] font-bold bg-emerald-500/10 text-emerald-400">
                                <span>● Live SSL production</span>
                              </span>
                            </div>

                            <div className="py-2">
                              <h5 className="text-[11px] font-bold text-white mb-1">Architecture Overview</h5>
                              <p className="text-[10px] text-slate-400 leading-relaxed mb-4">{generationOutput.description}</p>
                              
                              <h5 className="text-[9px] uppercase font-bold text-slate-500 tracking-wider mb-2">Integrated Technology Stack</h5>
                              <div className="flex flex-wrap gap-1.5">
                                {generationOutput.techStack.map((t, index) => (
                                  <span key={index} className="text-[9px] bg-slate-900 border border-slate-850 px-2 py-0.5 rounded text-slate-300 font-medium">{t}</span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-slate-900 text-[9px] text-slate-600 text-center uppercase tracking-widest font-semibold">
                            Generated Autonomously via Cloud Services
                          </div>
                        </>
                      ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-500 gap-3.5">
                          <Monitor className="w-10 h-10 text-slate-800 animate-pulse" />
                          <div>
                            <p className="text-xs font-bold text-slate-400">Desktop Web Simulator</p>
                            <p className="text-[10px] text-slate-600">Pending app compilation build output.</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* APK, GitHub integration, QR Code delivery container (SaaS packaging Step 17) */}
              {generationOutput && (
                <div className="bg-slate-950 p-4 border-t border-slate-900 flex justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                    <QrCode className="w-8 h-8 text-slate-400 shrink-0" />
                    <div className="text-left">
                      <p className="text-[10px] font-bold text-white uppercase tracking-wider">Mobile QR Generator</p>
                      <p className="text-[9px] text-slate-500">Scan layout map to open simulated client preview.</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 transition border border-slate-800 rounded-lg text-[10px] font-extrabold flex items-center gap-1"
                    >
                      <Github className="w-3.5 h-3.5 text-white" />
                      <span>GitHub</span>
                    </a>
                    <button
                      id="export-zip-btn"
                      onClick={downloadProjectZip}
                      className="px-3 py-1.5 bg-indigo-505/10 border border-indigo-505/20 text-indigo-400 hover:bg-indigo-505/20 hover:text-white transition rounded-lg text-[10px] font-extrabold flex items-center gap-1 cursor-pointer"
                    >
                      <Layers className="w-3.5 h-3.5 text-indigo-400" />
                      <span>APK ZIP</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
