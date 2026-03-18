import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Cpu, 
  Database, 
  Server, 
  Wifi, 
  ShieldCheck, 
  Globe, 
  Zap, 
  Clock,
  MoreHorizontal,
  CheckCircle2,
  AlertCircle,
  Layers,
  Mail,
  Box
} from 'lucide-react';

// --- Types & Constants ---
type SystemStatus = 'optimal' | 'warning' | 'critical';
type ServiceStatus = 'healthy' | 'warning' | 'critical';

interface Service {
    id: string;
    name: string;
    icon: React.ElementType;
    status: ServiceStatus;
}

const INITIAL_SERVICES: Omit<Service, 'status'>[] = [
    { id: '1', name: 'Auth', icon: ShieldCheck },
    { id: '2', name: 'API', icon: Globe },
    { id: '3', name: 'Data', icon: Database },
    { id: '4', name: 'Cache', icon: Layers },
    { id: '5', name: 'Mail', icon: Mail },
    { id: '6', name: 'Logs', icon: Clock },
    { id: '7', name: 'Edge', icon: Wifi },
    { id: '8', name: 'AI', icon: Zap },
];

export default function DashboardTile() {
  const [cpuLoad, setCpuLoad] = useState(42);
  const [memoryLoad, setMemoryLoad] = useState(30);
  const [activeNodes, setActiveNodes] = useState(124);
  const [status, setStatus] = useState<SystemStatus>('optimal');
  const [services, setServices] = useState<Service[]>(
      INITIAL_SERVICES.map(s => ({ ...s, status: 'healthy' as ServiceStatus }))
  );

  // Simulation effect for "Hero" visualization and System Status
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuLoad(prev => {
        const next = prev + (Math.random() * 15 - 7.5);
        return Math.min(Math.max(next, 10), 90);
      });
      setMemoryLoad(prev => {
        const next = prev + (Math.random() * 10 - 5);
        return Math.min(Math.max(next, 20), 80);
      });
      // Random system status flicks
      if (Math.random() > 0.98) setStatus('warning');
      else if (Math.random() > 0.95) setStatus('optimal');
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  // Simulation for Microservices
  useEffect(() => {
      const interval = setInterval(() => {
          setServices(prev => prev.map(service => {
              if (Math.random() > 0.95) {
                  const statuses: ServiceStatus[] = ['healthy', 'healthy', 'warning', 'critical'];
                  const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
                  return { ...service, status: newStatus };
              }
              return service;
          }));
      }, 2500);
      return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-[600px] h-[600px] bg-[#0a0612] glass-panel rounded-[32px] overflow-hidden flex flex-col relative shadow-2xl shadow-purple-900/40 border border-white/10 group selection:bg-[#8c25f4]/30">
      
      {/* --- Header (Top 15%) --- */}
      <div className="h-[15%] min-h-[90px] px-8 flex items-center justify-between border-b border-white/5 bg-gradient-to-r from-white/[0.03] to-transparent backdrop-blur-sm z-20">
        <div className="flex items-center gap-4">
          <div className="size-11 bg-[#8c25f4] rounded-xl flex items-center justify-center neon-glow-primary shadow-[0_0_20px_rgba(140,37,244,0.4)] ring-1 ring-white/20">
            <Activity className="text-white w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-white text-xl font-bold leading-none tracking-tight">
              InfraCore
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[#8c25f4] text-[10px] font-bold tracking-[0.2em] uppercase opacity-90">DeepDive</span>
              <span className="w-1 h-1 rounded-full bg-white/30"></span>
              <span className="text-white/40 text-[10px] font-mono">v2.4.0</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className={`px-4 py-2 rounded-full border flex items-center gap-2.5 transition-colors duration-500 ${
            status === 'optimal' ? 'bg-[#10b981]/5 border-[#10b981]/20' : 
            status === 'warning' ? 'bg-[#8c25f4]/5 border-[#8c25f4]/20' : 'bg-red-500/5 border-red-500/20'
          }`}>
            <span className="relative flex h-2.5 w-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${status === 'optimal' ? 'bg-[#10b981]' : status === 'warning' ? 'bg-[#8c25f4]' : 'bg-red-500'}`}></span>
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${status === 'optimal' ? 'bg-[#10b981]' : status === 'warning' ? 'bg-[#8c25f4]' : 'bg-red-500'}`}></span>
            </span>
            <span className={`text-xs font-bold uppercase tracking-wider ${status === 'optimal' ? 'text-[#10b981]' : status === 'warning' ? 'text-[#8c25f4]' : 'text-red-500'}`}>
              {status === 'optimal' ? 'System Stable' : status === 'warning' ? 'Load High' : 'Critical'}
            </span>
          </div>
        </div>
      </div>

      {/* --- Main Content Body (70%) --- */}
      <div className="flex-1 flex flex-col px-8 py-6 gap-6 relative z-10">
        
        {/* SECTION 1: HERO (Optical Center) */}
        {/* We use flex-1 to allow this to take available vertical space, becoming the focal point */}
        <div className="flex-1 relative flex flex-col justify-center items-center min-h-[180px]">
            {/* Ambient Background Glow */}
            <motion.div 
              animate={{ opacity: [0.3, 0.5, 0.3], scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-b from-[#8c25f4]/20 via-[#8c25f4]/5 to-transparent blur-3xl rounded-full" 
            />
            
            <div className="w-full h-full relative z-10 flex items-center justify-center">
                 {/* Decorative Grid Lines behind graph */}
                 <div className="absolute inset-0 w-full h-full opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                 <svg className="w-full h-40 overflow-visible" viewBox="0 0 400 160" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="hero-gradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#8c25f4" stopOpacity="0.4"/>
                            <stop offset="100%" stopColor="#8c25f4" stopOpacity="0"/>
                        </linearGradient>
                        <linearGradient id="hero-gradient-secondary" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2"/>
                            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0"/>
                        </linearGradient>
                    </defs>
                    
                    {/* Secondary Data Line (Memory) - Cyan */}
                    <motion.path 
                        d={`M0,${160 - memoryLoad * 1.2} Q100,${160 - memoryLoad * 1.5} 200,${160 - memoryLoad} T400,${160 - memoryLoad * 0.8}`}
                        fill="none" 
                        stroke="#22d3ee" 
                        strokeWidth="2"
                        strokeOpacity="0.4"
                        strokeLinecap="round"
                        animate={{ d: `M0,${160 - memoryLoad * 1.2} Q100,${160 - memoryLoad * 1.0} 200,${160 - memoryLoad * 1.4} T400,${160 - memoryLoad * 0.8}` }}
                        transition={{ duration: 3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                    />

                    {/* Primary Data Line (CPU) - Purple */}
                    <motion.path 
                        d={`M0,${160 - cpuLoad * 1.5} C100,${160 - cpuLoad * 1.8} 200,${160 - cpuLoad} 300,${160 - cpuLoad * 1.2} 400,${160 - cpuLoad * 1.5}`}
                        fill="none" 
                        stroke="#8c25f4" 
                        strokeWidth="4"
                        strokeLinecap="round"
                        className="drop-shadow-[0_0_15px_rgba(140,37,244,0.6)]"
                        animate={{ d: `M0,${160 - cpuLoad * 1.5} C100,${160 - cpuLoad * 1.2} 200,${160 - cpuLoad * 1.8} 300,${160 - cpuLoad * 0.9} 400,${160 - cpuLoad * 1.5}` }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                    />
                    <motion.path 
                        d={`M0,${160 - cpuLoad * 1.5} C100,${160 - cpuLoad * 1.2} 200,${160 - cpuLoad * 1.8} 300,${160 - cpuLoad * 0.9} 400,${160 - cpuLoad * 1.5} V 200 H 0 Z`}
                        fill="url(#hero-gradient)" 
                        opacity="0.6"
                        animate={{ d: `M0,${160 - cpuLoad * 1.5} C100,${160 - cpuLoad * 1.2} 200,${160 - cpuLoad * 1.8} 300,${160 - cpuLoad * 0.9} 400,${160 - cpuLoad * 1.5} V 200 H 0 Z` }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                    />
                 </svg>
                 
                 {/* Floating Hero Data Point */}
                 <motion.div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20"
                 >
                    <div className="relative">
                        <motion.span 
                            animate={{ opacity: [0.8, 1, 0.8] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-7xl font-bold text-white tracking-tighter drop-shadow-2xl"
                        >
                            {cpuLoad.toFixed(0)}%
                        </motion.span>
                        <span className="absolute -top-2 -right-4 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8c25f4] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#8c25f4]"></span>
                        </span>
                    </div>
                    <span className="text-[#8c25f4] text-xs font-bold uppercase tracking-[0.2em] mt-2 px-3 py-1 bg-[#8c25f4]/10 rounded-full border border-[#8c25f4]/20 backdrop-blur-md">
                        Total Load
                    </span>
                 </motion.div>
            </div>
        </div>

        {/* SECTION 2: COMPONENT GROUPING (Secondary Stack) */}
        
        {/* Metric Tiles Row */}
        <div className="grid grid-cols-3 gap-3 w-full z-10 shrink-0">
             <MetricTile 
                icon={<Server size={18} className="text-cyan-400" />} 
                label="Nodes" 
                value={activeNodes} 
                sub="+2" 
                color="bg-cyan-400"
                glow="neon-glow-cyan"
             />
             <MetricTile 
                icon={<Database size={18} className="text-emerald-400" />} 
                label="Memory" 
                value={`${memoryLoad}GB`} 
                sub="Stable" 
                color="bg-emerald-400"
                glow="neon-glow-success"
             />
             <MetricTile 
                icon={<Wifi size={18} className="text-pink-400" />} 
                label="Network" 
                value="1.2Gb" 
                sub="↑ High" 
                color="bg-pink-400"
                glow="shadow-pink-500/50"
             />
        </div>

        {/* Microservices Health Grid */}
        <div className="w-full bg-white/[0.03] rounded-2xl p-4 border border-white/5 flex flex-col gap-4 shrink-0 hover:bg-white/[0.05] transition-colors duration-300">
            <div className="flex justify-between items-center">
                 <div className="flex items-center gap-2">
                    <Box size={14} className="text-white/40" />
                    <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Microservices</span>
                 </div>
                 <motion.div 
                    animate={{ opacity: [0.6, 1, 0.6] }} 
                    transition={{ duration: 3, repeat: Infinity }}
                    className="flex items-center gap-1.5"
                 >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] shadow-[0_0_5px_#10b981]"></div>
                    <span className="text-[9px] text-[#10b981] font-mono font-bold uppercase">Mesh Active</span>
                 </motion.div>
            </div>
            
            <div className="grid grid-cols-4 gap-3">
                {services.map((service) => (
                    <div key={service.id} className="flex flex-col items-center gap-2 group/svc cursor-pointer">
                        <motion.div 
                            className={`relative w-full aspect-square rounded-xl flex items-center justify-center border transition-all duration-300 ${
                                service.status === 'healthy' ? 'bg-[#10b981]/10 border-[#10b981]/20 text-[#10b981] group-hover/svc:border-[#10b981]/50' : 
                                service.status === 'warning' ? 'bg-[#8c25f4]/10 border-[#8c25f4]/20 text-[#8c25f4] group-hover/svc:border-[#8c25f4]/50' : 
                                'bg-[#ef4444]/10 border-[#ef4444]/20 text-[#ef4444] group-hover/svc:border-[#ef4444]/50'
                            }`}
                            whileHover={{ scale: 1.05 }}
                        >
                            <service.icon size={18} />
                            
                            {/* Status Dot */}
                            <span className={`absolute top-2 right-2 flex h-1.5 w-1.5`}>
                              {service.status !== 'healthy' && (
                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                                    service.status === 'warning' ? 'bg-[#8c25f4]' : 'bg-[#ef4444]'
                                }`}></span>
                              )}
                              <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
                                  service.status === 'healthy' ? 'bg-[#10b981]' : 
                                  service.status === 'warning' ? 'bg-[#8c25f4]' : 'bg-[#ef4444]'
                              }`}></span>
                            </span>
                        </motion.div>
                        <span className="text-[10px] font-medium text-white/30 uppercase tracking-tight group-hover/svc:text-white transition-colors">{service.name}</span>
                    </div>
                ))}
            </div>
        </div>

      </div>

      {/* --- Footer (Bottom 15%) --- */}
      <div className="h-[15%] min-h-[90px] bg-[#0d0816] border-t border-white/5 px-8 flex items-center justify-between relative overflow-hidden z-20">
        {/* Animated Scanline */}
        <motion.div 
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#8c25f4]/50 to-transparent opacity-30 pointer-events-none" 
        />
        
        <div className="flex items-center gap-8">
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-[#10b981]">
                    <CheckCircle2 size={16} />
                    <span className="text-sm font-bold tracking-tight">Operational</span>
                </div>
                <span className="text-white/20 text-[10px] font-mono uppercase tracking-wider">Region: US-East-1</span>
            </div>
        </div>

        <div className="flex gap-6">
             <div className="text-right">
                <div className="text-[10px] text-white/30 font-bold uppercase tracking-wider mb-0.5">Latency</div>
                <div className="text-white font-mono text-sm font-medium flex items-center gap-1 justify-end">
                    <span className="size-1.5 rounded-full bg-[#10b981]"></span> 24ms
                </div>
             </div>
             <div className="text-right border-l border-white/10 pl-6">
                <div className="text-[10px] text-white/30 font-bold uppercase tracking-wider mb-0.5">Uptime</div>
                <div className="text-white font-mono text-sm font-medium">99.99%</div>
             </div>
        </div>
      </div>
      
    </div>
  );
}

function MetricTile({ icon, label, value, sub, color, glow }: any) {
    return (
        <div className="flex flex-col items-center justify-center bg-white/[0.03] rounded-2xl p-3 border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300 group/tile cursor-default h-full relative overflow-hidden">
            <div className={`absolute inset-0 opacity-0 group-hover/tile:opacity-20 transition-opacity duration-500 bg-gradient-to-b ${color.replace('bg-', 'from-').replace('400', '500')} to-transparent`} />
            
            <div className={`mb-2 p-2 rounded-lg bg-white/5 group-hover/tile:scale-110 transition-transform duration-300 ${color.replace('bg-', 'text-').replace('400', '300')} relative z-10`}>
                {icon}
            </div>
            <span className="text-xl font-bold text-white tracking-tight relative z-10">{value}</span>
            <div className="flex items-center gap-1.5 relative z-10 mt-1">
                <span className="text-[9px] font-bold text-white/30 uppercase tracking-wider">{label}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-sm text-[#0a0612] font-bold ${color}`}>{sub}</span>
            </div>
        </div>
    )
}
