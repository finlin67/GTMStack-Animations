import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Banknote, 
  TrendingUp, 
  MousePointerClick, 
  MapPin, 
  Car 
} from 'lucide-react';

export default function SalesEnablementTile() {
  const [revenue, setRevenue] = useState(0);
  const [conversionRate, setConversionRate] = useState(45);
  const [retention, setRetention] = useState(82);

  // Animate revenue counter and simulate live data
  useEffect(() => {
    // Initial Animation for Revenue
    const target = 2.8;
    const duration = 2000;
    const interval = 20;
    const steps = duration / interval;
    const increment = target / steps;
    let current = 0;

    const introTimer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setRevenue(target);
        clearInterval(introTimer);
      } else {
        setRevenue(current);
      }
    }, interval);

    // Real-time Data Simulation
    const liveFeedTimer = setInterval(() => {
      // Fluctuating Revenue: Random change between -0.15M and +0.25M
      setRevenue(prev => {
        const change = (Math.random() * 0.4) - 0.15; 
        return Math.max(1.5, prev + change);
      });

      // Fluctuating Conversion Rate: Random change between -2% and +2%
      setConversionRate(prev => {
         const change = Math.floor(Math.random() * 5) - 2;
         return Math.min(99, Math.max(20, prev + change));
      });

      // Fluctuating Retention: Random change between -2% and +2%
      setRetention(prev => {
         const change = Math.floor(Math.random() * 5) - 2;
         return Math.min(100, Math.max(60, prev + change));
      });

    }, 3500); // Updates every 3.5 seconds

    return () => {
      clearInterval(introTimer);
      clearInterval(liveFeedTimer);
    };
  }, []);

  return (
    <div className="relative w-full max-w-[600px] aspect-square bg-[#020617] rounded-xl overflow-hidden border border-slate-800 shadow-2xl bg-[radial-gradient(circle,rgba(251,191,36,0.07)_1px,transparent_1px)] bg-[length:24px_24px] group select-none">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute top-6 left-6 z-20"
      >
        <h3 className="text-amber-500/60 text-xs font-bold uppercase tracking-widest mb-1">Performance Overview</h3>
        <h2 className="text-white text-2xl font-bold">Dealership Growth Visualization</h2>
      </motion.div>

      {/* Main SVG Graphic */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg className="w-full h-full p-12" fill="none" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="sunsetGradient" x1="50" x2="450" y1="250" y2="250">
              <stop stopColor="#f97316" />
              <stop offset="0.5" stopColor="#f59e0b" />
              <stop offset="1" stopColor="#fbbf24" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          {/* Animated Curve */}
          <motion.path 
            d="M50 400C150 400 150 100 250 100C350 100 350 400 450 400" 
            stroke="url(#sunsetGradient)" 
            strokeLinecap="round" 
            strokeWidth="8"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* Point 1: Left */}
          <motion.g 
            transform="translate(140, 240)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <circle className="opacity-20" fill="#f97316" r="16" />
            <foreignObject height="24" width="24" x="-12" y="-12">
              <MousePointerClick className="text-orange-400 w-6 h-6" />
            </foreignObject>
          </motion.g>

          {/* Point 2: Top (Peak) */}
          <motion.g 
            transform="translate(250, 100)"
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1.0, type: "spring" }}
          >
            <circle className="opacity-40 shadow-[0_0_25px_rgba(245,158,11,0.5)]" fill="#f59e0b" r="22" filter="url(#glow)" />
            <foreignObject height="30" width="30" x="-15" y="-15">
              <MapPin className="text-white w-[30px] h-[30px]" />
            </foreignObject>
          </motion.g>

          {/* Point 3: Right */}
          <motion.g 
            transform="translate(360, 240)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 }}
          >
            <circle className="opacity-20" fill="#fbbf24" r="16" />
            <foreignObject height="24" width="24" x="-12" y="-12">
              <Car className="text-amber-400 w-6 h-6" />
            </foreignObject>
          </motion.g>
        </svg>
      </div>

      {/* Floating Info Cards Overlay */}
      <div className="absolute inset-0 z-10 p-8 flex flex-col justify-between">
        
        {/* Top Left Card */}
        <motion.div 
          className="flex justify-between items-start mt-12"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4 }}
        >
          <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-xl p-4 w-44 hover:border-amber-500/30 transition-colors duration-300">
            <p className="text-amber-500/70 text-xs font-bold uppercase mb-1">Conversion Rate</p>
            <p className="text-white text-4xl font-extrabold tracking-tight">+{conversionRate}%</p>
            <div className="flex items-center gap-1 mt-1 text-amber-400">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-bold">12% growth</span>
            </div>
          </div>
        </motion.div>

        {/* Center Hero Card */}
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6, type: "spring", stiffness: 100 }}
        >
          <div className="flex flex-col items-center">
            <motion.div 
              animate={{ boxShadow: ["0 0 20px rgba(245, 158, 11, 0.2)", "0 0 40px rgba(245, 158, 11, 0.6)", "0 0 20px rgba(245, 158, 11, 0.2)"] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="bg-amber-500/20 backdrop-blur-2xl border border-amber-500/30 rounded-full p-10 mb-4 flex items-center justify-center relative"
            >
              <div className="absolute inset-0 rounded-full border border-amber-500/20 animate-ping opacity-20"></div>
              <Banknote className="text-white w-14 h-14" />
            </motion.div>
            <div className="text-center">
              <p className="text-white text-5xl font-black tracking-tighter drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                ${revenue.toFixed(1)}M
              </p>
              <p className="text-amber-400 font-bold uppercase text-sm tracking-[0.2em] mt-2">Incremental Revenue</p>
            </div>
          </div>
        </motion.div>

        {/* Bottom Right Card */}
        <motion.div 
          className="flex justify-end mb-16"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.8 }}
        >
          <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-xl p-4 w-44 text-right hover:border-amber-500/30 transition-colors duration-300">
            <p className="text-amber-500/70 text-xs font-bold uppercase mb-1">Service Retention</p>
            <p className="text-white text-3xl font-extrabold tracking-tight">{retention}%</p>
            <p className="text-amber-400 text-xs font-bold mt-1">Loyalty Peak</p>
          </div>
        </motion.div>
      </div>

      {/* Bottom Area Gradient Graph */}
      <div className="absolute bottom-0 left-0 right-0 h-32 opacity-40 z-0 pointer-events-none">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 600 150">
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="revenueGradient" x1="0" x2="0" y1="0" y2="150">
              <stop stopColor="#f59e0b" stopOpacity="0.8" />
              <stop offset="1" stopColor="#f97316" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path 
            d="M0 150 L0 120 Q 150 130 300 80 T 600 20 L 600 150 Z" 
            fill="url(#revenueGradient)"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
          />
          <motion.path 
            d="M0 120 Q 150 130 300 80 T 600 20" 
            fill="none" 
            stroke="#fbbf24" 
            strokeWidth="4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 2.2, duration: 1.5 }}
          />
        </svg>
      </div>
    </div>
  );
}