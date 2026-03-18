'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, 
  TrendingUp, 
  Users, 
  Zap, 
  Activity, 
  ChevronRight, 
  Search, 
  Bell, 
  Filter, 
  MoreVertical,
  Globe,
  Signal,
  ArrowUpRight,
  Cpu,
  MousePointer2,
  Sparkles,
  Hexagon
} from 'lucide-react';

/**
 * ==========================================
 * TYPES & INTERFACES
 * ==========================================
 */

interface Account {
  id: string;
  name: string;
  domain: string;
  tier: 1 | 2 | 3;
  intent: number;
  pipeline: string;
  angle: number;
  distance: number;
  status: 'Growing' | 'Stable' | 'Critical';
}

interface Touchpoint {
  id: string;
  accountName: string;
  type: 'Email' | 'Web' | 'Ads' | 'Social';
  timestamp: string;
  score: number;
}

/**
 * ==========================================
 * MOCK DATA
 * ==========================================
 */

const ACCOUNTS: Account[] = [
  { id: '1', name: 'Nvidia Corp', domain: 'nvidia.com', tier: 1, intent: 94, pipeline: '$4.2M', angle: 45, distance: 30, status: 'Growing' },
  { id: '2', name: 'Stripe', domain: 'stripe.com', tier: 1, intent: 88, pipeline: '$2.1M', angle: 160, distance: 45, status: 'Growing' },
  { id: '3', name: 'Linear', domain: 'linear.app', tier: 2, intent: 76, pipeline: '$850k', angle: 280, distance: 65, status: 'Stable' },
  { id: '4', name: 'Snowflake', domain: 'snowflake.com', tier: 1, intent: 65, pipeline: '$1.5M', angle: 10, distance: 80, status: 'Critical' },
  { id: '5', name: 'Datadog', domain: 'datadog.com', tier: 2, intent: 58, pipeline: '$420k', angle: 210, distance: 90, status: 'Stable' },
  { id: '6', name: 'Vercel', domain: 'vercel.com', tier: 1, intent: 82, pipeline: '$1.2M', angle: 330, distance: 40, status: 'Growing' },
];

const RECENT_TOUCHPOINTS: Touchpoint[] = [
  { id: 't1', accountName: 'Nvidia', type: 'Web', timestamp: '2m ago', score: 12 },
  { id: 't2', accountName: 'Stripe', type: 'Email', timestamp: '15m ago', score: 8 },
  { id: 't3', accountName: 'Linear', type: 'Ads', timestamp: '1h ago', score: 5 },
];

/**
 * ==========================================
 * UI COMPONENTS (INLINED)
 * ==========================================
 */

const GlassSurface = ({ children, className = "", elevation = "mid" }: { children: React.ReactNode; className?: string; elevation?: "low" | "mid" | "high" }) => {
  const intensities = {
    low: "bg-white/[0.02] border-white/5",
    mid: "bg-white/[0.04] border-white/10 shadow-xl",
    high: "bg-white/[0.08] border-white/20 shadow-2xl backdrop-blur-xl",
  };
  return (
    <div className={`rounded-2xl border transition-all duration-300 ${intensities[elevation]} ${className}`}>
      {children}
    </div>
  );
};

const KPIBadge = ({ icon: Icon, value, label, trend, accent = "blue" }: { icon: any, value: string, label: string, trend?: string, accent?: "blue" | "orange" | "gold" }) => {
  const accents = {
    blue: "text-sky-400 bg-sky-500/10 border-sky-500/20",
    orange: "text-orange-400 bg-orange-500/10 border-orange-500/20",
    gold: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  };

  return (
    <GlassSurface elevation="mid" className="p-4 flex flex-col gap-1.5 hover:bg-white/[0.06] group cursor-default">
      <div className="flex items-center justify-between mb-1">
        <div className={`p-2 rounded-lg border ${accents[accent]}`}>
          <Icon className="w-3.5 h-3.5" />
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/5 px-2 py-0.5 rounded-full border border-emerald-500/10">
            {trend} <TrendingUp className="w-2.5 h-2.5" />
          </div>
        )}
      </div>
      <div>
        <span className="text-xl font-bold text-slate-100 tracking-tight leading-none">{value}</span>
        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 mt-1">{label}</p>
      </div>
    </GlassSurface>
  );
};

