import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Eye, 
  ShoppingCart, 
  Heart
} from 'lucide-react';

// --- Confetti Sub-Components ---
const ConfettiParticle = ({ index }: { index: number }) => {
  const colors = ['#FF006E', '#3A0CA3', '#FFFFFF', '#4CC9F0'];
  const color = colors[index % colors.length];
  
  // Random physics calculations
  const angle = Math.random() * 360;
  const distance = 60 + Math.random() * 140; 
  const size = 4 + Math.random() * 4;
  
  return (
    <motion.div
      initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
      animate={{ 
        x: Math.cos(angle * Math.PI / 180) * distance, 
        y: Math.sin(angle * Math.PI / 180) * distance,
        opacity: [1, 1, 0],
        scale: [0, 1.4, 0],
        rotate: Math.random() * 720
      }}
      transition={{ 
        duration: 1.2 + Math.random() * 0.8, 
        ease: "easeOut" 
      }}
      style={{
        position: 'absolute',
        top: '50%', 
        left: '50%',
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: Math.random() > 0.5 ? '50%' : '2px', // Mix circles/squares
        zIndex: 20, 
        pointerEvents: 'none'
      }}
    />
  );
};

const ConfettiSystem = () => {
  // Render a fixed number of particles for the burst
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2.5rem] z-20">
      {Array.from({ length: 35 }).map((_, i) => (
        <ConfettiParticle key={i} index={i} />
      ))}
    </div>
  );
};

