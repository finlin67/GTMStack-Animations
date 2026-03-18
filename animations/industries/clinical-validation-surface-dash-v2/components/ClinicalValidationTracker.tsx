'use client';

import React, { useMemo } from 'react';
import { motion } from "framer-motion";
import { 
  ClipboardList, 
  Moon, 
  Sun,
  FileText, 
  Stamp, 
  ShieldCheck, 
  Network, 
  Stethoscope, 
  ShieldAlert, 
  Wallet, 
  RefreshCw, 
  Gavel, 
  CheckCircle2, 
  Hourglass 
} from "lucide-react";

const TIMELINE_DATA = [
  {
    id: 'discovery',
    title: 'Discovery & Awareness',
    description: 'Clinical pain point alignment & initial stakeholder value mapping.',
    time: 'Month 1-3 • Completed',
    status: 'completed'
  },
  {
    id: 'evidence',
    title: 'Clinical Evidence Review',
    description: 'Deep-dive technical validation of peer-reviewed outcomes data.',
    time: 'Month 4-10',
    tag: 'In Progress',
    status: 'active'
  },
  {
    id: 'economic',
    title: 'Economic Assessment',
    description: 'ROI modeling for CFO and procurement committee directives.',
    time: 'Month 11-14',
    status: 'pending-1'
  },
  {
    id: 'security',
    title: 'Security & Deployment',
    description: 'HIPAA audit, BAA execution, and enterprise-wide rollout.',
    time: 'Month 15-18',
    status: 'pending-2'
  }
];

const SECURITY_DATA = [
  {
    id: 'hipaa',
    label: 'HIPAA Audit',
    value: '100%',
    status: 'complete'
  },
  {
    id: 'baa',
    label: 'BAA Execution',
    value: 'ACTIVE',
    status: 'active'
  }
];

const STAKEHOLDERS_DATA = [
  {
    id: 'medical',
    role: 'Chief Medical Off.',
    icon: Stethoscope,
    statusIcon: CheckCircle2,
    status: 'approved'
  },
  {
    id: 'ciso',
    role: 'CISO Review',
    icon: ShieldAlert,
    statusIcon: CheckCircle2,
    status: 'approved'
  },
  {
    id: 'cfo',
    role: 'CFO Directive',
    icon: Wallet,
    statusIcon: RefreshCw,
    status: 'active'
  },
  {
    id: 'legal',
    role: 'Legal Review',
    icon: Gavel,
    statusIcon: Hourglass,
    status: 'disabled'
  }
];

