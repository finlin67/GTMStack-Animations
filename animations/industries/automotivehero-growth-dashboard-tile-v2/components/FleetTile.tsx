'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  MousePointerClick,
  Store,
  PartyPopper,
  Car,
  TrendingUp,
  Banknote,
  Zap,
  ShieldCheck,
  MoreHorizontal,
  Activity,
  Maximize2
} from 'lucide-react';

/**
 * FleetTile Component
 * 
 * A high-fidelity, self-contained 600x600 dashboard tile.
 * Features a "Cockpit" layout with vertical hierarchy:
 * 1. Header (Status)
 * 2. Main View (Map + Vertical Sidebar Metrics)
 * 3. Footer (Telemetry)
 */
export default function FleetTile() {
  const PRIMARY_COLOR = "#13b6ec";
  const BG_DARK = "#101d22";
  
  // Bezier curve optimized for the 1:1 aspect ratio within the middle 70% frame
  const JOURNEY_PATH = "M50 950C150 850 250 850 400 700C550 550 450 400 650 300C850 200 850 150 950 50";

  return (
    <div className="relative w-full max-w-[600px] aspect-square rounded-3xl overflow-hidden bg-[#101d22] border border-[#13b6ec]/20 shadow-[0_0_60px_rgba(19,182,236,0.1)] font-sans text-white select-none flex flex-col group ring-1 ring-white/5">
        
        {/* --- Background Ambient Effects --- */}
        <div className="absolute inset-0 pointer-events-none z-0">
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.15]" 
                style={{ 
                    backgroundImage: `linear-gradient(to right, ${PRIMARY_COLOR}33 1px, transparent 1px), linear-gradient(to bottom, ${PRIMARY_COLOR}33 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }} 
            />
            {/* Dynamic Glow Orbs */}
            <motion.div 
                animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-[#13b6ec]/20 blur-[120px] rounded-full mix-blend-screen" 
            />
            <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-indigo-500/10 blur-[100px] rounded-full mix-blend-screen" />
        </div>

        {/* --- Header Zone (Top 15%) --- */}
        <div className="relative z-30 h-[15%] w-full flex items-center justify-between px-6 border-b border-white/5 bg-[#101d22]/80 backdrop-blur-xl">
            <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-lg bg-[#13b6ec]/10 border border-[#13b6ec]/30 shadow-[0_0_15px_rgba(19,182,236,0.2)]">
                    <Activity size={18} className="text-[#13b6ec]" />
                </div>
                <div className="flex flex-col gap-0.5">
                    <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-white">Live Monitoring</h2>
                    <div className="flex items-center gap-2">
                         <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                        </span>
                        <span className="text-[9px] text-white/50 font-mono">CONNECTION STABLE</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <button className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                    <Maximize2 size={16} />
                </button>
                <button className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                    <MoreHorizontal size={16} />
                </button>
            </div>
        </div>

        {/* --- Main Cockpit Area (Middle 70%) --- */}
        <div className="relative flex-1 w-full flex overflow-hidden">
            
            {/* Vertical Stack Sidebar (Left) */}
            <div className="relative z-20 w-[35%] h-full flex flex-col justify-center gap-3 pl-6 pr-2 py-4">
                 {/* Card 1 */}
                 <motion.div 
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="group relative w-full bg-gradient-to-r from-white/5 to-transparent border-l-[3px] border-[#13b6ec] p-3 rounded-r-xl backdrop-blur-sm hover:from-white/10 transition-all cursor-default"
                 >
                    <div className="absolute inset-0 bg-[#13b6ec]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative flex items-center justify-between mb-1">
                        <span className="text-[9px] font-bold text-white/60 uppercase tracking-wider">Conversion</span>
                        <TrendingUp size={12} className="text-green-400" />
                    </div>
                    <div className="relative flex items-baseline gap-2">
                        <span className="text-xl font-bold font-display text-white tracking-tight">+45%</span>
                        <span className="text-[9px] font-bold text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded">+12%</span>
                    </div>
                 </motion.div>

                 {/* Card 2 */}
                 <motion.div 
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="group relative w-full bg-gradient-to-r from-white/5 to-transparent border-l-[3px] border-[#13b6ec]/50 p-3 rounded-r-xl backdrop-blur-sm hover:border-[#13b6ec] hover:from-white/10 transition-all cursor-default"
                 >
                    <div className="absolute inset-0 bg-[#13b6ec]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative flex items-center justify-between mb-1">
                        <span className="text-[9px] font-bold text-white/60 uppercase tracking-wider">Revenue</span>
                        <Banknote size={12} className="text-[#13b6ec]" />
                    </div>
                    <div className="relative flex items-baseline gap-2">
                        <span className="text-xl font-bold font-display text-white tracking-tight">$2.8M</span>
                        <span className="text-[9px] font-bold text-[#13b6ec] bg-[#13b6ec]/10 px-1.5 py-0.5 rounded">PROJ</span>
                    </div>
                 </motion.div>

                 {/* Card 3 */}
                 <motion.div 
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="group relative w-full bg-gradient-to-r from-white/5 to-transparent border-l-[3px] border-[#13b6ec]/50 p-3 rounded-r-xl backdrop-blur-sm hover:border-[#13b6ec] hover:from-white/10 transition-all cursor-default"
                 >
                    <div className="absolute inset-0 bg-[#13b6ec]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative flex items-center justify-between mb-1">
                        <span className="text-[9px] font-bold text-white/60 uppercase tracking-wider">Velocity</span>
                        <Zap size={12} className="text-yellow-400" />
                    </div>
                    <div className="relative flex items-baseline gap-2">
                        <span className="text-xl font-bold font-display text-white tracking-tight">32%</span>
                        <span className="text-[9px] font-bold text-yellow-400 bg-yellow-400/10 px-1.5 py-0.5 rounded">FAST</span>
                    </div>
                 </motion.div>
            </div>

            {/* Right Map Area (Hero) */}
            <div className="absolute inset-0 z-0">
                <svg className="w-full h-full" viewBox="0 0 1000 1000" fill="none" preserveAspectRatio="xMidYMid slice">
                     <defs>
                        <linearGradient id="path-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor={PRIMARY_COLOR} stopOpacity="0.05" />
                            <stop offset="40%" stopColor={PRIMARY_COLOR} stopOpacity="0.6" />
                            <stop offset="100%" stopColor={PRIMARY_COLOR} stopOpacity="1" />
                        </linearGradient>
                        <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="12" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                     </defs>
                     
                     {/* Background Track */}
                     <path d={JOURNEY_PATH} stroke={PRIMARY_COLOR} strokeOpacity="0.1" strokeWidth="6" strokeDasharray="16 16" />
                     
                     {/* Revenue/Data Curve (Decorative) */}
                     <path 
                        d="M50 800C150 780 250 750 350 700C450 650 550 580 650 500C750 420 850 320 950 200" 
                        stroke="white" 
                        strokeOpacity="0.03" 
                        strokeWidth="2" 
                    />

                     {/* Active Animated Path */}
                     <motion.path 
                        d={JOURNEY_PATH} 
                        stroke="url(#path-gradient)" 
                        strokeWidth="6" 
                        strokeLinecap="round"
                        filter="url(#neon-glow)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 3, ease: "easeOut" }}
                     />
                </svg>

                {/* Animated Cars */}
                <motion.div
                    className="absolute top-0 left-0 z-10 drop-shadow-[0_0_20px_rgba(19,182,236,1)]"
                    style={{ offsetPath: `path('${JOURNEY_PATH}')` } as React.CSSProperties}
                    initial={{ offsetDistance: "0%" }}
                    animate={{ offsetDistance: "100%" }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                >
                    <Car className="text-[#13b6ec] rotate-90 fill-[#101d22]" size={32} strokeWidth={2} />
                </motion.div>

                {/* Second Ghost Car */}
                <motion.div
                    className="absolute top-0 left-0 z-10 opacity-40"
                    style={{ offsetPath: `path('${JOURNEY_PATH}')` } as React.CSSProperties}
                    initial={{ offsetDistance: "0%" }}
                    animate={{ offsetDistance: "100%" }}
                    transition={{ duration: 12, delay: 6, repeat: Infinity, ease: "linear" }}
                >
                    <Car className="text-[#13b6ec] rotate-90" size={32} strokeWidth={2} />
                </motion.div>
                
                 {/* --- Map Nodes --- */}
                 {/* Start Node (Aligned to path M50 950) */}
                 <div className="absolute bottom-[5%] left-[5%] flex flex-col items-center gap-2 z-20 group cursor-pointer">
                    <div className="p-2 rounded-full bg-[#101d22] border border-white/10 group-hover:border-[#13b6ec] transition-colors shadow-lg">
                        <MousePointerClick size={16} className="text-white/40 group-hover:text-[#13b6ec]" />
                    </div>
                 </div>

                 {/* Mid Node (Aligned to path curve) */}
                 <div className="absolute top-[50%] left-[45%] flex flex-col items-center gap-2 z-20 group cursor-pointer">
                    <motion.div 
                        whileHover={{ scale: 1.1 }}
                        className="p-3 rounded-full bg-[#101d22] border-2 border-[#13b6ec]/50 group-hover:border-[#13b6ec] shadow-[0_0_30px_rgba(19,182,236,0.2)]"
                    >
                        <Store size={20} className="text-[#13b6ec]" />
                    </motion.div>
                 </div>

                 {/* End Node (Aligned to path M950 50) */}
                 <div className="absolute top-[8%] right-[8%] flex flex-col items-center gap-2 z-20 group cursor-pointer">
                    <motion.div 
                        animate={{ boxShadow: ["0 0 20px rgba(19,182,236,0.2)", "0 0 40px rgba(19,182,236,0.5)", "0 0 20px rgba(19,182,236,0.2)"] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="p-4 rounded-full bg-gradient-to-br from-[#13b6ec]/20 to-[#13b6ec]/5 border border-[#13b6ec] backdrop-blur-md"
                    >
                        <PartyPopper size={24} className="text-white drop-shadow-md" />
                    </motion.div>
                    <span className="text-[9px] font-bold text-[#13b6ec] uppercase tracking-widest bg-[#101d22]/80 px-2 py-0.5 rounded border border-[#13b6ec]/30">Goal</span>
                 </div>
            </div>
        </div>

        {/* --- Footer Zone (Bottom 15%) --- */}
        <div className="relative z-30 h-[15%] w-full bg-[#101d22]/90 border-t border-white/5 flex items-center justify-between px-6 backdrop-blur-xl">
            {/* System Status */}
            <div className="flex flex-col gap-1 min-w-[100px]">
                <div className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-[#13b6ec]" />
                    <span className="text-[10px] font-bold text-[#13b6ec] tracking-wider">SYSTEM OPTIMAL</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-1 w-1 bg-white/30 rounded-full" />
                    <span className="text-[9px] text-white/40 font-mono">LATENCY: 12ms</span>
                </div>
            </div>

            {/* Decoration Separator */}
            <div className="h-full w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent mx-6" />

            {/* Growth Progress Bar */}
            <div className="flex-1 flex flex-col justify-center">
                <div className="flex justify-between items-end mb-1.5">
                    <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Daily Growth Target</span>
                    <span className="text-xs font-bold text-white font-mono">92%</span>
                </div>
                <div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "92%" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#13b6ec] to-green-400 rounded-full shadow-[0_0_10px_rgba(74,222,128,0.5)]"
                    />
                </div>
            </div>
        </div>
    </div>
  );
}