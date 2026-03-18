'use client';

import React from 'react';

export default function BackgroundGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base Grid - Extremely subtle */}
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Abstract Contour / Global Feel */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="globeGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#1e293b" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="50%" cy="50%" r="45%" fill="url(#globeGradient)" />
        <path 
          d="M0,300 Q150,250 300,300 T600,300" 
          fill="none" 
          stroke="#334155" 
          strokeWidth="1" 
          strokeDasharray="4 4"
          className="opacity-30"
        />
        <path 
          d="M300,0 Q250,150 300,300 T300,600" 
          fill="none" 
          stroke="#334155" 
          strokeWidth="1" 
          strokeDasharray="4 4"
          className="opacity-30"
        />
      </svg>
    </div>
  );
}