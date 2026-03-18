
'use client';

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings2, X, Zap, GitBranch, Mail, RefreshCw, Bell, CheckCircle2 
} from 'lucide-react';

/**
 * ROLE: Expert React & Framer Motion Migration Engineer.
 * GOAL: Enhanced "SaaS Premium" visualization with advanced node connection effects.
 */

// --- Constants (Animation Timing) ---
const T_A = 850;   // trigger -> router
const T_B = 950;   // router -> journey
const T_C = 1100;  // journey -> qualified or fade
const T_CLEAN = 3400;

interface Point { x: number; y: number; }

interface NodePositions {
  trigger: Point;
  router: Point;
  nurture: Point;
  reengage: Point;
  notify: Point;
  outcome: Point;
}

interface LiveStats {
  in: number;
  routed: number;
  nurture: number;
  reengage: number;
  notify: number;
  qualified: number;
}

interface Config {
  maxDots: number;
  pEngage: number;
  pQualify: number;
  wNurture: number;
  wReengage: number;
  animationSpeed: number;
}

interface Theme {
  trigger: string;
  router: string;
  nurture: string;
  reengage: string;
  notify: string;
  qualified: string;
}

// --- Helpers ---
const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// FIX: Define getCenter helper function to resolve reference errors.
const getCenter = (el: HTMLElement, container: HTMLElement): Point => {
  const elRect = el.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  return {
    x: elRect.left + elRect.width / 2 - containerRect.left,
    y: elRect.top + elRect.height / 2 - containerRect.top,
  };
};

