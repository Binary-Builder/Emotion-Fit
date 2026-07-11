import { Emotion, Workout, CompletedWorkout, UserStats, Achievement } from '../types/types';
import { WORKOUTS, ACHIEVEMENTS } from '../data/workouts';

export const workoutService = {
  getAllWorkouts: (): Workout[] => {
    return WORKOUTS;
  },

  getWorkoutById: (id: string): Workout | undefined => {
    return WORKOUTS.find((w) => w.id === id);
  },

  getWorkoutsByEmotion: (emotion: Emotion): Workout[] => {
    return WORKOUTS.filter((w) => w.emotion === emotion);
  },

  getCompletedWorkouts: (): CompletedWorkout[] => {
    try {
      const data = localStorage.getItem('completed_workouts');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  completeWorkout: (workoutId: string): CompletedWorkout => {
    const workout = WORKOUTS.find((w) => w.id === workoutId);
    if (!workout) {
      throw new Error(`Workout with ID ${workoutId} not found`);
    }

    const completed: CompletedWorkout = {
      id: `cw-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      workoutId: workout.id,
      workoutName: workout.name,
      emotion: workout.emotion,
      caloriesBurned: workout.calories,
      duration: workout.duration,
      timestamp: new Date().toISOString(),
    };

    try {
      const list = workoutService.getCompletedWorkouts();
      list.unshift(completed);
      localStorage.setItem('completed_workouts', JSON.stringify(list));

      // Update streaks and user stats
      workoutService.updateStreakAndStats(workout.calories, workout.duration);
      
      // Trigger achievements check
      workoutService.checkAndUnlockAchievements();
    } catch (e) {
      console.error('Error saving completed workout:', e);
    }

    return completed;
  },

  getStats: (): UserStats => {
    try {
      const data = localStorage.getItem('user_stats');
      if (data) {
        return JSON.parse(data);
      }
    } catch {}

    // Return default stats
    const defaultStats: UserStats = {
      streak: 0,
    };
    return defaultStats;
  },

  saveStats: (newStats: Partial<UserStats>): UserStats => {
    const current = workoutService.getStats();
    const updated = { ...current, ...newStats };
    localStorage.setItem('user_stats', JSON.stringify(updated));
    workoutService.checkAndUnlockAchievements();
    return updated;
  },

  updateStreakAndStats: (calories: number, duration: number) => {
    const stats = workoutService.getStats();
    const todayStr = new Date().toDateString();
    
    let streak = stats.streak;
    if (stats.lastWorkoutDate) {
      const lastDate = new Date(stats.lastWorkoutDate);
      const diffTime = Math.abs(new Date().getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        streak += 1;
      } else if (diffDays > 1) {
        streak = 1; // streak broken, reset to 1
      }
    } else {
      streak = 1; // first workout ever
    }

    workoutService.saveStats({
      streak,
      lastWorkoutDate: todayStr,
    });
  },

  getAchievements: (): Achievement[] => {
    try {
      const data = localStorage.getItem('unlocked_achievements');
      const unlockedMap = data ? JSON.parse(data) : {};
      
      return ACHIEVEMENTS.map((ach) => ({
        ...ach,
        unlockedAt: unlockedMap[ach.id] || undefined
      }));
    } catch {
      return ACHIEVEMENTS;
    }
  },

  checkAndUnlockAchievements: (): Achievement[] => {
    const completedList = workoutService.getCompletedWorkouts();
    const stats = workoutService.getStats();
    const historyJson = localStorage.getItem('emotion_history');
    const scans = historyJson ? JSON.parse(historyJson) : [];
    
    let unlockedMap: Record<string, string> = {};
    try {
      const data = localStorage.getItem('unlocked_achievements');
      if (data) unlockedMap = JSON.parse(data);
    } catch {}

    const nowStr = new Date().toISOString();
    let newlyUnlocked = false;

    // Check achievement 1: first-scan
    if (!unlockedMap['first-scan'] && scans.length >= 1) {
      unlockedMap['first-scan'] = nowStr;
      newlyUnlocked = true;
    }

    // Check achievement 2: streak-3
    if (!unlockedMap['streak-3'] && stats.streak >= 3) {
      unlockedMap['streak-3'] = nowStr;
      newlyUnlocked = true;
    }

    // Check achievement 3: cal-1000
    const totalCalories = completedList.reduce((sum, item) => sum + item.caloriesBurned, 0);
    if (!unlockedMap['cal-1000'] && totalCalories >= 1000) {
      unlockedMap['cal-1000'] = nowStr;
      newlyUnlocked = true;
    }

    // Check achievement 4: all-moods
    const distinctScannedEmotions = new Set(scans.map((s: any) => s.emotion));
    if (!unlockedMap['all-moods'] && distinctScannedEmotions.size >= 3) {
      unlockedMap['all-moods'] = nowStr;
      newlyUnlocked = true;
    }

    // Check achievement 5: health-conscious
    if (!unlockedMap['health-conscious'] && (stats.bmi !== undefined || stats.dailyCalorieTarget !== undefined)) {
      unlockedMap['health-conscious'] = nowStr;
      newlyUnlocked = true;
    }

    if (newlyUnlocked) {
      localStorage.setItem('unlocked_achievements', JSON.stringify(unlockedMap));
    }

    return ACHIEVEMENTS.map((ach) => ({
      ...ach,
      unlockedAt: unlockedMap[ach.id] || undefined
    }));
  }
};
