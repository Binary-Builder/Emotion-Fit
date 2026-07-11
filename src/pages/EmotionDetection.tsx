import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Upload, RefreshCw, ArrowRight, Video, Sparkles, Smile, Frown, Angry, Meh, HelpCircle, Activity, Play } from 'lucide-react';
import { emotionService } from '../services/emotionService';
import { useToast } from '../context/ToastContext';
import { Emotion } from '../types/types';

const EMOTION_METADATA: Record<Emotion, { emoji: string; color: string; bg: string; desc: string; advice: string }> = {
  Happy: {
    emoji: '😊',
    color: 'text-emerald-400 border-emerald-500/30',
    bg: 'bg-emerald-950/40',
    desc: 'You are radiant and full of energy!',
    advice: 'Perfect time for a high-intensity interval training (HIIT) session to capitalize on your physical output and spike your endorphins!'
  },
  Sad: {
    emoji: '😔',
    color: 'text-blue-400 border-blue-500/30',
    bg: 'bg-blue-950/40',
    desc: 'You seem low on emotional energy.',
    advice: 'Let’s be gentle with ourselves. We recommend a comforting, restorative Vinyasa yoga flow or a mindful walk in nature to boost serotonin.'
  },
  Angry: {
    emoji: '😠',
    color: 'text-rose-400 border-rose-500/30',
    bg: 'bg-rose-950/40',
    desc: 'Your stress hormones are signaling fight-or-flight aggression.',
    advice: 'Channel that intense frustration and power into shadowboxing drills or a heavy resistance lifting session to safely decompress.'
  },
  Neutral: {
    emoji: '😐',
    color: 'text-slate-400 border-slate-500/30',
    bg: 'bg-slate-800/40',
    desc: 'Your mind is calm and perfectly balanced.',
    advice: 'This is the optimal state for hyper-focused, technically disciplined upper-body resistance training and postural correction.'
  },
  Stressed: {
    emoji: '😣',
    color: 'text-amber-400 border-amber-500/30',
    bg: 'bg-amber-950/40',
    desc: 'Your system is carrying dense, high-frequency mental tension.',
    advice: 'We need to deactivate your sympathetic nervous system. We recommend passive deep stretches and vagus nerve breathing exercises.'
  },
  Tired: {
    emoji: '😴',
    color: 'text-indigo-400 border-indigo-500/30',
    bg: 'bg-indigo-950/40',
    desc: 'Your physical batteries are running low.',
    advice: 'Do not stay totally sedentary, but avoid exhaustion. Opt for revitalizing joint mobilizations and active recovery stretches.'
  }
};

