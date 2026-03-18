
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Briefcase, Sparkles, ChevronRight, X, BarChart3, Users, Zap } from 'lucide-react';

interface Particle {
  id: number;
  startX: number;
  duration: number;
  engages: boolean;
  becameOpportunity: boolean;
}

interface Stats {
  totalAccounts: number;
  pipelineAccounts: number;
  target: number;
  engaged: number;
  opportunity: number;
}

type StageType = 'target' | 'engaged' | 'opportunity' | null;

export default function ABMFlowTile() {
  const [stats, setStats] = useState<Stats>({
    totalAccounts: 0,
    pipelineAccounts: 0,
    target: 0,
    engaged: 0,
    opportunity: 0,
  });

  const [expandedStage, setExpandedStage] = useState<StageType>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleCounter = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const spawnParticle = useCallback(() => {
    setParticles((prev) => {
      if (prev.length >= 20) return prev; // Slightly higher cap for more energy

      const id = ++particleCounter.current;
      const startX = (Math.random() - 0.5) * 320; 
      const duration = 2.5 + Math.random() * 2; // Dynamic speed
      const engages = Math.random() > 0.55;
      const becameOpportunity = engages && Math.random() > 0.45;

      const newParticle: Particle = {
        id,
        startX,
        duration,
        engages,
        becameOpportunity,
      };

      setStats((s) => ({
        ...s,
        totalAccounts: s.totalAccounts + 1,
        target: s.target + 1,
      }));

      // Synchronized interval for first transition (Target -> Engaged)
      setTimeout(() => {
        setStats((s) => ({
          ...s,
          target: Math.max(0, s.target - 1),
          engaged: engages ? s.engaged + 1 : s.engaged,
        }));
      }, (duration * 1000) * 0.35);

      // Synchronized interval for second transition (Engaged -> Opportunity)
      setTimeout(() => {
        if (engages) {
          setStats((s) => ({
            ...s,
            engaged: Math.max(0, s.engaged - 1),
            opportunity: becameOpportunity ? s.opportunity + 1 : s.opportunity,
            pipelineAccounts: becameOpportunity ? s.pipelineAccounts + 1 : s.pipelineAccounts,
          }));
        }
      }, (duration * 1000) * 0.7);

      // Final removal
      setTimeout(() => {
        setStats((s) => ({
          ...s,
          opportunity: becameOpportunity ? Math.max(0, s.opportunity - 1) : s.opportunity,
        }));
        setParticles((current) => current.filter((p) => p.id !== id));
      }, duration * 1000);

      return [...prev, newParticle];
    });

    const nextSpawn = 800 + Math.random() * 1200;
    setTimeout(spawnParticle, nextSpawn);
  }, []);

  useEffect(() => {
    const timer = setTimeout(spawnParticle, 500);
    return () => clearTimeout(timer);
  }, [spawnParticle]);

  const engagementRate = stats.totalAccounts > 0 
    ? Math.round((stats.pipelineAccounts / stats.totalAccounts) * 100) 
    : 0;

  const toggleStage = (stage: StageType) => {
    setExpandedStage(expandedStage === stage ? null : stage);
  };

  const stageData = {
    target: {
      title: "Targeting Detail",
      color: "orange",
      items: [
        { label: "High Intent", value: "82", icon: BarChart3 },
        { label: "Top Region", value: "NA", icon: Users },
        { label: "Propensity", value: "High", icon: Zap }
      ]
    },
    engaged: {
      title: "Engagement Pulse",
      color: "yellow",
      items: [
        { label: "Web Visits", value: "1.2k", icon: BarChart3 },
        { label: "CTR Avg", value: "4.8%", icon: Users },
        { label: "Active", value: "12m ago", icon: Zap }
      ]
    },
    opportunity: {
      title: "Pipeline Health",
      color: "teal",
      items: [
        { label: "Est. Value", value: "$124k", icon: BarChart3 },
        { label: "Win Prob.", value: "64%", icon: Users },
        { label: "Velocity", value: "14d", icon: Zap }
      ]
    }
  };

  return (
    <div className="relative w-[463px] h-[632px] rounded-none overflow-hidden border-2 border-black shadow-[20px_20px_0px_rgba(0,0,0,0.05)] bg-white flex flex-col p-8 font-[Inter] select-none">
      
      <div className="absolute inset-0 grid-bg pointer-events-none"></div>
      
      <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-black opacity-10 pointer-events-none -mr-12 -mt-12"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-black opacity-10 pointer-events-none -ml-8 -mb-8"></div>

      <div className="relative z-20 flex items-start justify-between mb-8 border-b-2 border-black/5 pb-6">
        <div>
          <h1 className="text-black font-bold text-[24px] tracking-tight uppercase">ABM Flow</h1>
          <p className="text-black/40 text-[10px] font-bold uppercase tracking-[0.3em] mt-1.5 flex items-center gap-2">
            Target <span className="text-[#F2805A] font-black">/</span> Pipeline
          </p>
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="px-4 py-2 rounded-none bg-black flex items-center gap-3"
        >
          <div className="h-2 w-2 rounded-full bg-[#48C0A4] animate-pulse"></div>
          <span className="text-white text-[9px] font-bold uppercase tracking-widest">Live System</span>
        </motion.div>
      </div>

      <motion.div 
        layout
        ref={containerRef} 
        className="relative z-10 flex-1 flex flex-col items-center py-2 gap-4 overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-40">
          <AnimatePresence>
            {!expandedStage && particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ 
                  y: -20, 
                  x: `calc(50% + ${p.startX}px)`, 
                  scale: 0, 
                  opacity: 0 
                }}
                animate={{ 
                  y: [ -20, 160, 320, 480], 
                  x: [
                    `calc(50% + ${p.startX}px)`,
                    `calc(50% + ${p.startX * 0.6}px)`,
                    `calc(50% + ${p.startX * 0.2}px)`,
                    `calc(50% + ${p.startX * 0.05}px)`
                  ],
                  scale: [0, 1.4, 0.8, 0.4],
                  opacity: [0, 1, p.becameOpportunity ? 1 : (p.engages ? 1 : 0.15), 0],
                  backgroundColor: [
                    '#F2805A', 
                    p.engages ? '#F7B92D' : '#F2805A', 
                    p.becameOpportunity ? '#48C0A4' : (p.engages ? '#F7B92D' : '#F2805A'), 
                    p.becameOpportunity ? '#48C0A4' : (p.engages ? '#F7B92D' : '#F2805A')
                  ],
                  boxShadow: [
                    '0 4px 10px rgba(242,128,90,0.3)',
                    p.engages ? '0 4px 10px rgba(247,185,45,0.3)' : '0 4px 10px rgba(242,128,90,0.3)',
                    p.becameOpportunity ? '0 4px 10px rgba(72,192,164,0.3)' : (p.engages ? '0 4px 10px rgba(247,185,45,0.3)' : '0 4px 10px rgba(242,128,90,0.3)'),
                    p.becameOpportunity ? '0 4px 10px rgba(72,192,164,0.3)' : (p.engages ? '0 4px 10px rgba(247,185,45,0.3)' : '0 4px 10px rgba(242,128,90,0.3)')
                  ],
                  filter: [
                    'grayscale(0) brightness(1)',
                    p.engages ? 'grayscale(0) brightness(1)' : 'grayscale(1) brightness(0.8)',
                    p.becameOpportunity ? 'grayscale(0) brightness(1)' : (p.engages ? 'grayscale(0) brightness(1)' : 'grayscale(1) brightness(0.8)'),
                    p.becameOpportunity ? 'grayscale(0) brightness(1)' : (p.engages ? 'grayscale(0) brightness(1)' : 'grayscale(1) brightness(0.8)')
                  ],
                  transition: { 
                    duration: p.duration, 
                    times: [0, 0.25, 0.7, 1],
                    ease: "easeInOut" 
                  } 
                }}
                exit={{ opacity: 0 }}
                className="absolute w-2.5 h-2.5 rounded-none rotate-45"
                style={{
                  willChange: 'transform, opacity, background-color',
                }}
              />
            ))}
          </AnimatePresence>
        </div>

        <StageCard
          type="target"
          count={stats.target}
          icon={Target}
          label="Target"
          phase="Phase 01"
          color="orange"
          isExpanded={expandedStage === 'target'}
          onToggle={() => toggleStage('target')}
          details={stageData.target}
          isHidden={expandedStage !== null && expandedStage !== 'target'}
        />

        <AnimatePresence>
          {!expandedStage && (
            <motion.div 
              layout
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 20 }} 
              exit={{ opacity: 0, height: 0 }}
              className="w-[2px] bg-black/10 shrink-0 relative"
            >
               <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 border border-black/20 bg-white rotate-45"></div>
            </motion.div>
          )}
        </AnimatePresence>

        <StageCard
          type="engaged"
          count={stats.engaged}
          icon={Briefcase}
          label="Engaged"
          phase="Phase 02"
          color="yellow"
          isExpanded={expandedStage === 'engaged'}
          onToggle={() => toggleStage('engaged')}
          details={stageData.engaged}
          width="90%"
          isHidden={expandedStage !== null && expandedStage !== 'engaged'}
        />

        <AnimatePresence>
          {!expandedStage && (
            <motion.div 
              layout
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 20 }} 
              exit={{ opacity: 0, height: 0 }}
              className="w-[2px] bg-black/10 shrink-0 relative"
            >
               <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 border border-black/20 bg-white rotate-45"></div>
            </motion.div>
          )}
        </AnimatePresence>

        <StageCard
          type="opportunity"
          count={stats.opportunity}
          icon={Sparkles}
          label="Opportunity"
          phase="Phase 03"
          color="teal"
          isExpanded={expandedStage === 'opportunity'}
          onToggle={() => toggleStage('opportunity')}
          details={stageData.opportunity}
          width="80%"
          isHidden={expandedStage !== null && expandedStage !== 'opportunity'}
        />
      </motion.div>

      <motion.div 
        layout
        className="relative z-20 grid grid-cols-3 gap-0 mt-8 border-2 border-black bg-black"
      >
        <div className="text-center p-4 bg-white border-r-2 border-black">
          <div className="text-[22px] font-black text-black tabular-nums tracking-tighter">{stats.totalAccounts.toLocaleString()}</div>
          <div className="text-[8px] font-black text-black/40 uppercase tracking-[0.2em] mt-1">Total Units</div>
        </div>
        <div className="text-center p-4 bg-white border-r-2 border-black">
          <motion.div 
            layout
            key={stats.pipelineAccounts}
            className="text-[22px] font-black text-[#48C0A4] tabular-nums tracking-tighter"
          >
            {stats.pipelineAccounts.toLocaleString()}
          </motion.div>
          <div className="text-[8px] font-black text-black/40 uppercase tracking-[0.2em] mt-1">Pipeline</div>
        </div>
        <div className="text-center p-4 bg-white">
          <div className="text-[22px] font-black text-[#F2805A] tabular-nums tracking-tighter">{engagementRate}%</div>
          <div className="text-[8px] font-black text-black/40 uppercase tracking-[0.2em] mt-1">Eff. Rate</div>
        </div>
      </motion.div>
    </div>
  );
}

