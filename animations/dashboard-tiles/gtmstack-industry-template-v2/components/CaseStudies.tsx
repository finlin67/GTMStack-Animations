'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { IndustryData } from '../types';

interface CaseStudiesProps {
  cases: IndustryData['caseStudies'];
}

export default function CaseStudies({ cases }: CaseStudiesProps) {
  return (
    <section id="cases" className="py-24 bg-navy-900 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-gold text-sm font-bold tracking-wider uppercase mb-2 block">Success Stories</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white">Proven Results</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cases.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="group flex flex-col bg-navy-800 rounded-2xl overflow-hidden border border-white/5 hover:border-gold/30 transition-all hover:shadow-2xl hover:shadow-gold/5"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-navy-900/40 group-hover:bg-navy-900/20 transition-colors z-10" />
                <img 
                  src={study.image} 
                  alt={study.company} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
                  {study.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-navy-900/80 backdrop-blur text-xs text-gray-300 rounded border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col relative">
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-400 mb-1">{study.company}</h3>
                  <h4 className="text-xl font-bold text-white mb-4 group-hover:text-teal-400 transition-colors">{study.title}</h4>
                  
                  <div className="bg-navy-900/50 rounded-lg p-4 border border-white/5">
                    <p className="text-3xl font-bold text-gold mb-1">{study.metric}</p>
                    <p className="text-sm text-gray-400">{study.metricLabel}</p>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
                  <span className="text-sm font-medium text-white group-hover:text-gold transition-colors">Read Case Study</span>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gold group-hover:text-navy-900 transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}