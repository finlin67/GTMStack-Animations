import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Rocket, Linkedin, Twitter, Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const NavLink = ({ to, children, onClick }: { to: string; children?: React.ReactNode; onClick?: () => void }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${
        isActive ? 'text-teal' : 'text-gray-300 hover:text-white'
      }`}
    >
      {children}
      {isActive && (
        <motion.div
          layoutId="navbar-underline"
          className="absolute left-0 bottom-0 w-full h-0.5 bg-teal"
          initial={false}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </Link>
  );
};

export default function Layout({ children }: { children?: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy to-midnight text-white flex flex-col font-sans overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-navy/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-gradient-to-tr from-teal to-blue-600 rounded-lg group-hover:scale-105 transition-transform">
                <Rocket className="h-6 w-6 text-white" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">
                GTMStack<span className="text-teal">.pro</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-2">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/about">About Me</NavLink>
              <NavLink to="/expertise">Expertise</NavLink>
              <Link
                to="/#contact"
                className="ml-4 px-5 py-2.5 rounded-full bg-teal hover:bg-teal-hover text-white font-semibold transition-all shadow-[0_0_20px_rgba(0,168,168,0.3)] hover:shadow-[0_0_30px_rgba(0,168,168,0.5)]"
              >
                Let's Talk
              </Link>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-300 hover:text-white"
              >
                {isOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-navy border-b border-white/5 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
                <NavLink to="/" onClick={() => setIsOpen(false)}>Home</NavLink>
                <NavLink to="/about" onClick={() => setIsOpen(false)}>About Me</NavLink>
                <NavLink to="/expertise" onClick={() => setIsOpen(false)}>Expertise</NavLink>
                <Link
                  to="/#contact"
                  onClick={() => setIsOpen(false)}
                  className="mt-4 w-full block text-center px-4 py-3 bg-teal text-white rounded-lg font-bold"
                >
                  Contact
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-20 relative">
        {/* Global Background Elements */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-deep/20 rounded-full blur-[120px]" />
        </div>
        
        <div className="relative z-10">
            {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-navy border-t border-white/5 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-teal" />
            <span className="font-display font-bold text-lg">GTMStack.pro</span>
          </div>
          <p className="text-gray-400 text-sm">© 2024 GTMStack. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-teal/20 hover:text-teal transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-teal/20 hover:text-teal transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-teal/20 hover:text-teal transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}