
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Factory, 
  Settings2, 
  Cpu, 
  TimerOff, 
  Banknote, 
  CheckCircle2, 
  Award, 
  Check, 
  TrendingUp, 
  TrendingDown,
  Verified
} from 'lucide-react';

interface Stats {
  efficiency: number;
  oee: number;
  downtime: number;
  payback: number;
}

const IndustrialDashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    efficiency: 28.4,
    oee: 84.2,
    downtime: -14.5,
    payback: 11.8
  });

  const updateStats = useCallback(() => {
    setStats(prev => ({
      efficiency: +(prev.efficiency + (Math.random() - 0.5) * 0.1).toFixed(1),
      oee: +(prev.oee + (Math.random() - 0.5) * 0.05).toFixed(1),
      downtime: +(prev.downtime + (Math.random() - 0.5) * 0.08).toFixed(1),
      payback: +(prev.payback + (Math.random() - 0.5) * 0.01).toFixed(2)
    }));
    
    // Recursive timeout for organic jitter
    const nextTick = 2000 + Math.random() * 3000;
    setTimeout(updateStats, nextTick);
  }, []);

  useEffect(() => {
    const timer = setTimeout(updateStats, 3000);
    return () => clearTimeout(timer);
  }, [updateStats]);

  const slideUpFade = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-[600px] h-[600px] bg-slate-900 text-slate-100 p-6 border border-slate-800 shadow-2xl relative flex flex-col overflow-hidden"
    >
      {/* Header */}
      <motion.header 
        {...slideUpFade}
        className="mb-6 flex items-center justify-between border-b border-slate-800 pb-4"
      >
        <div className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded">
            <Factory className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-base font-bold tracking-tight uppercase">Industrial ROI Dashboard</h1>
        </div>
        <div className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded border border-emerald-500/20 font-bold uppercase tracking-wider">
          System Active
        </div>
      </motion.header>

      {/* Progress Cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { id: '01', label: 'Proof of Concept', delay: 0.1, completed: true },
          { id: '02', label: 'Pilot Phase', delay: 0.2, completed: true },
          { id: '03', label: 'Global Rollout', delay: 0.3, completed: false },
        ].map((step, idx) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: step.delay }}
            whileHover={{ scale: 1.05, zIndex: 10 }}
            className={`cursor-pointer group bg-slate-800/30 rounded-lg p-2 relative pt-3 border-t-2 ${step.completed ? 'border-emerald-500 shadow-[inset_0_10px_20px_-10px_rgba(16,185,129,0.1)]' : 'border-primary/40'}`}
          >
            {step.completed && (
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: step.delay + 0.6, type: "spring", stiffness: 200 }}
                className="absolute top-1.5 right-1.5"
              >
                <div className="bg-emerald-500 rounded-full p-0.5 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <Check className="w-3 h-3 text-white font-bold" />
                </div>
              </motion.div>
            )}
            <div className={`h-1 w-full rounded-full ${step.completed ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]' : 'bg-slate-700 overflow-hidden'}`}>
              {!step.completed && (
                <motion.div 
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="bg-primary h-full w-1/3" 
                />
              )}
            </div>
            <div className="flex items-center gap-2 p-1 mt-1">
              <span className={`text-[10px] font-bold ${step.completed ? 'text-emerald-400' : 'text-primary'}`}>{step.id}</span>
              <span className={`text-[10px] ${step.completed ? 'text-slate-200' : 'text-slate-300'} font-semibold uppercase tracking-tight`}>{step.label}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Efficiency Gain */}
        <motion.div 
          {...slideUpFade}
          transition={{ delay: 0.4 }}
          animate={{ boxShadow: ["inset 0 0 0px rgba(48, 140, 232, 0)", "inset 0 0 15px rgba(48, 140, 232, 0.4)", "inset 0 0 0px rgba(48, 140, 232, 0)"] }}
          className="bg-slate-800/40 p-4 rounded-xl border border-primary/30 relative overflow-hidden"
        >
          <div className="flex justify-between items-start mb-2">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Efficiency Gain</p>
            <Settings2 className="w-4 h-4 text-primary" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white tracking-tight">+{stats.efficiency}%</span>
            <TrendingUp className="w-3 h-3 text-emerald-400" />
          </div>
          <p className="text-[10px] text-slate-500 mt-1">Target: +25% reached</p>
        </motion.div>

        {/* Overall OEE */}
        <motion.div 
          {...slideUpFade}
          transition={{ delay: 0.5 }}
          className="bg-slate-800/20 p-4 rounded-xl border border-slate-700/50"
        >
          <div className="flex justify-between items-start mb-2">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Overall OEE</p>
            <Cpu className="w-4 h-4 text-slate-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white tracking-tight">{stats.oee}%</span>
            <span className="text-[10px] text-primary font-bold">LIVE</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">Industry Avg: 72%</p>
        </motion.div>

        {/* Downtime Red */}
        <motion.div 
          {...slideUpFade}
          transition={{ delay: 0.6 }}
          className="bg-slate-800/20 p-4 rounded-xl border border-slate-700/50"
        >
          <div className="flex justify-between items-start mb-2">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Downtime Red.</p>
            <TimerOff className="w-4 h-4 text-slate-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-red-400 tracking-tight">{stats.downtime}%</span>
            <TrendingDown className="w-3 h-3 text-red-400" />
          </div>
          <p className="text-[10px] text-slate-500 mt-1">Critical reduction phase</p>
        </motion.div>

        {/* ROI Payback */}
        <motion.div 
          {...slideUpFade}
          transition={{ delay: 0.7 }}
          className="bg-slate-800/20 p-4 rounded-xl border border-slate-700/50"
        >
          <div className="flex justify-between items-start mb-2">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">ROI Payback</p>
            <Banknote className="w-4 h-4 text-slate-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white tracking-tight">{stats.payback}</span>
            <span className="text-xs text-slate-400 font-medium ml-1">Months</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">Estimated break-even</p>
        </motion.div>
      </div>

      {/* Validation Matrix */}
      <motion.div 
        {...slideUpFade}
        transition={{ delay: 0.8 }}
        className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 flex-1 flex flex-col justify-center cursor-default relative group"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30">
            <Verified className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase text-slate-200">ROI Validation Matrix</h3>
            <p className="text-[10px] text-slate-500">All key stakeholders verified performance metrics</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          {['Ops Throughput: +12%', 'Finance Capex: Cleared', 'IT Security: SOC2 Cert.', 'Engineering API: Live'].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span className="text-[11px] text-slate-300 font-medium">{item}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ROI Achieved Shimmer Button */}
      <div className="flex justify-center -mt-2 mb-2">
        <motion.div 
          {...slideUpFade}
          transition={{ delay: 1.2 }}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-amber-400/50 bg-amber-400/10 relative overflow-hidden group"
        >
          <motion.div 
            animate={{ x: ['-150%', '250%'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute inset-0 w-full h-full glint-overlay pointer-events-none skew-x-[-20deg]" 
          />
          <Award className="w-3 h-3 text-amber-400 relative z-10" />
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-[0.15em] relative z-10">ROI Achieved</span>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
            <span className="text-[11px] text-slate-300 font-semibold tracking-wide uppercase">Real-Time Sync Active</span>
          </div>
          <span className="text-[9px] text-slate-500 font-medium mt-0.5">Last update: 2 minutes ago</span>
        </div>
        <div className="flex gap-2">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-[11px] font-bold shadow-lg shadow-primary/20 transition-all"
          >
            GENERATE REPORT
          </motion.button>
        </div>
      </footer>
    </motion.div>
  );
};

export default IndustrialDashboard;
