import React from 'react';
import { Music, ExternalLink, Activity, Info } from 'lucide-react';

const ResultCard = ({ result }) => {
  if (!result) return null;

  // Color mapping based on the emotion returned by her Python code
  const getMoodColor = (emo) => {
    const colors = {
      happy: 'from-yellow-400 to-orange-500',
      sad: 'from-blue-500 to-indigo-700',
      angry: 'from-red-600 to-orange-700',
      chill: 'from-teal-400 to-emerald-600',
      romantic: 'from-pink-500 to-rose-600',
      energetic: 'from-purple-500 to-indigo-600'
    };
    return colors[emo.toLowerCase()] || 'from-gray-500 to-slate-700';
  };

  return (
    <div className="mt-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Emotion Summary Header */}
      <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-[2rem] shadow-2xl text-center mb-10 overflow-hidden relative">
        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${getMoodColor(result.emotion)}`} />
        
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 mb-2 flex items-center gap-2">
            <Activity size={12} className="text-pink-400" /> AI Detection Results
          </span>
          
          <h2 className={`text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r ${getMoodColor(result.emotion)} mb-4`}>
            {result.emotion.toUpperCase()}
          </h2>

          <div className="flex flex-wrap justify-center gap-3">
            <div className="px-4 py-1.5 bg-white/5 rounded-full border border-white/10 flex items-center gap-2 text-white/80 text-sm">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
              Mood: <span className="text-white font-bold">{result.mood}</span>
            </div>
            <div className="px-4 py-1.5 bg-white/5 rounded-full border border-white/10 flex items-center gap-2 text-white/80 text-sm">
              Language: <span className="text-white font-bold">{result.language === 'hi' ? 'Hindi' : 'English'}</span>
            </div>
            <div className="px-4 py-1.5 bg-white/5 rounded-full border border-white/10 flex items-center gap-2 text-white/80 text-sm">
              Analysis: <span className="text-white font-bold capitalize">{result.method}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Playlist Grid */}
      <div className="flex items-center gap-2 mb-6 ml-4">
        <Music className="text-pink-400" size={20} />
        <h3 className="text-white font-bold text-xl tracking-tight">Personalized Playlists</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {result.playlists.map((playlist, idx) => (
          <a
            key={idx}
            href={playlist.url}
            target="_blank"
            rel="noreferrer"
            className="group relative bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden hover:bg-white/10 transition-all hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col"
          >
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden">
              <img
                src={playlist.image || 'https://via.placeholder.com/300'}
                alt={playlist.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
              
              {/* Spotify Icon Overlay */}
              <div className="absolute top-4 right-4 p-2 bg-green-500 rounded-full text-black shadow-lg translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <ExternalLink size={18} />
              </div>
            </div>
            
            {/* Playlist Info */}
            <div className="p-6">
              <h4 className="font-bold text-white text-lg group-hover:text-pink-400 transition-colors line-clamp-1">
                {playlist.name}
              </h4>
              <p className="text-white/40 text-xs mt-2 uppercase tracking-widest font-semibold flex items-center gap-2">
                Curated for your mood
              </p>
            </div>
          </a>
        ))}
      </div>

      <p className="text-center text-white/20 text-[10px] mt-12 uppercase tracking-[0.3em] flex items-center justify-center gap-2">
        <Info size={10} /> Data processed by Her-Python-Backend v2.0
      </p>
    </div>
  );
};

export default ResultCard;