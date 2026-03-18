'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUp,
  MoreHorizontal,
  TrendingUp,
  Target,
  Users,
  CheckCircle2,
  MousePointer2,
  Activity
} from 'lucide-react';

export default function HigherEDMarketingTile() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const funnelData = [
    {
      id: 'applied',
      label: 'Applied',
      count: '12,402',
      percent: 82,
      color: 'bg-[#06366c]',
      icon: MousePointer2,
      subtext: '4.2% vs last week'
    },
    {
      id: 'admitted',
      label: 'Admitted',
      count: '8,420',
      percent: 45,
      color: 'bg-[#1d4ed8]',
      icon: Users,
      subtext: '1.8% vs last week'
    },
    {
      id: 'enrolled',
      label: 'Enrolled',
      count: '3,240',
      percent: 28,
      color: 'bg-[#065f46]',
      icon: CheckCircle2,
      subtext: 'Steady'
    },
  ];

  const rowVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3 + index * 0.15,
        duration: 0.5,
      },
    }),
  };

  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (index: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.4 + index * 0.15,
        type: 'spring' as const,
        stiffness: 300,
        damping: 15
      },
    }),
  };

  const barVariants = {
    hidden: { width: '0%' },
    visible: (percent: number) => ({
      width: `${percent}%`,
      transition: {
        delay: 0.6,
        duration: 1.2,
        type: 'spring' as const,
        bounce: 0,
        stiffness: 50,
      },
    }),
  };

  const graphPathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        delay: 1.2,
        duration: 2,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const graphAreaVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 1.5,
        duration: 1.5,
      },
    },
  };

  return (
    <div className="relative w-full h-full max-w-[600px] aspect-square flex flex-col justify-center mx-auto">
      {/* Background Ambience */}
      <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#06366c]/5 blur-[80px] rounded-full pointer-events-none" />

      {/* Main Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full bg-white/90 backdrop-blur-2xl border border-white/60 rounded-[32px] shadow-[0_24px_48px_-12px_rgba(6,54,108,0.12)] overflow-hidden flex flex-col relative z-10"
      >
        {/* 1. Header Section (Top 15%) */}
        <div className="h-[18%] px-8 pt-8 flex justify-between items-start border-b border-slate-100/80">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-[#06366c]/60">
              <Activity size={14} />
              <span className="text-xs font-bold uppercase tracking-widest">
                Funnel Overview
              </span>
            </div>
            <div className="flex items-baseline gap-3">
              <h2 className="text-[#06366c] text-4xl font-black tracking-tight">
                24.5k
              </h2>
              <div className="flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                <ArrowUp className="text-[#065f46] w-3 h-3" strokeWidth={3} />
                <span className="text-[#065f46] font-bold text-xs">18%</span>
              </div>
            </div>
          </div>
          <button className="text-slate-300 hover:text-[#06366c] transition-colors p-2 -mr-2 hover:bg-slate-50 rounded-full">
            <MoreHorizontal size={20} />
          </button>
        </div>

        {/* 2. Hero Section: Vertical Stacking (Middle 55%) */}
        <div className="flex-1 px-8 py-6 flex flex-col justify-center gap-6">
          {funnelData.map((item, index) => (
            <motion.div
              key={item.id}
              custom={index}
              variants={rowVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-2 group"
            >
              {/* Label Row */}
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-2">
                  <motion.div
                    variants={iconVariants}
                    custom={index}
                    className={`p-1.5 rounded-md ${item.color} bg-opacity-10 text-opacity-100`}
                  >
                    <item.icon
                      size={16}
                      className={index === 0 ? 'text-[#06366c]' : index === 1 ? 'text-[#1d4ed8]' : 'text-[#065f46]'}
                      strokeWidth={2.5}
                    />
                  </motion.div>
                  <span className="text-slate-700 font-bold text-sm">{item.label}</span>
                </div>
                <div className="text-right">
                  <span className="block text-[#06366c] font-black text-lg leading-none">
                    {item.count}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">
                    {item.subtext}
                  </span>
                </div>
              </div>

              {/* Progress Bar Container */}
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden relative">
                {/* Animated Fill */}
                <motion.div
                  custom={item.percent}
                  variants={barVariants}
                  initial="hidden"
                  animate="visible"
                  className={`absolute top-0 left-0 h-full rounded-full ${item.color} group-hover:brightness-110 transition-all duration-300`}
                />
                
                {/* Grid Texture Overlay on Bar (Cyber touch) */}
                <div 
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{ backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.2) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.2) 75%, transparent 75%, transparent)', backgroundSize: '8px 8px' }} 
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* 3. Footer Section: System Metrics (Bottom 27%) */}
        <div className="h-[27%] bg-slate-50/50 border-t border-slate-100 relative overflow-hidden">
          {/* Subtle Grid Background */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{ 
                backgroundImage: 'linear-gradient(#06366c 1px, transparent 1px), linear-gradient(90deg, #06366c 1px, transparent 1px)',
                backgroundSize: '20px 20px'
            }}
          />

          <div className="relative z-10 px-8 py-4 h-full flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Target size={14} className="text-[#1d4ed8]" />
                <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                  Projection
                </span>
              </div>
              <span className="text-[#06366c] font-black text-xs bg-white px-2 py-1 rounded shadow-sm border border-slate-100">
                Q4 Target
              </span>
            </div>

            {/* Graph Container */}
            <div className="absolute bottom-0 left-0 right-0 h-[70%] w-full">
               <svg
                className="w-full h-full overflow-visible"
                viewBox="0 0 400 100"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="footerGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#06366c" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#06366c" stopOpacity="0" />
                  </linearGradient>
                </defs>
                
                {/* Area */}
                <motion.path
                  variants={graphAreaVariants}
                  initial="hidden"
                  animate="visible"
                  d="M0,60 C80,60 120,30 200,45 C280,60 320,20 400,10 L400,100 L0,100 Z"
                  fill="url(#footerGradient)"
                />

                {/* Line */}
                <motion.path
                  variants={graphPathVariants}
                  initial="hidden"
                  animate="visible"
                  d="M0,60 C80,60 120,30 200,45 C280,60 320,20 400,10"
                  fill="none"
                  stroke="#06366c"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeOpacity="0.8"
                />
              </svg>
            </div>
            
            {/* Overlay stats */}
            <div className="absolute bottom-4 right-8 text-right z-20">
               <span className="text-[#1d4ed8] text-xs font-bold">+12.5%</span>
               <span className="text-slate-400 text-[10px] block font-medium">Net Efficiency</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}