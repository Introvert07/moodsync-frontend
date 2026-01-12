import React, { useState, useEffect } from 'react';
import { Sparkles, BrainCircuit, Music } from 'lucide-react';

const LoadingOverlay = () => {
  const [status, setStatus] = useState("Initializing AI...");

  // Cycling through status messages to keep the user engaged
  useEffect(() => {
    const messages = [
      "Scanning facial micro-expressions...",
      "Decoding emotional sentiment...",
      "Translating your vibe...",
      "Her Python engine is working magic...",
      "Syncing with Spotify libraries...",
      "Curating the perfect playlist..."
    ];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % messages.length;
      setStatus(messages[i]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-950/80 backdrop-blur-md z-[100] flex flex-col items-center justify-center p-6 text-center">
      
      {/* Animated Glowing Ring */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* Main Spinner Ring */}
          <div className="absolute inset-0 border-4 border-white/5 border-t-pink-500 rounded-full animate-spin" />
          {/* Secondary Counter-Rotating Ring */}
          <div className="absolute inset-2 border-4 border-white/5 border-b-indigo-500 rounded-full animate-[spin_1.5s_linear_infinite_reverse]" />
          
          <BrainCircuit size={32} className="text-white animate-pulse" />
        </div>
      </div>

      {/* Text Logic */}
      <div className="space-y-4 max-w-xs">
        <h3 className="text-2xl font-black text-white tracking-tight flex items-center justify-center gap-2">
          MoodSync AI <Sparkles size={20} className="text-yellow-400" />
        </h3>
        
        <div className="h-6 flex items-center justify-center">
          <p className="text-white/60 font-medium text-sm transition-all duration-500">
            {status}
          </p>
        </div>

        {/* Mini Progress Bar */}
        <div className="w-48 h-1 bg-white/10 rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-gradient-to-r from-pink-500 to-indigo-500 w-1/3 animate-loading-bar" />
        </div>
      </div>

      {/* Fixed Style Tag - Removed 'jsx' attribute to stop console errors */}
      <style>{`
        @keyframes custom-loading-sweep {
          0% { transform: translateX(-100%); width: 30%; }
          50% { width: 60%; }
          100% { transform: translateX(400%); width: 30%; }
        }
        .animate-loading-bar {
          animation: custom-loading-sweep 2s ease-in-out infinite;
        }
      `}</style>

      <div className="absolute bottom-10 flex items-center gap-2 text-white/20 text-[10px] uppercase tracking-[0.3em] font-bold">
        <Music size={12} /> JavaScript + Python Collaboration
      </div>
    </div>
  );
};

export default LoadingOverlay;