import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, Mail, Github, Linkedin, MessageSquare, 
  Sparkles, CheckCircle2, Globe, Activity, ShieldCheck, RefreshCw
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('Please verify all contact form fields before submitting.', 'error');
      return;
    }

    setLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setSubmitted(true);
    showToast('Your message has been safely received by our mock SMTP handler.', 'success');
  };

  const handleResetForm = () => {
    setName('');
    setEmail('');
    setMessage('');
    setSubmitted(false);
  };

  return (
    <div className="space-y-16">
      
      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="font-mono text-xs font-semibold text-indigo-400 uppercase tracking-widest">Connect / Interface</span>
        <h1 className="font-display font-extrabold text-3xl md:text-5xl text-white tracking-tight">
          Establish Connection
        </h1>
        <p className="text-slate-400 text-sm md:text-base">
          Reach out to inquire about the React/TypeScript stack, discuss integrations, or offer portfolio feedback.
        </p>
      </div>

      {/* Main Form and Social Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-start">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-7 bg-slate-900 border border-white/5 rounded-3xl p-6 md:p-8 shadow-xl">
          <AnimatePresence mode="wait">
            {!submitted ? (
              // Contact form
              <motion.form
                key="contact-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="h-5 w-5 text-indigo-400" />
                  <h3 className="font-display font-bold text-lg text-white">Send Somatic Query</h3>
                </div>

                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400 uppercase">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Jean Doe"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400 uppercase">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. jean@company.com"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400 uppercase">Message Query</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your project, integration requests, or general review comments..."
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-xs font-bold text-white shadow-lg transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Transmitting Query...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Transmit Message Protocol</span>
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              // Success card
              <motion.div
                key="success-form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 space-y-6"
              >
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-xl text-white">Transmission Successful</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong>{name}</strong>! Your query has been successfully routed to our simulated SMTP buffer. We will evaluate it shortly.
                  </p>
                </div>

                <button
                  onClick={handleResetForm}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-white/5 transition-all"
                >
                  Send Another Message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: Social Connection Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-6 md:p-8 space-y-6 shadow-lg">
            <h3 className="font-display font-bold text-base text-white">Direct Rails</h3>
            
            <div className="space-y-4">
              {/* GitHub */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-xl bg-slate-900 border border-white/5 hover:border-indigo-500/20 hover:bg-slate-950/60 transition-all flex items-center gap-4 group"
              >
                <div className="p-3 rounded-lg bg-slate-950 text-slate-400 group-hover:text-white border border-white/5 shrink-0 transition-colors">
                  <Github className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">GitHub Repository</h4>
                  <p className="text-xs text-slate-400">Inspect the complete repository structure.</p>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-xl bg-slate-900 border border-white/5 hover:border-indigo-500/20 hover:bg-slate-950/60 transition-all flex items-center gap-4 group"
              >
                <div className="p-3 rounded-lg bg-slate-950 text-slate-400 group-hover:text-white border border-white/5 shrink-0 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">LinkedIn Profile</h4>
                  <p className="text-xs text-slate-400">Let's connect for recruitment opportunities.</p>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:shreeyabansal77@gmail.com"
                className="p-4 rounded-xl bg-slate-900 border border-white/5 hover:border-indigo-500/20 hover:bg-slate-950/60 transition-all flex items-center gap-4 group"
              >
                <div className="p-3 rounded-lg bg-slate-950 text-slate-400 group-hover:text-white border border-white/5 shrink-0 transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">Email Interface</h4>
                  <p className="text-xs text-slate-400 truncate max-w-[180px]">shreeyabansal77@gmail.com</p>
                </div>
              </a>
            </div>
          </div>

          <div className="bg-slate-900 border border-white/5 rounded-3xl p-6 md:p-8 space-y-4 font-sans text-xs">
            <h4 className="font-display font-bold text-slate-200">Portfolio Identity</h4>
            <p className="text-slate-400 leading-relaxed">
              This startup template maintains flawless separation of concerns, complete dark mode responsive UI, animated charts, active session guides, and camera capturing overlays. Designed specifically to excel in frontend/full-stack reviews.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
