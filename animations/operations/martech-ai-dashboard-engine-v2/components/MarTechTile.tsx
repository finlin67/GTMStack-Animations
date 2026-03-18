'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  Rocket, 
  Users, 
  Mail, 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  AreaChart, 
  Blocks, 
  Activity, 
  Hash,
  RefreshCcw
} from 'lucide-react';

/**
 * Interface for the real-time simulation stats.
 */
interface MarTechStats {
    utilization: number;
    roi: number;
}

/**
 * Animation variants for system nodes.
 * Strictly uses array syntax for keyframes.
 */
const cardVariants: Variants = {
    hidden: { opacity: [0], y: [10] },
    visible: (i: number) => ({
        opacity: [0, 1],
        y: [10, 0],
        transition: {
            delay: i * 0.1,
            duration: 0.4,
        },
    }),
};

/**
 * Animation variants for metric numbers.
 */
const numberVariant: Variants = {
  initial: { opacity: 0, y: 10, filter: 'blur(8px)' },
  animate: { 
      opacity: [0, 1], 
      y: [10, 0], 
      filter: ['blur(8px)', 'blur(0px)'],
      transition: { duration: 0.4 }
  },
  exit: { 
      opacity: [1, 0], 
      y: [0, -10], 
      filter: ['blur(0px)', 'blur(8px)'],
      transition: { duration: 0.2 }
  },
};

