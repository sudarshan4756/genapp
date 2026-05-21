import React, { useState } from "react";
import { X, Mail, Lock, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import { UserSession } from "../types";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (session: UserSession) => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [tab, setTab] = useState<"login" | "register" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (tab === "forgot") {
      setTimeout(() => {
        setIsLoading(false);
        setTab("login");
        alert("A simulated secure OTP password reset token has been dispatched to your email!");
      }, 1000);
      return;
    }

    if (!email) {
      setError("Please fill in email.");
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      setIsLoading(false);
      const guestSession: UserSession = {
        email: email,
        role: email.includes("admin") ? "ADMIN" : "DEVELOPER",
        token: `mock-jwt-token-rotating-${Math.random().toString(36).substring(7)}`,
        isActive: true
      };
      onSuccess(guestSession);
      onClose();
    }, 1200);
  };

  const loginWithGoogle = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const googleSession: UserSession = {
        email: "sudarshaniitp4756@gmail.com", // Authenticated user's email from metadata
        role: "ADMIN",
        token: "google-oauth-stateful-rotating-jwt",
        isActive: true
      };
      onSuccess(googleSession);
      onClose();
    }, 1000);
  };

  return (
    <div id="auth-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm transition-all duration-300">
      <div className="relative w-full max-w-md overflow-hidden bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl">
        {/* Glow Effects */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="p-6 pb-4 border-b border-slate-800/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg text-white font-bold text-sm">
              FA
            </div>
            <div>
              <h3 className="font-semibold text-white tracking-tight">ForgeAI Secure Guard</h3>
              <p className="text-xs text-slate-400">Enterprise auth system verification</p>
            </div>
          </div>
          <button 
            id="close-auth-btn"
            onClick={onClose} 
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6">
          {tab !== "forgot" && (
            <button
              id="google-oauth-btn"
              onClick={loginWithGoogle}
              className="w-full flex items-center justify-center gap-3 px-4 py-2.5 mb-6 text-sm font-medium text-slate-200 bg-slate-800/50 border border-slate-700/80 rounded-xl hover:bg-slate-800 hover:text-white hover:border-slate-600 transition"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.87-2.6-2.87-4.53-6.16-4.53z"
                />
                <path
                  fill="#currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Authenticate with Google Account</span>
            </button>
          )}

          {tab !== "forgot" && (
            <div className="relative flex py-2 items-center mb-6">
              <div className="flex-grow border-t border-slate-800"></div>
              <span className="flex-shrink mx-4 text-xs font-medium text-slate-500 uppercase tracking-widest">Or credentials</span>
              <div className="flex-grow border-t border-slate-800"></div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === "register" && (
              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5">Developer name</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Wozniak or Lovelace"
                    className="w-full px-4 py-2.5 pl-10 text-sm text-slate-200 bg-slate-950 border border-slate-800 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
                  />
                  <Sparkles className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5">Email address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-4 py-2.5 pl-10 text-sm text-slate-200 bg-slate-950 border border-slate-800 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
                />
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              </div>
            </div>

            {tab !== "forgot" && (
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider">Password</label>
                  {tab === "login" && (
                    <button
                      type="button"
                      onClick={() => setTab("forgot")}
                      className="text-xs text-indigo-400 hover:text-indigo-300 transition"
                    >
                      Forgot keys?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 pl-10 text-sm text-slate-200 bg-slate-950 border border-slate-800 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
                  />
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                </div>
              </div>
            )}

            {error && (
              <p className="text-xs text-rose-400 bg-rose-500/5 border border-rose-500/10 p-2.5 rounded-lg">
                ⚠️ {error}
              </p>
            )}

            <button
              id="auth-submit-btn"
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl text-sm font-semibold hover:opacity-95 transition disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>
                    {tab === "login" ? "Verify Session Key" : tab === "register" ? "Generate Tenant Core" : "Send Reset OTP"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer controls */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex justify-center text-xs text-slate-400 gap-1.5">
            <span>
              {tab === "login" ? "New to the Forge environment?" : "Already verified?"}
            </span>
            <button
              onClick={() => {
                setError("");
                setTab(tab === "login" ? "register" : "login");
              }}
              className="text-indigo-400 hover:text-indigo-300 font-medium transition"
            >
              {tab === "login" ? "Register Workspace" : "Access Console"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
