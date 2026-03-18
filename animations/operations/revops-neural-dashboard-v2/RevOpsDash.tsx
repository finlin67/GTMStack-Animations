'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Zap, 
  Target, 
  Users, 
  BarChart3, 
  Layers, 
  Bell, 
  Search, 
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Hexagon,
  Globe
} from 'lucide-react';

// --- TYPES & INTERFACES ---
interface StreamEvent {
  id: string;
  time: string;
  type: 'success' | 'warning' | 'neutral';
  message: string;
  value?: string;
}

// --- SUB-COMPONENTS ---

/**
 * MetricCard: Individual KPI indicator with trend logic
 * Tightened height and padding to fit better in 600x600 view.
 */
function MetricCard({ label, value, trend, icon, color, delay }: {
  label: string;
  value: string;
  trend: number;
  icon: React.ReactNode;
  color: 'blue' | 'orange' | 'amber';
  delay: number;
}) {
  const isPositive = trend >= 0;
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-between h-24 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 shadow-lg group shrink-0"
    >
      <div className="flex justify-between items-start">
        <div className={`p-1.5 rounded-lg bg-white/5 border border-white/5 ${
          color === 'blue' ? 'text-blue-400 group-hover:text-blue-300' :
          color === 'orange' ? 'text-orange-400 group-hover:text-orange-300' :
          'text-amber-400 group-hover:text-amber-300'
        } transition-colors`}>
          {/* Fix: Validate element and cast to any to allow 'size' property injection during cloning */}
          {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { size: 16 }) : icon}
        </div>
        <div className={`flex items-center text-[9px] font-bold px-1 py-0.5 rounded-md border ${
          isPositive 
            ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/10' 
            : 'text-rose-400 bg-rose-500/10 border-rose-500/10'
        }`}>
          {isPositive ? <ArrowUpRight size={8} className="mr-0.5"/> : <ArrowDownRight size={8} className="mr-0.5"/>}
          {Math.abs(trend)}%
        </div>
      </div>
      <div>
        <h4 className="text-xl font-bold text-white tracking-tight leading-none">{value}</h4>
        <p className="text-[9px] text-slate-400 font-medium uppercase tracking-widest mt-1 group-hover:text-slate-300 transition-colors">
          {label}
        </p>
      </div>
    </motion.div>
  );
}

/**
 * NavButton: Interactive button for the floating dock
 */
function NavButton({ active, onClick, icon }: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <button 
      onClick={onClick}
      className={`relative size-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
        active 
          ? 'bg-white/10 text-white shadow-inner shadow-white/5' 
          : 'text-slate-400 hover:text-white hover:bg-white/5'
      }`}
    >
      {icon}
      {active && (
        <motion.div 
          layoutId="active-dot" 
          className="absolute -bottom-1 size-1 bg-blue-400 rounded-full shadow-[0_0_8px_#60a5fa]" 
        />
      )}
    </button>
  );
}

