
import React from 'react';
import { ProcessStage } from '../types';

interface SidebarProps {
  currentStage: ProcessStage;
  setStage: (stage: ProcessStage) => void;
}

const STAGES: { id: ProcessStage; label: string; icon: string }[] = [
  { id: 'DESIGN', label: 'Design', icon: 'edit_note' },
  { id: 'PROTO', label: 'Proto', icon: 'layers' },
  { id: 'PROD', label: 'Prod', icon: 'precision_manufacturing' },
  { id: 'QUALITY', label: 'Quality', icon: 'verified' },
];

export const Sidebar: React.FC<SidebarProps> = ({ currentStage, setStage }) => {
  return (
    <div className="w-24 relative flex flex-col justify-between py-10 z-20">
      <div className="absolute left-4 top-14 bottom-14 w-[1px] bg-gradient-to-b from-white/0 via-white/40 to-white/0"></div>
      
      {STAGES.map((stage) => {
        const isActive = currentStage === stage.id;
        return (
          <button
            key={stage.id}
            onClick={() => setStage(stage.id)}
            className="relative flex items-center gap-3 group outline-none text-left"
          >
            <div 
              className={`w-8 h-8 rounded-full border flex items-center justify-center backdrop-blur-sm z-10 transition-all duration-300 ${
                isActive 
                  ? 'bg-blue-400 border-white shadow-lg shadow-blue-500/50 scale-110' 
                  : 'bg-white/10 border-white/20 hover:bg-white/20'
              }`}
            >
              <span className={`material-symbols-outlined text-sm ${isActive ? 'text-indigo-900 font-bold' : 'text-white'}`}>
                {stage.icon}
              </span>
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-tighter transition-colors ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white/80'}`}>
              {stage.label}
            </span>
            {isActive && (
                <div className="absolute -right-2 w-1 h-4 bg-white/40 rounded-full blur-sm"></div>
            )}
          </button>
        );
      })}
    </div>
  );
};
