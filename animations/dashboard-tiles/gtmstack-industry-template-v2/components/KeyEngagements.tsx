'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { IndustryData } from '../types';

interface KeyEngagementsProps {
  stats: IndustryData['stats'];
}

export default function KeyEngagements({ stats }: KeyEngagementsProps) {
  return (
    <section className="py-20 bg-navy-800 border-y border-white/5 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-3xl h-full bg-teal-900/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Measurable Impact</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We don't just talk strategy; we deliver numbers that matter to the boardroom.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative group p-8 rounded-2xl bg-navy-900 border border-white/10 hover:border-gold/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Icon className="w-24 h-24 text-teal" />
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl md:text-5xl font-bold text-white tracking-tight">{stat.value}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-teal-400 uppercase tracking-wider mb-2">{stat.label}</h3>
                  {stat.trend && (
                    <div className="inline-flex items-center gap-1 text-gold text-sm font-medium">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      {stat.trend}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}