'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ShieldCheck, Target, TrendingUp } from 'lucide-react';

// --- Constants & Types ---

interface Waypoint {
  x: number;
  y: number;
  name: string;
  chip: string;
  color: string;
  glow: string;
}

const W: Waypoint[] = [
  { x: 60, y: 262, name: 'Discover', chip: 'Phase 1', color: 'rgba(56,189,248,0.95)', glow: 'rgba(56,189,248,0.14)' },
  { x: 128, y: 202, name: 'Align', chip: 'Phase 2', color: 'rgba(99,102,241,0.95)', glow: 'rgba(99,102,241,0.14)' },
  { x: 176, y: 180, name: 'Build', chip: 'Phase 3', color: 'rgba(168,85,247,0.92)', glow: 'rgba(168,85,247,0.14)' },
  { x: 242, y: 136, name: 'Launch', chip: 'Phase 4', color: 'rgba(244,114,182,0.92)', glow: 'rgba(244,114,182,0.12)' },
  { x: 298, y: 142, name: 'Scale', chip: 'Phase 5', color: 'rgba(34,197,94,0.92)', glow: 'rgba(34,197,94,0.12)' },
  { x: 366, y: 224, name: 'Optimize', chip: 'Phase 6', color: 'rgba(245,158,11,0.90)', glow: 'rgba(245,158,11,0.12)' },
];

const DOT_X = [...W.map((w) => w.x), W[W.length - 1].x];
const DOT_Y = [...W.map((w) => w.y), W[W.length - 1].y];
const DOT_SCALE = [0.35, 1, 1, 1, 1, 1, 0.7];
const DOT_OPACITY = [0, 1, 1, 1, 1, 1, 0];
const DOT_TIMES = [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1];

// --- Utilities ---

function clamp(v: number, a: number, b: number): number {
  return Math.max(a, Math.min(b, v));
}

function rand(a: number, b: number): number {
  return a + Math.random() * (b - a);
}

function formatCurrency(v: number): string {
  return '$' + Math.round(v).toLocaleString();
}

// --- Sub-Components ---

const WaypointTooltip = React.memo(function WaypointTooltip({ w, status }: { w: Waypoint; status: string }) {
  return (
    <motion.div
      initial={{ opacity: [0], y: [8], scale: [0.95] }}
      animate={{ opacity: [1], y: [0], scale: [1] }}
      exit={{ opacity: [0], y: [4], scale: [0.95] }}
      transition={{ duration: 0.2 }}
      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-[140px] z-50 pointer-events-none"
    >
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0f172a]/95 p-3 shadow-2xl backdrop-blur-md">
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-50" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-1">
            <span
              className={`text-[9px] font-bold uppercase tracking-wider ${
                status === 'Completed' ? 'text-emerald-400' : status === 'Active' ? 'text-sky-400' : 'text-slate-500'
              }`}
            >
              {status}
            </span>
            <div className={`w-1.5 h-1.5 rounded-full ${
               status === 'Completed' ? 'bg-emerald-400' : status === 'Active' ? 'bg-sky-400 animate-pulse' : 'bg-slate-600'
            }`} />
          </div>
          <div className="text-xs font-bold text-white mb-2">{w.name}</div>
          <div className="flex items-center justify-between border-t border-white/10 pt-2">
            <span className="text-[9px] font-medium text-slate-400">Status</span>
            <span className="text-[9px] font-mono font-semibold text-indigo-300">{w.chip}</span>
          </div>
        </div>
      </div>
      <div className="absolute top-full left-1/2 -mt-px -translate-x-1/2 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#0f172a]/95" />
    </motion.div>
  );
});

const MovingDot = React.memo(function MovingDot({ duration, onComplete }: { duration: number; onComplete: () => void }) {
  return (
    <motion.div
      className="absolute w-[9px] h-[9px] rounded-full pointer-events-none"
      initial={{ 
        x: W[0].x, 
        y: W[0].y, 
        scale: 0.35, 
        opacity: 0, 
        backgroundColor: 'rgba(56,189,248,0.95)',
        boxShadow: '0 0 16px rgba(56,189,248,0.14)'
      }}
      animate={{
        x: DOT_X,
        y: DOT_Y,
        scale: DOT_SCALE,
        opacity: DOT_OPACITY,
      }}
      transition={{
        duration: duration / 1000,
        times: DOT_TIMES,
      }}
      onAnimationComplete={onComplete}
    />
  );
});

const Pulse = React.memo(function Pulse({ id, x, y, color, onRemove }: { id: number; x: number; y: number; color: string; onRemove: (id: number) => void }) {
  return (
    <motion.div
      className="absolute w-[16px] h-[16px] rounded-full pointer-events-none"
      style={{ left: x, top: y, backgroundColor: color }}
      initial={{ x: '-50%', y: '-50%', scale: [0.4], opacity: [0] }}
      animate={{
        scale: [0.4, 1.0, 2.5],
        opacity: [0, 0.52, 0],
      }}
      transition={{ duration: 0.92 }}
      onAnimationComplete={() => onRemove(id)}
    />
  );
});

