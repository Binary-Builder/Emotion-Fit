import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, Scale, Flame, Sparkles, CheckCircle2, ChevronRight, 
  User, RefreshCw, Info, HelpCircle, Save, Heart
} from 'lucide-react';
import { workoutService } from '../services/workoutService';
import { useToast } from '../context/ToastContext';

export default function BMICalorieCalculator() {
  const [activeTab, setActiveTab] = useState<'bmi' | 'calorie'>('bmi');
  const { showToast } = useToast();

  // BMI States
  const [weight, setWeight] = useState<string>('70');
  const [height, setHeight] = useState<string>('175');
  const [bmiResult, setBmiResult] = useState<{ bmi: number; category: string; minHealthy: number; maxHealthy: number } | null>(null);

  // Calorie States
  const [age, setAge] = useState<string>('28');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activity, setActivity] = useState<string>('moderate');
  const [goal, setGoal] = useState<string>('maintain');
  const [calorieResult, setCalorieResult] = useState<number | null>(null);

  // Load existing metrics from LocalStorage if present
  useEffect(() => {
    const stats = workoutService.getStats();
    if (stats.weight) setWeight(stats.weight.toString());
    if (stats.height) setHeight(stats.height.toString());
    if (stats.age) setAge(stats.age.toString());
    if (stats.gender) setGender(stats.gender);
    if (stats.activityLevel) setActivity(stats.activityLevel);
    if (stats.goal) setGoal(stats.goal);
    
    // Automatically pre-calculate if metrics exist
    if (stats.weight && stats.height) {
      calculateBMI(stats.weight.toString(), stats.height.toString(), false);
    }
  }, []);

  const calculateBMI = (w: string, h: string, shouldSave = true) => {
    const parsedWeight = parseFloat(w);
    const parsedHeight = parseFloat(h) / 100; // to meters

    if (isNaN(parsedWeight) || isNaN(parsedHeight) || parsedHeight <= 0 || parsedWeight <= 0) {
      showToast('Please enter valid numeric weight and height values.', 'error');
      return;
    }

    const bmi = parsedWeight / (parsedHeight * parsedHeight);
    let category = '';

    if (bmi < 18.5) {
      category = 'Underweight';
    } else if (bmi < 25) {
      category = 'Normal Weight';
    } else if (bmi < 30) {
      category = 'Overweight';
    } else {
      category = 'Obese';
    }

    const minHealthy = 18.5 * (parsedHeight * parsedHeight);
    const maxHealthy = 24.9 * (parsedHeight * parsedHeight);

    setBmiResult({
      bmi: Math.round(bmi * 10) / 10,
      category,
      minHealthy: Math.round(minHealthy * 10) / 10,
      maxHealthy: Math.round(maxHealthy * 10) / 10
    });

    if (shouldSave) {
      workoutService.saveStats({
        weight: parsedWeight,
        height: parseFloat(h),
        bmi: Math.round(bmi * 10) / 10
      });
      showToast('BMI score recorded and synced to cloud stats.', 'success');
    }
  };

  const calculateCalories = () => {
    const parsedWeight = parseFloat(weight);
    const parsedHeight = parseFloat(height);
    const parsedAge = parseInt(age);

    if (isNaN(parsedWeight) || isNaN(parsedHeight) || isNaN(parsedAge) || parsedWeight <= 0 || parsedHeight <= 0 || parsedAge <= 0) {
      showToast('Please verify weight, height, and age inputs in forms.', 'error');
      return;
    }

    // Harris-Benedict Equation
    let bmr = 0;
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * parsedWeight) + (4.799 * parsedHeight) - (5.677 * parsedAge);
    } else {
      bmr = 447.593 + (9.247 * parsedWeight) + (3.098 * parsedHeight) - (4.330 * parsedAge);
    }

    // Activity multiplier
    let multiplier = 1.2; // sedentary
    if (activity === 'light') multiplier = 1.375;
    if (activity === 'moderate') multiplier = 1.55;
    if (activity === 'active') multiplier = 1.725;
    if (activity === 'extreme') multiplier = 1.9;

    let tdee = bmr * multiplier;

    // Adjust for goal
    if (goal === 'lose') tdee -= 500; // calorie deficit
    if (goal === 'gain') tdee += 400; // calorie surplus

    const finalTarget = Math.round(tdee);
    setCalorieResult(finalTarget);

    workoutService.saveStats({
      weight: parsedWeight,
      height: parsedHeight,
      age: parsedAge,
      gender,
      activityLevel: activity,
      goal,
      dailyCalorieTarget: finalTarget
    });

    showToast(`Calorie budget synthesized: ${finalTarget} kcal/day. Recorded.`, 'success');
  };

  // BMI indicator scale position offset (15 to 35 range mapping)
  const getBmiPercentage = () => {
    if (!bmiResult) return 0;
    const value = bmiResult.bmi;
    const min = 15;
    const max = 35;
    const percentage = ((value - min) / (max - min)) * 100;
    return Math.max(0, Math.min(100, percentage));
  };

  return (
    <div className="space-y-12">
      
      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="font-mono text-xs font-semibold text-indigo-400 uppercase tracking-widest">Somatic Diagnostics</span>
        <h1 className="font-display font-extrabold text-3xl md:text-5xl text-white tracking-tight">
          Health Diagnostics
        </h1>
        <p className="text-slate-400 text-sm md:text-base">
          Calibrate your physiological foundations to establish clean caloric buffers and somatic mass indicators.
        </p>
      </div>

      {/* Tab Selectors */}
      <div className="flex bg-slate-900/40 p-1.5 rounded-2xl border border-white/5 max-w-md mx-auto">
        <button
          onClick={() => setActiveTab('bmi')}
          className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${activeTab === 'bmi' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <Scale className="h-4 w-4" />
          <span>BMI Index</span>
        </button>
        <button
          onClick={() => setActiveTab('calorie')}
          className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${activeTab === 'calorie' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <Flame className="h-4 w-4" />
          <span>Caloric Buffer</span>
        </button>
      </div>

      {/* Dynamic Tab Body */}
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'bmi' ? (
            
            // TAB 1: BMI CALCULATOR
            <motion.div
              key="bmi"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Form Input Column */}
              <div className="lg:col-span-5 bg-slate-900 border border-white/5 rounded-3xl p-6 md:p-8 space-y-6">
                <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-indigo-400" />
                  <span>Somatic Scale Parameters</span>
                </h3>

                <div className="space-y-4">
                  {/* Height */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-400 uppercase">Height (cm)</label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="e.g. 175"
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  {/* Weight */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-400 uppercase">Weight (kg)</label>
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="e.g. 70"
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <button
                    onClick={() => calculateBMI(weight, height)}
                    className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-lg transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="h-4 w-4" />
                    <span>Calculate BMI Score</span>
                  </button>
                </div>
              </div>

              {/* Display Results Column */}
              <div className="lg:col-span-7 bg-slate-900/40 border border-white/5 rounded-3xl p-6 md:p-8 space-y-8 flex flex-col justify-between">
                {bmiResult ? (
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 uppercase tracking-widest font-mono">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Diagnostics Ready</span>
                    </div>

                    <div className="flex items-baseline gap-4">
                      <div className="text-5xl font-extrabold text-white font-mono">{bmiResult.bmi}</div>
                      <div>
                        <div className="text-xs font-mono text-slate-500 uppercase">CATEGORY</div>
                        <h4 className={`text-xl font-display font-extrabold ${
                          bmiResult.category === 'Normal Weight' 
                            ? 'text-emerald-400' 
                            : bmiResult.category === 'Underweight' 
                            ? 'text-blue-400' 
                            : 'text-amber-400'
                        }`}>
                          {bmiResult.category}
                        </h4>
                      </div>
                    </div>

                    {/* Animated Horizontal Needle Spectrum Gauge */}
                    <div className="space-y-2.5">
                      <div className="relative h-2 bg-gradient-to-r from-blue-500 via-emerald-400 to-rose-500 rounded-full">
                        {/* Dynamic Slider needle */}
                        <div 
                          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-indigo-600 rounded-full shadow-lg transition-all duration-1000"
                          style={{ left: `${getBmiPercentage()}%`, transform: 'translate(-50%, -50%)' }}
                        />
                      </div>
                      
                      {/* Spectrum labels */}
                      <div className="flex justify-between text-[9px] font-mono text-slate-500">
                        <span>UNDERWEIGHT (15)</span>
                        <span>NORMAL (21)</span>
                        <span>OVER (27)</span>
                        <span>OBESE (35)</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950/40 border border-white/5 space-y-2">
                      <h4 className="text-xs font-mono text-slate-400 uppercase">Physiological Buffers</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        For your specified height, the healthy body weight range maps to <strong>{bmiResult.minHealthy} kg — {bmiResult.maxHealthy} kg</strong>. Maintaining coordinates inside normal boundaries limits general bio-system inflammation.
                      </p>
                    </div>

                  </div>
                ) : (
                  <div className="text-center py-16 flex flex-col items-center justify-center gap-4">
                    <Scale className="h-12 w-12 text-slate-600 animate-pulse" />
                    <div className="space-y-1">
                      <h4 className="font-semibold text-white">Index Gauge Ready</h4>
                      <p className="text-xs text-slate-400 max-w-[250px] mx-auto">Provide height and weight measurements to plot your physical mass coordinates.</p>
                    </div>
                  </div>
                )}

                <div className="pt-6 border-t border-white/5 text-[10px] font-mono text-slate-500 flex items-start gap-2">
                  <Info className="h-4 w-4 text-indigo-400 shrink-0" />
                  <span>The body mass index remains a general volumetric indicator. Dynamic muscle density values are not parsed in standard formulas.</span>
                </div>
              </div>
            </motion.div>
          ) : (
            
            // TAB 2: CALORIE CALCULATOR
            <motion.div
              key="calorie"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Form Input Column */}
              <div className="lg:col-span-5 bg-slate-900 border border-white/5 rounded-3xl p-6 md:p-8 space-y-6">
                <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                  <Flame className="h-5 w-5 text-indigo-400" />
                  <span>Caloric Synthesis Form</span>
                </h3>

                <div className="space-y-4">
                  {/* Age & Gender */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-400 uppercase">Age</label>
                      <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="e.g. 28"
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-400 uppercase">Gender</label>
                      <div className="flex bg-slate-950 p-1 rounded-xl border border-white/10 text-xs">
                        <button
                          onClick={() => setGender('male')}
                          className={`flex-1 py-2 rounded-lg font-medium transition-all ${gender === 'male' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                        >
                          Male
                        </button>
                        <button
                          onClick={() => setGender('female')}
                          className={`flex-1 py-2 rounded-lg font-medium transition-all ${gender === 'female' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                        >
                          Female
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Height & Weight Displays (bound to top states) */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-400 uppercase">Height (cm)</label>
                      <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-400 uppercase">Weight (kg)</label>
                      <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Activity Level */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-400 uppercase">Activity Level</label>
                    <select
                      value={activity}
                      onChange={(e) => setActivity(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                    >
                      <option value="sedentary">Sedentary (desk job, 0 workouts)</option>
                      <option value="light">Lightly Active (1-2 light workouts/wk)</option>
                      <option value="moderate">Moderately Active (3-5 solid sessions/wk)</option>
                      <option value="active">Highly Active (6+ heavy protocols/wk)</option>
                      <option value="extreme">Extreme Somatic (heavy daily labor/pro athlete)</option>
                    </select>
                  </div>

                  {/* Goal */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-400 uppercase">Primary Goal</label>
                    <select
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                    >
                      <option value="lose">Aggressive Fat Deficit (-500 kcal)</option>
                      <option value="maintain">Body Recomposition & Maintenance</option>
                      <option value="gain">Hypertrophy Surge surplus (+400 kcal)</option>
                    </select>
                  </div>

                  <button
                    onClick={calculateCalories}
                    className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-lg transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Save className="h-4 w-4" />
                    <span>Synthesize & Save Targets</span>
                  </button>
                </div>
              </div>

              {/* Display Results Column */}
              <div className="lg:col-span-7 bg-slate-900/40 border border-white/5 rounded-3xl p-6 md:p-8 space-y-8 flex flex-col justify-between">
                {calorieResult ? (
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 uppercase tracking-widest font-mono">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Caloric Protocol Formulated</span>
                    </div>

                    <div className="flex items-baseline gap-4">
                      <div className="text-5xl font-extrabold text-white font-mono">{calorieResult}</div>
                      <div>
                        <div className="text-xs font-mono text-slate-500 uppercase">kcal / day</div>
                        <h4 className="text-xl font-display font-extrabold text-indigo-400">Target Budget</h4>
                      </div>
                    </div>

                    {/* Macro recommendations */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono text-slate-400 uppercase">Synthesized Macro Apportionment</h4>
                      <div className="grid grid-cols-3 gap-3 text-center text-xs font-mono">
                        <div className="bg-slate-950/40 p-3 rounded-xl border border-white/5">
                          <span className="text-slate-500 text-[10px] block">Protein (30%)</span>
                          <span className="font-bold text-white">{~Math.round((calorieResult * 0.3) / 4)}g</span>
                        </div>
                        <div className="bg-slate-950/40 p-3 rounded-xl border border-white/5">
                          <span className="text-slate-500 text-[10px] block">Carbs (45%)</span>
                          <span className="font-bold text-white">{~Math.round((calorieResult * 0.45) / 4)}g</span>
                        </div>
                        <div className="bg-slate-950/40 p-3 rounded-xl border border-white/5">
                          <span className="text-slate-500 text-[10px] block">Fats (25%)</span>
                          <span className="font-bold text-white">{~Math.round((calorieResult * 0.25) / 9)}g</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950/40 border border-white/5 space-y-2">
                      <h4 className="text-xs font-mono text-slate-400 uppercase">Metabolic Synced Syncing</h4>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">
                        This target has been mapped to your Dashboard. Active calories burned during your custom recommended sessions will directly consume against this buffer target.
                      </p>
                    </div>

                  </div>
                ) : (
                  <div className="text-center py-16 flex flex-col items-center justify-center gap-4">
                    <Flame className="h-12 w-12 text-slate-600 animate-pulse" />
                    <div className="space-y-1">
                      <h4 className="font-semibold text-white">Synthesis Buffer Inactive</h4>
                      <p className="text-xs text-slate-400 max-w-[250px] mx-auto">Submit your age, gender, and activity goals to formulate a clean nutritional energy protocol.</p>
                    </div>
                  </div>
                )}

                <div className="pt-6 border-t border-white/5 text-[10px] font-mono text-slate-500 flex items-start gap-2">
                  <Info className="h-4 w-4 text-indigo-400 shrink-0" />
                  <span>The Harris-Benedict formulas represent scientific estimations. Individual metabolic rates vary based on thyroid activity and genetics.</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
