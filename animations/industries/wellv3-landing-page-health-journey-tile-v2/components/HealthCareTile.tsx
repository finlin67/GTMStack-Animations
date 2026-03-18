'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MoreHorizontal, 
  ClipboardCheck, 
  Microscope, 
  CalendarRange, 
  Medal, 
  Heart, 
  TrendingUp,
  Activity,
  ShieldCheck,
  Zap,
  Clock,
  CheckCircle2,
  ChevronDown,
  Loader2
} from 'lucide-react';

const COLORS = {
  primary: "#00a4e6",
  primaryDark: "#0057B8",
  slate50: "#f8fafc",
  slate100: "#f1f5f9",
  slate200: "#e2e8f0",
  slate400: "#94a3b8",
  slate500: "#64748b",
  slate800: "#1e293b",
  white: "#ffffff",
  rose: "#f43f5e",
  emerald: "#10b981",
  indigo: "#6366f1"
};

interface Step {
  id: number;
  title: string;
  subtitle: string;
  meta: string;
  icon: React.ElementType;
}

const STEPS: Step[] = [
  { id: 1, title: "Onboarding", subtitle: "Profile Complete", meta: "Done", icon: ClipboardCheck },
  { id: 2, title: "Biometrics", subtitle: "Analysis In-Progress", meta: "Now", icon: Microscope },
  { id: 3, title: "Wellness Plan", subtitle: "Generating Roadmap", meta: "Next", icon: CalendarRange },
  { id: 4, title: "Performance", subtitle: "Goal Tracking", meta: "Future", icon: Medal },
];

