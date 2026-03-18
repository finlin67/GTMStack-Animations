'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Activity, 
  Briefcase,
  Zap,
  ArrowUpRight
} from 'lucide-react';

/**
 * TYPES
 */
interface FinancialStats {
  aum: number;
  growth: number;
  pipeline: number;
  activeUsers: number;
}

interface FloatingCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: React.ReactNode;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  delay?: number;
}

/**
 * HELPER COMPONENTS
 */

const AUMChart = () => {
  const points = "0,80 50,70 100,75 150,40 200,50 250,20 300,30 350,10 400,15 450,5 500,2";
  
  return (
    <svg viewBox="0 0 500 100" className="w-full h-full">
      <defs>
        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
      </defs>
      
      <motion.path
        initial={{ opacity: [0] }}
        animate={{ opacity: [0.1] }}
        d={`M${points} L500,100 L0,100 Z`}
        fill="url(#chartGradient)"
      />

      <motion.polyline
        fill="none"
        stroke="url(#chartGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
        initial={{ pathLength: [0], opacity: [0] }}
        animate={{ pathLength: [1], opacity: [1] }}
        transition={{ duration: 2 }}
      />

      {[0, 150, 300, 450].map((x, i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={x === 0 ? 80 : x === 150 ? 40 : x === 300 ? 30 : 5}
          r="4"
          fill="#1e293b"
          stroke="#60a5fa"
          strokeWidth="2"
          initial={{ scale: [0] }}
          animate={{ scale: [1] }}
          transition={{ delay: 1.5 + (i * 0.2) }}
        />
      ))}
    </svg>
  );
};

const CentralHub = () => {
  return (
    <div className="relative flex items-center justify-center w-48 h-48">
      {/* Outer Rotating Ring */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute inset-0 rounded-full border border-dashed border-cyan-500/20"
      />

      {/* Middle Pulse Ring */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute inset-4 rounded-full border-2 border-cyan-400/30"
      />

      {/* Core Body */}
      <div className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-br from-cyan-600 to-blue-700 p-0.5 shadow-[0_0_40px_rgba(8,145,178,0.3)]">
        <div className="w-full h-full rounded-full bg-slate-900 flex flex-col items-center justify-center gap-1 overflow-hidden">
          <Activity className="w-6 h-6 text-cyan-400 mb-1" />
          <span className="text-[10px] font-black text-white/50 uppercase tracking-tighter">Growth</span>
          <span className="text-lg font-black text-cyan-400 leading-none">Hub</span>
        </div>
      </div>

      {/* Orbiting Particles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 10 + i * 2, repeat: Infinity }}
          className="absolute inset-0"
        >
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_cyan]" 
            style={{ transform: `rotate(${i * 120}deg) translateY(-24px)` }}
          />
        </motion.div>
      ))}

      <div className="absolute inset-0 blur-[60px] bg-cyan-500/10 rounded-full" />
    </div>
  );
};

const FloatingCard = ({ title, value, change, icon, position, delay = 0 }: FloatingCardProps) => {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
      initial={{ opacity: [0], scale: [0.9], y: [20] }}
      animate={{ 
        opacity: [1], 
        scale: [1], 
        y: [0, -10, 0],
      }}
      transition={{
        delay,
        duration: 4,
        repeat: Infinity,
        repeatType: "mirror" as const,
        opacity: { duration: 0.5, repeat: 0 },
        scale: { duration: 0.5, repeat: 0 },
        y: { duration: 4, repeat: Infinity, repeatType: "mirror" as const }
      }}
      whileHover={{ scale: 1.05, zIndex: 10, backgroundColor: 'rgba(30, 41, 59, 0.9)' }}
      style={{ ...position }}
      className="absolute p-4 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl cursor-grab active:cursor-grabbing min-w-[160px]"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-slate-800/50 rounded-lg border border-white/5">
          {icon}
        </div>
        <div>
          <h3 className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{title}</h3>
          <p className="text-sm font-bold text-white tabular-nums tracking-tight">{value}</p>
        </div>
      </div>
      {change && (
        <div className="flex items-center gap-1">
          <span className="text-[10px] font-bold text-emerald-400">{change}</span>
          <span className="text-[10px] text-slate-500 font-medium">vs last month</span>
        </div>
      )}
    </motion.div>
  );
};

/**
 * MAIN COMPONENT
 */
export default function FinServTile() {
  const [stats, setStats] = useState<FinancialStats>({
    aum: 12450890,
    growth: 14.2,
    pipeline: 8420000,
    activeUsers: 342
  });

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateStats = useCallback(() => {
    setStats(prev => ({
      ...prev,
      aum: prev.aum + (Math.random() * 500 - 200),
      pipeline: prev.pipeline + (Math.random() * 1000 - 400),
      activeUsers: Math.max(300, prev.activeUsers + (Math.random() > 0.5 ? 1 : -1))
    }));

    timerRef.current = setTimeout(updateStats, 3000 + Math.random() * 2000);
  }, []);

  useEffect(() => {
    updateStats();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [updateStats]);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD', 
      maximumFractionDigits: 0 
    }).format(val);

  return (
    <div className="w-full aspect-square max-w-[600px] flex justify-center items-center">
      <div className="relative w-full h-full bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 flex items-center justify-center p-8 group">
        
        {/* Dynamic Background Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(11,138,173,0.15),transparent_70%)]" />
        
        {/* Animated Grid Lines */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ 
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '40px 40px' 
          }} 
        />

        {/* Main Composition Layer */}
        <div className="relative w-full h-full flex items-center justify-center">
          
          <CentralHub />

          {/* Floating Interactive Cards */}
          <FloatingCard 
            title="Assets Under Management"
            value={formatCurrency(stats.aum)}
            change={`+${stats.growth}%`}
            icon={<DollarSign className="w-5 h-5 text-emerald-400" />}
            position={{ top: '8%', left: '5%' }}
            delay={0.1}
          />

          <FloatingCard 
            title="Sales Pipeline"
            value={formatCurrency(stats.pipeline)}
            icon={<Briefcase className="w-5 h-5 text-blue-400" />}
            position={{ bottom: '15%', right: '5%' }}
            delay={0.2}
          />

          <FloatingCard 
            title="Active Portfolios"
            value={stats.activeUsers.toString()}
            icon={<Users className="w-5 h-5 text-purple-400" />}
            position={{ top: '15%', right: '5%' }}
            delay={0.3}
          />

          <FloatingCard 
            title="Market Signal"
            value="Strong Buy"
            icon={<ArrowUpRight className="w-5 h-5 text-emerald-400" />}
            position={{ bottom: '10%', left: '8%' }}
            delay={0.4}
          />

          {/* Integrated AUM Chart */}
          <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-4/5 h-24 pointer-events-none opacity-40">
             <AUMChart />
          </div>

          {/* Bottom Ticker/Alert */}
          <motion.div 
            initial={{ y: [50], opacity: [0] }}
            animate={{ y: [0], opacity: [1] }}
            transition={{ delay: 0.6 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 w-3/4 flex items-center gap-3 px-4 py-2 bg-slate-800/80 backdrop-blur-md rounded-full border border-white/10"
          >
            <div className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Live Updates</span>
            <div className="h-4 w-px bg-slate-700" />
            <span className="text-xs font-medium text-slate-200 truncate">Portfolio rebalanced: Tech Growth fund +2.4%</span>
            <Zap className="w-3 h-3 text-yellow-400 ml-auto" />
          </motion.div>

        </div>
      </div>
    </div>
  );
}
