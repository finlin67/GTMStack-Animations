
'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Repeat, 
  Target, 
  BarChart3, 
  Calendar, 
  Check, 
  Loader2,
  TrendingUp,
  Zap,
  Activity
} from 'lucide-react';

// --- TYPE DEFINITIONS ---
interface TargetData {
  id: number;
  name: string;
  role: string;
  avatar: string;
  tier: string;
  tierColor: string;
  tierBg: string;
  tierBorder: string;
}

interface RevenueSegment {
  label: string;
  value: string;
  color: string;
  width: string;
}

// --- MOCK DATA ---
const targets: TargetData[] = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "Starter Plan",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&q=80",
    tier: "Tier 2",
    tierColor: "text-rose-600 dark:text-rose-400",
    tierBg: "bg-rose-50 dark:bg-rose-500/10",
    tierBorder: "border-rose-100 dark:border-rose-900",
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Core Insights",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80",
    tier: "Pro",
    tierColor: "text-amber-600 dark:text-amber-400",
    tierBg: "bg-amber-50 dark:bg-amber-500/10",
    tierBorder: "border-amber-100 dark:border-amber-900",
  },
  {
    id: 3,
    name: "David Miller",
    role: "Enterprise",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80",
    tier: "Hub",
    tierColor: "text-violet-600 dark:text-violet-400",
    tierBg: "bg-violet-50 dark:bg-violet-500/10",
    tierBorder: "border-violet-100 dark:border-violet-900",
  }
];

const initialRevenueData: RevenueSegment[] = [
  { label: "SMB", value: "$12.4k", color: "bg-slate-300 dark:bg-slate-600", width: "45%" },
  { label: "Mid-Market", value: "$28.9k", color: "bg-violet-400", width: "78%" },
  { label: "Ent. Growth", value: "$45.2k", color: "bg-gradient-to-r from-violet-600 to-indigo-600", width: "92%" },
];

const generatedRevenueData: RevenueSegment[] = [
  { label: "SMB", value: "$18.2k", color: "bg-slate-400 dark:bg-slate-500", width: "62%" },
  { label: "Mid-Market", value: "$36.5k", color: "bg-violet-500", width: "86%" },
  { label: "Ent. Growth", value: "$54.1k", color: "bg-gradient-to-r from-violet-600 to-indigo-600", width: "98%" },
];

