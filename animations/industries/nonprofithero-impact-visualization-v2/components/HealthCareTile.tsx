import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  ArrowUpRight, 
  ShieldCheck, 
  Zap,
  Cpu,
  Globe,
  TrendingUp,
  Target
} from 'lucide-react';

/**
 * HealthCareTile
 * Redesigned 600x600 Dashboard Tile.
 * Converts horizontal landing page flow into a vertical monitoring stack.
 */
export default function HealthCareTile() {
  const [activeStat, setActiveStat] = useState(0);

  // Auto-cycle the active stat highlight
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStat((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: "Donor Retention", value: "+47%", icon: TrendingUp, color: "text-[#D62828]", bg: "bg-[#D62828]" },
    { label: "Lifetime Value", value: "3.1x", icon: Target, color: "text-[#F77F00]", bg: "bg-[#F77F00]" },
    { label: "Impact Velocity", value: "98.4%", icon: Zap, color: "text-emerald-600", bg: "bg-emerald-600" }
  ];

  return (
    <div className="relative w-full aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-200 bg-white flex flex-col font-sans group">
      {/* --- BACKGROUND LAYERS --- */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #1a1a1a 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }}
      />
      {/* Ambient Glow */}
      <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] bg-[#D62828]/5 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#F77F00]/5 blur-[80px] rounded-full pointer-events-none" />

      {/* --- HEADER (Top 15%) --- */}
      <div className="h-[15%] shrink-0 flex items-center justify-between px-8 border-b border-gray-100 bg-white/60 backdrop-blur-md z-20">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#D62828] text-white rounded-lg shadow-lg shadow-[#D62828]/20">
            <Cpu size={20} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm font-black text-[#1a1a1a] uppercase tracking-wider leading-tight">Impact OS</h3>
            <span className="text-[10px] font-bold text-gray-400">v4.2.0 Stable</span>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] font-bold text-emerald-700 tracking-wide uppercase">System Live</span>
        </div>
      </div>

      {/* --- HERO (Optical Center) --- */}
      <div className="flex-1 relative flex items-center justify-center py-4">
        <div className="relative w-[280px] h-[280px]">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 300 300">
            <defs>
              <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D62828" />
                <stop offset="100%" stopColor="#F77F00" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Static Track */}
            <circle cx="150" cy="150" r="120" fill="none" stroke="#f3f4f6" strokeWidth="12" />
            <circle cx="150" cy="150" r="120" fill="none" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 6" opacity="0.5" />

            {/* Dynamic Arc */}
            <motion.path
              d="M 150 30 A 120 120 0 0 1 253.9 90"
              fill="none"
              stroke="url(#heroGradient)"
              strokeWidth="12"
              strokeLinecap="round"
              filter="url(#glow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />

            {/* Orbiting Satellite */}
            <motion.g 
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{ originX: "150px", originY: "150px" }}
            >
              <circle cx="150" cy="30" r="8" fill="white" stroke="#D62828" strokeWidth="3" />
            </motion.g>

            {/* Central Metric */}
            <foreignObject x="50" y="50" width="200" height="200">
              <div className="w-full h-full flex flex-col items-center justify-center">
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col items-center"
                >
                   <Activity size={32} className="text-[#D62828] mb-2" />
                   <span className="text-5xl font-black text-[#1a1a1a] tracking-tighter">4.2x</span>
                   <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Multiplier</span>
                </motion.div>
              </div>
            </foreignObject>
          </svg>
        </div>
      </div>

      {/* --- STACKED DATA CARDS (Vertical Grouping) --- */}
      <div className="px-6 pb-2 flex flex-col gap-2 z-10">
        {stats.map((stat, index) => {
          const isActive = activeStat === index;
          return (
            <motion.div
              key={stat.label}
              layout
              className={`relative flex items-center justify-between p-4 rounded-xl border transition-all duration-300 overflow-hidden ${
                isActive 
                  ? 'bg-white border-[#D62828]/20 shadow-lg shadow-gray-200/50 scale-[1.02]' 
                  : 'bg-gray-50/50 border-transparent opacity-80'
              }`}
            >
              {isActive && (
                <motion.div 
                  layoutId="activeGlow"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-[#D62828]" 
                />
              )}
              
              <div className="flex items-center gap-3 pl-2">
                <div className={`p-1.5 rounded-md text-white ${stat.bg}`}>
                  <stat.icon size={14} strokeWidth={3} />
                </div>
                <span className="text-sm font-semibold text-gray-600">{stat.label}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className={`text-lg font-black tracking-tight ${stat.color}`}>{stat.value}</span>
                {isActive && (
                  <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}>
                    <ArrowUpRight size={16} className="text-gray-400" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* --- FOOTER (Bottom 15%) --- */}
      <div className="h-[15%] shrink-0 flex items-center justify-between px-8 border-t border-gray-100 bg-gray-50/80 text-xs font-bold text-gray-400 uppercase tracking-wider">
        <div className="flex items-center gap-2">
          <Globe size={14} />
          <span>Global Node: <span className="text-[#1a1a1a]">US-EAST</span></span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck size={14} />
          <span>Encrypted</span>
        </div>
      </div>
    </div>
  );
}