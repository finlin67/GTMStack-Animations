'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  FileEdit, 
  Palette, 
  Rocket, 
  FileText, 
  Share2, 
  Mail, 
  TrendingUp 
} from 'lucide-react';

export default function ContentGrowthDashboard() {
  const [visitorGrowth, setVisitorGrowth] = useState<number>(164);
  const [leadsGrowth, setLeadsGrowth] = useState<number>(43);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly fluctuate Visitor Growth (-3 to +5)
      setVisitorGrowth((prev) => {
        const change = Math.floor(Math.random() * 9) - 3; 
        return Math.max(100, prev + change); // Keep it realistic
      });
      
      // Randomly fluctuate Leads Growth (-2 to +4)
      setLeadsGrowth((prev) => {
        const change = Math.floor(Math.random() * 7) - 2;
        return Math.max(10, prev + change);
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center p-8 font-display">
      {/* Main 600x600 Container */}
      <div className="relative w-[600px] h-[600px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-2xl bg-grid">
        
        {/* Background Ambient Glows */}
        <motion.div 
          animate={{ opacity: [0.8, 1, 0.8], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ opacity: [0.8, 1, 0.8], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px]" 
        />

        {/* Safe Area 520x520 */}
        <div className="absolute inset-[40px] flex flex-col items-center justify-center">
          
          {/* Central Chart Section */}
          <div className="absolute inset-0 flex flex-col justify-center items-center opacity-40">
            <svg className="glow-cyan" width="400" height="200" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.path 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                d="M0 180C50 170 80 140 120 130C160 120 180 80 220 70C260 60 300 20 400 10" 
                stroke="#0db9f2" 
                strokeLinecap="round" 
                strokeWidth="4" 
              />
              <path d="M0 180C50 170 80 140 120 130C160 120 180 80 220 70C260 60 300 20 400 10V200H0V180Z" fill="url(#paint0_linear)" fillOpacity="0.2" />
              <defs>
                <linearGradient id="paint0_linear" x1="200" y1="10" x2="200" y2="200" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0db9f2" />
                  <stop offset="1" stopColor="#0db9f2" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Workflow Nodes & Paths */}
          <div className="relative w-full h-full">
            
            {/* Node: Ideate */}
            <div className="absolute top-[10%] left-[10%] flex flex-col items-center">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="size-12 rounded-full bg-slate-900 border border-primary flex items-center justify-center text-primary glow-cyan shadow-lg z-10"
              >
                <Lightbulb size={24} />
              </motion.div>
              <span className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">Ideate</span>
            </div>

            {/* Path: Ideate to Write */}
            <svg className="absolute top-[15%] left-[18%] w-[25%] h-[10%] z-0" fill="none">
              <motion.path 
                animate={{ strokeDashoffset: [0, -8] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                d="M0 10 Q 50 40, 100 10" 
                stroke="url(#grad1)" 
                strokeDasharray="4 4" 
                strokeWidth="2" 
              />
              <defs>
                <linearGradient id="grad1">
                  <stop offset="0%" stopColor="#0db9f2" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>

            {/* Node: Write */}
            <div className="absolute top-[5%] left-[45%] flex flex-col items-center">
              <motion.div 
                 whileHover={{ scale: 1.1 }}
                className="size-12 rounded-full bg-slate-900 border border-purple-500 flex items-center justify-center text-purple-500 glow-purple shadow-lg z-10"
              >
                <FileEdit size={24} />
              </motion.div>
              <span className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">Write</span>
            </div>

            {/* Path: Write to Design */}
            <svg className="absolute top-[15%] left-[53%] w-[25%] h-[10%] z-0" fill="none">
              <motion.path 
                 animate={{ strokeDashoffset: [0, -8] }}
                 transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                d="M0 10 Q 50 40, 100 10" 
                stroke="url(#grad2)" 
                strokeDasharray="4 4" 
                strokeWidth="2" 
              />
              <defs>
                <linearGradient id="grad2">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>

            {/* Node: Design */}
            <div className="absolute top-[10%] right-[10%] flex flex-col items-center">
              <motion.div 
                 whileHover={{ scale: 1.1 }}
                className="size-12 rounded-full bg-slate-900 border border-pink-500 flex items-center justify-center text-pink-500 glow-pink shadow-lg z-10"
              >
                <Palette size={24} />
              </motion.div>
              <span className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">Design</span>
            </div>

            {/* Path: Design to Publish */}
            <svg className="absolute top-[25%] right-[15%] w-[10%] h-[35%] z-0" fill="none">
              <motion.path 
                 animate={{ strokeDashoffset: [0, -8] }}
                 transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                d="M40 0 Q 60 100, 0 150" 
                stroke="#ec4899" 
                strokeDasharray="4 4" 
                strokeWidth="2" 
              />
            </svg>

            {/* Node: Publish */}
            <div className="absolute bottom-[20%] right-[10%] flex flex-col items-center">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
                className="size-14 rounded-full bg-slate-900 border-2 border-primary flex items-center justify-center text-primary glow-cyan shadow-xl z-10"
              >
                <Rocket size={32} />
              </motion.div>
              <span className="text-xs font-bold text-white mt-2 uppercase tracking-widest">Publish</span>

              {/* Distribution Fan Out */}
              <div className="absolute -bottom-12 flex gap-3">
                <div className="size-8 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 transition-colors">
                  <FileText size={16} />
                </div>
                <div className="size-8 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 transition-colors">
                  <Share2 size={16} />
                </div>
                <div className="size-8 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 transition-colors">
                  <Mail size={16} />
                </div>
              </div>
            </div>
          </div>

          {/* Foreground Floating Metrics */}
          <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
            <div className="flex flex-col gap-8 -mt-10">
              
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="bg-slate-950/60 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col items-center transform -rotate-3 shadow-2xl"
              >
                <motion.span 
                  key={visitorGrowth}
                  initial={{ opacity: 0.5, scale: 0.9, filter: "blur(2px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="text-6xl font-black text-white glow-cyan tracking-tighter"
                >
                  {visitorGrowth}%
                </motion.span>
                <span className="text-primary font-bold uppercase tracking-widest text-sm">Visitor Growth</span>
              </motion.div>

              <motion.div 
                 animate={{ y: [0, -8, 0] }}
                 transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="bg-slate-950/60 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col items-center transform rotate-6 translate-x-12 shadow-2xl"
              >
                <motion.span 
                  key={leadsGrowth}
                  initial={{ opacity: 0.5, scale: 0.9, filter: "blur(2px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="text-5xl font-black text-white glow-cyan tracking-tighter"
                >
                  {leadsGrowth}%
                </motion.span>
                <span className="text-primary font-bold uppercase tracking-widest text-sm">More Leads</span>
              </motion.div>
            
            </div>
          </div>

          {/* Status Indicators */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-800 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] text-slate-300 font-medium uppercase tracking-tighter">AI Engine Active</span>
          </div>

          <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-800 backdrop-blur-sm">
            <span className="text-[10px] text-slate-300 font-medium uppercase tracking-tighter">Growth Optimized</span>
            <TrendingUp size={14} className="text-green-500" />
          </div>

        </div>
      </div>
    </div>
  );
}