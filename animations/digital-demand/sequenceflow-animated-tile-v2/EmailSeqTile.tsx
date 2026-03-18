'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Eye, MousePointerClick, DollarSign } from 'lucide-react';

/**
 * Animated Counter using recursive setTimeout for organic jitter
 * Avoids 'ease' property to comply with Framer Motion v12 gallery rules.
 */
const Counter = ({ value, duration = 2 }: { value: string | number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const numericValue = typeof value === 'string' ? parseInt(value.replace(/,/g, ''), 10) : value;

  useEffect(() => {
    let currentFrame = 0;
    const totalFrames = Math.round(duration * 60);
    let timeoutId: number;

    const tick = () => {
      currentFrame++;
      const progress = currentFrame / totalFrames;
      // Manual ease-out quart implementation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4); 
      
      const currentCount = Math.round(0 + (numericValue - 0) * easeOutQuart);
      setCount(currentCount);

      if (currentFrame < totalFrames) {
        // Organic jitter simulation
        const jitter = Math.random() * 2;
        timeoutId = window.setTimeout(tick, (1000 / 60) + jitter);
      }
    };

    tick();
    return () => clearTimeout(timeoutId);
  }, [numericValue, duration]);

  return <span>{count.toLocaleString()}</span>;
};

/**
 * Individual Step Card component
 */
const StepCard = ({ 
  step, title, value, subValue, subColor, icon, gradient, shadowColor, delay = 0, suffix 
}: {
  step: string;
  title: string;
  value: string | number;
  subValue: string;
  subColor: string;
  icon: React.ReactNode;
  gradient: string;
  shadowColor: string;
  delay?: number;
  suffix?: string;
}) => {
  return (
    <motion.div
      animate={{ opacity: [0, 1], y: [20, 0] }}
      transition={{ duration: 0.5, delay }}
      className="relative z-10 flex flex-col items-center w-full max-w-[280px] bg-white/5 border border-white/10 py-3 px-4 rounded-xl backdrop-blur-md shadow-xl hover:bg-white/10 transition-colors group"
    >
      <div className="flex items-center gap-3 w-full mb-2">
        <div className={`size-10 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg ${shadowColor}`}>
          {icon}
        </div>
        <div className="flex flex-col">
          <span className="text-white/40 text-[9px] font-bold uppercase tracking-[0.15em]">{step}</span>
          <h3 className="text-white text-sm font-bold leading-none">{title}</h3>
        </div>
      </div>
      
      <div className="w-full flex items-end justify-between border-t border-white/5 pt-2">
        <div className="text-white text-2xl font-black tracking-tight flex items-baseline gap-0.5">
          <Counter value={value} />
          {suffix && <span className="text-sm opacity-60 font-bold ml-1">{suffix}</span>}
        </div>
        <div className={`px-2 py-0.5 rounded-md text-[9px] font-bold border overflow-hidden ${subColor} min-w-[50px] text-center`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={subValue}
              animate={{ y: [10, 0], opacity: [0, 1] }}
              exit={{ y: [-10], opacity: [0] }}
              transition={{ duration: 0.3, delay: delay + 0.3 }}
            >
              {subValue}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Animated Connector Line
 */
const Connector = ({ gradient, delay }: { gradient: string, delay: number }) => {
  return (
    <div className="h-5 w-1 flex flex-col items-center relative z-0 my-0.5">
      <motion.div 
        animate={{ height: ["0%", "100%"] }}
        transition={{ duration: 0.4, delay }}
        className={`w-0.5 bg-gradient-to-b ${gradient} shadow-[0_0_10px_rgba(249,116,21,0.4)] rounded-full`}
      />
    </div>
  );
};

/**
 * Main Sequence Dashboard Tile
 */
export default function EmailSeqTile() {
  return (
    <div className="w-full aspect-square max-w-[600px] bg-[#0f172a] rounded-2xl border border-white/10 overflow-hidden relative flex flex-col items-center justify-center p-6 shadow-2xl">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(249,116,21,0.1),transparent_70%)] pointer-events-none" />
      <div className="absolute top-10 right-10 size-48 bg-[#f97415]/10 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 size-48 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-56 bg-fuchsia-500/5 blur-[90px] rounded-full pointer-events-none" />

      {/* Content Stack */}
      <div className="relative z-10 flex flex-col items-center w-full">
        <StepCard
          step="Step 01"
          title="Total Sent"
          value={12450}
          subValue="+14.2%"
          subColor="bg-green-500/10 text-green-400 border-green-500/20"
          icon={<Mail size={18} />}
          gradient="from-[#f97415] to-orange-600"
          shadowColor="shadow-orange-500/30"
          delay={0.1}
        />

        <Connector gradient="from-[#f97415] to-blue-500" delay={0.4} />

        <StepCard
          step="Step 02"
          title="Opened"
          value={8210}
          subValue="65.9% Open"
          subColor="bg-green-500/10 text-green-400 border-green-500/20"
          icon={<Eye size={18} />}
          gradient="from-blue-500 to-indigo-600"
          shadowColor="shadow-blue-500/30"
          delay={0.6}
        />

        <Connector gradient="from-blue-500 to-emerald-500" delay={0.8} />

        <StepCard
          step="Step 03"
          title="Total Clicks"
          value={1142}
          subValue="13.9% CTR"
          subColor="bg-[#f97415]/10 text-[#f97415] border-[#f97415]/20"
          icon={<MousePointerClick size={18} />}
          gradient="from-emerald-500 to-teal-600"
          shadowColor="shadow-emerald-500/30"
          delay={1.0}
        />

        <Connector gradient="from-teal-600 to-fuchsia-600" delay={1.2} />

        <StepCard
          step="Step 04"
          title="Est. ROAS"
          value={420}
          suffix="%"
          subValue="4.2x ROI"
          subColor="bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/20"
          icon={<DollarSign size={18} />}
          gradient="from-fuchsia-600 to-purple-600"
          shadowColor="shadow-fuchsia-500/30"
          delay={1.4}
        />
      </div>
    </div>
  );
}
