import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Activity, Flame, Calendar, Sparkles, Brain, Award, ChevronRight, 
  TrendingUp, Clock, Plus, BarChart2, CheckCircle2, AlertCircle
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, Cell } from 'recharts';
import { workoutService } from '../services/workoutService';
import { emotionService } from '../services/emotionService';
import { useToast } from '../context/ToastContext';
import { CompletedWorkout, Emotion, EmotionResponse } from '../types/types';

// Fallback historical logs to populate charts on first load (ensures aesthetic portfolio view)
const MOCK_HISTORICAL_WORKOUTS = [
  { day: 'Mon', calories: 280, duration: 25, emotion: 'Stressed' },
  { day: 'Tue', calories: 450, duration: 35, emotion: 'Happy' },
  { day: 'Wed', calories: 120, duration: 30, emotion: 'Sad' },
  { day: 'Thu', calories: 380, duration: 30, emotion: 'Angry' },
  { day: 'Fri', calories: 220, duration: 30, emotion: 'Neutral' },
  { day: 'Sat', calories: 0, duration: 0, emotion: 'None' },
  { day: 'Sun', calories: 0, duration: 0, emotion: 'None' }
];

const EMOTION_EMOJIS: Record<Emotion, string> = {
  Happy: '😊',
  Sad: '😔',
  Angry: '😠',
  Neutral: '😐',
  Stressed: '😣',
  Tired: '😴'
};

