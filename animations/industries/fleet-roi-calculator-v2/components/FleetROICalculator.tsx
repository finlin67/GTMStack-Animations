'use client';

// FILE: FleetROICalculator.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, animate } from 'framer-motion';
import { 
  Calculator, 
  Fuel, 
  Wrench, 
  TrendingUp, 
  Clock, 
  Download, 
  ArrowRight, 
  X 
} from 'lucide-react';

export default function FleetROICalculator() {
  // ---------------------------------------------------------------------------
  // State & Logic
  // ---------------------------------------------------------------------------
  const [fleetSize, setFleetSize] = useState(124);
  const [fuelCost, setFuelCost] = useState(3.85);
  const [maintenance, setMaintenance] = useState(12500);
  const [savings, setSavings] = useState(248500);

  // Ref for the animated counter
  const savingsDisplayRef = useRef<HTMLSpanElement>(null);
  
  // Recalculate savings whenever inputs change
  useEffect(() => {
    // Arbitrary formula to simulate business logic:
    // Base savings + Fuel savings (sensitive to cost) + Maint savings
    const baseSavingsPerUnit = 1500;
    const fuelSavingsFactor = fuelCost * 100; // Simplified factor
    const maintSavingsFactor = maintenance * 0.5; // Simplified factor
    
    const calculatedSavings = Math.round(
      (fleetSize * baseSavingsPerUnit) + 
      (fleetSize * fuelSavingsFactor) + 
      (maintSavingsFactor)
    );
    
    setSavings(calculatedSavings);
  }, [fleetSize, fuelCost, maintenance]);

  // Animate the savings number smoothly
  useEffect(() => {
    const node = savingsDisplayRef.current;
    if (!node) return;

    // Read current value from DOM to animate from it
    const fromValue = parseInt(node.textContent?.replace(/[^0-9]/g, '') || "0");
    
    const controls = animate(fromValue, savings, {
      duration: 0.8,
      onUpdate: (value) => {
        node.textContent = `$${Math.round(value).toLocaleString()}`;
      },
      ease: "circOut"
    });

    return () => controls.stop();
  }, [savings]);

  // ---------------------------------------------------------------------------
  // Render Helpers
  // ---------------------------------------------------------------------------
  const sliderPercentage = (fleetSize / 500) * 100;

  return (
    // ROOT CONTAINER: Enforces the Hero Tile constraints (square aspect, centered, dark bg)
    <div className="w-full h-full aspect-square flex items-center justify-center bg-slate-900 p-4 font-sans text-slate-100">
      
      {/* COMPONENT CONTAINER: Constrained to 600x600 max, responsive */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full h-full max-w-[600px] max-h-[600px] rounded-xl overflow-hidden shadow-2xl flex flex-col sm:flex-row border border-white/10"
        style={{
          background: 'rgba(26, 36, 30, 0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* --- LEFT COLUMN: INPUTS --- */}
        <div className="w-full sm:w-5/12 p-5 border-b sm:border-b-0 sm:border-r border-white/5 bg-black/30 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
          <div className="flex items-center gap-2 shrink-0">
            <Calculator className="text-[#B8860B]" size={24} />
            <h2 className="text-white text-lg font-bold leading-tight tracking-tight">ROI Calculator</h2>
          </div>

          <div className="flex flex-col gap-5">
            {/* Slider Section */}
            <div className="@container">
              <div className="relative flex w-full flex-col items-start justify-between gap-2">
                <div className="flex w-full shrink-[3] items-center justify-between">
                  <p className="text-white/80 text-sm font-medium leading-normal">Fleet Size</p>
                  <p className="text-[#B8860B] text-base font-bold leading-normal">{fleetSize}</p>
                </div>
                
                {/* Custom Range Slider */}
                <div className="relative h-5 w-full flex items-center">
                   <input 
                    type="range" 
                    min="1" 
                    max="500" 
                    value={fleetSize}
                    onChange={(e) => setFleetSize(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-pointer"
                    aria-label="Fleet Size Slider"
                  />
                  <div className="flex h-1.5 flex-1 rounded-full bg-white/10 overflow-hidden relative">
                    <motion.div 
                      className="h-full rounded-full bg-[#B8860B]"
                      style={{ width: `${sliderPercentage}%` }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  </div>
                  <motion.div 
                    className="absolute h-4 w-4 rounded-full bg-white border-2 border-[#B8860B] shadow-lg pointer-events-none z-10"
                    style={{ left: `calc(${sliderPercentage}% - 8px)` }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                </div>
                <div className="flex justify-between w-full text-[9px] text-white/40 uppercase tracking-widest font-bold">
                  <span>1</span>
                  <span>500</span>
                </div>
              </div>
            </div>

            {/* Fuel Cost Input */}
            <div className="flex flex-col gap-1">
              <label className="flex flex-col w-full group cursor-pointer">
                <p className="text-white/80 text-sm font-medium pb-1">Avg Fuel Cost ($/gal)</p>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
                    <Fuel size={16} />
                  </span>
                  <input 
                    type="number"
                    step="0.01"
                    className="flex w-full rounded-md text-white focus:outline-0 focus:ring-1 focus:ring-[#B8860B]/50 border border-white/10 bg-white/5 focus:border-[#B8860B] h-10 placeholder:text-white/20 pl-9 pr-3 text-sm font-normal transition-all" 
                    value={fuelCost}
                    onChange={(e) => setFuelCost(parseFloat(e.target.value) || 0)}
                  />
                </div>
              </label>
            </div>

            {/* Maintenance Spend Input */}
            <div className="flex flex-col gap-1">
              <label className="flex flex-col w-full group cursor-pointer">
                <p className="text-white/80 text-sm font-medium pb-1">Monthly Maint. ($)</p>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
                    <Wrench size={16} />
                  </span>
                  <input 
                    type="text"
                    className="flex w-full rounded-md text-white focus:outline-0 focus:ring-1 focus:ring-[#B8860B]/50 border border-white/10 bg-white/5 focus:border-[#B8860B] h-10 placeholder:text-white/20 pl-9 pr-3 text-sm font-normal transition-all" 
                    value={maintenance}
                    onChange={(e) => setMaintenance(parseInt(e.target.value.replace(/,/g, '')) || 0)}
                  />
                </div>
              </label>
            </div>

            {/* Pro Tip Box - Visible on larger layouts */}
            <div className="p-3 rounded-lg bg-[#B8860B]/10 border border-[#B8860B]/20 hidden sm:block">
              <p className="text-[#B8860B]/90 text-xs leading-relaxed">
                <span className="font-bold">Tip:</span> Route optimization could reduce fuel spend by 18%.
              </p>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: RESULTS --- */}
        <div className="w-full sm:w-7/12 p-5 flex flex-col bg-gradient-to-br from-[#1a241e] to-[#4a443d] overflow-hidden relative">
          <div className="flex-1 flex flex-col relative z-10">
            <p className="text-[#B8860B] font-bold tracking-[0.2em] uppercase text-[10px] mb-1">Projected Results</p>
            <h1 className="text-white tracking-tight text-3xl font-bold leading-none mb-1">
              <span ref={savingsDisplayRef} className="text-[#B8860B]">
                ${savings.toLocaleString()}
              </span>
            </h1>
            <p className="text-white/60 text-sm mb-6">Annual Potential Savings</p>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {/* Stat Card 1 */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="p-3 rounded-lg border border-white/5 bg-black/10"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/70 text-xs font-medium">Efficiency</span>
                  <TrendingUp className="text-green-400" size={14} />
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '72%' }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full bg-green-500/80" 
                  />
                </div>
                <p className="mt-1 text-white font-bold text-sm">+14%</p>
              </motion.div>

              {/* Stat Card 2 */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="p-3 rounded-lg border border-white/5 bg-black/10"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/70 text-xs font-medium">Uptime</span>
                  <Clock className="text-[#E47A5F]" size={14} />
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                   <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '88%' }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="h-full bg-[#E47A5F]" 
                  />
                </div>
                <p className="mt-1 text-white font-bold text-sm">+22%</p>
              </motion.div>
            </div>

            {/* Visual Chart Area */}
            <div className="relative w-full h-24 rounded-lg overflow-hidden mb-4 border border-white/5 shrink-0">
              <div className="absolute inset-0 bg-gradient-to-r from-[#B8860B]/20 to-transparent z-10"></div>
              <img 
                alt="Abstract warehouse visualization" 
                className="w-full h-full object-cover mix-blend-overlay opacity-50" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYcOv1q3oJHwCrs-RSyFnOQc8AAynSkbB4SOjPegbXBI63ZEZZDugjJjvgRgagvdvEgIqt7_lsqYol5bbKrMMjwHT2BqMjBenZn7-WkFNMBsm1ZnlUI7MCmU8M8l2e-ByBSAvvAMnDz3hZN_c6jgo76ggMgXjm3ihQcfyXIOqekyTzWpZeyC_tVNgPFDNA-kMiZ-n5E0ZuCvhrfhskuJN0cO25vmGXs0-Va-yhHLSiajP96jBWO_5CxFcLOYU1a-tvqB6CwvJlukh1" 
              />
              {/* Animated Chart Bars */}
              <div className="absolute bottom-3 left-3 z-20 flex gap-1 items-end">
                {[6, 10, 14, 20, 16, 12].map((height, i) => {
                  const isPrimary = i < 4;
                  const targetOpacity = isPrimary ? (i + 1) * 0.2 + 0.2 : 1;
                  return (
                    <motion.div
                      key={i}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: height * 3, opacity: targetOpacity }}
                      transition={{ 
                        duration: 0.8,
                        ease: "easeOut",
                        delay: 0.4 + (i * 0.1) 
                      }}
                      className={`w-1.5 rounded-t-[1px] ${isPrimary ? 'bg-[#B8860B]' : 'bg-white/20'}`}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-auto flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10 relative z-10">
            <button className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold py-3 rounded-md transition-all border border-white/10 group">
              <Download size={16} className="group-hover:scale-110 transition-transform" />
              Report
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-[#B8860B] hover:bg-[#B8860B]/90 text-white text-xs font-bold py-3 rounded-md shadow-lg shadow-[#B8860B]/20 transition-all group">
              Call
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Decorative Close Button (Visual only in this context) */}
        <button className="absolute top-3 right-3 text-white/40 hover:text-white transition-colors z-20">
          <X size={20} />
        </button>
      </motion.div>
    </div>
  );
}