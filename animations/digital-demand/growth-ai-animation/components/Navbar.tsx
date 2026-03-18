
import React from 'react';
import { Shield, Menu, Github } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="w-full border-b border-slate-800 bg-[#0f172a]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tighter text-white">Growth.AI</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors">Protocol</a>
            <a href="#" className="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors">Network</a>
            <a href="#" className="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors">Docs</a>
            <button className="bg-slate-800 px-4 py-2 rounded-lg text-sm font-bold text-white border border-slate-700 hover:bg-slate-700 transition-colors">
              Launch Console
            </button>
          </div>

          <div className="md:hidden">
            <Menu className="w-6 h-6 text-slate-400" />
          </div>
        </div>
      </div>
      {/* Decorative Brand Gradient Line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50" />
    </nav>
  );
}
