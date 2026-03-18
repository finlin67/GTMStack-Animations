import React from 'react';
import { Activity, ArrowRight } from 'lucide-react';

interface HeroCardProps {
  isDark: boolean;
  colors: any;
}

export default function HeroCard({ isDark, colors }: HeroCardProps) {
  return (
    <div className={`col-span-8 ${colors.highlightPanel} rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center group transition-all duration-300`}>
      {isDark && <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.5)]"></div>}
      
      <div className="absolute right-[-20px] bottom-[-30px] opacity-[0.05] transform rotate-[-15deg] group-hover:scale-110 transition-transform duration-700 pointer-events-none">
         <Activity size={140} color={isDark ? '#fff' : '#000'} />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${isDark ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20' : 'bg-indigo-50 text-indigo-600 border border-indigo-100'}`}>
            Alpha Sector
          </span>
        </div>
        <h1 className={`text-xl font-bold leading-tight mb-2 ${colors.heading}`}>
          Regulatory <span style={{ color: colors.primary }}>Landscape</span>
        </h1>
        <p className={`text-[11px] leading-relaxed max-w-[90%] mb-4 font-medium opacity-80 ${colors.text}`}>
          Real-time synthesis of clinical evidence and pathways.
        </p>
        <button 
          className={`w-fit text-[10px] px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5
            ${isDark ? 'bg-indigo-600 text-white shadow-indigo-900/30' : 'bg-indigo-600 text-white shadow-indigo-200'}`}
        >
          Generate Report <ArrowRight size={12} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}