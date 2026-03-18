
import React from 'react';
import AIGrowth from './AIGrowth';
import { ChevronRight, PlayCircle, Star } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative pt-20 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <div className="flex flex-col space-y-8 z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                <Star className="w-4 h-4 text-blue-400 fill-blue-400" />
                <span className="text-xs font-bold text-blue-400 tracking-widest uppercase">Next-Gen AI Growth Engine</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter text-white leading-[1.1]">
                Scale with <br />
                <span className="bg-gradient-to-br from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  AI Precision
                </span>
              </h1>
              <p className="mt-6 text-xl text-slate-400 max-w-lg leading-relaxed">
                Experience the Harmonic Quad-Tone protocol. Our autonomous intelligence engine optimizes growth metrics in real-time with sub-millisecond latency.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-white shadow-xl shadow-blue-900/40 hover:scale-105 transition-transform flex items-center gap-2">
                Get Started Free <ChevronRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 bg-slate-900 border border-slate-700 rounded-xl font-bold text-white hover:bg-slate-800 transition-colors flex items-center gap-2">
                Watch Demo <PlayCircle className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white">2.4k+</span>
                <span className="text-sm text-slate-500 font-medium">Nodes Active</span>
              </div>
              <div className="w-[1px] h-10 bg-slate-800" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white">99.9%</span>
                <span className="text-sm text-slate-500 font-medium">Precision Rate</span>
              </div>
              <div className="w-[1px] h-10 bg-slate-800" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white">$4.2B</span>
                <span className="text-sm text-slate-500 font-medium">AUM Growth</span>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <AIGrowth />
          </div>

        </div>
      </div>
      
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none" />
    </div>
  );
}
