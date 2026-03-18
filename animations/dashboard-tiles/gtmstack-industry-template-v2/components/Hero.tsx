'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Activity } from 'lucide-react';

interface HeroProps {
  headline: string;
  subheadline: string;
  industryName: string;
}

export default function Hero({ headline, subheadline, industryName }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 bg-navy-900">
      {/* Background Gradients - Adjusted for left-heavy layout */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-teal-900/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Left Column: Content */}
          <motion.div
            key={industryName}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left space-y-8"
          >
            {/* Industry Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
               <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
               <span className="text-gray-300 text-xs font-semibold tracking-wide uppercase">Industry: {industryName}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
              Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">GTM Stack</span> <br />
              for {industryName}
            </h1>

            <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-xl">
              {subheadline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-lg transition-all transform hover:-translate-y-1 shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2">
                Build Your Stack
              </button>
              <button className="px-8 py-4 bg-gold hover:bg-gold-400 text-navy-900 font-bold rounded-lg transition-all transform hover:-translate-y-1 shadow-lg shadow-gold/20 flex items-center justify-center gap-2">
                View Services
              </button>
            </div>
          </motion.div>

          {/* Right Column: Animation Tile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
             {/* Glass Card Container */}
             <div className="relative aspect-square md:aspect-[4/3] w-full rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden flex items-center justify-center p-8 group">
                
                {/* Background Glow inside card */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-teal-500/10 blur-[80px] rounded-full" />

                {/* Animated Chart Simulation */}
                <div className="relative z-10 w-full h-full flex flex-col justify-end">
                   
                   {/* Floating Stats Cards */}
                   <motion.div 
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-8 left-8 bg-navy-800/80 backdrop-blur border border-white/10 p-4 rounded-xl shadow-lg z-20"
                   >
                      <div className="flex items-center gap-3">
                         <div className="p-2 bg-green-500/20 rounded-lg">
                            <TrendingUp className="w-5 h-5 text-green-400" />
                         </div>
                         <div>
                            <p className="text-xs text-gray-400">Revenue Growth</p>
                            <p className="text-lg font-bold text-white">+127%</p>
                         </div>
                      </div>
                   </motion.div>

                   <motion.div 
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                      className="absolute top-20 right-8 bg-navy-800/80 backdrop-blur border border-white/10 p-4 rounded-xl shadow-lg z-20"
                   >
                      <div className="flex items-center gap-3">
                         <div className="p-2 bg-teal-500/20 rounded-lg">
                            <Activity className="w-5 h-5 text-teal-400" />
                         </div>
                         <div>
                            <p className="text-xs text-gray-400">Active Pipeline</p>
                            <p className="text-lg font-bold text-white">$2.4M</p>
                         </div>
                      </div>
                   </motion.div>

                   {/* Bars Animation */}
                   <div className="flex justify-between items-end h-64 w-full px-4 gap-4">
                      {[30, 50, 40, 70, 55, 85, 95].map((height, i) => (
                         <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{ duration: 1.5, delay: i * 0.1, ease: "circOut" }}
                            className="w-full bg-gradient-to-t from-teal-600/20 to-teal-400 rounded-t-lg relative group-hover:from-teal-600/40 group-hover:to-teal-300 transition-colors"
                         >
                            <motion.div 
                               initial={{ opacity: 0 }}
                               animate={{ opacity: 1 }}
                               transition={{ delay: 1.5 + i * 0.1 }}
                               className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-teal-200 font-mono hidden sm:block"
                            >
                               {height}%
                            </motion.div>
                         </motion.div>
                      ))}
                   </div>

                   {/* X Axis Line */}
                   <div className="w-full h-px bg-white/20 mt-1" />
                </div>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}