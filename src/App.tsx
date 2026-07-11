import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import Layout from './components/Layout';

// Lazy loading pages or direct imports since they are robustly built
import Home from './pages/Home';
import EmotionDetection from './pages/EmotionDetection';
import WorkoutRecommendation from './pages/WorkoutRecommendation';
import Dashboard from './pages/Dashboard';
import ProgressTracker from './pages/ProgressTracker';
import BMICalorieCalculator from './pages/BMICalorieCalculator';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <ToastProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/emotion-detection" element={<EmotionDetection />} />
            <Route path="/workouts" element={<WorkoutRecommendation />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/progress" element={<ProgressTracker />} />
            <Route path="/calculator" element={<BMICalorieCalculator />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </ToastProvider>
  );
}