const RadarNode = ({ account, onSelect }: { account: Account, onSelect: (a: Account) => void }) => {
  const x = Math.cos((account.angle * Math.PI) / 180) * account.distance;
  const y = Math.sin((account.angle * Math.PI) / 180) * account.distance;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.15, zIndex: 50 }}
      onClick={() => onSelect(account)}
      className="absolute cursor-pointer group"
      style={{ left: `calc(50% + ${x}%)`, top: `calc(50% + ${y}%)` }}
    >
      <div className="relative">
        {/* Connection Line to center (subtle) */}
        <div className="absolute w-[100px] h-[1px] bg-gradient-to-r from-white/10 to-transparent origin-left rotate-180 left-0 top-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* The Node */}
        <div className={`w-3.5 h-3.5 rounded-full relative z-10 border-2 border-[#1e293b] ${account.tier === 1 ? 'bg-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.5)]' : 'bg-slate-500'}`} />
        <motion.div 
          animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ repeat: Infinity, duration: 3, delay: Math.random() }}
          className={`absolute -inset-2 rounded-full blur-md ${account.tier === 1 ? 'bg-sky-400' : 'bg-slate-400'}`}
        />
        
        {/* Tooltip */}
        <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100 pointer-events-none z-50">
          <GlassSurface elevation="high" className="px-3 py-2 border-sky-500/30 min-w-[120px]">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-white leading-none mb-1">{account.name}</span>
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Intent</span>
                <span className="text-[9px] font-mono font-bold text-sky-400">{account.intent}%</span>
              </div>
            </div>
          </GlassSurface>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * ==========================================
 * MAIN DASHBOARD
 * ==========================================
 */

