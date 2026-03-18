'use client';

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import {
  Network,
  ShieldCheck,
  TrendingUp,
  Wallet,
  CheckCircle2,
} from "lucide-react";

// Color constants to ensure isolation without external Tailwind config dependence
const COLORS = {
  primary: "#0b8aad",
  emerald: "#10b981",
  blue: "#60a5fa",
  dark: "#020617",
  slate900: "#0f172a",
};

export default function FinServTile() {
  return (
    <div className="relative w-full h-full max-w-[600px] max-h-[600px] aspect-square mx-auto perspective-1000">
      {/* Container for the entire interactive scene */}
      <div className="relative w-full h-full">
        
        {/* Center Hub & Orbit Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <div className="relative flex items-center justify-center">
            {/* Outer Ring */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="absolute size-[300px] sm:size-[420px] md:size-[520px] rounded-full border border-slate-800/30"
            />
            {/* Inner Ring */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="absolute size-[220px] sm:size-[300px] md:size-[380px] rounded-full border border-slate-700/20"
            />
            
            {/* Central Hub Node */}
            <motion.div
              animate={{
                boxShadow: [
                  `0 0 60px 15px rgba(11, 138, 173, 0.2)`,
                  `0 0 80px 20px rgba(11, 138, 173, 0.4)`,
                  `0 0 60px 15px rgba(11, 138, 173, 0.2)`,
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="size-32 sm:size-48 rounded-full bg-slate-900 border-2 border-[#0b8aad]/40 flex flex-col items-center justify-center relative z-20 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0b8aad]/10 to-[#60a5fa]/10" />
              <Network className="text-[#0b8aad] w-10 h-10 sm:w-12 sm:h-12 mb-2" />
              <span className="text-white text-[10px] sm:text-xs font-black uppercase tracking-widest text-center leading-tight">
                Growth
                <br />
                Hub
              </span>
            </motion.div>
          </div>
        </div>

        {/* Floating Element 1: AUM Curve Chart */}
        <FloatingCard
          initial={{ x: -50, y: -20, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="top-[0%] left-[0%] sm:left-[4%] w-64 sm:w-80"
          floatDuration={6}
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-slate-300 text-[10px] font-bold uppercase tracking-widest">
              Enterprise AUM Curve
            </p>
            <span className="text-[#10b981] text-xs font-bold">+52.4%</span>
          </div>
          <div className="h-16 sm:h-24 w-full">
            <svg
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
              viewBox="0 0 400 100"
            >
              <defs>
                <linearGradient id="lineGradient" x1="0%" x2="100%" y1="0%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#0b8aad" />
                </linearGradient>
                <linearGradient id="areaGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut", delay: 1 }}
                d="M0 90 C 50 85, 80 50, 120 45 S 180 60, 250 30 S 350 10, 400 5"
                fill="none"
                stroke="url(#lineGradient)"
                strokeLinecap="round"
                strokeWidth="4"
              />
              <motion.path
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2 }}
                d="M0 90 C 50 85, 80 50, 120 45 S 180 60, 250 30 S 350 10, 400 5 L 400 100 L 0 100 Z"
                fill="url(#areaGradient)"
              />
            </svg>
          </div>
        </FloatingCard>

        {/* Floating Element 2: Monthly Active Pipeline */}
        <FloatingCard
          initial={{ x: -30, y: 30, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="bottom-[10%] left-[0%] sm:left-[5%] p-6"
          floatDuration={5}
          floatDelay={1}
        >
          <p className="text-slate-400 text-xs font-medium mb-1">
            Monthly Active Pipeline
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-white text-3xl sm:text-4xl font-black">2.4k</h3>
            <span className="text-[#10b981] text-sm font-bold">+18%</span>
          </div>
        </FloatingCard>

        {/* Floating Element 3: Encrypted Nodes */}
        <FloatingCard
          initial={{ x: 30, y: -30, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="top-[10%] right-[0%] sm:right-[5%] flex items-center gap-4"
          floatDuration={7}
          floatDelay={0.5}
        >
          <div className="size-10 rounded-full bg-[#60a5fa]/20 flex items-center justify-center shrink-0">
            <ShieldCheck className="text-[#60a5fa] w-5 h-5" />
          </div>
          <div>
            <p className="text-white text-sm font-bold">Encrypted Nodes</p>
            <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">
              Active & Verified
            </p>
          </div>
        </FloatingCard>

        {/* Floating Element 4: Global AUM Growth */}
        <FloatingCard
          initial={{ x: 40, y: 40, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bottom-[15%] right-[0%] sm:right-[10%] bg-slate-900/40 border-slate-700/40"
          floatDuration={5.5}
          floatDelay={1.5}
        >
          <p className="text-slate-400 text-[10px] font-medium uppercase tracking-widest mb-2">
            Global AUM Growth
          </p>
          <p className="text-white text-3xl font-bold mb-1">$4.2B+</p>
          <div className="flex items-center gap-1 text-[#10b981] text-xs font-bold">
            <TrendingUp className="w-3 h-3" /> +52% Growth
          </div>
        </FloatingCard>

        {/* Avatar 1 */}
        <FloatingElement
          className="absolute top-[40%] right-[20%] sm:right-[25%] z-30"
          delay={0.9}
        >
          <div className="size-12 rounded-full border-2 border-[#10b981] p-1 bg-slate-900 shadow-lg shadow-[#10b981]/10">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcPHyg8tjNDiFCIWqIMwThcPMOBSvT0ISQvodC3NHyfuDGd_uq95ziIj9pQ3GfsuGqInGTOW-sv0jg5uSNTjb6US9cUmY8GYEp0MTTfuBgtEv_YGsUoKr-R7NJ-Vw6W3ZhClUASRlFh2fMcBrDZ_-1tATGmuaD5G9bd0nmL4hYdpMepY2y4d7-UUXEWy-kmQKq3wYRxYMDCIwJKPdoI7-nZo8kABsDJPIShC2pG06Xbasxh0j5SplMsNrAm4qoHRT4Ea3OHQYjayj-"
              alt="User"
              className="size-full rounded-full object-cover"
            />
          </div>
        </FloatingElement>

        {/* Avatar 2 */}
        <FloatingElement
          className="absolute bottom-[35%] left-[25%] sm:left-[28%] z-30"
          delay={1.1}
          floatDuration={4}
        >
          <div className="size-10 rounded-full border-2 border-[#60a5fa] p-1 bg-slate-900">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHZ5h4cvxRip-z6E85qm_HoD_en1CraCuIZVT0gC6uTOZcKDZkSIl8wg60dPJSKD_ghQ_EKs9TqiMJ1N3XDY2q16D9l_uN7KwspIqt2DY2KB5FbIz1ehZ_nYFXDm2tzzJv2n5VLkdWC3JCG-4BymzTF3qRLvKD7uM8DS2JKeAfWwheOdggJ9oNrte96dYO41jNdGN9odKDIxZkz7Iod0s9lqSBOwO4qjFn62HSjao-g_6CXRiwvhi59IbyR8j52YhVcx9P8728PToY"
              alt="User"
              className="size-full rounded-full object-cover"
            />
          </div>
        </FloatingElement>

        {/* Floating Icon 1: Wallet */}
        <FloatingCard
           initial={{ opacity: 0, scale: 0 }}
           animate={{ opacity: 1, scale: 1 }}
           className="top-1/2 left-[2%] -translate-y-1/2 !p-0 size-14 flex items-center justify-center !rounded-xl"
           floatDuration={4.5}
        >
            <Wallet className="text-[#0b8aad]" />
        </FloatingCard>

        {/* Floating Icon 2: Verified */}
        <FloatingCard
           initial={{ opacity: 0, scale: 0 }}
           animate={{ opacity: 1, scale: 1 }}
           className="top-1/2 right-[2%] -translate-y-1/2 !p-0 size-14 flex items-center justify-center !rounded-xl"
           floatDuration={5.5}
           transition={{ delay: 0.2 }}
        >
            <CheckCircle2 className="text-[#10b981]" />
        </FloatingCard>

      </div>
    </div>
  );
}

// Interface extends Framer Motion props to avoid 'any' and ensure type safety
interface FloatingCardProps extends HTMLMotionProps<"div"> {
  children?: React.ReactNode;
  floatDuration?: number;
  floatDelay?: number;
}

// Helper component for the glass cards
function FloatingCard({
  children,
  className = "",
  floatDuration = 6,
  floatDelay = 0,
  ...props
}: FloatingCardProps) {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
      whileHover={{ scale: 1.05, zIndex: 50, cursor: "grab" }}
      whileTap={{ scale: 0.95, cursor: "grabbing" }}
      className={`absolute z-20 bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-5 shadow-2xl ${className}`}
      {...props}
    >
        <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
                duration: floatDuration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: floatDelay,
            }}
        >
            {children}
        </motion.div>
    </motion.div>
  );
}

interface FloatingElementProps {
    children?: React.ReactNode;
    className?: string;
    delay?: number;
    floatDuration?: number;
}

// Helper for simple floating elements without card styling
function FloatingElement({
    children,
    className = "",
    delay = 0,
    floatDuration = 5
}: FloatingElementProps) {
    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay }}
            className={className}
        >
             <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                    duration: floatDuration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: delay,
                }}
            >
                {children}
            </motion.div>
        </motion.div>
    )
}