export default function HealthCareTile() {
  const [activeStep, setActiveStep] = useState<number>(2);
  const [heartRate, setHeartRate] = useState<number>(98);
  const [scannedPercent, setScannedPercent] = useState(0);

  // Simulate Heart Rate
  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRate((prev) => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const next = prev + change;
        return next > 105 ? 105 : next < 90 ? 90 : next;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Simulate Scanning Progress for Active Step
  useEffect(() => {
    const interval = setInterval(() => {
      setScannedPercent(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const currentStepData = STEPS.find(s => s.id === activeStep) || STEPS[0];

  return (
    <div className="relative w-full h-full bg-white rounded-[32px] shadow-2xl border border-slate-200 flex flex-col overflow-hidden font-sans select-none">
      
      {/* --- HEADER (Fixed Height ~80px) --- */}
      <div className="h-20 px-6 flex items-center justify-between border-b border-slate-100 bg-slate-50/50 backdrop-blur-sm z-30 shrink-0">
        <div className="flex items-center gap-3">
           <div className="size-10 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center text-[#00a4e6] shadow-sm border border-blue-200">
             <Activity size={20} />
           </div>
           <div>
             <h3 className="font-bold text-slate-800 text-base leading-tight">Patient Status</h3>
             <div className="flex items-center gap-2 mt-0.5">
               <span className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
               </span>
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Live Monitoring</p>
             </div>
           </div>
        </div>
        <button className="size-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#00a4e6] hover:border-[#00a4e6] transition-all bg-white shadow-sm group">
          <MoreHorizontal size={18} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>

      {/* --- BODY (Flex-1, fills remaining space) --- */}
      <div className="flex-1 relative flex flex-col items-center py-4 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white">
        
        {/* Background Grid Decoration */}
        <div className="absolute inset-0 grid grid-cols-[repeat(20,minmax(0,1fr))] opacity-[0.03] pointer-events-none">
            {Array.from({ length: 400 }).map((_, i) => (
                <div key={i} className="border-[0.5px] border-[#00a4e6]" />
            ))}
        </div>

        {/* HERO ELEMENT (Compact) */}
        <div className="relative z-10 flex flex-col items-center justify-center shrink-0 mb-4">
            <div className="relative size-32 flex items-center justify-center">
                {/* Rotating Rings */}
                <motion.div 
                    className="absolute inset-0 rounded-full border-2 border-dashed border-[#00a4e6]/20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div 
                    className="absolute inset-2 rounded-full border border-[#00a4e6]/10"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Progress Circle (Scaled for 32 size) */}
                <svg className="absolute inset-0 size-full -rotate-90">
                    <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-slate-100" />
                    <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-[#00a4e6]" 
                        strokeDasharray={377}
                        strokeDashoffset={377 - (377 * scannedPercent) / 100}
                        strokeLinecap="round"
                    />
                </svg>

                {/* Central Icon */}
                <div className="relative z-20 size-20 rounded-full bg-white shadow-xl shadow-blue-100 flex items-center justify-center border-4 border-slate-50">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeStep}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-[#00a4e6] flex items-center justify-center"
                        >
                            {React.createElement(currentStepData.icon, { size: 32 })}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Floating Badge */}
                <motion.div 
                    className="absolute -bottom-2 bg-[#00a4e6] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-lg border-2 border-white"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    {scannedPercent}%
                </motion.div>
            </div>

            {/* Text Container with AnimatePresence */}
            <div className="text-center mt-3 relative h-14 w-full flex justify-center">
                <AnimatePresence mode="wait">
                    <motion.div 
                        key={activeStep}
                        initial={{ opacity: 0, y: 5, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -5, filter: "blur(4px)" }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="absolute inset-x-0 top-0 flex flex-col items-center"
                    >
                        <h2 className="text-xl font-extrabold text-slate-800">
                            {currentStepData.title}
                        </h2>
                        <p className="text-slate-500 font-medium text-xs">
                            {currentStepData.subtitle}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>

        {/* SECONDARY DATA STACK (Vertical List - Optimized Density) */}
        <div className="w-full max-w-[340px] flex flex-col gap-2 z-10 px-6 flex-1 justify-center min-h-0">
            {STEPS.map((step) => {
                const isActive = step.id === activeStep;
                const isCompleted = step.id < activeStep;

                return (
                    <motion.button
                        key={step.id}
                        onClick={() => setActiveStep(step.id)}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        layout
                        className={`
                            flex items-center justify-between px-3 py-2.5 rounded-xl border w-full transition-all text-left group
                            ${isActive 
                                ? 'bg-[#00a4e6]/5 border-[#00a4e6] shadow-[0_2px_12px_-4px_rgba(0,164,230,0.2)]' 
                                : isCompleted 
                                    ? 'bg-slate-50 border-slate-200 opacity-60' 
                                    : 'bg-white border-slate-200 shadow-sm hover:border-blue-200'
                            }
                        `}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`
                                size-8 rounded-lg flex items-center justify-center transition-colors shrink-0
                                ${isActive 
                                    ? 'bg-[#00a4e6] text-white shadow-sm' 
                                    : isCompleted 
                                        ? 'bg-slate-200 text-slate-500' 
                                        : 'bg-blue-50 text-[#00a4e6] group-hover:bg-[#00a4e6]/10'
                                }
                            `}>
                                {isCompleted ? <CheckCircle2 size={16} /> : <step.icon size={16} />}
                            </div>
                            <div className="flex flex-col truncate">
                                <span className={`text-xs font-bold truncate transition-colors ${
                                    isActive ? 'text-[#0057B8]' : isCompleted ? 'text-slate-500 line-through' : 'text-slate-700'
                                }`}>
                                    {step.title}
                                </span>
                                <span className={`text-[10px] font-medium truncate ${isActive ? 'text-[#00a4e6]' : 'text-slate-400'}`}>
                                    {isActive ? 'Processing...' : isCompleted ? 'Completed' : 'Pending'}
                                </span>
                            </div>
                        </div>
                        
                        {isActive ? (
                             <div className="flex items-center gap-1.5 pl-2 shrink-0">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00a4e6] opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00a4e6]"></span>
                                </span>
                             </div>
                        ) : !isCompleted && (
                            <ChevronDown size={14} className="text-slate-300 -rotate-90 group-hover:text-[#00a4e6] transition-colors shrink-0" />
                        )}
                    </motion.button>
                )
            })}
        </div>

      </div>

      {/* --- FOOTER (Fixed Height ~80px) --- */}
      <div className="h-20 px-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between z-30 shrink-0">
         
         {/* Metric 1 */}
         <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative size-10 flex items-center justify-center shrink-0">
                <svg className="absolute inset-0 size-full -rotate-90">
                    <circle cx="20" cy="20" r="18" stroke="#e2e8f0" strokeWidth="2" fill="none" />
                    <circle cx="20" cy="20" r="18" stroke="#f43f5e" strokeWidth="2" fill="none" 
                        strokeDasharray={113} 
                        strokeDashoffset={113 - (113 * 0.75)} 
                        strokeLinecap="round"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <Heart size={14} className="text-rose-500 fill-rose-500 animate-pulse" />
                </div>
            </div>
            <div className="flex flex-col">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-0.5">Heart Rate</p>
                <div className="flex items-baseline gap-1">
                    <span className="text-lg font-black text-slate-800 tabular-nums leading-none">{heartRate}</span>
                    <span className="text-[10px] text-slate-500 font-semibold">BPM</span>
                </div>
            </div>
         </div>

         {/* Vertical Divider */}
         <div className="h-8 w-px bg-slate-200 shrink-0" />

         {/* Metric 2 */}
         <div className="flex items-center gap-3">
             <div className="size-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center shrink-0">
                 <Zap size={18} className="text-indigo-500 fill-indigo-100" />
             </div>
             <div className="flex flex-col">
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-0.5">Readiness</p>
                 <div className="flex items-center gap-1.5">
                     <span className="text-lg font-black text-slate-800 leading-none">94%</span>
                     <span className="text-[9px] font-bold text-emerald-500 bg-emerald-50 px-1 py-0.5 rounded-full">+2%</span>
                 </div>
             </div>
         </div>

      </div>
    </div>
  );
}