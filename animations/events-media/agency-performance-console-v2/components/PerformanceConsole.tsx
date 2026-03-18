import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Calendar, 
  Image as ImageIcon, 
  Video, 
  BarChart3, 
  Plus, 
  TrendingUp, 
  Share2, 
  Zap, 
  ShieldCheck,
  Info
} from 'lucide-react';

interface StatsState {
  reach: string;
  engRate: string;
  followers: string;
  viralCoeff: string;
  activeNow: number;
  utilization: number;
  latency: number;
  currentTime: string;
}

interface GridContent {
  id: number;
  icon?: React.ReactNode;
  label: string;
  status: string;
  timestamp?: string;
  variant?: 'primary' | 'violet' | 'default';
}

const GRID_DATA: GridContent[] = [
  { id: 0, icon: <Calendar className="size-4" />, label: 'Event Schedule', status: 'Syncing...', timestamp: '12m ago', variant: 'default' },
  { id: 1, icon: <ImageIcon className="size-5" />, label: 'Hero Image', status: 'Processing', timestamp: 'Just now', variant: 'primary' },
  { id: 2, label: 'Asset Node', status: 'Idle', variant: 'default' },
  { id: 3, label: 'Asset Node', status: 'Idle', variant: 'default' },
  { id: 4, label: 'Asset Node', status: 'Idle', variant: 'default' },
  { id: 5, label: 'Asset Node', status: 'Idle', variant: 'default' },
  { id: 6, icon: <Video className="size-5" />, label: 'Promo Clip', status: 'Optimizing', timestamp: '2h ago', variant: 'violet' },
  { id: 7, label: 'Asset Node', status: 'Idle', variant: 'default' },
  { id: 8, icon: <BarChart3 className="size-5" />, label: 'Live Metrics', status: 'Streaming', timestamp: 'Live', variant: 'primary' },
  { id: 9, label: 'Asset Node', status: 'Idle', variant: 'default' },
  { id: 10, label: 'Asset Node', status: 'Idle', variant: 'default' },
  { id: 11, label: 'Asset Node', status: 'Idle', variant: 'default' },
  { id: 12, label: 'Asset Node', status: 'Idle', variant: 'default' },
  { id: 13, label: 'Asset Node', status: 'Idle', variant: 'default' },
  { id: 14, label: 'Asset Node', status: 'Idle', variant: 'default' },
  { id: 15, icon: <Plus className="size-4" />, label: 'New Source', status: 'Ready', variant: 'default' },
];

