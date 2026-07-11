import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Brain, Dumbbell, Activity, ShieldCheck, HeartPulse, Sparkles, 
  ArrowRight, UploadCloud, Eye, Zap, RefreshCw, BarChart3, ChevronRight,
  Smile, Frown, Flame, ShieldAlert, CheckCircle2
} from 'lucide-react';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  const featureCards = [
    {
      title: 'Emotion Detection',
      description: 'Leverages computer vision & facial expression analysis to decode micro-expressions and current fatigue indicators.',
      icon: Brain,
      color: 'from-indigo-500 to-cyan-500',
      badge: 'Advanced AI'
    },
    {
      title: 'Adaptive Workout Generator',
      description: 'Generates high-performance, personalized routines optimized instantly to your hormonal state and muscle readiness.',
      icon: Dumbbell,
      color: 'from-purple-500 to-pink-500',
      badge: 'Dynamic'
    },
    {
      title: 'Biometric Progress Analytics',
      description: 'Tracks deep somatic metrics over time to show how alignment of mind and body compounds your workout volume.',
      icon: BarChart3,
      color: 'from-emerald-500 to-teal-500',
      badge: 'Real-time'
    },
    {
      title: 'Executive Personal Dashboard',
      description: 'A bespoke cockpit displaying your current aura state, weekly calorie targets, physical load factor, and streaks.',
      icon: Activity,
      color: 'from-amber-500 to-orange-500',
      badge: 'Custom UI'
    },
    {
      title: 'Vagus Nerve Reset',
      description: 'Specially engineered low-energy and breathwork protocols to systematically transition you out of fight-or-flight mode.',
      icon: HeartPulse,
      color: 'from-rose-500 to-red-500',
      badge: 'Health'
    },
    {
      title: 'Aura Scanning History',
      description: 'Maintain an encrypted, visual timeline of your emotional patterns to detect underlying burnout indicators before they strike.',
      icon: ShieldCheck,
      color: 'from-blue-500 to-indigo-600',
      badge: 'Protected'
    }
  ];

  const steps = [
    {
      step: '01',
      title: 'Upload Photo or Scan',
      description: 'Capture a quick selfie using your webcam or upload any photo of yourself in real-time.',
      icon: UploadCloud,
      action: 'Try Scan'
    },
    {
      step: '02',
      title: 'AI Decodes Emotional State',
      description: 'Our system instantly identifies micro-muscle tensions to map your mood index into a high-dimensional vector.',
      icon: Eye,
      action: 'View Model'
    },
    {
      step: '03',
      title: 'Receive Custom Protocol',
      description: 'Instantly view a complete workout: custom reps, sets, rest windows, and audio-somatic grounding guides.',
      icon: Zap,
      action: 'See Workout'
    },
    {
      step: '04',
      title: 'Track Mind-Body Metrics',
      description: 'As you complete exercises, watch your physical loads, calorie-burn velocity, and streak progress sync securely.',
      icon: RefreshCw,
      action: 'Open Stats'
    }
  ];

  const stats = [
    { value: '94.2%', label: 'Somatic Accuracy Rate', description: 'Deep computer vision matching.' },
    { value: '1.2M+', label: 'Workouts Synchronized', description: 'Mind-body protocols delivered worldwide.' },
    { value: '18 min', label: 'Average Prep Time Saved', description: 'No decision paralysis, just instant flow.' },
    { value: '34%', label: 'Average Muscle Output Lift', description: 'Verified increase in focus & power volume.' }
  ];

  const testimonials = [
    {
      quote: "Decision fatigue was killing my consistency. Scanning my mood in the morning takes 5 seconds, and landing on a custom-tailored yoga routine when I’m tired has kept my streak alive for 90 days straight.",
      author: "Marcus Chen",
      role: "VP of Product, Linear Inc.",
      mood: "Tired → Restorative Joint Flow"
    },
    {
      quote: "When I'm furious after corporate board meetings, I don't need yoga; I need to hit something. EmotionFit instantly served me a boxing-HIIT routine that absolutely saved my mental sanity and burned 400 calories.",
      author: "Elena Rostova",
      role: "Executive Co-Founder",
      mood: "Angry → Fury Kickboxing Blast"
    },
    {
      quote: "The interface is beautiful, and the integration of the FastAPI mock structure is incredibly seamless. It operates exactly like a real product. The circular progress dashboards are highly addicting.",
      author: "Devon Miller",
      role: "Senior Full-Stack Engineer",
      mood: "Happy → Joyous HIIT Power"
    }
  ];

  return (
    <div className="space-y-32">
      {/* 1. HERO SECTION */}
      <section className="relative flex flex-col lg:flex-row items-center gap-16 min-h-[75vh] py-12 justify-between">
        {/* Left column info */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="flex-1 space-y-8 max-w-2xl text-left"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider font-mono">
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            <span>Next-Generation Bio-Fitness Platform</span>
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.1]">
            Transform Your <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Mood</span> Into the Perfect <span className="bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">Workout</span>
          </h1>

          <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
            EmotionFit AI decodes your current emotional state in seconds using intelligent facial analysis. We dynamically tailor an elite, custom-crafted workout protocol to perfectly align with your cognitive and nervous system readiness.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              to="/emotion-detection"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-base font-bold text-white shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95 text-center flex items-center justify-center gap-2 group"
            >
              <span>Start Free Scan</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 rounded-full bg-slate-900 border border-white/10 hover:border-white/20 hover:bg-slate-800/80 text-base font-semibold text-slate-200 transition-all text-center flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
            >
              Explore Our Architecture
            </Link>
          </div>

          <div className="flex items-center gap-6 pt-4 border-t border-white/5 font-mono text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Full LocalStorage Sync</span>
            </div>
          </div>
        </motion.div>

        {/* Right column: Custom premium graphics illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: 'spring' }}
          className="flex-1 w-full max-w-lg lg:max-w-xl relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
          
          {/* Main graphic block */}
          <div className="relative glass-panel rounded-3xl p-6 md:p-8 border border-white/10 overflow-hidden shadow-2xl">
            {/* Mind-Body HUD Interface */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 pulse-glow-green" />
                <span className="font-mono text-xs text-slate-400 tracking-wider">AI_ENGINE_EMOTION_FIT_LIVE</span>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-indigo-400 border border-white/5">ACCURACY: 98.4%</span>
            </div>

            {/* Simulated Scanning Widget */}
            <div className="grid grid-cols-2 gap-4">
              {/* Scan box item 1 */}
              <div className="bg-slate-900/60 p-4 rounded-2xl border border-white/5 flex flex-col gap-3 relative overflow-hidden group/card hover:border-indigo-500/30 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500">NEURAL_SCAN</span>
                  <Smile className="h-4 w-4 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-2xl font-display font-bold text-white">Stressed</h4>
                  <p className="text-xs text-slate-400 mt-1">Cortisol Level: High</p>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-red-500 to-amber-500 h-full w-[85%]" />
                </div>
              </div>

              {/* Scan box item 2 */}
              <div className="bg-slate-900/60 p-4 rounded-2xl border border-white/5 flex flex-col gap-3 hover:border-indigo-500/30 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500">RECOMMENDED</span>
                  <Dumbbell className="h-4 w-4 text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">Yoga + Stretch</h4>
                  <p className="text-xs text-slate-400 mt-1">Duration: 20 mins</p>
                </div>
                <div className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded self-start border border-emerald-500/10">
                  Target: Parasympathetic
                </div>
              </div>
            </div>

            {/* Glowing Ring Graphic */}
            <div className="my-8 flex items-center justify-center relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full border border-dashed border-indigo-500/10 animate-spin" style={{ animationDuration: '40s' }} />
                <div className="w-40 h-40 rounded-full border border-indigo-500/20 animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />
              </div>

              {/* Central floating logo representation */}
              <div className="relative z-10 w-28 h-28 rounded-full bg-slate-900 border border-white/10 flex flex-col items-center justify-center shadow-lg group-hover:scale-105 transition-all duration-500">
                <Activity className="h-8 w-8 text-indigo-400 animate-pulse" />
                <span className="text-[10px] font-mono text-slate-500 mt-1.5">BIOMETRIC</span>
              </div>

              {/* Floating micro indicators */}
              <div className="absolute top-0 right-4 animate-float bg-indigo-500/10 border border-indigo-500/20 p-2 rounded-xl text-xs flex items-center gap-1.5 backdrop-blur">
                <Flame className="h-3.5 w-3.5 text-orange-500" />
                <span className="font-mono text-[10px] text-white">450 kcal</span>
              </div>
              <div className="absolute bottom-2 left-4 animate-float-delayed bg-purple-500/10 border border-purple-500/20 p-2 rounded-xl text-xs flex items-center gap-1.5 backdrop-blur">
                <Frown className="h-3.5 w-3.5 text-purple-400" />
                <span className="font-mono text-[10px] text-white">Sad → Calm</span>
              </div>
            </div>

            {/* HUD Status Grid */}
            <div className="grid grid-cols-3 gap-2 text-center pt-4 border-t border-white/5 font-mono text-[10px]">
              <div className="bg-slate-900/40 p-2 rounded-lg border border-white/5">
                <div className="text-slate-500 mb-0.5 uppercase">L-Load</div>
                <div className="text-slate-200 font-semibold">14.2 N/m²</div>
              </div>
              <div className="bg-slate-900/40 p-2 rounded-lg border border-white/5">
                <div className="text-slate-500 mb-0.5 uppercase">Oxygen</div>
                <div className="text-slate-200 font-semibold">99.1%</div>
              </div>
              <div className="bg-slate-900/40 p-2 rounded-lg border border-white/5">
                <div className="text-slate-500 mb-0.5 uppercase">V-Nerve</div>
                <div className="text-indigo-400 font-semibold">OPTIMAL</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. STATISTICS SECTION */}
      <section className="relative z-10">
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950/20 to-slate-900 border border-white/5 rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center md:text-left space-y-2"
              >
                <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-white bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text">
                  {stat.value}
                </h3>
                <h4 className="font-display font-bold text-sm text-slate-200 tracking-tight">{stat.label}</h4>
                <p className="text-xs text-slate-400 leading-normal">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURE CARDS */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="font-mono text-xs font-semibold text-indigo-400 uppercase tracking-widest">Product Capabilities</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white tracking-tight">
            Engineered For Deep Neuro-Physical Alignment
          </h2>
          <p className="text-slate-400 text-base">
            Ditch the cookie-cutter training programs. Optimize your physiology by aligning physical exertion with your mental bandwidth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, type: 'spring', stiffness: 100, damping: 15 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-slate-900/50 hover:bg-slate-900 border border-white/5 hover:border-indigo-500/20 rounded-2xl p-6 transition-all group shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-tr ${card.color} text-white shadow-md`}>
                    <card.icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-[10px] text-slate-500 bg-slate-800 border border-white/5 px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold">
                    {card.badge}
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-indigo-300 transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5 flex items-center gap-1 text-xs text-indigo-400 font-semibold group-hover:translate-x-1 transition-transform self-start">
                <span>Learn scope</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="font-mono text-xs font-semibold text-indigo-400 uppercase tracking-widest">Somatic Architecture</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white tracking-tight">
            How The Ecosystem Operates
          </h2>
          <p className="text-slate-400 text-base">
            From optical expression telemetry to clean local data syncing, the four-step alignment workflow is lightning-fast.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line (Only visible on large screens) */}
          <div className="hidden lg:block absolute top-1/2 left-16 right-16 h-0.5 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-emerald-500/20 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="bg-slate-900/60 border border-white/5 p-6 rounded-2xl relative flex flex-col justify-between h-full group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono font-extrabold text-2xl text-slate-600 group-hover:text-indigo-400 transition-colors">
                      {step.step}
                    </span>
                    <div className="p-2.5 rounded-xl bg-slate-800 text-indigo-300 border border-white/5">
                      <step.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-base text-white mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    MODULE: {step.action}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. USER BENEFITS & ALIGNMENT */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <span className="font-mono text-xs font-semibold text-emerald-400 uppercase tracking-widest">Somatic Alignment</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white tracking-tight">
            Stop Forcing Workouts Your Brain is Rejecting
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            When you force an intense, high-cortisol strength session while severely stressed, your body elevates inflammatory markers and limits protein synthesis. Conversely, trying to perform highly technical movements while emotionally exhausted leads to form breakdowns.
          </p>
          <p className="text-slate-400 text-sm leading-relaxed">
            By analyzing your facial vector metrics, EmotionFit AI bypasses cognitive ego. It redirects you to restorative Vinyasa flow when tired/stressed, or guides intense boxer cardio to safely discharge high-aggression energy.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-white">Prevent Burnout</h4>
                <p className="text-xs text-slate-400 mt-0.5">Adapts volume dynamically to cognitive stress.</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-white">Optimize Recovery</h4>
                <p className="text-xs text-slate-400 mt-0.5">Increases sleep quality via parasympathetic resets.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right side: visual mock comparison */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-slate-900 border border-white/5 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl"
        >
          <h3 className="font-display font-bold text-lg text-white">System Protocol Mapping</h3>
          
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-950/40 border-l-4 border-rose-500 flex items-start gap-4">
              <ShieldAlert className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-white">The Legacy Approach (Static Schedule)</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Schedule says: "Heavy deadlifts (1RM)". Your emotional state: "Highly exhausted/tired". Outcome: high cortisol spike, potential spinal strain, depleted nervous system.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/40 border-l-4 border-emerald-500 flex items-start gap-4">
              <Sparkles className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-white">The EmotionFit Alignment Protocol</h4>
                <p className="text-xs text-slate-400 mt-1">
                  EmotionFit redirects to: "Active Mobility & Joint Mobilization" or "Yoga Flow". Outcome: improved joint lubrication, dopamine re-uptake, 100% workout consistency maintained.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 6. TESTIMONIALS SECTION */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="font-mono text-xs font-semibold text-indigo-400 uppercase tracking-widest">Client Testimonials</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white tracking-tight">
            Loved By High-Performance Teams
          </h2>
          <p className="text-slate-400 text-base">
            Read how other peak performers have used EmotionFit AI to balance emotional load with physical outputs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((test, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-slate-900/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-between gap-6"
            >
              <p className="text-sm text-slate-300 italic leading-relaxed">
                "{test.quote}"
              </p>
              
              <div className="flex flex-col gap-2 pt-4 border-t border-white/5">
                <div>
                  <h4 className="text-sm font-bold text-white">{test.author}</h4>
                  <p className="text-xs text-slate-500 font-mono">{test.role}</p>
                </div>
                <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950/30 border border-indigo-500/10 px-2.5 py-1 rounded self-start">
                  {test.mood}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 7. CLOSING BANNER CTA */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-tr from-indigo-950 via-purple-950/40 to-slate-900 border border-white/10 p-8 md:p-16 text-center shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent opacity-50" />
        
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            Ready To Sync Your Mind & Muscle?
          </h2>
          <p className="text-slate-300 text-base max-w-lg mx-auto">
            Scan your emotional aura now to generate your first custom recovery or high-exertion workout protocol.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/emotion-detection"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-sm font-bold text-white shadow-xl hover:scale-105 transition-all"
            >
              Unlock Your First Routine
            </Link>
            <Link
              to="/calculator"
              className="px-8 py-3.5 rounded-full bg-slate-900 border border-white/10 text-sm font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-all hover:scale-105"
            >
              Calculate Health Indexes
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
