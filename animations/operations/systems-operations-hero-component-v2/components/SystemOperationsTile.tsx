'use client';
import React, { useState } from 'react';
// FIX: Import `Variants` type from framer-motion to correctly type animation variants.
import { motion, Variants } from 'framer-motion';
import { Spline, Zap, Database, BarChart3 } from 'lucide-react';

// FIX: Add `Variants` type annotation to fix type incompatibility with Framer Motion.
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2 + 0.5,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

// FIX: Add `Variants` type annotation to fix type incompatibility with Framer Motion.
const iconVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.15 + 0.3,
      type: 'spring',
      stiffness: 260,
      damping: 20,
    },
  }),
};

const icons = [
  { name: 'CRM', Component: Spline, position: 'top-10 left-20', linePos: 'top-[100px] left-[140px]', lineRot: 'rotate-45', lineGrad: 'bg-gradient-to-r' },
  { name: 'Zapier', Component: Zap, position: 'top-10 right-20', linePos: 'top-[100px] right-[140px]', lineRot: '-rotate-45', lineGrad: 'bg-gradient-to-l' },
  { name: 'Database', Component: Database, position: 'bottom-10 left-20', linePos: 'bottom-[100px] left-[140px]', lineRot: '-rotate-45', lineGrad: 'bg-gradient-to-r' },
  { name: 'Growth', Component: BarChart3, position: 'bottom-10 right-20', linePos: 'bottom-[100px] right-[140px]', lineRot: 'rotate-45', lineGrad: 'bg-gradient-to-l' },
];

export default function SystemOperationsTile() {
  const [activeIcon, setActiveIcon] = useState<string | null>(null);

  const handleIconClick = (iconName: string) => {
    setActiveIcon(iconName);
    setTimeout(() => {
      setActiveIcon(null);
    }, 300);
  };

  return (
    <div className="relative w-full max-w-[600px] aspect-square flex items-center justify-center">
      {/* Background Elements */}
      <div 
        className="absolute inset-0 bg-slate-950 rounded-xl overflow-hidden border border-primary/20"
        style={{
            backgroundImage: 
                'linear-gradient(to right, rgba(10, 183, 209, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(10, 183, 209, 0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-violet-900/20"></div>
      </div>

      {/* Safe Area 520x520 */}
      <div className="relative w-[520px] h-[520px] flex items-center justify-center">
        {/* Central Hub */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative z-20 flex flex-col items-center justify-center p-8 rounded-full bg-background-dark/80 border-2 border-primary/50 shadow-[0_0_30px_rgba(11,218,84,0.3)] w-80 h-80 text-center backdrop-blur-sm"
        >
          <span className="text-primary text-sm font-bold tracking-[0.2em] mb-2 uppercase">Velocity</span>
          <div className="text-white text-[72px] font-bold leading-none tracking-tighter">4.1x</div>
          <span className="text-white/60 text-sm mt-2">Operational Speed</span>
          {/* Internal Efficiency Curve SVG Overlay */}
          <div className="absolute inset-0 -z-10 opacity-20 overflow-hidden rounded-full">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <path d="M0 80 Q 25 70, 40 40 T 100 0" fill="none" stroke="#0ab7d1" strokeWidth="2"></path>
              <path d="M0 90 Q 35 80, 50 50 T 100 10" fill="none" stroke="#0ab7d1" strokeWidth="1"></path>
            </svg>
          </div>
        </motion.div>

        {/* Floating Icons & Connections */}
        {icons.map((icon, index) => (
          <React.Fragment key={icon.name}>
            <motion.div
              custom={index}
              variants={iconVariants}
              initial="hidden"
              animate={{
                y: ["-5%", "5%", "-5%"],
              }}
              transition={{
                duration: 2.5 + index * 0.4,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay: index * 0.2,
              }}
              className={`absolute ${icon.position} z-30 flex flex-col items-center gap-2 cursor-pointer`}
              onClick={() => handleIconClick(icon.name)}
            >
              <motion.div
                className="w-14 h-14 rounded-lg bg-background-dark border border-primary/30 flex items-center justify-center text-primary"
                animate={{
                  scale: activeIcon === icon.name ? 1.15 : 1,
                  boxShadow: activeIcon === icon.name
                    ? '0 0 35px rgba(10, 183, 209, 0.8)'
                    : '0 0 20px rgba(10, 183, 209, 0.4)',
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <icon.Component size={28} />
              </motion.div>
              <span className="text-white/70 text-xs font-medium">{icon.name}</span>
            </motion.div>
            <div className={`absolute ${icon.linePos} w-24 h-[1px] ${icon.lineGrad} from-primary to-transparent ${icon.lineRot}`}></div>
          </React.Fragment>
        ))}

        {/* Floating Metrics Cards */}
        <motion.div custom={0} variants={cardVariants} initial="hidden" animate="visible" className="absolute top-1/4 -right-12 z-40 p-4 rounded-xl bg-background-dark/60 border border-white/10 backdrop-blur-md shadow-[0_0_20px_rgba(10,183,209,0.4)] min-w-[160px]">
          <p className="text-white/50 text-[10px] uppercase tracking-widest font-bold">Manual Work</p>
          <p className="text-white text-2xl font-bold">-65%</p>
          <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
            <motion.div 
              initial={{ width: '0%' }}
              animate={{ width: '66.66%' }}
              transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
              className="h-full bg-[#fa5c38]"
            ></motion.div>
          </div>
        </motion.div>

        <motion.div custom={1} variants={cardVariants} initial="hidden" animate="visible" className="absolute bottom-1/4 -left-12 z-40 p-4 rounded-xl bg-background-dark/60 border border-white/10 backdrop-blur-md shadow-[0_0_20px_rgba(10,183,209,0.4)] min-w-[160px]">
          <p className="text-white/50 text-[10px] uppercase tracking-widest font-bold">Data Accuracy</p>
          <p className="text-white text-2xl font-bold">99.9%</p>
          <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
            <motion.div 
              initial={{ width: '0%' }}
              animate={{ width: '99%' }}
              transition={{ duration: 1, delay: 1, ease: 'easeOut' }}
              className="h-full bg-[#0bda54]"
            ></motion.div>
          </div>
        </motion.div>

        {/* Outer Efficiency Curves */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full border border-white/5">
          <svg className="absolute bottom-0 left-0 w-full h-full opacity-30" viewBox="0 0 520 520">
            <path d="M0 520 C 150 400, 350 300, 520 0" fill="none" stroke="url(#neon-grad)" strokeWidth="4"></path>
            <defs>
              <linearGradient id="neon-grad" x1="0%" x2="100%" y1="100%" y2="0%">
                <stop offset="0%" style={{stopColor: '#0ab7d1', stopOpacity: 0}}></stop>
                <stop offset="50%" style={{stopColor: '#0ab7d1', stopOpacity: 1}}></stop>
                <stop offset="100%" style={{stopColor: '#8b5cf6', stopOpacity: 1}}></stop>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}