'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, TrendingUp, MailCheck, Banknote, RefreshCw, Layout } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SequenceLadderGallery
 * A high-fidelity analytics component designed for SaaS dashboards.
 * Features state-driven jittering metrics to simulate real-time data flow.
 */
export default function SequenceLadderGallery() {
  // Stats state to handle "live" data jitter
  const [stats, setStats] = useState({
    outreach: 12842,
    engagement: 4102,
    converted: 892,
  });

  // Recursive timeout for organic jittering of metrics
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const updateStats = () => {
      setStats((prev) => ({
        outreach: prev.outreach + (Math.random() > 0.5 ? Math.floor(Math.random() * 3) : -Math.floor(Math.random() * 2)),
        engagement: prev.engagement + (Math.random() > 0.8 ? 1 : 0),
        converted: prev.converted + (Math.random() > 0.95 ? 1 : 0),
      }));

      // Random intervals between 2s and 5s for "organic" feel
      const nextTick = 2000 + Math.random() * 3000;
      timeoutId = setTimeout(updateStats, nextTick);
    };

    updateStats();
    return () => clearTimeout(timeoutId);
  }, []);

  // Calculate conversion rates dynamically
  const engagementRate = ((stats.engagement / stats.outreach) * 100).toFixed(1);
  const conversionRate = ((stats.converted / stats.engagement) * 100).toFixed(1);

  return (
    <div className="w-full h-full flex justify-center items-center p-4 bg-slate-950/20">
      <div 
        className="relative w-full aspect-square max-w-[600px] rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.8)] ring-1 ring-[#A6D1FF]/20 font-sans selection:bg-[#A6D1FF]/30"
        style={{
          background: `radial-gradient(circle at 50% 0%, #0D1846 0%, #05091d 100%)`
        }}
      >
        {/* Aesthetic Layers */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(166,209,255,0.08)_0%,transparent_75%)] pointer-events-none" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#A6D1FF] rounded-full blur-[180px] opacity-[0.07] pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col p-10 lg:p-12">
          
          {/* Header */}
          <div className="flex justify-between items-start mb-12">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Layout className="w-4 h-4 text-[#A6D1FF]/60" />
                <h2 className="text-white text-3xl font-extrabold tracking-tight">Sequence Ladder</h2>
              </div>
              <p className="text-[#A6D1FF]/50 text-sm font-medium tracking-wide">REAL-TIME FUNNEL VISUALIZATION</p>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#A6D1FF]/5 border border-[#A6D1FF]/20 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
              <motion.div 
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" as const }}
                className="w-2.5 h-2.5 rounded-full bg-[#A6D1FF] shadow-[0_0_15px_rgba(166,209,255,0.6)]" 
              />
              <span className="text-[#A6D1FF] text-[10px] font-black uppercase tracking-[0.2em]">Live Stream</span>
            </div>
          </div>

          {/* Ladder Stages */}
          <div className="flex-1 flex flex-col justify-center space-y-2">
            
            {/* Stage 1: Outreach */}
            <div className="flex items-stretch gap-6 h-32">
              <div className="flex flex-col items-center w-16 shrink-0 relative">
                <div className="w-16 h-16 rounded-2xl bg-[#0D1846] border border-[#A6D1FF]/30 flex items-center justify-center shadow-2xl relative z-20 group-hover:border-[#A6D1FF]/60 transition-colors">
                  <Send className="text-[#A6D1FF]/90 w-8 h-8" strokeWidth={1.5} />
                </div>
                <div className="w-[2px] flex-1 bg-gradient-to-b from-[#A6D1FF]/10 to-[#A6D1FF]/40 my-[-2px] relative z-0" />
              </div>
              
              <div className="flex-1 pb-6">
                <div className="h-full rounded-3xl flex items-center justify-between px-10 pr-6 border border-white/5 bg-white/[0.03] backdrop-blur-md hover:bg-white/[0.05] transition-all group cursor-default">
                  <div className="flex flex-col">
                    <span className="text-[#A6D1FF]/40 text-[10px] font-bold uppercase tracking-[0.15em] mb-1">Total Outreach</span>
                    <span className="text-white text-3xl font-bold tabular-nums tracking-tight">
                      {stats.outreach.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                    <TrendingUp className="text-[#A6D1FF]/60 w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Stage 2: Engagement */}
            <div className="flex items-stretch gap-6 h-32">
              <div className="flex flex-col items-center w-16 shrink-0 relative">
                <div className="w-16 h-16 rounded-2xl bg-[#0D1846] border-2 border-[#A6D1FF] flex items-center justify-center shadow-[0_0_30px_rgba(166,209,255,0.2)] relative z-20">
                  <MailCheck className="text-[#A6D1FF] w-8 h-8" strokeWidth={1.5} style={{ filter: 'drop-shadow(0 0 10px rgba(166,209,255,0.4))' }} />
                </div>
                <div className="w-[3px] flex-1 bg-gradient-to-b from-[#A6D1FF] to-[#A6D1FF]/60 my-[-2px] relative z-0 shadow-[0_0_20px_rgba(166,209,255,0.3)]" />
              </div>

              <div className="flex-1 pb-6">
                <div className="h-full rounded-3xl flex items-center justify-between px-10 pr-6 border-y border-r border-[#A6D1FF]/20 border-l-[6px] border-l-[#A6D1FF] bg-gradient-to-br from-[#A6D1FF]/10 to-transparent backdrop-blur-xl group cursor-default">
                  <div className="flex flex-col">
                    <span className="text-[#A6D1FF]/50 text-[10px] font-bold uppercase tracking-[0.15em] mb-1">Active Engagement</span>
                    <span className="text-[#A6D1FF] text-3xl font-bold tabular-nums tracking-tight" style={{ textShadow: '0 0 20px rgba(166,209,255,0.4)' }}>
                      {stats.engagement.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#A6D1FF]/20 px-4 py-2 rounded-full border border-[#A6D1FF]/30 shadow-inner">
                    <span className="text-[#A6D1FF] font-black text-sm">{engagementRate}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stage 3: Conversion */}
            <div className="flex items-stretch gap-6 h-28">
              <div className="flex flex-col items-center w-16 shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-[#A6D1FF] flex items-center justify-center shadow-[0_0_50px_rgba(166,209,255,0.5)] relative z-20 ring-[6px] ring-[#0D1846]">
                  <Banknote className="text-[#0D1846] w-9 h-9" strokeWidth={2} />
                </div>
              </div>

              <div className="flex-1">
                <div className="relative h-full rounded-3xl flex items-center justify-between px-10 pr-6 bg-gradient-to-r from-[#A6D1FF]/25 to-[#A6D1FF]/5 border border-[#A6D1FF]/40 backdrop-blur-2xl overflow-hidden group/final">
                  <motion.div 
                    animate={{ x: [-200, 400] }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: "loop" as const }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent w-full pointer-events-none"
                  />
                  
                  <div className="flex flex-col relative z-10">
                    <span className="text-white text-[10px] font-black uppercase tracking-[0.2em] mb-1 opacity-70">Converted Growth</span>
                    <span className="text-white text-4xl font-black tabular-nums tracking-tight" style={{ textShadow: '0 0 25px rgba(255,255,255,0.3)' }}>
                      {stats.converted.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex flex-col items-end relative z-10">
                    <div className="flex items-center gap-1 bg-[#A6D1FF] text-[#0D1846] px-5 py-2.5 rounded-2xl shadow-[0_10px_30px_rgba(166,209,255,0.4)] group-hover/final:scale-105 transition-transform">
                      <span className="font-black text-2xl tracking-tighter">{conversionRate}%</span>
                    </div>
                    <span className="text-[#A6D1FF] text-[9px] mt-2 font-black tracking-[0.25em] drop-shadow-md">ROI OPTIMIZED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Status */}
          <div className="mt-10 flex justify-center border-t border-white/5 pt-8">
            <div className="flex items-center gap-3 px-5 py-2 rounded-full bg-white/[0.02] border border-white/5">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 12, repeat: Infinity, repeatType: "loop" as const }}
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#A6D1FF]/40" />
              </motion.div>
              <span className="text-[10px] text-[#A6D1FF]/40 font-bold uppercase tracking-[0.15em]">
                Synchronized with Global SaaS Fabric
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
