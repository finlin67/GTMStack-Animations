'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Banknote, MousePointerClick, Wrench } from 'lucide-react';

export default function AutomotiveTile() {
  return (
    <div 
      className="relative w-full max-w-[600px] aspect-square bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(34, 211, 238, 0.05) 1px, transparent 1px)',
        backgroundSize: '32px 32px'
      }}
    >
      {/* Top Header Overlay */}
      <div className="absolute top-0 left-0 right-0 z-30 pt-8 pb-4 text-center bg-gradient-to-b from-slate-950 via-slate-950/80 to-transparent">
        <motion.h3 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-cyan-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-1"
        >
          Performance Enterprise
        </motion.h3>
        <motion.h2 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-white text-2xl font-extrabold tracking-tight"
        >
          Dealership Growth
        </motion.h2>
      </div>

      {/* Central SVG Graphic */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg className="w-full h-full p-4" fill="none" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="pathGradient" x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" stopColor="#0ea5e9"></stop>
              <stop offset="50%" stopColor="#22d3ee"></stop>
              <stop offset="100%" stopColor="#10b981"></stop>
            </linearGradient>
          </defs>
          {/* Background thick faint line */}
          <path 
            d="M-50 250C100 250 150 50 250 50C350 50 400 250 550 250" 
            stroke="url(#pathGradient)" 
            strokeOpacity="0.05" 
            strokeWidth="40"
          />
          {/* Dashed animated line */}
          <path 
            d="M-50 250C100 250 150 50 250 50C350 50 400 250 550 250" 
            stroke="url(#pathGradient)" 
            strokeDasharray="8 8" 
            strokeWidth="2"
          />
          {/* Pulsing Dots */}
          <motion.circle 
            cx="120" cy="180" r="6" fill="#0ea5e9"
            animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle 
            cx="380" cy="180" r="6" fill="#10b981"
            animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </svg>
      </div>

      {/* Center Main Metric */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
          className="relative flex items-center justify-center"
        >
          <div 
            className="w-64 h-64 rounded-full border border-cyan-500/20 bg-slate-900/40 backdrop-blur-md flex flex-col items-center justify-center text-center p-8"
            style={{
              boxShadow: '0 0 60px -10px rgba(34, 211, 238, 0.4), 0 0 20px -5px rgba(34, 211, 238, 0.2)'
            }}
          >
            <div className="mb-2 bg-cyan-500/10 p-3 rounded-full">
              <Banknote className="text-cyan-400 w-9 h-9" />
            </div>
            <p className="text-white text-6xl font-black tracking-tighter">
              $2.8M
            </p>
            <p className="text-cyan-400 font-bold uppercase text-[10px] tracking-[0.2em] mt-2">
              Incremental Revenue
            </p>
          </div>
        </motion.div>
      </div>

      {/* Left Sidebar Stat */}
      <div className="absolute inset-y-0 left-0 w-24 flex items-center z-30 pl-4">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl py-8 px-4 flex flex-col items-center gap-4 h-fit"
        >
          <MousePointerClick className="text-cyan-400 w-6 h-6" />
          <div className="h-16 w-px bg-slate-700"></div>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
            Lead Conversion
          </p>
          <p className="text-white text-3xl font-black whitespace-nowrap">
            +45%
          </p>
        </motion.div>
      </div>

      {/* Right Sidebar Stat */}
      <div className="absolute inset-y-0 right-0 w-24 flex items-center z-30 pr-4">
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl py-8 px-4 flex flex-col items-center gap-4 h-fit"
        >
          <Wrench className="text-emerald-400 w-6 h-6" />
          <div className="h-16 w-px bg-slate-700"></div>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
            Service Retention
          </p>
          <p className="text-white text-3xl font-black">
            82%
          </p>
        </motion.div>
      </div>

      {/* Bottom Wave Graphic */}
      <div className="absolute bottom-0 left-0 right-0 h-24 opacity-20 pointer-events-none">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 600 100">
          <defs>
            <linearGradient id="revGrad" x1="0" x2="0" y1="0" y2="1">
              <stop stopColor="#06b6d4" stopOpacity="1"></stop>
              <stop offset="1" stopColor="#06b6d4" stopOpacity="0"></stop>
            </linearGradient>
          </defs>
          <motion.path 
            initial={{ d: "M0 100 L0 85 Q 150 95 300 45 T 600 15 L 600 100 Z" }}
            animate={{ d: "M0 100 L0 80 Q 150 90 300 40 T 600 10 L 600 100 Z" }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            fill="url(#revGrad)" 
          />
        </svg>
      </div>
    </div>
  );
}