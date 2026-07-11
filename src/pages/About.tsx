import { motion } from 'motion/react';
import { 
  ShieldCheck, Brain, Code2, Cpu, Database, LayoutDashboard, 
  Layers, Lock, Sparkles, ExternalLink
} from 'lucide-react';

export default function About() {
  const specs = [
    { name: 'Core Architecture', value: 'React 19 + TypeScript' },
    { name: 'Style System', value: 'Tailwind CSS v4 + Inter Google Font' },
    { name: 'Animations Engine', value: 'Framer Motion (motion/react)' },
    { name: 'Interactive Charts', value: 'Recharts Responsive Engines' },
    { name: 'Persistent Layer', value: 'Client-Side Key-Value LocalStorage' },
    { name: 'FastAPI Simulation', value: 'Services Abstracted 2s Latency Model' }
  ];

  return (
    <div className="space-y-16">
      
      {/* 1. HERO HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="font-mono text-xs font-semibold text-indigo-400 uppercase tracking-widest">Somatic Disclosure</span>
        <h1 className="font-display font-extrabold text-3xl md:text-5xl text-white tracking-tight">
          About EmotionFit AI
        </h1>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          EmotionFit AI is a premium, portfolio-grade proof-of-concept. It demonstrating modern full-stack engineering, interactive interface patterns, and responsive glassmorphic designs.
        </p>
      </div>

      {/* 2. ARCHITECTURE OVERVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: System details */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 uppercase tracking-widest font-mono">
            <Cpu className="h-3.5 w-3.5" />
            <span>Somatic AI Stack</span>
          </div>

          <h2 className="font-display font-bold text-2xl md:text-3xl text-white tracking-tight">
            How The Ecosystem Solves Physical Alignment
          </h2>
          
          <p className="text-slate-300 text-sm leading-relaxed">
            The platform is built using a highly modular service-oriented architecture. Instead of hardcoding logic inside individual React components, all API communications and AI computations are abstracted into clean service classes.
          </p>

          <p className="text-slate-400 text-xs leading-relaxed">
            This design preserves a strict contract matching what a FastAPI or Django ML pipeline would expect. Swapping the simulated mock endpoint in <code>emotionService.ts</code> with a live Python PyTorch facial-landmark detection model requires zero edits to the user interface.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-900 border border-white/5 flex gap-3">
              <Brain className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-white">Emotion-Based Models</h4>
                <p className="text-xs text-slate-400 mt-1">Calibrates exertion thresholds directly to emotional valence vectors.</p>
              </div>
            </div>
            
            <div className="p-4 rounded-xl bg-slate-900 border border-white/5 flex gap-3">
              <LayoutDashboard className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-white">Interactive Cockpit</h4>
                <p className="text-xs text-slate-400 mt-1">Updates streaks, calorie burns, and achievements instantly from local storage.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Specifications HUD */}
        <div className="lg:col-span-5 bg-slate-900/60 border border-white/5 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
          <h3 className="font-display font-bold text-base text-white">Ecosystem Specifications</h3>
          
          <div className="space-y-3 font-mono text-xs">
            {specs.map((spec, i) => (
              <div key={i} className="flex justify-between p-3.5 rounded-xl bg-slate-950/40 border border-white/5">
                <span className="text-slate-500 uppercase">{spec.name}</span>
                <span className="text-slate-200 font-semibold">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 3. SIMULATION DISCLOSURE (CRITICAL MANDATE) */}
      <div className="bg-gradient-to-r from-amber-950/20 via-slate-900 to-amber-950/20 border border-amber-500/15 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto shadow-md">
            <ShieldCheck className="h-6 w-6" />
          </div>
          
          <h3 className="font-display font-bold text-xl text-white">Technological Disclosure</h3>
          
          <p className="text-slate-300 text-sm leading-relaxed">
            Please be advised that facial emotion detection and micro-tension landmark scans are <strong>completely simulated for demonstration and portfolio representation purposes</strong>. 
          </p>
          
          <p className="text-xs text-slate-400 leading-relaxed">
            The scanner mimics a standard machine-learning FastAPI prediction latency using a 2-second asynchronous delay. This ensures recruiters can inspect real, working UI states, interactive webcam canvas triggers, and robust LocalStorage data syncing without requiring an active external cloud-compute billing plan.
          </p>
        </div>
      </div>

    </div>
  );
}
