'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  ShieldCheck, 
  DollarSign, 
  Activity, 
  ChevronUp
} from 'lucide-react';

// Color Palette Constants for easy maintenance
const COLORS = {
  primary: "#7139fb",
  bgDark: "#020408",
  teal: "#264653",
  yellow: "#E9C46A",
  green: "#2A9D8F",
};

interface UtilitiesTileProps {
  className?: string;
}

export default function UtilitiesTile({ className = '' }: UtilitiesTileProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`relative w-[600px] h-[600px] bg-[#020408] flex items-center justify-center overflow-hidden font-mono select-none ${className}`}>
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none z-0"
        style={{
            backgroundImage: `radial-gradient(circle at center, rgba(38, 70, 83, 0.2) 0%, transparent 70%)`
        }}
      />
      
      {/* SVG Background Lines */}
      <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
        <svg height="100%" width="100%" viewBox="0 0 600 600">
          <line stroke={COLORS.teal} strokeWidth="1" x1="0" x2="600" y1="300" y2="300" />
          <line stroke={COLORS.teal} strokeWidth="1" x1="300" x2="300" y1="0" y2="600" />
          <circle cx="300" cy="300" r="140" fill="none" stroke={COLORS.teal} strokeDasharray="10 10" strokeWidth="1" />
          <circle cx="300" cy="300" r="210" fill="none" stroke={COLORS.teal} strokeWidth="0.5" />
          {/* Diagonal decorations */}
          <line stroke={COLORS.teal} strokeWidth="0.5" x1="100" x2="200" y1="100" y2="100" />
          <line stroke={COLORS.teal} strokeWidth="0.5" x1="100" x2="100" y1="100" y2="200" />
          <line stroke={COLORS.teal} strokeWidth="0.5" x1="400" x2="500" y1="500" y2="500" />
          <line stroke={COLORS.teal} strokeWidth="0.5" x1="500" x2="500" y1="400" y2="500" />
        </svg>
      </div>

      {/* --- CENTRAL CORE --- */}
      <div className="relative z-30 group cursor-crosshair">
        {/* Outer Ring Spin */}
        <motion.div 
          className="absolute inset-[-60px] border-2 border-[#E9C46A]/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        {/* Middle Ring Reverse Spin Dashed */}
        <motion.div 
          className="absolute inset-[-40px] border border-[#E9C46A]/40 rounded-full border-dashed"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        {/* Inner Tech Ring */}
        <motion.div 
          className="absolute inset-[-20px] border-[3px] border-t-[#E9C46A] border-r-transparent border-b-[#E9C46A] border-l-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Core Box */}
        <div className="w-48 h-48 bg-[#020408] border-2 border-[#E9C46A] flex flex-col items-center justify-center relative shadow-[0_0_15px_rgba(233,196,106,0.4)]">
          <div className="absolute inset-1 border border-[#E9C46A]/30"></div>
          <Cpu className="w-16 h-16 text-[#E9C46A] mb-2 stroke-[1.5]" />
          <div className="font-mono text-[#E9C46A] text-[10px] font-bold tracking-[0.4em] uppercase">Core Engine</div>
          <div className="font-mono text-white/40 text-[8px] mt-1">S_ID: GM_8812</div>
        </div>
      </div>

      {/* --- PANEL 1: Top Left (Reliability) --- */}
      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute top-8 left-8 bg-[#264653]/20 border border-[#264653]/40 p-4 w-44 shadow-2xl backdrop-blur-sm"
        style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 90%, 90% 100%, 0% 100%)' }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] font-mono text-[#E9C46A]/80 uppercase font-bold tracking-widest">Reliability</span>
          <ShieldCheck className="w-4 h-4 text-[#E9C46A]" />
        </div>
        <div className="text-2xl font-bold tracking-tighter text-white">+29.4%</div>
        <div className="w-full h-1 bg-[#264653]/50 mt-2">
          <motion.div 
            className="h-full bg-[#E9C46A]" 
            initial={{ width: 0 }}
            animate={{ width: "85%" }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        </div>
      </motion.div>

      {/* --- PANEL 2: Top Right (Cost Redux) --- */}
      <motion.div 
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute top-8 right-8 bg-[#020408]/80 border border-[#264653]/30 p-4 w-48 backdrop-blur-sm"
        style={{ clipPath: 'polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 15%)' }}
      >
        <div className="flex items-center gap-2 mb-2">
          <DollarSign className="w-4 h-4 text-[#2A9D8F] drop-shadow-[0_0_5px_rgba(42,157,143,0.5)]" />
          <span className="text-[9px] font-mono text-white/50 uppercase font-bold tracking-widest">Cost Redux</span>
        </div>
        <div className="text-2xl font-bold tracking-tighter text-[#2A9D8F]">
          22.8<span className="text-sm ml-1 text-white/70">%</span>
        </div>
        <div className="mt-2 flex gap-1">
          {[1,2,3,4].map((i) => (
            <div key={i} className={`h-1 w-full ${i <= 2 ? 'bg-[#2A9D8F]' : 'bg-[#2A9D8F]/30'}`} />
          ))}
        </div>
      </motion.div>

      {/* --- PANEL 3: Bottom Left (Grid Efficiency) --- */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="absolute bottom-8 left-8 bg-[#264653]/20 border border-[#264653]/40 w-56 p-4 backdrop-blur-sm"
        style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
      >
        <div className="flex items-center justify-between mb-4 border-b border-[#264653]/30 pb-2">
          <span className="text-[9px] font-mono text-white uppercase font-bold">Grid Efficiency</span>
          <span className="text-[9px] font-mono text-[#E9C46A] animate-pulse">LIVE_09</span>
        </div>
        <div className="h-16 flex items-end gap-1 px-1 mb-2">
          <motion.div animate={{ height: ["25%", "40%", "30%", "25%"] }} transition={{duration: 2, repeat: Infinity}} className="bg-[#264653]/40 w-full" />
          <motion.div animate={{ height: ["40%", "60%", "45%", "40%"] }} transition={{duration: 3, repeat: Infinity}} className="bg-[#264653]/40 w-full" />
          <motion.div animate={{ height: ["60%", "30%", "50%", "60%"] }} transition={{duration: 2.5, repeat: Infinity}} className="bg-[#264653]/40 w-full" />
          <motion.div animate={{ height: ["80%", "65%", "85%", "80%"] }} transition={{duration: 4, repeat: Infinity}} className="bg-[#E9C46A]/50 w-full" />
          <motion.div animate={{ height: ["66%", "80%", "70%", "66%"] }} transition={{duration: 3.5, repeat: Infinity}} className="bg-[#E9C46A]/80 w-full" />
          <motion.div animate={{ height: ["100%", "90%", "95%", "100%"] }} transition={{duration: 1, repeat: Infinity}} className="bg-[#E9C46A] w-full shadow-[0_0_10px_rgba(233,196,106,0.3)]" />
        </div>
        <div className="flex justify-between font-mono text-[8px] text-white/40">
          <span>00:00</span>
          <span>12:00</span>
          <span>24:00</span>
        </div>
      </motion.div>

      {/* --- PANEL 4: Bottom Right (Adoption Rate) --- */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-8 right-8 bg-[#020408]/80 border border-[#264653]/30 p-4 w-44 border-r-4 border-r-[#2A9D8F] backdrop-blur-sm"
        style={{ clipPath: 'polygon(5% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 15%)' }}
      >
        <div className="text-[9px] font-mono text-white/40 uppercase mb-1">Adoption Rate</div>
        <div className="text-3xl font-black text-white">+41.2%</div>
        <div className="flex items-center gap-2 mt-2">
          <ChevronUp className="w-4 h-4 text-[#2A9D8F] animate-bounce" />
          <span className="text-[10px] font-mono text-[#2A9D8F]">OPTIMAL PATHWAY</span>
        </div>
      </motion.div>
    </div>
  );
}