export default function ClinicalValidationTracker() {
  // Randomly select theme on load for high-fidelity surface approach
  const theme = useMemo(() => (Math.random() > 0.5 ? 'light' : 'dark'), []);

  const styles = useMemo(() => {
    const isLight = theme === 'light';
    return {
      bg: isLight 
        ? 'bg-[radial-gradient(circle_at_center,_#f9fafb_0%,_#f3f4f6_100%)]' 
        : 'bg-[radial-gradient(circle_at_center,_#1e293b_0%,_#0f172a_100%)]',
      container: isLight 
        ? 'bg-white/80 border-slate-200/60 shadow-xl' 
        : 'bg-slate-900/60 backdrop-blur-xl border-white/10 shadow-2xl',
      card: isLight 
        ? 'bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100' 
        : 'bg-slate-800/40 backdrop-blur-md border border-white/5 shadow-inner',
      textMain: isLight ? 'text-slate-900' : 'text-slate-50',
      textDim: isLight ? 'text-slate-500' : 'text-slate-400',
      accentBlue: isLight ? 'text-blue-600' : 'text-blue-400',
      accentOrange: isLight ? 'text-orange-500' : 'text-orange-400',
      accentGold: isLight ? 'text-amber-500' : 'text-amber-400',
      btnBg: 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20',
      indicator: isLight ? 'bg-slate-100' : 'bg-slate-800/80',
    };
  }, [theme]);

  return (
    <div className={`w-full h-full min-h-screen flex justify-center items-center ${styles.bg} p-4 transition-colors duration-1000`}>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: ${theme === 'light' ? '#e2e8f0' : '#334155'}; 
          border-radius: 10px; 
        }
      `}</style>

      {/* Main App Container constrained to 600x600 pixels */}
      <div className={`w-full max-w-[600px] h-full max-h-[600px] aspect-square rounded-[2.5rem] border overflow-hidden flex flex-col ${styles.container} transition-all duration-700 relative`}>
        
        {/* Header Section */}
        <header className="px-8 pt-8 pb-4 flex justify-between items-start shrink-0 z-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-xl ${styles.card}`}>
                <ClipboardList className={`w-6 h-6 ${styles.accentBlue}`} />
              </div>
              <h1 className={`text-xl font-extrabold tracking-tight ${styles.textMain}`}>Clinical Validation</h1>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] opacity-60 ml-1">Implementation Workflow v2.0</p>
          </div>
          <div className={`flex items-center gap-2 p-1.5 rounded-2xl ${styles.card}`}>
             {theme === 'light' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-blue-400" />}
             <span className="text-[10px] font-bold uppercase pr-2 opacity-60">{theme} Mode</span>
          </div>
        </header>

        {/* Dynamic Layout Grid */}
        <div className="px-8 pb-8 flex-1 grid grid-cols-12 gap-6 overflow-hidden z-10">
          
          {/* Main Content Column (Timeline) */}
          <main className="col-span-7 flex flex-col gap-5 h-full overflow-hidden">
            <section className={`${styles.card} rounded-[2rem] p-6 flex-1 flex flex-col overflow-hidden`}>
              <div className="flex items-center justify-between mb-8 shrink-0">
                <span className={`text-[11px] font-bold uppercase tracking-widest ${styles.textDim}`}>Timeline Strategy</span>
                <span className={`px-3 py-1 text-[9px] font-black rounded-full border ${styles.accentOrange} border-orange-500/20 bg-orange-500/5`}>PHASE II</span>
              </div>
              
              <div className="relative flex-1 custom-scrollbar overflow-y-auto pr-4">
                <div className={`absolute left-4 top-2 bottom-2 w-[1px] ${styles.indicator}`}></div>
                
                <div className="space-y-10 relative">
                  {TIMELINE_DATA.map((item) => {
                    const isActive = item.status === 'active';
                    const isCompleted = item.status === 'completed';

                    return (
                      <div key={item.id} className="relative pl-12 group">
                        <div className="absolute left-0 top-0.5 size-8 flex items-center justify-center -translate-x-1/2">
                          {isActive ? (
                            <>
                              {/* Intense Outer Glow Pulse */}
                              <motion.div 
                                animate={{ 
                                  scale: [1, 3.2, 1], 
                                  opacity: [0.05, 0.4, 0.05] 
                                }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute inset-0 rounded-full bg-orange-500/40 blur-xl"
                              />
                              {/* Middle Sharp Ripple */}
                              <motion.div 
                                animate={{ 
                                  scale: [1, 2.4, 1], 
                                  opacity: [0.2, 0.8, 0.2] 
                                }}
                                transition={{ duration: 1.8, repeat: Infinity, ease: "circOut" }}
                                className="absolute inset-0 rounded-full border border-orange-500/60"
                              />
                              {/* Inner Core Shimmer */}
                              <motion.div 
                                animate={{ 
                                  scale: [1, 1.3, 1], 
                                  opacity: [0.4, 1, 0.4] 
                                }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-2 rounded-full bg-orange-400 blur-[2px]"
                              />
                            </>
                          ) : null}
                          <div className={`size-3 rounded-full border-2 transition-all duration-300 ${
                            isCompleted ? 'bg-blue-600 border-blue-600 shadow-lg shadow-blue-500/40' : 
                            isActive ? 'bg-orange-500 border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.8)] ring-4 ring-orange-500/20 z-10' : 
                            `bg-transparent ${theme === 'light' ? 'border-slate-300' : 'border-slate-600'}`
                          }`} />
                        </div>

                        <h4 className={`text-sm font-bold tracking-tight ${
                          isActive ? styles.accentOrange : styles.textMain
                        }`}>
                          {item.title}
                        </h4>
                        
                        <p className={`text-[11px] leading-relaxed mt-1.5 font-medium ${styles.textDim}`}>
                          {item.description}
                        </p>

                        <div className="mt-2 flex items-center gap-3">
                          <span className={`text-[9px] font-bold uppercase tracking-wider ${
                            isCompleted ? styles.accentBlue : 
                            isActive ? styles.accentOrange : 
                            'opacity-40'
                          }`}>
                            {item.time}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-4 h-16 shrink-0">
              <div className={`${styles.card} rounded-2xl p-3 flex items-center gap-3`}>
                <div className="size-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                  <FileText className={`w-5 h-5 ${styles.accentBlue}`} />
                </div>
                <div>
                  <p className={`text-[9px] font-bold uppercase tracking-tight ${styles.textDim}`}>Evidence</p>
                  <p className={`text-xs font-extrabold ${styles.textMain}`}>24+ Papers</p>
                </div>
              </div>
              <div className={`${styles.card} rounded-2xl p-3 flex items-center gap-3`}>
                <div className="size-10 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">
                  <Stamp className={`w-5 h-5 ${styles.accentOrange}`} />
                </div>
                <div>
                  <p className={`text-[9px] font-bold uppercase tracking-tight ${styles.textDim}`}>Stakeholders</p>
                  <p className={`text-xs font-extrabold ${styles.textMain}`}>12 Sign-offs</p>
                </div>
              </div>
            </div>
          </main>

          {/* Side Panel Column (Security & Matrix) */}
          <aside className="col-span-5 flex flex-col gap-5 overflow-hidden">
            
            {/* Security Integrity Card */}
            <section className={`${styles.card} rounded-[2rem] p-6 flex flex-col shrink-0`}>
              <h3 className={`text-[11px] font-bold uppercase tracking-widest mb-6 flex items-center gap-2 ${styles.textMain}`}>
                <ShieldCheck className={`w-4 h-4 ${styles.accentBlue}`} /> Integrity
              </h3>
              <div className="space-y-6">
                {SECURITY_DATA.map((item) => (
                  <div key={item.id}>
                    <div className="flex justify-between text-[10px] mb-2">
                      <span className={`font-bold ${styles.textDim}`}>{item.label}</span>
                      <span className={`font-black tracking-wider ${item.status === 'complete' ? styles.accentBlue : styles.accentOrange}`}>
                        {item.value}
                      </span>
                    </div>
                    <div className={`w-full h-1.5 rounded-full overflow-hidden ${styles.indicator}`}>
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: item.status === 'complete' ? '100%' : '65%' }}
                        className={`h-full rounded-full ${item.status === 'complete' ? 'bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.3)]' : 'bg-orange-500'}`}
                        transition={{ duration: 1.5, ease: "circOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Matrix Card */}
            <section className={`${styles.card} rounded-[2rem] p-6 flex-1 flex flex-col overflow-hidden`}>
              <h3 className={`text-[11px] font-bold uppercase tracking-widest mb-6 flex items-center gap-2 ${styles.textMain}`}>
                <Network className={`w-4 h-4 ${styles.accentGold}`} /> Network
              </h3>
              <div className="space-y-4 flex-1 custom-scrollbar overflow-y-auto">
                {STAKEHOLDERS_DATA.map((item) => {
                  const Icon = item.icon;
                  const StatusIcon = item.statusIcon;
                  const isActive = item.status === 'active';
                  const isApproved = item.status === 'approved';

                  return (
                    <div key={item.id} className="flex items-center gap-4 group">
                      <div className={`size-9 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                        isApproved ? 'bg-blue-500/10 text-blue-600' :
                        isActive ? 'bg-orange-500/10 text-orange-500 shadow-inner' :
                        'bg-slate-100 text-slate-400 dark:bg-slate-800'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      
                      <div className="flex flex-col">
                        <span className={`text-[11px] font-bold ${item.status === 'disabled' ? 'opacity-40' : styles.textMain}`}>
                          {item.role}
                        </span>
                        <span className="text-[9px] font-medium opacity-50 uppercase tracking-tighter">
                          {item.status}
                        </span>
                      </div>

                      <div className="ml-auto shrink-0">
                        {isActive ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className={styles.accentOrange}
                          >
                            <StatusIcon className="w-3.5 h-3.5" />
                          </motion.div>
                        ) : (
                          <StatusIcon className={`w-3.5 h-3.5 ${
                            isApproved ? styles.accentBlue : 'opacity-20'
                          }`} />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.02, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full mt-6 py-4 rounded-2xl text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 shrink-0 ${styles.btnBg}`}
              >
                PROCEED TO STEP 3
              </motion.button>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
