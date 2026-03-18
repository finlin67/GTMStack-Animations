import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICE_DATA, ICON_MAP } from '../constants';
import { CheckCircle2, ArrowRight, ChevronRight } from 'lucide-react';

const CATEGORY_COLORS = {
  Content: {
    bg: 'bg-[#FFB74D]/10', // Vibrant Peach
    border: 'border-[#FFB74D]/20',
    text: 'text-[#FFB74D]', 
    iconBg: 'bg-[#FFB74D]/20',
  },
  Demand: {
    bg: 'bg-[#00E699]/10', // Neon Mint Green
    border: 'border-[#00E699]/20',
    text: 'text-[#00E699]', 
    iconBg: 'bg-[#00E699]/20',
  },
  Strategy: {
    bg: 'bg-[#818CF8]/10', // Indigo
    border: 'border-[#818CF8]/20',
    text: 'text-[#818CF8]', 
    iconBg: 'bg-[#818CF8]/20',
  },
  Systems: {
    bg: 'bg-[#22D3EE]/10', // Electric Cyan
    border: 'border-[#22D3EE]/20',
    text: 'text-[#22D3EE]', 
    iconBg: 'bg-[#22D3EE]/20',
  },
};

export default function Expertise() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = ['Content', 'Demand', 'Strategy', 'Systems'];

  const filteredServices = selectedCategory 
    ? SERVICE_DATA.filter(s => s.category === selectedCategory)
    : SERVICE_DATA;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      
      {/* Sidebar Filters (Desktop) / Topbar (Mobile) */}
      <div className="lg:w-64 bg-navy lg:border-r border-b lg:border-b-0 border-white/10 lg:fixed lg:h-full z-20 top-20">
        <div className="p-6">
          <h2 className="text-xs font-bold uppercase text-gray-500 tracking-wider mb-4">Filter By Domain</h2>
          <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
            <button
               onClick={() => { setSelectedCategory(null); setExpandedId(null); }}
               className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${!selectedCategory ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              All Domains
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setExpandedId(null); }}
                className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-2 ${selectedCategory === cat ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                <span className={`w-2 h-2 rounded-full ${CATEGORY_COLORS[cat as keyof typeof CATEGORY_COLORS].text.replace('text-', 'bg-')}`} />
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        <div className="p-6 mt-auto hidden lg:block border-t border-white/5">
            <h3 className="text-sm font-bold text-white mb-2">Need a custom stack?</h3>
            <p className="text-xs text-gray-400 mb-4">I build bespoke GTM operating systems.</p>
            <a href="/#contact" className="text-xs text-teal hover:underline flex items-center gap-1">Get a quote <ArrowRight className="w-3 h-3"/></a>
        </div>
      </div>

      {/* Main Grid */}
      <div className="flex-1 lg:ml-64 p-6 lg:p-12 pt-12">
        <div className="max-w-6xl mx-auto">
            <div className="mb-12">
                <h1 className="text-4xl font-display font-bold mb-4">Expertise Matrix</h1>
                <p className="text-gray-400 text-lg">Comprehensive capabilities across the entire revenue lifecycle.</p>
            </div>

            <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
            >
                <AnimatePresence mode="popLayout">
                    {filteredServices.map((service) => {
                        const Icon = ICON_MAP[service.iconName];
                        const colors = CATEGORY_COLORS[service.category as keyof typeof CATEGORY_COLORS];
                        const isExpanded = expandedId === service.id;
                        
                        return (
                            <motion.div
                                layout
                                key={service.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className={`rounded-2xl p-6 border ${colors.border} ${colors.bg} backdrop-blur-sm group hover:border-opacity-50 transition-colors duration-300 flex flex-col`}
                            >
                                <div className={`w-12 h-12 rounded-xl ${colors.iconBg} flex items-center justify-center mb-6`}>
                                    <Icon className={`w-6 h-6 ${colors.text}`} />
                                </div>
                                
                                <div className="mb-4 flex-grow">
                                    <span className={`text-xs font-bold uppercase tracking-wider mb-2 block ${colors.text}`}>
                                        {service.category}
                                    </span>
                                    <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                                    <p className="text-sm text-gray-300 leading-relaxed opacity-80">
                                        {service.description}
                                    </p>
                                </div>

                                <div className="mt-4 pt-2 border-t border-white/5">
                                    <motion.button
                                        whileTap={{ scale: 0.97 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setExpandedId(isExpanded ? null : service.id);
                                        }}
                                        className={`w-full text-xs font-bold uppercase tracking-wider flex items-center justify-between py-2 ${colors.text} hover:opacity-80 transition-all focus:outline-none`}
                                    >
                                        {isExpanded ? 'Less Info' : 'Learn More'}
                                        <motion.div
                                            animate={{ rotate: isExpanded ? 90 : 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <ChevronRight className="w-4 h-4" />
                                        </motion.div>
                                    </motion.button>
                                </div>

                                <AnimatePresence initial={false}>
                                    {isExpanded && (
                                        <motion.div
                                            key="content"
                                            initial="collapsed"
                                            animate="expanded"
                                            exit="collapsed"
                                            variants={{
                                                expanded: { opacity: 1, height: "auto" },
                                                collapsed: { opacity: 0, height: 0 }
                                            }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pt-2 pb-2 space-y-4">
                                                 {/* Deliverables List */}
                                                 <div>
                                                    <motion.h4 
                                                        initial={{ opacity: 0, y: 5 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.1, duration: 0.3 }}
                                                        className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2 mt-2"
                                                    >
                                                        Deliverables
                                                    </motion.h4>
                                                    <div className="space-y-2">
                                                        {service.details?.map((detail, idx) => (
                                                            <motion.div 
                                                                key={idx}
                                                                initial={{ opacity: 0, y: 10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ delay: 0.15 + idx * 0.05, duration: 0.3 }}
                                                                className="flex items-start gap-2 text-gray-300 text-xs leading-relaxed"
                                                            >
                                                                <CheckCircle2 className={`w-3 h-3 mt-0.5 flex-shrink-0 ${colors.text}`} />
                                                                <span>{detail}</span>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                 </div>

                                                 {/* Case Study */}
                                                 {service.caseStudy && (
                                                     <motion.div 
                                                        initial={{ opacity: 0, y: 15 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.3, duration: 0.4 }}
                                                        className={`p-3 rounded-lg ${colors.bg} border ${colors.border}`}
                                                     >
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className={`text-[10px] font-bold uppercase tracking-widest ${colors.text}`}>Case Study</span>
                                                        </div>
                                                        <p className="text-sm font-bold text-white leading-tight mb-1">{service.caseStudy.title}</p>
                                                        <p className="text-xs text-gray-300 leading-relaxed opacity-90">{service.caseStudy.outcome}</p>
                                                     </motion.div>
                                                 )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </motion.div>
        </div>
      </div>
    </div>
  );
}