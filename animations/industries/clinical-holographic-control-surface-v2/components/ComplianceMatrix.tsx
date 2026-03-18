import React from 'react';
import { Shield, ShieldCheck, RefreshCw } from 'lucide-react';

interface ComplianceMatrixProps {
  isDark: boolean;
  colors: any;
}

export default function ComplianceMatrix({ isDark, colors }: ComplianceMatrixProps) {
  return (
    <div className={`${colors.panel} rounded-2xl p-5 flex flex-col`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className={`text-xs font-bold ${colors.heading}`}>Compliance</h3>
        <Shield size={14} className={colors.muted} />
      </div>
      
      <div className="space-y-2 overflow-y-auto custom-scrollbar flex-1 pr-1">
        {[
          { name: 'HIPAA Protocol', status: 'active', icon: ShieldCheck, color: colors.success },
          { name: 'GDPR Privacy', status: 'active', icon: ShieldCheck, color: colors.success },
          { name: 'SOC2 Type II', status: 'review', icon: RefreshCw, color: colors.tertiary }
        ].map((item, i) => (
           <div key={i} className={`flex items-center justify-between p-2 rounded-lg border transition-all ${colors.border} ${isDark ? 'bg-slate-800/30 hover:bg-slate-800/60' : 'bg-slate-50 hover:bg-slate-100'}`}>
            <div className="flex items-center gap-2.5">
              <item.icon size={12} style={{ color: item.color }} />
              <span className={`text-[10px] font-semibold ${colors.text}`}>{item.name}</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color, animation: item.status === 'review' ? 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none' }}></div>
          </div>
        ))}
      </div>
    </div>
  );
}