// --- Main Component ---

export default function GTMStack() {
  const [metrics, setMetrics] = useState({
    momentum: 0,
    pipeline: 52000,
    engagements: 0,
    wins: 0,
  });

  const [routeState, setRouteState] = useState({
    activeIdx: 0,
    doneIdx: 0,
  });

  const [pulses, setPulses] = useState<{ id: number; x: number; y: number; color: string }[]>([]);
  const [tripId, setTripId] = useState(0); 
  const [tripDuration, setTripDuration] = useState(0);
  const [hoveredWaypoint, setHoveredWaypoint] = useState<number | null>(null);
  
  const pulseIdCounter = useRef<number>(0);

  const addPulse = useCallback((x: number, y: number, color: string) => {
    const id = pulseIdCounter.current++;
    setPulses((prev) => [...prev, { id, x, y, color }]);
  }, []);

  const removePulse = useCallback((id: number) => {
    setPulses((prev) => prev.filter((p) => p.id !== id));
  }, []);

  useEffect(() => {
    let timeoutIds: ReturnType<typeof setTimeout>[] = [];

    const runTrip = () => {
      setMetrics((prev) => ({ ...prev, engagements: prev.engagements + 1 }));
      const dur = 4500 + Math.random() * 1500;
      setTripDuration(dur);
      setTripId((prev) => prev + 1);

      const step = dur / (W.length + 1);
      setRouteState({ activeIdx: 0, doneIdx: 0 });

      W.forEach((w, i) => {
        const time = Math.floor(step * (i + 0.8));
        const tId = setTimeout(() => {
          setRouteState((prev) => ({
            activeIdx: i,
            doneIdx: Math.max(prev.doneIdx, i),
          }));
          addPulse(w.x, w.y, w.color);
          setMetrics((prev) => ({
            ...prev,
            momentum: prev.momentum + Math.round(rand(1, 5)), 
            pipeline: clamp(prev.pipeline + rand(500, 2500), 20000, 420000),
          }));
        }, time);
        timeoutIds.push(tId);
      });

      const winId = setTimeout(() => {
        const isWin = Math.random() < 0.62;
        if (isWin) setMetrics((prev) => ({ ...prev, wins: prev.wins + 1 }));
        const lastW = W[W.length - 1];
        addPulse(lastW.x, lastW.y, isWin ? 'rgba(34,197,94,0.92)' : 'rgba(148,163,184,0.55)');
        setRouteState({ activeIdx: W.length - 1, doneIdx: W.length });
      }, dur - 80);
      timeoutIds.push(winId);

      const loopId = setTimeout(() => runTrip(), dur + 2500 + Math.random() * 500);
      timeoutIds.push(loopId);
    };

    runTrip();
    return () => timeoutIds.forEach(clearTimeout);
  }, [addPulse]);

  const headerContent = useMemo(() => {
    if (hoveredWaypoint !== null) {
      return {
        label: 'Previewing Stage',
        title: W[hoveredWaypoint].name,
        chip: W[hoveredWaypoint].chip,
        chipColor: 'text-indigo-200',
      };
    }
    return {
      label: 'System Status',
      title: 'Monitoring Active Routes',
      chip: 'Live',
      chipColor: 'text-emerald-400',
    };
  }, [hoveredWaypoint]);

  const targetIdx = hoveredWaypoint !== null ? hoveredWaypoint : routeState.activeIdx;
  const targetW = W[targetIdx];
  const cx = 210;
  const cy = 202;
  const dx = targetW.x - cx;
  const dy = targetW.y - cy;
  const needleAngle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
  const lift = metrics.engagements > 0 ? Math.round((metrics.wins / metrics.engagements) * 100) : 0;

  return (
    <div className="w-full aspect-square max-w-[600px] flex items-center justify-center bg-slate-900/50 p-6 overflow-hidden">
      <div className="relative w-full max-w-[440px] aspect-[440/580] rounded-[32px] overflow-hidden border border-white/5 shadow-2xl bg-[#0b1224] flex flex-col p-6 font-sans">
        
        {/* Ambient Wash */}
        <motion.div
          className="pointer-events-none absolute top-1/2 left-1/2 w-[250%] h-[250%] opacity-20"
          style={{
            background: 'radial-gradient(circle at center, rgba(56,189,248,0.15) 0%, rgba(99,102,241,0.1) 40%, transparent 70%)',
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 150, repeat: Infinity, repeatType: 'loop' as const }}
        />

        {/* Header Section */}
        <div className="relative z-10 flex items-start justify-between">
          <div>
            <h1 className="text-white font-bold text-xl tracking-tight">GTMStack</h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.25em] mt-1">Route Engine v4.0</p>
          </div>
          <div className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2">
            <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
            <span className="text-emerald-400 text-[9px] font-bold uppercase tracking-widest">Active</span>
          </div>
        </div>

        {/* Navigation Core */}
        <div className="relative z-10 mt-6 flex-1 rounded-[24px] overflow-hidden p-1 border border-white/10 bg-white/5 backdrop-blur-xl shadow-inner">
          <div className="relative w-full h-full rounded-[20px] bg-[#070c18] overflow-hidden">
            
            {/* Simulation Grid */}
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />

            {/* Path SVG */}
            <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 420 360">
              <path
                d="M 62 270 C 110 210, 128 150, 168 170 C 212 192, 240 120, 286 132 C 330 144, 342 206, 366 236"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>

            {/* Compass HUD */}
            <motion.div
              className="absolute left-1/2 top-[55%] w-[220px] h-[220px] rounded-full border border-dashed border-white/5"
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 80, repeat: Infinity, repeatType: 'loop' as const }}
              style={{ x: '-50%', y: '-50%' }}
            />

            <motion.div
              className="absolute left-1/2 top-[55%] w-1 h-[100px] rounded-full bg-gradient-to-b from-sky-400/80 to-transparent"
              style={{ originX: 0.5, originY: 0.9, x: '-50%', y: '-90%' }}
              animate={{ rotate: [needleAngle] }}
              transition={{ type: 'spring', stiffness: 20, damping: 25 }}
            />

            {/* Stage Waypoints */}
            {W.map((w, i) => {
              const isOn = i === routeState.activeIdx;
              const isDone = i < routeState.doneIdx;
              return (
                <div
                  key={i}
                  className="absolute w-3 h-3 cursor-crosshair z-20 group"
                  style={{ left: w.x - 6, top: w.y - 6 }}
                  onMouseEnter={() => setHoveredWaypoint(i)}
                  onMouseLeave={() => setHoveredWaypoint(null)}
                >
                  <motion.div
                    className="w-full h-full rounded-full border border-white/20"
                    animate={{ 
                      backgroundColor: [isOn ? w.color : isDone ? '#10b981' : '#334155'],
                      scale: [isOn ? 1.2 : 1],
                      boxShadow: isOn ? [`0 0 20px ${w.color}`] : ['none']
                    }}
                  />
                  <AnimatePresence>
                    {hoveredWaypoint === i && <WaypointTooltip w={w} status={isOn ? 'Active' : isDone ? 'Completed' : 'Pending'} />}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* Info Panel Overlay */}
            <div className="absolute left-3 right-3 top-3 rounded-2xl border border-white/5 bg-slate-900/80 backdrop-blur-md p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500">{headerContent.label}</div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={headerContent.title}
                      initial={{ opacity: [0], y: [5] }}
                      animate={{ opacity: [1], y: [0] }}
                      exit={{ opacity: [0], y: [-5] }}
                      className="text-xs font-bold text-white mt-0.5"
                    >
                      {headerContent.title}
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/5 border border-white/10 ${headerContent.chipColor}`}>
                  {headerContent.chip}
                </div>
              </div>
            </div>

            {/* Bottom Metrics Bar */}
            <div className="absolute inset-x-3 bottom-3 flex gap-2">
              <div className="flex-1 rounded-xl bg-white/5 border border-white/5 p-2.5 backdrop-blur-sm">
                <div className="flex items-center gap-1.5 opacity-50 mb-1">
                  <TrendingUp className="w-2.5 h-2.5" />
                  <span className="text-[8px] font-bold uppercase tracking-wider">Momentum</span>
                </div>
                <div className="text-sm font-bold tabular-nums">{metrics.momentum.toLocaleString()}</div>
              </div>
              <div className="flex-1 rounded-xl bg-white/5 border border-white/5 p-2.5 backdrop-blur-sm">
                <div className="flex items-center gap-1.5 opacity-50 mb-1">
                  <Target className="w-2.5 h-2.5" />
                  <span className="text-[8px] font-bold uppercase tracking-wider">Pipeline</span>
                </div>
                <div className="text-sm font-bold tabular-nums text-sky-400">{formatCurrency(metrics.pipeline)}</div>
              </div>
            </div>

            {/* Animation Particles */}
            <AnimatePresence>
              {tripDuration > 0 && <MovingDot key={tripId} duration={tripDuration} onComplete={() => {}} />}
              {pulses.map((p) => (
                <Pulse key={p.id} id={p.id} x={p.x} y={p.y} color={p.color} onRemove={removePulse} />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Global Footer Stats */}
        <div className="relative z-10 mt-6 pt-5 border-t border-white/5 grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <div className="text-[8px] font-bold uppercase tracking-[0.2em] text-slate-500">Engagements</div>
            <div className="text-lg font-bold tabular-nums text-white">{metrics.engagements}</div>
          </div>
          <div className="space-y-1">
            <div className="text-[8px] font-bold uppercase tracking-[0.2em] text-slate-500">Wins</div>
            <div className="text-lg font-bold tabular-nums text-indigo-300">{metrics.wins}</div>
          </div>
          <div className="space-y-1">
            <div className="text-[8px] font-bold uppercase tracking-[0.2em] text-slate-500">Lift Rate</div>
            <div className="text-lg font-bold tabular-nums text-emerald-400">{lift}%</div>
          </div>
        </div>

      </div>
    </div>
  );
}
