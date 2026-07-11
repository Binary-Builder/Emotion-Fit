import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Award, Flame, Calendar, Sparkles, Brain, Clock, ShieldCheck, 
  Trash2, RefreshCw, Trophy, Zap, Star, Compass, HelpCircle, CheckCircle2
} from 'lucide-react';
import { workoutService } from '../services/workoutService';
import { useToast } from '../context/ToastContext';
import { CompletedWorkout, Achievement, UserStats } from '../types/types';

const ACHIEVEMENT_ICONS: Record<string, any> = {
  Camera: Brain,
  Flame: Flame,
  Zap: Zap,
  Sparkles: Sparkles,
  Scale: ShieldCheck
};

export default function ProgressTracker() {
  const [history, setHistory] = useState<CompletedWorkout[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    // Check and trigger unlocking achievements dynamically
    workoutService.checkAndUnlockAchievements();
    
    setHistory(workoutService.getCompletedWorkouts());
    setAchievements(workoutService.getAchievements());
    setStats(workoutService.getStats());
  }, []);

  const handleResetData = () => {
    if (confirm('Are you sure you want to wipe your local fitness and aura scan databases? This cannot be undone.')) {
      localStorage.removeItem('completed_workouts');
      localStorage.removeItem('emotion_history');
      localStorage.removeItem('user_stats');
      localStorage.removeItem('unlocked_achievements');
      showToast('Local database successfully formatted.', 'info');
      
      setHistory([]);
      setAchievements(workoutService.getAchievements());
      setStats(workoutService.getStats());
    }
  };

  const totalCalories = history.reduce((sum, item) => sum + item.caloriesBurned, 0);
  const totalDuration = history.reduce((sum, item) => sum + item.duration, 0);
  const totalCompleted = history.length;
  const unlockedCount = achievements.filter((ach) => ach.unlockedAt).length;

  return (
    <div className="space-y-12">
      
      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="font-mono text-xs font-semibold text-indigo-400 uppercase tracking-widest">Somatic Ledger</span>
        <h1 className="font-display font-extrabold text-3xl md:text-5xl text-white tracking-tight">
          Progress Timeline
        </h1>
        <p className="text-slate-400 text-sm md:text-base">
          Audit your high-performance somatic metrics, unlocked neurological milestones, and completed workouts.
        </p>
      </div>

      {/* Grid: Stats Overview & Streak Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Metrics & Reset */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel rounded-3xl p-6 md:p-8 border border-white/10 shadow-lg space-y-6">
            <h3 className="font-display font-bold text-lg text-white">Cumulative Stats</h3>
            
            <div className="space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/20 border border-white/5">
                <span className="text-slate-400 uppercase">Completed Protocols</span>
                <span className="text-sm font-bold text-white">{totalCompleted} Sessions</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/20 border border-white/5">
                <span className="text-slate-400 uppercase">Energy Cleared</span>
                <span className="text-sm font-bold text-orange-400">~{totalCalories} kcal</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/20 border border-white/5">
                <span className="text-slate-400 uppercase">Time Invested</span>
                <span className="text-sm font-bold text-indigo-400">{totalDuration} mins</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/20 border border-white/5">
                <span className="text-slate-400 uppercase">Unlocked Achievements</span>
                <span className="text-sm font-bold text-emerald-400">{unlockedCount} / {achievements.length}</span>
              </div>
            </div>

            <button
              onClick={handleResetData}
              className="w-full py-3 rounded-xl bg-rose-950/20 hover:bg-rose-950/40 border border-rose-500/20 hover:border-rose-500/40 text-rose-300 font-semibold text-xs font-mono transition-all flex items-center justify-center gap-1.5"
            >
              <Trash2 className="h-4 w-4" />
              <span>Reset Database Ledger</span>
            </button>
          </div>

          {/* Quick Informational Box */}
          <div className="bg-slate-900 border border-white/5 rounded-3xl p-6 md:p-8 space-y-4">
            <h4 className="font-display font-bold text-sm text-slate-200">Consistency Quotient</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Maintained streaks regulate heart rate variability (HRV) and increase overall compliance. The 3-day milestone establishes a basic neurological habit loop.
            </p>
          </div>
        </div>

        {/* Right Column: Streaks & Timeline representation */}
        <div className="lg:col-span-8 bg-slate-900/40 border border-white/5 rounded-3xl p-6 md:p-8 space-y-8 shadow-lg">
          
          {/* Daily Streak Grid Representation */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-base text-white">Habit Streak Progression</h3>
              {stats && (
                <div className="flex items-center gap-1 text-xs font-mono text-orange-400">
                  <Flame className="h-4 w-4 text-orange-500 animate-pulse" />
                  <span className="font-bold">{stats.streak} Day Active Streak</span>
                </div>
              )}
            </div>

            {/* Quick 7-Day calendar visualization */}
            <div className="grid grid-cols-7 gap-3">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
                // For beauty, let's illuminate the days if they have streaks
                const todayIdx = (new Date().getDay() + 6) % 7; // Mon is 0, Sun is 6
                const isCompletedDay = stats && stats.streak > 0 && idx <= todayIdx && idx > todayIdx - stats.streak;
                return (
                  <div
                    key={day}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      isCompletedDay
                        ? 'bg-orange-950/30 border-orange-500/30 text-orange-400 shadow-md shadow-orange-500/5'
                        : 'bg-slate-950/20 border-white/5 text-slate-500'
                    }`}
                  >
                    <span className="font-mono text-[9px] uppercase block">{day}</span>
                    <div className="mt-2 flex justify-center">
                      {isCompletedDay ? (
                        <Flame className="h-4 w-4 text-orange-500 fill-orange-500" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4 text-slate-700" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Locked / Unlocked Badges / Achievements Grid */}
          <div className="space-y-4 pt-6 border-t border-white/5">
            <h3 className="font-display font-bold text-base text-white">Somatic Medals & Achievements</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((ach) => {
                const IconComponent = ACHIEVEMENT_ICONS[ach.icon] || Trophy;
                const isUnlocked = !!ach.unlockedAt;
                return (
                  <div
                    key={ach.id}
                    className={`p-4 rounded-2xl border transition-all flex items-start gap-4 ${
                      isUnlocked
                        ? 'bg-gradient-to-tr from-indigo-950/40 to-slate-900 border-indigo-500/20 shadow-md'
                        : 'bg-slate-950/20 border-white/5 opacity-50'
                    }`}
                  >
                    <div className={`p-3 rounded-xl shrink-0 border ${
                      isUnlocked 
                        ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' 
                        : 'bg-slate-900 border-white/5 text-slate-600'
                    }`}>
                      <IconComponent className="h-5 w-5" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">{ach.title}</h4>
                        {isUnlocked && (
                          <span className="text-[8px] font-mono font-bold bg-indigo-950 border border-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded uppercase">
                            Unlocked
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 leading-normal">{ach.description}</p>
                      <span className="text-[10px] font-mono text-slate-500 block">
                        Condition: {ach.condition}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* Dynamic Milestones / Historical Session Timelines */}
      <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-6 md:p-8 space-y-6 shadow-lg">
        <h3 className="font-display font-bold text-lg text-white">Somatic Log Chronology</h3>
        
        {history.length > 0 ? (
          <div className="relative pl-6 md:pl-8 border-l border-white/5 space-y-8 py-2">
            {history.map((log, i) => (
              <div key={log.id} className="relative">
                {/* Timeline node */}
                <span className="absolute -left-[31px] md:-left-[39px] top-1 w-4 h-4 rounded-full bg-indigo-600 border-4 border-[#0F172A] shadow-md" />
                
                <div className="glass-panel p-5 rounded-2xl border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest font-semibold bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-500/10">
                        {log.emotion} Aura
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        {new Date(log.timestamp).toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} @ {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <h4 className="font-display font-bold text-base text-white">{log.workoutName}</h4>
                  </div>

                  <div className="flex items-center gap-6 font-mono text-sm">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 block uppercase">Energy burned</span>
                      <span className="font-bold text-orange-400">~{log.caloriesBurned} kcal</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 block uppercase">Total duration</span>
                      <span className="font-bold text-indigo-400">{log.duration} mins</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-sm text-slate-500 font-mono">
            Your somatic timeline ledger is currently empty. Complete any prescription sequence to log your first checkpoint.
          </div>
        )}
      </div>

    </div>
  );
}