export default function MarketingAutomation() {
  // --- Refs ---
  const flowRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const routerRef = useRef<HTMLDivElement>(null);
  const nurtureRef = useRef<HTMLDivElement>(null);
  const reengageRef = useRef<HTMLDivElement>(null);
  const notifyRef = useRef<HTMLDivElement>(null);
  const outcomeRef = useRef<HTMLDivElement>(null);
  const dotsLayerRef = useRef<HTMLDivElement>(null);
  const linesLayerRef = useRef<HTMLDivElement>(null);
  const activeAnimationsRef = useRef<Set<Animation>>(new Set());

  // --- State ---
  const [events, setEvents] = useState(0);
  const [engaged, setEngaged] = useState(0);
  const [qualified, setQualified] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState<'config' | 'theme'>('config');
  const [nodePositions, setNodePositions] = useState<NodePositions | null>(null);

  const [config, setConfig] = useState<Config>({
    maxDots: 18,
    pEngage: 0.62,
    pQualify: 0.36,
    wNurture: 0.44,
    wReengage: 0.36,
    animationSpeed: 1,
  });

  const [theme, setTheme] = useState<Theme>({
    trigger: '#94a3b8', 
    router: '#38bdf8',  
    nurture: '#6366f1', 
    reengage: '#0ea5e9', 
    notify: '#10b981',   
    qualified: '#22c55e', 
  });

  // Update node positions for background lines
  const updatePositions = useCallback(() => {
    if (!flowRef.current || !triggerRef.current || !routerRef.current || !nurtureRef.current || !reengageRef.current || !notifyRef.current || !outcomeRef.current) return;
    
    const flow = flowRef.current;
    const getPos = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      const c = flow.getBoundingClientRect();
      return { x: r.left + r.width / 2 - c.left, y: r.top + r.height / 2 - c.top };
    };

    setNodePositions({
      trigger: getPos(triggerRef.current),
      router: getPos(routerRef.current),
      nurture: getPos(nurtureRef.current),
      reengage: getPos(reengageRef.current),
      notify: getPos(notifyRef.current),
      outcome: getPos(outcomeRef.current),
    });
  }, []);

  useEffect(() => {
    updatePositions();
    const handleResize = () => updatePositions();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updatePositions]);

  // Performance Optimization: Cache refs for simulation loop
  const configRef = useRef(config);
  const themeRef = useRef(theme);
  useEffect(() => { configRef.current = config; }, [config]);
  useEffect(() => { themeRef.current = theme; }, [theme]);

  const liveStatsRef = useRef<LiveStats>({
    in: 0, routed: 0, nurture: 0, reengage: 0, notify: 0, qualified: 0
  });
  const [liveStatsDisplay, setLiveStatsDisplay] = useState<LiveStats>({
    in: 0, routed: 0, nurture: 0, reengage: 0, notify: 0, qualified: 0
  });

  const updateLiveUI = useCallback(() => {
    setLiveStatsDisplay({ ...liveStatsRef.current });
  }, []);

  // Effect to control playback rate of all imperative animations
  useEffect(() => {
    activeAnimationsRef.current.forEach(anim => {
      anim.playbackRate = config.animationSpeed;
    });
  }, [config.animationSpeed]);


  // --- Particle Simulation Logic ---
  useEffect(() => {
    let isActive = true;
    let timeoutId: any;

    const manageAnimation = (anim: Animation) => {
      anim.playbackRate = configRef.current.animationSpeed;
      activeAnimationsRef.current.add(anim);
      anim.onfinish = () => {
        activeAnimationsRef.current.delete(anim);
      };
      return anim;
    };

    const spawnLine = (x1: number, y1: number, x2: number, y2: number, color: string) => {
      if (!linesLayerRef.current) return;
      const dx = x2 - x1;
      const dy = y2 - y1;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const ang = Math.atan2(dy, dx) * 180 / Math.PI;
      const line = document.createElement("div");
      Object.assign(line.style, {
        position: "absolute", height: "1px", transformOrigin: "left center", opacity: "0",
        pointerEvents: "none", filter: "drop-shadow(0 0 8px rgba(255,255,255,0.1))",
        left: `${x1}px`, top: `${y1}px`, width: `${dist}px`,
        transform: `rotate(${ang}deg)`, background: color
      });
      linesLayerRef.current.appendChild(line);
      const anim = manageAnimation(line.animate([
        { opacity: 0 }, { opacity: 0.5, offset: 0.25 }, { opacity: 0 }
      ], { duration: 820 }));
      anim.onfinish = () => {
        activeAnimationsRef.current.delete(anim);
        if (line.parentElement) line.remove();
      };
    };

    const spawnDot = async () => {
      if (!isActive || !flowRef.current || !dotsLayerRef.current || dotsLayerRef.current.childElementCount >= configRef.current.maxDots) return;
      
      const { pEngage, pQualify } = configRef.current;
      const currentTheme = themeRef.current;
      const nodes = { trigger: triggerRef.current, router: routerRef.current, nurture: nurtureRef.current, reengage: reengageRef.current, notify: notifyRef.current, outcome: outcomeRef.current };
      if (Object.values(nodes).some(n => !n)) return;

      const flow = flowRef.current;
      const start = getCenter(nodes.trigger!, flow);
      const mid = getCenter(nodes.router!, flow);
      const chooseRoute = () => {
        const r = Math.random();
        const { wNurture, wReengage } = configRef.current;
        if (r < wNurture) return "nurture";
        if (r < wNurture + wReengage) return "reengage";
        return "notify";
      };
      const route = chooseRoute();
      const j = getCenter(nodes[route as keyof typeof nodes]!, flow);
      const sink = getCenter(nodes.outcome!, flow);
      
      setEvents(prev => prev + 1);
      liveStatsRef.current.in++;
      updateLiveUI();

      const dot = document.createElement("div");
      Object.assign(dot.style, {
        position: "absolute", width: "8px", height: "8px", borderRadius: "999px", pointerEvents: "none", zIndex: "80",
        left: `${start.x - 4}px`, top: `${start.y - 4}px`, opacity: "0", background: "rgba(255,255,255,0.9)",
        boxShadow: "0 0 12px rgba(255,255,255,0.2)", transition: "background 300ms, box-shadow 300ms, opacity 300ms"
      });
      dotsLayerRef.current.appendChild(dot);

      await manageAnimation(dot.animate([{ transform: "scale(0.5)", opacity: 0 }, { transform: "scale(1)", opacity: 1, offset: 0.1 }], { duration: 300 })).finished;
      if (!isActive) { dot.remove(); return; }

      spawnLine(start.x, start.y, mid.x, mid.y, `linear-gradient(90deg, transparent, ${hexToRgba(currentTheme.trigger, 0.3)}, transparent)`);
      await manageAnimation(dot.animate([{ transform: "translate(0px, 0px)" }, { transform: `translate(${(mid.x - start.x)}px, ${(mid.y - start.y)}px)` }], { duration: T_A, fill: "forwards" })).finished;
      if (!isActive) { dot.remove(); return; }

      liveStatsRef.current.in = Math.max(0, liveStatsRef.current.in - 1);
      liveStatsRef.current.routed++;
      updateLiveUI();
      const journeyColor = currentTheme[route as keyof Theme];
      dot.style.background = journeyColor;
      dot.style.boxShadow = `0 0 14px ${hexToRgba(journeyColor, 0.4)}`;
      
      spawnLine(mid.x, mid.y, j.x, j.y, `linear-gradient(90deg, transparent, ${hexToRgba(journeyColor, 0.2)}, transparent)`);
      await manageAnimation(dot.animate([{ transform: `translate(${(mid.x - start.x)}px, ${(mid.y - start.y)}px)` }, { transform: `translate(${(j.x - start.x)}px, ${(j.y - start.y)}px)` }], { duration: T_B, fill: "forwards" })).finished;
      if (!isActive) { dot.remove(); return; }

      liveStatsRef.current.routed = Math.max(0, liveStatsRef.current.routed - 1);
      (liveStatsRef.current[route as keyof LiveStats] as number)++;
      const isEngaged = Math.random() < pEngage;
      if (isEngaged) setEngaged(prev => prev + 1);
      updateLiveUI();

      const isQualified = isEngaged && (Math.random() < pQualify);
      const qualColor = currentTheme.qualified;
      spawnLine(j.x, j.y, sink.x, sink.y, isQualified ? `linear-gradient(90deg, transparent, ${hexToRgba(qualColor, 0.3)}, transparent)` : "linear-gradient(90deg, transparent, rgba(148,163,184,0.1), transparent)");
      await manageAnimation(dot.animate([{ transform: `translate(${(j.x - start.x)}px, ${(j.y - start.y)}px)`, opacity: isEngaged ? 1 : 0.3 }, { transform: `translate(${(sink.x - start.x)}px, ${(sink.y - start.y)}px) scale(${isQualified ? 1.2 : 0.8})`, opacity: isQualified ? 1 : 0 }], { duration: T_C, fill: "forwards" })).finished;
      
      (liveStatsRef.current[route as keyof LiveStats] as number)--;
      if (isQualified) {
        setQualified(prev => prev + 1);
        liveStatsRef.current.qualified++;
        updateLiveUI();
        setTimeout(() => {
          liveStatsRef.current.qualified = Math.max(0, liveStatsRef.current.qualified - 1);
          updateLiveUI();
        }, 800);
      }
      if (dot.parentElement) dot.remove();
    };

    const loop = () => {
      if (!isActive) return;
      const speed = configRef.current.animationSpeed;
      if (speed > 0) {
        spawnDot();
        const base = 750 / speed;
        const jitter = (Math.random() * 200 - 100) / speed;
        timeoutId = setTimeout(loop, Math.max(450 / speed, base + jitter));
      }
    };

    loop();
    return () => {
      isActive = false;
      clearTimeout(timeoutId);
      activeAnimationsRef.current.forEach(anim => anim.cancel());
      activeAnimationsRef.current.clear();
    };
  }, [config.animationSpeed, updateLiveUI]);

  const rate = useMemo(() => events > 0 ? Math.round((qualified / events) * 100) : 0, [events, qualified]);

  return (
    <div className="w-full aspect-square max-w-[600px] flex justify-center items-center bg-[#0b1224] overflow-hidden p-6 font-sans">
      <div className="relative w-full h-full rounded-[32px] overflow-hidden border border-white/5 bg-[#070c18] shadow-[0_32px_128px_rgba(0,0,0,0.6)] flex flex-col p-6">
        
        {/* Organic Background Wash */}
        <motion.div 
          className="pointer-events-none absolute top-1/2 left-1/2 w-[250%] h-[250%] opacity-20"
          style={{ 
            background: `radial-gradient(circle at 30% 30%, ${hexToRgba(theme.router, 0.1)} 0%, ${hexToRgba(theme.nurture, 0.08)} 25%, ${hexToRgba(theme.qualified, 0.06)} 50%, transparent 75%)`,
            x: "-50%", y: "-50%"
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: config.animationSpeed > 0 ? 60 / config.animationSpeed : 1_000_000, repeat: Infinity, repeatType: "loop" as const }}
        />

        {/* Header */}
        <div className="relative z-20 flex items-start justify-between mb-4">
          <div>
            <h1 className="text-white font-bold text-xl tracking-tight leading-none">Campaign Flow</h1>
            <p className="text-slate-400 text-xs font-medium uppercase tracking-widest mt-1.5 opacity-60">Automation Matrix v2.4</p>
          </div>
          <div className="flex items-center gap-3">
             <button 
              onClick={() => setShowSettings(true)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all active:scale-90"
             >
               <Settings2 size={18} />
             </button>
            <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 flex items-center gap-2 backdrop-blur-md">
              <motion.span 
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: theme.qualified }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: config.animationSpeed > 0 ? 1.5 / config.animationSpeed : 1_000_000, repeat: Infinity, repeatType: "mirror" as const }}
              />
              <span className="text-[10px] font-black uppercase tracking-widest text-white/80">Live</span>
            </div>
          </div>
        </div>

        {/* Workflow Diagram */}
        <div className="relative z-10 flex-1 rounded-2xl overflow-hidden bg-black/20 border border-white/5 shadow-inner">
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible opacity-40">
            <defs>
              <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" /><stop offset="20%" stopColor="rgba(255,255,255,0)" /><stop offset="50%" stopColor="rgba(255,255,255,0.7)" /><stop offset="80%" stopColor="rgba(255,255,255,0)" /><stop offset="100%" stopColor="transparent" />
              </linearGradient>
              <filter id="enhanced-glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2" result="blur"/><feComposite in="SourceGraphic" in2="blur" operator="over"/></filter>
            </defs>
            {nodePositions && (
              <g filter="url(#enhanced-glow)">
                {([
                  [nodePositions.trigger, nodePositions.router, theme.router], [nodePositions.router, nodePositions.nurture, theme.nurture], [nodePositions.router, nodePositions.reengage, theme.reengage],
                  [nodePositions.router, nodePositions.notify, theme.notify], [nodePositions.nurture, nodePositions.outcome, theme.qualified], [nodePositions.reengage, nodePositions.outcome, theme.qualified],
                  [nodePositions.notify, nodePositions.outcome, theme.qualified],
                ] as [Point, Point, string][]).map(([p1, p2, color], i) => (
                  <React.Fragment key={i}>
                    <motion.path d={`M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`} stroke={color} strokeWidth="1" fill="none"
                      animate={{ strokeOpacity: [0.08, 0.2, 0.08] }}
                      transition={{ duration: config.animationSpeed > 0 ? (4 + i * 0.3) / config.animationSpeed : 1_000_000, repeat: Infinity, repeatType: "mirror" as const, delay: i * 0.2 }}
                    />
                    <motion.path d={`M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`} stroke="url(#flow-gradient)" strokeWidth="1.8" fill="none"
                      initial={{ strokeDasharray: "40, 150", strokeDashoffset: 190 }} animate={{ strokeDashoffset: [-190] }}
                      transition={{ duration: config.animationSpeed > 0 ? (3 + i * 0.4) / config.animationSpeed : 1_000_000, repeat: Infinity, repeatType: "loop" as const }}
                    />
                    <motion.path d={`M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`} stroke="white" strokeWidth="0.8" fill="none"
                      initial={{ strokeDasharray: "2, 80", strokeDashoffset: 82 }} animate={{ strokeDashoffset: [-82], opacity: [0, 0.5, 0] }}
                      transition={{ duration: config.animationSpeed > 0 ? (1.5 + i * 0.2) / config.animationSpeed : 1_000_000, repeat: Infinity, repeatType: "loop" as const, delay: i * 0.1 }}
                    />
                  </React.Fragment>
                ))}
              </g>
            )}
          </svg>

          <div className="absolute inset-0 p-6" ref={flowRef}>
            <div ref={triggerRef} className="absolute left-1/2 -translate-x-1/2 top-4 w-64 h-14 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-between px-4 z-10 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
              <div className="flex items-center gap-3"><div className="p-2 rounded-lg bg-white/5"><Zap size={16} style={{ color: theme.trigger }} /></div><span className="text-sm font-bold text-white/90">Inbound Events</span></div>
              <span className="text-lg font-mono font-bold text-slate-300 tabular-nums">{liveStatsDisplay.in}</span>
            </div>
            <div ref={routerRef} className="absolute left-1/2 -translate-x-1/2 top-24 w-48 h-14 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-between px-4 z-10 shadow-[0_0_20px_rgba(0,0,0,0.3)]" style={{ background: `linear-gradient(135deg, ${hexToRgba(theme.router, 0.1)}, ${hexToRgba(theme.nurture, 0.05)})` }}>
              <div className="flex items-center gap-3"><div className="p-2 rounded-lg bg-white/5"><GitBranch size={16} style={{ color: theme.router }} /></div><span className="text-sm font-bold text-white/90">Router</span></div>
              <span className="text-lg font-mono font-bold text-slate-300 tabular-nums">{liveStatsDisplay.routed}</span>
            </div>
            <div className="absolute left-0 right-0 top-48 flex justify-between gap-2 px-2 z-10">
              <div ref={nurtureRef} className="w-[30%] h-20 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-1 backdrop-blur-sm"><Mail size={16} style={{ color: theme.nurture }} className="opacity-80" /><span className="text-[10px] uppercase tracking-tighter text-slate-400 font-bold">Nurture</span><span className="text-lg font-bold tabular-nums" style={{ color: theme.nurture }}>{liveStatsDisplay.nurture}</span></div>
              <div ref={reengageRef} className="w-[30%] h-20 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-1 backdrop-blur-sm"><RefreshCw size={16} style={{ color: theme.reengage }} className="opacity-80" /><span className="text-[10px] uppercase tracking-tighter text-slate-400 font-bold">Re-engage</span><span className="text-lg font-bold tabular-nums" style={{ color: theme.reengage }}>{liveStatsDisplay.reengage}</span></div>
              <div ref={notifyRef} className="w-[30%] h-20 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-1 backdrop-blur-sm"><Bell size={16} style={{ color: theme.notify }} className="opacity-80" /><span className="text-[10px] uppercase tracking-tighter text-slate-400 font-bold">Notify</span><span className="text-lg font-bold tabular-nums" style={{ color: theme.notify }}>{liveStatsDisplay.notify}</span></div>
            </div>
            <div ref={outcomeRef} className="absolute left-1/2 -translate-x-1/2 bottom-4 w-64 h-16 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-between px-5 z-10 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
               <div className="flex items-center gap-3"><div className="p-2 rounded-xl" style={{ backgroundColor: hexToRgba(theme.qualified, 0.15) }}><CheckCircle2 size={20} style={{ color: theme.qualified }} /></div><div className="text-xs font-black text-white uppercase tracking-widest">Qualified</div></div>
              <div className="text-2xl font-black tabular-nums" style={{ color: theme.qualified }}>{liveStatsDisplay.qualified}</div>
            </div>
            <div className="absolute inset-0 pointer-events-none opacity-40" ref={linesLayerRef} />
            <div className="absolute inset-0 pointer-events-none" ref={dotsLayerRef} />
            <AnimatePresence>
              {showSettings && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute inset-2 z-50 rounded-[24px] bg-[#0b1224]/95 backdrop-blur-2xl border border-white/10 p-6 flex flex-col shadow-2xl"
                >
                  <div className="flex justify-between items-center mb-6"><h2 className="text-white font-bold text-lg">System Configuration</h2><button onClick={() => setShowSettings(false)} className="text-slate-400 hover:text-white transition-colors"><X size={20} /></button></div>
                  <div className="flex gap-4 border-b border-white/5 mb-6">
                    <button onClick={() => setActiveTab('config')} className={`text-xs font-black uppercase tracking-widest pb-3 transition-all ${activeTab === 'config' ? 'text-white border-b-2 border-emerald-500' : 'text-slate-500 hover:text-slate-300'}`}>Simulation</button>
                    <button onClick={() => setActiveTab('theme')} className={`text-xs font-black uppercase tracking-widest pb-3 transition-all ${activeTab === 'theme' ? 'text-white border-b-2 border-emerald-500' : 'text-slate-500 hover:text-slate-300'}`}>Theme</button>
                  </div>
                  <div className="flex-1 overflow-y-auto space-y-6 pr-2">
                    {activeTab === 'config' ? (
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500"><span>Max Concurrent Dots</span><span className="text-white">{config.maxDots}</span></div>
                          <input type="range" min="5" max="40" value={config.maxDots} onChange={(e) => setConfig(p => ({...p, maxDots: parseInt(e.target.value)}))} className="w-full accent-emerald-500 h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500"><span>Engagement Level</span><span className="text-white">{Math.round(config.pEngage * 100)}%</span></div>
                          <input type="range" min="0" max="1" step="0.01" value={config.pEngage} onChange={(e) => setConfig(p => ({...p, pEngage: parseFloat(e.target.value)}))} className="w-full accent-blue-500 h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500"><span>Conversion Yield</span><span className="text-white">{Math.round(config.pQualify * 100)}%</span></div>
                          <input type="range" min="0" max="1" step="0.01" value={config.pQualify} onChange={(e) => setConfig(p => ({...p, pQualify: parseFloat(e.target.value)}))} className="w-full accent-emerald-400 h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                        </div>
                         <div className="space-y-3">
                          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500"><span>Animation Speed</span><span className="text-white">{config.animationSpeed === 0 ? 'Paused' : `${config.animationSpeed.toFixed(1)}x`}</span></div>
                          <input type="range" min="0" max="1" step="0.1" value={config.animationSpeed} onChange={(e) => setConfig(p => ({...p, animationSpeed: parseFloat(e.target.value)}))} className="w-full accent-indigo-500 h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(theme).map(([key, val]) => (
                          <div key={key} className="space-y-2">
                            <label className="text-[9px] font-bold uppercase tracking-widest text-slate-500 block">{key}</label>
                            <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg border border-white/5">
                              <input type="color" value={val} onChange={(e) => setTheme(p => ({...p, [key]: e.target.value}))} className="w-6 h-6 rounded bg-transparent border-none cursor-pointer" />
                              <span className="text-[10px] font-mono text-slate-400 uppercase">{val}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="relative z-20 mt-6 grid grid-cols-3 gap-4">
          <div className="bg-white/5 rounded-2xl p-3 border border-white/5 flex flex-col items-center shadow-lg backdrop-blur-sm"><span className="text-[20px] font-black text-white leading-tight tabular-nums">{events.toLocaleString()}</span><span className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mt-1 opacity-60">Events</span></div>
          <div className="bg-white/5 rounded-2xl p-3 border border-white/5 flex flex-col items-center shadow-lg backdrop-blur-sm"><span className="text-[20px] font-black leading-tight tabular-nums" style={{ color: theme.reengage }}>{engaged.toLocaleString()}</span><span className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mt-1 opacity-60">Engaged</span></div>
          <div className="bg-white/5 rounded-2xl p-3 border border-white/5 flex flex-col items-center shadow-lg backdrop-blur-sm"><span className="text-[20px] font-black leading-tight tabular-nums" style={{ color: theme.qualified }}>{rate}%</span><span className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mt-1 opacity-60">Yield</span></div>
        </div>
      </div>
    </div>
  );
}
