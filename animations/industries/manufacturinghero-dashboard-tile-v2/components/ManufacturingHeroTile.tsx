'use client';

import React, { useEffect, useState } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { 
  Factory, 
  Cog, 
  BadgeCheck, 
  Zap, 
  DollarSign, 
  Settings, 
  Box, 
  Timer,
  ClipboardCheck
} from 'lucide-react';

// Custom Hook for counting numbers
const CountingNumber = ({ value, prefix = '', suffix = '', duration = 2 }: { value: number, prefix?: string, suffix?: string, duration?: number }) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = value;
    const totalFrames = Math.round(duration * 60);
    let currentFrame = 0;

    const counter = setInterval(() => {
      currentFrame++;
      const progress = currentFrame / totalFrames;
      const current = start + (end - start) * (1 - Math.pow(1 - progress, 3)); // Ease out cubic
      
      if (currentFrame === totalFrames) {
        setDisplayValue(end);
        clearInterval(counter);
      } else {
        setDisplayValue(current);
      }
    }, 1000 / 60);

    return () => clearInterval(counter);
  }, [value, duration]);

  // Format helper
  const formatted = value % 1 !== 0 ? displayValue.toFixed(1) : Math.floor(displayValue);
  
  return <>{prefix}{formatted}{suffix}</>;
};

