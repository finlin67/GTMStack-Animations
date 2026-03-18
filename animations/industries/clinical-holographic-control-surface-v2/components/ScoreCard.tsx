import React from 'react';
import { Radar } from 'lucide-react';
import { motion } from 'framer-motion';

interface ScoreCardProps {
  isDark: boolean;
  colors: any;
  marketScore: number;
}

export default function ScoreCard({ isDark, colors, marketScore }: ScoreCardProps) {
  return (
    <div className={`col-span-4 ${colors.panel} rounded-2xl p-5 flex flex-col justify-between`}>
      <div className="flex justify-between items-start">
        <div>
          <p className={`text-[10px] font-bold uppercase tracking-wider ${colors.muted}`}>Market Score</p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className={`text-4xl font-light ${colors.heading}`}>{Math.floor(marketScore)}</span>
            <span className={`text-xs font-medium ${colors.muted}`}>/100</span>
          </div>
        </div>
        <div className={`p-2 rounded-lg ${isDark ? 'bg-white/5 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`}>
          <Radar size={18} />
        </div>
      </div>
      
      <div className="space-y-3">
         <div className="flex items-center justify-between text-[10px]">
            <span className={`${colors.muted} font-medium`}>Payer Interest</span>
            <span className={`${isDark ? 'text-emerald-400' : 'text-emerald-600'} font-bold`}>High (A)</span>
         </div>
         <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${marketScore}%` }}
              className="h-full rounded-full"
              style={{ backgroundColor: colors.primary }}
            />
         </div>
      </div>
    </div>
  );
}