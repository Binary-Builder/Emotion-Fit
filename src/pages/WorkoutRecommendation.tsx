import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Dumbbell, Clock, Flame, Shield, ArrowRight, CheckCircle2, ChevronRight, 
  Sparkles, Smile, Frown, Angry, Meh, HelpCircle, RefreshCw, X, Play, Info
} from 'lucide-react';
import { workoutService } from '../services/workoutService';
import { useToast } from '../context/ToastContext';
import { Workout, Emotion, Exercise } from '../types/types';

const EMOTIONS: Emotion[] = ['Happy', 'Sad', 'Angry', 'Neutral', 'Stressed', 'Tired'];

const MOOD_INFO: Record<Emotion, { label: string; emoji: string; color: string; bg: string; subtitle: string }> = {
  Happy: { label: 'HIIT + Running', emoji: '😊', color: 'from-emerald-500 to-teal-500 text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', subtitle: 'Elevated state, maximum cardiovascular capabilities.' },
  Sad: { label: 'Yoga + Comfort Walking', emoji: '😔', color: 'from-blue-500 to-indigo-500 text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20', subtitle: 'Low physical drive, focus on soothing endorphins.' },
  Angry: { label: 'Boxing + High Intensity', emoji: '😠', color: 'from-rose-500 to-pink-500 text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20', subtitle: 'High adrenaline, raw power output capacity.' },
  Neutral: { label: 'Upper Body Resistance', emoji: '😐', color: 'from-slate-500 to-zinc-500 text-slate-300', bg: 'bg-slate-500/10 border-slate-500/20', subtitle: 'Highly technical focus, optimal posture & core.' },
  Stressed: { label: 'Passive Deep Stretching', emoji: '😣', color: 'from-amber-500 to-orange-500 text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', subtitle: 'Deactivate sympathetic fight-or-flight.' },
  Tired: { label: 'Active Joint Recovery', emoji: '😴', color: 'from-violet-500 to-purple-500 text-indigo-400', bg: 'bg-violet-500/10 border-violet-500/20', subtitle: 'Low metabolic fuel, high-focus active recovery.' }
};

