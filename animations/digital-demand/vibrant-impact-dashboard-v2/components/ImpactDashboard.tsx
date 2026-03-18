'use client';
import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { 
  Activity, 
  Search, 
  LogIn, 
  Eye, 
  MousePointerClick, 
  Heart, 
  RefreshCw, 
  Medal, 
  Rocket, 
  Users, 
  TrendingUp, 
  Globe, 
  Banknote, 
  Globe2, 
  Download, 
  ShieldCheck 
} from 'lucide-react';

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const barVariants: Variants = {
  hidden: { height: "0%" },
  visible: (customHeight: string) => ({ 
    height: customHeight, 
    transition: { duration: 1.2, ease: "easeOut" } 
  })
};

export default function ImpactDashboard() {
  const [activeTab, setActiveTab] = useState('Quarterly');
  const [counts, setCounts] = useState({ lives: 0, reach: 0, funds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts(prev => ({
        lives: Math.min(prev.lives + 0.1, 1.2),
        reach: Math.min(prev.reach + 5, 450),
        funds: Math.min(prev.funds + 0.1, 8.4)
      }));
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`h-full flex flex-col font-['Inter'] text-slate-200 bg-[#0F172A] antialiased selection:bg-fuchsia-500 selection:text-white`}>
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-900/50 backdrop-blur-xl px-4 py-3 flex-shrink-0">
        <div className="w-full flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-fuchsia-500 to-amber-400 p-1.5 rounded-lg">
              <Activity className="text-white size-5" />
            </div>
            <h2 className="text-lg font-bold tracking-tight hidden sm:block text-slate-100">Vibrant Impact</h2>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-gradient-to-tr from-fuchsia-500 to-amber-400 hover:opacity-90 text-white px-3 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2">
              <LogIn className="size-4" />
            </button>
            <div 
              className="w-10 h-10 rounded-full bg-cover bg-center border-2 border-fuchsia-500/50 flex-shrink-0" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBljKrclGVM9YeVPWhKN71u5X-ec84TUUQef6fnfHA_hLlS0gf8WKzKtQyAyxyFtPksYQIttFE09e6Kgp6ylYPiyQKEIxVuJTPv_mtRDRf5PanlT8HJHiadpvSWz4N9EIUVyPZMfHbsVhWALvNY5UTbPABytrkLkRbEUTJgtiPgYy7_GfZtAwljC7MG51PebbOX_Ph9_yA9ypKX0JiKrRhq6d17WR4_3HakpMwB5-ISSwnYtUVMiVzKoNC3AHVwBNqo2nIzyDsyGxHA')" }}
            ></div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row w-full p-3 gap-3 overflow-y-auto">
        {/* Main Content: Data Visualization Area */}
        <section className="flex-1 flex flex-col gap-3 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-100">Impact Dashboard</h1>
              <p className="text-slate-400 text-sm mt-1">Real-time engagement metrics.</p>
            </div>
            <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/10 shadow-sm self-start sm:self-auto">
              {['Monthly', 'Quarterly', 'Yearly'].map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === tab ? 'bg-gradient-to-tr from-fuchsia-500 to-amber-400 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
                >{tab}</button>
              ))}
            </div>
          </div>

          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { label: "Lives Impacted", value: counts.lives.toFixed(1) + 'M', change: "+12%", icon: Users },
              { label: "Community Reach", value: Math.floor(counts.reach) + 'K', change: "+5%", icon: Globe },
              { label: "Funds Raised", value: '$' + counts.funds.toFixed(1) + 'M', change: "+18%", icon: Banknote },
            ].map(item => (
              <motion.div key={item.label} variants={itemVariants} className="bg-white/5 backdrop-blur-xl p-3 rounded-2xl border border-white/10 flex flex-col gap-2 flex-shrink">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm font-medium">{item.label}</span>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-fuchsia-500 to-amber-400 flex items-center justify-center text-white shadow-[0_0_15px_rgba(217,70,239,0.4)]">
                    <item.icon className="size-5" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-100">{item.value}</span>
                  <span className="text-emerald-400 text-xs font-bold flex items-center"><TrendingUp className="w-3 h-3 mr-1" />{item.change}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-3 border border-white/10 flex-1 relative flex flex-col min-h-[240px] flex-shrink"
          >
            <div className="flex flex-col sm:flex-row items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-100">Impact Indicators</h3>
                <p className="text-sm text-slate-400">Global growth overview</p>
              </div>
            </div>

            <div className="flex-1 flex items-end justify-between gap-2 sm:gap-3 px-1 sm:px-2 pb-2">
              {[
                { m: "J", h: "62%", from: "from-fuchsia-600", to: "to-fuchsia-400" },
                { m: "F", h: "45%", from: "from-fuchsia-500", to: "to-purple-500" },
                { m: "M", h: "88%", from: "from-purple-500", to: "to-indigo-500" },
                { m: "A", h: "74%", from: "from-indigo-500", to: "to-sky-500" },
                { m: "M", h: "95%", from: "from-sky-500", to: "to-teal-400", active: true },
                { m: "J", h: "100%", from: "from-teal-400", to: "to-amber-400" },
              ].map((bar) => (
                <div key={bar.m + bar.h} className="flex flex-col items-center gap-2 flex-1">
                  <div className="w-full max-w-[30px] relative group h-32 flex items-end">
                    <motion.div 
                      custom={bar.h} variants={barVariants} initial="hidden" animate="visible"
                      className={`w-full bg-gradient-to-t ${bar.from} ${bar.to} rounded-t-full shadow-lg`}
                    ></motion.div>
                  </div>
                  <span className={`text-[10px] font-bold ${bar.active ? 'text-amber-400' : 'text-slate-400'}`}>{bar.m}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="flex items-center justify-between gap-3 py-2 px-1">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-3">
                <div className="w-8 h-8 rounded-full border-2 border-[#0F172A] bg-cover flex-shrink-0" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB7M8mJihN7hnhW-0J2B-2-3IiYG4_iFL56SY0KQ5Zh8R2E68HfE4lwIyG3hPh9e6U5Img8OihRmuOoHKlz6w9H1egs7mrWnMSGkWRopSHhtDRHmb-UAPVUqoDhwoLtudCss4KmNHo8tnODU2DlZWcMapnf6clVzWE4pLgIDWi2UGg15jqG6WRxobCPMLkylP9Xv4SqkpMpasxgRJ9cXZaHn0I_AuZTL5eH651n6O3dOe8kRAb0QOyHetY5P9_rukgGJKDhLcV6jJjk')" }}></div>
                <div className="w-8 h-8 rounded-full border-2 border-[#0F172A] bg-cover flex-shrink-0" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCosEd-JI88OgCI8CpLzEhbdl22X90mQXdsnjol7cDBlrBYXfydlTiAKIVee8GfJFx9cPqWEK4uDBBSExxR_cSj8TaaR_Cy0c1pslR-9QQRw8yreK161WLVWa9Z_VAG0TUMCLIfMvPM1vurP38MLwwatGvnic-eTqnfUfsa1ORDyw4zQPZOStkBoi7lWB9gtM1vwl-gOeFjHpe_kIqrkNVPJR6bO-tP98loC_OGTnLA96GztuQSWr8lXueVhFapos0wJH3ACqz9ru-z')" }}></div>
                <div className="w-8 h-8 rounded-full border-2 border-[#0F172A] bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-300 flex-shrink-0">+1k</div>
              </div>
              <p className="text-xs text-slate-400 font-medium hidden sm:block">Active Volunteers</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl text-sm font-bold transition-all border border-white/10">
              <Download className="size-4" />
              <span className="hidden sm:inline">Export Report</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}