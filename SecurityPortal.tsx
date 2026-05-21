import React, { useState, useEffect } from "react";
import { Sparkles, Terminal, ShieldAlert, Cpu, ArrowRight, Check, ChevronDown, Database, Code, Globe, HelpCircle } from "lucide-react";
import { PRICING_PLANS, FAQS } from "../data";

interface LandingPageProps {
  onEnterSandbox: () => void;
  onOpenAuth: () => void;
}

export default function LandingPage({ onEnterSandbox, onOpenAuth }: LandingPageProps) {
  const [demoPrompt, setDemoPrompt] = useState("");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [typingIndex, setTypingIndex] = useState(0);
  
  const promptsList = [
    "Create a real-time food delivery app with driver live routing maps...",
    "Build a modern school management portal with grade books & fees tracking...",
    "Generate a photography portfolio page with high-performance responsive grid...",
    "Design a SaaS workflow app matching Notion and Trello combined..."
  ];

  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);

  useEffect(() => {
    let currentText = promptsList[currentPromptIndex];
    let interval = setInterval(() => {
      if (typingIndex < currentText.length) {
        setDemoPrompt((prev) => prev + currentText[typingIndex]);
        setTypingIndex((prev) => prev + 1);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setDemoPrompt("");
          setTypingIndex(0);
          setCurrentPromptIndex((prev) => (prev + 1) % promptsList.length);
        }, 3000);
      }
    }, 55);

    return () => clearInterval(interval);
  }, [typingIndex, currentPromptIndex]);

  return (
    <div className="bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 overflow-x-hidden min-h-screen flex flex-col">
      {/* Dynamic top aurora mesh */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[350px] bg-indigo-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-[450px] h-[300px] bg-purple-500/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Navigation Headers */}
      <nav id="landing-nav" className="sticky top-0 z-40 bg-slate-950/70 backdrop-blur-md border-b border-slate-900 px-6 py-4 flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl text-white font-extrabold text-lg shadow-lg shadow-indigo-500/20">
              FA
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white">Forge<span className="text-indigo-400">AI</span></span>
              <span className="ml-2 text-[10px] uppercase font-semibold text-indigo-400/90 border border-indigo-400/20 px-1.5 py-0.5 rounded bg-indigo-400/5">Beta v2.4</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features-section" className="hover:text-white transition">Capabilities</a>
            <a href="#pricing-section" className="hover:text-white transition">Plans</a>
            <a href="#faq-section" className="hover:text-white transition">FAQ</a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-white transition">
              <span>GitHub Core</span>
            </a>
          </div>

          <div className="flex gap-3.5 items-center">
            <button 
              id="login-btn"
              onClick={onOpenAuth} 
              className="text-sm font-medium text-slate-300 hover:text-white transition px-3 py-1.5"
            >
              Access Console
            </button>
            <button 
              id="start-sandbox-btn"
              onClick={onEnterSandbox} 
              className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold text-sm rounded-xl hover:opacity-95 transition shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 cursor-pointer"
            >
              Launcher Sandbox
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* HERO SECTION */}
        <section id="hero-section" className="max-w-7xl mx-auto px-6 pt-16 pb-20 text-center relative z-10">
          <div className="inline-flex gap-2 items-center px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-8 animate-pulse">
            <Sparkles className="w-4 h-4" />
            <span>Autonomous Software Forge Engine</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto mb-6 leading-none select-none">
            Generate Complete Full-Stack Platforms <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">In Seconds</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            ForgeAI is the enterprise autonomous software system. Describe any idea, and watch multiple coordinated AI agents plan architecture, design interfaces, build Express APIs, model PostgreSQL schemas, run Jest tests, and deploy live production containers instantly.
          </p>

          {/* TRY DEMO INPUT */}
          <div className="max-w-2xl mx-auto mb-16 relative">
            <div className="p-1 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-800 focus-within:from-indigo-500 focus-within:to-purple-500 transition shadow-2xl">
              <div className="flex flex-col sm:flex-row gap-2 bg-slate-900 rounded-xl p-3 items-center">
                <Terminal className="w-6 h-6 text-indigo-400 ml-2 hidden sm:block" />
                <div className="flex-1 w-full text-left ml-2 py-1">
                  <div className="text-slate-200 font-mono text-sm min-h-6 flex items-center">
                    {demoPrompt || <span className="text-slate-600">e.g., Create a school grade books platform...</span>}
                    <span className="w-1.5 h-4 bg-indigo-400 ml-1 animate-pulse" />
                  </div>
                </div>
                <button
                  id="sandbox-entry-btn"
                  onClick={onEnterSandbox}
                  className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-lg text-sm flex items-center justify-center gap-2 hover:opacity-95 transition cursor-pointer"
                >
                  <span>Forge App</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto border-y border-slate-900 py-10 my-6">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-white">100%</div>
              <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1.5">Monorepo Exportable</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-white">&lt; 40s</div>
              <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1.5">Mean Generation Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-white">8 Agents</div>
              <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1.5">Collaborating Sequentially</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-white">MultiUI</div>
              <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1.5">Web + Mobile Delivery</div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION (Bento Style) */}
        <section id="features-section" className="bg-slate-950/40 border-y border-slate-900/60 py-24 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">Enterprise Architecture Forged Automatically</h2>
              <p className="text-slate-400 text-sm">We don't do mock data. ForgeAI creates fully modular software ready to deploy, conforming to world-class DevOps pipelines.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-805/40 hover:border-indigo-505/20 transition flex flex-col justify-between">
                <div>
                  <div className="p-3 bg-indigo-500/10 rounded-xl w-fit text-indigo-400 mb-6">
                    <Code className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-white text-lg mb-2">Multi-Agent Planner</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Collaborative CrewAI and LangChain integrations. Planner Agent plans standard endpoint trees, Database Agent defines database relations, and Testing Agent creates robust suites.
                  </p>
                </div>
                <div className="mt-6 text-xs font-mono text-slate-500 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Agent orchestrator active</span>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-850/40 hover:border-indigo-510/20 transition flex flex-col justify-between">
                <div>
                  <div className="p-3 bg-purple-500/10 rounded-xl w-fit text-purple-400 mb-6">
                    <Database className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-white text-lg mb-2">Unified Prisma Mapping</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Instantly compiles rigorous schema tables structured for Postgres or MongoDB. Complete with indexes, audit logs, and automatic database migration pathways.
                  </p>
                </div>
                <div className="mt-6 text-xs font-mono text-slate-500 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Prisma models scaffolded</span>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-850/40 hover:border-indigo-510/20 transition flex flex-col justify-between">
                <div>
                  <div className="p-3 bg-pink-500/10 rounded-xl w-fit text-pink-400 mb-6">
                    <Globe className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-white text-lg mb-2">DevOps Ingress Systems</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Includes layered Dockerfiles, docker-compose models, and complete Kubernetes YAML files out-of-the-box. Configures clean Nginx routers automatically.
                  </p>
                </div>
                <div className="mt-6 text-xs font-mono text-slate-500 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Kubernetes manifests prepared</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING SECTION */}
        <section id="pricing-section" className="py-24 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4 font-sans justify-center">SaaS Billing, Tier Scales</h2>
            <p className="text-slate-400 text-sm">Deploy high-performance infrastructure without worrying about container rates or token costs. Select a plan to scale.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {PRICING_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between p-8 rounded-2xl border ${
                  plan.recommended
                    ? "bg-slate-900 border-indigo-500 shadow-2xl shadow-indigo-500/5"
                    : "bg-slate-900/50 border-slate-800"
                }`}
              >
                {plan.recommended && (
                  <span className="absolute top-0 right-8 -translate-y-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-lg">
                    Highest Value
                  </span>
                )}
                <div>
                  <h3 className="text-lg font-bold text-white mb-1.5">{plan.name}</h3>
                  <p className="text-slate-400 text-xs mb-6 line-clamp-2">{plan.description}</p>
                  <div className="flex items-baseline gap-2 mb-8">
                    <span className="text-5xl font-extrabold text-white tracking-tight">{plan.price}</span>
                    <span className="text-sm text-slate-500 font-medium">{plan.billing}</span>
                  </div>

                  <ul className="space-y-3.5 mb-8 text-sm">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex gap-3 items-start text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  id={`pricing-${plan.id}-btn`}
                  onClick={onEnterSandbox}
                  className={`w-full py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer ${
                    plan.recommended
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-95 shadow-md shadow-indigo-500/10"
                      : "bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  Start Scaffolding Now
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq-section" className="bg-slate-900/20 border-t border-slate-900/50 py-24">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-white mb-3">Answers From the Forge Engine</h2>
              <p className="text-slate-400 text-sm">Detailed architecture and delivery processes explained.</p>
            </div>

            <div className="space-y-4">
              {FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/50 border border-slate-800/80 rounded-xl overflow-hidden transition"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between text-left p-5 text-sm font-semibold text-white hover:text-indigo-400 transition"
                  >
                    <span className="flex items-center gap-2.5">
                      <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0" />
                      {faq.question}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${activeFaq === idx ? "rotate-180" : ""}`} />
                  </button>
                  {activeFaq === idx && (
                    <div className="px-5 pb-5 text-sm text-slate-400 leading-relaxed border-t border-slate-800/40 pt-4 font-medium animate-fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 bg-slate-950 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-900 rounded-lg text-indigo-400 font-extrabold text-sm">FA</div>
            <span className="text-sm text-slate-400 font-semibold tracking-tight">&copy; {new Date().getFullYear()} ForgeAI Software Systems, Inc. All rights reserved.</span>
          </div>
          <div className="flex gap-6 text-xs font-semibold text-slate-500">
            <a href="#hero-section" className="hover:text-slate-300">Terms of Cloud Services</a>
            <a href="#hero-section" className="hover:text-slate-300">Sandbox Sandbox Policy</a>
            <a href="#features-section" className="hover:text-slate-300">Vesting SLA</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