export default function Dashboard() {
  const [history, setHistory] = useState<CompletedWorkout[]>([]);
  const [scans, setScans] = useState<EmotionResponse[]>([]);
  const [stats, setStats] = useState<any>({});
  const { showToast } = useToast();

  useEffect(() => {
    setHistory(workoutService.getCompletedWorkouts());
    setScans(emotionService.getHistory());
    setStats(workoutService.getStats());
  }, []);

  // Compute total dynamic stats (combining local completed workouts + fallback mock)
  const currentWeeklyCalories = history.reduce((sum, item) => sum + item.caloriesBurned, 0);
  const currentWeeklyDuration = history.reduce((sum, item) => sum + item.duration, 0);
  
  // Weekly Target
  const weeklyCalorieTarget = stats.dailyCalorieTarget ? stats.dailyCalorieTarget * 7 : 2000;
  const weeklyCalorieProgress = Math.min(100, Math.round((currentWeeklyCalories / weeklyCalorieTarget) * 100));

  // Combine local completed sessions with the weekly chart data
  const chartData = MOCK_HISTORICAL_WORKOUTS.map((item, idx) => {
    // If the user completed actual workouts in the last couple of days, we can map them
    // For demonstration, let's inject completed workouts into the Sat/Sun or today's bar
    const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
    const daysMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentDayName = daysMap[today];

    if (item.day === currentDayName) {
      return {
        ...item,
        calories: item.calories + currentWeeklyCalories,
        duration: item.duration + currentWeeklyDuration,
      };
    }
    return item;
  });

  const moodBreakdown = scans.reduce((acc, scan) => {
    acc[scan.emotion] = (acc[scan.emotion] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const moodChartData = Object.entries(moodBreakdown).map(([name, value]) => ({
    name,
    value,
    emoji: EMOTION_EMOJIS[name as Emotion] || '❔'
  }));

  const latestScan = scans[0];
  const latestWorkout = history[0];

  return (
    <div className="space-y-10">
      
      {/* 1. DASHBOARD HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/5">
        <div className="space-y-1">
          <span className="font-mono text-xs font-semibold text-indigo-400 uppercase tracking-widest">Somatic Cockpit</span>
          <h1 className="font-display font-extrabold text-3xl md:text-4xl text-white tracking-tight">
            Personal Dashboard
          </h1>
          <p className="text-slate-400 text-sm">
            Manage your daily biometric scores, adaptive workouts, metabolic load, and emotional streaks.
          </p>
        </div>

        {/* CTA triggers */}
        <div className="flex items-center gap-3">
          <Link
            to="/emotion-detection"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-bold text-xs text-white shadow-lg flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
          >
            <Brain className="h-4 w-4" />
            <span>Scan Aura Mood</span>
          </Link>
          <Link
            to="/workouts"
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 font-semibold text-xs text-slate-200 border border-white/5 transition-all flex items-center gap-1.5 hover:scale-105"
          >
            <Plus className="h-4 w-4" />
            <span>Explore Routines</span>
          </Link>
        </div>
      </div>

      {/* 2. STATS CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Streak */}
        <motion.div
          whileHover={{ y: -4 }}
          className="bg-slate-900/60 border border-white/5 rounded-2xl p-6 flex flex-col justify-between shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-500 uppercase">Aura Streak</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/10">
              <Sparkles className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-white">{stats.streak || 0} Days</div>
            <p className="text-xs text-slate-400 mt-1">Keep checking in to avoid streak resets.</p>
          </div>
        </motion.div>

        {/* Card 2: Calories burned */}
        <motion.div
          whileHover={{ y: -4 }}
          className="bg-slate-900/60 border border-white/5 rounded-2xl p-6 flex flex-col justify-between shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-500 uppercase">Metabolism Velocity</span>
            <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/10">
              <Flame className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-white">~{currentWeeklyCalories} kcal</div>
            <p className="text-xs text-slate-400 mt-1">Active metabolic energy consumed this week.</p>
          </div>
        </motion.div>

        {/* Card 3: Today's State */}
        <motion.div
          whileHover={{ y: -4 }}
          className="bg-slate-900/60 border border-white/5 rounded-2xl p-6 flex flex-col justify-between shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-500 uppercase">Detected Aura</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/10">
              <Activity className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            {latestScan ? (
              <div className="flex items-center gap-2">
                <span className="text-2xl">{EMOTION_EMOJIS[latestScan.emotion]}</span>
                <span className="text-2xl font-extrabold text-white">{latestScan.emotion}</span>
              </div>
            ) : (
              <div className="text-lg font-bold text-slate-400">Not Scanned</div>
            )}
            <p className="text-xs text-slate-400 mt-1">
              {latestScan ? `Scanned: ${new Date(latestScan.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'Perform camera aura calibration.'}
            </p>
          </div>
        </motion.div>

        {/* Card 4: Weekly Progress Ring */}
        <motion.div
          whileHover={{ y: -4 }}
          className="bg-slate-900/60 border border-white/5 rounded-2xl p-6 flex flex-col justify-between shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-500 uppercase">Weekly Goal Progression</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/10">
              <Award className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <div className="relative w-14 h-14 shrink-0">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="28" cy="28" r="24" stroke="#1E293B" strokeWidth="4" fill="transparent" />
                <circle 
                  cx="28" 
                  cy="28" 
                  r="24" 
                  stroke="#7C3AED" 
                  strokeWidth="4" 
                  fill="transparent" 
                  strokeDasharray={151}
                  strokeDashoffset={151 - (151 * weeklyCalorieProgress) / 100}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] font-bold text-white">
                {weeklyCalorieProgress}%
              </div>
            </div>
            <div>
              <div className="text-sm font-bold text-slate-200">
                {currentWeeklyCalories} / {weeklyCalorieTarget} <span className="text-[10px] text-slate-500 font-mono">kcal</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">Custom weekly energy threshold.</p>
            </div>
          </div>
        </motion.div>

      </div>

      {/* 3. CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column Chart: Weekly Calories & Duration */}
        <div className="lg:col-span-8 bg-slate-900/40 border border-white/5 rounded-2xl p-6 md:p-8 shadow-lg space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <h3 className="font-display font-bold text-lg text-white">Metabolic & Duration Tracking</h3>
              <p className="text-xs text-slate-400 font-mono">Sync progression showing weekly active calorie outputs vs time.</p>
            </div>
            
            <div className="flex gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-indigo-600" />
                <span className="text-slate-300">Calories (kcal)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-purple-500" />
                <span className="text-slate-300">Duration (min)</span>
              </div>
            </div>
          </div>

          <div className="h-72 w-full pr-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDuration" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#475569" fontSize={11} tickLine={false} />
                <YAxis stroke="#475569" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1E293B', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px' }}
                  labelStyle={{ color: '#F8FAFC', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="calories" stroke="#4F46E5" strokeWidth={2.5} fillOpacity={1} fill="url(#colorCalories)" />
                <Area type="monotone" dataKey="duration" stroke="#7C3AED" strokeWidth={2.5} fillOpacity={1} fill="url(#colorDuration)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column Chart: Mood Distribution */}
        <div className="lg:col-span-4 bg-slate-900/40 border border-white/5 rounded-2xl p-6 md:p-8 shadow-lg space-y-6 flex flex-col justify-between">
          <div className="space-y-0.5">
            <h3 className="font-display font-bold text-lg text-white">Aura Mood Tendencies</h3>
            <p className="text-xs text-slate-400 font-mono">Statistical map of scanned emotional frequencies.</p>
          </div>

          {moodChartData.length > 0 ? (
            <div className="space-y-6 flex-1 flex flex-col justify-center">
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={moodChartData} layout="vertical" margin={{ left: -15, right: 5 }}>
                    <XAxis type="number" stroke="#475569" hide />
                    <YAxis dataKey="name" type="category" stroke="#475569" fontSize={11} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1E293B', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px' }}
                      labelStyle={{ color: '#F8FAFC' }}
                    />
                    <Bar dataKey="value" fill="#4F46E5" radius={[0, 8, 8, 0]}>
                      {moodChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#4F46E5' : '#7C3AED'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Mood list */}
              <div className="space-y-2">
                {moodChartData.slice(0, 3).map((mood, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs font-mono bg-slate-950/20 p-2 rounded-lg border border-white/5">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <span>{mood.emoji}</span>
                      <span>{mood.name}</span>
                    </span>
                    <span className="text-slate-400 font-bold">{mood.value} Scans</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 flex-1 flex flex-col items-center justify-center gap-3">
              <AlertCircle className="h-8 w-8 text-slate-500 animate-pulse" />
              <p className="text-xs text-slate-500 font-mono max-w-[200px]">
                No emotional telemetry records detected. Complete an Aura scan to start tracking tendencies.
              </p>
              <Link
                to="/emotion-detection"
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
              >
                Scan Now
              </Link>
            </div>
          )}
        </div>

      </div>

      {/* 4. CURRENT RECOMMENDATION DISMISSABLE TRAY */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
        
        {/* Left widget: Currently Matched Protocol */}
        <div className="md:col-span-7 bg-slate-900 border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 uppercase tracking-widest font-mono">
              <Clock className="h-3.5 w-3.5" />
              <span>Next Suggested Action</span>
            </div>

            <div className="space-y-2">
              <h3 className="font-display font-extrabold text-2xl text-white">
                {latestScan ? `Calibrated for: ${latestScan.emotion}` : 'Aura Scanner Pending'}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {latestScan 
                  ? `Based on your recent aura telemetry scanned at ${new Date(latestScan.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}, the system has selected a highly optimized physical prescription.`
                  : 'Establish physical alignment before exercising. Access your front-facing camera viewport to perform an emotional calibration.'
                }
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/5">
            <span className="text-[10px] font-mono text-slate-500">
              {latestScan ? `Matched Target: ${latestScan.recommendationId}` : 'Biometric target: unmapped'}
            </span>
            <Link
              to={latestScan ? `/workouts?emotion=${latestScan.emotion}` : '/emotion-detection'}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-xs text-white shadow-md flex items-center justify-center gap-1 transition-all hover:scale-105"
            >
              <span>{latestScan ? 'Initiate Routine' : 'Calibrate Aura'}</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Right widget: Recent completions Feed */}
        <div className="md:col-span-5 bg-slate-900 border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between gap-6 shadow-xl">
          <div className="space-y-4">
            <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
              <Calendar className="h-4 w-4 text-slate-400" />
              <span>Session History Logs</span>
            </h3>

            <div className="space-y-3 max-h-[160px] overflow-y-auto pr-1">
              {history.length > 0 ? (
                history.map((item, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-slate-950/30 border border-white/5 flex items-center justify-between text-xs"
                  >
                    <div className="space-y-1">
                      <h4 className="font-bold text-white max-w-[150px] truncate">{item.workoutName}</h4>
                      <span className="text-[9px] font-mono text-slate-500 block">
                        {new Date(item.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })} @ {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <div className="text-right font-mono">
                      <div className="font-semibold text-orange-400">~{item.caloriesBurned} kcal</div>
                      <div className="text-[9px] text-slate-500">{item.duration} mins</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-xs text-slate-500 font-mono">
                  No recently logged workouts.
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-white/5">
            <Link
              to="/progress"
              className="text-xs font-semibold font-mono text-indigo-400 hover:text-indigo-300 flex items-center gap-1 justify-end"
            >
              <span>Explore complete achievements timeline</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