export default function ABMRadarAnalysis() {
  const [activeTab, setActiveTab] = useState<'radar' | 'list'>('radar');
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0f172a] text-slate-400 font-sans selection:bg-sky-500/30 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_40%,#1e293b_0%,#0f172a_100%)] opacity-80" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-sky-600/5 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Main Container - "Modern Deep" 600x600 Tile */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full h-full max-w-[600px] max-h-[600px] flex flex-col bg-slate-900/40 backdrop-blur-3xl border border-white/10 shadow-[0_64px_128px_-32px_rgba(0,0,0,0.8)] rounded-[2.5rem] overflow-hidden"
      >
        {/* Sophisticated Navbar (30% Secondary) */}
        <header className="flex-none h-20 border-b border-white/5 px-8 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center border border-white/10 shadow-lg">
                <Hexagon className="w-6 h-6 text-sky-400" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900" />
            </div>
            <div>
              <h1 className="text-sm font-black text-white uppercase tracking-[0.15em] leading-none">Radar Control</h1>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Global Ops / 042</span>
                <span className="w-1 h-1 bg-slate-700 rounded-full" />
                <span className="text-[9px] font-mono text-sky-500/60 uppercase">{currentTime}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-sky-500/30 hover:bg-sky-500/5 transition-all group">
              <Search className="w-4 h-4 text-slate-500 group-hover:text-sky-400" />
            </button>
            <div className="h-5 w-[1px] bg-white/10 mx-1" />
            <div className="flex items-center gap-3 p-1 pr-3 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all cursor-pointer">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&q=80" className="w-8 h-8 rounded-xl object-cover" alt="User" />
              <div className="hidden sm:block">
                <p className="text-[10px] font-bold text-white leading-tight">M. Chen</p>
                <p className="text-[8px] font-bold text-slate-500 uppercase">Director</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content (60% Base) */}
        <main className="flex-1 overflow-hidden p-8 flex flex-col gap-6">
          
          {/* Top KPI Grid (10% Accent) */}
          <section className="grid grid-cols-3 gap-4">
            <KPIBadge icon={Target} value="124" label="Accounts" trend="+12" accent="blue" />
            <KPIBadge icon={Zap} value="28" label="Hot Leads" trend="+5" accent="orange" />
            <KPIBadge icon={Sparkles} value="$18.4M" label="Pipeline" accent="gold" />
          </section>

          {/* Centrally Focused View Area */}
          <section className="flex-1 min-h-0 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div className="flex p-1.5 bg-slate-950/60 rounded-[1.25rem] border border-white/5 shadow-inner">
                {['radar', 'list'].map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`px-6 py-2 rounded-[0.85rem] text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-sky-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    {tab === 'radar' ? 'Radar Map' : 'Detail View'}
                  </button>
                ))}
              </div>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all text-[10px] font-bold text-slate-400 uppercase tracking-widest group">
                <Filter className="w-3.5 h-3.5 group-hover:text-sky-400 transition-colors" /> Options
              </button>
            </div>

            {/* High-Fidelity Data Viewport */}
            <GlassSurface elevation="high" className="flex-1 relative overflow-hidden bg-slate-950/20">
              <AnimatePresence mode="wait">
                {activeTab === 'radar' ? (
                  <motion.div key="radar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
                    {/* Visual Radar Overlays */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                      {[0.25, 0.5, 0.75, 1.0].map((scale, i) => (
                        <div key={i} className="absolute border border-white/5 rounded-full" style={{ width: `${scale * 100}%`, height: `${scale * 100}%` }} />
                      ))}
                      <div className="absolute w-full h-[1px] bg-white/5" />
                      <div className="absolute h-full w-[1px] bg-white/5" />
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute w-1/2 h-1/2 origin-bottom-left top-0 left-1/2 bg-gradient-to-tr from-sky-500/10 via-transparent to-transparent"
                        style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }}
                      />
                    </div>
                    
                    {ACCOUNTS.map((acc) => (
                      <RadarNode key={acc.id} account={acc} onSelect={() => {}} />
                    ))}
                    
                    {/* Static HUD Text */}
                    <div className="absolute top-6 left-6 flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-[10px] font-black text-sky-400 uppercase tracking-[0.2em]">
                        <Globe className="w-3.5 h-3.5" /> North America
                      </div>
                      <span className="text-[8px] font-mono text-slate-600 uppercase">Sector: Enterprise SaaS</span>
                    </div>

                    <div className="absolute bottom-6 right-6 p-4 bg-slate-900/60 backdrop-blur-md rounded-2xl border border-white/5 flex gap-5 pointer-events-none">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-sky-500" />
                        <span className="text-[8px] font-bold uppercase text-slate-500 tracking-widest">Global T1</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-slate-500" />
                        <span className="text-[8px] font-bold uppercase text-slate-500 tracking-widest">Emerging</span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="list" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="h-full p-6 overflow-y-auto custom-scrollbar flex flex-col gap-3">
                    {ACCOUNTS.sort((a,b) => b.intent - a.intent).map((acc, i) => (
                      <motion.div 
                        key={acc.id}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.06] hover:border-sky-500/20 transition-all group/item"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ${acc.tier === 1 ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' : 'bg-slate-800 text-slate-500 border border-white/5'}`}>
                            {acc.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white group-hover/item:text-sky-400 transition-colors">{acc.name}</p>
                            <p className="text-[9px] text-slate-500 font-mono tracking-tighter mt-0.5">{acc.domain}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right hidden sm:block">
                            <p className="text-xs font-bold text-slate-100">{acc.pipeline}</p>
                            <span className="text-[8px] uppercase font-black text-slate-600 tracking-widest">{acc.status}</span>
                          </div>
                          <div className="w-10 h-10 flex items-center justify-center relative">
                             <span className="text-[10px] font-mono font-bold text-sky-400">{acc.intent}</span>
                             <svg className="absolute inset-0 w-full h-full rotate-[-90deg]">
                                <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/5" />
                                <motion.circle 
                                  cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="2.5" 
                                  strokeDasharray="113" 
                                  initial={{ strokeDashoffset: 113 }}
                                  animate={{ strokeDashoffset: 113 - (113 * acc.intent) / 100 }}
                                  transition={{ duration: 1.5, ease: "easeOut" }}
                                  className="text-sky-500"
                                />
                             </svg>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassSurface>
          </section>

          {/* Bottom Control Bar (30% Secondary) */}
          <section className="flex-none grid grid-cols-2 gap-4">
            <GlassSurface elevation="low" className="p-5 flex flex-col gap-3 bg-white/[0.01]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
                  <Signal className="w-3.5 h-3.5 text-sky-500" /> Recent Activity
                </span>
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
              </div>
              <div className="space-y-3">
                {RECENT_TOUCHPOINTS.map((tp) => (
                  <div key={tp.id} className="flex items-center justify-between text-[10px]">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded bg-sky-500/5 flex items-center justify-center text-sky-400 border border-sky-500/10">
                        <MousePointer2 className="w-3 h-3" />
                      </div>
                      <span className="font-bold text-slate-200">{tp.accountName}</span>
                    </div>
                    <span className="text-slate-600 font-mono text-[9px]">{tp.timestamp}</span>
                  </div>
                ))}
              </div>
            </GlassSurface>

            <button className="group relative p-5 bg-sky-600 rounded-[2rem] flex flex-col justify-between overflow-hidden shadow-2xl shadow-sky-900/40 active:scale-[0.98] transition-transform">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none opacity-40" />
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-700" />
              
              <div className="relative z-10 flex justify-between items-start">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md border border-white/20">
                  <Cpu className="w-5 h-5 text-white" />
                </div>
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-7 h-7 rounded-full border-2 border-sky-600 bg-slate-800 overflow-hidden shadow-xl ring-2 ring-sky-700/50">
                      <img src={`https://i.pravatar.cc/150?u=u${i + 10}`} className="w-full h-full object-cover" alt="Team" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative z-10 text-left">
                <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-white flex items-center gap-2">
                  Launch Insight <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </h4>
                <p className="text-[9px] text-sky-100/70 font-bold leading-tight mt-1 px-0.5">Automated probability analysis ready.</p>
              </div>
            </button>
          </section>
        </main>

        <style>{`
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { 
            background: rgba(255,255,255,0.05); 
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(14, 165, 233, 0.3); }
        `}</style>
      </motion.div>
    </div>
  );
}

/**
 * ==========================================
 * BOOTSTRAP
 * ==========================================
 */

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<ABMRadarAnalysis />);
}
