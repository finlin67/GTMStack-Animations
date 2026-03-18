
import React from 'react';
import { motion } from 'framer-motion';

/**
 * Isometric Workflow Illustration
 * 
 * Concept: Signal travels from an input node to a decision diamond.
 * Splitting into a 'rejected' path (red) and 'success' path (green).
 */

const SPRING_CONFIG = { stiffness: 100, damping: 20 };

export const WorkflowIllustration: React.FC = () => {
  // Define coordinate points for our isometric-style layout
  // Note: These are manual points meant to simulate a 3D isometric grid on a 2D SVG
  const P0 = { x: 50, y: 150 };  // Entry
  const P1 = { x: 150, y: 100 }; // Pre-decision
  const P_DECISION = { x: 250, y: 150 }; // The Diamond
  const P_REJECT = { x: 350, y: 100 };  // Branch A (Fail)
  const P_SUCCESS = { x: 350, y: 200 }; // Branch B (Success)
  const P_FINAL = { x: 450, y: 250 };   // Final target

  return (
    <div className="w-full h-full flex items-center justify-center min-h-[400px]">
      <svg 
        viewBox="0 0 500 400" 
        className="w-full h-auto drop-shadow-2xl"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Definitions for Gradients and Filters */}
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#334155" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#475569" stopOpacity="0.8" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* CONNECTION LINES (The Grid) */}
        <g strokeWidth="2" stroke="url(#lineGrad)" strokeLinecap="round">
          {/* Main Entry Path */}
          <line x1={P0.x} y1={P0.y} x2={P1.x} y2={P1.y} />
          <line x1={P1.x} y1={P1.y} x2={P_DECISION.x} y2={P_DECISION.y} />
          
          {/* Decision Branches */}
          <line x1={P_DECISION.x} y1={P_DECISION.y} x2={P_REJECT.x} y2={P_REJECT.y} />
          <line x1={P_DECISION.x} y1={P_DECISION.y} x2={P_SUCCESS.x} y2={P_SUCCESS.y} />
          
          {/* Final Connection */}
          <line x1={P_SUCCESS.x} y1={P_SUCCESS.y} x2={P_FINAL.x} y2={P_FINAL.y} />
        </g>

        {/* NODES */}
        <g>
          {/* Origin Node */}
          <circle cx={P0.x} cy={P0.y} r="10" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
          <circle cx={P0.x} cy={P0.y} r="4" fill="#3b82f6" />

          {/* Decision Diamond */}
          <motion.rect
            x={P_DECISION.x - 12}
            y={P_DECISION.y - 12}
            width="24"
            height="24"
            rx="4"
            fill="#1e293b"
            stroke="#6366f1"
            strokeWidth="2"
            style={{ originX: `${P_DECISION.x}px`, originY: `${P_DECISION.y}px` }}
            animate={{ 
              scale: [1, 1.1, 1],
              strokeWidth: [2, 4, 2],
              rotate: [45, 55, 45]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />

          {/* Success Node */}
          <circle cx={P_SUCCESS.x} cy={P_SUCCESS.y} r="8" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
          
          {/* Reject Node */}
          <circle cx={P_REJECT.x} cy={P_REJECT.y} r="8" fill="#1e293b" stroke="#ef4444" strokeWidth="1.5" />

          {/* Final Node */}
          <circle cx={P_FINAL.x} cy={P_FINAL.y} r="12" fill="#1e293b" stroke="#6366f1" strokeWidth="2" />
          <circle cx={P_FINAL.x} cy={P_FINAL.y} r="5" fill="#6366f1" />
        </g>

        {/* ANIMATED SIGNALS */}
        {/* We have two signal loops offset for a continuous "factory" feel */}
        <Signal path={[P0, P1, P_DECISION, P_SUCCESS, P_FINAL]} delay={0} />
        <Signal path={[P0, P1, P_DECISION, P_REJECT]} delay={1.5} isFail />
        <Signal path={[P0, P1, P_DECISION, P_SUCCESS, P_FINAL]} delay={3} />
        <Signal path={[P0, P1, P_DECISION, P_REJECT]} delay={4.5} isFail />
      </svg>
    </div>
  );
};

interface SignalProps {
  path: { x: number; y: number }[];
  delay: number;
  isFail?: boolean;
}

const Signal: React.FC<SignalProps> = ({ path, delay, isFail }) => {
  // Construct the SVG path string from points
  const pathData = `M ${path[0].x} ${path[0].y} ` + path.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ');
  
  // Define variations for Success/Fail
  const glowColor = isFail ? "#ef4444" : "#60a5fa";

  return (
    <g>
      <motion.circle
        r="4"
        fill={glowColor}
        style={{ filter: 'url(#glow)' }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 1, 0],
          offset: [0, 0.1, 0.9, 1]
        }}
        transition={{
          duration: 3,
          delay: delay,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <motion.animateMotion
          path={pathData}
          dur="3s"
          begin={`${delay}s`}
          repeatCount="indefinite"
          rotate="auto"
          calcMode="linear"
        />
      </motion.circle>
      
      {/* Trailing particles for "mechanical" vibe */}
      <motion.circle
        r="2"
        fill={glowColor}
        opacity={0.4}
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.4, 0.4, 0],
        }}
        transition={{
          duration: 3,
          delay: delay + 0.1,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <motion.animateMotion
          path={pathData}
          dur="3s"
          begin={`${delay + 0.1}s`}
          repeatCount="indefinite"
          rotate="auto"
        />
      </motion.circle>
    </g>
  );
};