// --- MAIN COMPONENT ---
export default function AgencyAnalysis() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<number | null>(null);
  
  const [revenueSegments, setRevenueSegments] = useState<RevenueSegment[]>(initialRevenueData);
  const [totalPotential, setTotalPotential] = useState<string>("$86.5k");

  const totalNumericValue = useMemo(() => {
    return revenueSegments.reduce((sum, seg) => {
      const num = parseFloat(seg.value.replace('$', '').replace('k', ''));
      return sum + num;
    }, 0);
  }, [revenueSegments]);

  const handleGenerate = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isGenerated) return;
    setIsGenerating(true);
    setSelectedSegment(null);
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
      setRevenueSegments(generatedRevenueData);
      setTotalPotential("$108.8k");
    }, 1500);
  };
  
  const getSegmentPercentage = (valueStr: string): string => {
    const val = parseFloat(valueStr.replace('$', '').replace('k', ''));
    if (totalNumericValue === 0) return '0.0';
    return ((val / totalNumericValue) * 100).toFixed(1);
  };

  return (
    <div className="w-full aspect-square max-w-[600px] bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-black/50 overflow-hidden border border-slate-100 dark:border-slate-800 flex flex-col relative">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-violet-100/50 dark:bg-violet-900/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-100/50 dark:bg-indigo-900/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      {/* --- HEADER --- */}
      <header className="h-[15%] px-8 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 relative z-10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-slate-800 flex items-center justify-center text-white shadow-lg shadow-slate-200 dark:shadow-black/20">
            <Repeat className="w-5 h-5 text-white dark:text-slate-200" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">Upsell Analysis</h3>
            <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Strategy Opt. Module</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-500" />
        </div>
      </header>

      {/* --- MAIN CONTENT BODY --- */}
      <main className="flex-1 flex flex-col p-6 gap-6 relative z-10 overflow-auto">
        <section className="flex flex-col gap-2">
          <div className="flex items-center justify-between px-2 mb-1">
            <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Target className="w-3 h-3 text-indigo-500" />
              Active Opportunities
            </h4>
            <span className="text-[10px] font-bold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full border border-indigo-100 dark:border-indigo-500/20">3 Live</span>
          </div>
          
          <div className="flex flex-col gap-2">
            {targets.map((target, index) => (
              <motion.div 
                key={target.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + (index * 0.05) }}
                className="p-2.5 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between hover:border-indigo-200 dark:hover:border-indigo-800 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border border-white dark:border-slate-600 shadow-sm overflow-hidden">
                    <img src={target.avatar} alt={target.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-none mb-0.5">{target.name}</p>
                    <p className="text-[10px] text-slate-500 font-medium">{target.role}</p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-lg text-[10px] font-bold border ${target.tierBorder} ${target.tierBg} ${target.tierColor}`}>
                  {target.tier}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- REVENUE CHART --- */}
        <section className="flex-1 bg-slate-50 dark:bg-slate-800/30 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 flex flex-col justify-center gap-3 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
             <TrendingUp className="w-12 h-12 text-slate-400" />
          </div>
          
          <div className="flex items-center justify-between mb-1">
             <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-violet-500" />
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase">Revenue Projection</span>
             </div>
             {selectedSegment !== null && (
               <button 
                onClick={() => setSelectedSegment(null)}
                className="text-[10px] font-bold text-violet-600 dark:text-violet-400 hover:underline"
               >
                 Reset
               </button>
             )}
          </div>

          <div className="space-y-4 relative z-10">
            {revenueSegments.map((segment, index) => (
              <div 
                key={segment.label} 
                className="space-y-1.5 cursor-pointer"
                onClick={() => setSelectedSegment(index === selectedSegment ? null : index)}
              >
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className={selectedSegment === index ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"}>
                    {segment.label}
                  </span>
                  <div className="flex items-center gap-2">
                    <motion.span 
                      key={segment.value}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={selectedSegment === index ? "text-violet-600 dark:text-violet-400 scale-110 transition-transform" : "text-slate-500"}
                    >
                      {segment.value}
                    </motion.span>
                    {selectedSegment === index && (
                       <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-3 h-3 bg-violet-500 rounded-full flex items-center justify-center">
                          <Check className="w-2 h-2 text-white" />
                       </motion.div>
                    )}
                  </div>
                </div>
                
                <div className="relative">
                  <div className="h-3 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ 
                        width: segment.width,
                        opacity: selectedSegment === null || selectedSegment === index ? 1 : 0.3,
                      }}
                      transition={{ duration: 0.8, delay: 0.1 * index }}
                      className={`h-full relative ${segment.color} ${selectedSegment === index ? 'shadow-[0_0_12px_rgba(124,58,237,0.4)] ring-2 ring-violet-500 ring-offset-2 dark:ring-offset-slate-800' : ''}`}
                    />
                  </div>
                  <AnimatePresence>
                    {selectedSegment === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                        className="absolute left-0 -top-12 z-20 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-3 py-2 rounded-lg shadow-xl text-[10px] font-bold flex flex-col min-w-[120px] pointer-events-none border border-slate-700 dark:border-slate-200"
                      >
                        <div className="flex justify-between mb-1">
                          <span className="opacity-70">Contribution:</span>
                          <span className="text-violet-400 dark:text-violet-600">{getSegmentPercentage(segment.value)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="opacity-70">Segment:</span>
                          <span>{segment.label}</span>
                        </div>
                        <div className="absolute bottom-0 left-6 translate-y-1/2 rotate-45 w-2 h-2 bg-slate-900 dark:bg-white border-r border-b border-slate-700 dark:border-slate-200" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>

           <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-[10px] font-semibold text-slate-500">Total Potential</span>
                {selectedSegment !== null && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[9px] text-violet-500 font-bold">
                    Segment focus active
                  </motion.span>
                )}
              </div>
              <AnimatePresence mode="wait">
                <motion.span 
                  key={totalPotential}
                  initial={{ scale: 0.9, opacity: 0, y: 5 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: -5 }}
                  className="text-lg font-black text-slate-800 dark:text-white"
                >
                  {totalPotential}
                </motion.span>
              </AnimatePresence>
           </div>
        </section>

        {/* --- ACTION BUTTONS --- */}
        <section className="grid grid-cols-2 gap-3 h-14 shrink-0">
           <button 
              onClick={handleGenerate}
              disabled={isGenerating || isGenerated}
              className={`rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] ${
                isGenerated 
                ? 'bg-emerald-500 text-white shadow-emerald-500/20' 
                : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100'
              }`}
            >
              {isGenerating ? (
                 <Loader2 className="w-4 h-4 animate-spin" />
              ) : isGenerated ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Done</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-white/20 dark:fill-slate-900/20" />
                  <span>Generate</span>
                </>
              )}
            </button>
            <button 
              onClick={() => setIsScheduled(!isScheduled)}
              className={`rounded-xl font-bold text-xs flex items-center justify-center gap-2 border transition-all active:scale-[0.98] ${
                isScheduled 
                  ? 'bg-indigo-50 dark:bg-indigo-500/20 border-indigo-200 dark:border-indigo-500/50 text-indigo-700 dark:text-indigo-300' 
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              {isScheduled ? (
                <>
                  <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Booked</span>
                </>
              ) : (
                <>
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>Schedule</span>
                </>
              )}
            </button>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="h-[15%] bg-slate-50/80 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 backdrop-blur-md px-8 flex items-center justify-between shrink-0">
        <div className="flex flex-col">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">System Status</span>
          <div className="flex items-center gap-1.5">
            <motion.div 
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ repeat: Infinity, duration: 2, repeatType: "mirror" as const }}
              className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
            />
            <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">Live Engine</span>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
           <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Latency</span>
           <span className="text-[10px] font-mono font-bold text-slate-600 dark:text-slate-300">24ms</span>
        </div>
      </footer>
    </div>
  );
}