export default function MarTechTile() {
    const [stats, setStats] = useState<MarTechStats>({ utilization: 68, roi: 3.7 });
    const [isOptimized, setIsOptimized] = useState<boolean>(true);
    const [isSyncing, setIsSyncing] = useState<boolean>(false);
    
    // Fixed: Replaced NodeJS.Timeout with ReturnType<typeof setTimeout> to avoid namespace errors in browser environments.
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    /**
     * Simulates organic jitter and live data updates without external API calls.
     */
    const simulateDataSync = useCallback(() => {
        setIsSyncing(true);
        
        // Use recursive timeout for organic "jittery" updates
        timeoutRef.current = setTimeout(() => {
            setStats(prev => ({
                utilization: isOptimized 
                    ? Math.min(98, Math.max(60, prev.utilization + (Math.random() - 0.5) * 5))
                    : Math.min(40, Math.max(15, prev.utilization + (Math.random() - 0.5) * 8)),
                roi: isOptimized
                    ? Math.min(5.0, Math.max(3.2, prev.roi + (Math.random() - 0.5) * 0.2))
                    : Math.min(1.8, Math.max(0.5, prev.roi + (Math.random() - 0.5) * 0.3))
            }));
            setIsSyncing(false);
            
            // Re-schedule next update with some randomness
            const nextInterval = 3000 + Math.random() * 4000;
            timeoutRef.current = setTimeout(simulateDataSync, nextInterval);
        }, 800);
    }, [isOptimized]);

    useEffect(() => {
        simulateDataSync();
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [simulateDataSync]);

    const handleToggle = useCallback(() => {
        setIsOptimized(prev => {
            const next = !prev;
            // Clear current scheduled sync to force immediate state transition
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            
            if (next) {
                setStats({ utilization: 72, roi: 3.8 });
            } else {
                setStats({ utilization: 28, roi: 1.1 });
            }
            
            // Restart sync logic
            setTimeout(simulateDataSync, 500);
            return next;
        });
    }, [simulateDataSync]);

    // Path animation configuration
    const flowAnimation = isOptimized ? {
        strokeDasharray: ["4 8"],
        strokeDashoffset: [0, -24],
        transition: {
            strokeDashoffset: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop" as const
            }
        }
    } : {
        strokeDasharray: ["0 0"],
        strokeDashoffset: [0],
        transition: { duration: 0.3 }
    };

    return (
        <div className="w-full aspect-square max-w-[600px] flex justify-center items-center">
            <div className="relative w-full h-full bg-[#16202e] rounded-3xl border border-[#223149] overflow-hidden shadow-2xl flex flex-col">
                
                {/* --- HEADER --- */}
                <div className="h-[12%] min-h-[60px] border-b border-[#223149] bg-[#16202e]/80 backdrop-blur z-30 flex items-center justify-between px-6">
                    <div className="flex items-center gap-3">
                        <div className="relative flex items-center justify-center size-3">
                             <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${isOptimized ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                             <span className={`relative inline-flex rounded-full size-2 ${isOptimized ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                        </div>
                        <div className="text-[10px] sm:text-xs font-bold text-[#90a7cb] uppercase tracking-widest flex items-center gap-2">
                            System: <span className={isOptimized ? 'text-white' : 'text-red-400'}>{isOptimized ? 'OPTIMIZED' : 'DEGRADED'}</span>
                            {isSyncing && (
                                <motion.span 
                                    animate={{ opacity: [0.2, 1, 0.2] }}
                                    className="text-[10px] text-[#3d84f5]"
                                >
                                    (SYNCING)
                                </motion.span>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded bg-[#101722] border border-[#223149]">
                        <RefreshCcw className={`size-3 text-[#5b6e8a] ${isSyncing ? 'animate-spin' : ''}`} />
                        <span className="text-[10px] font-mono text-[#5b6e8a] font-bold">NODE-X-2025</span>
                    </div>
                </div>

                {/* --- BODY (VISUALIZATION) --- */}
                <div className="relative flex-1 w-full overflow-hidden">
                    {/* Background Grid Pattern */}
                    <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #223149 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
                    
                    {/* Data Flow SVGs */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-10" preserveAspectRatio="none" viewBox="0 0 600 400">
                        <motion.path d="M120,80 C120,150 300,100 300,200" fill="none" stroke={isOptimized ? '#3d84f5' : '#4b5563'} strokeWidth="2" animate={flowAnimation} />
                        <motion.path d="M480,80 C480,150 300,100 300,200" fill="none" stroke={isOptimized ? '#3d84f5' : '#4b5563'} strokeWidth="2" animate={flowAnimation} />
                        <motion.path d="M300,200 C300,280 120,250 120,320" fill="none" stroke={isOptimized ? '#0bda5e' : '#ef4444'} strokeWidth="2" animate={flowAnimation} />
                        <motion.path d="M300,200 C300,280 300,250 300,320" fill="none" stroke={isOptimized ? '#0bda5e' : '#ef4444'} strokeWidth="2" animate={flowAnimation} />
                        <motion.path d="M300,200 C300,280 480,250 480,320" fill="none" stroke={isOptimized ? '#0bda5e' : '#ef4444'} strokeWidth="2" animate={flowAnimation} />
                    </svg>

                    {/* Central Core */}
                    <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20" initial={{ scale: 0 }} animate={{ scale: [0, 1] }} transition={{ duration: 0.5 }}>
                        <div className="relative">
                            <motion.div 
                                animate={{ boxShadow: isOptimized ? ['0 0 10px rgba(61, 132, 245, 0.2)', '0 0 30px rgba(61, 132, 245, 0.4)'] : ['0 0 10px rgba(239, 68, 68, 0.2)', '0 0 30px rgba(239, 68, 68, 0.4)'] }}
                                className="size-20 sm:size-24 rounded-full bg-[#16202e] border-2 border-[#3d84f5] flex items-center justify-center relative z-20 transition-colors duration-500"
                            >
                                <Rocket className={`size-8 sm:size-10 transition-colors duration-500 ${isOptimized ? 'text-[#3d84f5]' : 'text-red-500'}`} />
                            </motion.div>
                            {/* Fixed: cast repeatType to const as required for Framer Motion v12 */}
                            <motion.div className={`absolute inset-0 rounded-full border ${isOptimized ? 'border-[#3d84f5]' : 'border-red-500'} opacity-20`} animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0, 0.2] }} transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" as const }} />
                        </div>
                    </motion.div>

                    {/* Service Nodes */}
                    <motion.div custom={1} initial="hidden" animate="visible" variants={cardVariants} className="absolute top-[10%] left-[10%] z-20 flex flex-col items-center gap-2">
                         <div className="p-2 sm:p-3 bg-[#223149] rounded-xl border border-[#314668] shadow-lg">
                            <Users className="text-white size-4 sm:size-5" />
                         </div>
                         <div className="px-2 py-1 bg-[#101722]/80 rounded border border-[#314668] backdrop-blur text-[8px] sm:text-[10px] font-bold text-white tracking-tight">CRM Hub</div>
                    </motion.div>

                    <motion.div custom={1.2} initial="hidden" animate="visible" variants={cardVariants} className="absolute top-[10%] right-[10%] z-20 flex flex-col items-center gap-2">
                         <div className="p-2 sm:p-3 bg-[#223149] rounded-xl border border-[#314668] shadow-lg">
                            <Mail className="text-white size-4 sm:size-5" />
                         </div>
                         <div className="px-2 py-1 bg-[#101722]/80 rounded border border-[#314668] backdrop-blur text-[8px] sm:text-[10px] font-bold text-white tracking-tight">Email Flow</div>
                    </motion.div>

                    <motion.div custom={1.4} initial="hidden" animate="visible" variants={cardVariants} className="absolute bottom-[10%] left-[8%] z-20 flex flex-col-reverse items-center gap-2">
                         <div className="p-2 sm:p-3 bg-[#223149] rounded-xl border border-[#314668] shadow-lg">
                            <Activity className="text-white size-4 sm:size-5" />
                         </div>
                         <div className="px-2 py-1 bg-[#101722]/80 rounded border border-[#314668] backdrop-blur text-[8px] sm:text-[10px] font-bold text-white tracking-tight">System Logs</div>
                    </motion.div>

                    <motion.div custom={1.5} initial="hidden" animate="visible" variants={cardVariants} className="absolute bottom-[10%] left-1/2 -translate-x-1/2 z-20 flex flex-col-reverse items-center gap-2">
                         <motion.div 
                            animate={{ borderColor: isOptimized ? 'rgba(61, 132, 245, 0.5)' : 'rgba(239, 68, 68, 0.5)' }}
                            className="p-2 sm:p-3 bg-[#16202e] rounded-xl border border-[#3d84f5]/30 shadow-lg relative overflow-hidden"
                        >
                            <AreaChart className="text-white size-4 sm:size-5 relative z-10" />
                            <svg className="absolute bottom-0 left-0 w-full h-8 opacity-20" viewBox="0 0 40 20" preserveAspectRatio="none">
                                <motion.path d="M0,15 L10,10 L20,12 L30,5 L40,10" fill="none" stroke="currentColor" strokeWidth="2"
                                    animate={{ d: isOptimized ? ["M0,15", "M0,15 L10,5 L20,12 L30,2 L40,10"] : ["M0,10", "M0,10 L10,15 L20,18 L30,15 L40,20"] }}
                                    transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" as const }}
                                    className={isOptimized ? 'text-[#3d84f5]' : 'text-red-500'}
                                />
                            </svg>
                         </motion.div>
                         <div className="px-2 py-1 bg-[#101722]/80 rounded border border-[#314668] backdrop-blur text-[8px] sm:text-[10px] font-bold text-white tracking-tight">Analytics</div>
                    </motion.div>

                    <motion.div custom={1.6} initial="hidden" animate="visible" variants={cardVariants} className="absolute bottom-[10%] right-[8%] z-20 flex flex-col-reverse items-center gap-2">
                         <div className="p-2 sm:p-3 bg-[#223149] rounded-xl border border-[#314668] shadow-lg">
                            <Blocks className="text-white size-4 sm:size-5" />
                         </div>
                         <div className="px-2 py-1 bg-[#101722]/80 rounded border border-[#314668] backdrop-blur text-[8px] sm:text-[10px] font-bold text-white tracking-tight">Assets</div>
                    </motion.div>
                </div>

                {/* --- FOOTER (METRICS) --- */}
                <div className="h-[20%] min-h-[100px] bg-[#101722] border-t border-[#223149] z-30 grid grid-cols-3 divide-x divide-[#223149]">
                    <div className="flex flex-col items-center justify-center p-2 relative overflow-hidden group">
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity ${isOptimized ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                        <div className="text-[9px] sm:text-[10px] text-[#90a7cb] uppercase font-bold tracking-wider mb-1">Efficiency</div>
                        <div className="flex items-center gap-1.5">
                            {isOptimized ? <TrendingUp className="size-4 text-[#0bda5e]" /> : <TrendingDown className="size-4 text-red-500" />}
                            <AnimatePresence mode="wait">
                                <motion.span key={`util-${isOptimized}-${Math.round(stats.utilization)}`} variants={numberVariant} initial="initial" animate="animate" exit="exit" className="text-lg sm:text-2xl font-bold text-white tabular-nums">
                                    {Math.round(stats.utilization)}%
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center p-2 gap-2 bg-[#0b0f17]">
                        <div className="text-[8px] sm:text-[9px] text-[#5b6e8a] font-bold uppercase tracking-widest text-center">Engine Control</div>
                        <button 
                            className="flex items-center gap-2 focus:outline-none group"
                            onClick={handleToggle}
                        >
                             <span className={`text-[9px] sm:text-[10px] font-bold transition-colors ${!isOptimized ? 'text-white' : 'text-[#5b6e8a]'}`}>SAFE</span>
                             <div className={`w-10 h-5 sm:w-12 sm:h-6 flex items-center rounded-full p-1 transition-all ${isOptimized ? 'bg-[#3d84f5] shadow-[0_0_15px_rgba(61,132,245,0.6)]' : 'bg-[#223149]'}`}>
                                <motion.div 
                                    className="size-3 sm:size-4 bg-white rounded-full shadow-md" 
                                    layout 
                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }} 
                                />
                             </div>
                             <span className={`text-[9px] sm:text-[10px] font-bold transition-colors ${isOptimized ? 'text-white' : 'text-[#5b6e8a]'}`}>BOOST</span>
                        </button>
                    </div>

                    <div className="flex flex-col items-center justify-center p-2 relative overflow-hidden group">
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity ${isOptimized ? 'bg-[#3d84f5]' : 'bg-red-500'}`}></div>
                        <div className="text-[9px] sm:text-[10px] text-[#90a7cb] uppercase font-bold tracking-wider mb-1">Impact Factor</div>
                        <div className="flex items-center gap-1.5">
                            <Wallet className={`size-4 ${isOptimized ? 'text-[#3d84f5]' : 'text-red-500'}`} />
                            <AnimatePresence mode="wait">
                                <motion.span key={`roi-${isOptimized}-${stats.roi.toFixed(1)}`} variants={numberVariant} initial="initial" animate="animate" exit="exit" className="text-lg sm:text-2xl font-bold text-white tabular-nums">
                                    {Number(stats.roi).toFixed(1)}x
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Overlay Hex Label */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#223149] rounded-full text-[8px] font-mono text-[#90a7cb] z-40 border border-[#314668] pointer-events-none">
                    ENGINE_STATE::{isOptimized ? 'OX_77' : 'ERR_04'}
                </div>
            </div>
        </div>
    );
}
