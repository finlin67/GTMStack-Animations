'use client';

import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { 
  MousePointerClick, 
  FileText, 
  Calendar, 
  TrendingUp, 
  Sparkles,
  Target,
  Activity
} from 'lucide-react';

export default function DashboardTile() {
  const [leads, setLeads] = useState<number>(1240);

  // Simulate live lead counter
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add a lead every few seconds
      if (Math.random() > 0.6) {
        setLeads(prev => prev + 1);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, stiffness: 60 } }
  };

  const floatAnimation = {
    y: [0, -6, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  };

  const handleLayerClick = (name: string) => {
    console.log(`Clicked layer: ${name}`);
  };

  return (
    <div className="relative flex aspect-square w-full max-w-[600px] flex-col justify-between overflow-hidden rounded-3xl border border-slate-800 bg-[#020617] p-8 shadow-2xl ring-1 ring-white/5">
      {/* Background & Grids */}
      <div className="grid-bg absolute inset-0 z-0 opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 p-12 opacity-20 pointer-events-none">
        <div className="h-64 w-64 rounded-full bg-[#20d3ee] blur-[100px]" />
      </div>

      {/* Header (Top 15%) */}
      <div className="relative z-10 flex w-full items-start justify-between">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 rounded-full bg-[#20d3ee]/10 px-3 py-1 text-xs font-bold text-[#20d3ee] w-fit border border-[#20d3ee]/20">
            <Sparkles size={12} />
            <span>AI DEMAND GEN</span>
          </div>
          <h2 className="text-xl font-black text-white tracking-tight">Pipeline Overview</h2>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-slate-900/80 px-3 py-1.5 border border-slate-800 backdrop-blur-md">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>
          <span className="text-xs font-bold text-slate-300">LIVE</span>
        </div>
      </div>

      {/* Hero: Focal Point (Center) */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center py-4">
        
        {/* Floating Source Icons */}
        <div className="absolute top-4 w-full flex justify-between px-12 opacity-60">
           <motion.div animate={floatAnimation} className="flex flex-col items-center gap-1">
              <MousePointerClick size={16} className="text-[#20d3ee]" />
              <span className="text-[10px] font-bold text-slate-500">ADS</span>
           </motion.div>
           <motion.div animate={{...floatAnimation, transition: { ...floatAnimation.transition, delay: 1 }}} className="flex flex-col items-center gap-1 -mt-6">
              <FileText size={16} className="text-[#20d3ee]" />
              <span className="text-[10px] font-bold text-slate-500">CONTENT</span>
           </motion.div>
           <motion.div animate={{...floatAnimation, transition: { ...floatAnimation.transition, delay: 0.5 }}} className="flex flex-col items-center gap-1">
              <Calendar size={16} className="text-[#20d3ee]" />
              <span className="text-[10px] font-bold text-slate-500">EVENTS</span>
           </motion.div>
        </div>

        {/* Funnel Stack */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative flex flex-col items-center gap-2 z-20 mt-6"
        >
          {/* Connecting Line (Behind) */}
          <div className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-[#20d3ee]/0 via-[#20d3ee]/30 to-[#20d3ee]/0 z-0" />

          {/* Awareness */}
          <motion.div 
            variants={itemVariants} 
            whileHover={{ scale: 1.05, borderColor: "#20d3ee" }}
            whileTap={{ scale: 0.95, filter: "brightness(1.5)" }}
            onClick={() => handleLayerClick('Awareness')}
            className="group cursor-pointer z-10 h-10 w-64 rounded-lg border border-[#20d3ee]/30 bg-gradient-to-r from-slate-900/90 to-[#20d3ee]/10 backdrop-blur-sm flex items-center justify-between px-4 shadow-[0_0_15px_rgba(32,211,238,0.1)] hover:shadow-[0_0_25px_rgba(32,211,238,0.3)] transition-all duration-300"
          >
             <span className="text-[10px] font-bold text-slate-400 group-hover:text-cyan-200 transition-colors">AWARENESS</span>
             <span className="text-[10px] font-bold text-[#20d3ee]">84K</span>
          </motion.div>

          {/* Interest */}
          <motion.div 
            variants={itemVariants} 
            whileHover={{ scale: 1.05, borderColor: "#20d3ee" }}
            whileTap={{ scale: 0.95, filter: "brightness(1.5)" }}
            onClick={() => handleLayerClick('Interest')}
            className="group cursor-pointer z-10 h-10 w-52 rounded-lg border border-[#20d3ee]/30 bg-gradient-to-r from-slate-900/90 to-[#20d3ee]/15 backdrop-blur-sm flex items-center justify-between px-4 shadow-[0_0_15px_rgba(32,211,238,0.1)] hover:shadow-[0_0_25px_rgba(32,211,238,0.3)] transition-all duration-300"
          >
             <span className="text-[10px] font-bold text-slate-400 group-hover:text-cyan-200 transition-colors">INTEREST</span>
             <span className="text-[10px] font-bold text-[#20d3ee]">42K</span>
          </motion.div>

          {/* Decision */}
          <motion.div 
            variants={itemVariants} 
            whileHover={{ scale: 1.05, borderColor: "#20d3ee" }}
            whileTap={{ scale: 0.95, filter: "brightness(1.5)" }}
            onClick={() => handleLayerClick('Decision')}
            className="group cursor-pointer z-10 h-10 w-40 rounded-lg border border-emerald-500/30 bg-gradient-to-r from-slate-900/90 to-emerald-500/10 backdrop-blur-sm flex items-center justify-between px-4 shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] transition-all duration-300"
          >
             <span className="text-[10px] font-bold text-slate-400 group-hover:text-emerald-200 transition-colors">DECISION</span>
             <span className="text-[10px] font-bold text-emerald-400">12K</span>
          </motion.div>

          {/* Action */}
          <motion.div 
            variants={itemVariants} 
            whileHover={{ scale: 1.05, borderColor: "#34d399" }}
            whileTap={{ scale: 0.95, filter: "brightness(1.5)" }}
            onClick={() => handleLayerClick('Action')}
            className="group cursor-pointer z-10 h-10 w-28 rounded-lg border border-emerald-400 bg-emerald-500 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all duration-300"
          >
             <span className="text-[10px] font-black tracking-widest text-white">ACTION</span>
          </motion.div>
        </motion.div>

        {/* Growth Curve (Background of Hero) */}
        <div className="absolute bottom-4 left-0 right-0 h-32 pointer-events-none opacity-50">
           <svg className="h-full w-full" viewBox="0 0 400 150" preserveAspectRatio="none">
             <defs>
               <linearGradient id="dashboard-curve" x1="0%" x2="100%" y1="0%" y2="0%">
                 <stop offset="0%" stopColor="#20d3ee" stopOpacity="0" />
                 <stop offset="50%" stopColor="#20d3ee" stopOpacity="0.5" />
                 <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
               </linearGradient>
             </defs>
             <path d="M0,150 C100,100 300,50 400,100" stroke="url(#dashboard-curve)" strokeWidth="2" fill="none" />
             <path d="M0,150 C100,100 300,50 400,100 L400,150 L0,150 Z" fill="url(#dashboard-curve)" fillOpacity="0.1" />
           </svg>
        </div>
      </div>

      {/* Footer / System Metrics (Bottom 15%) */}
      <div className="relative z-10 grid grid-cols-3 divide-x divide-slate-800 border-t border-slate-800 pt-5 mt-2">
        
        {/* Metric 1 */}
        <div className="flex flex-col items-center justify-center gap-1 px-2">
           <div className="flex items-center gap-1.5 text-slate-500 mb-1">
             <TrendingUp size={12} />
             <span className="text-[10px] font-bold uppercase tracking-wider">Lift</span>
           </div>
           <span className="text-2xl font-black text-emerald-400">+42%</span>
        </div>

        {/* Metric 2 */}
        <div className="flex flex-col items-center justify-center gap-1 px-2">
           <div className="flex items-center gap-1.5 text-slate-500 mb-1">
             <Target size={12} />
             <span className="text-[10px] font-bold uppercase tracking-wider">Accuracy</span>
           </div>
           <span className="text-2xl font-black text-white">98.2%</span>
        </div>

        {/* Metric 3 */}
        <div className="flex flex-col items-center justify-center gap-1 px-2">
           <div className="flex items-center gap-1.5 text-slate-500 mb-1">
             <Activity size={12} />
             <span className="text-[10px] font-bold uppercase tracking-wider">Leads</span>
           </div>
           <span className="text-2xl font-black text-[#20d3ee] tabular-nums">{leads.toLocaleString()}</span>
        </div>

      </div>
    </div>
  );
}