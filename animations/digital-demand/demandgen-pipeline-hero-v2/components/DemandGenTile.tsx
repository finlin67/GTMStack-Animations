'use client';

import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { 
  MousePointerClick, 
  FileText, 
  Calendar, 
  TrendingUp
} from 'lucide-react';

export default function DemandGenTile() {
  const [leads, setLeads] = useState<number>(1240);
  const [activeLayer, setActiveLayer] = useState<string | null>(null);

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
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 50 } }
  };

  const floatAnimation = {
    y: [0, -8, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  };

  const handleLayerClick = (name: string) => {
    console.log(`Clicked layer: ${name}`);
    setActiveLayer(name);
    setTimeout(() => setActiveLayer(null), 300);
  };

  return (
    <div className="relative flex aspect-square w-full max-w-[500px] items-center justify-center">
      {/* Background Glow */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 rounded-full bg-[#20d3ee]/5 blur-[100px]" 
      />

      {/* Main Content Container */}
      <div className="relative flex h-full w-full items-center justify-center">
        
        {/* Central Funnel Stack */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative flex flex-col items-center gap-3 z-10"
        >
          {/* Awareness */}
          <motion.div 
            variants={itemVariants}
            animate={activeLayer === 'Awareness' ? { scale: 1.1, filter: "brightness(1.5)", borderColor: "#ffffff" } : "visible"}
            whileHover={{ scale: 1.05, borderColor: "#20d3ee" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleLayerClick('Awareness')}
            className="group cursor-pointer h-10 w-64 rounded-xl border border-[#20d3ee]/40 bg-gradient-to-r from-emerald-500/20 to-[#20d3ee]/20 backdrop-blur-sm shadow-[0_0_20px_rgba(32,211,238,0.2)] hover:shadow-[0_0_30px_rgba(32,211,238,0.4)] flex items-center justify-center transition-all duration-300"
          >
            <span className="text-[10px] font-black uppercase tracking-widest text-cyan-200 group-hover:text-cyan-100 transition-colors">Awareness</span>
          </motion.div>

          {/* Interest */}
          <motion.div 
            variants={itemVariants}
            animate={activeLayer === 'Interest' ? { scale: 1.1, filter: "brightness(1.5)", borderColor: "#ffffff" } : "visible"}
            whileHover={{ scale: 1.05, borderColor: "#20d3ee" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleLayerClick('Interest')}
            className="group cursor-pointer h-10 w-48 rounded-xl border border-[#20d3ee]/40 bg-gradient-to-r from-emerald-500/30 to-[#20d3ee]/30 backdrop-blur-sm shadow-[0_0_20px_rgba(32,211,238,0.2)] hover:shadow-[0_0_30px_rgba(32,211,238,0.4)] flex items-center justify-center transition-all duration-300"
          >
            <span className="text-[10px] font-black uppercase tracking-widest text-cyan-100 group-hover:text-white transition-colors">Interest</span>
          </motion.div>

          {/* Decision */}
          <motion.div 
            variants={itemVariants}
            animate={activeLayer === 'Decision' ? { scale: 1.1, filter: "brightness(1.5)", borderColor: "#ffffff" } : "visible"}
            whileHover={{ scale: 1.05, borderColor: "#20d3ee" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleLayerClick('Decision')}
            className="group cursor-pointer h-10 w-32 rounded-xl border border-[#20d3ee]/40 bg-gradient-to-r from-emerald-500/40 to-[#20d3ee]/40 backdrop-blur-sm shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] flex items-center justify-center transition-all duration-300"
          >
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-100 group-hover:text-white transition-colors">Decision</span>
          </motion.div>

          {/* Action */}
          <motion.div 
            variants={itemVariants}
            animate={activeLayer === 'Action' ? { scale: 1.1, filter: "brightness(1.5)", borderColor: "#ffffff" } : "visible"}
            whileHover={{ scale: 1.05, borderColor: "#34d399" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleLayerClick('Action')}
            className="group cursor-pointer h-10 w-20 rounded-xl border border-emerald-400 bg-emerald-500 backdrop-blur-sm shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] flex items-center justify-center transition-all duration-300"
          >
             <span className="text-[10px] font-black uppercase tracking-widest text-white">Action</span>
          </motion.div>
        </motion.div>

        {/* Floating Source Icons (Top) */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ delay: 0.8 }}
          className="absolute -top-4 left-10 flex flex-col items-center gap-1"
        >
          <motion.div 
            animate={floatAnimation}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-[#20d3ee] border border-slate-700"
          >
            <MousePointerClick size={20} />
          </motion.div>
          <span className="text-[10px] font-bold text-slate-500">ADS</span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ delay: 1 }}
          className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        >
          <motion.div 
            animate={{...floatAnimation, transition: { ...floatAnimation.transition, delay: 0.5 }}}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-[#20d3ee] border border-slate-700"
          >
            <FileText size={20} />
          </motion.div>
          <span className="text-[10px] font-bold text-slate-500">CONTENT</span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ delay: 1.2 }}
          className="absolute -top-4 right-10 flex flex-col items-center gap-1"
        >
          <motion.div 
            animate={{...floatAnimation, transition: { ...floatAnimation.transition, delay: 1 }}}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-[#20d3ee] border border-slate-700"
          >
            <Calendar size={20} />
          </motion.div>
          <span className="text-[10px] font-bold text-slate-500">EVENTS</span>
        </motion.div>

        {/* Growth Curve SVG */}
        <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-0">
          <svg className="h-full w-full opacity-80" viewBox="0 0 400 200">
            <defs>
              <linearGradient id="demand-gen-gradient-line" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop offset="0%" stopColor="#20d3ee" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
            <motion.path 
              d="M0,180 Q100,160 150,100 T350,20" 
              fill="none" 
              stroke="url(#demand-gen-gradient-line)" 
              strokeLinecap="round" 
              strokeWidth="4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
            />
          </svg>
        </div>

        {/* Floating Cards (Metrics) */}
        {/* Bottom Right Card */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, type: "spring" }}
          className="absolute bottom-10 right-0 rounded-lg bg-slate-900/90 p-4 border border-emerald-500/30 backdrop-blur-md shadow-2xl z-20"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
              <TrendingUp size={20} />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">Conversion Lift</div>
              <div className="text-xl font-black text-emerald-400">+42.8%</div>
            </div>
          </div>
        </motion.div>

        {/* Top Left Card (Leads) */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.8, type: "spring" }}
          className="absolute top-24 -left-8 rounded-lg bg-slate-900/90 p-3 border border-[#20d3ee]/30 backdrop-blur-md shadow-2xl z-20"
        >
          <div className="flex items-center gap-2">
            <motion.div 
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-2 w-2 rounded-full bg-[#20d3ee]" 
            />
            <div className="text-xs font-bold text-white tabular-nums">
              {leads.toLocaleString()} New Leads Today
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}