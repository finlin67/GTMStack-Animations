'use client';

// FILE: Lifecycle Engine Dashboard.tsx
import React, { useState, useEffect } from 'react';
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
  Activity
} from 'lucide-react';

// --- Constants ---

// Retention Heatmap Color Helper
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

// Mock Data
const INITIAL_STATS = {
  aware: 48000,
  engage: 12000,
  retain: 8100,
  loyal: 2400,
  activeUsers: 124500,
  engaged: 42200,
  conversion: 3.8,
  campaigns: 6
};

const INITIAL_PERF = {
  cpu: 42,
  memory: 68,
  network: 2.4 // MB/s
};

const FEED_ITEMS = [
  { id: 1, text: <>#8294 moved to <span className="text-emerald-500 font-bold">Loyal</span></>, time: 'Now', type: 'success' },
  { id: 2, text: <>Campaign: <span className="text-slate-400">Winter Splash</span></>, time: '2m', type: 'info' },
  { id: 3, text: <>#9921 moved to <span className="text-emerald-500 font-bold">Loyal</span></>, time: '5m', type: 'success' },
  { id: 4, text: <>Cohort: <span className="text-slate-400">Nov 07 Started</span></>, time: '12m', type: 'info' },
  { id: 5, text: <>#1023 risk <span className="text-orange-500 font-bold">High</span></>, time: '15m', type: 'warning' },
];

export default function CompactLifecycleDashboard() {
  const [stats, setStats] = useState(INITIAL_STATS);
  const [perf, setPerf] = useState(INITIAL_PERF);
  const [liveFeed, setLiveFeed] = useState(FEED_ITEMS.slice(0, 3));

  // -- Organic Jitter Logic (Stats) --
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const animate = () => {
      setStats(prev => ({
        ...prev,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10) - 4,
        retain: prev.retain + Math.floor(Math.random() * 3) - 1,
        engage: prev.engage + Math.floor(Math.random() * 5) - 2,
      }));
      // Recursive setTimeout for organic feel
      timeout = setTimeout(animate, 2500);
    };
    timeout = setTimeout(animate, 2500);
    return () => clearTimeout(timeout);
  }, []);

  // -- Organic Jitter Logic (Performance) --
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const animate = () => {
      setPerf(prev => ({
        cpu: Math.min(100, Math.max(10, prev.cpu + Math.floor(Math.random() * 15) - 7)),
        memory: Math.min(95, Math.max(40, prev.memory + Math.floor(Math.random() * 5) - 2)),
        network: Math.max(0, +(prev.network + (Math.random() * 1.2 - 0.5)).toFixed(1))
      }));
      timeout = setTimeout(animate, 1500);
    };
    timeout = setTimeout(animate, 1500);
    return () => clearTimeout(timeout);
  }, []);

  // -- Live Feed Simulation --
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const animate = () => {
      const nextItemIndex = Math.floor(Math.random() * FEED_ITEMS.length);
      const newItem = { ...FEED_ITEMS[nextItemIndex], id: Date.now() }; 
      
      setLiveFeed(prev => {
        const newFeed = [newItem, ...prev];
        return newFeed.slice(0, 4); // Keep 4 items for density
      });
      timeout = setTimeout(animate, 4000);
    };
    timeout = setTimeout(animate, 4000);
    return () => clearTimeout(timeout);
  }, []);

  // -- Number Formatter --
  const formatK = (num: number) => {
    return num >= 1000 ? (num / 1000).toFixed(1) + 'k' : num.toString();
  };
  
  const formatComma = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <div className="w-full h-full flex justify-center items-center bg-[#0a0f1a] text-white font-['Inter']">
      
      {/* Root Container: Responsive Scale, Max 600px */}
      <div className="w-full h-full max-w-[600px] max-h-[600px] bg-[#0a0f1a] border border-slate-800 overflow-hidden text-xs leading-tight flex flex-col relative shadow-2xl">
        
        {/* Header - Compact padding */}
        <header className="flex items-center justify-between border-b border-slate-800 px-2 py-1.5 bg-[#0a0f1a]/90 backdrop-blur-md z-20 shrink-0">
          <div className="flex items-center gap-2">
            <div className="size-4 bg-[#135bec] rounded flex items-center justify-center">
              <Video className="text-white w-2.5 h-2.5" />
            </div>
            <h2 className="font-bold tracking-tight text-xs text-white">Lifecycle Engine</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] text-slate-500 font-medium uppercase tracking-widest">v2.4 Live</span>
            <div 
              className="h-4 w-4 rounded-full bg-slate-700 bg-cover bg-center border border-slate-700" 
              style={{ backgroundImage: "url('https://picsum.photos/40/40')" }}
            ></div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2 relative z-10">
          
          {/* Flywheel Section - Reduced Vertical Height */}
          <section className="relative rounded-lg p-1.5 py-2 border border-slate-800/50 overflow-hidden bg-slate-900/20">
             {/* Flywheel Gradient Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(19,91,236,0.1)_0%,transparent_70%)]" />
            
            <div className="flex justify-between px-4 items-center gap-1 z-10 relative">
              {/* Aware */}
              <div className="flex flex-col items-center gap-0.5">
                <div className="size-11 rounded-full border border-[#135bec]/30 bg-[#0a0f1a]/80 flex flex-col items-center justify-center text-center">
                  <Eye className="text-[#135bec] w-3 h-3" />
                  <motion.span 
                    key={stats.aware}
                    initial={{ scale: 0.9, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="font-bold text-xs leading-none mt-0.5"
                  >
                    {formatK(stats.aware)}
                  </motion.span>
                  <span className="text-[7px] text-slate-500 uppercase">Aware</span>
                </div>
              </div>

              {/* Arrow Connector */}
              <div className="h-[1px] w-4 bg-slate-800" />

              {/* Engage */}
              <div className="flex flex-col items-center gap-0.5">
                <div className="size-11 rounded-full border border-purple-500/30 bg-[#0a0f1a]/80 flex flex-col items-center justify-center text-center">
                  <MousePointer2 className="text-purple-500 w-3 h-3" />
                  <motion.span 
                    key={stats.engage}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    className="font-bold text-xs leading-none mt-0.5"
                  >
                    {formatK(stats.engage)}
                  </motion.span>
                  <span className="text-[7px] text-slate-500 uppercase">Engage</span>
                </div>
              </div>

              {/* Arrow Connector */}
              <div className="h-[1px] w-4 bg-slate-800" />

              {/* Retain (Main) */}
              <div className="flex flex-col items-center gap-0.5 relative">
                <motion.div 
                   animate={{ boxShadow: ["0 0 10px rgba(249,115,22,0.2)", "0 0 20px rgba(249,115,22,0.4)", "0 0 10px rgba(249,115,22,0.2)"] }}
                   transition={{ duration: 3, repeat: Infinity }}
                   className="size-14 rounded-full border border-orange-500 bg-orange-500/10 flex flex-col items-center justify-center text-center relative"
                >
                  <History className="text-white w-3.5 h-3.5" />
                  <motion.span 
                     key={stats.retain}
                     className="font-black text-sm leading-none mt-0.5"
                  >
                    {formatK(stats.retain)}
                  </motion.span>
                  <span className="text-[8px] font-bold text-white uppercase">Retain</span>
                  <div className="absolute -bottom-1 bg-emerald-500 text-[7px] px-1 rounded-full font-bold shadow text-black">+8%</div>
                </motion.div>
              </div>

              {/* Arrow Connector */}
              <div className="h-[1px] w-4 bg-slate-800" />

              {/* Loyal */}
              <div className="flex flex-col items-center gap-0.5">
                <div className="size-11 rounded-full border border-emerald-500/30 bg-[#0a0f1a]/80 flex flex-col items-center justify-center text-center">
                  <BadgeCheck className="text-emerald-500 w-3 h-3" />
                  <span className="font-bold text-xs leading-none mt-0.5">{formatK(stats.loyal)}</span>
                  <span className="text-[7px] text-slate-500 uppercase">Loyal</span>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Grid - 7 Items Layout */}
          <div className="grid grid-cols-2 gap-1.5">
            {/* Total Users (New) */}
            <div className="bg-slate-900/40 border border-slate-800 rounded p-1.5 flex justify-between items-center hover:bg-slate-800/50 transition-colors">
              <div>
                <p className="text-slate-500 font-medium mb-0.5 uppercase text-[9px]">Total Users</p>
                <h3 className="text-xs font-bold w-16">1.5M</h3>
              </div>
              <span className="text-[9px] font-bold text-emerald-500 bg-emerald-500/10 px-1 py-0.5 rounded">+2.1%</span>
            </div>

            {/* Active Users (Existing) */}
            <div className="bg-slate-900/40 border border-slate-800 rounded p-1.5 flex justify-between items-center hover:bg-slate-800/50 transition-colors">
              <div>
                <p className="text-slate-500 font-medium mb-0.5 uppercase text-[9px]">Active Users</p>
                <h3 className="text-xs font-bold w-16">{formatComma(stats.activeUsers)}</h3>
              </div>
              <span className="text-[9px] font-bold text-emerald-500 bg-emerald-500/10 px-1 py-0.5 rounded">+12%</span>
            </div>

            {/* New Signups (New) */}
            <div className="bg-slate-900/40 border border-slate-800 rounded p-1.5 flex justify-between items-center hover:bg-slate-800/50 transition-colors">
              <div>
                <p className="text-slate-500 font-medium mb-0.5 uppercase text-[9px]">New Signups</p>
                <h3 className="text-xs font-bold w-16">5.2k</h3>
              </div>
              <span className="text-[9px] font-bold text-emerald-500 bg-emerald-500/10 px-1 py-0.5 rounded">+8.5%</span>
            </div>

            {/* Engaged (Existing) */}
            <div className="bg-slate-900/40 border border-slate-800 rounded p-1.5 flex justify-between items-center hover:bg-slate-800/50 transition-colors">
              <div>
                <p className="text-slate-500 font-medium mb-0.5 uppercase text-[9px]">Engaged</p>
                <h3 className="text-xs font-bold w-16">{formatComma(stats.engaged)}</h3>
              </div>
              <span className="text-[9px] font-bold text-emerald-500 bg-emerald-500/10 px-1 py-0.5 rounded">+5.2%</span>
            </div>

            {/* Avg Session (New) */}
            <div className="bg-slate-900/40 border border-slate-800 rounded p-1.5 flex justify-between items-center hover:bg-slate-800/50 transition-colors">
              <div>
                <p className="text-slate-500 font-medium mb-0.5 uppercase text-[9px]">Avg Session</p>
                <h3 className="text-xs font-bold w-16">3m 15s</h3>
              </div>
              <span className="text-[9px] font-bold text-emerald-500 bg-emerald-500/10 px-1 py-0.5 rounded">+0.9%</span>
            </div>

            {/* Conversion (Existing) */}
            <div className="bg-slate-900/40 border border-slate-800 rounded p-1.5 flex justify-between items-center hover:bg-slate-800/50 transition-colors">
              <div>
                <p className="text-slate-500 font-medium mb-0.5 uppercase text-[9px]">Conversion</p>
                <h3 className="text-xs font-bold w-16">{stats.conversion}%</h3>
              </div>
              <span className="text-[9px] font-bold text-emerald-500 bg-emerald-500/10 px-1 py-0.5 rounded">+0.4%</span>
            </div>

            {/* Campaigns (Existing) - Spans 2 cols */}
            <div className="bg-slate-900/40 border border-slate-800 rounded p-1.5 flex justify-between items-center hover:bg-slate-800/50 transition-colors col-span-2">
              <div>
                <p className="text-slate-500 font-medium mb-0.5 uppercase text-[9px]">Campaigns</p>
                <h3 className="text-xs font-bold w-16">{stats.campaigns} Active</h3>
              </div>
              <Megaphone className="text-[#135bec] w-3 h-3" />
            </div>
          </div>

          {/* System Performance Metrics */}
          <div className="grid grid-cols-3 gap-1.5">
            {/* CPU */}
            <div className="bg-slate-900/40 border border-slate-800 rounded p-1.5 flex flex-col justify-between hover:bg-slate-800/50 transition-colors">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-1">
                  <Cpu className="w-2.5 h-2.5 text-[#00f3ff]" />
                  <span className="text-[8px] text-slate-400 font-bold uppercase">CPU</span>
                </div>
                <span className={`text-[9px] font-mono ${perf.cpu > 80 ? 'text-orange-500' : 'text-slate-300'}`}>{perf.cpu}%</span>
              </div>
              <div className="h-1 w-full bg-slate-800/80 rounded-full overflow-hidden">
                <motion.div 
                  className={`h-full ${perf.cpu > 80 ? 'bg-orange-500' : 'bg-[#00f3ff]'}`}
                  animate={{ width: `${perf.cpu}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              </div>
            </div>

            {/* Memory */}
            <div className="bg-slate-900/40 border border-slate-800 rounded p-1.5 flex flex-col justify-between hover:bg-slate-800/50 transition-colors">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-1">
                  <Server className="w-2.5 h-2.5 text-purple-400" />
                  <span className="text-[8px] text-slate-400 font-bold uppercase">RAM</span>
                </div>
                <span className="text-[9px] font-mono text-slate-300">{perf.memory}%</span>
              </div>
              <div className="h-1 w-full bg-slate-800/80 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-purple-500" 
                  animate={{ width: `${perf.memory}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              </div>
            </div>

            {/* Network */}
            <div className="bg-slate-900/40 border border-slate-800 rounded p-1.5 flex flex-col justify-between hover:bg-slate-800/50 transition-colors">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-1">
                  <Activity className="w-2.5 h-2.5 text-emerald-400" />
                  <span className="text-[8px] text-slate-400 font-bold uppercase">NET</span>
                </div>
                <span className="text-[9px] font-mono text-slate-300">{perf.network}<span className="text-[7px] text-slate-500 ml-0.5">MB/s</span></span>
              </div>
              <div className="h-1 w-full bg-slate-800/80 rounded-full overflow-hidden flex items-end gap-[1px]">
                 {/* Simulated Bar Graph for Network */}
                 {[...Array(8)].map((_, i) => (
                    <motion.div 
                      key={i}
                      className="w-full bg-emerald-500/80 rounded-[1px]"
                      animate={{ height: `${Math.min(100, Math.max(10, (perf.network * 15) + (Math.random() * 40 - 20)))}%` }}
                      transition={{ duration: 0.2 }}
                    />
                 ))}
              </div>
            </div>
          </div>

          {/* Retention Heatmap - Condensed */}
          <div className="bg-slate-900/60 border border-orange-500/30 rounded overflow-hidden">
            <div className="flex items-center justify-between px-2 py-1 border-b border-slate-800 bg-slate-900">
              <h3 className="font-bold text-[10px] text-orange-400">Retention Heatmap</h3>
              <div className="flex items-center gap-1.5 text-[9px]">
                <span className="text-[#00f3ff]">D30: 68%</span>
                <span className="text-slate-600">|</span>
                <span className="text-slate-400">Churn: 4.2%</span>
              </div>
            </div>
            <div className="p-1">
              <div className="w-full overflow-x-auto custom-scrollbar">
                <table className="w-full text-center border-separate border-spacing-[1px]">
                  <thead>
                    <tr className="text-[8px] font-bold text-slate-500 uppercase">
                      <th className="text-left pb-1 pl-1">Cohort</th>
                      <th className="pb-1">Users</th>
                      <th className="pb-1">W0</th>
                      <th className="pb-1">W1</th>
                      <th className="pb-1">W2</th>
                      <th className="pb-1">W3</th>
                      <th className="pb-1">W4</th>
                      <th className="pb-1">W5</th>
                    </tr>
                  </thead>
                  <tbody className="text-[9px] font-bold">
                    <tr>
                      <td className="text-left text-slate-400 py-0.5 pl-1">Oct 23</td>
                      <td className="text-slate-300">1.2k</td>
                      <td><div className={`${getRetentionStyle(100)} py-0.5 rounded-sm`}>100</div></td>
                      <td><div className={`${getRetentionStyle(92)} py-0.5 rounded-sm`}>92</div></td>
                      <td><div className={`${getRetentionStyle(84)} py-0.5 rounded-sm`}>84</div></td>
                      <td><div className={`${getRetentionStyle(78)} py-0.5 rounded-sm`}>78</div></td>
                      <td><div className={`${getRetentionStyle(72)} py-0.5 rounded-sm`}>72</div></td>
                      <td><div className={`${getRetentionStyle(65)} py-0.5 rounded-sm`}>65</div></td>
                    </tr>
                    <tr>
                      <td className="text-left text-slate-400 py-0.5 pl-1">Oct 30</td>
                      <td className="text-slate-300">1.4k</td>
                      <td><div className={`${getRetentionStyle(100)} py-0.5 rounded-sm`}>100</div></td>
                      <td><div className={`${getRetentionStyle(88)} py-0.5 rounded-sm`}>88</div></td>
                      <td><div className={`${getRetentionStyle(76)} py-0.5 rounded-sm`}>76</div></td>
                      <td><div className={`${getRetentionStyle(64)} py-0.5 rounded-sm`}>64</div></td>
                      <td><div className={`${getRetentionStyle(58)} py-0.5 rounded-sm`}>58</div></td>
                      <td><div className={`${getRetentionStyle(42)} py-0.5 rounded-sm`}>42</div></td>
                    </tr>
                    <tr>
                      <td className="text-left text-slate-400 py-0.5 pl-1">Nov 06</td>
                      <td className="text-slate-300">1.1k</td>
                      <td><div className={`${getRetentionStyle(100)} py-0.5 rounded-sm`}>100</div></td>
                      <td><div className={`${getRetentionStyle(94)} py-0.5 rounded-sm`}>94</div></td>
                      <td><div className={`${getRetentionStyle(88)} py-0.5 rounded-sm`}>88</div></td>
                      <td><div className={`${getRetentionStyle(82)} py-0.5 rounded-sm`}>82</div></td>
                      <td><div className={`${getRetentionStyle(74)} py-0.5 rounded-sm`}>74</div></td>
                      <td><div className="bg-[#1e1b4b] text-[#64748b] py-0.5 rounded-sm opacity-20">-</div></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Live Feed & Actions */}
          <div className="space-y-1.5 pb-12">
            {/* Live Feed */}
            <div className="bg-slate-900/40 border border-slate-800 rounded p-1.5 min-h-[80px]">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-bold text-[9px] uppercase tracking-wider text-slate-400">Live Stream</h4>
                <div className="flex items-center gap-1">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                </div>
              </div>
              
              <div className="space-y-1 relative">
                <AnimatePresence initial={false}>
                  {liveFeed.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -5, height: 0 }}
                      animate={{ opacity: 1, x: 0, height: 'auto' }}
                      exit={{ opacity: 0, x: 5, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-1.5 p-1 bg-slate-800/30 rounded border border-transparent hover:border-slate-700/50"
                    >
                      <div className={`size-1 rounded-full shrink-0 ${item.type === 'warning' ? 'bg-orange-500 shadow-[0_0_4px_#f97316]' : item.type === 'success' ? 'bg-emerald-500 shadow-[0_0_4px_#10b981]' : 'bg-[#135bec] shadow-[0_0_4px_#135bec]'}`}></div>
                      <p className="flex-1 text-[9px] truncate text-slate-300">
                        {item.text}
                      </p>
                      <span className="text-[8px] text-slate-600 shrink-0 font-mono">{item.time}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Fixed */}
        <footer className="py-1 px-2 border-t border-slate-800 flex justify-between items-center text-[8px] text-slate-500 font-medium bg-[#0a0f1a] z-10 shrink-0">
          <p>© 2024 Lifecycle Engine AI</p>
          <div className="flex gap-2">
            <span className="flex items-center gap-0.5 hover:text-slate-300 cursor-pointer transition-colors">
              <Shield className="w-2 h-2" /> 
              SECURE
            </span>
            <span className="flex items-center gap-0.5 hover:text-slate-300 cursor-pointer transition-colors">
              <Database className="w-2 h-2" /> 
              US-EAST-1
            </span>
          </div>
        </footer>

        {/* FAB - Adjusted position */}
        <button className="absolute bottom-7 right-3 size-8 bg-[#135bec] text-white rounded-full shadow-lg shadow-blue-900/40 flex items-center justify-center hover:scale-105 transition-transform z-30 border border-blue-400/20">
          <Plus className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
}