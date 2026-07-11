import { Workout, Achievement } from '../types/types';

export const WORKOUTS: Workout[] = [
  // Happy (HIIT + Running)
  {
    id: 'happy-hiit-blast',
    name: 'Joyous High-Energy HIIT Blast',
    emotion: 'Happy',
    duration: 25,
    calories: 320,
    difficulty: 'Intermediate',
    description: 'Channel your radiant energy and happiness into an explosive, heart-pumping HIIT session. Perfect for boosting endorphins even further!',
    equipment: ['None (Bodyweight)'],
    restTime: '30 seconds',
    exercises: [
      { name: 'Jumping Jacks', sets: 3, reps: '45 sec', instructions: 'High-speed arm and leg swings to warm up and elevate heart rate.' },
      { name: 'Burpees', sets: 3, reps: '12 reps', instructions: 'Drop to a push-up, jump up, and reach for the sky with maximum power.' },
      { name: 'High Knees', sets: 3, reps: '45 sec', instructions: 'Run in place, driving your knees up to your chest level.' },
      { name: 'Mountain Climbers', sets: 3, reps: '40 sec', instructions: 'Keep your core braced and drive your knees into your chest rapidly.' },
      { name: 'Squat Jumps', sets: 3, reps: '15 reps', instructions: 'Lower into a deep squat, then launch upward explosively.' }
    ]
  },
  {
    id: 'happy-endorphin-run',
    name: 'Endorphin Surge Outdoor/Treadmill Run',
    emotion: 'Happy',
    duration: 35,
    calories: 450,
    difficulty: 'Advanced',
    description: 'Celebrate your elevated spirits with a structured tempo run designed to capitalize on optimal energy levels and cardiovascular capacity.',
    equipment: ['Treadmill or Outdoor Route'],
    restTime: '60 seconds (Walking)',
    exercises: [
      { name: 'Dynamic Warmup', sets: 1, reps: '5 mins', instructions: 'Leg swings, high knee walks, butt kicks, and ankle rolls.' },
      { name: 'Easy Jog', sets: 1, reps: '5 mins', instructions: 'Build a comfortable breathing rhythm and light stride.' },
      { name: 'Tempo Running Intervals', sets: 4, reps: '4 mins at 80%', instructions: 'Run at a strong, challenging but sustainable pace.' },
      { name: 'All-Out Sprints', sets: 3, reps: '30 sec sprint', instructions: 'Run as fast as possible to unlock maximum endorphin potential.' },
      { name: 'Cooldown Walk', sets: 1, reps: '5 mins', instructions: 'Slowing down to return heart rate safely to baseline.' }
    ]
  },

  // Sad (Yoga + Walking)
  {
    id: 'sad-healing-yoga',
    name: 'Gentle Healing Vinyasa Flow',
    emotion: 'Sad',
    duration: 30,
    calories: 120,
    difficulty: 'Beginner',
    description: 'A comforting, slow-paced yoga practice to release physical tension, open the chest, and invite emotional release with deep, mindful breathing.',
    equipment: ['Yoga Mat'],
    restTime: 'No rest (Continuous flow)',
    exercises: [
      { name: 'Child’s Pose (Balasana)', sets: 1, reps: '3 mins', instructions: 'Kneeling, forehead to mat, arms extended. Breathe into your lower back.' },
      { name: 'Cat-Cow Stretch', sets: 1, reps: '2 mins', instructions: 'Inhale to arch the back, exhale to round the spine. Release neck tension.' },
      { name: 'Downward Facing Dog', sets: 3, reps: '5 breaths', instructions: 'Push hips high, pedal out the heels, releasing hamstrings and calves.' },
      { name: 'Sphinx Pose', sets: 2, reps: '1 min', instructions: 'Lying on stomach, forearms flat, gently lift your chest to open the heart.' },
      { name: 'Corpse Pose (Savasana)', sets: 1, reps: '5 mins', instructions: 'Lying flat, palms up, closing eyes, letting go of all thoughts.' }
    ]
  },
  {
    id: 'sad-mindful-walk',
    name: 'Serotonin Booster Mindful Walk',
    emotion: 'Sad',
    duration: 40,
    calories: 180,
    difficulty: 'Beginner',
    description: 'A soothing, low-impact outdoor walk focused on connecting with nature, scanning your senses, and stimulating serotonin through sunlight exposure.',
    equipment: ['Comfortable Walking Shoes'],
    restTime: 'None',
    exercises: [
      { name: 'Sensory Check-In', sets: 1, reps: '5 mins', instructions: 'Notice 5 things you can see, 4 you can touch, 3 you can hear.' },
      { name: 'Brisk Walk', sets: 1, reps: '25 mins', instructions: 'A steady, natural pace. Let your arms swing freely and keep your eyes on the horizon.' },
      { name: 'Box Breathing Walk', sets: 1, reps: '5 mins', instructions: 'Inhale for 4 steps, hold for 4 steps, exhale for 4 steps, hold for 4 steps.' },
      { name: 'Reflective Slowdown', sets: 1, reps: '5 mins', instructions: 'Slow your pace, focusing on the contact your feet make with the earth.' }
    ]
  },

  // Angry (Boxing + Strength)
  {
    id: 'angry-boxer-fury',
    name: 'Fury Release Heavy Boxing Cardio',
    emotion: 'Angry',
    duration: 30,
    calories: 380,
    difficulty: 'Intermediate',
    description: 'Transform anger into raw power! Use structured shadowboxing and kickboxing rounds to safely discharge high-cortisol adrenaline.',
    equipment: ['None (Shadowboxing) or Heavy Bag'],
    restTime: '45 seconds',
    exercises: [
      { name: 'Fighter stance & Jabs', sets: 3, reps: '1 min', instructions: 'Snap jab punches straight from your guard. Exhale sharply on each punch.' },
      { name: 'Jab-Cross-Hook Combos', sets: 3, reps: '1.5 mins', instructions: 'Rotate hips to drive power through the cross and hook.' },
      { name: 'Slip and Roll Defensive drills', sets: 3, reps: '1 min', instructions: 'Weave side to side, keeping eyes up. Engaging core and quads.' },
      { name: 'Power Kicks / Knee strikes', sets: 3, reps: '12 each leg', instructions: 'Drive your knee forward aggressively, using hips for force.' },
      { name: 'Speed Bag / Fast Punches', sets: 3, reps: '45 sec sprint', instructions: 'Throw non-stop light, fast punches to burn out the shoulders.' }
    ]
  },
  {
    id: 'angry-strength-smash',
    name: 'Aggression-to-Muscle Heavy Strength Workout',
    emotion: 'Angry',
    duration: 45,
    calories: 410,
    difficulty: 'Advanced',
    description: 'Channel your intense focus and frustration into lifting. High tension movements help release deep muscle-stored stress and build severe power.',
    equipment: ['Dumbbells or Barbell (or heavy household objects)'],
    restTime: '75 seconds',
    exercises: [
      { name: 'Goblet Squats', sets: 4, reps: '10 reps (Heavy)', instructions: 'Hold a heavy weight close to chest, lower deep, explode back up.' },
      { name: 'Push-Ups (Chest-to-Floor)', sets: 4, reps: 'As many as possible', instructions: 'Maintain a rigid plank. Push the ground away with extreme force.' },
      { name: 'Dumbbell Romanian Deadlifts', sets: 4, reps: '12 reps', instructions: 'Hinge at the hips, keeping back flat, feeling the stretch in the hamstrings.' },
      { name: 'Dumbbell Renegade Rows', sets: 3, reps: '10 each arm', instructions: 'Hold a plank on dumbbells, row one dumbbell up while balancing.' },
      { name: 'Heavy Farmer Walks', sets: 3, reps: '60 seconds', instructions: 'Grip heavy weights, walk slowly, squeeze core and shoulders tightly.' }
    ]
  },

  // Neutral (Upper Body)
  {
    id: 'neutral-upper-sculpt',
    name: 'Balanced Upper Body Sculpt & Core',
    emotion: 'Neutral',
    duration: 30,
    calories: 220,
    difficulty: 'Intermediate',
    description: 'When your emotional state is calm and steady, it is the absolute best time for highly technical, focused, and balanced resistance movements.',
    equipment: ['Dumbbells or Resistance Bands'],
    restTime: '60 seconds',
    exercises: [
      { name: 'Overhead Shoulder Press', sets: 3, reps: '12 reps', instructions: 'Press dumbbells straight up overhead, full lock-out, slow lower.' },
      { name: 'Bicep Curl to Hammer Curl', sets: 3, reps: '10 reps', instructions: 'Incorporate rotational curls with hammer curls to target the forearms.' },
      { name: 'Tricep Overhead Extensions', sets: 3, reps: '12 reps', instructions: 'Extend arms straight above head, hinging at elbow to lower weight behind head.' },
      { name: 'Bent-Over Dumbbell Rows', sets: 3, reps: '15 reps', instructions: 'Pull weights to ribs, squeezing shoulder blades together.' },
      { name: 'Plank with Shoulder Taps', sets: 3, reps: '20 taps', instructions: 'In a plank, tap opposite shoulder, minimizing hip sway.' }
    ]
  },

  // Stressed (Meditation + Stretching)
  {
    id: 'stressed-decompress-stretch',
    name: 'Vagus Nerve Reset & Deep Decompress Stretching',
    emotion: 'Stressed',
    duration: 20,
    calories: 80,
    difficulty: 'Beginner',
    description: 'Melt away cortisol and deactivate your sympathetic "fight or flight" response with slow, passive, long-hold stretches targeting key tension zones.',
    equipment: ['Yoga Mat or Soft Carpet'],
    restTime: 'No rest',
    exercises: [
      { name: 'Thread the Needle Stretch', sets: 2, reps: '90 sec each side', instructions: 'On hands/knees, slide one arm under body to rest shoulder on floor, opening upper back.' },
      { name: 'Puppy Pose', sets: 1, reps: '2 mins', instructions: 'Keep hips stacked over knees, walk hands out, letting forehead or chest melt to floor.' },
      { name: 'Supine Spinal Twist', sets: 2, reps: '1 min each side', instructions: 'Lie on your back, pull one knee across body, look opposite way, deep breathing.' },
      { name: 'Butterfly Stretch (Baddha Konasana)', sets: 1, reps: '2 mins', instructions: 'Sit upright, bottoms of feet together, hold feet, let knees gently sink.' },
      { name: 'Wall Chest Opener', sets: 2, reps: '45 sec each side', instructions: 'Place forearm flat on a wall, turn body away to open tight, stressed pectorals.' }
    ]
  },
  {
    id: 'stressed-zen-breath',
    name: 'Zen Mindful Breathwork & Somatic Grounding',
    emotion: 'Stressed',
    duration: 15,
    calories: 40,
    difficulty: 'Beginner',
    description: 'Calm an overactive nervous system through intentional parasympathetic breathing exercises and full body physical grounding.',
    equipment: ['Comfortable Seat or Cushion'],
    restTime: 'None',
    exercises: [
      { name: '4-7-8 Deep Breathing', sets: 1, reps: '5 mins', instructions: 'Inhale 4s, hold 7s, exhale slowly with a "whoosh" sound for 8s.' },
      { name: 'Somatic Body Scan', sets: 1, reps: '5 mins', instructions: 'Direct warm focus from toes to head, actively relaxing clutched muscles.' },
      { name: 'Alternate Nostril Breathing', sets: 1, reps: '5 mins', instructions: 'Inhale left, block, exhale right. Inhale right, block, exhale left. Restores balance.' }
    ]
  },

  // Tired (Recovery Workout)
  {
    id: 'tired-joint-mobilization',
    name: 'Revitalizing Joint Mobilization & Active Recovery',
    emotion: 'Tired',
    duration: 20,
    calories: 100,
    difficulty: 'Beginner',
    description: 'Low energy? Do not stay completely sedentary! This active recovery routine lubricates joints and boosts oxygen circulation without fatiguing you.',
    equipment: ['None'],
    restTime: '30 seconds',
    exercises: [
      { name: 'Shoulder & Neck Rolls', sets: 1, reps: '2 mins', instructions: 'Slow, circular rotations clockwise and counter-clockwise.' },
      { name: 'Hip Circles & Torso Twists', sets: 1, reps: '2 mins', instructions: 'Stand wide, rotate hips to release lower back, swing arms loosely.' },
      { name: 'Dynamic Hamstring Sweeps', sets: 2, reps: '10 reps each leg', instructions: 'Step forward, hinge, scoop hands downward, feeling a light, gentle stretch.' },
      { name: 'Bodyweight Glute Bridges', sets: 3, reps: '12 reps (Gentle)', instructions: 'Lie flat, bend knees, lift hips to activate posterior chain without fatigue.' },
      { name: 'Deep Squat Hold with Support', sets: 2, reps: '45 sec', instructions: 'Hold a doorframe, sit deep into squat, letting hips decompress.' }
    ]
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-scan',
    title: 'First Aura Scan',
    description: 'Unlock your first emotion-based workout by scanning your mood.',
    icon: 'Camera',
    condition: 'Complete 1 emotion scan'
  },
  {
    id: 'streak-3',
    title: 'Consistent Explorer',
    description: 'Maintain a 3-day workout completion streak.',
    icon: 'Flame',
    condition: 'Get a 3-day streak'
  },
  {
    id: 'cal-1000',
    title: 'Calorie Incinerator',
    description: 'Burn a total of 1,000 kcal through workouts on EmotionFit AI.',
    icon: 'Zap',
    condition: 'Burn 1000 total calories'
  },
  {
    id: 'all-moods',
    title: 'Emotional Mastery',
    description: 'Scan and generate workouts for 3 distinct emotional states.',
    icon: 'Sparkles',
    condition: 'Detect 3 different emotions'
  },
  {
    id: 'health-conscious',
    title: 'Metric Architect',
    description: 'Calculate your BMI and Calorie target to establish fit foundations.',
    icon: 'Scale',
    condition: 'Calculate BMI or Calorie targets'
  }
];
