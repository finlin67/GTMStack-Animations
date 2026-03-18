import React, { useMemo } from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';

interface EmailMarketingHeroProps {
  /**
   * Multiplier for animation speed.
   * @default 1
   */
  speed?: number;
  /**
   * Pauses the animation when true.
   * @default false
   */
  paused?: boolean;
  /**
   * Optional className for the SVG container.
   */
  className?: string;
}

/**
 * EmailMarketingHero
 * 
 * An isometric, geometric visualization of an email workflow.
 * Features an envelope opening, a paper plane flying a loop, and returning.
 */
export const EmailMarketingHero: React.FC<EmailMarketingHeroProps> = ({
  speed = 1,
  paused = false,
  className = "",
}) => {
  const shouldReduceMotion = useReducedMotion();
  
  // Base duration for one full loop (seconds)
  const BASE_DURATION = 10;
  // Adjusted duration based on prop
  const duration = shouldReduceMotion ? 0 : BASE_DURATION / speed;

  // Animation Times (normalized 0-1)
  // 0.0 - 0.10: Idle Closed
  // 0.10 - 0.20: Flap Opens
  // 0.20 - 0.30: Plane Emerges
  // 0.30 - 0.75: Plane Flights (Loop)
  // 0.75 - 0.85: Plane Enters
  // 0.85 - 0.95: Flap Closes
  // 0.95 - 1.00: Idle Closed

  const transitionSettings = useMemo(() => ({
    duration: duration,
    repeat: Infinity,
    ease: "linear",
    repeatDelay: 0, 
  }), [duration]);

  // VARIANTS
  
  const flapVariants: Variants = {
    animate: {
      // We simulate opening by scaling Y to -1 (flip up) relative to the hinge
      scaleY: [1, 1, -1, -1, -1, -1, 1, 1],
      // Enhance the 3D feel with a slight skew or brightness change if we were using filters
      transition: {
        times: [0, 0.1, 0.2, 0.25, 0.8, 0.85, 0.95, 1],
        ...transitionSettings,
      }
    }
  };

  const flapGlowVariants: Variants = {
    animate: {
      opacity: [0.5, 0.8, 0.5, 0, 0, 0, 0.5, 0.5],
      transition: {
        times: [0, 0.05, 0.1, 0.2, 0.8, 0.85, 0.95, 1],
        ...transitionSettings,
      }
    }
  };

  const planeVariants: Variants = {
    animate: {
      // Path logic:
      // Start at center (hidden)
      // Move up (negative Y) and right
      // Loop around top
      // Dive back into center
      x: [0, 0, 0, 120, 0, -120, 0, 0, 0],
      y: [0, 0, -20, -100, -180, -100, -20, 0, 0],
      scale: [0, 0, 0.4, 1, 0.8, 1, 0.4, 0, 0],
      rotate: [0, 0, 15, 45, -90, -225, -345, -360, -360],
      opacity: [0, 0, 1, 1, 1, 1, 1, 0, 0],
      transition: {
        times: [0, 0.2, 0.25, 0.35, 0.5, 0.65, 0.75, 0.8, 1],
        ...transitionSettings,
      }
    }
  };

  const shadowVariants: Variants = {
    animate: {
      scale: [1, 1.1, 1, 1],
      opacity: [0.3, 0.1, 0.3, 0.3],
      transition: {
        times: [0, 0.2, 0.9, 1],
        ...transitionSettings,
      }
    }
  };

  const particleVariants = (delay: number): Variants => ({
    animate: {
      y: [0, -40],
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      transition: {
        duration: 2 / speed,
        repeat: Infinity,
        delay: delay,
        ease: "easeOut"
      }
    }
  });

  // Render State Control
  const animationState = paused ? "paused" : "animate";

  return (
    <motion.svg
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}`}
      aria-label="Email Marketing Animation"
      role="img"
      initial="animate"
      animate={animationState}
    >
      <defs>
        <linearGradient id="envelope-body-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" /> {/* Blue 500 */}
          <stop offset="100%" stopColor="#6366f1" /> {/* Indigo 500 */}
        </linearGradient>
        <linearGradient id="envelope-flap-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" /> {/* Blue 400 */}
          <stop offset="100%" stopColor="#818cf8" /> {/* Indigo 400 */}
        </linearGradient>
        <linearGradient id="envelope-inside-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1e293b" /> {/* Slate 800 */}
          <stop offset="100%" stopColor="#334155" /> {/* Slate 700 */}
        </linearGradient>
        <linearGradient id="plane-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" /> {/* Slate 50 */}
          <stop offset="100%" stopColor="#cbd5e1" /> {/* Slate 300 */}
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* --- SCENE CENTER GROUP --- */}
      <g transform="translate(200, 220)">
        
        {/* 1. SHADOW (Under the envelope) */}
        <motion.ellipse
          rx="90"
          ry="20"
          fill="#0f172a"
          variants={shadowVariants}
          style={{ y: 70 }}
          className="blur-md"
        />

        {/* 2. ENVELOPE BACK (Inside darkness) */}
        {/* Drawn slightly smaller to fit behind the front face */}
        <path
          d="M -90 -60 L 90 -60 L 90 60 L -90 60 Z"
          fill="url(#envelope-inside-grad)"
        />

        {/* 3. DECORATIVE PARTICLES (Background) */}
        {!shouldReduceMotion && (
          <g>
            <motion.circle cx="-120" cy="-80" r="3" fill="#60a5fa" variants={particleVariants(0)} />
            <motion.circle cx="130" cy="-40" r="2" fill="#818cf8" variants={particleVariants(1.5)} />
            <motion.rect x="-100" y="-140" width="4" height="4" fill="#94a3b8" rx="1" variants={particleVariants(0.8)} />
          </g>
        )}

        {/* 4. PAPER PLANE */}
        {/* 
           The plane needs to be sandwiched between Envelope Back and Envelope Front 
           when it is "inside". 
           However, when it loops, it needs to be "in front".
           Since we can't easily change Z-index, we design the path to fly UP (Y < -60)
           so it visually clears the envelope body. When it dives back in, it enters 
           the "pocket" area.
        */}
        <motion.g variants={planeVariants}>
          {/* Plane Shape Group - Centered at 0,0 locally */}
          <g transform="rotate(30)"> {/* Default isometric tilt for the plane body */}
            <path
              d="M -15 10 L 0 -30 L 15 10 L 0 5 Z"
              fill="url(#plane-grad)"
              stroke="#94a3b8"
              strokeWidth="1"
            />
            {/* Wing details for depth */}
            <path d="M 0 -30 L 0 5" stroke="#cbd5e1" strokeWidth="1" />
          </g>
          {/* Trail Effect - Only visible when moving fast */}
          {!shouldReduceMotion && (
             <motion.path 
               d="M 0 5 L 0 25" 
               stroke="#60a5fa" 
               strokeWidth="2" 
               opacity="0.5"
               strokeDasharray="4 2"
             />
          )}
        </motion.g>

        {/* 5. ENVELOPE FRONT BODY */}
        {/* 
           The main body of the envelope. 
           Shape: Rectangular with a slight cutout triangle at top to show the "pocket" 
        */}
        <path
          d="M -100 -60 L 0 -40 L 100 -60 L 100 60 L -100 60 Z"
          fill="url(#envelope-body-grad)"
          filter="url(#glow)"
        />
        
        {/* Subtle geometric lines on the envelope front */}
        <path d="M -100 60 L 0 0 L 100 60" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" />

        {/* 6. ENVELOPE FLAP */}
        {/* 
            Origin is critical here. It must hinge at the top line (-60 Y).
            We wrap it in a motion group to handle the rotation/flip.
        */}
        <motion.g
          style={{ originY: 0, y: -60 }} // Hinge point
          variants={flapVariants}
        >
          {/* Flap Glow Layer */}
          <motion.path
            d="M -100 0 L 0 65 L 100 0 Z"
            fill="url(#envelope-flap-grad)"
            filter="url(#glow)"
            variants={flapGlowVariants}
          />
          
          {/* The Flap Shape: Triangle pointing down */}
          <path
            d="M -100 0 L 0 65 L 100 0 Z"
            fill="url(#envelope-flap-grad)"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1"
          />
          {/* Flap Highlight */}
          <path 
            d="M -90 2 L 0 60 L 90 2" 
            fill="none" 
            stroke="rgba(255,255,255,0.15)" 
            strokeWidth="1" 
          />
        </motion.g>

      </g>

      {/* 7. FOREGROUND DECORATIONS */}
      <g transform="translate(200, 220)">
         {/* Small signal waves eminating from center when closed */}
         <motion.circle 
            cx="0" cy="0" r="40" 
            fill="none" stroke="#6366f1" strokeWidth="1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0, 0, 0.5, 0], 
              scale: [0.8, 0.8, 1.5, 2] 
            }}
            transition={{
              times: [0, 0.9, 0.95, 1],
              duration: duration,
              repeat: Infinity,
            }}
         />
      </g>

    </motion.svg>
  );
};
