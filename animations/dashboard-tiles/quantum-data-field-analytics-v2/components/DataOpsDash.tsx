'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  BarChart3, 
  Settings, 
  Database, 
  TrendingUp, 
  Cpu, 
  Lightbulb, 
  Cloud, 
  LineChart, 
  ShieldCheck,
  X,
  Activity,
  Zap,
  ChevronDown,
  Clock
} from 'lucide-react';

// Animation variants for the nebula clouds
const driftVariants: Variants = {
  animate: (custom: number) => ({
    rotate: [0, 180, 360],
    scale: [1, 1.1, 1],
    transition: {
      duration: custom, 
      repeat: Infinity,
    },
  }),
};

// Data flow animation for the connector dots
const flowVariants: Variants = {
  animate: {
    top: ["0%", "100%"],
    opacity: [0, 1, 0],
    scale: [0.8, 1.2, 0.8],
    transition: {
      duration: 1.5,
      repeat: Infinity,
    }
  }
};

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
  hidden: { opacity: 0, y: [15, 0], filter: "blur(8px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 18
    }
  }
};

// Mock data configuration
const stageDetails = {
  dataIn: {
    id: 0,
    title: "Data Ingestion",
    color: "blue",
    metrics: [
      { label: "Latency", value: "8ms", icon: Zap },
      { label: "Loss", value: "0.01%", icon: ShieldCheck },
      { label: "Nodes", value: "42", icon: Database }
    ],
    history: [45, 60, 55, 70, 65, 80, 75, 90, 85, 95]
  },
  processed: {
    id: 1,
    title: "Neural Core",
    color: "indigo",
    metrics: [
      { label: "Throughput", value: "98%", icon: Activity },
      { label: "Check", value: "Clean", icon: ShieldCheck },
      { label: "Load", value: "34%", icon: Cpu }
    ],
    history: [30, 40, 35, 50, 45, 60, 55, 65, 60, 70]
  },
  insights: {
    id: 2,
    title: "Predictive Engine",
    color: "fuchsia",
    metrics: [
      { label: "Conf.", value: "94%", icon: Lightbulb },
      { label: "Signals", value: "12", icon: TrendingUp },
      { label: "ROI", value: "+15%", icon: BarChart3 }
    ],
    history: [50, 65, 70, 85, 80, 92, 90, 95, 98, 92]
  }
};

interface Stats {
  dataIn: number;
  processed: number;
  insights: number;
  accuracy: number;
}

