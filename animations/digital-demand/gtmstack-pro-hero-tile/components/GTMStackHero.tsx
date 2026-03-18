
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, 
  Layers, 
  BarChart3, 
  Globe, 
  Zap, 
  Target, 
  Share2,
  ChevronRight,
  X,
} from 'lucide-react';

/**
 * GTMStackHero - A premium 600x600 square hero tile.
 * Visualizes the transition from operational chaos to a structured GTM stack.
 */

// Module Configuration
const MODULE_WIDTH_STACK = 320;
const MODULE_HEIGHT_STACK = 48;
const MODULE_SIZE_CHAOS = 44;

const CHAOS_POSITIONS = [
  { x: 100, y: 140, r: 12 }, { x: 440, y: 110, r: -8 },
  { x: 70, y: 340, r: 35 }, { x: 480, y: 380, r: -15 },
  { x: 180, y: 480, r: 8 }, { x: 340, y: 70, r: -12 },
  { x: 460, y: 240, r: 25 },
];

const COLORS = [
  'bg-gradient-to-br from-blue-500 to-blue-700', 'bg-gradient-to-br from-violet-500 to-violet-700',
  'bg-gradient-to-br from-emerald-500 to-emerald-700', 'bg-gradient-to-br from-amber-500 to-orange-600',
  'bg-gradient-to-br from-cyan-500 to-cyan-700', 'bg-gradient-to-br from-rose-500 to-rose-700',
  'bg-gradient-to-br from-purple-500 to-indigo-700',
];

const ICONS = [Database, Globe, Share2, Zap, Layers, Target, BarChart3];
const LABELS = [
  'Unified Data Layer', 'Global Reach Network', 'Deep Integrations', 
  'GTM Automation', 'Stack Orchestration', 'Precision Targeting', 'Predictive Analytics'
];

// Types
enum Phase { CHAOS = 'CHAOS', ROUTES = 'ROUTES', STACK = 'STACK' }
interface Module {
  id: string;
  label: string;
  chaosX: number;
  chaosY: number;
  chaosR: number;
  index: number;
  color: string;
  Icon: React.ElementType;
}

