import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { HelpCircle, Brain, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-8">
      
      {/* Visual illustration of disaligned brain */}
      <motion.div
        initial={{ rotate: -10, scale: 0.9, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 10 }}
        className="w-24 h-24 rounded-3xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shadow-lg"
      >
        <Brain className="h-12 w-12 text-indigo-400 animate-pulse" />
      </motion.div>

      <div className="space-y-3 max-w-md">
        <span className="font-mono text-xs font-semibold text-rose-400 uppercase tracking-widest block">Error Code 404</span>
        <h1 className="font-display font-extrabold text-3xl md:text-4xl text-white tracking-tight">
          Aura Coordinate Disaligned
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          The requested path is outside the verified somatic parameters. There are no workouts mapped to this emotional dimension.
        </p>
      </div>

      <Link
        to="/"
        className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-sm text-white shadow-lg flex items-center gap-2 transition-all hover:scale-105"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Return to Somatic Base</span>
      </Link>

    </div>
  );
}