export default function EmotionDetection() {
  const [activeTab, setActiveTab] = useState<'webcam' | 'upload'>('webcam');
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [result, setResult] = useState<{ emotion: Emotion; confidence: number } | null>(null);
  
  // Webcam state
  const [webcamActive, setWebcamActive] = useState(false);
  const [webcamError, setWebcamError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  const navigate = useNavigate();
  const { showToast } = useToast();

  const loadingSteps = [
    'Initializing neural network layers...',
    'Extracting primary facial landmarks (eyes, mouth, brow)...',
    'Computing micro-tension alignment vector...',
    'Decoding valence and physiological arousal index...',
    'Synthesizing personalized training protocols...'
  ];

  // Increment loading steps during delay
  useEffect(() => {
    let interval: any;
    if (loading) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => {
          if (prev < loadingSteps.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 400);
    }
    return () => clearInterval(interval);
  }, [loading]);

  // Handle webcam stream start/stop
  useEffect(() => {
    if (activeTab === 'webcam' && webcamActive) {
      startWebcam();
    } else {
      stopWebcam();
    }
    return () => stopWebcam();
  }, [webcamActive, activeTab]);

  const startWebcam = async () => {
    setWebcamError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480, facingMode: 'user' } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(e => console.error(e));
      }
    } catch (err: any) {
      console.error('Webcam Access Error:', err);
      setWebcamError('Unable to access webcam. Please check permissions or upload a file.');
      setWebcamActive(false);
    }
  };

  const stopWebcam = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const handleCapture = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Flip horizontally for mirroring look
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const dataUrl = canvas.toDataURL('image/jpeg');
        setImageSrc(dataUrl);
        stopWebcam();
        setWebcamActive(false);
        triggerAnalysis(dataUrl);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setImageSrc(base64);
        triggerAnalysis(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerAnalysis = async (img: string) => {
    setLoading(true);
    setResult(null);
    try {
      // Consume the mock FastAPI predicting model
      const data = await emotionService.predictEmotion(img);
      setResult({
        emotion: data.emotion,
        confidence: data.confidence
      });
      showToast(`Emotion analyzed: ${data.emotion} (${data.confidence}% confidence)`, 'success');
    } catch (err) {
      console.error(err);
      showToast('Neural network analysis timed out.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const resetScanner = () => {
    setImageSrc(null);
    setResult(null);
    setWebcamActive(activeTab === 'webcam');
  };

  const handleNavigateToWorkout = () => {
    if (result) {
      navigate(`/workouts?emotion=${result.emotion}`);
    }
  };

  return (
    <div className="space-y-12">
      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="font-mono text-xs font-semibold text-indigo-400 uppercase tracking-widest">Somatic Micro-Expression Scanner</span>
        <h1 className="font-display font-extrabold text-3xl md:text-5xl text-white tracking-tight">
          Aura Mood Analysis
        </h1>
        <p className="text-slate-400 text-sm md:text-base">
          Our advanced mock FastAPI algorithm reads facial vectors to detect your underlying physiological state and match it to a targeted physical routine.
        </p>
      </div>

      {/* Main Grid Wrapper */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Scanner Window */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
            
            {/* Viewfinder Title / Header */}
            <div className="bg-slate-900 px-6 py-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${loading ? 'bg-indigo-500 animate-pulse' : webcamActive ? 'bg-emerald-500 pulse-glow-green' : 'bg-slate-600'}`} />
                <span className="font-mono text-[10px] text-slate-400 tracking-wider">AURA_SCAN_VIEWPORT_V1.1</span>
              </div>
              
              {/* Tab Toggles */}
              <div className="flex bg-slate-950 p-1 rounded-lg border border-white/5 text-xs">
                <button
                  onClick={() => { setActiveTab('webcam'); resetScanner(); }}
                  disabled={loading}
                  className={`px-3 py-1 rounded-md font-medium transition-all ${activeTab === 'webcam' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  Webcam
                </button>
                <button
                  onClick={() => { setActiveTab('upload'); resetScanner(); }}
                  disabled={loading}
                  className={`px-3 py-1 rounded-md font-medium transition-all ${activeTab === 'upload' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  Upload File
                </button>
              </div>
            </div>

            {/* Display Screen */}
            <div className="aspect-[4/3] w-full bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden group">
              
              {/* Cyberpunk grid overlay lines */}
              <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

              {/* Scanning laser line */}
              {loading && (
                <motion.div
                  initial={{ y: '0%' }}
                  animate={{ y: '100%' }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                  className="absolute left-0 w-full h-1 bg-indigo-500/80 shadow-[0_0_15px_#4f46e5] z-30 pointer-events-none"
                />
              )}

              <AnimatePresence mode="wait">
                {loading ? (
                  // State 1: LOADING
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-slate-950/90 z-20 flex flex-col items-center justify-center p-8 gap-6 text-center"
                  >
                    <div className="relative">
                      <RefreshCw className="h-16 w-16 text-indigo-400 animate-spin" />
                      <div className="absolute inset-0 h-16 w-16 border-4 border-dashed border-indigo-500/20 rounded-full scale-125 animate-spin" style={{ animationDuration: '6s' }} />
                    </div>

                    <div className="space-y-2 max-w-md">
                      <h4 className="font-display font-bold text-lg text-white">Analyzing Facial Grid...</h4>
                      <div className="h-1 bg-slate-800 rounded-full w-48 mx-auto overflow-hidden">
                        <motion.div
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 2 }}
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                        />
                      </div>
                      <p className="text-xs font-mono text-indigo-300 min-h-[30px] transition-all">
                        {loadingSteps[loadingStep]}
                      </p>
                    </div>
                  </motion.div>
                ) : result ? (
                  // State 2: HAS ANALYSIS RESULTS
                  <motion.div
                    key="results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-slate-900/95 z-20 flex flex-col md:flex-row items-center justify-center p-6 md:p-12 gap-8"
                  >
                    {/* Left: Snap & confidence */}
                    <div className="flex flex-col items-center gap-3">
                      {imageSrc ? (
                        <div className="w-32 h-32 rounded-2xl overflow-hidden border border-white/10 relative shadow-inner">
                          <img src={imageSrc} alt="User Aura Snapshot" className="w-full h-full object-cover scale-x-[-1]" />
                        </div>
                      ) : (
                        <div className="w-32 h-32 rounded-2xl bg-slate-800 flex items-center justify-center border border-white/5 text-slate-500">
                          <Camera className="h-8 w-8" />
                        </div>
                      )}
                      
                      <div className="text-center">
                        <span className="text-[10px] font-mono text-slate-400 tracking-wider">CONFIDENCE</span>
                        <div className="text-xl font-bold font-mono text-emerald-400">{result.confidence}%</div>
                      </div>
                    </div>

                    {/* Right: Mood and description */}
                    <div className="flex-1 space-y-4 text-center md:text-left">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 uppercase tracking-widest font-mono">
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>Aura Decoded</span>
                      </div>

                      <div className="space-y-1">
                        <span className="text-sm font-mono text-slate-500">DETECTED EMOTION</span>
                        <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white flex items-center justify-center md:justify-start gap-3">
                          <span>{result.emotion}</span>
                          <span>{EMOTION_METADATA[result.emotion].emoji}</span>
                        </h2>
                      </div>

                      <p className="text-sm text-slate-300">
                        {EMOTION_METADATA[result.emotion].desc} {EMOTION_METADATA[result.emotion].advice}
                      </p>

                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                        <button
                          onClick={handleNavigateToWorkout}
                          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-xs font-bold text-white shadow-lg flex items-center gap-1.5 transition-all hover:scale-105"
                        >
                          <span>Generate Tailored Routine</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                        
                        <button
                          onClick={resetScanner}
                          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-white/5 transition-all flex items-center gap-1.5"
                        >
                          <RefreshCw className="h-3.5 w-3.5" />
                          <span>Scan Again</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ) : activeTab === 'webcam' ? (
                  // State 3: WEBCAM CONTROLS
                  <div className="absolute inset-0 z-10 w-full h-full flex flex-col items-center justify-center">
                    {webcamActive ? (
                      <video
                        ref={videoRef}
                        className="w-full h-full object-cover scale-x-[-1]"
                        playsInline
                        muted
                      />
                    ) : (
                      <div className="p-8 text-center space-y-6 max-w-sm">
                        <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto shadow-md">
                          <Video className="h-8 w-8" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-semibold text-white">Biometric Telemetry Feed</h4>
                          <p className="text-xs text-slate-400">Enable your webcam to allow our model to perform a live emotional capture.</p>
                        </div>
                        {webcamError && (
                          <p className="text-xs text-rose-400 font-mono leading-relaxed bg-rose-950/20 p-2.5 rounded-lg border border-rose-500/10">
                            {webcamError}
                          </p>
                        )}
                        <button
                          onClick={() => setWebcamActive(true)}
                          className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold text-white transition-all shadow-md flex items-center gap-2 mx-auto hover:scale-105 active:scale-95"
                        >
                          <Play className="h-4 w-4 fill-white" />
                          <span>Initialize Camera</span>
                        </button>
                      </div>
                    )}

                    {/* Snapshot shutter overlay button */}
                    {webcamActive && (
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
                        <button
                          onClick={handleCapture}
                          className="w-16 h-16 rounded-full bg-white border-4 border-indigo-600 shadow-xl flex items-center justify-center text-slate-900 hover:scale-110 active:scale-95 hover:bg-slate-100 transition-all cursor-pointer"
                          title="Snap Photo"
                        >
                          <Camera className="h-7 w-7 text-indigo-600" />
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  // State 4: FILE UPLOAD DRAG-AND-DROP
                  <div className="absolute inset-0 z-10 p-8 flex flex-col items-center justify-center">
                    <label className="w-full max-w-sm rounded-2xl border-2 border-dashed border-slate-700 hover:border-indigo-500/50 bg-slate-900/40 hover:bg-slate-900/60 transition-all p-8 flex flex-col items-center justify-center text-center cursor-pointer group">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                      <Upload className="h-10 w-10 text-slate-500 group-hover:text-indigo-400 group-hover:-translate-y-1 transition-all mb-4" />
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">Choose an image or drop it here</h4>
                        <p className="text-xs text-slate-400 max-w-[200px]">Supports JPG, PNG, WebP up to 8MB. Instant AI analysis.</p>
                      </div>
                    </label>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right Column: Information & History */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Informational card */}
          <div className="glass-panel rounded-3xl p-6 md:p-8 border border-white/10 shadow-lg space-y-4">
            <div className="flex items-center gap-2 text-indigo-400">
              <Activity className="h-5 w-5" />
              <h3 className="font-display font-bold text-lg text-white">How Detection Works</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              When a snapshot or image is parsed, EmotionFit AI extracts micro-landmark coordinates surrounding facial musculature. It analyzes key factors:
            </p>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex gap-2">
                <span className="text-indigo-400 font-bold">•</span>
                <span><strong>Brow Furrow Ratio</strong>: Evaluates Stressed or Angry valence.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-400 font-bold">•</span>
                <span><strong>Lip Corner Deviation</strong>: Quantifies valence from Happy to Sad.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-400 font-bold">•</span>
                <span><strong>Eyelid Aperture Index</strong>: Evaluates fatigue, lethargy, or tiredness levels.</span>
              </li>
            </ul>
            <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-500/10 text-[10px] font-mono text-indigo-300">
              NOTE: To integrate with a real FastAPI ML pipeline, simply exchange the <code>emotionService.ts</code> mock layer with a fetch route pointing to your Python PyTorch deployment!
            </div>
          </div>

          {/* Quick history of recent scans */}
          <div className="glass-panel rounded-3xl p-6 md:p-8 border border-white/10 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
                <RefreshCw className="h-4 w-4 text-slate-400" />
                <span>Recent Aura Scans</span>
              </h3>
              
              <button
                onClick={() => {
                  emotionService.clearHistory();
                  showToast('Scan history cleared.', 'info');
                  navigate(0); // refresh
                }}
                className="text-[10px] font-mono text-slate-500 hover:text-rose-400 transition-colors"
              >
                Clear History
              </button>
            </div>

            <div className="space-y-2.5 max-h-[160px] overflow-y-auto pr-1">
              {emotionService.getHistory().length > 0 ? (
                emotionService.getHistory().map((hist, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setResult({ emotion: hist.emotion, confidence: hist.confidence });
                      setImageSrc(null); // Clear active webcam snapshot to show historical result
                    }}
                    className="p-3 rounded-xl bg-slate-900/60 border border-white/5 hover:border-indigo-500/20 hover:bg-slate-900 flex items-center justify-between cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{EMOTION_METADATA[hist.emotion].emoji}</span>
                      <div>
                        <div className="text-xs font-semibold text-white">{hist.emotion}</div>
                        <div className="text-[9px] font-mono text-slate-500">
                          {new Date(hist.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400">{hist.confidence}% Conf</span>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-xs text-slate-500 font-mono">
                  No scan history. Perform your first scan!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
