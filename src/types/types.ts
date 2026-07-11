export type Emotion = 'Happy' | 'Sad' | 'Angry' | 'Neutral' | 'Stressed' | 'Tired';

export interface EmotionResponse {
  emotion: Emotion;
  confidence: number;
  timestamp: string;
  recommendationId: string;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  instructions: string;
}

export interface Workout {
  id: string;
  name: string;
  emotion: Emotion;
  duration: number; // in minutes
  calories: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  exercises: Exercise[];
  restTime: string;
  equipment: string[];
  description: string;
}

export interface CompletedWorkout {
  id: string;
  workoutId: string;
  workoutName: string;
  emotion: Emotion;
  caloriesBurned: number;
  duration: number;
  timestamp: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  condition: string;
}

export interface UserStats {
  weight?: number; // kg
  height?: number; // cm
  gender?: 'male' | 'female';
  age?: number;
  activityLevel?: string;
  goal?: string;
  bmi?: number;
  dailyCalorieTarget?: number;
  streak: number;
  lastWorkoutDate?: string;
}
