import React, { useState } from 'react';
import WebcamCard from './components/WebcamCard';
import TextCard from './components/TextCard';
import ResultCard from './components/ResultCard';
import LoadingOverlay from './components/LoadingOverlay';
import { Music4, RefreshCcw } from 'lucide-react';

function App() {
  const [imgSrc, setImgSrc] = useState(null);
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to send data to your Python Backend
  const analyzeEmotion = async () => {
    // Check if both are empty (JS uses .trim() instead of .strip())
    if (!imgSrc && !text.trim()) {
      alert("Please capture a photo or write how you feel!");
      return;
    }

    setLoading(true);
    setResult(null); 

    try {
      // Use the Environment Variable for the URL
const backendUrl = import.meta.env.VITE_BACKEND_URL;      
      const response = await fetch(`${backendUrl}/detect_emotion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: imgSrc, // This is the base64 string from WebcamCard
          text: text
        }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();

      // The 'data' contains emotion, mood, and playlists from Flask
      setResult(data);
      
      // Scroll smoothly to results
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }, 100);

    } catch (error) {
      console.error("Connection Error:", error);
      alert("Cannot connect to the AI Server. If you just deployed, wait 1 minute for it to wake up.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setImgSrc(null);
    setText('');
    setResult(null);
  };

  return (
    <div className="min-h-screen p-4 md:p-10 font-sans text-gray-800 bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      
      {/* Header */}
      <header className="text-center text-white mb-12 animate-in fade-in slide-in-from-top-4 duration-1000">
        <div className="inline-flex items-center justify-center p-4 bg-white/10 rounded-full backdrop-blur-md mb-4 border border-white/20 shadow-2xl">
          <Music4 size={40} className="text-pink-400 animate-pulse" />
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-2 drop-shadow-2xl">
          AI Mood Mixer
        </h1>
        <p className="text-lg md:text-xl text-white/70 font-light">
          Collaborative Project: JS Frontend & Python AI Backend
        </p>
        
        {/* Reset Button */}
        {(imgSrc || text) && (
          <button 
            onClick={handleReset}
            className="mt-4 flex items-center gap-2 mx-auto text-sm text-white/50 hover:text-white transition-colors"
          >
            <RefreshCcw size={16} /> Reset Everything
          </button>
        )}
      </header>

      {/* Input Section */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <WebcamCard 
          onCapture={setImgSrc} 
          imgSrc={imgSrc} 
          onRetake={() => { setImgSrc(null); setResult(null); }} 
        />
        <TextCard 
          text={text} 
          setText={setText} 
          onAnalyze={analyzeEmotion}
          isLoading={loading}
        />
      </main>

      {/* Results Section */}
      <section className="max-w-6xl mx-auto pb-20">
        {result && (
          <div className="animate-in zoom-in-95 duration-500">
            <ResultCard result={result} />
          </div>
        )}
      </section>

      {/* Loading Overlay */}
      {loading && <LoadingOverlay message="AI is analyzing your mood... (This can take 30-60s on first load)" />}
      
    </div>
  );
}

export default App;