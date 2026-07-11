import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Dumbbell, Activity, Compass, Calculator, User, MessageSquare, ArrowUp, Menu, X, ShieldAlert } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();
  const { showToast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on page navigation
  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: '/', label: 'Home', icon: Compass },
    { path: '/emotion-detection', label: 'Aura Scan', icon: Brain },
    { path: '/workouts', label: 'Workouts', icon: Dumbbell },
    { path: '/dashboard', label: 'Dashboard', icon: Activity },
    { path: '/progress', label: 'Progress', icon: User },
    { path: '/calculator', label: 'Calculators', icon: Calculator },
    { path: '/about', label: 'About', icon: ShieldAlert },
    { path: '/contact', label: 'Contact', icon: MessageSquare },
  ];

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailInput = (e.currentTarget.elements.namedItem('email') as HTMLInputElement)?.value;
    if (emailInput) {
      showToast('Welcome to the fit-revolution! Newsletter subscription active.', 'success');
      e.currentTarget.reset();
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative text-slate-100 overflow-hidden bg-[#0F172A]">
      {/* Dynamic Ambient Background Blobs */}
      <div className="glow-blob w-[500px] h-[500px] bg-indigo-600 top-[-10%] left-[-10%]" />
      <div className="glow-blob w-[500px] h-[500px] bg-purple-600 bottom-[10%] right-[-10%]" />
      <div className="glow-blob w-[300px] h-[300px] bg-emerald-500/20 top-[40%] left-[40%]" />

      {/* Sticky Premium Navbar */}
      <nav
        id="app-navbar"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-panel py-3 shadow-lg shadow-slate-950/20'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 shadow-md group-hover:shadow-indigo-500/30 transition-all duration-300">
              <Brain className="h-5.5 w-5.5 text-white" />
              <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              EmotionFit<span className="text-indigo-400">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-900/40 p-1.5 rounded-full border border-white/5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 flex items-center gap-1.5 ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <item.icon className={`h-4 w-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-bg"
                      className="absolute inset-0 bg-slate-800/80 border border-white/10 rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Start CTA Button in Nav */}
          <div className="hidden lg:block">
            <Link
              to="/emotion-detection"
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95"
            >
              Scan Mood
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-800/50 border border-white/5 text-slate-300 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed top-[72px] left-0 w-full z-45 glass-panel border-b border-white/10 p-6 flex flex-col gap-4 shadow-xl"
          >
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-500/20 text-white'
                      : 'hover:bg-slate-800/50 text-slate-400 hover:text-white'
                  }`}
                >
                  <item.icon className={`h-5 w-5 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                  <span className="font-medium text-base">{item.label}</span>
                </Link>
              );
            })}
            <Link
              to="/emotion-detection"
              className="mt-2 text-center py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 font-semibold text-white shadow-lg"
            >
              Scan Your Mood
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Layout Body */}
      <main className="flex-grow pt-24 pb-12 relative z-10 px-4 md:px-6 max-w-7xl mx-auto w-full">
        {children}
      </main>

      {/* Premium Footer */}
      <footer className="relative z-10 bg-[#070D19] border-t border-white/5 py-16 px-6 mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="md:col-span-1.5 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <span className="font-display font-bold text-lg text-white">
                EmotionFit<span className="text-indigo-400">AI</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              The world's leading emotion-centric fitness platform. Tailoring high-performance workout protocols to your neurochemical emotional states.
            </p>
            <div className="flex gap-4 mt-2">
              {['GitHub', 'LinkedIn', 'Twitter', 'Instagram'].map((social) => (
                <a
                  key={social}
                  href={`https://${social.toLowerCase()}.com`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-mono text-slate-500 hover:text-indigo-400 transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display text-sm font-semibold tracking-wider text-slate-200 uppercase">Product</h4>
            <div className="flex flex-col gap-2.5">
              <Link to="/emotion-detection" className="text-sm text-slate-400 hover:text-white transition-colors">Aura Mood Scan</Link>
              <Link to="/workouts" className="text-sm text-slate-400 hover:text-white transition-colors">Smart Workouts</Link>
              <Link to="/dashboard" className="text-sm text-slate-400 hover:text-white transition-colors">User Dashboard</Link>
              <Link to="/calculator" className="text-sm text-slate-400 hover:text-white transition-colors">Health Calculators</Link>
            </div>
          </div>

          {/* Company Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display text-sm font-semibold tracking-wider text-slate-200 uppercase">Platform</h4>
            <div className="flex flex-col gap-2.5">
              <Link to="/about" className="text-sm text-slate-400 hover:text-white transition-colors">About AI System</Link>
              <Link to="/contact" className="text-sm text-slate-400 hover:text-white transition-colors">Connect / Contact</Link>
              <span className="text-sm text-slate-500 font-mono">Server Status: online</span>
              <span className="text-sm text-slate-500 font-mono">API version: v1.4.2</span>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display text-sm font-semibold tracking-wider text-slate-200 uppercase">Newsletter</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Subscribe for weekly emotion-science workout blueprints.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                name="email"
                required
                placeholder="Enter email"
                className="bg-slate-900 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-indigo-500 w-full"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm px-4 py-2 rounded-xl transition-all"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-white/5 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} EmotionFit AI. Engineered for deep body-mind alignment.</p>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <a href="#security" className="hover:text-slate-400 transition-colors">Security Disclosure</a>
          </div>
        </div>
      </footer>

      {/* Floating Scroll-to-Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-indigo-600 hover:bg-indigo-500 border border-white/10 text-white shadow-xl hover:shadow-indigo-500/20 hover:scale-110 active:scale-95 transition-all"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
