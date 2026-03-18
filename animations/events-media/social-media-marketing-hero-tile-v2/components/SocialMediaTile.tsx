'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Zap, Heart, Share2, MessageCircle, TrendingUp, Rocket } from 'lucide-react';

interface SocialMediaTileProps {
  /**
   * The percentage string for the 'Viral Lift' card (e.g. "+47%")
   */
  viralLift?: string;
  /**
   * The count string for the 'Total Shares' card (e.g. "12.8k")
   */
  totalShares?: string;
  /**
   * The central icon component to display (defaults to Zap/Bolt)
   */
  mainIcon?: React.ElementType;
}

export default function SocialMediaTile({
  viralLift = "+47%",
  totalShares = "12.8k",
  mainIcon: MainIcon = Zap
}: SocialMediaTileProps) {
  // Animation Variants
  const pulseVariant: Variants = {
    initial: { scale: 1, opacity: 0.6, filter: 'blur(24px)' },
    animate: {
      scale: [1, 1.25, 1],
      opacity: [0.6, 0.9, 0.6],
      filter: ['blur(24px)', 'blur(40px)', 'blur(24px)'],
      transition: {
        duration: 4,
        ease: [0.4, 0, 0.6, 1],
        repeat: Infinity,
      },
    },
  };

  const rippleVariant: Variants = {
    initial: { scale: 0.9, opacity: 0.4 },
    animate: {
      scale: 1.7,
      opacity: 0,
      transition: {
        duration: 4,
        ease: [0, 0, 0.2, 1],
        repeat: Infinity,
      },
    },
  };

  const floatVariant = (delay: number = 0): Variants => ({
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 8,
        ease: "easeInOut",
        repeat: Infinity,
        delay: delay,
      },
    },
  });

  const barVariant: Variants = {
    animate: {
      height: ["40%", "80%", "30%", "60%", "40%"],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }
    }
  };

  return (
    <div className="relative w-[600px] h-[600px] bg-[#020617] rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] border border-slate-800/80 font-display select-none">
      {/* Grid Background */}
      <div 
        className="absolute inset-0 z-0 opacity-100"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(14, 165, 233, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(14, 165, 233, 0.05) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Background SVG Chart */}
      <div className="absolute inset-0 opacity-25 pointer-events-none z-0">
        <svg className="w-full h-full" viewBox="0 0 600 600" style={{ filter: 'drop-shadow(0 0 8px rgba(14, 165, 233, 0.3))' }}>
          <defs>
            <linearGradient id="silver-grad" x1="0%" x2="0%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(226, 232, 240, 0.12)" />
              <stop offset="100%" stopColor="rgba(226, 232, 240, 0)" />
            </linearGradient>
          </defs>
          <path d="M0,450 Q100,420 200,480 T400,400 T600,430 L600,600 L0,600 Z" fill="url(#silver-grad)" />
          <path d="M0,450 Q100,420 200,480 T400,400 T600,430" fill="none" opacity="0.6" stroke="#0ea5e9" strokeWidth="2" />
          
          <path d="M0,350 Q150,300 300,380 T600,280 L600,600 L0,600 Z" fill="url(#silver-grad)" opacity="0.5" />
          <path d="M0,350 Q150,300 300,380 T600,280" fill="none" opacity="0.4" stroke="#0ea5e9" strokeWidth="2" />

          {/* Chart Nodes */}
          <motion.circle animate={{ opacity: [0.4, 1, 0.4] }} transition={{duration: 2, repeat: Infinity}} cx="200" cy="480" fill="#e2e8f0" r="4" />
          <motion.circle animate={{ opacity: [0.4, 1, 0.4] }} transition={{duration: 2, repeat: Infinity, delay: 1}} cx="400" cy="400" fill="#0ea5e9" r="4" />
          <motion.circle animate={{ opacity: [0.4, 1, 0.4] }} transition={{duration: 2, repeat: Infinity, delay: 2}} cx="300" cy="380" fill="#e2e8f0" r="4" />
          <motion.circle animate={{ opacity: [0.4, 1, 0.4] }} transition={{duration: 2, repeat: Infinity, delay: 0.5}} cx="500" cy="320" fill="#0ea5e9" r="3" />
        </svg>
      </div>

      {/* Atmospheric Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-600/10 rounded-full blur-[140px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-slate-400/10 rounded-full blur-[110px]" />

      {/* Ripples */}
      <motion.div variants={rippleVariant} initial="initial" animate="animate" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] border border-sky-400/30 rounded-full" />
      <motion.div variants={rippleVariant} initial="initial" animate="animate" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] border border-sky-400/15 rounded-full" style={{ animationDelay: '1.3s' }} transition={{ delay: 1.3, duration: 4, repeat: Infinity }} />
      <motion.div variants={rippleVariant} initial="initial" animate="animate" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] border border-slate-300/10 rounded-full" style={{ animationDelay: '2.6s' }} transition={{ delay: 2.6, duration: 4, repeat: Infinity }} />

      {/* Central Interactive Area */}
      <div className="relative w-full h-full flex items-center justify-center z-10">
        
        {/* Central Node */}
        <div className="relative z-20 group cursor-pointer">
          <motion.div 
            variants={pulseVariant}
            initial="initial"
            animate="animate"
            className="absolute inset-0 bg-gradient-to-tr from-sky-600 via-sky-300 to-slate-100 rounded-full"
          />
          <div className="relative w-64 h-64 bg-slate-950 rounded-full border-4 border-sky-400/40 flex flex-col items-center justify-center transition-all duration-700 group-hover:border-slate-200/80 group-hover:scale-105"
               style={{ boxShadow: '0 0 80px 20px rgba(14, 165, 233, 0.25), 0 0 120px 30px rgba(226, 232, 240, 0.1)' }}>
            <MainIcon className="w-24 h-24 text-slate-200 mb-2 fill-slate-200" strokeWidth={0} />
            <span className="text-xs font-bold tracking-[0.4em] text-sky-400 uppercase">Viral Origin</span>
            <div className="mt-2 h-1 w-12 bg-slate-200/30 rounded-full" />
          </div>
        </div>

        {/* Orbiting Icons */}
        <motion.div variants={floatVariant(0)} animate="animate" className="absolute top-[160px] left-[140px] z-10">
          <div className="bg-slate-200/5 p-5 rounded-full border border-slate-100/30 shadow-[0_0_20px_rgba(226,232,240,0.2)] backdrop-blur-sm">
            <Heart className="text-slate-100 w-8 h-8" fill="rgba(255,255,255,0.2)" />
          </div>
        </motion.div>

        <motion.div variants={floatVariant(2)} animate="animate" className="absolute bottom-[160px] right-[140px] z-10">
          <div className="bg-slate-200/5 p-5 rounded-full border border-slate-100/30 shadow-[0_0_20px_rgba(226,232,240,0.2)] backdrop-blur-sm">
            <Share2 className="text-slate-100 w-8 h-8" />
          </div>
        </motion.div>

        <motion.div variants={floatVariant(4)} animate="animate" className="absolute top-[200px] right-[120px] z-10">
          <div className="bg-slate-200/5 p-5 rounded-full border border-slate-100/30 shadow-[0_0_20px_rgba(226,232,240,0.2)] backdrop-blur-sm">
            <MessageCircle className="text-slate-100 w-8 h-8" />
          </div>
        </motion.div>

        {/* Floating Glass Cards */}
        {/* Card 1: Viral Lift */}
        <motion.div 
          className="absolute top-2 left-2 z-30 bg-slate-900/70 backdrop-blur-xl border border-sky-500/25 p-6 rounded-2xl shadow-2xl origin-bottom-right cursor-pointer"
          initial={{ rotate: -2 }}
          whileHover={{ rotate: 0, scale: 1.05 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-col gap-1">
            <p className="text-sky-400/90 text-[10px] font-bold tracking-[0.2em] uppercase">Viral Lift</p>
            <p className="text-white text-6xl font-black leading-none tracking-tighter" style={{ textShadow: '0 4px 16px rgba(226, 232, 240, 0.4)' }}>{viralLift}</p>
            <div className="flex items-center gap-2 mt-3">
              <TrendingUp className="text-slate-300 w-4 h-4" />
              <span className="text-slate-300 text-[11px] font-extrabold uppercase tracking-widest">High Velocity</span>
            </div>
          </div>
        </motion.div>

        {/* Card 2: Total Shares */}
        <motion.div 
          className="absolute bottom-2 right-2 z-30 bg-slate-900/70 backdrop-blur-xl border border-sky-500/25 p-7 rounded-2xl shadow-2xl origin-top-left cursor-pointer"
          initial={{ rotate: 2 }}
          whileHover={{ rotate: 0, scale: 1.05 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-col gap-1">
            <p className="text-sky-400/90 text-[10px] font-bold tracking-[0.2em] uppercase">Total Shares</p>
            <p className="text-white text-6xl font-black leading-none tracking-tighter" style={{ textShadow: '0 4px 16px rgba(226, 232, 240, 0.4)' }}>{totalShares}</p>
            <div className="flex items-center gap-2 mt-3">
              <Rocket className="text-sky-400 w-4 h-4" />
              <span className="text-sky-400 text-[11px] font-extrabold uppercase tracking-widest">Peak Outreach</span>
            </div>
          </div>
        </motion.div>

        {/* Card 3: Live Flow (Chart) */}
        <motion.div 
          className="absolute bottom-1/2 -left-12 z-30 bg-slate-900/70 backdrop-blur-xl border border-sky-500/25 p-5 rounded-xl shadow-2xl origin-center border-l-4 border-l-sky-400"
          style={{ y: '50%' }}
          initial={{ rotate: -3, scale: 0.9 }}
          whileHover={{ rotate: 0, scale: 0.95 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-sky-400/80 text-[10px] font-bold uppercase tracking-widest">Live Flow</p>
              <div className="w-2 h-2 bg-sky-300 rounded-full animate-pulse shadow-[0_0_8px_rgba(125,211,252,1)]" />
            </div>
            <div className="h-14 flex items-end gap-2 w-28">
               {/* Animated Bars */}
               <motion.div variants={barVariant} animate="animate" custom={1} className="w-3 bg-sky-900 rounded-t-sm" style={{ height: '50%' }} />
               <motion.div variants={barVariant} animate="animate" custom={2} transition={{ delay: 0.2, repeat: Infinity, repeatType: 'reverse', duration: 1.5 }} className="w-3 bg-sky-700 rounded-t-sm" style={{ height: '75%' }} />
               <motion.div variants={barVariant} animate="animate" custom={3} transition={{ delay: 0.4, repeat: Infinity, repeatType: 'reverse', duration: 2.2 }} className="w-3 bg-sky-500 rounded-t-sm" style={{ height: '33%' }} />
               <motion.div className="w-3 bg-slate-100 h-full rounded-t-sm shadow-[0_0_12px_rgba(255,255,255,0.4)]" />
               <motion.div variants={barVariant} animate="animate" custom={4} transition={{ delay: 0.1, repeat: Infinity, repeatType: 'reverse', duration: 1.8 }} className="w-3 bg-slate-300 rounded-t-sm" style={{ height: '66%' }} />
               <motion.div variants={barVariant} animate="animate" custom={5} transition={{ delay: 0.3, repeat: Infinity, repeatType: 'reverse', duration: 1.6 }} className="w-3 bg-slate-400 rounded-t-sm" style={{ height: '80%' }} />
            </div>
          </div>
        </motion.div>

      </div>

      {/* Header Overlay */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center opacity-80 z-40 pointer-events-none">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 bg-sky-500 rounded-full shadow-[0_0_8px_rgba(14,165,233,0.5)]" />
          <div className="w-2.5 h-2.5 bg-slate-400 rounded-full shadow-[0_0_8px_rgba(148,163,184,0.5)]" />
          <div className="w-2.5 h-2.5 bg-slate-800 rounded-full" />
        </div>
        <div className="text-[10px] text-sky-400/70 font-mono tracking-[0.3em] uppercase font-bold bg-slate-900/40 px-3 py-1 rounded-full border border-sky-500/10">
          Protocol_Lunar_Frost_v3.0
        </div>
      </div>

      {/* Footer Overlay */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-2.5 rounded-full bg-slate-900/60 border border-sky-500/30 flex items-center gap-6 backdrop-blur-xl z-40 pointer-events-none">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-slate-100 rounded-full shadow-[0_0_10px_rgba(255,255,255,1)] animate-pulse" />
          <span className="text-[9px] font-bold uppercase tracking-widest text-slate-100">Active</span>
        </div>
        <div className="flex gap-2">
          <div className="w-1.5 h-1.5 bg-sky-900 rounded-full" />
          <div className="w-1.5 h-1.5 bg-sky-900 rounded-full" />
          <div className="w-1.5 h-1.5 bg-sky-900 rounded-full" />
        </div>
      </div>

    </div>
  );
}