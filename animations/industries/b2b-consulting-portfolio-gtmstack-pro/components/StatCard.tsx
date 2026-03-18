import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  label: string;
  value: string;
  suffix?: string;
  delay?: number;
}

export default function StatCard({ label, value, suffix = '', delay = 0 }: StatCardProps) {
  // Simple counter effect for demo purposes if value is numeric-like
  const numericValue = parseInt(value.replace(/\D/g, ''));
  const isNumeric = !isNaN(numericValue);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isNumeric) return;
    let start = 0;
    const duration = 2000;
    const increment = numericValue / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= numericValue) {
        setDisplayValue(numericValue);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [numericValue, isNumeric]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm hover:border-teal/30 transition-colors group"
    >
      <div className="text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold to-amber-300 mb-2">
        {isNumeric ? displayValue : value}{suffix}
      </div>
      <div className="text-gray-400 font-medium group-hover:text-gray-200 transition-colors">
        {label}
      </div>
    </motion.div>
  );
}