export default function GTMStackHero() {
  const [phase, setPhase] = useState<Phase>(Phase.CHAOS);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const sequence = () => {
      setPhase(Phase.CHAOS);
      timeout = setTimeout(() => {
        setPhase(Phase.ROUTES);
        timeout = setTimeout(() => {
          setPhase(Phase.STACK);
          timeout = setTimeout(sequence, 5000);
        }, 2500);
      }, 3000);
    };
    sequence();
    return () => clearTimeout(timeout);
  }, []);

  const modules = useMemo((): Module[] => {
    return CHAOS_POSITIONS.map((pos, index) => ({
      id: `mod-${index}`,
      label: LABELS[index],
      chaosX: pos.x,
      chaosY: pos.y,
      chaosR: pos.r,
      index,
      color: COLORS[index],
      Icon: ICONS[index],
    }));
  }, []);

  return (
    <>
      <div className="w-full aspect-square max-w-[600px] flex items-center justify-center bg-slate-950 overflow-hidden relative border border-slate-800 rounded-3xl shadow-2xl">
        {/* Background Grid */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #334155 1px, transparent 0)`, backgroundSize: '32px 32px' }} />
          <svg className="absolute inset-0 w-full h-full">
            <circle cx="300" cy="300" r="250" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="8 8" />
            <circle cx="300" cy="300" r="150" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
          </svg>
        </div>

        {/* Networking Routes */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <svg width="600" height="600" viewBox="0 0 600 600">
            <AnimatePresence>
              {(phase === Phase.ROUTES || phase === Phase.CHAOS) && modules.map((m, i) => {
                const next = modules[(i + 1) % modules.length];
                const isActive = phase === Phase.ROUTES;
                return (
                  <motion.path
                    key={`route-${m.id}`}
                    d={`M ${m.chaosX + 22} ${m.chaosY + 22} Q 300 300 ${next.chaosX + 22} ${next.chaosY + 22}`}
                    stroke="#22d3ee" fill="none"
                    initial={{ pathLength: 0, opacity: 0, strokeWidth: 0.1 }}
                    animate={{ 
                      pathLength: isActive ? [0, 1] : [0],
                      opacity: isActive ? [0, 0.6, 0.2] : [0.1, 0.05],
                      strokeWidth: isActive ? [0.5, 2, 0.5] : [0.1]
                    }}
                    exit={{ opacity: [0.1, 0] }}
                    transition={{ duration: 2, repeat: isActive ? Infinity : 0, repeatType: "loop" as const }}
                  />
                );
              })}
            </AnimatePresence>
          </svg>
        </div>

        {/* Header */}
        <div className="absolute top-10 inset-x-0 z-30 text-center pointer-events-none px-6">
          <motion.div animate={{ opacity: [0, 1], y: [-10, 0] }} transition={{ duration: 1 }}>
            <h2 className="text-2xl font-bold text-white tracking-tight">From Chaos to Clarity</h2>
            <div className="mt-2 flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-widest">
              <motion.span animate={{ color: phase === Phase.CHAOS ? '#94a3b8' : phase === Phase.ROUTES ? '#22d3ee' : '#64748b' }} className="transition-colors duration-500">Chaos</motion.span>
              <ChevronRight size={12} className="text-slate-700" />
              <motion.span animate={{ color: phase === Phase.ROUTES ? '#22d3ee' : '#64748b' }} className="transition-colors duration-500">Mapping</motion.span>
              <ChevronRight size={12} className="text-slate-700" />
              <motion.span animate={{ color: phase === Phase.STACK ? '#ffffff' : '#64748b' }} className="transition-colors duration-500">The Stack</motion.span>
            </div>
          </motion.div>
        </div>

        {/* Modules */}
        <div className="absolute inset-0 z-20">
          {modules.map((m) => {
            const isStack = phase === Phase.STACK;
            const stackY = 160 + m.index * (MODULE_HEIGHT_STACK + 10);
            const stackX = (600 - MODULE_WIDTH_STACK) / 2;

            return (
              <motion.div
                key={m.id}
                initial={false}
                animate={{
                  x: isStack ? stackX : m.chaosX, y: isStack ? stackY : m.chaosY,
                  width: isStack ? MODULE_WIDTH_STACK : MODULE_SIZE_CHAOS, height: isStack ? MODULE_HEIGHT_STACK : MODULE_SIZE_CHAOS,
                  rotate: isStack ? 0 : m.chaosR, borderRadius: isStack ? 8 : 12,
                }}
                transition={{ type: "spring", stiffness: 45, damping: 15, mass: 1, delay: isStack ? m.index * 0.08 : 0 }}
                onClick={() => isStack && setSelectedModule(m)}
                className={`absolute flex items-center overflow-hidden shadow-xl border border-white/20 ${m.color} ${isStack ? 'cursor-pointer transition-all duration-300 hover:border-cyan-400/50 hover:shadow-cyan-400/20' : ''}`}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                <div className="flex items-center w-full px-3 gap-3">
                  <motion.div className="flex items-center justify-center shrink-0" animate={{ width: isStack ? 24 : MODULE_SIZE_CHAOS - 24, height: isStack ? 24 : MODULE_SIZE_CHAOS - 24 }}>
                    <m.Icon className="text-white drop-shadow-md" size={isStack ? 18 : 22} />
                  </motion.div>
                  {isStack && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + m.index * 0.05 }} className="flex flex-col overflow-hidden">
                      <span className="text-white text-[13px] font-semibold whitespace-nowrap tracking-wide">{m.label}</span>
                      <span className="text-white/60 text-[10px] uppercase font-bold tracking-tighter">Integrated & Optimized</span>
                    </motion.div>
                  )}
                </div>
                {!isStack && <div className="absolute inset-0 opacity-10 pointer-events-none"><div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(45deg, white 25%, transparent 25%, transparent 50%, white 50%, white 75%, transparent 75%, transparent)', backgroundSize: '4px 4px' }} /></div>}
              </motion.div>
            );
          })}
        </div>

        {/* Footer elements */}
        <div className="absolute bottom-10 inset-x-0 flex justify-center gap-2 z-30">
          {[Phase.CHAOS, Phase.ROUTES, Phase.STACK].map((p) => (
            <motion.div key={p} animate={{ width: phase === p ? 24 : 6, opacity: phase === p ? [0.5, 1] : [0.3], backgroundColor: phase === p ? '#22d3ee' : '#334155' }} className="h-1.5 rounded-full" />
          ))}
        </div>
        <motion.div className="absolute bottom-4 text-[10px] text-slate-600 font-medium tracking-[0.2em] uppercase" animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" as const }}>GTMStack Strategic Visualization</motion.div>
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedModule && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              backgroundColor: ["rgba(0, 0, 0, 0.6)", "rgba(0, 0, 0, 0.7)", "rgba(0, 0, 0, 0.6)"]
            }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.3 },
              backgroundColor: {
                duration: 3,
                repeat: Infinity,
                repeatType: "mirror" as const,
              }
            }}
            onClick={() => setSelectedModule(null)}
            className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300, mass: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-slate-900/70 border border-slate-700 rounded-2xl p-8 shadow-2xl text-white"
            >
              <button onClick={() => setSelectedModule(null)} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors" aria-label="Close modal">
                <X size={24} />
              </button>
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${selectedModule.color}`}>
                  <selectedModule.Icon size={28} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight">{selectedModule.label}</h3>
              </div>
              <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <p>This module provides a comprehensive solution for its designated function within the GTMStack ecosystem. It integrates seamlessly with other stack components to deliver actionable insights and streamline operations.</p>
                <p>By leveraging this component, teams can achieve unprecedented alignment, accelerate key processes, and drive predictable outcomes. The system is designed for scalability and can be customized to fit unique business requirements.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
