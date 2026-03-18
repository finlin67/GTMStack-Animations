'use client';

import React from 'react';
import SalesEnablementTile from './SalesEnablementTile';
import { Network, Search, TrendingUp, Timer, Rocket, FolderOpen, Eye, Sparkles, BarChart3, Share2, Mail } from 'lucide-react';

export default function SalesHeroLandingPage() {
    return (
        <>
            {/* TopNavBar */}
            <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
                <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-3 text-primary">
                            <div className="size-8 flex items-center justify-center bg-primary/10 rounded-lg">
                                <Network className="text-primary w-5 h-5" />
                            </div>
                            <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight">SalesHero</h2>
                        </div>
                        <nav className="hidden md:flex items-center gap-8">
                            <a className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#">Solutions</a>
                            <a className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#">Platform</a>
                            <a className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#">Pricing</a>
                            <a className="text-slate-600 dark:text-slate-300 text-sm font-medium hover:text-primary transition-colors" href="#">Resources</a>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        <label className="hidden sm:flex items-center relative group">
                            <Search className="absolute left-3 text-slate-400 group-focus-within:text-primary w-5 h-5 transition-colors" />
                            <input className="w-64 h-10 pl-10 pr-4 rounded-lg border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:ring-primary focus:border-primary transition-all" placeholder="Search insights..." />
                        </label>
                        <button className="bg-primary hover:bg-primary/90 text-white px-6 h-10 rounded-lg text-sm font-bold transition-all shadow-lg shadow-primary/20">
                            Get Started
                        </button>
                    </div>
                </div>
            </header>
            <main className="max-w-[1200px] mx-auto px-6">
                {/* HeroSection */}
                <section className="py-12 lg:py-20">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col gap-4">
                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider w-fit">
                                    New: Playbook Automation 2.0
                                </span>
                                <h1 className="text-slate-900 dark:text-white text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight">
                                    Accelerate Your <span className="text-primary">Sales Workflow</span>
                                </h1>
                                <p className="text-slate-600 dark:text-slate-400 text-lg max-w-lg">
                                    Boost win rates by 39% and reduce sales cycles by 28% with our automated enablement playbook and real-time buyer insights.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <button className="px-8 h-14 bg-primary text-white rounded-xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/25">
                                    Book Live Demo
                                </button>
                                <button className="px-8 h-14 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl font-bold text-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition-all">
                                    View Platform
                                </button>
                            </div>
                            <div className="flex items-center gap-4 pt-4 mt-4 border-t border-slate-200 dark:border-slate-800">
                                <div className="flex -space-x-3">
                                    <img className="w-10 h-10 rounded-full border-2 border-background-dark bg-slate-700 object-cover" src="https://picsum.photos/id/1005/40/40" alt="User 1" />
                                    <img className="w-10 h-10 rounded-full border-2 border-background-dark bg-slate-600 object-cover" src="https://picsum.photos/id/1011/40/40" alt="User 2" />
                                    <img className="w-10 h-10 rounded-full border-2 border-background-dark bg-slate-500 object-cover" src="https://picsum.photos/id/1027/40/40" alt="User 3" />
                                </div>
                                <p className="text-sm text-slate-500">Trusted by 500+ revenue teams globally</p>
                            </div>
                        </div>
                        <div className="w-full max-w-[500px] mx-auto lg:max-w-none">
                            <SalesEnablementTile />
                        </div>
                    </div>
                </section>
                {/* Stats Section */}
                <section className="py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex flex-col gap-2 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-wider">Win Rate</p>
                            <p className="text-slate-900 dark:text-white tracking-tight text-4xl font-black">+39%</p>
                            <div className="flex items-center gap-1 text-[#0bda57]">
                                <TrendingUp className="w-4 h-4" />
                                <p className="text-sm font-bold">+12% vs last quarter</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-wider">Sales Cycle</p>
                            <p className="text-slate-900 dark:text-white tracking-tight text-4xl font-black">-28%</p>
                            <div className="flex items-center gap-1 text-primary">
                                <Timer className="w-4 h-4" />
                                <p className="text-sm font-bold">14 days faster average</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-wider">Close Velocity</p>
                            <p className="text-slate-900 dark:text-white tracking-tight text-4xl font-black">+45%</p>
                            <div className="flex items-center gap-1 text-[#0bda57]">
                                <Rocket className="w-4 h-4" />
                                <p className="text-sm font-bold">+8% growth streak</p>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Charts Section */}
                <section className="py-12 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="flex-1 flex flex-col gap-6 p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-bold">Performance Analytics</p>
                                    <h3 className="text-slate-900 dark:text-white text-2xl font-bold">Close Velocity Curve</h3>
                                </div>
                                <div className="flex items-center gap-2 bg-[#0bda57]/10 text-[#0bda57] px-3 py-1 rounded-lg">
                                    <span className="text-xs font-black">+45.2%</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="h-64 relative">
                                    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 500 200">
                                        <defs>
                                            <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                                                <stop offset="0%" stopColor="#13a4ec" stopOpacity="0.3"></stop>
                                                <stop offset="100%" stopColor="#13a4ec" stopOpacity="0"></stop>
                                            </linearGradient>
                                        </defs>
                                        <path d="M0 160 Q50 140 100 150 T200 100 T300 120 T400 40 T500 20 L500 200 L0 200 Z" fill="url(#chartGradient)"></path>
                                        <path d="M0 160 Q50 140 100 150 T200 100 T300 120 T400 40 T500 20" fill="none" stroke="#13a4ec" strokeLinecap="round" strokeWidth="3"></path>
                                    </svg>
                                </div>
                                <div className="flex justify-between px-2 text-slate-400 text-[11px] font-bold tracking-widest uppercase">
                                    <span>JAN</span><span>MAR</span><span>MAY</span><span>JUL</span><span>SEP</span><span>NOV</span>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/3 flex flex-col gap-4">
                            <h3 className="text-slate-900 dark:text-white text-xl font-bold px-4">Core Platform Components</h3>
                            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 p-4">
                                <div className="relative group cursor-pointer overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 aspect-[4/3] lg:aspect-auto lg:h-24">
                                    <div className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-110" style={{ backgroundImage: `linear-gradient(rgba(16, 28, 34, 0.6), rgba(16, 28, 34, 0.6)), url("https://picsum.photos/seed/content/400/300")` }}></div>
                                    <div className="relative h-full flex items-center p-4 gap-4"><FolderOpen className="text-primary" /><p className="text-white text-sm font-bold">Content Library</p></div>
                                </div>
                                <div className="relative group cursor-pointer overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 aspect-[4/3] lg:aspect-auto lg:h-24">
                                    <div className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-110" style={{ backgroundImage: `linear-gradient(rgba(16, 28, 34, 0.6), rgba(16, 28, 34, 0.6)), url("https://picsum.photos/seed/buyer/400/300")` }}></div>
                                    <div className="relative h-full flex items-center p-4 gap-4"><Eye className="text-primary" /><p className="text-white text-sm font-bold">Buyer Insights</p></div>
                                </div>
                                <div className="relative group cursor-pointer overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 aspect-[4/3] lg:aspect-auto lg:h-24">
                                    <div className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-110" style={{ backgroundImage: `linear-gradient(rgba(16, 28, 34, 0.6), rgba(16, 28, 34, 0.6)), url("https://picsum.photos/seed/playbooks/400/300")` }}></div>
                                    <div className="relative h-full flex items-center p-4 gap-4"><Sparkles className="text-primary" /><p className="text-white text-sm font-bold">Playbooks</p></div>
                                </div>
                                <div className="relative group cursor-pointer overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 aspect-[4/3] lg:aspect-auto lg:h-24">
                                    <div className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-110" style={{ backgroundImage: `linear-gradient(rgba(16, 28, 34, 0.6), rgba(16, 28, 34, 0.6)), url("https://picsum.photos/seed/metrics/400/300")` }}></div>
                                    <div className="relative h-full flex items-center p-4 gap-4"><BarChart3 className="text-primary" /><p className="text-white text-sm font-bold">Advanced Metrics</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="mt-20 py-12 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
                <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-3 text-slate-400">
                        <Network className="w-5 h-5" />
                        <span className="text-sm font-bold uppercase tracking-widest">SalesHero © 2024</span>
                    </div>
                    <div className="flex gap-8">
                        <a className="text-slate-500 hover:text-primary transition-colors text-sm" href="#">Privacy Policy</a>
                        <a className="text-slate-500 hover:text-primary transition-colors text-sm" href="#">Terms of Service</a>
                        <a className="text-slate-500 hover:text-primary transition-colors text-sm" href="#">Security</a>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-primary hover:text-white transition-all cursor-pointer"><Share2 className="w-4 h-4" /></div>
                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-primary hover:text-white transition-all cursor-pointer"><Mail className="w-4 h-4" /></div>
                    </div>
                </div>
            </footer>
        </>
    );
}