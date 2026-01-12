import React from 'react';
import { MessageSquareText, Sparkles, Languages } from 'lucide-react';

const TextCard = ({ text, setText, onAnalyze, isLoading }) => {
  // Helpful chips to guide the user (matches her Python keywords)
  const suggestions = ["I'm feeling great!", "आज मैं बहुत खुश हूँ", "Feeling a bit tired", "Life is wonderful"];

  return (
    <div className="group bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl flex flex-col h-full transition-all hover:bg-white/15">
      <div className="flex items-center justify-between w-full mb-4 px-2">
        <div className="flex items-center gap-2 text-white">
          <MessageSquareText size={22} className="text-indigo-400" />
          <h2 className="text-xl font-semibold tracking-tight">Vibe Check</h2>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-white/40 font-bold uppercase tracking-widest">
          <Languages size={12} />
          En / Hi
        </div>
      </div>

      <div className="relative flex-grow flex flex-col">
        <textarea
          className="w-full flex-grow bg-gray-900/50 text-white placeholder-white/30 p-5 rounded-2xl border border-white/10 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none resize-none transition-all duration-300 text-lg leading-relaxed shadow-inner"
          placeholder="Describe your mood... (e.g., 'Today was an amazing day!')"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        
        {/* Character Count / Status */}
        <div className="absolute bottom-3 right-4 text-[11px] text-white/20 font-mono">
          {text.length} characters
        </div>
      </div>

      {/* Suggestion Chips */}
      <div className="flex flex-wrap gap-2 mt-4">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => setText(s)}
            className="text-[10px] py-1 px-3 rounded-full bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white transition-all"
          >
            {s}
          </button>
        ))}
      </div>

      <button
        onClick={onAnalyze}
        disabled={isLoading || (!text.trim() && !isLoading)}
        className={`mt-6 w-full py-4 flex items-center justify-center gap-2 font-bold rounded-2xl shadow-xl transition-all active:scale-95 overflow-hidden relative
          ${isLoading 
            ? 'bg-gray-700 text-white/50 cursor-not-allowed' 
            : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white hover:shadow-purple-500/40 hover:scale-[0.98]'
          }`}
      >
        {isLoading ? (
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>AI Processing...</span>
          </div>
        ) : (
          <>
            <Sparkles size={20} className="animate-pulse" />
            Analyze My Vibe
          </>
        )}
      </button>
      
      <p className="mt-3 text-[11px] text-center text-white/40 uppercase tracking-[0.2em]">
        Powered by Python NLP Engine
      </p>
    </div>
  );
};

export default TextCard;