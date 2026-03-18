'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Search, Banknote, TrendingUp, Rocket } from 'lucide-react';

export interface DemandGrowthTileProps {
  /** The percentage text displayed for Pipeline Growth (e.g., "+142%") */
  pipelineGrowth?: string;
  /** The multiplier text displayed for Sales Velocity (e.g., "2.4x") */
  salesVelocity?: string;
  /** Primary brand color (Hex) used for SEO, main glows, and particles (default: #11d4d4) */
  primaryColor?: string;
  /** Secondary brand color (Hex) used for Paid Media and accents (default: #34d399) */
  secondaryColor?: string;
  /** Global multiplier for animation duration (default: 1). Higher is faster? No, let's make higher = faster, so we divide duration by speed. */
  animationSpeed?: number;
}

/**
 * Helper to convert hex to rgba for glassmorphism effects
 */
const hexToRgba = (hex: string, alpha: number) => {
  const cleanHex = hex.replace('#', '');
  let r = 17, g = 212, b = 212; // Default cyan fallback

  if (cleanHex.length === 3) {
    r = parseInt(cleanHex[0] + cleanHex[0], 16);
    g = parseInt(cleanHex[1] + cleanHex[1], 16);
    b = parseInt(cleanHex[2] + cleanHex[2], 16);
  } else if (cleanHex.length === 6) {
    r = parseInt(cleanHex.substring(0, 2), 16);
    g = parseInt(cleanHex.substring(2, 4), 16);
    b = parseInt(cleanHex.substring(4, 6), 16);
  }
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/**
 * DemandGrowthTile
 * 
 * A self-contained, animated data visualization component.
 * Dimensions: Maintains a 1:1 aspect ratio, max width 600px.
 */
export default function DemandGrowthTile({
  pipelineGrowth = "+142%",
  salesVelocity = "2.4x",
  primaryColor = "#11d4d4",
  secondaryColor = "#34d399", // emerald-400
  animationSpeed = 1
}: DemandGrowthTileProps) {
  
  // Adjust duration based on speed multiplier (Higher speed = Lower duration)
  const d = (baseDuration: number) => baseDuration / Math.max(0.1, animationSpeed);

  // Animation variants
  const floatAnimation: Variants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: d(4),
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const floatAnimationDelayed: Variants = {
    animate: {
      y: [0, -12, 0],
      transition: {
        duration: d(5),
        delay: d(0.5),
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseGlow: Variants = {
    animate: {
      opacity: [0.3, 0.6, 0.3],
      scale: [1, 1.05, 1],
      transition: {
        duration: d(3),
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const particleFlow = (delay: number): Variants => ({
    animate: {
      y: [-20, 280],
      opacity: [0, 1, 0],
      x: [0, (Math.random() - 0.5) * 20], // Slight horizontal wobble
      transition: {
        duration: d(2.5),
        delay: d(delay),
        repeat: Infinity,
        ease: "linear"
      }
    }
  });

  return (
    <div 
      className="relative w-full aspect-square max-w-[600px] mx-auto bg-slate-950 rounded-xl overflow-hidden shadow-2xl border border-[#234848]"
      style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, ${hexToRgba(primaryColor, 0.05)} 1px, transparent 0)`,
        backgroundSize: '24px 24px'
      }}
    >
      {/* Decorative Glow Background */}
      <motion.div 
        className="absolute inset-0"
        variants={pulseGlow}
        animate="animate"
        style={{
          background: `radial-gradient(circle, ${hexToRgba(primaryColor, 0.15)} 0%, transparent 70%)`,
          filter: 'blur(60px)'
        }}
      />

      {/* Main Container for Visualization Elements */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-2/3 h-2/3 flex items-center justify-center">
          
          {/* Top Left Card: SEO Strategy */}
          <motion.div 
            className="absolute top-0 left-0 flex flex-col gap-2 p-4 rounded-lg z-20"
            style={{
              background: 'rgba(35, 72, 72, 0.4)',
              backdropFilter: 'blur(12px)',
              borderTop: `1px solid ${hexToRgba(primaryColor, 0.2)}`,
              borderRight: `1px solid ${hexToRgba(primaryColor, 0.2)}`,
              borderBottom: `1px solid ${hexToRgba(primaryColor, 0.2)}`,
              borderLeft: `4px solid ${primaryColor}`
            }}
            variants={floatAnimation}
            animate="animate"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4" style={{ color: primaryColor }} />
              <span className="text-[10px] font-bold uppercase tracking-tighter text-white">SEO Strategy</span>
            </div>
            <div className="h-1 w-24 rounded-full overflow-hidden" style={{ backgroundColor: hexToRgba(primaryColor, 0.2) }}>
              <motion.div 
                className="h-full" 
                style={{ backgroundColor: primaryColor }}
                initial={{ width: "0%" }}
                animate={{ width: "66%" }}
                transition={{ duration: d(1.5), delay: d(0.5) }}
              />
            </div>
          </motion.div>

          {/* Top Right Card: Paid Media */}
          <motion.div 
            className="absolute top-10 -right-4 flex flex-col gap-2 p-4 rounded-lg z-20"
            style={{
              background: 'rgba(35, 72, 72, 0.4)',
              backdropFilter: 'blur(12px)',
              borderTop: `1px solid ${hexToRgba(primaryColor, 0.2)}`,
              borderRight: `1px solid ${hexToRgba(primaryColor, 0.2)}`,
              borderBottom: `1px solid ${hexToRgba(primaryColor, 0.2)}`,
              borderLeft: `4px solid ${secondaryColor}`
            }}
            variants={floatAnimationDelayed}
            animate="animate"
          >
            <div className="flex items-center gap-2">
              <Banknote className="w-4 h-4" style={{ color: secondaryColor }} />
              <span className="text-[10px] font-bold uppercase tracking-tighter text-white">Paid Media</span>
            </div>
            <div className="h-1 w-24 rounded-full overflow-hidden" style={{ backgroundColor: hexToRgba(secondaryColor, 0.2) }}>
              <motion.div 
                className="h-full" 
                style={{ backgroundColor: secondaryColor }}
                initial={{ width: "0%" }}
                animate={{ width: "50%" }}
                transition={{ duration: d(1.5), delay: d(0.8) }}
              />
            </div>
          </motion.div>

          {/* The Funnel Shape */}
          <div 
            className="relative z-10 w-48 h-64"
            style={{ 
              clipPath: 'polygon(0% 0%, 100% 0%, 70% 100%, 30% 100%)',
              background: `linear-gradient(to bottom, ${hexToRgba(primaryColor, 0.4)}, ${hexToRgba(secondaryColor, 0.1)})`
            }}
          >
            {/* Flowing Particles */}
            <div className="absolute inset-0 overflow-hidden opacity-50">
              <motion.div 
                className="absolute top-0 left-1/4 w-2 h-2 bg-white rounded-full blur-[1px]" 
                variants={particleFlow(0)} 
                animate="animate" 
              />
              <motion.div 
                className="absolute top-0 right-1/3 w-1.5 h-1.5 rounded-full blur-[1px]" 
                style={{ backgroundColor: primaryColor }}
                variants={particleFlow(1)} 
                animate="animate" 
              />
              <motion.div 
                className="absolute top-0 left-1/2 w-2 h-2 rounded-full blur-[1px]" 
                style={{ backgroundColor: secondaryColor }}
                variants={particleFlow(0.5)} 
                animate="animate" 
              />
               <motion.div 
                className="absolute top-0 right-1/4 w-1 h-1 bg-white rounded-full blur-[1px]" 
                variants={particleFlow(1.5)} 
                animate="animate" 
              />
            </div>
          </div>

          {/* Upward Growth Curve (SVG) */}
          <div className="absolute bottom-0 w-full h-40 flex items-end justify-center pointer-events-none z-10">
            <svg 
              className="w-full h-full drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]" 
              viewBox="0 0 200 100"
              preserveAspectRatio="none"
              style={{ color: secondaryColor }}
            >
              <motion.path 
                d="M0,100 Q50,95 100,50 T200,0" 
                fill="none" 
                stroke="currentColor" 
                strokeLinecap="round" 
                strokeWidth="4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: d(2), ease: "easeOut" }}
              />
              <motion.circle 
                cx="200" 
                cy="0" 
                fill="currentColor" 
                r="5"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: d(2), duration: 0.3 }}
              />
            </svg>
          </div>

          {/* Bottom Left Card: Pipeline Growth */}
          <motion.div 
            className="absolute -left-4 bottom-1/4 p-4 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border z-30"
            style={{
              background: 'rgba(35, 72, 72, 0.4)',
              backdropFilter: 'blur(12px)',
              borderColor: hexToRgba(primaryColor, 0.4)
            }}
            variants={floatAnimationDelayed}
            animate="animate"
          >
            <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: primaryColor }}>Pipeline Growth</p>
            <p className="text-3xl font-black text-white">{pipelineGrowth}</p>
            <div className="flex items-center gap-1 text-[#0bda50] text-xs font-bold mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>High Velocity</span>
            </div>
          </motion.div>

          {/* Bottom Right Card: Sales Velocity */}
          <motion.div 
            className="absolute -right-8 bottom-10 p-4 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border z-30"
            style={{
              background: 'rgba(35, 72, 72, 0.4)',
              backdropFilter: 'blur(12px)',
              borderColor: hexToRgba(secondaryColor, 0.4)
            }}
            variants={floatAnimation}
            animate="animate"
          >
            <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: secondaryColor }}>Sales Velocity</p>
            <p className="text-3xl font-black text-white">{salesVelocity}</p>
            <div className="flex items-center gap-1 text-[#0bda50] text-xs font-bold mt-1">
              <Rocket className="w-3 h-3" />
              <span>Accelerated</span>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}