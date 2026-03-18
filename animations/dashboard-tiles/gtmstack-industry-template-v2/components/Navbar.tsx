'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  currentIndustry: string;
  onIndustryChange: (id: string) => void;
  industries: { id: string; name: string }[];
}

export default function Navbar({ currentIndustry, onIndustryChange, industries }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [industryDropdownOpen, setIndustryDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIndustryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const currentIndustryName = industries.find(i => i.id === currentIndustry)?.name || 'Industries';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-navy-900/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">G</span>
            </div>
            <span className="text-white font-bold text-xl tracking-tight">GTMStack<span className="text-teal-400">.pro</span></span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            
            {/* Industry Selector */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIndustryDropdownOpen(!industryDropdownOpen)}
                className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors text-sm font-medium"
              >
                {currentIndustryName}
                <ChevronDown className={`w-4 h-4 transition-transform ${industryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {industryDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-navy-800 border border-white/10 rounded-xl shadow-xl overflow-hidden py-1 z-50"
                  >
                    {industries.map((ind) => (
                      <button
                        key={ind.id}
                        onClick={() => {
                          onIndustryChange(ind.id);
                          setIndustryDropdownOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          currentIndustry === ind.id 
                            ? 'bg-teal-900/50 text-teal-400' 
                            : 'text-gray-300 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        {ind.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a href="#overview" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Overview</a>
            <a href="#expertise" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Expertise</a>
            <a href="#cases" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Case Studies</a>
            <button className="bg-teal text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-teal-400 transition-all flex items-center gap-2 group">
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white p-2">
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-navy-800 border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              <div className="py-2 border-b border-white/10 mb-2">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2 block">Select Industry</span>
                {industries.map((ind) => (
                  <button
                    key={ind.id}
                    onClick={() => {
                      onIndustryChange(ind.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md ${
                       currentIndustry === ind.id 
                            ? 'bg-teal-900/30 text-teal-400' 
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {ind.name}
                  </button>
                ))}
              </div>

              <a href="#overview" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-md">Overview</a>
              <a href="#expertise" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-md">Expertise</a>
              <a href="#cases" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-md">Case Studies</a>
              <div className="pt-4">
                <button className="w-full bg-teal text-white px-5 py-3 rounded-lg text-base font-semibold hover:bg-teal-400 transition-colors">
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}