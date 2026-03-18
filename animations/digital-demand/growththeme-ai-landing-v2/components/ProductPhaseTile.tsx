'use client';

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  Brain,
  LineChart,
  Sparkles,
} from "lucide-react";

interface PathData {
  id: string;
  d: string;
  color: string;
  label: string;
  value: string;
}

const PATHS: PathData[] = [
  {
    id: "market-intel",
    d: "M150 120 Q 200 150, 250 250",
    color: "#2563eb",
    label: "Market Intel Stream",
    value: "84ms Latency",
  },
  {
    id: "sentiment",
    d: "M160 500 Q 220 450, 260 350",
    color: "#10b981",
    label: "Sentiment Feedback",
    value: "Positive (0.82)",
  },
  {
    id: "conversion",
    d: "M350 250 Q 400 180, 480 140",
    color: "#2563eb",
    label: "Conversion Flow",
    value: "+12.4% Lift",
  },
  {
    id: "growth-assets",
    d: "M350 350 Q 420 420, 480 500",
    color: "#8b5cf6",
    label: "Asset Optimization",
    value: "Ready for Scale",
  },
];

export default function ProductPhaseTile() {
  const [hoveredPath, setHoveredPath] = useState<PathData | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  // Animation variant for the "float" effect used on cards and dots
  const floatVariant = (delay: number) => ({
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        repeatType: "mirror" as const,
        delay: delay,
      },
    },
  });

  return (
    <div className="w-full aspect-square max-w-[600px] relative flex items-center justify-center select-none overflow-hidden bg-slate-950/20 rounded-xl">
      {/* --- Background Floating Dots --- */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <motion.div
          variants={floatVariant(0)}
          animate="animate"
          className="absolute top-1/4 left-1/4 h-1.5 w-1.5 rounded-full bg-blue-500"
        />
        <motion.div
          variants={floatVariant(1)}
          animate="animate"
          className="absolute top-1/2 right-1/4 h-1.5 w-1.5 rounded-full bg-purple-500"
        />
        <motion.div
          variants={floatVariant(2)}
          animate="animate"
          className="absolute top-3/4 left-1/3 h-2 w-2 rounded-full bg-emerald-500"
        />
        <motion.div
          variants={floatVariant(3)}
          animate="animate"
          className="absolute bottom-1/4 right-1/3 h-2.5 w-2.5 rounded-full bg-cyan-600"
        />
      </div>

      {/* --- Interactive Connecting Lines (SVG Overlay) --- */}
      <svg
        className="absolute inset-0 h-full w-full z-10"
        viewBox="0 0 600 600"
        onMouseMove={handleMouseMove}
      >
        {PATHS.map((path, idx) => {
          const isHovered = hoveredPath?.id === path.id;
          return (
            <g key={path.id}>
              {/* Hit Area: Invisible path for easier hovering */}
              <path
                d={path.d}
                fill="none"
                stroke="transparent"
                strokeWidth="24"
                className="cursor-crosshair pointer-events-auto"
                onMouseEnter={() => setHoveredPath(path)}
                onMouseLeave={() => setHoveredPath(null)}
              />
              {/* Visible Path */}
              <motion.path
                d={path.d}
                fill="none"
                stroke={path.color}
                strokeWidth={isHovered ? 3 : 1.5}
                // Fixed: The 'opacity' prop on a motion component expects a single value, 
                // not an array. Keyframe arrays should only be used within the 'animate' prop.
                opacity={isHovered ? 1 : 0.5}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: [0, 1], 
                  opacity: isHovered ? [0.8] : [0.5],
                  strokeWidth: isHovered ? [1.5, 4, 3] : [1.5]
                }}
                transition={{ 
                  pathLength: { duration: 1.5, delay: idx * 0.2 },
                  opacity: { duration: 0.3 },
                  strokeWidth: { duration: 0.2 }
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* --- Tooltip --- */}
      <AnimatePresence>
        {hoveredPath && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none absolute z-50 rounded-lg border border-slate-700 bg-slate-900/95 p-3 shadow-2xl backdrop-blur-md"
            style={{
              left: mousePos.x + 15,
              top: mousePos.y + 15,
            }}
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Data Node
              </span>
              <span className="text-sm font-bold text-white">
                {hoveredPath.label}
              </span>
              <div className="mt-1 flex items-center gap-2">
                <div 
                  className="h-1.5 w-1.5 rounded-full" 
                  style={{ backgroundColor: hoveredPath.color }}
                />
                <span className="text-xs font-medium text-emerald-400">
                  {hoveredPath.value}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Central Core Card --- */}
      <motion.div
        animate={{ scale: [0.8, 1], opacity: [0, 1] }}
        transition={{ duration: 0.8 }}
        className="relative z-20 flex h-[280px] w-[280px] flex-col items-center justify-center border-2 border-blue-600 bg-slate-950/80 p-8 backdrop-blur-sm md:h-[340px] md:w-[340px]"
      >
        <div className="flex flex-col items-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-400">
            Revenue Growth
          </p>
          <motion.h2 
            animate={{ scale: hoveredPath ? [1, 1.05, 1] : [1] }}
            className="bg-gradient-to-br from-emerald-400 to-teal-300 bg-clip-text text-6xl font-bold leading-none tracking-tighter text-transparent md:text-7xl"
          >
            +42%
          </motion.h2>
          <p className="mt-1 text-sm font-bold uppercase tracking-tighter text-emerald-500">
            Conversion Lift
          </p>
          <div className="mt-6 flex flex-col items-center">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
              Growth Engine v2.0
            </span>
            <div className="mt-2 h-1 w-16 bg-gradient-to-r from-blue-600 to-cyan-500" />
          </div>
        </div>
      </motion.div>

      {/* --- Floating Panel: Top Left (Market Intel) --- */}
      <motion.div
        variants={floatVariant(0)}
        animate="animate"
        className={`absolute left-[5%] top-[10%] z-30 w-[160px] border transition-colors duration-300 bg-[#0f172a] p-4 md:w-[200px] ${hoveredPath?.id === 'market-intel' ? 'border-cyan-500 shadow-lg shadow-cyan-500/10' : 'border-blue-800'}`}
      >
        <div>
          <div className="mb-2 flex items-center gap-3">
            <TrendingUp className="h-4 w-4 text-cyan-400" />
            <span className="text-xs font-bold text-white">Market Intel</span>
          </div>
          <div className="space-y-1.5">
            <div className="h-1.5 w-full overflow-hidden bg-slate-800">
              <motion.div
                animate={{ width: ["0%", "75%"] }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-blue-600 to-cyan-500"
              />
            </div>
            <p className="text-[10px] text-slate-500">Analyzing 24 data streams</p>
          </div>
        </div>
      </motion.div>

      {/* --- Floating Panel: Bottom Left (Sentiment Analysis) --- */}
      <motion.div
        variants={floatVariant(1.5)}
        animate="animate"
        className={`absolute bottom-[15%] left-[5%] z-30 w-[160px] border transition-colors duration-300 bg-[#0f172a] p-4 md:w-[200px] ${hoveredPath?.id === 'sentiment' ? 'border-emerald-500 shadow-lg shadow-emerald-500/10' : 'border-blue-800'}`}
      >
        <div>
          <div className="mb-2 flex items-center gap-3">
            <Brain className="h-4 w-4 text-emerald-400" />
            <span className="text-xs font-bold text-white">
              Sentiment Analysis
            </span>
          </div>
          <div className="flex h-8 items-end gap-1">
            {[0.5, 0.75, 1, 0.66, 0.33].map((h, i) => (
              <motion.div
                key={i}
                className="w-2 bg-emerald-500"
                style={{ opacity: 0.4 + i * 0.1 }}
                animate={{ height: [`${h * 100}%`, `${h * 60}%`, `${h * 100}%`] }}
                transition={{ duration: 2 + i * 0.2, repeat: Infinity, repeatType: "mirror" as const }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* --- Floating Panel: Top Right (Messaging Node) --- */}
      <motion.div
        variants={floatVariant(0.8)}
        animate="animate"
        className={`absolute right-[5%] top-[15%] z-30 w-[180px] border transition-colors duration-300 bg-[#0f172a] p-4 md:w-[220px] ${hoveredPath?.id === 'conversion' ? 'border-blue-500 shadow-lg shadow-blue-500/10' : 'border-blue-800'}`}
      >
        <div>
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-3 w-3 text-cyan-400" />
              <span className="text-[10px] font-bold uppercase tracking-tighter text-cyan-400">
                Messaging Node
              </span>
            </div>
            <span className="border border-emerald-400 bg-gradient-to-br from-emerald-500 to-teal-400 px-1.5 text-[9px] text-white">
              99.2% ROI
            </span>
          </div>
          <p className="text-[11px] italic leading-relaxed text-slate-300">
            &quot;Unlock unprecedented scale with AI-driven market intelligence...&quot;
          </p>
        </div>
      </motion.div>

      {/* --- Floating Panel: Bottom Right (Growth Assets) --- */}
      <motion.div
        variants={floatVariant(2.2)}
        animate="animate"
        className={`absolute bottom-[10%] right-[5%] z-30 w-[180px] border transition-colors duration-300 bg-[#0f172a] p-4 md:w-[220px] ${hoveredPath?.id === 'growth-assets' ? 'border-purple-500 shadow-lg shadow-purple-500/10' : 'border-blue-800'}`}
      >
        <div>
          <div className="mb-2 flex items-center gap-3">
            <LineChart className="h-4 w-4 text-purple-400" />
            <span className="text-xs font-bold text-white">Growth Assets</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="h-2 w-full bg-slate-800" />
            <div className="h-2 w-2/3 bg-slate-800" />
            <motion.div
              className="h-2 bg-gradient-to-r from-blue-600 to-cyan-500"
              animate={{ width: ["0%", "80%"] }}
              transition={{ duration: 1, delay: 1 }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}