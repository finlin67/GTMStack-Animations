import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, Share2, TrendingUp } from 'lucide-react';

export default function CampaignTile() {
  const containerRef = useRef(null);
  
  // Track scroll progress of the container relative to the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Map scroll progress to vertical movement (parallax)
  // Moving from -20px to 20px creates a subtle depth effect against the foreground elements
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={containerRef} className="w-full h-full aspect-square flex items-center justify-center p-4">
      <div className="relative w-full h-full rounded-3xl overflow-hidden border border-[#d4af37]/15 shadow-[0_0_50px_rgba(184,134,11,0.1)] bg-[#121212]/50 p-1 flex items-center justify-center">
        
        {/* Background Image with Overlay & Parallax */}
        <motion.div 
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
          style={{ 
            y,
            scale: 1.15, // Slightly scaled up to prevent edges showing during parallax movement
            backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDfwk6yqZVoiNFA03FzUtpHFHYqgxVpkGZAR37ttvB2jByObVkkjN6QgsQC3uUxaLYqLMtrNm1BsIzbwcdxHivyLvd7XgoHDOEENTwYvXFk51RXGF72jY7DDo8gqBtm3A0ZSKdF3lkOezfaXO8hNl1_W_jKfYqB_g19ZSWdShGGcwLx3hjX-yNYaUlMpUAh-ctoU9P3pM4Ql8AI5CL4J8yJsoCCYC5heJhP-qyDhM4n_n2m0Qpgi66ni1m-wAy3vStlWFHIlRQ24qc")' 
          }}
        />

        {/* Main Video Card */}
        <motion.div 
          className="relative z-10 w-[85%] aspect-video rounded-xl overflow-hidden shadow-2xl border border-[#d4af37]/30 bg-black cursor-pointer group"
          initial="initial"
          whileHover="hover"
        >
          {/* Zooming Background Image */}
          <motion.div 
            variants={{
              initial: { scale: 1, filter: "brightness(1)" },
              hover: { scale: 1.1, filter: "brightness(1.2)" }
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDfwk6yqZVoiNFA03FzUtpHFHYqgxVpkGZAR37ttvB2jByObVkkjN6QgsQC3uUxaLYqLMtrNm1BsIzbwcdxHivyLvd7XgoHDOEENTwYvXFk51RXGF72jY7DDo8gqBtm3A0ZSKdF3lkOezfaXO8hNl1_W_jKfYqB_g19ZSWdShGGcwLx3hjX-yNYaUlMpUAh-ctoU9P3pM4Ql8AI5CL4J8yJsoCCYC5heJhP-qyDhM4n_n2m0Qpgi66ni1m-wAy3vStlWFHIlRQ24qc")' }}
          />

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              className="flex items-center justify-center rounded-full w-16 h-16 bg-white/10 backdrop-blur-md border border-[#d4af37]/40 text-[#d4af37] transition-all cursor-pointer pointer-events-auto"
            >
              <Play className="w-8 h-8 fill-current" />
            </motion.button>
          </div>

          {/* Live Badge Overlay */}
          <div className="absolute top-4 right-4 flex gap-2 pointer-events-none">
            <div className="px-2 py-1 rounded bg-black/60 border border-[#d4af37]/20 text-[10px] text-[#d4af37] flex items-center gap-1 font-bold tracking-wider">
              <motion.span 
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"
              />
              LIVE
            </div>
          </div>
        </motion.div>

        {/* Floating Animated Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
            
            {/* Bounce Share Icon - Complex Float Animation */}
            <motion.div 
              animate={{ 
                y: [0, -12, 0],
                rotate: [0, 5, -5, 0],
                boxShadow: [
                    "0px 0px 0px rgba(212, 175, 55, 0)", 
                    "0px 10px 20px rgba(212, 175, 55, 0.15)", 
                    "0px 0px 0px rgba(212, 175, 55, 0)"
                ]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute top-[20%] left-[20%] p-3 bg-[#d4af37]/10 rounded-full border border-[#d4af37]/20 backdrop-blur-sm"
            >
              <Share2 className="text-[#d4af37] w-5 h-5" />
            </motion.div>

            {/* Pulse Trending Icon - Growth Surge Animation */}
            <motion.div 
              animate={{ 
                scale: [1, 1.15, 1],
                y: [0, -5, 0],
                x: [0, 3, 0],
                borderColor: ["rgba(184, 134, 11, 0.2)", "rgba(184, 134, 11, 0.6)", "rgba(184, 134, 11, 0.2)"]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 1.5
              }}
              className="absolute bottom-[20%] right-[20%] p-3 bg-[#b8860b]/10 rounded-full border border-[#b8860b]/20 backdrop-blur-sm"
            >
              <TrendingUp className="text-[#b8860b] w-5 h-5" />
            </motion.div>

          </div>
        </div>

      </div>
    </div>
  );
}