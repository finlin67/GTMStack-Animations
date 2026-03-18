'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-navy-900 to-navy-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
      <div className="absolute right-0 top-0 w-1/3 h-full bg-teal-900/10 skew-x-12 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-navy-800/50 backdrop-blur-lg rounded-3xl p-8 md:p-16 border border-white/10 shadow-2xl flex flex-col lg:flex-row gap-12 items-center">
          
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Ready to Scale in <br />
              <span className="text-teal-400">Manufacturing?</span>
            </h2>
            <p className="text-xl text-gray-400">
              Let's map your route to predictable revenue growth. Book a free strategy session with our industry experts.
            </p>
            
            <ul className="space-y-3 pt-4">
              {[
                "Audit of current GTM motion", 
                "Competitor benchmarking", 
                "Custom roadmap for first 90 days"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full lg:w-[450px] bg-navy-900 p-8 rounded-2xl border border-white/10 shadow-xl"
          >
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Work Email</label>
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  className="w-full bg-navy-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all placeholder-gray-600"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Company Website</label>
                <input 
                  type="text" 
                  placeholder="www.company.com" 
                  className="w-full bg-navy-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all placeholder-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Challenge</label>
                <select className="w-full bg-navy-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all appearance-none cursor-pointer">
                  <option>Demand Generation</option>
                  <option>ABM Strategy</option>
                  <option>RevOps Implementation</option>
                  <option>Other</option>
                </select>
              </div>

              <button className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-bold py-4 rounded-lg transition-all transform hover:-translate-y-1 shadow-lg shadow-teal-900/50 flex items-center justify-center gap-2 mt-4">
                Get Your Roadmap
                <Send className="w-4 h-4" />
              </button>

              <p className="text-xs text-center text-gray-500 mt-4">
                No commitment required. We respect your privacy.
              </p>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}