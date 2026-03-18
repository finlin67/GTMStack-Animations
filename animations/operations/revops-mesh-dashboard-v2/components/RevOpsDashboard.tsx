import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Network, 
  Search, 
  RefreshCw, 
  ScrollText, 
  Bell, 
  Settings, 
  HelpCircle, 
  LayoutGrid, 
  CloudCheck, 
  Database, 
  Megaphone, 
  CloudFog, 
  CreditCard, 
  BrainCircuit, 
  Download, 
  ShieldCheck, 
  Route, 
  Zap,
  ArrowLeftRight,
  Server
} from 'lucide-react';

export default function RevOpsDashboard() {
  const [stats, setStats] = useState({
    ingest: 18402110,
    dedupe: 99.82,
    activeRoutes: 142008,
    anomalies: 1240,
    salesforceCount: 842001,
    hubspotCount: 1.2,
    inflow: 4.2,
    outflow: 2.8,
    stripeAmount: 4.2
  });

  // Organic jitter effect for numbers
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        ingest: prev.ingest + Math.floor(Math.random() * 50),
        activeRoutes: prev.activeRoutes + (Math.random() > 0.5 ? 1 : -1),
        anomalies: Math.max(0, prev.anomalies + (Math.random() > 0.7 ? 1 : 0)),
        inflow: +(prev.inflow + (Math.random() * 0.1 - 0.05)).toFixed(1),
        outflow: +(prev.outflow + (Math.random() * 0.1 - 0.05)).toFixed(1),
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="flex flex-col w-full h-full bg-[#0f111a] text-slate-100 font-sans overflow-hidden">
      {/* Header */}
      <header className="flex flex-col border-b border-white/10 bg-[#0f111a]/50 backdrop-blur-md z-30">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-[#5a5cf2] flex items-center justify-center text-white shadow-lg shadow-[#5a5cf2]/20">
                <Network className="text-xl w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-white text-sm font-bold leading-none tracking-tight uppercase">RevOps Mesh</h1>
              </div>
            </div>
            <div className="h-6 w-px bg-white/10 hidden md:block"></div>
            <div className="relative w-64 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-[18px] h-[18px]" />
              <input 
                className="w-full bg-white/[0.03] border border-white/10 rounded-lg pl-10 pr-4 py-1.5 text-xs text-slate-300 focus:ring-[#5a5cf2] focus:border-[#5a5cf2] placeholder:text-slate-600 transition-all outline-none" 
                placeholder="Search pipelines..." 
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-1.5 p-1 bg-white/5 rounded-xl border border-white/10">
              <button className="size-8 flex items-center justify-center rounded-lg bg-[#5a5cf2] text-white" title="Syncs">
                <ArrowLeftRight className="w-[18px] h-[18px]" />
              </button>
              <button className="size-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors" title="Logs">
                <ScrollText className="w-[18px] h-[18px]" />
              </button>
              <button className="size-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors" title="Alerts">
                <Bell className="w-[18px] h-[18px]" />
              </button>
              <button className="size-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors" title="Settings">
                <Settings className="w-[18px] h-[18px]" />
              </button>
            </nav>
            <div className="h-6 w-px bg-white/10"></div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full mr-2">
                <div className="size-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-emerald-500 text-[9px] font-bold tracking-widest uppercase">Operational</span>
              </div>
              <button className="size-8 flex items-center justify-center rounded-lg bg-white/[0.03] border border-white/10 text-slate-400 hover:text-white transition-colors">
                <HelpCircle className="w-[18px] h-[18px]" />
              </button>
              <button className="size-8 flex items-center justify-center rounded-lg bg-white/[0.03] border border-white/10 text-slate-400 hover:text-white transition-colors">
                <LayoutGrid className="w-[18px] h-[18px]" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between px-6 py-1.5 bg-white/[0.02] border-t border-white/[0.05]">
          <div className="flex items-center gap-4 text-[10px] text-slate-500 font-medium">
            <span className="uppercase tracking-widest">Storage</span>
            <div className="flex items-center gap-3">
              <div className="h-1 w-32 bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  className="bg-[#5a5cf2] h-full shadow-[0_0_8px_rgba(90,92,242,0.5)]"
                  initial={{ width: "0%" }}
                  animate={{ width: "64.2%" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                ></motion.div>
              </div>
              <span className="text-slate-400 font-mono">64.2GB / 100GB</span>
            </div>
            <div className="h-3 w-px bg-white/10"></div>
            <div className="flex items-center gap-1">
              <CloudCheck className="w-[12px] h-[12px] text-emerald-500/60" />
              <span className="text-slate-400">Cloud Node: US-East-1</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div 
                className="size-5 rounded-full bg-slate-800 bg-cover bg-center border border-white/10" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB_FHw4Ey8u7_BAU-zrneGWJXxTpNPIxzZPMGpuTPAR4nW1rc3taibTZ6Ye7PEWIEuewpZoet8T2RBJdYY1HlNGQSGVXiTcqdG1kRevl425b0pQEdi8FMzqgxzpC_Bx6vjsnPWYqXKJcgdTy4nH__Dh2uS9orSPJyWf4gAdrltVFX6d5yY_kg84dIjdmuwKDwS74rjqcZnFyKcbvHONXxCPzD6bJvMK9PowGjIOHrsVigzUOVTp1Zp2kJqxAkKZOTmAAJfs9heuVQ')" }}
              ></div>
              <p className="text-[10px] font-bold text-slate-300">Alex Rivera</p>
              <span className="px-1.5 py-0.5 rounded bg-[#5a5cf2]/10 text-[#5a5cf2] text-[8px] font-bold uppercase tracking-tighter">Admin</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto custom-scrollbar bg-[#0f111a]/20 relative">
        <div className="max-w-7xl mx-auto py-8 px-6 flex flex-col items-center">
          
          {/* Top Cards */}
          <div className="flex justify-center gap-4 mb-2 w-full max-w-2xl">
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-white/[0.03] backdrop-blur-md border border-white/10 p-3 rounded-lg flex-1 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400">
                  <Database className="w-4 h-4" />
                </div>
                <span className="text-[8px] text-sky-400 font-bold px-1.5 py-0.5 rounded bg-sky-400/10 tracking-widest uppercase">Active</span>
              </div>
              <h3 className="text-white text-[11px] font-bold">Salesforce CRM</h3>
              <div className="flex items-baseline justify-between mt-1">
                <div className="font-mono text-base text-white">{formatNumber(stats.salesforceCount)}</div>
                <p className="text-slate-500 text-[9px]">2m ago</p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-white/[0.03] backdrop-blur-md border border-white/10 p-3 rounded-lg flex-1 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Megaphone className="w-4 h-4" />
                </div>
                <span className="text-[8px] text-emerald-400 font-bold px-1.5 py-0.5 rounded bg-emerald-400/10 tracking-widest uppercase">Syncing</span>
              </div>
              <h3 className="text-white text-[11px] font-bold">HubSpot MAP</h3>
              <div className="flex items-baseline justify-between mt-1">
                <div className="font-mono text-base text-white">{stats.hubspotCount}M</div>
                <p className="text-slate-500 text-[9px]">Live stream</p>
              </div>
            </motion.div>
          </div>

          {/* Top Connector SVG */}
          <div className="h-12 w-full flex justify-center">
            <svg className="h-full w-full max-w-[500px]" viewBox="0 0 400 48">
              <motion.path 
                d="M 100 0 V 24 Q 100 48 200 48" 
                fill="none" 
                stroke="rgba(90, 92, 242, 0.3)" 
                strokeDasharray="4" 
                strokeWidth="1.5"
                animate={{ strokeDashoffset: [0, -8] }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />
              <motion.path 
                d="M 300 0 V 24 Q 300 48 200 48" 
                fill="none" 
                stroke="rgba(90, 92, 242, 0.3)" 
                strokeDasharray="4" 
                strokeWidth="1.5"
                animate={{ strokeDashoffset: [0, -8] }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />
            </svg>
          </div>

          {/* Warehouse Hub */}
          <div className="relative flex flex-col items-center py-2">
            <div className="bg-[radial-gradient(circle_at_center,_#5a5cf2_0%,_#111118_100%)] shadow-[0_0_60px_rgba(90,92,242,0.4)] size-32 rounded-full flex flex-col items-center justify-center border-4 border-white/5 relative z-10">
              <motion.div 
                className="absolute inset-0 rounded-full border border-[#5a5cf2]/50"
                animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              ></motion.div>
              <Server className="w-8 h-8 text-white mb-1" />
              <span className="text-white text-sm font-bold tracking-tight">Warehouse</span>
              <span className="text-white/70 text-[8px] font-mono mt-0.5 px-1 py-0.5 bg-white/10 rounded tracking-tighter uppercase">Central_Mesh</span>
            </div>
            <div className="mt-4 flex gap-6 z-10">
              <div className="flex flex-col items-center">
                <span className="text-slate-400 text-[8px] uppercase font-bold tracking-widest">Inflow</span>
                <span className="text-white font-mono text-xs">{stats.inflow}k/s</span>
              </div>
              <div className="w-px h-6 bg-white/10"></div>
              <div className="flex flex-col items-center">
                <span className="text-slate-400 text-[8px] uppercase font-bold tracking-widest">Outflow</span>
                <span className="text-white font-mono text-xs">{stats.outflow}k/s</span>
              </div>
            </div>
          </div>

          {/* Bottom Connector SVG */}
          <div className="h-12 w-full flex justify-center">
            <svg className="h-full w-full max-w-[500px]" viewBox="0 0 400 48">
              <motion.path 
                d="M 200 0 Q 200 0 200 24 V 48" 
                fill="none" 
                stroke="rgba(90, 92, 242, 0.3)" 
                strokeDasharray="4" 
                strokeWidth="1.5"
                animate={{ strokeDashoffset: [0, -8] }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />
              <motion.path 
                d="M 200 24 Q 100 24 100 48" 
                fill="none" 
                stroke="rgba(90, 92, 242, 0.3)" 
                strokeDasharray="4" 
                strokeWidth="1.5"
                animate={{ strokeDashoffset: [0, -8] }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />
              <motion.path 
                d="M 200 24 Q 300 24 300 48" 
                fill="none" 
                stroke="rgba(90, 92, 242, 0.3)" 
                strokeDasharray="4" 
                strokeWidth="1.5"
                animate={{ strokeDashoffset: [0, -8] }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />
            </svg>
          </div>

          {/* Bottom Cards */}
          <div className="flex justify-center gap-4 mb-6 w-full max-w-2xl">
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-white/[0.03] backdrop-blur-md border border-white/10 p-3 rounded-lg flex-1 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-1.5 rounded-lg bg-fuchsia-500/10 text-fuchsia-400">
                  <CreditCard className="w-4 h-4" />
                </div>
                <span className="text-[8px] text-fuchsia-400 font-bold px-1.5 py-0.5 rounded bg-fuchsia-400/10 tracking-widest uppercase">Active</span>
              </div>
              <h3 className="text-white text-[11px] font-bold">Stripe Billing</h3>
              <div className="flex items-baseline justify-between mt-1">
                <div className="font-mono text-base text-white">${stats.stripeAmount}M</div>
                <p className="text-slate-500 text-[9px]">12 Pending</p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-[#5a5cf2]/5 backdrop-blur-md border border-[#5a5cf2]/20 p-3 rounded-lg flex-1 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="p-1.5 rounded-lg bg-[#5a5cf2]/20 text-[#5a5cf2]">
                  <BrainCircuit className="w-4 h-4" />
                </div>
                <span className="text-[8px] text-[#5a5cf2] font-bold px-1.5 py-0.5 rounded bg-[#5a5cf2]/20 tracking-widest uppercase">Processing</span>
              </div>
              <h3 className="text-white text-[11px] font-bold">ML Insights</h3>
              <div className="flex items-baseline justify-between mt-1">
                <div className="font-mono text-base text-white">428 Nodes</div>
                <p className="text-slate-500 text-[9px]">Growth triggers</p>
              </div>
            </motion.div>
          </div>

          {/* Stats Bar */}
          <section className="w-full mt-4 flex justify-center">
            <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 p-2 rounded-xl w-full grid grid-cols-4 gap-1">
              <div className="flex flex-col p-3 border-r border-white/[0.05] last:border-0">
                <div className="flex items-center gap-2 mb-1">
                  <Download className="text-sky-400 w-3.5 h-3.5" />
                  <span className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">Ingest / 24h</span>
                </div>
                <div className="flex items-end gap-2">
                  <h4 className="text-lg font-mono text-white font-bold leading-none">{formatNumber(stats.ingest)}</h4>
                  <span className="text-sky-400 text-[9px] font-bold">+12.4%</span>
                </div>
              </div>
              
              <div className="flex flex-col p-3 border-r border-white/[0.05] last:border-0">
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="text-emerald-400 w-3.5 h-3.5" />
                  <span className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">Dedupe Rate</span>
                </div>
                <div className="flex items-end gap-2">
                  <h4 className="text-lg font-mono text-white font-bold leading-none">{stats.dedupe}%</h4>
                  <span className="text-emerald-400 text-[9px] font-bold tracking-tighter uppercase">Stable</span>
                </div>
              </div>

              <div className="flex flex-col p-3 border-r border-white/[0.05] last:border-0">
                <div className="flex items-center gap-2 mb-1">
                  <Route className="text-[#5a5cf2] w-3.5 h-3.5" />
                  <span className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">Active Routes</span>
                </div>
                <div className="flex items-end gap-2">
                  <h4 className="text-lg font-mono text-white font-bold leading-none">{formatNumber(stats.activeRoutes)}</h4>
                  <span className="text-[#5a5cf2] text-[9px] font-bold tracking-tighter uppercase">Live</span>
                </div>
              </div>

              <div className="flex flex-col p-3 last:border-0">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="text-fuchsia-400 w-3.5 h-3.5" />
                  <span className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">AI Anomalies</span>
                </div>
                <div className="flex items-end gap-2">
                  <h4 className="text-lg font-mono text-white font-bold leading-none">{formatNumber(stats.anomalies)}</h4>
                  <span className="text-fuchsia-400 text-[9px] font-bold">+{Math.floor(stats.anomalies * 0.32)}</span>
                </div>
              </div>
            </div>
          </section>
          
          <div className="h-12 w-full"></div>
        </div>
      </main>
    </div>
  );
}