// FILE: DriftGuard.tsx
import React, { useState, useEffect, ElementType } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Target, TrendingDown, DatabaseZap, BrainCircuit, AlertTriangle, Info, Rss } from 'lucide-react';

// --- Types ---
interface DriftStats {
  accuracy: number;
  predictionDrift: number;
  dataDrift: number;
  conceptDrift: number;
}
type AlertLevel = 'critical' | 'warning' | 'info';
interface Alert {
  id: number;
  level: AlertLevel;
  message: string;
  timestamp: string;
}

const initialAlerts: Alert[] = [
  { id: 1, level: 'info', message: 'Model v3.4.1 deployed successfully.', timestamp: '2m ago' },
  { id: 2, level: 'warning', message: 'Input feature "user_age" showing minor schema drift.', timestamp: '1h ago' },
];

// --- Inline Components ---

interface StatCardProps {
  icon: ElementType;
  title: string;
  value: number;
  unit: string;
  trend: number;
  colorClass: string;
}

const StatCard = ({ icon: Icon, title, value, unit, trend, colorClass }: StatCardProps) => (
  <div className={`glass-panel rounded-lg p-3 flex items-center gap-3 border-l-2 ${colorClass}`}>
    <Icon className="w-5 h-5 opacity-70" />
    <div className="flex-1">
      <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{title}</p>
      <p className="text-lg font-bold">
        {value.toFixed(2)}
        <span className="text-xs font-light opacity-60 ml-1">{unit}</span>
      </p>
    </div>
    <div className="text-right">
        <p className={`text-xs font-bold ${trend > 0 ? 'text-alert-red' : 'text-green-400'}`}>
            {trend > 0 ? `+${trend.toFixed(2)}` : trend.toFixed(2)}%
        </p>
    </div>
  </div>
);

interface AlertItemProps {
  alert: Alert;
}

const AlertItem = ({ alert }: AlertItemProps) => {
  const levelConfig = {
    critical: { icon: AlertTriangle, color: 'text-alert-red', bg: 'bg-alert-red/10' },
    warning: { icon: Info, color: 'text-alert-orange', bg: 'bg-alert-orange/10' },
    info: { icon: Rss, color: 'text-primary', bg: 'bg-primary/10' },
  };
  const { icon: Icon, color, bg } = levelConfig[alert.level];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className={`flex items-start gap-3 p-2 rounded ${bg}`}
    >
      <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${color}`} />
      <div className="flex-1">
        <p className="text-xs font-medium text-slate-200">{alert.message}</p>
      </div>
      <p className="text-[10px] text-slate-500 font-mono shrink-0">{alert.timestamp}</p>
    </motion.div>
  );
};

// --- Main Component ---

export default function DriftGuard() {
  const [stats, setStats] = useState<DriftStats>({
    accuracy: 99.74,
    predictionDrift: 0.88,
    dataDrift: 1.42,
    conceptDrift: 0.21,
  });
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        accuracy: Math.max(98, prev.accuracy + (Math.random() * 0.1 - 0.05)),
        predictionDrift: Math.max(0, prev.predictionDrift + (Math.random() * 0.2 - 0.1)),
        dataDrift: Math.max(0, prev.dataDrift + (Math.random() * 0.3 - 0.15)),
        conceptDrift: Math.max(0, prev.conceptDrift + (Math.random() * 0.1 - 0.04)),
      }));

      if (Math.random() > 0.9) {
          const newAlert: Alert = {
              id: Date.now(),
              level: 'critical',
              message: `High-confidence prediction drift detected in segmentation model.`,
              timestamp: 'now'
          };
          setAlerts(prev => [newAlert, ...prev].slice(0, 10));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-[600px] h-[600px] overflow-hidden relative bg-slate-900 text-white selection:bg-cyan-500/30 flex justify-center items-center">
        <div className="w-full h-full bg-background-dark font-display cyber-grid p-4 flex flex-col gap-4">
            <header className="glass-panel rounded-lg p-3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6 text-primary" />
                    <div>
                        <h1 className="text-lg font-bold tracking-wide">DriftGuard</h1>
                        <p className="text-[10px] text-slate-400 -mt-1">AI Monitoring System</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-2 py-1 rounded bg-green-500/10 border border-green-500/20">
                    <motion.div 
                        className="w-2 h-2 bg-green-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className="text-xs font-semibold text-green-400">System Nominal</span>
                </div>
            </header>

            <main className="grid grid-cols-2 grid-rows-2 gap-4 flex-1">
                <div className="col-span-1 row-span-1 glass-panel rounded-xl p-4 flex flex-col justify-between items-center text-center border-t-2 border-primary">
                    <div className="flex items-center gap-2 text-primary">
                        <Target className="w-4 h-4" />
                        <h2 className="text-sm font-bold uppercase tracking-widest">Model Accuracy</h2>
                    </div>
                    <div className="relative">
                        <p className="text-7xl font-bold tracking-tighter text-slate-100">{stats.accuracy.toFixed(2)}<span className="text-4xl opacity-50">%</span></p>
                    </div>
                    <div className="h-1 w-full bg-primary/10 rounded-full overflow-hidden">
                        <motion.div className="h-full bg-primary" initial={{width: "0%"}} animate={{width: `${stats.accuracy}%`}} transition={{duration: 0.5}}/>
                    </div>
                </div>

                <div className="col-span-1 row-span-1 grid grid-rows-3 gap-3">
                    <StatCard icon={TrendingDown} title="Prediction Drift" value={stats.predictionDrift} unit="σ" trend={0.12} colorClass="border-alert-orange" />
                    <StatCard icon={DatabaseZap} title="Data Drift" value={stats.dataDrift} unit="ψ" trend={-0.05} colorClass="border-accent-purple" />
                    <StatCard icon={BrainCircuit} title="Concept Drift" value={stats.conceptDrift} unit="δ" trend={0.01} colorClass="border-primary" />
                </div>
                
                <div className="col-span-2 row-span-1 glass-panel rounded-xl p-4 flex flex-col overflow-hidden">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2 pb-2 border-b border-white/5">Real-time Alert Feed</h2>
                    <div className="flex-1 overflow-y-auto no-scrollbar pr-2">
                        <div className="flex flex-col gap-2">
                            <AnimatePresence initial={false}>
                                {alerts.map(alert => <AlertItem key={alert.id} alert={alert} />)}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
  );
}
