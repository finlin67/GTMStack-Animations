'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { IndustryData } from '../types';

interface ServicesProps {
  services: IndustryData['services'];
}

export default function Services({ services }: ServicesProps) {
  return (
    <section id="expertise" className="py-24 bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Relevant Expertise</h2>
            <p className="text-gray-400 text-lg">
              Specialized services tailored for the unique complexities of the manufacturing sector.
            </p>
          </div>
          <button className="text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-2 group">
            View All Services 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative p-8 rounded-2xl bg-navy-800 border border-white/5 hover:border-teal-500/50 hover:bg-navy-800/80 transition-all cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-teal-500/0 to-teal-500/5 group-hover:via-teal-500/10 transition-all duration-500" />
                
                <div className="relative z-10 flex gap-6 items-start">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-navy-900 border border-white/10 flex items-center justify-center group-hover:border-teal-500/50 group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <Icon className="w-7 h-7 text-teal group-hover:text-teal-400 transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                      {service.title}
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-teal-400" />
                    </h3>
                    <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}