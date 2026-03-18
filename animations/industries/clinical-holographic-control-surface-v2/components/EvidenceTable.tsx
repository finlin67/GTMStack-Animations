import React from 'react';
import { TrendingUp } from 'lucide-react';
import Sparkline from './Sparkline';

interface EvidenceTableProps {
  isDark: boolean;
  colors: any;
  historyData: {
    completion: number[];
    harvesting: number[];
  };
}

export default function EvidenceTable({ isDark, colors, historyData }: EvidenceTableProps) {
  return (
    <div className={`${colors.panel} rounded-2xl flex-1 min-h-[160px] overflow-hidden flex flex-col`}>
      <div className={`flex items-center justify-between px-6 py-3 border-b ${colors.border} ${isDark ? 'bg-slate-900/20' : 'bg-slate-50/50'}`}>
        <div className="flex items-center gap-2">
          <TrendingUp size={14} style={{ color: colors.primary }} />
          <h3 className={`text-xs font-bold ${colors.heading}`}>Evidence Generation</h3>
        </div>
        <div className="flex items-center gap-2">
           <span className={`text-[10px] font-medium ${colors.muted}`}>Live Feed</span>
           <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isDark ? 'bg-emerald-400' : 'bg-emerald-500'}`}></div>
        </div>
      </div>
      
      <div className="w-full flex-1 overflow-y-auto custom-scrollbar p-3">
        <table className="w-full text-left border-collapse">
          <thead className={`sticky top-0 z-10 text-[10px] font-bold uppercase tracking-wider ${colors.muted} ${isDark ? 'bg-[#0F172A]' : 'bg-[#F8FAFC]'} opacity-90`}>
            <tr>
              <th className="px-3 py-2">Metric</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">History (6mo)</th>
            </tr>
          </thead>
          <tbody className={`text-[11px] font-medium ${colors.text}`}>
            <tr className={`group border-b last:border-0 transition-colors ${colors.border} ${isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}>
              <td className={`px-3 py-3 group-hover:${colors.heading} transition-colors`}>Clinical Validation</td>
              <td className="px-3 py-3">
                <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide border ${isDark ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20' : 'bg-indigo-50 text-indigo-600 border-indigo-100'}`}>
                  Active
                </span>
              </td>
              <td className="px-3 py-3 w-[140px]">
                <Sparkline data={historyData.completion} colorHex={colors.primary} label="completion" isDark={isDark} />
              </td>
            </tr>
            
            <tr className={`group border-b last:border-0 transition-colors ${colors.border} ${isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}>
              <td className={`px-3 py-3 group-hover:${colors.heading} transition-colors`}>RWD Harvesting</td>
              <td className="px-3 py-3">
                <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide border ${isDark ? 'bg-orange-500/10 text-orange-300 border-orange-500/20' : 'bg-orange-50 text-orange-600 border-orange-100'}`}>
                  Collecting
                </span>
              </td>
              <td className="px-3 py-3 w-[140px]">
                <Sparkline data={historyData.harvesting} colorHex={colors.secondary} label="harvesting" isDark={isDark} />
              </td>
            </tr>

            <tr className={`group border-b last:border-0 transition-colors ${colors.border} ${isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}>
              <td className={`px-3 py-3 group-hover:${colors.heading} transition-colors`}>Endpoints Verified</td>
              <td className="px-3 py-3">
                <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide border ${isDark ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                  Verified
                </span>
              </td>
              <td className="px-3 py-3">
                <span className={`text-[10px] font-mono font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>18/20 MET</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}