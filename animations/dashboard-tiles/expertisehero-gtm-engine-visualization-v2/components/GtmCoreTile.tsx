'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { MessageSquare, TrendingUp, Lightbulb, Settings } from 'lucide-react';

/**
 * GtmCoreTile
 * 
 * A self-contained, animated visualization of a "Go-To-Market Engine".
 * Dimensions: Intrinsic 600x600 ratio, responsive.
 */

const COLORS = {
  primary: '#3dd6f5', // Cyan
  purple: '#a855f7',
  emerald: '#10b981',
  background: '#0a0f12',
  cardBg: '#182f34',
  textMuted: '#90c1cb',
};

export default function GtmCoreTile() {
  return (
    <div className="relative w-full max-w-[600px] aspect-square bg-[#0a0f12] overflow-hidden flex items-center justify-center font-sans select-none rounded-2xl border border-[#224249] shadow-2xl mx-auto">
      
      {/* 1. Background Grid & Decoration */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }}
      />
      
      {/* 2. Background Graph Visualization (Acceleration Curve) */}
      <div className="absolute inset-0 opacity-20 flex items-end pointer-events-none">
        <svg
          viewBox="0 0 1000 400"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="grad1" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={COLORS.primary} stopOpacity={0} />
              <stop offset="100%" stopColor={COLORS.primary} stopOpacity={0.3} />
            </linearGradient>
          </defs>
          <motion.path
            d="M0 400C200 380 400 300 600 200C800 100 1000 20 1000 0V400H0Z"
            fill="url(#grad1)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          />
          <motion.path
            d="M0 400C200 380 400 300 600 200C800 100 1000 20 1000 0"
            stroke={COLORS.primary}
            strokeWidth="4"
            strokeDasharray="8 8"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </svg>
      </div>

      {/* 3. The Core Network Visualization */}
      <div className="relative z-10 w-[400px] h-[400px] flex items-center justify-center">
        
        {/* Connecting Lines (SVG Overlay) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
          {/* Top Left Line */}
          <motion.line 
            x1="50%" y1="50%" x2="15%" y2="15%" 
            stroke="white" strokeWidth="1" strokeDasharray="4"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 1 }}
          />
          {/* Top Right Line */}
          <motion.line 
            x1="50%" y1="50%" x2="85%" y2="15%" 
            stroke="white" strokeWidth="1" strokeDasharray="4"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 1 }}
          />
           {/* Bottom Left Line */}
           <motion.line 
            x1="50%" y1="50%" x2="15%" y2="85%" 
            stroke="white" strokeWidth="1" strokeDasharray="4"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 1 }}
          />
          {/* Bottom Right Line */}
          <motion.line 
            x1="50%" y1="50%" x2="85%" y2="85%" 
            stroke="white" strokeWidth="1" strokeDasharray="4"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 1 }}
          />
        </svg>

        {/* CENTER HUB */}
        <motion.div
          className="relative z-20 w-48 h-48 rounded-full flex flex-col items-center justify-center text-center border-4 backdrop-blur-sm"
          style={{ 
            backgroundColor: COLORS.cardBg,
            borderColor: 'rgba(61, 214, 245, 0.4)',
            boxShadow: '0 0 50px rgba(61,214,245,0.2)'
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          whileHover={{ scale: 1.05 }}
        >
           {/* Pulse Effect */}
           <motion.div 
             className="absolute inset-0 rounded-full border border-cyan-400"
             animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
             transition={{ duration: 3, repeat: Infinity }}
           />
           
           <p className="text-[#3dd6f5] text-xs font-black uppercase tracking-widest mb-1">GTM CORE</p>
           <motion.p 
            className="text-white text-4xl font-black"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
           >
             +47%
           </motion.p>
           <p className="text-[#90c1cb] text-xs font-bold mt-1">Avg MRR Growth</p>
        </motion.div>

        {/* SATELLITE NODES */}
        
        {/* Top Left: Content */}
        <SatelliteNode 
          x="-left-4" y="-top-4"
          icon={<MessageSquare className="w-6 h-6 text-[#3dd6f5]" />}
          color="#3dd6f5"
          label="Content & Engagement"
          glowClass="shadow-[0_0_15px_rgba(61,214,245,0.4)]"
          delay={1}
        />

        {/* Top Right: Demand */}
        <SatelliteNode 
          x="-right-4" y="-top-4"
          icon={<TrendingUp className="w-6 h-6 text-[#a855f7]" />}
          color="#a855f7"
          label="Demand & Growth"
          glowClass="shadow-[0_0_15px_rgba(168,85,247,0.4)]"
          delay={1.2}
        />

        {/* Bottom Left: Strategy */}
        <SatelliteNode 
          x="-left-4" y="-bottom-4"
          icon={<Lightbulb className="w-6 h-6 text-[#a855f7]" />}
          color="#a855f7"
          label="Strategy & Insights"
          glowClass="shadow-[0_0_15px_rgba(168,85,247,0.4)]"
          delay={1.4}
        />

        {/* Bottom Right: Systems */}
        <SatelliteNode 
          x="-right-4" y="-bottom-4"
          icon={<Settings className="w-6 h-6 text-[#10b981]" />}
          color="#10b981"
          label="Systems & Ops"
          glowClass="shadow-[0_0_15px_rgba(16,185,129,0.4)]"
          delay={1.6}
        />
      </div>
    </div>
  );
}

interface SatelliteNodeProps {
  x: string;
  y: string;
  icon: React.ReactNode;
  color: string;
  label: string;
  glowClass: string;
  delay: number;
}

// Helper Component for the corner nodes
function SatelliteNode({ 
  x, y, icon, color, label, glowClass, delay 
}: SatelliteNodeProps) {
  
  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { delay, type: "spring", stiffness: 200 }
    },
    hover: { scale: 1.1 }
  };

  const tooltipVariants: Variants = {
    visible: { opacity: 0, y: -10, scale: 0.95, pointerEvents: 'none' },
    hover: { opacity: 1, y: 0, scale: 1, pointerEvents: 'auto' }
  };

  const bubbleVariants: Variants = {
    hover: { backgroundColor: '#203c42' }
  };

  return (
    <motion.div 
      className={`absolute ${x} ${y} flex flex-col items-center justify-center cursor-pointer z-20 hover:z-30`}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="hover"
      variants={containerVariants}
    >
      <motion.div 
        className={`w-14 h-14 rounded-xl bg-[#182f34] border border-opacity-50 flex items-center justify-center transition-colors ${glowClass}`}
        style={{ borderColor: color }}
        // Continuous floating animation
        animate={{ y: [0, -8, 0] }}
        transition={{ 
          y: {
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: Math.random() * 2 
          }
        }}
        variants={bubbleVariants}
      >
        {icon}
      </motion.div>

      {/* Label Tooltip - Hidden by default, appears on hover */}
      <motion.div 
        className="absolute top-full mt-3 whitespace-nowrap"
        variants={tooltipVariants}
        transition={{ duration: 0.2 }}
      >
        <span className="text-xs font-bold text-white bg-[#0a0f12]/90 px-3 py-1.5 rounded-md border border-[#224249] shadow-xl backdrop-blur-md">
          {label}
        </span>
      </motion.div>
    </motion.div>
  );
}
