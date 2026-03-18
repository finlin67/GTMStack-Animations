
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * RevenueAnalytics Component
 * An isometric-style illustration of 5 growing bars with a trend line and particles.
 * 
 * DESIGN SPECIFICATIONS:
 * - Canvas: 600x600 viewBox
 * - Style: Slate, Blue, Indigo gradients with targeted highlights
 * - Elements: SVG Primitives (Circles, Rects, Polygons)
 * - Animation: Smooth loops using Framer Motion
 */

interface BarData {
  id: number;
  x: number;
  y: number;
  width: number;
  maxHeight: number;
  delay: number;
}

const RevenueAnalytics: React.FC = () => {
  // Define bar positions and heights in the 600x600 coordinate system
  const bars: BarData[] = useMemo(() => [
    { id: 1, x: 150, y: 450, width: 40, maxHeight: 100, delay: 0 },
    { id: 2, x: 220, y: 450, width: 40, maxHeight: 160, delay: 0.2 },
    { id: 3, x: 290, y: 450, width: 40, maxHeight: 220, delay: 0.4 },
    { id: 4, x: 360, y: 450, width: 40, maxHeight: 280, delay: 0.6 },
    { id: 5, x: 430, y: 450, width: 40, maxHeight: 360, delay: 0.8 },
  ], []);

  // Calculate trend line points based on bar tops
  const trendLinePoints = bars
    .map(bar => `${bar.x + 10},${bar.y - bar.maxHeight - 10}`)
    .join(' ');

  // Particles for the confetti effect on the final bar
  const particles = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    angle: (i / 12) * Math.PI * 2,
    distance: 40 + Math.random() * 40,
    size: 4 + Math.random() * 6,
  }));

  // Grid line definitions for the isometric floor
  const gridLines = useMemo(() => {
    const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
    const steps = 10;
    
    for (let i = 1; i < steps; i++) {
      const t = i / steps;
      lines.push({
        x1: 300 + (550 - 300) * t,
        y1: 550 + (425 - 550) * t,
        x2: 50 + (300 - 50) * t,
        y2: 425 + (300 - 425) * t,
      });
      lines.push({
        x1: 300 + (50 - 300) * t,
        y1: 550 + (425 - 550) * t,
        x2: 550 + (300 - 550) * t,
        y2: 425 + (300 - 425) * t,
      });
    }
    return lines;
  }, []);

  return (
    <div className="w-[600px] h-[600px] relative bg-slate-50 rounded-xl overflow-hidden shadow-inner">
      <svg
        viewBox="0 0 600 600"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="barFrontGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1e40af" />
          </linearGradient>
          <linearGradient id="barSideGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="100%" stopColor="#312e81" />
          </linearGradient>
          <linearGradient id="barTopGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#bfdbfe" />
            <stop offset="45%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <linearGradient id="floorGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#f1f5f9" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Floor Plane (Isometric Diamond) */}
        <path
          d="M300 550 L550 425 L300 300 L50 425 Z"
          fill="url(#floorGradient)"
          stroke="#e2e8f0"
          strokeWidth="2"
        />

        {/* Enhanced Grid Lines */}
        <g>
          {gridLines.map((line, i) => (
            <motion.line
              key={`grid-${i}`}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="#94a3b8"
              strokeWidth="0.75"
              strokeDasharray="4 6"
              initial={{ opacity: 0.1 }}
              animate={{ 
                opacity: [0.1, 0.3, 0.1],
                strokeDashoffset: [0, -20]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "linear",
                delay: i * 0.1 
              }}
            />
          ))}
          
          {/* Scanning Pulse Line */}
          <motion.path
            d="M50 425 L300 550 L550 425"
            stroke="#3b82f6"
            strokeWidth="2"
            opacity="0.2"
            filter="url(#glow)"
            initial={{ y: -125, opacity: 0 }}
            animate={{ 
              y: [0, -125],
              opacity: [0, 0.4, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </g>

        {/* The Bars */}
        {bars.map((bar) => (
          <Bar
            key={bar.id}
            x={bar.x}
            y={bar.y}
            width={bar.width}
            maxHeight={bar.maxHeight}
            delay={bar.delay}
            isLast={bar.id === 5}
          />
        ))}

        {/* Trend Line Overlay */}
        <motion.polyline
          points={trendLinePoints}
          fill="none"
          stroke="#6366f1"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1000"
          initial={{ strokeDashoffset: 1000 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1.5, delay: 1.2, ease: "easeInOut" }}
        />

        {/* Trend Line Dots */}
        {bars.map((bar) => (
          <motion.circle
            key={`dot-${bar.id}`}
            cx={bar.x + 10}
            cy={bar.y - bar.maxHeight - 10}
            r="5"
            fill="#818cf8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2 + bar.delay, duration: 0.3 }}
          />
        ))}

        {/* Confetti Particles on Last Bar */}
        <g transform={`translate(${bars[4].x + 10}, ${bars[4].y - bars[4].maxHeight - 10})`}>
          {particles.map((p) => (
            <motion.rect
              key={p.id}
              width={p.size}
              height={p.size}
              fill={p.id % 2 === 0 ? "#818cf8" : "#2dd4bf"}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              animate={{
                x: Math.cos(p.angle) * p.distance,
                y: Math.sin(p.angle) * p.distance,
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                rotate: 360
              }}
              transition={{
                delay: 2.2,
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "easeOut"
              }}
            />
          ))}
        </g>
      </svg>
      
      {/* Decorative Labels */}
      <div className="absolute top-6 left-6 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
          <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Projected Yield</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></div>
          <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Growth Index</span>
        </div>
      </div>

      <div className="absolute bottom-6 right-8 text-right">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.5 }}
          className="text-2xl font-black text-slate-800"
        >
          +42.8%
        </motion.div>
        <div className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Target Achieved</div>
      </div>
    </div>
  );
};