export default function WorkoutRecommendation() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | 'All'>('All');
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [activeWorkout, setActiveWorkout] = useState<Workout | null>(null);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>({});
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [restTimer, setRestTimer] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [workoutFinished, setWorkoutFinished] = useState(false);

  const { showToast } = useToast();

  // Load selected emotion from search parameters if present (e.g., direct redirect from scan!)
  useEffect(() => {
    const queryEmotion = searchParams.get('emotion');
    if (queryEmotion && EMOTIONS.includes(queryEmotion as Emotion)) {
      setSelectedEmotion(queryEmotion as Emotion);
    } else {
      setSelectedEmotion('All');
    }
  }, [searchParams]);

  // Query workouts based on filter
  useEffect(() => {
    if (selectedEmotion === 'All') {
      setWorkouts(workoutService.getAllWorkouts());
    } else {
      setWorkouts(workoutService.getWorkoutsByEmotion(selectedEmotion));
    }
  }, [selectedEmotion]);

  // Handle Rest Timer Countdown
  useEffect(() => {
    let interval: any;
    if (isResting && restTimer > 0) {
      interval = setInterval(() => {
        setRestTimer((t) => t - 1);
      }, 1000);
    } else if (isResting && restTimer === 0) {
      setIsResting(false);
      showToast('Rest over! Next set, let’s go!', 'info');
    }
    return () => clearInterval(interval);
  }, [isResting, restTimer]);

  const handleSelectEmotion = (emotion: Emotion | 'All') => {
    if (emotion === 'All') {
      searchParams.delete('emotion');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ emotion });
    }
  };

  const handleStartWorkout = (workout: Workout) => {
    setActiveWorkout(workout);
    setIsSessionActive(true);
    setCompletedExercises({});
    setCurrentExerciseIndex(0);
    setIsResting(false);
    setWorkoutFinished(false);
    showToast(`Session initiated: ${workout.name}`, 'info');
  };

  const toggleExerciseCheck = (exerciseName: string) => {
    setCompletedExercises(prev => ({
      ...prev,
      [exerciseName]: !prev[exerciseName]
    }));
  };

  const handleNextExercise = () => {
    if (!activeWorkout) return;
    
    // Trigger rest time countdown (parse rest e.g., "30 seconds" to 30)
    const restStr = activeWorkout.restTime;
    const numericRest = parseInt(restStr) || 30;
    
    if (currentExerciseIndex < activeWorkout.exercises.length - 1) {
      setIsResting(true);
      setRestTimer(numericRest);
      setCurrentExerciseIndex(prev => prev + 1);
    } else {
      // Finished all exercises!
      handleCompleteWorkout();
    }
  };

  const handleCompleteWorkout = () => {
    if (!activeWorkout) return;
    
    try {
      workoutService.completeWorkout(activeWorkout.id);
      setWorkoutFinished(true);
      showToast('Workout successfully saved and synced to cloud!', 'success');
    } catch (e) {
      console.error(e);
      showToast('Error syncing workout metrics.', 'error');
    }
  };

  const closeWorkoutModal = () => {
    setIsSessionActive(false);
    setActiveWorkout(null);
    setWorkoutFinished(false);
  };

  return (
    <div className="space-y-12">
      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="font-mono text-xs font-semibold text-indigo-400 uppercase tracking-widest">Somatic Prescription Panel</span>
        <h1 className="font-display font-extrabold text-3xl md:text-5xl text-white tracking-tight">
          Adaptive Routines
        </h1>
        <p className="text-slate-400 text-sm md:text-base">
          Unlock highly calibrated exercise schemas mapped dynamically to your bio-mental bandwidth. No decision fatigue, just pure mind-muscle sync.
        </p>
      </div>

      {/* Mood Quick Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 bg-slate-900/40 p-2 rounded-2xl border border-white/5 max-w-4xl mx-auto">
        <button
          onClick={() => handleSelectEmotion('All')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${selectedEmotion === 'All' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
        >
          All Routines
        </button>

        {EMOTIONS.map((em) => {
          const info = MOOD_INFO[em];
          const isSelected = selectedEmotion === em;
          return (
            <button
              key={em}
              onClick={() => handleSelectEmotion(em)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isSelected 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-slate-200 bg-slate-950/40 border border-white/5'
              }`}
            >
              <span>{info.emoji}</span>
              <span>{em}</span>
            </button>
          );
        })}
      </div>

      {/* Current Mood Focus Tray (Visible if filtering a specific mood) */}
      {selectedEmotion !== 'All' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className={`max-w-4xl mx-auto p-5 rounded-2xl border ${MOOD_INFO[selectedEmotion].bg} flex flex-col md:flex-row md:items-center justify-between gap-4`}
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{MOOD_INFO[selectedEmotion].emoji}</span>
              <h3 className="font-display font-bold text-lg text-white">Focus: {selectedEmotion} Aura</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Targeted Protocol: <strong className="text-indigo-400">{MOOD_INFO[selectedEmotion].label}</strong>. {MOOD_INFO[selectedEmotion].subtitle}
            </p>
          </div>
          <Link
            to="/emotion-detection"
            className="text-xs font-semibold font-mono text-indigo-400 hover:text-indigo-300 flex items-center gap-1 shrink-0"
          >
            <span>Scan different mood</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>
      )}

      {/* Workout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <AnimatePresence mode="popLayout">
          {workouts.map((workout, i) => {
            const info = MOOD_INFO[workout.emotion];
            return (
              <motion.div
                key={workout.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -6 }}
                className="bg-slate-900/60 border border-white/5 hover:border-indigo-500/20 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group"
              >
                {/* Header info */}
                <div className="p-6 md:p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{info.emoji}</span>
                      <div>
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">STATE REQUISITE</span>
                        <span className="text-xs font-semibold text-slate-300">{workout.emotion}</span>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono font-bold text-indigo-400 bg-indigo-950/40 border border-indigo-500/20 px-2.5 py-1 rounded-full uppercase">
                      {workout.difficulty}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-xl text-white group-hover:text-indigo-300 transition-colors">
                      {workout.name}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed min-h-[60px]">
                      {workout.description}
                    </p>
                  </div>

                  {/* Metabolic Stats Row */}
                  <div className="grid grid-cols-3 gap-3 bg-slate-950/40 p-3 rounded-xl border border-white/5 text-center font-mono text-xs">
                    <div className="space-y-0.5">
                      <div className="text-slate-500 uppercase text-[9px] flex items-center justify-center gap-1">
                        <Clock className="h-3 w-3 text-indigo-400" />
                        <span>Duration</span>
                      </div>
                      <div className="text-slate-200 font-semibold">{workout.duration} mins</div>
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-slate-500 uppercase text-[9px] flex items-center justify-center gap-1">
                        <Flame className="h-3 w-3 text-orange-400" />
                        <span>Metabolism</span>
                      </div>
                      <div className="text-slate-200 font-semibold">~{workout.calories} kcal</div>
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-slate-500 uppercase text-[9px] flex items-center justify-center gap-1">
                        <Shield className="h-3 w-3 text-emerald-400" />
                        <span>Equipment</span>
                      </div>
                      <div className="text-slate-200 font-semibold truncate max-w-[100px]" title={workout.equipment.join(', ')}>
                        {workout.equipment[0]}
                      </div>
                    </div>
                  </div>

                  {/* Exercises Peek */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Exercise Breakdown</h4>
                    <div className="space-y-1.5">
                      {workout.exercises.slice(0, 3).map((ex, exIdx) => (
                        <div key={exIdx} className="flex items-center justify-between text-xs text-slate-300 bg-slate-950/15 p-2 rounded-lg border border-white/5">
                          <span className="font-medium truncate">{ex.name}</span>
                          <span className="font-mono text-slate-400 shrink-0">{ex.sets} sets × {ex.reps}</span>
                        </div>
                      ))}
                      {workout.exercises.length > 3 && (
                        <div className="text-[10px] font-mono text-slate-500 text-center pt-1">
                          + {workout.exercises.length - 3} more technical exercises in sequence
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom CTA bar */}
                <div className="px-6 py-4 bg-slate-950/40 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500">Rest ratio: {workout.restTime}</span>
                  <button
                    onClick={() => handleStartWorkout(workout)}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-xs text-white shadow-md flex items-center gap-1 transition-all hover:scale-105"
                  >
                    <span>Start Session</span>
                    <Play className="h-3.5 w-3.5 fill-white" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* ACTIVE WORKOUT TRAINING GUIDE PORTAL / MODAL */}
      <AnimatePresence>
        {isSessionActive && activeWorkout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-[5000] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#1E293B] border border-white/10 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="bg-slate-900 px-6 py-4 border-b border-white/5 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <Dumbbell className="h-5 w-5 text-indigo-400" />
                  <div>
                    <h3 className="font-display font-bold text-base text-white">{activeWorkout.name}</h3>
                    <span className="text-[10px] font-mono text-slate-400">Active Somatic Integration</span>
                  </div>
                </div>
                <button
                  onClick={closeWorkoutModal}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Main Content Area */}
              <div className="p-6 md:p-8 overflow-y-auto flex-1 space-y-8">
                
                <AnimatePresence mode="wait">
                  {workoutFinished ? (
                    // Display 1: SUCCESS FINISH VIEW
                    <motion.div
                      key="finished"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8 space-y-6"
                    >
                      <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce">
                        <CheckCircle2 className="h-10 w-10" />
                      </div>
                      <div className="space-y-2">
                        <h2 className="font-display font-extrabold text-2xl md:text-3xl text-white">Protocol Complete!</h2>
                        <p className="text-xs text-slate-400">Your metrics have been safely recorded in your bio-history.</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto bg-slate-950/40 p-4 rounded-2xl border border-white/5 font-mono text-sm text-center">
                        <div>
                          <div className="text-slate-500 uppercase text-[10px]">Calories Burned</div>
                          <div className="text-xl font-bold text-white">~{activeWorkout.calories} kcal</div>
                        </div>
                        <div>
                          <div className="text-slate-500 uppercase text-[10px]">Active Duration</div>
                          <div className="text-xl font-bold text-white">{activeWorkout.duration} mins</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-center gap-3 pt-4">
                        <Link
                          to="/dashboard"
                          onClick={closeWorkoutModal}
                          className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-sm text-white shadow-md transition-all"
                        >
                          Open Dashboard
                        </Link>
                        <button
                          onClick={closeWorkoutModal}
                          className="px-6 py-3 rounded-xl bg-slate-800 text-slate-300 font-semibold text-sm border border-white/5 transition-all"
                        >
                          Close Session
                        </button>
                      </div>
                    </motion.div>
                  ) : isResting ? (
                    // Display 2: REST TIMER VIEW
                    <motion.div
                      key="resting"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12 space-y-6"
                    >
                      <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                        {/* Circular progress path */}
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="64" cy="64" r="54" stroke="#1E293B" strokeWidth="6" fill="transparent" />
                          <circle 
                            cx="64" 
                            cy="64" 
                            r="54" 
                            stroke="#4F46E5" 
                            strokeWidth="6" 
                            fill="transparent" 
                            strokeDasharray={339}
                            strokeDashoffset={339 - (339 * restTimer) / (parseInt(activeWorkout.restTime) || 30)}
                            className="transition-all duration-1000"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
                          <span className="text-xs text-slate-500">REST</span>
                          <span className="text-3xl font-extrabold text-white">{restTimer}s</span>
                        </div>
                      </div>

                      <div className="space-y-1 max-w-sm mx-auto">
                        <h4 className="font-semibold text-white">Oxygenate & Relax</h4>
                        <p className="text-xs text-slate-400">Prepare your heart rate for the upcoming exercise sequence.</p>
                      </div>

                      <button
                        onClick={() => setIsResting(false)}
                        className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs border border-white/5 hover:text-white hover:bg-slate-700 transition-all"
                      >
                        Skip Rest Interval
                      </button>
                    </motion.div>
                  ) : (
                    // Display 3: ACTIVE EXERCISE STEPPER VIEW
                    <motion.div
                      key="exercise"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-6"
                    >
                      {/* Step Indicator */}
                      <div className="flex items-center justify-between font-mono text-[10px] text-slate-500">
                        <span>EXERCISE {currentExerciseIndex + 1} OF {activeWorkout.exercises.length}</span>
                        <span>REST INTERVAL: {activeWorkout.restTime}</span>
                      </div>

                      {/* Major Exercise Detail Card */}
                      <div className="bg-slate-900/60 p-6 rounded-2xl border border-white/5 space-y-4">
                        <div className="flex items-start justify-between">
                          <h4 className="font-display font-bold text-xl text-white">
                            {activeWorkout.exercises[currentExerciseIndex].name}
                          </h4>
                          
                          <div className="text-right font-mono text-xs">
                            <span className="text-slate-500 block">PROTOCOL</span>
                            <span className="text-indigo-400 font-bold">
                              {activeWorkout.exercises[currentExerciseIndex].sets} sets × {activeWorkout.exercises[currentExerciseIndex].reps}
                            </span>
                          </div>
                        </div>

                        <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/20 p-4 rounded-xl border border-white/5">
                          {activeWorkout.exercises[currentExerciseIndex].instructions}
                        </p>
                      </div>

                      {/* Checklist sets representation */}
                      <div className="space-y-3">
                        <h5 className="text-xs font-mono font-semibold text-slate-400 uppercase">Track Sets Progression</h5>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {Array.from({ length: activeWorkout.exercises[currentExerciseIndex].sets }).map((_, setIdx) => {
                            const isSetChecked = completedExercises[`${currentExerciseIndex}-${setIdx}`];
                            return (
                              <button
                                key={setIdx}
                                onClick={() => toggleExerciseCheck(`${currentExerciseIndex}-${setIdx}`)}
                                className={`p-3 rounded-xl border text-center transition-all flex flex-col gap-1 items-center justify-center cursor-pointer ${
                                  isSetChecked
                                    ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400'
                                    : 'bg-slate-950/20 border-white/5 hover:border-white/10 text-slate-300'
                                }`}
                              >
                                <span className="font-mono text-[9px] uppercase">Set {setIdx + 1}</span>
                                <div className="flex items-center gap-1">
                                  {isSetChecked ? (
                                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                                  ) : (
                                    <div className="w-4 h-4 rounded-full border border-slate-600" />
                                  )}
                                  <span className="text-xs font-bold font-mono">Done</span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Navigation Stepper CTAs */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <button
                          onClick={() => {
                            if (currentExerciseIndex > 0) {
                              setCurrentExerciseIndex(prev => prev - 1);
                            }
                          }}
                          disabled={currentExerciseIndex === 0}
                          className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-400 hover:text-white disabled:opacity-40 transition-all border border-white/5"
                        >
                          Previous
                        </button>

                        <button
                          onClick={handleNextExercise}
                          className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-xs text-white shadow-lg flex items-center gap-1.5 transition-all hover:scale-105"
                        >
                          <span>
                            {currentExerciseIndex === activeWorkout.exercises.length - 1 ? 'Finish Workout' : 'Next Exercise'}
                          </span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