export default function ManufacturingHeroTile() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  // Color Palette Constants mapped to original design
  const colors = {
    primary: '#F37021',      // Safety Orange
    background: '#212529',   // Deep Charcoal
    secondary: '#495057',    // Iron Grey
    text: '#E9ECEF',         // Soft Silver
    highlight: '#ADB5BD',    // Brushed Steel
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  const chartPathVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { duration: 2, ease: "easeOut", delay: 0.5 }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="relative w-[600px] h-[600px] rounded-xl overflow-hidden shadow-2xl border flex-shrink-0"
      style={{
        backgroundColor: colors.background,
        borderColor: colors.secondary,
        fontFamily: '"Space Grotesk", sans-serif'
      }}
    >
      {/* Grid Background */}
      <div 
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${colors.secondary} 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Floating Background Icons */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-40px] right-10 opacity-5 z-0"
      >
        <Settings size={180} color={colors.text} />
      </motion.div>
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/3 left-[-20px] opacity-5 z-0"
      >
        <Box size={140} color={colors.text} />
      </motion.div>

      {/* Chart Background (SVG) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 600 600">
          <defs>
            <linearGradient id="orangeGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={colors.primary} stopOpacity="0.25"></stop>
              <stop offset="100%" stopColor={colors.background} stopOpacity="0"></stop>
            </linearGradient>
          </defs>
          
          {/* Filled Area */}
          <motion.path 
            d="M0 450 Q 150 430, 200 350 T 400 250 T 600 150 V 600 H 0 Z" 
            fill="url(#orangeGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 1, delay: 1 }}
          />

          {/* Line Stroke */}
          <motion.path 
            d="M0 450 Q 150 430, 200 350 T 400 250 T 600 150" 
            fill="none" 
            stroke={colors.primary} 
            strokeWidth="4"
            strokeLinecap="round"
            variants={chartPathVariants}
          />
        </svg>
      </div>

      {/* Main Content Overlay */}
      <div className="absolute inset-0 p-10 flex flex-col justify-between z-20">
        
        {/* Top Process Flow */}
        <div className="flex justify-between items-start w-full relative">
          
          {/* Step 1 */}
          <motion.div variants={itemVariants} className="flex flex-col items-center gap-3 group relative z-10">
            <motion.div 
              whileHover={{ scale: 1.1, boxShadow: `0 0 25px ${colors.primary}50` }}
              className="w-14 h-14 border-2 rounded-xl flex items-center justify-center shadow-lg bg-[#495057]"
              style={{ borderColor: colors.primary, color: colors.primary }}
            >
              <Factory size={28} />
            </motion.div>
            <div className="px-3 py-1 rounded border bg-[#212529]/95" style={{ borderColor: colors.secondary }}>
              <p className="text-xs font-bold whitespace-nowrap" style={{ color: colors.highlight }}>Raw Materials</p>
            </div>
          </motion.div>

          {/* Connecting Line 1 */}
          <div className="relative h-[2px] grow mx-4 mt-7 overflow-hidden">
             <div className="absolute inset-0 opacity-20" style={{ background: `linear-gradient(90deg, ${colors.primary}, ${colors.highlight})` }}></div>
             <motion.div 
               variants={{
                 hidden: { x: '-100%' },
                 visible: { x: '100%', transition: { duration: 1.5, repeat: Infinity, ease: "linear" } }
               }}
               className="absolute inset-0 w-1/2"
               style={{ background: `linear-gradient(90deg, transparent, ${colors.primary}, transparent)` }}
             />
          </div>

          {/* Step 2 */}
          <motion.div variants={itemVariants} className="flex flex-col items-center gap-3 group relative z-10">
            <motion.div 
               whileHover={{ scale: 1.1, borderColor: colors.primary, color: colors.primary }}
               className="w-14 h-14 border-2 rounded-xl flex items-center justify-center transition-colors bg-[#495057]"
               style={{ borderColor: colors.highlight, color: colors.highlight }}
            >
              <Cog size={28} />
            </motion.div>
            <div className="px-3 py-1 rounded border bg-[#212529]/95" style={{ borderColor: colors.secondary }}>
              <p className="text-xs font-bold whitespace-nowrap" style={{ color: colors.highlight }}>Assembly</p>
            </div>
          </motion.div>

          {/* Connecting Line 2 */}
          <div className="relative h-[2px] grow mx-4 mt-7 overflow-hidden">
             <div className="absolute inset-0 opacity-20" style={{ background: `linear-gradient(90deg, ${colors.highlight}, ${colors.primary})` }}></div>
          </div>

          {/* Step 3 */}
          <motion.div variants={itemVariants} className="flex flex-col items-center gap-3 group relative z-10">
             <motion.div 
               whileHover={{ scale: 1.1, boxShadow: `0 0 25px ${colors.primary}50` }}
               className="w-14 h-14 border-2 rounded-xl flex items-center justify-center shadow-lg bg-[#495057]"
               style={{ borderColor: colors.primary, color: colors.primary }}
            >
              <BadgeCheck size={28} />
            </motion.div>
            <div className="px-3 py-1 rounded border bg-[#212529]/95" style={{ borderColor: colors.secondary }}>
              <p className="text-xs font-bold whitespace-nowrap" style={{ color: colors.highlight }}>Quality Control</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Stats Cards */}
        <div className="flex justify-between items-end w-full gap-2 relative z-30">
          
          {/* Card 1: Performance */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="flex-1 backdrop-blur-md border p-3 rounded-xl shadow-lg bg-[#495057]/90 min-w-0"
            style={{ borderColor: `${colors.highlight}33` }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Zap size={14} color={colors.primary} fill={colors.primary} className="flex-shrink-0" />
              <p className="text-[9px] uppercase font-bold tracking-widest truncate" style={{ color: colors.highlight }}>Performance</p>
            </div>
            <p className="text-xl font-bold mb-1 truncate" style={{ color: colors.text }}>
              <CountingNumber value={41} suffix="%" />
            </p>
            <p className="text-[9px] font-bold uppercase tracking-tight truncate" style={{ color: colors.primary }}>Faster Throughput</p>
          </motion.div>

          {/* Card 2: Savings */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="flex-1 backdrop-blur-md border p-3 rounded-xl shadow-lg bg-[#495057]/90 min-w-0"
            style={{ borderColor: `${colors.highlight}33` }}
          >
            <div className="flex items-center gap-2 mb-1">
              <DollarSign size={14} color={colors.primary} className="flex-shrink-0" />
              <p className="text-[9px] uppercase font-bold tracking-widest truncate" style={{ color: colors.highlight }}>Savings</p>
            </div>
            <p className="text-xl font-bold mb-1 truncate" style={{ color: colors.text }}>
              <CountingNumber value={3.2} prefix="$" suffix="M" />
            </p>
            <p className="text-[9px] font-bold uppercase tracking-tight truncate" style={{ color: colors.primary }}>Cost Reduction</p>
          </motion.div>

          {/* Card 3: Cycle Time */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="flex-1 backdrop-blur-md border p-3 rounded-xl shadow-lg bg-[#495057]/90 min-w-0"
            style={{ borderColor: `${colors.highlight}33` }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Timer size={14} color={colors.primary} className="flex-shrink-0" />
              <p className="text-[9px] uppercase font-bold tracking-widest truncate" style={{ color: colors.highlight }}>Speed</p>
            </div>
            <p className="text-xl font-bold mb-1 truncate" style={{ color: colors.text }}>
              <CountingNumber value={12} suffix="m" />
            </p>
            <p className="text-[9px] font-bold uppercase tracking-tight truncate" style={{ color: colors.primary }}>Cycle Time</p>
          </motion.div>

          {/* Card 4: First Pass Yield */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="flex-1 backdrop-blur-md border p-3 rounded-xl shadow-lg bg-[#495057]/90 min-w-0"
            style={{ borderColor: `${colors.highlight}33` }}
          >
            <div className="flex items-center gap-2 mb-1">
              <ClipboardCheck size={14} color={colors.primary} className="flex-shrink-0" />
              <p className="text-[9px] uppercase font-bold tracking-widest truncate" style={{ color: colors.highlight }}>Quality</p>
            </div>
            <p className="text-xl font-bold mb-1 truncate" style={{ color: colors.text }}>
              <CountingNumber value={98.5} suffix="%" />
            </p>
            <p className="text-[9px] font-bold uppercase tracking-tight truncate" style={{ color: colors.primary }}>First Pass Yield</p>
          </motion.div>

        </div>
      </div>

      {/* Center Badge */}
      <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5, delay: 0.8 }}
          className="backdrop-blur-md p-8 rounded-full border shadow-2xl text-center bg-[#212529]/90"
          style={{ 
            borderColor: `${colors.primary}80`,
            boxShadow: `0 0 50px ${colors.primary}26`
          }}
        >
          <p className="text-sm font-bold uppercase tracking-widest mb-1" style={{ color: colors.primary }}>OEE Improvement</p>
          <motion.h3 
            className="text-6xl font-black tracking-tighter"
            style={{ color: colors.text }}
          >
            +<CountingNumber value={35} suffix="%" />
          </motion.h3>
        </motion.div>
      </div>

    </motion.div>
  );
}