export default function PerformanceConsole() {
  const [selectedGridId, setSelectedGridId] = useState<number | null>(null);
  const [stats, setStats] = useState<StatsState>({
    reach: "1.2M",
    engRate: "8.4%",
    followers: "+24k",
    viralCoeff: "1.5x",
    activeNow: 4829,
    utilization: 78,
    latency: 12,
    currentTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });

  const updateStats = useCallback(() => {
    setStats(prev => {
      const activeJitter = Math.floor(Math.random() * 7) - 3;
      const latencyJitter = Math.floor(Math.random() * 3) - 1;
      const utilizationJitter = (Math.random() * 0.4) - 0.2;
      
      return {
        ...prev,
        activeNow: Math.max(4500, prev.activeNow + activeJitter),
        latency: Math.max(8, Math.min(20, prev.latency + latencyJitter)),
        utilization: Math.max(75, Math.min(82, prev.utilization + utilizationJitter)),
        currentTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    });

    const nextTick = 1500 + Math.random() * 2000;
    setTimeout(updateStats, nextTick);
  }, []);

  useEffect(() => {
    const timer = setTimeout(updateStats, 1000);
    return () => clearTimeout(timer);
  }, [updateStats]);

  const selectedItem = selectedGridId !== null ? GRID_DATA[selectedGridId] : null;

  return (
    <div className="w-[600px] h-[600px] overflow-hidden relative bg-background-dark border border-slate-800 shadow-2xl flex flex-col p-4 gap-4 font-display">
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-[200px] h-[200px] bg-violet-500/5 rounded-full blur-[80px]"></div>
      </div>

      <header className="flex justify-between items-start border-b border-slate-800 pb-3 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Activity className="text-primary size-5" />
            <h1 className="text-lg font-extrabold tracking-tight">Performance Console</h1>
            <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded border border-primary/30 font-bold ml-2">V2.4 LIVE</span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium">Real-time content lifecycle & engagement telemetry</p>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">System Status</div>
          <div className="flex items-center gap-1.5 justify-end">
            <motion.div 
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="size-1.5 rounded-full bg-green-500"
            />
            <span className="text-[11px] font-bold text-green-400 uppercase">Optimized</span>
          </div>
        </div>
      </header>

      <div className="flex-grow grid grid-cols-12 gap-4 overflow-hidden relative z-10">
        {/* Left Column - Growth */}
        <div className="col-span-3 flex flex-col gap-2">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Growth</h3>
          <StatCard label="Reach" value={stats.reach} change="+12%" />
          <StatCard label="Eng. Rate" value={stats.engRate} change="+2.1%" />
          <StatCard label="Followers" value={stats.followers} change="+15%" />
          <StatCard label="Viral Coeff" value={stats.viralCoeff} change="+0.3" />
          
          <div className="mt-auto bg-primary/10 border border-primary/20 p-2 rounded-lg">
            <span className="text-[9px] text-primary font-bold uppercase block mb-1">Active Now</span>
            <span className="text-xs font-black">{stats.activeNow.toLocaleString()}</span>
          </div>
        </div>

        {/* Center Column - Grid */}
        <div className="col-span-6 flex flex-col gap-3 relative">
          <div className="bg-slate-900/40 rounded-xl border border-slate-800/50 p-3 h-full flex flex-col items-center justify-center relative">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Content Velocity Grid</div>
            <div className="grid grid-cols-4 gap-1.5">
              {GRID_DATA.map((item) => (
                <GridItem 
                  key={item.id}
                  active={!!item.icon || selectedGridId === item.id}
                  variant={item.variant}
                  isSelected={selectedGridId === item.id}
                  onClick={() => setSelectedGridId(item.id)}
                >
                  {item.icon}
                </GridItem>
              ))}
            </div>
            
            {/* Tooltip Popup */}
            <AnimatePresence>
              {selectedItem && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[85%] bg-[#1a2138] border border-primary/40 p-3 rounded-lg shadow-2xl pointer-events-none z-20 flex gap-3 items-center"
                >
                  <div className="p-2 bg-primary/20 rounded border border-primary/30 text-primary">
                    {selectedItem.icon || <Info className="size-5" />}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="text-[11px] font-black uppercase text-white tracking-tight">{selectedItem.label}</span>
                      <span className="text-[8px] font-bold text-slate-400 bg-slate-800 px-1 rounded">{selectedItem.timestamp || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="size-1.5 rounded-full bg-primary animate-pulse" />
                      <span className="text-[10px] font-bold text-primary/90 uppercase">{selectedItem.status}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="mt-4 w-full px-2">
              <div className="flex justify-between text-[9px] text-slate-500 mb-1 font-bold">
                <span>GRID UTILIZATION</span>
                <span>{Math.round(stats.utilization)}%</span>
              </div>
              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.utilization}%` }}
                  transition={{ duration: 1 }}
                  className="bg-primary h-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Benchmarks */}
        <div className="col-span-3 flex flex-col gap-2">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Global Benchmarks</h3>
          <BenchmarkCard label="Campaigns" value="450+" borderColor="border-primary" />
          <BenchmarkCard label="Avg. Engagement" value="22.4%" borderColor="border-violet-500" />
          <BenchmarkCard label="Ad Managed" value="$12M+" borderColor="border-emerald-500" />
          <BenchmarkCard label="Success Rate" value="94%" borderColor="border-amber-500" />
          
          <button className="mt-auto w-full py-2 bg-primary text-white rounded text-[10px] font-bold uppercase tracking-tighter hover:bg-primary/90 transition-colors">
            Export Report
          </button>
        </div>
      </div>

      <footer className="mt-auto grid grid-cols-4 gap-2 pt-3 border-t border-slate-800 relative z-10">
        <FooterItem icon={<TrendingUp className="size-4 text-primary" />} label="PEAK" value={stats.currentTime} />
        <FooterItem icon={<Share2 className="size-4 text-violet-400" />} label="SPREAD" value="GLOBAL" />
        <FooterItem icon={<Zap className="size-4 text-emerald-400" />} label="LATENCY" value={`${stats.latency}ms`} />
        <FooterItem icon={<ShieldCheck className="size-4 text-amber-400" />} label="SECURITY" value="ENCRYPTED" />
      </footer>
    </div>
  );
}

const StatCard = ({ label, value, change }: { label: string; value: string; change: string }) => (
  <div className="bg-panel-dark/50 border border-slate-800 p-2 rounded-lg">
    <span className="text-[9px] text-slate-400 block mb-1 uppercase font-bold tracking-tight">{label}</span>
    <div className="flex justify-between items-end">
      <span className="text-sm font-bold">{value}</span>
      <span className="text-[8px] text-green-400 font-bold">{change}</span>
    </div>
  </div>
);

const BenchmarkCard = ({ label, value, borderColor }: { label: string; value: string; borderColor: string }) => (
  <div className={`bg-panel-dark p-2 rounded-lg border-l-2 ${borderColor}`}>
    <p className="text-[8px] text-slate-500 font-bold uppercase">{label}</p>
    <p className="text-sm font-black">{value}</p>
  </div>
);

interface GridItemProps {
  children?: React.ReactNode;
  active?: boolean;
  variant?: 'primary' | 'violet' | 'default';
  isSelected?: boolean;
  onClick?: () => void;
}

const GridItem = ({ 
  children, 
  active = false, 
  variant = 'primary', 
  isSelected = false, 
  onClick 
}: GridItemProps) => (
  <motion.button 
    variants={{
      idle: { scale: 1 },
      pulsing: { scale: [1, 1.03, 1], transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } },
      hover: { scale: 1.05, transition: { duration: 0.2 } },
      tap: { scale: 0.95 }
    }}
    initial="idle"
    animate={isSelected ? "idle" : active ? "pulsing" : "idle"}
    whileHover="hover"
    whileTap="tap"
    onClick={onClick}
    className={`size-11 rounded border flex items-center justify-center transition-colors cursor-pointer relative group
    ${isSelected 
      ? 'z-10 bg-slate-100 border-white ring-4 ring-primary/30 shadow-[0_0_20px_rgba(43,75,238,0.4)]' 
      : active 
        ? variant === 'primary' 
          ? 'bg-primary/30 border-primary/50 text-primary hover:bg-primary/40' 
          : variant === 'violet' 
            ? 'bg-violet-500/30 border-violet-400/50 text-violet-300 hover:bg-violet-500/40' 
            : 'bg-slate-800/60 border-slate-600 text-slate-300 hover:bg-slate-700'
        : 'bg-slate-800/20 border-slate-800/50 text-slate-600 hover:bg-slate-800/40'
    }`}
  >
    <div className={`transition-transform duration-300 ${isSelected ? 'text-background-dark scale-110' : 'group-hover:scale-125'}`}>
      {children}
    </div>
    {isSelected && (
      <motion.div 
        layoutId="selection-glow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 border-2 border-primary rounded pointer-events-none"
      />
    )}
  </motion.button>
);

const FooterItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="flex items-center gap-2">
    {icon}
    <div className="flex flex-col">
      <span className="text-[8px] text-slate-500 font-bold leading-none uppercase">{label}</span>
      <span className="text-[10px] font-bold leading-none uppercase">{value}</span>
    </div>
  </div>
);