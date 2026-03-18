import React from 'react';
import { LayoutDashboard, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  colors: any;
  latency: number;
  setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
}

export default function Header({ isDark, colors, latency, setTheme }: HeaderProps) {
  return (
    <header className={`flex items-center justify-between px-6 py-4 relative z-50 border-b ${colors.border} ${isDark ? 'bg-[#0F172A]/80' : 'bg-[#F8FAFC]/80'} backdrop-blur-md shrink-0 h-[68px]`}>
      <div className="flex items-center gap-3">
        <div className={`size-9 rounded-xl flex items-center justify-center text-white shadow-lg ${isDark ? 'bg-indigo-600 shadow-indigo-900/20' : 'bg-indigo-600 shadow-indigo-200'}`}>
          <LayoutDashboard size={18} strokeWidth={2.5} />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className={`text-xs font-bold tracking-wide uppercase ${colors.heading}`}>HealthTech Pulse</h2>
          <p className={`text-[10px] font-medium ${colors.muted}`}>Regulatory Operations</p>
        </div>
      </div>
      
      <div className="flex items-center gap-5">
        <div className={`flex flex-col items-end border-r pr-5 ${colors.border}`}>
          <div className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-emerald-400' : 'bg-emerald-500'}`}></span>
            <span className={`text-[10px] font-semibold ${colors.text}`}>System Active</span>
          </div>
          <span className={`text-[9px] font-mono opacity-60 ${colors.text}`}>{latency}ms</span>
        </div>
        <button 
          onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
          className={`p-2 rounded-full transition-colors ${isDark ? 'bg-slate-800 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-500 hover:text-slate-900'}`}
        >
          {isDark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </div>
    </header>
  );
}