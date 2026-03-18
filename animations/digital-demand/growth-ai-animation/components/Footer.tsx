
import React from 'react';
import { Shield, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tighter text-white">Growth.AI</span>
            </div>
            <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
              Leading the autonomous intelligence revolution since 2024. Building the future of high-frequency growth optimization.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="p-2 bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors">
                <Twitter className="w-4 h-4 text-slate-400" />
              </a>
              <a href="#" className="p-2 bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors">
                <Github className="w-4 h-4 text-slate-400" />
              </a>
              <a href="#" className="p-2 bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors">
                <Linkedin className="w-4 h-4 text-slate-400" />
              </a>
              <a href="#" className="p-2 bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors">
                <Mail className="w-4 h-4 text-slate-400" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white tracking-widest uppercase mb-6">Protocol</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Nodes</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Consensus</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Audits</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white tracking-widest uppercase mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#" className="hover:text-blue-400 transition-colors">About</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Press</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white tracking-widest uppercase mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Cookies</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Disclaimer</a></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-4 lg:col-span-1">
             <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-600/10 border border-slate-800">
               <h5 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">Subscribe</h5>
               <p className="text-xs text-slate-500 mb-4">Get the latest protocol updates.</p>
               <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500" 
              />
             </div>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-900">
          <p className="text-xs text-slate-500 font-medium">
            © 2024 Growth.AI Intelligence Protocol. All rights reserved.
          </p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <span className="text-[10px] font-bold text-slate-600 tracking-widest uppercase">System Status: Nominal</span>
            <span className="text-[10px] font-bold text-slate-600 tracking-widest uppercase">V1.4.2-STABLE</span>
          </div>
        </div>
      </div>
      
      {/* Decorative Brand Gradient Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mt-8 opacity-30" />
    </footer>
  );
}
