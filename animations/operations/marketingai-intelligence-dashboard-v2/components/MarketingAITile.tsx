'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Activity, 
  Brain, 
} from 'lucide-react';

/**
 * Interface for the sub-component props to ensure strict typing
 */
interface InputNodeProps {
  icon: React.ReactNode;
  label: string;
  delay: number;
  align: 'left' | 'right';
}

interface OutputCardProps {
  label: string;
  title: string;
  value: string;
  color: 'primary' | 'accent-gold';
  customValue?: boolean;
}

interface StatBlockProps {
  label: string;
  value: string;
  color: 'primary' | 'accent-gold';
  bordered?: boolean;
  glow?: boolean;
}

interface ConnectingLineProps {
  d: string;
  stroke: string;
  reverse?: boolean;
}

/**
 * MarketingAITile
 * 
 * A standalone, high-performance animated visualization of a "Central Intelligence Node".
 * Layout: 1:1 Square (600x600).
 * Branding: Dark, Futuristic, Central Intelligence Node.
 */
export default function MarketingAITile() {
  // --- Local State for Simulated Live Data ---
  const [networkLoad, setNetworkLoad] = useState<number>(412);
  const [latency, setLatency] = useState<number>(12);
  const [uptime, setUptime] = useState<string>("99.99%");

  useEffect(() => {
    // Simulate subtle data fluctuation
    const interval = setInterval(() => {
      setNetworkLoad((prev) => Math.min(900, Math.max(200, prev + (Math.random() * 40 - 20))));
      setLatency((prev) => Math.min(50, Math.max(5, Math.floor(prev + (Math.random() * 4 - 2)))));
      
      if (Math.random() > 0.995) {
        setUptime("99.98%");
        setTimeout(() => setUptime("99.99%"), 2000);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col bg-[#020617] overflow-hidden rounded-3xl border border-accent-gold/30 shadow-2xl">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,#38BDF822_1px,transparent_1px)] bg-[length:30px_30px] opacity-100 pointer-events-none" />
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,#818CF8_0%,#38BDF8_30%,transparent_70%)] pointer-events-none" />

      {/* Main Content Container - Flex Column for vertical stacking */}
      <div className="relative flex-1 flex flex-col p-6 z-10">
        
        {/* TOP: Header & Status */}
        <div className="flex justify-between items-start mb-4 shrink-0">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold tracking-tight text-white leading-none">
              Central Intelligence <span className="text-primary">Node</span>
            </h1>
          </div>
          <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur px-3 py-1.5 rounded-full border border-primary/20 shadow-[0_0_15px_rgba(56,189,248,0.1)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Active</span>
          </div>
        </div>

        {/* CENTER & MID-SECTION: Visualization Area */}
        <div className="flex-1 relative flex flex-col items-center justify-start pt-8">
          
          {/* Row 1: Inputs and Center Brain */}
          <div className="flex items-center justify-between w-full px-4 relative z-20">
            {/* Left Input */}
            <InputNode icon={<Cpu className="text-primary" size={20} />} label="Ingestion" delay={0} align="left" />
            
            {/* Center Focal Point: Brain */}
            <div className="relative flex flex-col items-center justify-center mx-auto">
              <div className="absolute inset-0 bg-radial-gradient from-accent-gold/40 to-transparent blur-2xl scale-150 rounded-full opacity-40" />
              
              <div className="relative size-36 rounded-full bg-slate-900/40 backdrop-blur-xl flex flex-col items-center justify-center shadow-[0_0_50px_rgba(129,140,248,0.3)] border-4 border-accent-gold/50 group">
                <div className="absolute inset-0 rounded-full border border-primary/30 animate-pulse" />
                <motion.div
                  animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Brain className="text-accent-gold mb-1" size={48} strokeWidth={1.5} />
                </motion.div>
                <div className="flex flex-col items-center bg-slate-950/80 px-3 py-1 rounded border border-primary/40 backdrop-blur-md mt-1">
                  <p className="text-accent-gold text-lg font-black tracking-tighter drop-shadow-[0_0_12px_rgba(129,140,248,0.8)]">+34%</p>
                  <p className="text-[8px] font-bold uppercase text-primary tracking-widest">Accuracy</p>
                </div>
              </div>
            </div>

            {/* Right Input */}
            <InputNode icon={<Activity className="text-primary" size={20} />} label="Signals" delay={1} align="right" />
          </div>

          {/* Row 2: Outputs Stacked Below Center */}
          <div className="flex gap-4 w-full justify-center mt-12 relative z-20">
            <OutputCard 
              label="Live Forecast" 
              title="Churn Risk" 
              value="Negligible" 
              color="accent-gold" 
            />
            <OutputCard 
              label="Engine Decision" 
              title="Max Budget" 
              value="Allocated"
              color="primary" 
              customValue
            />
          </div>

          {/* SVG Connecting Lines Layer - Explicit 600x600 Coordinate System */}
          <svg className="absolute inset-0 w-full h-full -z-10 pointer-events-none overflow-visible" viewBox="0 0 600 600">
            <defs>
              <linearGradient id="grad_in_left" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0" />
                <stop offset="100%" stopColor="#38BDF8" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="grad_in_right" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="1" />
                <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="grad_out" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#818CF8" stopOpacity="1" />
                <stop offset="100%" stopColor="#818CF8" stopOpacity="0" />
              </linearGradient>
            </defs>
            
            {/* 
               Coordinates approximations based on flex layout:
               Center Brain Center: ~300, 160 (Header is ~60px, padding top 32px + half brain size)
               Left Input: ~60, 160
               Right Input: ~540, 160
               Outputs Top: ~280
            */}

            {/* Inputs to Brain (Horizontal) */}
            <ConnectingLine d="M 90 160 C 160 160, 200 160, 230 160" stroke="url(#grad_in_left)" />
            <ConnectingLine d="M 510 160 C 440 160, 400 160, 370 160" stroke="url(#grad_in_right)" reverse />

            {/* Brain to Outputs (Vertical Split) */}
            {/* Brain Bottom (300, 235) to Output Left Top (210, 290) */}
            <ConnectingLine d="M 300 235 C 300 270, 220 250, 220 290" stroke="url(#grad_out)" reverse />
            
            {/* Brain Bottom (300, 235) to Output Right Top (390, 290) */}
            <ConnectingLine d="M 300 235 C 300 270, 380 250, 380 290" stroke="url(#grad_out)" reverse />
          </svg>
        </div>

        {/* BOTTOM: Footer Stats Grid */}
        <div className="grid grid-cols-3 gap-2 pt-4 border-t border-primary/10 mt-auto shrink-0 bg-slate-950/30 -mx-6 px-6 pb-2">
          <StatBlock label="Network Load" value={`${Math.round(networkLoad)} GB/s`} color="primary" />
          <StatBlock label="Latency" value={`${latency}ms`} color="accent-gold" bordered />
          <StatBlock label="Uptime" value={uptime} color="primary" glow />
        </div>

      </div>
    </div>
  );
}

// --- Subcomponents ---

const InputNode = React.memo(function InputNode({ icon, label, delay, align }: InputNodeProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: align === 'left' ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.8 }}
      className="flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-900/80 border border-primary/40 backdrop-blur-md shadow-[0_0_15px_rgba(56,189,248,0.2)] w-20"
    >
      {icon}
      <span className="text-[9px] font-bold uppercase text-primary/80 tracking-widest">{label}</span>
    </motion.div>
  );
});

const OutputCard = React.memo(function OutputCard({ label, title, value, color, customValue = false }: OutputCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`flex-1 p-3 bg-slate-900/90 border-l-4 ${color === 'primary' ? 'border-primary' : 'border-accent-gold'} rounded-r-lg shadow-xl max-w-[180px] border-y border-r border-indigo-400/20 backdrop-blur-sm`}
    >
      <p className={`text-[9px] font-bold uppercase ${color === 'primary' ? 'text-primary' : 'text-accent-gold'} mb-1`}>{label}</p>
      <p className="text-sm font-bold text-white leading-tight truncate">
        {customValue ? title : <>{title}</>}
      </p>
      {!customValue && <p className="text-primary font-bold text-xs mt-0.5">{value}</p>}
      {customValue && <p className="text-accent-gold font-bold text-xs mt-0.5">{value}</p>}
    </motion.div>
  );
});

const StatBlock = React.memo(function StatBlock({ label, value, color, bordered = false, glow = false }: StatBlockProps) {
  return (
    <div className={`flex flex-col gap-1 items-center justify-center py-2 ${bordered ? 'border-x border-[#818CF8]/20' : ''}`}>
      <p className={`text-${color}/60 text-[9px] font-medium uppercase tracking-widest text-center`}>{label}</p>
      <p className={`text-base font-bold text-white tracking-tight ${glow ? 'drop-shadow-[0_0_8px_rgba(56,189,248,0.6)] text-primary' : ''}`}>
        {value}
      </p>
    </div>
  );
});

const ConnectingLine = React.memo(function ConnectingLine({ d, stroke, reverse = false }: ConnectingLineProps) {
  return (
    <motion.path
      d={d}
      stroke={stroke}
      strokeWidth="2"
      fill="none"
      strokeDasharray="6 4"
      initial={{ strokeDashoffset: 0 }}
      animate={{ strokeDashoffset: reverse ? -20 : 20 }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
    />
  );
});
