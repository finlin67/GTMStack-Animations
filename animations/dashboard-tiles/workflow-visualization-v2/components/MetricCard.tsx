
import React from 'react';
import { motion } from 'framer-motion';

interface MetricCardProps {
  label: string;
  value: string;
  unit: string;
  trend: string;
  color: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ label, value, unit, trend, color }) => {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl flex flex-col gap-2 hover:bg-slate-900/60 transition-colors cursor-default"
    >
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{label}</span>
      <div className="flex items-baseline gap-2">
        <span className={`text-3xl font-bold ${color}`}>{value}</span>
        <span className="text-slate-500 text-sm font-medium">{unit}</span>
      </div>
      <div className="flex items-center gap-2 mt-1">
        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 1V7M4 1L1 4M4 1L7 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {trend}
        </div>
        <span className="text-[10px] text-slate-600 font-medium">vs last 24h</span>
      </div>
    </motion.div>
  );
};
