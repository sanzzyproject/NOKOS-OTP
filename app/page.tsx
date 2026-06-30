"use client";

import { useState, useEffect } from "react";
import { RefreshCw, Phone, KeyRound, AlertCircle } from "lucide-react";

interface ApiState {
  data: any;
  loading: boolean;
  error: string | null;
}

export default function Dashboard() {
  const [numbersState, setNumbersState] = useState<ApiState>({ data: null, loading: true, error: null });
  const [otpsState, setOtpsState] = useState<ApiState>({ data: null, loading: true, error: null });

  const fetchNumbers = async (isInitial = false) => {
    if (!isInitial) {
      setNumbersState((prev) => ({ ...prev, loading: true, error: null }));
    }
    try {
      const res = await fetch("/api/gacha/numbers");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch numbers");
      setNumbersState({ data, loading: false, error: null });
    } catch (err: any) {
      setNumbersState({ data: null, loading: false, error: err.message });
    }
  };

  const fetchOtps = async (isInitial = false) => {
    if (!isInitial) {
      setOtpsState((prev) => ({ ...prev, loading: true, error: null }));
    }
    try {
      const res = await fetch("/api/gacha/otps?limit=20");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch OTPs");
      setOtpsState({ data, loading: false, error: null });
    } catch (err: any) {
      setOtpsState({ data: null, loading: false, error: err.message });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchNumbers(true);
      fetchOtps(true);
    }, 0);
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      <aside className="w-64 bg-slate-900 hidden md:flex flex-col border-r border-slate-800 shrink-0">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-white">G</div>
            <h1 className="text-xl font-bold tracking-tight text-white">GachaPortal</h1>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <div className="px-4 py-2 bg-slate-800 text-white rounded-md text-sm font-medium cursor-pointer">Dashboard</div>
          <div className="px-4 py-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded-md text-sm font-medium cursor-pointer transition-colors">Available Numbers</div>
          <div className="px-4 py-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded-md text-sm font-medium cursor-pointer transition-colors">OTP Logs</div>
          <div className="px-4 py-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded-md text-sm font-medium cursor-pointer transition-colors">Usage Reports</div>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center space-x-2 text-xs text-slate-500 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>API Status: Operational</span>
          </div>
          <div className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">v2.4.0-stable</div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shadow-sm shrink-0">
          <h2 className="text-lg font-semibold text-slate-700">Control Panel Overview</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                fetchNumbers();
                fetchOtps();
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Refresh All</span>
            </button>
            <div className="text-right hidden sm:block">
              <p className="text-xs text-slate-500 leading-none">Last Updated</p>
              <p className="text-sm font-medium text-slate-700">Just now</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-200"></div>
          </div>
        </header>

        <section className="p-4 md:p-8 flex-1 flex flex-col gap-8 overflow-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 shrink-0">
            <div className="bg-white p-4 md:p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-2">Total Numbers</h3>
              <p className="text-xl md:text-3xl font-bold text-slate-900">1,284</p>
              <p className="text-[10px] md:text-xs text-emerald-600 font-semibold mt-1">+12% from last hour</p>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-2">OTP Volume</h3>
              <p className="text-xl md:text-3xl font-bold text-slate-900">42,091</p>
              <p className="text-[10px] md:text-xs text-slate-400 mt-1 italic">Across all active zones</p>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-2">Request Latency</h3>
              <p className="text-xl md:text-3xl font-bold text-slate-900">124ms</p>
              <p className="text-[10px] md:text-xs text-amber-500 font-semibold mt-1">Peak period active</p>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-2">Active Users</h3>
              <p className="text-xl md:text-3xl font-bold text-slate-900">182</p>
              <p className="text-[10px] md:text-xs text-slate-400 mt-1 italic">Concurrent connections</p>
            </div>
          </div>

          <div className="flex-1 flex flex-col md:flex-row gap-8 min-h-[500px]">
            <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center shrink-0">
                <h4 className="font-bold text-slate-800 text-sm uppercase flex items-center gap-2">
                  <div className="p-1.5 bg-blue-50 text-blue-600 rounded">
                    <Phone className="w-4 h-4" />
                  </div>
                  Active Numbers Pool
                </h4>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono bg-blue-50 text-blue-600 px-2 py-1 rounded hidden sm:inline-block">GET /numbers</span>
                  <button onClick={() => fetchNumbers()} disabled={numbersState.loading} className="text-slate-400 hover:text-slate-700 disabled:opacity-50">
                    <RefreshCw className={`w-4 h-4 ${numbersState.loading ? "animate-spin" : ""}`} />
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-auto bg-slate-50">
                {numbersState.loading && !numbersState.data ? (
                  <div className="h-full flex items-center justify-center text-slate-400 text-sm">Loading numbers...</div>
                ) : numbersState.error ? (
                  <div className="m-4 p-4 rounded-xl bg-rose-50 text-rose-600 flex gap-3 text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <p>{numbersState.error}</p>
                  </div>
                ) : (
                  <pre className="p-4 text-[11px] md:text-xs font-mono text-slate-700 whitespace-pre-wrap break-all">
                    {JSON.stringify(numbersState.data, null, 2)}
                  </pre>
                )}
              </div>
            </div>

            <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center shrink-0">
                <h4 className="font-bold text-slate-800 text-sm uppercase flex items-center gap-2">
                  <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  Recent OTP Ingress
                </h4>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono bg-emerald-50 text-emerald-600 px-2 py-1 rounded hidden sm:inline-block">GET /otps?limit=20</span>
                  <button onClick={() => fetchOtps()} disabled={otpsState.loading} className="text-slate-400 hover:text-slate-700 disabled:opacity-50">
                    <RefreshCw className={`w-4 h-4 ${otpsState.loading ? "animate-spin" : ""}`} />
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-auto bg-slate-50">
                {otpsState.loading && !otpsState.data ? (
                  <div className="h-full flex items-center justify-center text-slate-400 text-sm">Loading OTPs...</div>
                ) : otpsState.error ? (
                  <div className="m-4 p-4 rounded-xl bg-rose-50 text-rose-600 flex gap-3 text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <p>{otpsState.error}</p>
                  </div>
                ) : (
                  <pre className="p-4 text-[11px] md:text-xs font-mono text-slate-700 whitespace-pre-wrap break-all">
                    {JSON.stringify(otpsState.data, null, 2)}
                  </pre>
                )}
              </div>
            </div>
          </div>
        </section>

        <footer className="h-12 bg-slate-50 border-t border-slate-200 flex items-center justify-between px-8 shrink-0 hidden md:flex">
          <p className="text-[11px] text-slate-400">Endpoint: https://allapiproject.zone.id/api/gacha</p>
          <div className="flex items-center space-x-4">
            <span className="text-[11px] text-slate-400">Powered by Axios & Next.js App Router</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
