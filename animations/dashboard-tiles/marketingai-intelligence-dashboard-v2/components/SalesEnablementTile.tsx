import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Activity, 
  Brain, 
  Zap, 
  Target, 
  TrendingUp,
  Server
} from 'lucide-react';

/**
 * SalesEnablementTile
 * 
 * A standalone, high-performance animated visualization of a "Central Intelligence Node".
 * 
 * Features:
 * - Simulated live data updates for network stats.
 * - Framer Motion SVG path animations for data flow.
 * - Tailwind arbitrary values for specific glow effects.
 * - Lucide icons replacing Google Material Symbols.
 */
export default function SalesEnablementTile() {
  // --- Local State for Simulated Live Data ---
  const [networkLoad, setNetworkLoad] = useState(412);
  const [latency, setLatency] = useState(12);
  const [uptime, setUptime] = useState("99.99%");

  useEffect(() => {
    // Simulate subtle data fluctuation
    const interval = setInterval(() => {
      setNetworkLoad(prev => Math.min(900, Math.max(200, prev + (Math.random() * 40 - 20))));
      setLatency(prev => Math.min(50, Math.max(5, Math.floor(prev + (Math.random() * 4 - 2)))));
      
      // Very rare uptime flicker
      if (Math.random() > 0.995) {
        setUptime("99.98%");
        setTimeout(() => setUptime("99.99%"), 2000);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col bg-[#020617] overflow-hidden rounded-3xl border border-accent-gold/30">
      
      {/* Background Pattern: Pipeline Grid & Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,#38BDF822_1px,transparent_1px)] bg-[length:30px_30px] opacity-100 pointer-events-none"></div>
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,#818CF8_0%,#38BDF8_30%,transparent_70%)] pointer-events-none"></div>

      {/* Main Content Container */}
      <div className="relative flex-1 flex flex-col p-6 md:p-8 lg:p-12 z-10">
        
        {/* Header Section */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Central Intelligence <span className="text-primary">Node</span>
            </h1>
            <p className="text-primary/60 text-sm md:text-base max-w-md">
              The core processing unit orchestrating high-performance predictive analytics.
            </p>
          </div>
          
          {/* Status Badge */}
          <div className="hidden md:flex items-center gap-2 bg-slate-950/80 backdrop-blur px-4 py-2 rounded-full border border-primary/20 shadow-[0_0_15px_rgba(56,189,248,0.1)]">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">System Core Active</span>
          </div>
        </div>

        {/* Central Visualization Area */}
        <div className="flex-1 relative flex items-center justify-center min-h-[300px]">
          
          {/* Left Side: Input Nodes */}
          <div className="absolute left-0 lg:left-8 top-1/2 -translate-y-1/2 flex flex-col gap-8 items-center z-10 pointer-events-none md:pointer-events-auto">
            <InputNode icon={<Cpu className="text-primary" size={28} />} label="Ingestion" delay={0} />
            <InputNode icon={<Activity className="text-primary" size={28} />} label="Signals" delay={1} />
          </div>

          {/* Right Side: Output Nodes */}
          <div className="absolute right-0 lg:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-10 pointer-events-none md:pointer-events-auto">
            <OutputCard 
              label="Live Forecast" 
              title="Churn Risk" 
              value="Negligible" 
              sub="Confidence: 98.4%" 
              color="accent-gold" 
            />
            <OutputCard 
              label="Engine Decision" 
              title="Max Budget Allocation" 
              value="" 
              sub="Target: High-LTV segments" 
              color="primary" 
              customValue
            />
          </div>

          {/* Center Core */}
          <div className="relative z-20 flex flex-col items-center justify-center">
            {/* Glow Behind */}
            <div className="absolute inset-0 bg-radial-gradient from-accent-gold/40 to-transparent blur-2xl scale-150 rounded-full opacity-40"></div>
            
            {/* Main Brain Circle */}
            <div className="relative size-40 md:size-56 lg:size-64 rounded-full bg-slate-900/40 backdrop-blur-xl flex flex-col items-center justify-center shadow-[0_0_60px_rgba(129,140,248,0.3)] border-4 border-accent-gold/50 group">
              <div className="absolute inset-0 rounded-full border border-primary/30 animate-pulse"></div>
              
              <motion.div
                animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Brain className="text-accent-gold mb-2" size={64} strokeWidth={1.5} />
              </motion.div>

              <div className="flex flex-col items-center bg-slate-950/80 px-4 py-2 rounded-lg border border-primary/40 backdrop-blur-md mt-2">
                <p className="text-accent-gold text-2xl md:text-3xl font-black tracking-tighter drop-shadow-[0_0_12px_rgba(129,140,248,0.8)]">
                  +34%
                </p>
                <p className="text-[10px] font-bold uppercase text-primary tracking-widest whitespace-nowrap">
                  Prediction Accuracy
                </p>
              </div>
            </div>
          </div>

          {/* Animated Connecting Lines (SVG Layer) */}
          <svg className="absolute inset-0 w-full h-full -z-10 pointer-events-none overflow-visible">
            <defs>
              <linearGradient id="line_grad_left" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0" />
                <stop offset="100%" stopColor="#38BDF8" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="line_grad_right" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#818CF8" stopOpacity="1" />
                <stop offset="100%" stopColor="#818CF8" stopOpacity="0" />
              </linearGradient>
            </defs>
            
            {/* Left Lines (Ingestion/Signals -> Brain) */}
            <ConnectingLine startX="10%" startY="35%" endX="40%" endY="50%" gradientUrl="url(#line_grad_left)" />
            <ConnectingLine startX="10%" startY="65%" endX="40%" endY="50%" gradientUrl="url(#line_grad_left)" delay={0.5} />

            {/* Right Lines (Brain -> Forecast/Decision) */}
            <ConnectingLine startX="60%" startY="50%" endX="90%" endY="35%" gradientUrl="url(#line_grad_right)" reverse />
            <ConnectingLine startX="60%" startY="50%" endX="90%" endY="65%" gradientUrl="url(#line_grad_right)" delay={0.5} reverse />
          </svg>

        </div>

        {/* Footer Stats Grid */}
        <div className="mt-auto grid grid-cols-3 gap-8 pt-6 border-t border-primary/10">
          <StatBlock label="Network Load" value={`${Math.round(networkLoad)} GB/s`} color="primary" />
          <StatBlock label="Latency" value={`${latency}ms`} color="accent-gold" bordered />
          <StatBlock label="Uptime" value={uptime} color="primary" glow />
        </div>

      </div>
    </div>
  );
}

// --- Subcomponents for Clean Architecture ---

const InputNode = ({ icon, label, delay }: { icon: React.ReactNode, label: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.8 }}
    className="flex flex-col items-center gap-2 p-3 lg:p-4 rounded-xl bg-slate-900/80 border border-primary/40 backdrop-blur-md shadow-[0_0_15px_rgba(56,189,248,0.2)] w-20 lg:w-24"
  >
    {icon}
    <span className="text-[10px] font-bold uppercase text-primary/80 tracking-widest">{label}</span>
  </motion.div>
);

const OutputCard = ({ label, title, value, sub, color, customValue = false }: any) => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
    className={`p-4 bg-slate-900/90 border-l-4 ${color === 'primary' ? 'border-primary' : 'border-accent-gold'} rounded-r-lg shadow-2xl min-w-[200px] border-y border-r border-indigo-400/20 backdrop-blur-sm`}
  >
    <p className={`text-[10px] font-bold uppercase ${color === 'primary' ? 'text-primary' : 'text-accent-gold'} mb-1`}>{label}</p>
    <p className="text-sm font-bold text-white leading-tight">
      {customValue ? title : <>{title}: <span className="text-primary">{value}</span></>}
    </p>
    <p className={`text-[10px] ${color === 'primary' ? 'text-accent-gold' : 'text-primary'} mt-1 font-bold italic`}>{sub}</p>
  </motion.div>
);

const StatBlock = ({ label, value, color, bordered = false, glow = false }: any) => (
  <div className={`flex flex-col gap-1 items-center ${bordered ? 'border-x border-[#818CF8]/20 px-4' : ''}`}>
    <p className={`text-${color}/60 text-xs font-medium uppercase tracking-widest`}>{label}</p>
    <p className={`text-xl font-bold ${color === 'primary' ? 'text-white' : 'text-white'} tracking-tight ${glow ? 'drop-shadow-[0_0_10px_rgba(56,189,248,0.5)] text-primary' : ''}`}>
      {value}
    </p>
  </div>
);

const ConnectingLine = ({ startX, startY, endX, endY, gradientUrl, delay = 0, reverse = false }: any) => {
  // Simple curved path generator
  // In a real app with dynamic coordinates, we'd calculate this via JS, but percentages work well here for responsive SVG
  const controlPointX = reverse ? '45%' : '55%'; 
  
  // Using simple quadratic bezier for the visual
  // Since we are using percentages in d attribute which is tricky, we map roughly to viewport 600x300 conceptual box
  // To keep it 100% responsive, we rely on the parent SVG viewbox or just use percent in framer motion if possible, 
  // but standard SVG paths need unitless numbers usually. 
  // We'll use a fixed viewbox on the SVG and position elements absolutely in CSS to match.
  // Actually, easier approach: Use absolute divs for lines or just hardcode the path based on the 600x300 viewbox from the original HTML
  // Original HTML Viewbox: 0 0 600 300.
  
  // We will interpret the props to match the original hardcoded paths for fidelity
  let d = "";
  if (!reverse && startY === "35%") d = "M50 100 C 150 100, 200 150, 250 150"; // Left Top to Center
  if (!reverse && startY === "65%") d = "M50 200 C 150 200, 200 150, 250 150"; // Left Bottom to Center
  if (reverse && endY === "35%") d = "M350 150 C 400 150, 450 100, 550 100"; // Center to Right Top
  if (reverse && endY === "65%") d = "M350 150 C 400 150, 450 200, 550 200"; // Center to Right Bottom

  return (
    <motion.path
      d={d}
      stroke={gradientUrl}
      strokeWidth="4"
      fill="none"
      strokeDasharray="8 4"
      initial={{ strokeDashoffset: 0 }}
      animate={{ strokeDashoffset: reverse ? -24 : 24 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      vectorEffect="non-scaling-stroke" 
      // Note: vectorEffect helps lines stay crisp if scaled, but here we render inside a specific viewbox
    />
  );
};
