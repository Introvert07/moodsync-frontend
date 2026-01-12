import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Camera, RefreshCcw, UserCheck } from 'lucide-react';

const WebcamCard = ({ onCapture, imgSrc, onRetake }) => {
  const webcamRef = useRef(null);
  const [isFlash, setIsFlash] = useState(false);

  const capture = () => {
    // Visual flash effect
    setIsFlash(true);
    setTimeout(() => setIsFlash(false), 150);

    const imageSrc = webcamRef.current.getScreenshot();
    onCapture(imageSrc);
  };

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  return (
    <div className="group bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl flex flex-col items-center transition-all hover:bg-white/15">
      <div className="flex items-center justify-between w-full mb-4 px-2">
        <div className="flex items-center gap-2 text-white">
          <Camera size={22} className="text-pink-400" />
          <h2 className="text-xl font-semibold tracking-tight">Facial Analysis</h2>
        </div>
        {imgSrc && (
          <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-1 rounded-full border border-green-500/30 uppercase tracking-widest font-bold">
            Ready to Analyze
          </span>
        )}
      </div>

      <div className="relative w-full aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
        {/* Flash Overlay */}
        {isFlash && <div className="absolute inset-0 bg-white z-50 animate-out fade-out duration-300" />}

        {imgSrc ? (
          <img 
            src={imgSrc} 
            alt="Captured" 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          />
        ) : (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            mirrored={true} // Makes it feel natural like a mirror
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Decorative corner borders */}
        {!imgSrc && (
          <div className="absolute inset-0 pointer-events-none border-[12px] border-transparent">
             <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/40 rounded-tl-lg" />
             <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/40 rounded-tr-lg" />
             <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/40 rounded-bl-lg" />
             <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/40 rounded-br-lg" />
          </div>
        )}
      </div>

      <div className="mt-6 w-full space-y-3">
        {!imgSrc ? (
          <button
            onClick={capture}
            className="group/btn relative w-full py-4 bg-white text-gray-900 font-bold rounded-2xl shadow-xl transition-all hover:bg-pink-50 hover:scale-[0.98] active:scale-95 flex items-center justify-center gap-2 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
            <Camera size={20} />
            Capture Photo
          </button>
        ) : (
          <button
            onClick={onRetake}
            className="w-full py-4 flex items-center justify-center gap-2 bg-white/5 text-white/80 font-semibold rounded-2xl border border-white/10 hover:bg-white/10 hover:text-white transition-all backdrop-blur-sm"
          >
            <RefreshCcw size={18} className="group-hover:rotate-180 transition-transform duration-500" /> 
            Try Another Expression
          </button>
        )}
        
        <p className="text-[11px] text-center text-white/40 uppercase tracking-[0.2em]">
          {imgSrc ? "Face Locked In" : "Align face in center"}
        </p>
      </div>
    </div>
  );
};

export default WebcamCard;