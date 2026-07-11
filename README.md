# EmotionFit AI

EmotionFit AI is a responsive React web application. It integrates real-time somatic facial micro-expression analysis (simulated via service layers) with high-performance physical training protocols. 

Unlike legacy training planners, EmotionFit AI decodes your physiological and mental bandwidth in seconds. It dynamically calibrates exercise volume, metabolic load, reps, and rest periods to match your active nervous system state.

---

## Visual Aesthetics & UI Design System
- **Apple & Linear-Inspired Minimalism**: Utilizes spacious negative space, thin borders, elegant modern typography, and a dark slate visual canvas.
- **Glassmorphism Layering**: Blur filters (`backdrop-filter`) blended with low-opacity card highlights to create layered structural hierarchy.
- **Micro-Animations & Transitions**: Leverages Framer Motion for smooth route transitions, active set tracking checkmarks, card floating lifts, and sliding needles.
- **Custom Glow Effects**: Ambient background gradients and pulsing camera status indicators mimic high-end biometric dashboards.

---

## Features & Modules

### 1. **Aura Mood Scan (Computer Vision Viewport)**
- Fully functional HTML5 Webcam capture utilizing `navigator.mediaDevices.getUserMedia` and `<canvas>` frame mapping.
- Staggered loading state console logs representing deep landmark coordinate parsing.
- 2-second FastAPI simulation layer designed to match machine learning prediction payloads cleanly.
- Recent scans sidebar syncing instantly with LocalStorage history buffers.

### 2. **Adaptive Routines (Prescription Engine)**
- Curated somatic workout protocols pre-selected based on facial valence metrics:
  - **Happy**: Cardio & HIIT Endorphin Surge.
  - **Sad**: Serotonin-boosting Yoga Flows and Mindful walks.
  - **Angry**: High-tension Heavy Resistance lifting or Shadowboxing.
  - **Neutral**: Technically disciplined upper-body training.
  - **Stressed**: Vagus nerve decompressing stretches and Zen breathwork.
  - **Tired**: Joint mobilization active recovery.
- Interactive **Active Session Guide**: In-app timers, set checklists, rest countdown circular rings, and auto-logging metric recorders.

### 3. **Personal Cockpit (Executive Dashboard)**
- Real-time weekly calorie burners, daily streak tracking, and recent scan logs.
- Interactive Recharts visualizing calories vs time duration profiles.
- Horizontal bar mappings displaying historical emotional tendencies.

### 4. **Progress Ledger (Habit Streak Tracker)**
- Unlocked somatic achievements (medals) detailing lock conditions.
- Glowing 7-day habit streak calendars checking off current activity days.
- Chronological timeline nodes detailing every completed session.

### 5. **Health Diagnostics (BMI & Calorie Calculators)**
- **BMI Index**: Height/weight parameters mapping to an animated gradient spectrum gauge.
- **Caloric Synthesizer**: Harris-Benedict formulation factoring age, gender, goal, and metabolic load multipliers to output daily calorie targets.

### 6. **Contact Rails & SMTP simulations**
- Beautiful form handling utilizing state controllers with automated SMTP transmission delays and checkmark transitions.

---

## Technological Stack
- **Library**: React 19 + TypeScript (strict types declared in `types/types.ts`)
- **Build System**: Vite 6.x
- **Styles**: Tailwind CSS v4 (incorporating `@theme` variables inside native CSS)
- **Transitions**: Framer Motion (`motion/react`)
- **Data Visualizer**: Recharts 2.x
- **Icons**: Lucide React Icons
- **Persistence**: Browser Client-Side LocalStorage Keys

---

## Project Directory Structure
```
src/
 ├── components/
 │      Layout.tsx                 # Master layout (Sticky navbar, mobile drawer, scroll-to-top, footer)
 ├── context/
 │      ToastContext.tsx           # Framer-Motion animated custom Portal toast alerts
 ├── data/
 │      workouts.ts                # Somatic exercises, protocols, and achievement specifications
 ├── pages/
 │      Home.tsx                   # Startup landing page with statistic counts and testimonials
 │      EmotionDetection.tsx       # Webcam viewport and face-analysis simulation
 │      WorkoutRecommendation.tsx  # Dynamic protocols and active training session guides
 │      Dashboard.tsx              # Recharts tracking and weekly progress metrics
 │      ProgressTracker.tsx        # Timeline chronologies and gamified medal displays
 │      BMICalorieCalculator.tsx   # Spectrum mass index and nutritional target formulas
 │      About.tsx                  # Deep ML stack specs and academic disclosures
 │      Contact.tsx                # Connection rails and mock message delivery forms
 │      NotFound.tsx               # Disaligned coordinate 404 route
 ├── services/
 │      emotionService.ts          # Mock FastAPI predicting service (2s latency, history stores)
 │      workoutService.ts          # Core persistence sync, streaks, and stats computations
 ├── types/
 │      types.ts                   # Unified TypeScript declarations
 ├── App.tsx                       # HashRouter state configuration
 ├── index.css                     # Tailwind v4 theme specs, custom scrollbars, and floaters
 └── main.tsx                      # SPA mount entry
```

---

## Installation & Local Development

### 1. Prerequisite
Ensure you have [Node.js](https://nodejs.org/) (v18+) installed.

### 2. Install Dependencies
```bash
npm install
```

### 3. Initiate Development Server
```bash
npm run dev
```
The server binds to port `3000` on your host. Open your web browser at `http://localhost:3000` to preview.

---

## Deployment to GitHub Pages

To compile and deploy this React application directly to GitHub Pages:

### 1. Set configuration `base` in `vite.config.ts`:
If deploying as a project repository (e.g., `https://username.github.io/repository-name/`), add the matching base path to your Vite configuration:
```typescript
export default defineConfig({
  base: '/repository-name/',
  // other configs...
});
```

### 2. Compile static assets:
```bash
npm run build
```
This produces optimized production static assets inside the `dist/` directory.

### 3. Deploy assets to your hosting provider or trigger GitHub Actions for automated branch deployment.

---

## License
Distributed under the Apache-2.0 License. See `LICENSE` or contact the administrator for permissions.