interface StageCardProps {
  type: StageType;
  count: number;
  icon: any;
  label: string;
  phase: string;
  color: string;
  isExpanded: boolean;
  onToggle: () => void;
  details: any;
  width?: string;
  isHidden?: boolean;
}

function StageCard({ 
  count, 
  icon: Icon, 
  label, 
  phase, 
  color, 
  isExpanded, 
  onToggle, 
  details, 
  width = '100%',
  isHidden 
}: StageCardProps) {
  
  const bgPalette: Record<string, string> = {
    orange: 'bg-[#F2805A]',
    yellow: 'bg-[#F7B92D]',
    teal: 'bg-[#48C0A4]'
  };

  const textPalette: Record<string, string> = {
    orange: 'text-[#F2805A]',
    yellow: 'text-[#F7B92D]',
    teal: 'text-[#48C0A4]'
  };

  return (
    <AnimatePresence mode="popLayout">
      {!isHidden && (
        <motion.button
          layout
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ 
            layout: { type: "spring", stiffness: 400, damping: 40 },
            opacity: { duration: 0.15 }
          }}
          onClick={onToggle}
          style={{ width: isExpanded ? '100%' : width }}
          className={`group relative flex flex-col transition-all duration-300 cursor-pointer overflow-hidden border-2 border-black ${isExpanded ? 'flex-1 asymmetric-card-expanded p-6' : 'h-[104px] items-center justify-between px-7 shrink-0 asymmetric-card'} bg-white hover:bg-[#F9FAFB]`}
        >
          <motion.div 
            layout
            className={`absolute top-0 left-0 w-2 ${bgPalette[color]} ${isExpanded ? 'h-full' : 'h-1/2'}`} 
          />

          <motion.div layout className={`flex items-center w-full justify-between ${isExpanded ? 'mb-8' : ''}`}>
            <motion.div layout className="flex items-center gap-5">
              <motion.div 
                layout
                className={`border-2 border-black flex items-center justify-center text-black shrink-0 transition-all bg-white shadow-[4px_4px_0px_rgba(0,0,0,1)] ${isExpanded ? 'w-10 h-10' : 'w-14 h-14'}`}
              >
                <Icon size={isExpanded ? 18 : 26} strokeWidth={3} className={isExpanded ? textPalette[color] : 'text-black'} />
              </motion.div>
              <motion.div layout className="text-left">
                <motion.span layout className="block text-[10px] font-black text-black/30 uppercase tracking-[0.2em] mb-1">{phase}</motion.span>
                <motion.span layout className="text-[18px] font-black text-black uppercase tracking-tighter">{label}</motion.span>
              </motion.div>
            </motion.div>

            <motion.div layout className="flex items-center gap-4">
              <motion.span 
                layout
                className={`font-black tabular-nums tracking-tighter ${isExpanded ? 'text-[24px] text-black' : `text-[36px] ${textPalette[color]}`}`}
              >
                {count.toLocaleString()}
              </motion.span>
              <motion.div layout className="shrink-0">
                {isExpanded ? (
                  <div className="w-8 h-8 border-2 border-black flex items-center justify-center bg-white shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                    <X size={16} strokeWidth={3} />
                  </div>
                ) : (
                  <ChevronRight size={20} strokeWidth={3} className="text-black/20 group-hover:text-black transition-all transform group-hover:translate-x-1" />
                )}
              </motion.div>
            </motion.div>
          </motion.div>

          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                layout="position"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3, ease: "circOut" }}
                className="flex-1 w-full space-y-4 overflow-hidden flex flex-col"
              >
                <motion.div layout className="flex items-center gap-4 shrink-0">
                  <motion.h3 layout className="text-black font-black text-[11px] uppercase tracking-widest">{details.title}</motion.h3>
                  <motion.div layout className="h-[2px] flex-1 bg-black/5"></motion.div>
                </motion.div>

                <motion.div layout className="grid grid-cols-1 gap-2.5">
                  {details.items.map((item: any, i: number) => (
                    <motion.div 
                      layout
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      className="flex items-center justify-between px-5 py-4 bg-white border-2 border-black/10 hover:border-black transition-all shadow-[2px_2px_0px_rgba(0,0,0,0.05)] hover:shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                    >
                      <div className="flex items-center gap-4">
                        <item.icon size={16} strokeWidth={3} className={textPalette[color]} />
                        <span className="text-[12px] font-black text-black/40 uppercase tracking-tighter">{item.label}</span>
                      </div>
                      <span className="text-[16px] font-black text-black tabular-nums">{item.value}</span>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-auto pt-6 flex gap-4 shrink-0"
                >
                  <button className="flex-1 py-4 border-2 border-black text-[11px] font-black text-black hover:bg-black hover:text-white transition-all uppercase tracking-widest shadow-[4px_4px_0px_rgba(0,0,0,0.1)] active:shadow-none active:translate-x-1 active:translate-y-1">
                    System Logs
                  </button>
                  <button className={`flex-1 py-4 text-[11px] font-black text-white transition-all uppercase tracking-widest ${bgPalette[color]} border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1`}>
                    Process Unit
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
