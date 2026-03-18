'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { IndustryData } from '../types';

interface OverviewProps {
  data: IndustryData;
}

export default function Overview({ data }: OverviewProps) {
  return (
    <section id="overview" className="py-24 bg-navy-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Pain Points */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="p-2 bg-red-500/10 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-400" />
              </span>
              Industry Challenges
            </h2>
            <div className="space-y-6">
              {data.painPoints.map((point, idx) => (
                <div key={idx} className="group p-6 rounded-xl bg-navy-800 border border-white/5 hover:border-red-500/30 transition-colors">
                  <h3 className="text-xl font-semibold text-gray-200 mb-2 group-hover:text-red-400 transition-colors">{point.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{point.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Solutions */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="p-2 bg-teal/10 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-teal" />
              </span>
              Our Approach
            </h2>
            <div className="space-y-6">
              {data.solutions.map((solution, idx) => (
                <div key={idx} className="group p-6 rounded-xl bg-navy-800 border border-teal-500/20 hover:bg-teal-900/10 hover:border-teal-500/50 transition-all">
                  <h3 className="text-xl font-semibold text-gray-200 mb-2 group-hover:text-teal-400 transition-colors">{solution.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{solution.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}