import React from 'react';
import { motion } from 'framer-motion';

interface JourneyProgressProps {
  isDark: boolean;
  colors: any;
}

export default function JourneyProgress({ isDark, colors }: JourneyProgressProps) {
  return (
    <div className={`${colors.panel} rounded-2xl p-5 flex flex-col`}>
       <div className="flex justify-between items-center mb-4">
         <h3 className={`text-xs font-bold ${colors.heading}`}>Journey</h3>
         <span className={`text-[10px] font-mono font-medium opacity-60 ${colors.text}`}>Q3 2024</span>
       </div>
       
       <div className="flex items-end justify-between gap-3 flex-1 px-1">
         {['Concept', 'Clinic', 'Reg', 'Market'].map((label, i) => {
           const heights = ['100%', '80%', '45%', '15%'];
           // Use palette colors for bars
           const barColor = i < 2 ? colors.primary : (i === 2 ? colors.tertiary : (isDark ? '#475569' : '#cbd5e1'));
           
           return (
             <div key={label} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer">
               <div className={`w-full rounded-md relative overflow-hidden h-full ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                 <motion.div 
                   initial={{ height: 0 }}
                   animate={{ height: heights[i] }}
                   transition={{ duration: 1, delay: i * 0.1 }}
                   className="absolute bottom-0 w-full rounded-md opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                   style={{ backgroundColor: barColor }}
                 />
               </div>
               <span className={`text-[9px] font-bold uppercase tracking-wider transition-colors ${colors.muted} group-hover:${colors.heading}`}>{label}</span>
             </div>
           )
         })}
       </div>
    </div>
  );
}