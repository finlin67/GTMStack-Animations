import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Award, GraduationCap } from 'lucide-react';
import { TIMELINE_DATA, PROJECTS } from '../constants';
import { TimelineEvent, Project } from '../types';

export default function About() {
  const [activeFilter, setActiveFilter] = useState<'All' | 'SaaS' | 'FinTech' | 'HealthTech'>('All');
  const [activeTab, setActiveTab] = useState<'Experience' | 'Projects'>('Experience');

  const filteredTimeline = activeFilter === 'All' 
    ? TIMELINE_DATA 
    : TIMELINE_DATA.filter(t => t.industry === activeFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-24 min-h-screen">
      
      {/* Bio Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
        <motion.div 
            className="md:col-span-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
        >
            <div className="sticky top-24">
                <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-gray-700 to-gray-900 mb-6 border border-white/10 relative group">
                    <img 
                        src="https://picsum.photos/600/600?grayscale" 
                        alt="Profile" 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                    <div className="absolute bottom-6 left-6">
                        <h2 className="text-2xl font-bold">John Doe</h2>
                        <p className="text-teal font-medium">GTM Architect</p>
                    </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                    {['Strategic', 'Data-Driven', 'Hands-On'].map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-white/5 text-xs text-gray-300 border border-white/5">{tag}</span>
                    ))}
                </div>
            </div>
        </motion.div>

        <motion.div 
            className="md:col-span-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-8">
                Architecting revenue engines for the <span className="text-teal">modern enterprise</span>.
            </h1>
            <div className="prose prose-lg prose-invert text-gray-400 space-y-6">
                <p>
                    Over the last decade, I've lived at the intersection of product, marketing, and sales. I don't just build strategies; I build the systems that sustain them.
                </p>
                <p>
                    My philosophy is simple: <strong>Growth is an engineering problem.</strong> It requires specific inputs, calibrated engines, and constant monitoring to achieve the desired output.
                </p>
                <p>
                    Whether it's scaling a Series A startup to Series B or restructuring a legacy enterprise for agility, I bring a toolkit of proven frameworks and a relentless focus on data.
                </p>
            </div>

            {/* Tabs */}
            <div className="mt-16 border-b border-white/10 flex gap-8">
                <button 
                    onClick={() => setActiveTab('Experience')}
                    className={`pb-4 text-sm font-bold uppercase tracking-wider transition-colors relative ${activeTab === 'Experience' ? 'text-teal' : 'text-gray-500 hover:text-white'}`}
                >
                    Timeline
                    {activeTab === 'Experience' && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 w-full h-0.5 bg-teal" />}
                </button>
                <button 
                    onClick={() => setActiveTab('Projects')}
                    className={`pb-4 text-sm font-bold uppercase tracking-wider transition-colors relative ${activeTab === 'Projects' ? 'text-teal' : 'text-gray-500 hover:text-white'}`}
                >
                    Key Projects
                    {activeTab === 'Projects' && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 w-full h-0.5 bg-teal" />}
                </button>
            </div>

            <div className="mt-8">
                <AnimatePresence mode="wait">
                    {activeTab === 'Experience' ? (
                        <motion.div 
                            key="timeline"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Filter Bar */}
                            <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                                {['All', 'SaaS', 'FinTech', 'HealthTech'].map(f => (
                                    <button
                                        key={f}
                                        onClick={() => setActiveFilter(f as any)}
                                        className={`px-4 py-2 rounded-lg text-sm transition-all ${
                                            activeFilter === f 
                                            ? 'bg-purple-muted text-white shadow-lg shadow-purple-900/50' 
                                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                        }`}
                                    >
                                        {f}
                                    </button>
                                ))}
                            </div>

                            <div className="border-l-2 border-white/10 space-y-12 pl-8 relative">
                                {filteredTimeline.map((item, idx) => (
                                    <motion.div 
                                        key={item.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="relative group"
                                    >
                                        <div className="absolute -left-[39px] top-1 w-5 h-5 rounded-full border-4 border-navy bg-gray-600 group-hover:bg-teal group-hover:scale-125 transition-all duration-300" />
                                        
                                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-2">
                                            <h3 className="text-xl font-bold text-white">{item.title}</h3>
                                            <span className="text-teal font-medium">@ {item.company}</span>
                                            <span className="text-sm text-gray-500 ml-auto">{item.year}</span>
                                        </div>
                                        <p className="text-gray-400 max-w-2xl">{item.description}</p>
                                        <div className="mt-3 flex gap-2">
                                            <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400 border border-white/5">
                                                {item.industry}
                                            </span>
                                            <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400 border border-white/5">
                                                {item.category}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="projects"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid grid-cols-1 gap-6"
                        >
                            {PROJECTS.map((project, idx) => (
                                <div key={project.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-colors">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-bold text-white">{project.title}</h3>
                                        <span className="px-3 py-1 rounded-full bg-gold/10 text-gold text-sm font-bold border border-gold/20">
                                            {project.metric}
                                        </span>
                                    </div>
                                    <p className="text-gray-400 mb-4">{project.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="text-xs text-gray-500 px-2 py-1 bg-black/20 rounded">#{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
      </div>
    </div>
  );
}