// --- Main Component ---
export default function SalesEnablementTile() {
  // Simulating organic "live" data jitter
  const [stats, setStats] = useState({
    visits: 24500,
    conversion: 12.4,
    customers: 4200,
    revenue: 128,
    revenueGrowth: 14,
    aov: 42.50
  });

  // Unique key to force re-render of confetti burst on stat change
  const [confettiTrigger, setConfettiTrigger] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        visits: prev.visits + Math.floor(Math.random() * 10) - 2,
        conversion: +(prev.conversion + (Math.random() * 0.2 - 0.1)).toFixed(1),
        customers: prev.customers + Math.floor(Math.random() * 2),
        revenue: prev.revenue, // Keep stable
        revenueGrowth: prev.revenueGrowth,
        aov: prev.aov
      }));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Trigger confetti when key metrics update
  useEffect(() => {
    setConfettiTrigger(prev => prev + 1);
  }, [stats.visits, stats.conversion, stats.customers]);

  // Format numbers
  const formatK = (num: number) => (num / 1000).toFixed(1) + 'k';

  // Animation variants
  const floatVariant = (delay: number) => ({
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const,
        delay: delay,
      }
    }
  });

  const pulseVariant = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  return (
    <div className="relative w-full aspect-square max-w-[600px] mx-auto font-sans">
      {/* Container Frame */}
      <div className="absolute inset-0 rounded-[2.5rem] bg-gray-50 border border-gray-100 overflow-hidden shadow-[0_10px_30px_-10px_rgba(58,12,163,0.1)]">
        
        {/* Confetti Layer - Re-renders on trigger */}
        <ConfettiSystem key={confettiTrigger} />

        {/* Background Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(#3A0CA3 0.5px, transparent 0.5px)',
            backgroundSize: '24px 24px'
          }}
        />

        {/* Background Graph SVG */}
        <div className="absolute inset-0 flex items-end">
          <svg className="w-full h-full opacity-20" fill="none" viewBox="0 0 500 500">
            <motion.path 
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              d="M0 450C50 440 100 400 150 380C200 360 250 320 300 250C350 180 400 100 500 20" 
              stroke="#FF006E" 
              strokeLinecap="round" 
              strokeWidth="12" 
            />
          </svg>
        </div>

        {/* Main Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 z-10">
          
          {/* Central Circle */}
          <motion.div 
            className="relative mb-14 rounded-full p-1.5 shadow-[0_10px_25px_-5px_rgba(255,0,110,0.3)]"
            style={{ background: 'linear-gradient(135deg, #FF006E 0%, #3A0CA3 100%)' }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-full p-10 flex flex-col items-center justify-center w-48 h-48">
              <TrendingUp className="w-12 h-12 text-[#FF006E] mb-2" strokeWidth={3} />
              <div className="text-4xl font-black text-[#3A0CA3] leading-none">84.2%</div>
              <div className="text-[11px] uppercase font-bold tracking-widest text-[#3A0CA3]/40 mt-1">Growth Index</div>
            </div>

            {/* Avatar Top Right */}
            <motion.div 
              className="absolute -top-4 -right-4 w-14 h-14 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-200"
              {...floatVariant(0)}
            >
              <img 
                alt="Active shopper" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYOp3jI4UhBOb5eYJc9ATBIENcX0MlUPs5hVOIPRZyQMiJkCW-8WS3JNjhmukk60FDWV8V34g2UOtGyzpjRwbKyGoBzG0TiBUIjq0PR3SjskOGBWltasPqAmnAky4HqVz0CwijAznvioMD0bOjyG6QqhOPrdGgVq2mud4HB0OVxbFDCvE-xd5jgonq6pSyFnTucnPDweSvZHf08U4ODkCjCX2XKA8qhZX2rJZdgZayRHbhuAX6bE7Xch6F2iy-UszfEiAgup_KrJU" 
              />
            </motion.div>

            {/* Avatar Left Middle */}
            <motion.div 
              className="absolute top-1/2 -left-10 w-12 h-12 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-200"
              {...floatVariant(1.5)}
            >
              <img 
                alt="Loyalty member" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDa5IniuYoccU36Z3IbVKhABT1ey-b4JkyhZUQBQnWOeHgnoLbsdzsvjlEP36x5wOxy-PLx7WLg2Icl7TuWl057a5VRye0xzHLIC9BGUeDK4YQqBLlsFnZK_ZZLLYgrxuBBYmaXk63MxEIV7SwxFMn8UrZ8ciHDbMWMpaEDTXla-xwxksu3KFMtc-0U-9fcPfrzwMl9AWoayqY3jV_tXJRyNQA7ixP7Vo9epLghuWhnfkO7DTqGEL17gG7fas5Nmrt3jtGkU2DIfLY" 
              />
            </motion.div>
          </motion.div>

          {/* Bottom Cards List */}
          <div className="w-full flex flex-col items-center gap-4">
            
            {/* Store Visits Card */}
            <motion.div 
              className="w-[85%] h-14 rounded-2xl bg-white border border-[#3A0CA3]/5 shadow-sm flex items-center justify-between px-6 relative overflow-hidden"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="absolute inset-y-0 left-0 bg-[#FF006E]/5 w-1/3" />
              <span className="text-xs font-black text-[#3A0CA3] flex items-center gap-2 relative z-10">
                <Eye className="w-5 h-5 text-[#FF006E]" /> 
                STORE VISITS
              </span>
              <span className="text-lg font-black text-[#3A0CA3] relative z-10">{formatK(stats.visits)}</span>
            </motion.div>

            {/* Conversion Card */}
            <motion.div 
              className="w-[65%] h-14 rounded-2xl bg-white border border-[#3A0CA3]/5 shadow-sm flex items-center justify-between px-6 relative overflow-hidden"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="absolute inset-y-0 left-0 bg-[#3A0CA3]/5 w-1/2" />
              <span className="text-xs font-black text-[#3A0CA3] flex items-center gap-2 relative z-10">
                <ShoppingCart className="w-5 h-5 text-[#3A0CA3]" /> 
                CONVERSION
              </span>
              <span className="text-lg font-black text-[#FF006E] relative z-10">+{stats.conversion}%</span>
            </motion.div>

            {/* Repeat Customers Card */}
            <motion.div 
              className="w-[45%] h-14 rounded-2xl bg-white border border-[#3A0CA3]/5 shadow-sm flex items-center justify-between px-6 relative overflow-hidden"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="absolute inset-y-0 left-0 bg-[#FF006E]/5 w-3/4" />
              <span className="text-xs font-black text-[#3A0CA3] flex items-center gap-2 relative z-10">
                <Heart className="w-5 h-5 text-[#FF006E]" /> 
                REPEAT
              </span>
              <span className="text-lg font-black text-[#3A0CA3] relative z-10">{formatK(stats.customers)}</span>
            </motion.div>

          </div>
        </div>

        {/* Floating Widget: Top Left */}
        <motion.div 
          className="absolute top-10 left-10 p-5 rounded-2xl bg-white border border-[#3A0CA3]/5 shadow-[0_10px_30px_-10px_rgba(58,12,163,0.1)] z-20"
          {...floatVariant(0.5)}
        >
          <div className="flex flex-col gap-1">
            <div className="text-[10px] font-bold text-[#3A0CA3]/40 uppercase tracking-wider">Daily Revenue</div>
            <div className="text-2xl font-black text-[#3A0CA3] tracking-tight flex items-center gap-3">
              ${stats.revenue}k
              <span className="text-xs font-black text-white bg-[#FF006E] px-2 py-1 rounded-lg flex items-center">
                +{stats.revenueGrowth}%
              </span>
            </div>
          </div>
        </motion.div>

        {/* Floating Widget: Bottom Right */}
        <motion.div 
          className="absolute bottom-16 right-10 p-5 rounded-2xl bg-[#3A0CA3] border border-[#3A0CA3]/10 shadow-2xl z-20"
          {...floatVariant(2)}
        >
          <div className="flex flex-col gap-1">
            <div className="text-[10px] font-bold text-white/50 uppercase tracking-wider">AOV Boost</div>
            <div className="text-2xl font-black text-[#FF006E] tracking-tight flex items-center">
               +${stats.aov.toFixed(2)}
            </div>
          </div>
        </motion.div>

      </div>

      {/* Glow Effects */}
      <motion.div 
        className="absolute -top-10 -left-10 w-48 h-48 bg-[#FF006E]/10 blur-[80px] rounded-full -z-10"
        {...pulseVariant}
      />
      <motion.div 
        className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#3A0CA3]/10 blur-[80px] rounded-full -z-10" 
        {...pulseVariant}
      />
    </div>
  );
}