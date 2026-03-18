
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Factory, 
  Package, 
  Layers, 
  BarChart3, 
  CheckCircle2, 
  Truck, 
  BadgeCheck, 
  TrendingUp, 
  Settings,
  ChevronRight,
  Zap
} from 'lucide-react';

export default function ManufacturingDashboard() {
  const [isMarketingImpact, setIsMarketingImpact] = useState(false);
  const [liveStats, setLiveStats] = useState({
    operationalSpeed: 94,
    weeklyPerformance: 2.0,
    dailyHistory: [80, 60, 90, 40, 30, 75, 85]
  });

  // Jitter effect for live stats to mimic real data
  const updateStats = useCallback(() => {
    setLiveStats(prev => {
      const jitter = (Math.random() - 0.5) * 0.5;
      const newSpeed = Math.min(Math.max(prev.operationalSpeed + jitter, 90), 98);
      
      const newHistory = prev.dailyHistory.map(h => {
        const hJitter = (Math.random() - 0.5) * 2;
        return Math.min(Math.max(h + hJitter, 10), 100);
      });

      return {
        ...prev,
        operationalSpeed: parseFloat(newSpeed.toFixed(1)),
        dailyHistory: newHistory
      };
    });

    // Support organic jitter with recursive timeout
    const nextTimeout = Math.random() * 2000 + 1000;
    setTimeout(updateStats, nextTimeout);
  }, []);

  useEffect(() => {
    const timer = setTimeout(updateStats, 2000);
    return () => clearTimeout(timer);
  }, [updateStats]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-[#f1f0f4] dark:border-white/10 px-6 lg:px-20 py-4">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 text-primary dark:text-white">
            <Factory className="w-8 h-8" />
            <h2 className="text-xl font-bold tracking-tight">Mfg Agency</h2>
          </div>
          <nav className="hidden md:flex items-center gap-10">
            {['Services', 'Portfolio', 'Case Studies', 'About'].map(item => (
              <a key={item} className="text-sm font-medium hover:text-primary transition-colors dark:text-gray-300" href="#">{item}</a>
            ))}
          </nav>
          <button className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-bold hover:opacity-90 transition-all">
            Contact Us
          </button>
        </div>
      </header>

      <main className="pt-24 flex-grow">
        {/* Hero & Lifecycle Toggle Section */}
        <section className="relative w-full overflow-hidden px-4 py-12 lg:py-20">
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-700 via-indigo-700 to-violet-700">
            <div className="wireframe-grid absolute inset-0 opacity-20"></div>
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10 pointer-events-none" 
              style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}
            ></div>
          </div>

          <div className="relative z-10 max-w-[1100px] mx-auto text-center text-white">
            <div className="mb-12 flex flex-col items-center">
              <label className="inline-flex items-center cursor-pointer group">
                <span className={`mr-4 text-sm font-bold uppercase tracking-widest transition-colors ${!isMarketingImpact ? 'text-white' : 'text-blue-200'}`}>
                  Standard Operations
                </span>
                <div className="relative" onClick={() => setIsMarketingImpact(!isMarketingImpact)}>
                  <div className={`w-16 h-8 rounded-full transition-all shadow-inner ${isMarketingImpact ? 'bg-blue-500' : 'bg-white/20'}`}>
                    <motion.div 
                      className="absolute top-1 left-1 bg-white rounded-full h-6 w-6 border border-gray-300 shadow-sm"
                      animate={{ x: isMarketingImpact ? 32 : 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </div>
                </div>
                <span className={`ml-4 text-sm font-bold uppercase tracking-widest transition-colors ${isMarketingImpact ? 'text-white' : 'text-blue-200'}`}>
                  Marketing Impact
                </span>
              </label>
              
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/20">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                <span className="text-xs font-semibold">Toggle to see Marketing Impact</span>
              </div>
            </div>

            <div className="mb-12">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-black mb-6 tracking-tighter"
              >
                Powering the Discrete <br className="hidden md:block"/> Manufacturing Lifecycle
              </motion.h1>
              <p className="max-w-2xl mx-auto text-lg text-blue-100/80 font-normal">
                Experience precision marketing for high-tech manufacturing. Our CAD/CAM integrated strategies drive measurable results across the entire production chain.
              </p>
            </div>

            <div className="relative mb-20 bg-white/5 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/10 shadow-2xl overflow-hidden">
              <AnimatePresence>
                {isMarketingImpact && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8, x: 50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: 50 }}
                    className="absolute -top-4 -right-4 z-20"
                  >
                    <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-2 rounded-lg font-bold shadow-xl border border-white/20 flex items-center gap-2">
                      <BadgeCheck className="w-4 h-4" />
                      MARKET READY
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-col md:flex-row items-center justify-between relative gap-8 md:gap-0">
                <div className="hidden md:block absolute top-[44px] left-[10%] right-[10%] h-[2px] bg-white/20">
                  <motion.div 
                    className="absolute top-0 left-0 h-full bg-blue-400 shadow-[0_0_10px_#60a5fa]"
                    initial={{ width: "50%" }}
                    animate={{ width: isMarketingImpact ? "100%" : "50%" }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  />
                </div>

                {[
                  { icon: <Package className="w-8 h-8" />, label: 'Design', sub: 'Conceptualization', active: true },
                  { icon: <Layers className="w-8 h-8" />, label: 'Prototype', sub: 'Rapid Iteration' },
                  { icon: <BarChart3 className="w-8 h-8" />, label: 'Production', sub: 'Scaling' },
                  { icon: <CheckCircle2 className="w-8 h-8" />, label: 'Quality', sub: 'Zero-Defect' },
                  { icon: <Truck className="w-8 h-8" />, label: 'Delivery', sub: 'Logistics' }
                ].map((step, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-4 z-10 group cursor-pointer">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${idx === 0 ? 'bg-primary ring-4 ring-white/10 shadow-lg' : 'bg-white/10 border border-white/20 backdrop-blur-md group-hover:bg-white/20'} group-hover:scale-110`}>
                      {step.icon}
                    </div>
                    <div className="text-center">
                      <p className={`font-bold text-lg ${idx === 0 ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`}>{step.label}</p>
                      <p className={`text-xs ${idx === 0 ? 'text-blue-200' : 'text-blue-200/60 group-hover:text-blue-200'}`}>{step.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Defect Rate */}
                <motion.div 
                  animate={{ borderColor: isMarketingImpact ? "rgba(147, 197, 253, 0.4)" : "rgba(255,255,255,0.1)" }}
                  className={`bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-xl text-left transition-all duration-500 ${isMarketingImpact ? 'shadow-[0_0_20px_rgba(96,165,250,0.3)]' : ''}`}
                >
                  <p className="text-sm text-blue-200 mb-1 font-medium">Defect Rate</p>
                  <div className="h-10 relative">
                    {!isMarketingImpact ? (
                      <div className="flex items-end gap-2">
                        <p className="text-3xl font-bold">1.8%</p>
                        <p className="text-xs text-red-400 mb-1">+0.4% baseline</p>
                      </div>
                    ) : (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-end gap-2">
                        <p className="text-3xl font-bold text-blue-200">0.2%</p>
                        <p className="text-xs text-green-400 mb-1">-1.6% (Optimized)</p>
                      </motion.div>
                    )}
                  </div>
                </motion.div>

                {/* Yield */}
                <motion.div 
                   animate={{ borderColor: isMarketingImpact ? "rgba(147, 197, 253, 0.4)" : "rgba(255,255,255,0.1)" }}
                   className={`bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-xl text-left transition-all duration-500 ${isMarketingImpact ? 'shadow-[0_0_20px_rgba(96,165,250,0.3)]' : ''}`}
                >
                  <p className="text-sm text-blue-200 mb-1 font-medium">Yield</p>
                  <div className="h-10 relative">
                    {!isMarketingImpact ? (
                      <div className="flex items-end gap-2">
                        <p className="text-3xl font-bold">84.2%</p>
                        <p className="text-xs text-yellow-400 mb-1">Standard Output</p>
                      </div>
                    ) : (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-end gap-2">
                        <p className="text-3xl font-bold text-blue-200">99.8%</p>
                        <p className="text-xs text-green-400 mb-1">+15.6% Growth</p>
                      </motion.div>
                    )}
                  </div>
                </motion.div>

                {/* Throughput Efficiency */}
                <motion.div 
                   animate={{ borderColor: isMarketingImpact ? "rgba(147, 197, 253, 0.4)" : "rgba(255,255,255,0.1)" }}
                   className={`bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-xl text-left lg:col-span-2 transition-all duration-500 ${isMarketingImpact ? 'shadow-[0_0_20px_rgba(96,165,250,0.3)]' : ''}`}
                >
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-sm text-blue-200 font-medium">Throughput Efficiency</p>
                    <AnimatePresence mode="wait">
                      {!isMarketingImpact ? (
                        <motion.p key="std" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xl font-bold">69%</motion.p>
                      ) : (
                        <motion.p key="impact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xl font-bold text-blue-200">94% (+25% Gain)</motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full transition-all duration-700 ${isMarketingImpact ? 'bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.6)]' : 'bg-blue-500/40'}`}
                      initial={{ width: "69%" }}
                      animate={{ width: isMarketingImpact ? "94%" : "69%" }}
                    />
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto px-10 py-4 bg-primary text-white rounded-lg font-bold text-lg hover:brightness-110 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2">
                <Zap className="w-5 h-5" /> Optimize Your Production Line
              </button>
              <button className="w-full sm:w-auto px-10 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-lg font-bold text-lg hover:bg-white/20 transition-all">
                View Case Studies
              </button>
            </div>
          </div>
        </section>

        {/* Precision Metrics Details Section */}
        <section className="max-w-[1200px] mx-auto px-6 py-20">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <h3 className="text-3xl font-bold text-[#121118] dark:text-white">Precision Metrics for Modern Manufacturing</h3>
              <p className="text-[#686189] dark:text-gray-400 leading-relaxed">
                We don't just market products; we understand the engineering behind them. Our dashboard integration allows your sales team to showcase real-time efficiency and quality metrics directly to prospective clients.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="p-6 rounded-xl border border-[#dddbe6] dark:border-white/10 bg-white dark:bg-white/5">
                  <TrendingUp className="text-primary mb-2 w-8 h-8" />
                  <p className="text-2xl font-bold text-[#121118] dark:text-white">98%</p>
                  <p className="text-sm text-[#686189] dark:text-gray-400">Efficiency Boost</p>
                </div>
                <div className="p-6 rounded-xl border border-[#dddbe6] dark:border-white/10 bg-white dark:bg-white/5">
                  <Settings className="text-primary mb-2 w-8 h-8" />
                  <p className="text-2xl font-bold text-[#121118] dark:text-white">2.4x</p>
                  <p className="text-sm text-[#686189] dark:text-gray-400">ROI Scalability</p>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full">
              <div className="bg-white dark:bg-white/5 border border-[#dddbe6] dark:border-white/10 p-8 rounded-2xl shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h4 className="font-bold text-[#121118] dark:text-white">Live Data Stream</h4>
                    <p className="text-sm text-[#686189] dark:text-gray-400">Production Hub A-4</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> LIVE
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-4 px-4 py-6">
                    <div className="flex min-w-72 flex-1 flex-col gap-2">
                      <p className="text-[#121118] dark:text-white text-base font-medium leading-normal">Operational Speed</p>
                      <p className="text-[#121118] dark:text-white tracking-light text-[32px] font-bold leading-tight truncate">
                        {liveStats.operationalSpeed}%
                      </p>
                      <div className="flex gap-1">
                        <p className="text-[#686189] dark:text-gray-400 text-base font-normal leading-normal">Weekly Performance</p>
                        <p className="text-[#078843] text-base font-medium leading-normal">+{liveStats.weeklyPerformance.toFixed(1)}%</p>
                      </div>

                      <div className="grid min-h-[140px] grid-flow-col gap-3 grid-rows-[1fr_auto] items-end justify-items-center px-3 pt-4">
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                          <React.Fragment key={idx}>
                            <motion.div 
                              className="border-primary bg-primary/10 border-t-2 w-full rounded-t-sm"
                              animate={{ height: `${liveStats.dailyHistory[idx]}%` }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                            />
                            <p className="text-[#686189] text-[11px] font-bold mt-2">{day}</p>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#f1f0f4] dark:border-white/10 py-12 px-6 bg-white dark:bg-background-dark">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <Factory className="text-primary w-6 h-6" />
            <p className="font-bold text-[#121118] dark:text-white">Mfg Agency</p>
          </div>
          <p className="text-sm text-[#686189] dark:text-gray-400">© 2024 Discrete Manufacturing Agency. All rights reserved.</p>
          <div className="flex gap-6">
            <a className="text-sm text-[#121118] dark:text-white hover:text-primary" href="#">Privacy Policy</a>
            <a className="text-sm text-[#121118] dark:text-white hover:text-primary" href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
