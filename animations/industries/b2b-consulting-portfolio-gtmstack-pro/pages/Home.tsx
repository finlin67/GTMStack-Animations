import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Users, Zap, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';

const FeatureCard = ({ icon: Icon, title, desc, delay }: { icon: any, title: string, desc: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="flex gap-4 items-start p-4 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
  >
    <div className="p-3 bg-teal/10 rounded-lg">
      <Icon className="h-6 w-6 text-teal" />
    </div>
    <div>
      <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
      <p className="text-sm text-gray-400">{desc}</p>
    </div>
  </motion.div>
);

export default function Home() {
  return (
    <div className="space-y-32 pb-32">
      {/* Hero Section */}
      <section className="min-h-[90vh] flex flex-col justify-center px-4 max-w-7xl mx-auto pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal/10 border border-teal/20 text-teal text-xs font-bold uppercase tracking-wider mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
              Available for Q4 Consulting
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
              Build your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal to-cyan-400">GTM Stack</span>
              <br /> for Growth.
            </h1>
            
            <p className="text-lg text-gray-400 mb-8 max-w-xl leading-relaxed">
              I help B2B SaaS companies align Product, Sales, and Marketing to unlock predictable revenue engines. From strategy to systems, let's scale.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/#contact"
                className="px-8 py-4 bg-teal hover:bg-teal-hover text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-teal/25 flex items-center justify-center gap-2"
              >
                Start Your Journey <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/expertise"
                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold text-lg transition-all flex items-center justify-center"
              >
                View Services
              </Link>
            </div>
          </motion.div>

          <div className="relative">
            {/* Abstract Graphic */}
            <motion.div 
              className="relative z-10 grid grid-cols-2 gap-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <StatCard label="Revenue Growth" value="87" suffix="%" delay={0.3} />
              <StatCard label="Pipeline Generated" value="12" suffix="M+" delay={0.4} />
              <StatCard label="Systems Integrated" value="45" suffix="+" delay={0.5} />
              <div className="bg-gradient-to-br from-purple-deep to-indigo-900 p-6 rounded-2xl flex items-center justify-center text-center border border-white/10">
                 <div>
                    <h3 className="text-xl font-bold text-white mb-1">Global Reach</h3>
                    <p className="text-sm text-purple-200">Strategies depoyed in 3 continents</p>
                 </div>
              </div>
            </motion.div>

            {/* Background blobs for hero graphic */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-teal/5 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </section>

      {/* Services Teaser */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Core Competencies</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Connecting the dots between high-level strategy and ground-level execution.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
                icon={BarChart3} 
                title="Revenue Strategy" 
                desc="Aligning pricing, packaging, and positioning for maximum LTV." 
                delay={0.1}
            />
             <FeatureCard 
                icon={Users} 
                title="Demand Generation" 
                desc="Building engines that capture and convert high-intent traffic." 
                delay={0.2}
            />
             <FeatureCard 
                icon={Zap} 
                title="RevOps Systems" 
                desc="Architecting the tech stack that powers your growth." 
                delay={0.3}
            />
        </div>
        
        <div className="mt-12 text-center">
             <Link to="/expertise" className="text-purple-muted hover:text-white font-medium inline-flex items-center gap-2 transition-colors">
                Explore full expertise matrix <ArrowRight className="w-4 h-4" />
             </Link>
        </div>
      </section>

      {/* Timeline Teaser */}
      <section className="bg-white/5 py-24 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
           <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                    <h2 className="text-3xl font-display font-bold mb-2">Proven Track Record</h2>
                    <p className="text-gray-400">A timeline of impact across multiple industries.</p>
                </div>
                <Link to="/about" className="px-6 py-2 rounded-full border border-purple-muted text-purple-muted hover:bg-purple-muted hover:text-white transition-colors">
                    View Interactive Timeline
                </Link>
           </div>
           
           <div className="relative border-l border-white/10 ml-4 md:ml-12 space-y-12">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="relative pl-8 md:pl-12">
                        <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-gold shadow-[0_0_10px_#FFD700]" />
                        <h3 className="text-xl font-bold text-white">Milestone {i}</h3>
                        <p className="text-gray-400 mt-1">Transformative growth achieved through strategic intervention.</p>
                    </div>
                ))}
           </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-midnight to-navy border border-teal/20 p-12 rounded-3xl relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(0deg,white,transparent)]" />
            
            <h2 className="text-4xl font-display font-bold mb-6 relative z-10">Ready to scale your <span className="text-teal">GTM Engine?</span></h2>
            <p className="text-gray-300 mb-8 max-w-lg mx-auto relative z-10">
                Currently accepting new clients for Q4 2024. Let's discuss your revenue goals.
            </p>
            
            <form className="max-w-md mx-auto space-y-4 relative z-10" onSubmit={(e) => e.preventDefault()}>
                <input 
                    type="email" 
                    placeholder="Enter your work email" 
                    className="w-full px-6 py-4 bg-black/30 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal transition-all"
                />
                <button className="w-full px-6 py-4 bg-teal hover:bg-teal-hover text-white font-bold rounded-xl transition-colors shadow-lg shadow-teal/20">
                    Get in Touch
                </button>
            </form>
        </motion.div>
      </section>
    </div>
  );
}