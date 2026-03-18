// FILE: CompactLifecycleDashboard.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Video, 
  Eye, 
  MousePointer2, 
  History, 
  BadgeCheck, 
  Megaphone, 
  Shield, 
  Database, 
  Plus,
  Cpu,
  Server,
  Activity,
  Trash2,
  TrendingUp,
  BarChart3
} from 'lucide-react';

// --- Types ---
interface StatState {
  aware: number;
  engage: number;
  retain: number;
  loyal: number;
  activeUsers: number;
  engaged: number;
  conversion: number;
  campaigns: number;
}

interface PerfState {
  cpu: number;
  memory: number;
  network: number;
}

interface FeedItem {
  id: number;
  text: React.ReactNode;
  time: string;
  type: 'success' | 'info' | 'warning';
}

// --- Constants ---
const INITIAL_STATS: StatState = {
  aware: 48000,
  engage: 12000,
  retain: 8100,
  loyal: 2400,
  activeUsers: 124500,
  engaged: 42200,
  conversion: 3.8,
  campaigns: 6
};

const INITIAL_PERF: PerfState = {
  cpu: 42,
  memory: 68,
  network: 2.4
};

const FEED_ITEMS: FeedItem[] = [
  { id: 1, text: <>#8294 moved to <span className="text-emerald-500 font-bold">Loyal</span></>, time: 'Now', type: 'success' },
  { id: 2, text: <>Campaign: <span className="text-slate-400">Winter Splash</span></>, time: '2m', type: 'info' },
  { id: 3, text: <>#9921 moved to <span className="text-emerald-500 font-bold">Loyal</span></>, time: '5m', type: 'success' },
  { id: 4, text: <>Cohort: <span className="text-slate-400">Nov 07 Started</span></>, time: '12m', type: 'info' },
  { id: 5, text: <>#1023 risk <span className="text-orange-500 font-bold">High</span></>, time: '15m', type: 'warning' },
];

const getRetentionStyle = (value: number) => {
  if (value === 100) return "bg-[#00f3ff] text-[#0f172a]";
  if (value >= 90) return "bg-[#0ea5e9] text-white";
  if (value >= 80) return "bg-[#3b82f6] text-white";
  if (value >= 70) return "bg-[#6366f1] text-white";
  if (value >= 60) return "bg-[#8b5cf6] text-white";
  if (value >= 50) return "bg-[#a855f7] text-white";
  if (value >= 40) return "bg-[#7e22ce] text-white";
  if (value >= 30) return "bg-[#6b21a8] text-white";
  if (value >= 20) return "bg-[#581c87] text-white";
  if (value >= 10) return "bg-[#4c1d95] text-white";
  return "bg-[#1e1b4b] text-[#64748b]";
};

export default function CompactLifecycleDashboard() {
  const [stats, setStats] = useState<StatState>(INITIAL_STATS);
  const [perf, setPerf] = useState<PerfState>(INITIAL_PERF);
  const [perfHistory, setPerfHistory] = useState<{ cpu: number[], memory: number[], network: number[] }>({
    cpu: Array(40).fill(40).map(() => 30 + Math.random() * 20),
    memory: Array(40).fill(60).map(() => 50 + Math.random() * 20),
    network: Array(40).fill(2).map(() => 1 + Math.random() * 2)
  });
  const [liveFeed, setLiveFeed] = useState<FeedItem[]>(FEED_ITEMS.slice(0, 3));

  // Organic Jitter: Stats
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const animate = () => {
      setStats(prev => ({
        ...prev,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10) - 4,
        retain: prev.retain + Math.floor(Math.random() * 3) - 1,
        engage: prev.engage + Math.floor(Math.random() * 5) - 2,
      }));
      timeout = setTimeout(animate, 2500);
    };
    timeout = setTimeout(animate, 2500);
    return () => clearTimeout(timeout);
  }, []);

  // Organic Jitter: Performance & History
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const animate = () => {
      setPerf(prev => {
        const newCpu = Math.min(100, Math.max(10, prev.cpu + Math.floor(Math.random() * 15) - 7));
        const newMem = Math.min(95, Math.max(40, prev.memory + Math.floor(Math.random() * 5) - 2));
        const newNet = Math.max(0, +(prev.network + (Math.random() * 1.2 - 0.5)).toFixed(1));

        setPerfHistory(prevHist => ({
          cpu: [...prevHist.cpu.slice(1), newCpu],
          memory: [...prevHist.memory.slice(1), newMem],
          network: [...prevHist.network.slice(1), newNet]
        }));

        return {
          cpu: newCpu,
          memory: newMem,
          network: newNet
        };
      });
      timeout = setTimeout(animate, 1500);
    };
    timeout = setTimeout(animate, 1500);
    return () => clearTimeout(timeout);
  }, []);

  // Live Feed Simulation
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const animate = () => {
      const nextItemIndex = Math.floor(Math.random() * FEED_ITEMS.length);
      const newItem = { ...FEED_ITEMS[nextItemIndex], id: Date.now() }; 
      
      setLiveFeed(prev => {
        if (prev.length === 0) return prev; // Don't auto-fill if cleared
        const newFeed = [newItem, ...prev];
        return newFeed.slice(0, 4); 
      });
      timeout = setTimeout(animate, 4000);
    };
    timeout = setTimeout(animate, 4000);
    return () => clearTimeout(timeout);
  }, []);

  const formatK = (num: number) => num >= 1000 ? (num / 1000).toFixed(1) + 'k' : num.toString();
  const formatComma = (num: number) => num.toLocaleString();

  return (
    <div className="w-full h-full flex justify-center items-center bg-[#000000] text-white font-['Inter']">
      {/* 600x600 Container */}
      <div className="w-[600px] h-[600px] bg-[#0a0f1a] border border-slate-800 overflow-hidden relative shadow-2xl flex flex-col selection:bg-cyan-500/30">
        
        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-800 px-3 py-2 bg-[#0a0f1a]/95 backdrop-blur-md z-20 shrink-0 h-10">
          <div className="flex items-center gap-2">
            <div className="size-5 bg-[#135bec] rounded flex items-center justify-center shadow-[0_0_10px_rgba(19,91,236,0.5)]">
              <Video className="text-white w-3 h-3" />
            </div>
            <h2 className="font-bold tracking-tight text-sm text-white">Lifecycle Engine</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">v2.4 Live</span>
            <div 
              className="h-5 w-5 rounded-full bg-slate-700 bg-cover bg-center border border-slate-600" 
              style={{ backgroundImage: "url('https://picsum.photos/40/40')" }}
            />
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-3 relative z-10">
          
          {/* Flywheel Section */}
          <section className="relative rounded-lg p-2 border border-slate-800/50 overflow-hidden bg-slate-900/20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(19,91,236,0.1)_0%,transparent_70%)]" />
            <div className="flex justify-between px-6 items-center gap-2 z-10 relative">
              <FlywheelNode icon={Eye} label="Aware" value={formatK(stats.aware)} color="#135bec" />
              <div className="h-[1px] w-6 bg-slate-800" />
              <FlywheelNode icon={MousePointer2} label="Engage" value={formatK(stats.engage)} color="#a855f7" />
              <div className="h-[1px] w-6 bg-slate-800" />
              <div className="flex flex-col items-center gap-0.5 relative">
                <motion.div 
                   animate={{ boxShadow: ["0 0 10px rgba(249,115,22,0.2)", "0 0 20px rgba(249,115,22,0.4)", "0 0 10px rgba(249,115,22,0.2)"] }}
                   transition={{ duration: 3, repeat: Infinity }}
                   className="size-16 rounded-full border border-orange-500 bg-orange-500/10 flex flex-col items-center justify-center text-center relative"
                >
                  <History className="text-white w-4 h-4 mb-0.5" />
                  <span className="font-black text-sm leading-none">{formatK(stats.retain)}</span>
                  <span className="text-[9px] font-bold text-white uppercase mt-0.5">Retain</span>
                  <div className="absolute -bottom-1.5 bg-emerald-500 text-[8px] px-1.5 py-px rounded-full font-bold shadow-lg text-black border border-emerald-400">+8%</div>
                </motion.div>
              </div>
              <div className="h-[1px] w-6 bg-slate-800" />
              <FlywheelNode icon={BadgeCheck} label="Loyal" value={formatK(stats.loyal)} color="#10b981" />
            </div>
          </section>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-2">
            <StatCard label="Total Users" value="1.5M" change="+2.1%" />
            <StatCard label="Active Users" value={formatComma(stats.activeUsers)} change="+12%" />
            <StatCard label="New Signups" value="5.2k" change="+8.5%" />
            <StatCard label="Engaged" value={formatComma(stats.engaged)} change="+5.2%" />
            <StatCard label="Avg Session" value="3m 15s" change="+0.9%" />
            <StatCard label="Conversion" value={`${stats.conversion}%`} change="+0.4%" />
            <div className="bg-slate-900/40 border border-slate-800 rounded p-2 flex justify-between items-center hover:bg-slate-800/50 transition-colors col-span-2">
              <div>
                <p className="text-slate-500 font-medium mb-0.5 uppercase text-[10px]">Campaigns</p>
                <h3 className="text-sm font-bold w-full text-white">{stats.campaigns} Active</h3>
              </div>
              <Megaphone className="text-[#135bec] w-4 h-4 opacity-80" />
            </div>
          </div>

          {/* System Performance */}
          <div className="grid grid-cols-3 gap-2">
            <PerfCard label="CPU" value={perf.cpu} color="#00f3ff" unit="%" icon={Cpu} history={perfHistory.cpu} />
            <PerfCard label="RAM" value={perf.memory} color="#a855f7" unit="%" icon={Server} history={perfHistory.memory} />
            <NetworkCard value={perf.network} history={perfHistory.network} />
          </div>

          {/* Retention Heatmap */}
          <div className="bg-slate-900/60 border border-orange-500/30 rounded overflow-hidden">
            <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-800 bg-slate-900/80">
              <h3 className="font-bold text-[10px] text-orange-400 uppercase tracking-wide">Retention Heatmap</h3>
              <div className="flex items-center gap-2 text-[9px] font-mono">
                <span className="text-[#00f3ff]">D30: 68%</span>
                <span className="text-slate-600">|</span>
                <span className="text-slate-400">Churn: 4.2%</span>
              </div>
            </div>
            <div className="p-1.5 overflow-x-auto">
              <table className="w-full text-center border-separate border-spacing-1">
                <thead>
                  <tr className="text-[9px] font-bold text-slate-500 uppercase">
                    <th className="text-left">Cohort</th>
                    <th>Users</th>
                    <th>W0</th>
                    <th>W1</th>
                    <th>W2</th>
                    <th>W3</th>
                    <th>W4</th>
                    <th>W5</th>
                  </tr>
                </thead>
                <tbody className="text-[10px] font-bold font-mono">
                  <HeatmapRow date="Oct 23" users="1.2k" values={[100, 92, 84, 78, 72, 65]} />
                  <HeatmapRow date="Oct 30" users="1.4k" values={[100, 88, 76, 64, 58, 42]} />
                  <HeatmapRow date="Nov 06" users="1.1k" values={[100, 94, 88, 82, 74, -1]} />
                </tbody>
              </table>
            </div>
          </div>

          {/* Live Feed */}
          <div className="space-y-2 pb-14">
            <div className="bg-slate-900/40 border border-slate-800 rounded p-2 min-h-[90px]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-[10px] uppercase tracking-wider text-slate-400">Live Stream</h4>
                  <button 
                    onClick={() => setLiveFeed([])}
                    className="flex items-center gap-1 px-2 py-0.5 bg-slate-800/50 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 rounded text-[9px] font-medium text-slate-500 hover:text-red-400 transition-all group cursor-pointer"
                  >
                    <Trash2 className="w-2.5 h-2.5 group-hover:scale-110 transition-transform" />
                    <span>CLEAR</span>
                  </button>
                </div>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
              
              <div className="space-y-1.5 relative overflow-hidden">
                <AnimatePresence initial={false} mode='popLayout'>
                  {liveFeed.map((item) => (
                    <motion.div
                      layout
                      key={item.id}
                      initial={{ opacity: 0, x: -50, height: 0, scale: 0.8, filter: "blur(4px)" }}
                      animate={{ opacity: 1, x: 0, height: 'auto', scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, x: 50, height: 0, scale: 0.9, transition: { duration: 0.2 } }}
                      transition={{ type: "spring", stiffness: 400, damping: 20, mass: 0.8 }}
                      className="flex items-center gap-2 p-1.5 bg-slate-800/30 rounded border border-transparent hover:border-slate-700/50"
                    >
                      <div className={`size-1.5 rounded-full shrink-0 ${
                        item.type === 'warning' ? 'bg-orange-500 shadow-[0_0_6px_#f97316]' : 
                        item.type === 'success' ? 'bg-emerald-500 shadow-[0_0_6px_#10b981]' : 
                        'bg-[#135bec] shadow-[0_0_6px_#135bec]'
                      }`} />
                      <p className="flex-1 text-[10px] truncate text-slate-300 font-medium">
                        {item.text}
                      </p>
                      <span className="text-[9px] text-slate-600 shrink-0 font-mono">{item.time}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {liveFeed.length === 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="text-center text-[10px] text-slate-600 py-4 italic"
                  >
                    Feed cleared. Waiting for events...
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="h-8 border-t border-slate-800 flex justify-between items-center px-3 text-[9px] text-slate-500 font-medium bg-[#0a0f1a] z-30 shrink-0">
          <p>© 2024 Lifecycle Engine AI</p>
          <div className="flex gap-3">
            <span className="flex items-center gap-1 hover:text-slate-300 cursor-pointer transition-colors">
              <Shield className="w-2.5 h-2.5" /> SECURE
            </span>
            <span className="flex items-center gap-1 hover:text-slate-300 cursor-pointer transition-colors">
              <Database className="w-2.5 h-2.5" /> US-EAST-1
            </span>
          </div>
        </footer>

        {/* FAB */}
        <button className="absolute bottom-10 right-4 size-10 bg-[#135bec] text-white rounded-full shadow-[0_4px_20px_rgba(19,91,236,0.4)] flex items-center justify-center hover:scale-110 transition-transform z-40 border border-blue-400/20 active:scale-95">
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// --- Sub-Components ---

function FlywheelNode({ icon: Icon, label, value, color }: { icon: any, label: string, value: string, color: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="size-12 rounded-full border border-opacity-30 bg-[#0a0f1a]/80 flex flex-col items-center justify-center text-center backdrop-blur-sm" style={{ borderColor: color }}>
        <Icon className="w-3.5 h-3.5 mb-0.5" style={{ color }} />
        <span className="font-bold text-[11px] leading-none text-white">{value}</span>
      </div>
      <span className="text-[9px] text-slate-500 uppercase tracking-wide">{label}</span>
    </div>
  );
}

function StatCard({ label, value, change }: { label: string, value: string, change: string }) {
  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded p-2 flex justify-between items-center hover:bg-slate-800/60 transition-colors group cursor-default">
      <div>
        <p className="text-slate-500 font-medium mb-0.5 uppercase text-[10px] group-hover:text-slate-400 transition-colors">{label}</p>
        <h3 className="text-sm font-bold w-full text-white">{value}</h3>
      </div>
      <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">{change}</span>
    </div>
  );
}

function Tooltip({ history, unit, label, color }: { history: number[], unit: string, label: string, color: string }) {
  const peak = Math.max(...history).toFixed(1);
  const avg = (history.reduce((a, b) => a + b, 0) / history.length).toFixed(1);
  
  // Normalize history for sparkline
  const max = Math.max(...history) || 100;
  const min = Math.min(...history) || 0;
  const range = max - min || 1;
  
  // Generate Sparkline path
  const width = 120;
  const height = 24;
  const points = history.map((val, i) => {
    const x = (i / (history.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 5, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 5, scale: 0.95 }}
      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-36 bg-[#0f172a] border border-slate-700 p-2.5 rounded shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-50 pointer-events-none"
    >
      <div className="flex justify-between items-center mb-2 pb-1 border-b border-slate-800">
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{label} History (60s)</span>
        <BarChart3 className="w-3 h-3 text-slate-500" />
      </div>
      <div className="flex justify-between gap-2 mb-2">
        <div className="flex flex-col">
           <span className="text-[8px] text-slate-500 uppercase font-medium">Peak</span>
           <span className="text-[10px] font-mono font-bold text-white">{peak}{unit}</span>
        </div>
        <div className="flex flex-col items-end">
           <span className="text-[8px] text-slate-500 uppercase font-medium">Avg</span>
           <span className="text-[10px] font-mono font-bold text-white">{avg}{unit}</span>
        </div>
      </div>
      <div className="relative h-6 w-full bg-slate-900/50 rounded overflow-hidden border border-slate-800/50">
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="overflow-visible">
          <polyline 
            points={points} 
            fill="none" 
            stroke={color} 
            strokeWidth="1.5" 
            vectorEffect="non-scaling-stroke"
            className="drop-shadow-[0_0_4px_rgba(0,0,0,0.8)]"
          />
        </svg>
      </div>
      <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#0f172a] border-b border-r border-slate-700 rotate-45" />
    </motion.div>
  );
}

function PerfCard({ label, value, color, unit, icon: Icon, history }: { label: string, value: number, color: string, unit: string, icon: any, history: number[] }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-slate-900/40 border border-slate-800 rounded p-2 flex flex-col justify-between hover:bg-slate-800/60 transition-colors relative"
    >
      <AnimatePresence>
        {isHovered && <Tooltip history={history} unit={unit} label={label} color={color} />}
      </AnimatePresence>
      <div className="flex justify-between items-center mb-1.5">
        <div className="flex items-center gap-1.5">
          <Icon className="w-3 h-3" style={{ color }} />
          <span className="text-[9px] text-slate-400 font-bold uppercase">{label}</span>
        </div>
        <span className={`text-[10px] font-mono ${value > 85 ? 'text-orange-500' : 'text-slate-300'}`}>
          {value}{unit}
        </span>
      </div>
      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
        <motion.div 
          className="h-full rounded-full"
          style={{ backgroundColor: value > 85 ? '#f97316' : color }}
          animate={{ width: `${value}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>
    </div>
  );
}

function NetworkCard({ value, history }: { value: number, history: number[] }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-slate-900/40 border border-slate-800 rounded p-2 flex flex-col justify-between hover:bg-slate-800/60 transition-colors relative"
    >
      <AnimatePresence>
        {isHovered && <Tooltip history={history} unit=" MB/s" label="Network" color="#10b981" />}
      </AnimatePresence>
      <div className="flex justify-between items-center mb-1.5">
        <div className="flex items-center gap-1.5">
          <Activity className="w-3 h-3 text-emerald-400" />
          <span className="text-[9px] text-slate-400 font-bold uppercase">NET</span>
        </div>
        <span className="text-[10px] font-mono text-slate-300">{value}<span className="text-[8px] text-slate-500 ml-0.5">MB/s</span></span>
      </div>
      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden flex items-end gap-[1px] opacity-80">
          {[...Array(12)].map((_, i) => (
            <motion.div 
              key={i}
              className="w-full bg-emerald-500 rounded-[1px]"
              animate={{ height: `${Math.min(100, Math.max(10, (value * 15) + (Math.random() * 40 - 20)))}%` }}
              transition={{ duration: 0.2, repeat: Infinity, repeatType: "reverse" }}
            />
          ))}
      </div>
    </div>
  );
}

function HeatmapRow({ date, users, values }: { date: string, users: string, values: number[] }) {
  return (
    <tr>
      <td className="text-left text-slate-400 py-0.5 pl-1">{date}</td>
      <td className="text-slate-300">{users}</td>
      {values.map((val, i) => (
        <td key={i} className="py-0.5 px-px">
          {val === -1 ? (
            <div className="bg-[#1e1b4b] text-[#64748b] py-0.5 rounded-sm opacity-20">-</div>
          ) : (
            <div className={`${getRetentionStyle(val)} py-0.5 rounded-sm shadow-sm`}>{val}</div>
          )}
        </td>
      ))}
    </tr>
  );
}