interface BarProps {
  x: number;
  y: number;
  width: number;
  maxHeight: number;
  delay: number;
  isLast: boolean;
}

const Bar: React.FC<BarProps> = ({ x, y, width, maxHeight, delay, isLast }) => {
  const skewX = 20;
  const skewY = 10;

  return (
    <g>
      {/* 5th Bar Glow Shadow */}
      {isLast && (
        <motion.ellipse
          cx={x + width / 2}
          cy={y + 10}
          rx={40}
          ry={15}
          fill="rgba(99, 102, 241, 0.3)"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
          filter="url(#glow)"
        />
      )}

      {/* Main Bar Group */}
      <motion.g
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay, duration: 0.8, ease: "circOut" }}
        style={{ originY: "450px" }}
      >
        {/* Side Face */}
        <path
          d={`M${x + width} ${y} L${x + width + skewX} ${y - skewY} L${x + width + skewX} ${y - maxHeight - skewY} L${x + width} ${y - maxHeight} Z`}
          fill="url(#barSideGradient)"
        />
        
        {/* Front Face */}
        <rect
          x={x}
          y={y - maxHeight}
          width={width}
          height={maxHeight}
          fill="url(#barFrontGradient)"
        />

        {/* Top Face */}
        <motion.path
          d={`M${x} ${y - maxHeight} L${x + skewX} ${y - maxHeight - skewY} L${x + width + skewX} ${y - maxHeight - skewY} L${x + width} ${y - maxHeight} Z`}
          fill="url(#barTopGradient)"
          animate={isLast ? {
            fill: ["#818cf8", "#ffffff", "#c7d2fe", "#818cf8"],
          } : {}}
          transition={isLast ? {
            duration: 2.5,
            repeat: Infinity,
            repeatDelay: 0.5,
            delay: 2.2
          } : {}}
        />
      </motion.g>
    </g>
  );
};

export default RevenueAnalytics;