export default function DataOpsDash() {
  const [stats, setStats] = useState<Stats>({
    dataIn: 1.2,
    processed: 980,
    insights: 42.5,
    accuracy: 99.8,
  });

  const [selectedStage, setSelectedStage] = useState<keyof typeof stageDetails | null>(null);
  const [activeFlowStep, setActiveFlowStep] = useState(0);
  const [showHistory, setShowHistory] = useState(false);
  const [refreshRate, setRefreshRate] = useState(2500);
  const [showSettings, setShowSettings] = useState(false);

  // Stats randomizer
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        dataIn: +(prev.dataIn + (Math.random() * 0.02 - 0.01)).toFixed(2),
        processed: Math.floor(prev.processed + (Math.random() * 10 - 5)),
        insights: +(prev.insights + (Math.random() * 0.1 - 0.05)).toFixed(1),
        accuracy: +(99.8 + (Math.random() * 0.1 - 0.05)).toFixed(1),
      }));
    }, refreshRate);
    return () => clearInterval(interval);
  }, [refreshRate]);

  // Flow cycle animation
  useEffect(() => {
    const flowInterval = setInterval(() => {
      setActiveFlowStep((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(flowInterval);
  }, []);

  const handleStageClick = (stage: keyof typeof stageDetails) => {
    setSelectedStage(stage);
    setShowHistory(false);
  };

  return (
    <div className="w-full aspect-square max-w-[600px] flex items-center justify-center font-sans select-none overflow-hidden relative bg-[#020617] rounded-[3rem] border border-white/10 shadow-2xl">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          custom={45}
          variants={driftVariants}
          animate="animate"
          className="absolute w-[400px] h-[400px] -top-32 -left-32 rounded-full bg-blue-600/10 blur-[90px] opacity-40"
        />
        <motion.div 
          custom={55}
          variants={driftVariants}
          animate="animate"
          className="absolute w-[350px] h-[350px] -bottom-20 -right-20 rounded-full bg-fuchsia-600/10 blur-[90px] opacity-40"
        />
      </div>

      <div className="relative w-full h-full flex flex-col z-10">
        {/* Header */}
        <header className="px-8 py-7 flex items-center justify-between border-b border-white/5 bg-[#020617]/50 backdrop-blur-2xl shrink-0">
          <div className="flex items-center gap-5">
            <motion.div 
              layout
              className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 via-indigo-500 to-fuchsia-600 p-[1px] shadow-[0_0_20px_rgba(59,130,246,0.2)]"
            >
              <div className="w-full h-full bg-[#020617] rounded-2xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-blue-400" />
              </div>
            </motion.div>
            <div>
              <h2 className="text-2xl font-black tracking-tight text-white leading-none">Quantum Dash</h2>
              <div className="flex items-center gap-2 mt-1.5">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400/70">Telemetry v2.5</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 relative">
            <motion.div 
              layout
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-black text-emerald-400 tracking-widest">LIVE</span>
            </motion.div>
            
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2.5 rounded-xl transition-all duration-500 ${showSettings ? 'bg-white/10 text-white rotate-180 scale-110' : 'hover:bg-white/5 text-slate-400 hover:text-white'}`}
            >
              <Settings className="w-5 h-5" />
            </button>
            
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.9 }}
                  className="absolute top-full right-0 mt-4 w-72 bg-[#0f172a]/95 border border-white/10 rounded-3xl p-7 shadow-2xl z-50 backdrop-blur-3xl"
                >
                  <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/5">
                    <Clock size={16} className="text-blue-400" />
                    <span className="text-xs font-black text-slate-200 uppercase tracking-widest">Dash Control</span>
                  </div>
                  <div className="space-y-5">
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] text-slate-400 uppercase font-black">Refresh Interval</span>
                      <span className="text-[11px] font-mono text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-500/20">{refreshRate}ms</span>
                    </div>
                    <input 
                      type="range" 
                      min="500" 
                      max="5000" 
                      step="500"
                      value={refreshRate}
                      onChange={(e) => setRefreshRate(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-all"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* Pipeline Container */}
        <motion.main 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 flex flex-col items-center justify-center p-8 gap-1.5"
        >
          <StageCard 
            variants={itemVariants}
            icon={Database}
            color="blue"
            label="Stage 01"
            title="Ingestion"
            value={stats.dataIn}
            unit="M"
            isActive={activeFlowStep === 0}
            onClick={() => handleStageClick('dataIn')}
          />

          <VerticalConnector 
            variants={itemVariants} 
            color="from-blue-500/40 via-indigo-500/40 to-indigo-500/20" 
            isActive={activeFlowStep === 0}
          />

          <StageCard 
            variants={itemVariants}
            icon={Cpu}
            color="indigo"
            label="Stage 02"
            title="Process"
            value={stats.processed}
            unit="K"
            isActive={activeFlowStep === 1}
            onClick={() => handleStageClick('processed')}
          />

          <VerticalConnector 
            variants={itemVariants} 
            color="from-indigo-500/40 via-fuchsia-500/40 to-fuchsia-500/20" 
            isActive={activeFlowStep === 1}
          />

          <StageCard 
            variants={itemVariants}
            icon={Lightbulb}
            color="fuchsia"
            label="Stage 03"
            title="Analysis"
            value={stats.insights}
            unit="K"
            isActive={activeFlowStep === 2}
            onClick={() => handleStageClick('insights')}
          />
        </motion.main>

        {/* Global Footer */}
        <footer className="px-10 py-7 border-t border-white/5 flex items-center justify-between bg-[#020617]/70 backdrop-blur-2xl shrink-0">
          <div className="flex gap-12">
            <FooterStat icon={Cloud} label="Source Clusters" value="12" />
            <FooterStat icon={ShieldCheck} label="Accuracy" value={`${stats.accuracy}%`} color="text-emerald-400" />
          </div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 px-4 py-2 bg-white/[0.04] rounded-2xl border border-white/5 shadow-inner"
          >
            <Activity className="w-4 h-4 text-blue-500 animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black">Ops Secure</span>
          </motion.div>
        </footer>

        {/* Stage Detailed Modal */}
        <AnimatePresence>
          {selectedStage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-md p-6"
              onClick={() => setSelectedStage(null)}
            >
              <motion.div
                initial={{ y: 80, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 60, opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", damping: 25, stiffness: 350 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-sm bg-[#0f172a] border border-white/10 rounded-[3rem] p-10 relative overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.6)]"
              >
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <h3 className="text-3xl font-black text-white tracking-tight">{stageDetails[selectedStage].title}</h3>
                    <p className="text-[11px] text-blue-400 uppercase tracking-[0.4em] font-black mt-3">Stage Statistics</p>
                  </div>
                  <button onClick={() => setSelectedStage(null)} className="p-2.5 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-all scale-110">
                    <X size={24} />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-5 mb-10">
                  {stageDetails[selectedStage].metrics.map((m, i) => {
                    const Icon = m.icon;
                    return (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white/[0.03] rounded-[1.5rem] p-5 border border-white/5 flex flex-col items-center hover:bg-white/[0.07] transition-all group"
                      >
                        <Icon size={18} className="text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
                        <p className="text-[9px] text-slate-500 uppercase tracking-widest mb-1.5 font-black">{m.label}</p>
                        <p className="text-sm font-black text-white">{m.value}</p>
                      </motion.div>
                    );
                  })}
                </div>

                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="w-full py-5 rounded-[1.5rem] bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-[11px] uppercase tracking-[0.25em] text-slate-200 hover:text-white transition-all flex items-center justify-center gap-4 font-black group overflow-hidden relative"
                >
                  <LineChart size={18} className="group-hover:rotate-12 transition-transform" />
                  <span>{showHistory ? 'Close Historical' : 'View Data Stream'}</span>
                  <ChevronDown size={18} className={`transition-transform duration-700 ${showHistory ? 'rotate-180' : ''}`} />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 -translate-x-full"
                    animate={{ translateX: ["100%", "-100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </button>

                <AnimatePresence>
                  {showHistory && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: 'auto', opacity: 1, marginTop: 24 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-black/30 rounded-[1.5rem] border border-white/5 p-6 h-32 flex items-end justify-between gap-2 shadow-inner relative">
                        {stageDetails[selectedStage].history.map((h, i) => (
                          <motion.div 
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ delay: i * 0.03, type: "spring", stiffness: 120 }}
                            className="w-full bg-gradient-to-t from-blue-700/80 to-blue-400/90 rounded-t-lg shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Reusable Stage Component
function StageCard({ icon: Icon, color, label, title, value, unit, isActive, onClick, variants }: any) {
  const colorMap = {
    blue: "border-blue-500/20 hover:border-blue-500/60 shadow-blue-500/5",
    indigo: "border-indigo-500/20 hover:border-indigo-500/60 shadow-indigo-500/5",
    fuchsia: "border-fuchsia-500/20 hover:border-fuchsia-500/60 shadow-fuchsia-500/5",
  } as const;

  const colorClass = colorMap[color as keyof typeof colorMap] || "border-slate-500/20";
  const accentColor = color === 'blue' ? 'text-blue-400' : color === 'indigo' ? 'text-indigo-400' : 'text-fuchsia-400';

  return (
    <motion.div 
      layout
      variants={variants}
      onClick={onClick}
      whileHover={{ scale: 1.02, x: 5 }}
      whileTap={{ scale: 0.97 }}
      animate={{ 
        backgroundColor: isActive ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.03)',
        borderColor: isActive ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.1)',
        boxShadow: isActive ? '0 0 30px rgba(255, 255, 255, 0.05)' : 'none'
      }}
      className={`group cursor-pointer w-full backdrop-blur-xl border rounded-[2rem] p-6 flex items-center justify-between transition-all duration-500 relative overflow-hidden ${colorClass} ${isActive ? 'ring-2 ring-white/10' : ''}`}
    >
      {/* Active Scan Effect */}
      {isActive && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent h-1/2 pointer-events-none"
          animate={{ top: ["-100%", "200%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      )}

      <div className="flex items-center gap-6 relative z-10">
        <motion.div 
          animate={{ 
            scale: isActive ? 1.1 : 1,
            borderColor: isActive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'
          }}
          className={`p-4 rounded-2xl bg-[#020617] border transition-all shadow-xl`}
        >
          <Icon className={`w-7 h-7 transition-all duration-700 ${isActive ? accentColor : 'text-slate-400'} group-hover:rotate-6`} />
        </motion.div>
        <div>
          <motion.span 
            animate={{ opacity: isActive ? 1 : 0.4 }}
            className={`text-[10px] font-black uppercase tracking-[0.3em] block mb-1.5 transition-colors ${isActive ? 'text-white' : 'text-slate-400'}`}
          >
            {label}
          </motion.span>
          <h3 className="text-xl font-black text-white tracking-tight group-hover:translate-x-1 transition-transform">{title}</h3>
        </div>
      </div>

      <div className="text-right relative z-10">
        <AnimatePresence mode="wait">
          <motion.div 
            key={value}
            initial={{ x: 10, opacity: 0, filter: "blur(4px)" }}
            animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ x: -10, opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.3, type: "spring", stiffness: 150 }}
            className="text-3xl font-black text-white flex items-baseline justify-end gap-1 font-mono"
          >
            {value}
            <span className="text-[12px] font-bold opacity-30 ml-1">{unit}</span>
          </motion.div>
        </AnimatePresence>
        
        <div className="h-5 flex items-center justify-end">
          <AnimatePresence>
            {isActive && (
              <motion.div 
                initial={{ opacity: 0, y: 5, filter: "blur(2px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -5, filter: "blur(2px)" }}
                className={`flex items-center gap-2 text-[10px] font-black tracking-[0.1em] text-emerald-400`}
              >
                <Activity className="w-3.5 h-3.5 animate-pulse" /> 
                <span className="uppercase">Telemetry Active</span>
              </motion.div>
            )}
          </AnimatePresence>
          {!isActive && (
             <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                className="text-[10px] font-black tracking-[0.1em] text-slate-600 uppercase"
             >
               Idle State
             </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Pipeline Connector
function VerticalConnector({ color, variants, isActive }: { color: string, variants?: Variants, isActive?: boolean }) {
  return (
    <motion.div 
      layout 
      variants={variants} 
      animate={{ opacity: isActive ? 1 : 0.2 }}
      className={`w-[2px] h-8 bg-gradient-to-b ${color} relative transition-opacity duration-500`}
    >
      <motion.div 
        variants={flowVariants}
        animate="animate"
        className={`absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_15px_white] ${isActive ? 'opacity-100' : 'opacity-0'}`} 
      />
    </motion.div>
  );
}

// Quick Stats component
function FooterStat({ icon: Icon, label, value, color = "text-white" }: any) {
  return (
    <div className="flex flex-col gap-1.5 group cursor-default">
      <div className="flex items-center gap-2.5 opacity-40 group-hover:opacity-60 transition-opacity">
        <Icon className="w-4 h-4" />
        <span className="text-[10px] uppercase tracking-[0.2em] font-black">{label}</span>
      </div>
      <span className={`text-lg font-black ${color} tracking-tight group-hover:translate-y-[-2px] transition-transform`}>{value}</span>
    </div>
  );
}