// --- MAIN COMPONENT ---
export default function RevOpsDash() {
  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState('overview');
  
  const [metrics, setMetrics] = useState({
    revenue: { value: 4.28, label: 'Total Revenue', trend: 12.5, unit: 'M' },
    velocity: { value: 14, label: 'Pipeline Velocity', trend: -2.4, unit: 'd' },
    winRate: { value: 34.2, label: 'Win Rate', trend: 5.1, unit: '%' },
    ltv: { value: 8.5, label: 'LTV Ratio', trend: 0.8, unit: 'x' }
  });

  const [stream, setStream] = useState<StreamEvent[]>([
    { id: '1', time: '10:42', type: 'success', message: 'Deal Closed: Enterprise', value: '$124k' },
    { id: '2', time: '10:38', type: 'warning', message: 'Churn Risk: Mid-Market', value: 'High' },
    { id: '3', time: '10:15', type: 'neutral', message: 'Sync Complete: Salesforce', value: '100%' },
  ]);

  // --- ANIMATION LOOPS ---
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        revenue: { ...prev.revenue, value: +(prev.revenue.value + (Math.random() * 0.05 - 0.02)).toFixed(2) },
        winRate: { ...prev.winRate, value: +(prev.winRate.value + (Math.random() * 0.4 - 0.2)).toFixed(1) }
      }));

      if (Math.random() > 0.7) {
        const newEvent: StreamEvent = {
          id: Date.now().toString(),
          time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
          type: Math.random() > 0.6 ? 'success' : (Math.random() > 0.5 ? 'warning' : 'neutral'),
          message: ['New Lead', 'Pipeline Update', 'Server Sync', 'Audit Log'][Math.floor(Math.random() * 4)],
          value: ['+12%', 'Pending', 'OK', 'Review'][Math.floor(Math.random() * 4)]
        };
        setStream(prev => [newEvent, ...prev.slice(0, 3)]);
      }
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // --- THEME CONSTANTS ---
  const GLASS = 'bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl';

  return (
    <div className="w-full h-full flex justify-center items-center bg-[#020617] font-sans selection:bg-blue-500/30 overflow-hidden">
      
      {/* --- APP CONTAINER: STRICTLY CONSTRAINED TO 600x600 --- */}
      <div className="relative w-[600px] h-[600px] bg-[#020617] rounded-[32px] overflow-hidden flex flex-col border border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
        
        {/* Ambient Lighting Layers */}
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[50%] bg-blue-900/15 rounded-full blur-[100px] pointer-events-none mix-blend-screen z-0" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[100%] h-[50%] bg-indigo-900/15 rounded-full blur-[80px] pointer-events-none mix-blend-screen z-0" />

        {/* --- HEADER --- */}
        <header className="relative z-20 h-14 px-5 shrink-0 flex items-center justify-between border-b border-white/5 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div className="size-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Hexagon className="text-white fill-white/20" size={18} />
            </div>
            <div>
              <h1 className="font-bold text-base text-white leading-tight tracking-tight">RevOps<span className="text-blue-400">.Neural</span></h1>
              <p className="text-[9px] font-semibold text-slate-500 tracking-widest uppercase">Dashboard v2.0</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className={`size-8 rounded-full flex items-center justify-center ${GLASS} hover:bg-white/10 transition-all active:scale-95`}>
              <Search size={14} className="text-slate-400" />
            </button>
            <button className={`size-8 rounded-full flex items-center justify-center ${GLASS} hover:bg-white/10 transition-all active:scale-95 relative`}>
              <Bell size={14} className="text-slate-400" />
              <span className="absolute top-1.5 right-2 size-1.5 bg-orange-500 rounded-full animate-pulse" />
            </button>
            <div className="pl-1.5">
              <div className="size-8 rounded-full bg-gradient-to-tr from-blue-500 to-orange-400 p-[1.5px]">
                <img src="https://picsum.photos/id/433/100/100" alt="RevOps User" className="w-full h-full rounded-full object-cover border-2 border-[#020617]" />
              </div>
            </div>
          </div>
        </header>

        {/* --- MAIN CONTENT AREA --- */}
        <main className="flex-1 relative z-10 p-5 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
          
          {/* HERO SECTION: REVENUE SPARKLINE (Tightened height) */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative w-full h-40 rounded-3xl p-5 ${GLASS} flex flex-col justify-between overflow-hidden group shrink-0`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 group-hover:from-blue-500/10 transition-colors duration-500" />
            
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="px-1.5 py-0.5 rounded-md bg-blue-500/20 text-blue-400 text-[9px] font-bold uppercase tracking-wider border border-blue-500/20">
                    Global ARR
                  </span>
                  <span className="flex items-center gap-1 text-[9px] text-emerald-400 font-bold bg-emerald-500/10 px-1 py-0.5 rounded-md border border-emerald-500/10">
                    <ArrowUpRight size={8} /> {metrics.revenue.trend}%
                  </span>
                </div>
                <h2 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-sm leading-tight">
                  ${metrics.revenue.value}
                  <span className="text-blue-400/80">{metrics.revenue.unit}</span>
                </h2>
              </div>
              <button className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors active:scale-95">
                <MoreHorizontal size={18} />
              </button>
            </div>

            <div className="relative h-16 w-full mt-1">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 40">
                <defs>
                  <linearGradient id="chartGradientTight" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="lineGradientTight" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#f97316" />
                  </linearGradient>
                </defs>
                <motion.path 
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  d="M0 35 C 10 35, 10 20, 20 20 C 30 20, 30 30, 40 28 C 50 26, 50 10, 60 10 C 70 10, 70 25, 80 20 C 90 15, 90 5, 100 5 L 100 40 L 0 40 Z" 
                  fill="url(#chartGradientTight)" 
                />
                <motion.path 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.8, ease: "easeOut" }}
                  d="M0 35 C 10 35, 10 20, 20 20 C 30 20, 30 30, 40 28 C 50 26, 50 10, 60 10 C 70 10, 70 25, 80 20 C 90 15, 90 5, 100 5" 
                  fill="none" 
                  stroke="url(#lineGradientTight)" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                />
              </svg>
            </div>
          </motion.div>

          {/* METRICS GRID */}
          <div className="grid grid-cols-3 gap-3 shrink-0">
            <MetricCard 
              label="Win Rate" 
              value={`${metrics.winRate.value}${metrics.winRate.unit}`} 
              trend={metrics.winRate.trend} 
              icon={<Target />}
              color="orange"
              delay={0.1}
            />
            <MetricCard 
              label="Velocity" 
              value={`${metrics.velocity.value}${metrics.velocity.unit}`} 
              trend={metrics.velocity.trend} 
              icon={<Zap />}
              color="blue"
              delay={0.2}
            />
            <MetricCard 
              label="LTV Ratio" 
              value={`${metrics.ltv.value}${metrics.ltv.unit}`} 
              trend={metrics.ltv.trend} 
              icon={<Layers />}
              color="amber"
              delay={0.3}
            />
          </div>

          {/* DATA STREAM WIDGET */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`flex-1 min-h-[160px] rounded-3xl p-5 ${GLASS} flex flex-col gap-3 overflow-hidden relative mb-16`}
          >
            <div className="flex items-center justify-between z-10 shrink-0">
              <h3 className="text-[11px] font-bold text-slate-200 flex items-center gap-2 uppercase tracking-widest">
                <Activity size={12} className="text-blue-400" />
                Live Intelligence
              </h3>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
            </div>

            <div className="space-y-2.5 relative z-10">
              <AnimatePresence mode="popLayout">
                {stream.map((event) => (
                  <motion.div
                    key={event.id}
                    layout
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    className="flex items-center gap-3 p-2.5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-default shrink-0"
                  >
                    <div className={`size-2 rounded-full shrink-0 ${
                      event.type === 'success' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]' :
                      event.type === 'warning' ? 'bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.5)]' :
                      'bg-slate-400'
                    }`} />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <p className="text-[11px] font-medium text-slate-200 truncate">{event.message}</p>
                        <span className="text-[9px] text-slate-500 font-mono ml-2 uppercase shrink-0">{event.time}</span>
                      </div>
                      {event.value && (
                        <p className={`text-[10px] font-bold mt-0.5 ${
                          event.type === 'success' ? 'text-emerald-400' : 
                          event.type === 'warning' ? 'text-orange-400' : 'text-slate-400'
                        }`}>
                          {event.value}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </main>

        {/* --- FLOATING DOCK NAVIGATION --- */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 w-full max-w-[280px] px-4">
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center justify-between gap-1 p-1.5 rounded-2xl bg-[#0f172a]/95 backdrop-blur-3xl border border-white/10 shadow-2xl shadow-black/60"
          >
            <NavButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={<Globe size={18} />} />
            <NavButton active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} icon={<BarChart3 size={18} />} />
            <NavButton active={activeTab === 'team'} onClick={() => setActiveTab('team')} icon={<Users size={18} />} />
            <div className="w-px h-5 bg-white/10 mx-0.5 shrink-0" />
            <NavButton active={false} onClick={() => {}} icon={<div className="size-4.5 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-[9px] font-bold text-white shadow-lg">AI</div>} />
          </motion.div>
        </div>

      </div>
      
      {/* Styles for custom scrollbar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.15);
        }
      `}</style>
    </div>
  );
}