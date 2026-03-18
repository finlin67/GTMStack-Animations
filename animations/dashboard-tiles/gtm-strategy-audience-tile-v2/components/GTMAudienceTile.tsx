
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Gem, Users, Radar, MessageSquare, BookOpen } from 'lucide-react';

export default function GTMAudienceTile() {
  // Custom colors mapped from the original HTML design
  const colors = {
    gold: '#D4AF37',
    rose: '#E29587',
    coral: '#FF7F50',
    lavender: '#818CF8',
    indigo: '#312E81',
  };

  // Shared glassmorphism style
  const glassClass = "bg-white/5 backdrop-blur-md border border-white/10";

  return (
    <div className="relative w-[600px] h-[600px] rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden font-sans select-none">
      {/* Background Gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, #4338ca 0%, #312e81 100%)'
        }}
      />

      {/* Ambient Background Blobs */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full blur-[100px]" style={{ backgroundColor: colors.lavender }}></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full blur-[100px]" style={{ backgroundColor: colors.rose }}></div>
      </div>

      {/* SVG Orbit Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 600 600">
        <g fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="1.5">
          <path className="stroke-dasharray-4-6" strokeDasharray="4 6" d="M300 300 L 150 150" />
          <path className="stroke-dasharray-4-6" strokeDasharray="4 6" d="M300 300 L 120 420" />
          <path className="stroke-dasharray-4-6" strokeDasharray="4 6" d="M300 300 L 480 200" />
          <path className="stroke-dasharray-4-6" strokeDasharray="4 6" d="M300 300 L 450 450" />
        </g>
        <circle cx="300" cy="300" fill="none" r="120" stroke="white" strokeOpacity="0.05" />
        <circle cx="300" cy="300" fill="none" r="220" stroke="white" strokeOpacity="0.05" />
      </svg>

      {/* Center Content: Core Product */}
      <div className="absolute inset-0 p-12 flex flex-col items-center justify-center z-20">
        <motion.div 
          className="relative group cursor-pointer" 
          onClick={() => console.log('Core Product clicked')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Pulsing Core Glow */}
          <div className="absolute inset-0 rounded-full scale-150 blur-2xl transition-all duration-700 group-hover:bg-opacity-30" style={{ backgroundColor: `${colors.gold}33` }}></div>
          
          <div className={`w-48 h-48 rounded-full ${glassClass} flex flex-col items-center justify-center text-center p-6 border-2 relative z-10`} style={{ borderColor: `${colors.gold}80`, boxShadow: `0 0 40px ${colors.gold}4d` }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 shadow-lg" style={{ background: `linear-gradient(to bottom right, ${colors.gold}, #ca8a04)` }}>
              <Gem className="text-white w-6 h-6" />
            </div>
            <h2 className="font-[Poppins] font-bold text-xs uppercase tracking-widest mb-1" style={{ color: colors.gold }}>Core Product</h2>
            <div className="font-[Poppins] text-2xl font-extrabold text-white leading-tight">VALUE</div>
            <div className="w-8 h-1 mt-3 rounded-full" style={{ backgroundColor: `${colors.gold}66` }}></div>
          </div>
        </motion.div>
      </div>

      {/* Floating Card: Audience (Top Left) */}
      <motion.div 
        className="absolute top-16 left-16 z-20"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0 }}
      >
        <motion.div 
          onClick={() => console.log('Audience card clicked')}
          className={`${glassClass} p-4 rounded-2xl w-44 border-l-4 flex flex-col gap-2 cursor-pointer transition-colors`} 
          style={{ borderLeftColor: colors.coral }}
          whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg" style={{ backgroundColor: `${colors.coral}33` }}>
              <Users className="w-5 h-5" style={{ color: colors.coral }} />
            </div>
            <span className="font-[Poppins] text-[10px] font-bold uppercase tracking-wider" style={{ color: colors.coral }}>Audience</span>
          </div>
          <h4 className="text-sm font-semibold text-white font-[Inter]">Segment Growth</h4>
          <p className="text-[10px] text-white/60 leading-relaxed italic font-[Inter]">&quot;Identify key demographics & psychographics&quot;</p>
        </motion.div>
      </motion.div>

      {/* Floating Card: Landscape (Bottom Left) */}
      <motion.div 
        className="absolute bottom-20 left-10 z-20"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      >
        <motion.div 
          onClick={() => console.log('Landscape card clicked')}
          className={`${glassClass} p-4 rounded-2xl w-40 border-l-4 flex flex-col gap-2 cursor-pointer transition-colors`} 
          style={{ borderLeftColor: colors.rose }}
          whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg" style={{ backgroundColor: `${colors.rose}33` }}>
              <Radar className="w-5 h-5" style={{ color: colors.rose }} />
            </div>
            <span className="font-[Poppins] text-[10px] font-bold uppercase tracking-wider" style={{ color: colors.rose }}>Landscape</span>
          </div>
          <h4 className="text-sm font-semibold text-white font-[Inter]">Market Intel</h4>
          <div className="flex gap-1 mt-1">
            <div className="w-full h-1 rounded-full overflow-hidden" style={{ backgroundColor: `${colors.rose}66` }}>
              <div className="h-full w-2/3" style={{ backgroundColor: colors.rose }}></div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Card: Messaging (Top Right) */}
      <motion.div 
        className="absolute top-24 right-12 z-20"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      >
        <motion.div 
          onClick={() => console.log('Messaging card clicked')}
          className={`${glassClass} p-4 rounded-2xl w-48 border-l-4 flex flex-col gap-2 cursor-pointer transition-colors`} 
          style={{ borderLeftColor: colors.lavender }}
          whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg" style={{ backgroundColor: `${colors.lavender}33` }}>
              <MessageSquare className="w-5 h-5" style={{ color: colors.lavender }} />
            </div>
            <span className="font-[Poppins] text-[10px] font-bold uppercase tracking-wider" style={{ color: colors.lavender }}>Messaging</span>
          </div>
          <h4 className="text-sm font-semibold text-white font-[Inter]">Value Prop Sync</h4>
          <p className="text-[10px] text-white/70 font-[Inter]">Strategic alignment of messaging across all touchpoints.</p>
        </motion.div>
      </motion.div>

      {/* Floating Card: Narrative (Bottom Right) */}
      <motion.div 
        className="absolute bottom-16 right-16 z-20"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2.2 }}
      >
        <motion.div 
          onClick={() => console.log('Narrative card clicked')}
          className={`${glassClass} p-4 rounded-2xl w-44 border-l-4 flex flex-col gap-2 border-white/30 cursor-pointer transition-colors`}
          whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-white/10 rounded-lg">
              <BookOpen className="w-5 h-5 text-white/80" />
            </div>
            <span className="font-[Poppins] text-[10px] font-bold text-white/50 uppercase tracking-wider">Narrative</span>
          </div>
          <h4 className="text-sm font-semibold text-white font-[Inter]">Brand Story</h4>
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-bold font-[Inter]" style={{ color: colors.gold }}>Market Potential: High</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Header Text */}
      <div className="absolute top-8 left-0 right-0 text-center z-20 pointer-events-none">
        <span className="font-[Poppins] text-[10px] text-white/30 uppercase tracking-[0.6em] font-medium">Strategic Go-to-Market Framework</span>
      </div>

      {/* Footer Legend */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-8 opacity-40 z-20 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.gold }}></span>
          <span className="text-[9px] uppercase tracking-widest font-bold font-[Inter] text-white">Research</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.coral }}></span>
          <span className="text-[9px] uppercase tracking-widest font-bold font-[Inter] text-white">Activation</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.lavender }}></span>
          <span className="text-[9px] uppercase tracking-widest font-bold font-[Inter] text-white">Retention</span>
        </div>
      </div>

      {/* Decorative Corners */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-white/20 rounded-tl-xl z-20 pointer-events-none"></div>
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-white/20 rounded-br-xl z-20 pointer-events-none"></div>
    </div>
  );
}
