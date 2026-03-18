import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SparklineProps {
  data: number[];
  colorHex: string;
  width?: number;
  height?: number;
  label: string;
  isDark: boolean;
}

export default function Sparkline({ data, colorHex, width = 100, height = 28, label, isDark }: SparklineProps) {
  const [hovered, setHovered] = useState(false);
  
  const min = Math.min(...data) * 0.8;
  const max = Math.max(...data, 100);
  const range = max - min || 1;

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((d - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  const areaPath = `M 0,${height} ${data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((d - min) / range) * height;
    return `L ${x},${y}`;
  }).join(' ')} L ${width},${height} Z`;

  return (
    <div 
      className="relative flex items-center justify-center cursor-crosshair group py-1"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <svg width={width} height={height} className="overflow-visible">
        <defs>
          <linearGradient id={`gradient-${label}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={colorHex} stopOpacity={isDark ? 0.3 : 0.2} />
            <stop offset="100%" stopColor={colorHex} stopOpacity="0" />
          </linearGradient>
        </defs>
        
        <motion.path 
          d={areaPath} 
          fill={`url(#gradient-${label})`} 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        
        <motion.polyline
          points={points}
          fill="none"
          stroke={colorHex}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        <AnimatePresence>
          {hovered && data.map((d, i) => {
             const x = (i / (data.length - 1)) * width;
             const y = height - ((d - min) / range) * height;
             return (
               <motion.circle
                 key={i}
                 initial={{ opacity: 0, r: 0 }}
                 animate={{ opacity: 1, r: 3 }}
                 exit={{ opacity: 0, r: 0 }}
                 cx={x}
                 cy={y}
                 fill={isDark ? "#fff" : "#fff"}
                 stroke={colorHex}
                 strokeWidth="2"
               />
             )
          })}
        </AnimatePresence>
      </svg>

      <AnimatePresence>
        {hovered && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.9 }}
            className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 ${isDark ? 'bg-slate-900/90 border-slate-700 text-slate-200' : 'bg-white/90 border-slate-200 text-slate-700'} backdrop-blur-md border rounded-lg shadow-xl z-20 pointer-events-none min-w-[100px]`}
          >
            <div className="flex items-center justify-between gap-3 mb-1">
              <span className="text-[9px] uppercase font-bold tracking-wider opacity-70">Trend</span>
              <span className="text-[9px] font-mono font-bold" style={{ color: colorHex }}>
                +{((data[data.length-1] - data[0]) / data[0] * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex items-end gap-1">
              <span className={`text-xs font-bold font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>{data[data.length-1]}%</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}