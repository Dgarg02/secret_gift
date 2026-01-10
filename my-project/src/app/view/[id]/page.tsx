"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Lock, Unlock, Music, Volume2, VolumeX, 
  Heart, Image as ImageIcon, Play, Quote 
} from "lucide-react";
import Confetti from "react-confetti";

// --- MOCK DATA (In real app, fetch based on ID) ---
const GIFT_DATA = {
  title: "Happy Anniversary My Love ❤️",
  recipient: "Priya",
  message: "My dearest Priya,\n\nThree years ago, you walked into my life and changed everything. Every day with you feels like a new adventure. I created this little digital sanctuary to keep our favorite memories safe forever.\n\nI love you more than words can say.\n\nYours,\nArjun",
  password: "love",
  hint: "Our favorite 4-letter word?",
  media: [
    { type: "image", src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=600&auto=format&fit=crop" },
    { type: "image", src: "https://images.unsplash.com/photo-1621609764180-2ca554a9d6f2?q=80&w=600&auto=format&fit=crop" },
    { type: "video", src: "#" }, // Placeholder
    { type: "image", src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=600&auto=format&fit=crop" },
  ]
};

export default function ViewGift() {
  const [isLocked, setIsLocked] = useState(true);
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  
  // Audio Ref (Optional Background Music)
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    // Initialize Audio
    audioRef.current = new Audio("https://cdn.pixabay.com/audio/2022/02/07/audio_182f2b3238.mp3"); // Free generic soft piano
    audioRef.current.loop = true;
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.toLowerCase() === GIFT_DATA.password.toLowerCase()) {
      setIsLocked(false);
      // Try to auto-play music (browsers might block this without interaction, but since they clicked 'Unlock', it usually works)
      if (audioRef.current) {
        audioRef.current.play().catch(e => console.log("Audio play failed", e));
        setIsPlaying(true);
      }
    } else {
      setError(true);
      setTimeout(() => setError(false), 500); // Shake animation reset
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-[#FDFCFD] font-sans selection:bg-pink-100">
      
      {/* Background Atmosphere */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-pink-100/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-50/50 rounded-full blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      {/* --- LOCKED STATE --- */}
      <AnimatePresence>
        {isLocked && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-white/30 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2.5rem] shadow-2xl p-8 md:p-12 text-center relative overflow-hidden"
            >
              {/* Lock Icon */}
              <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full mx-auto flex items-center justify-center mb-6 shadow-inner">
                <Lock className="w-8 h-8 text-purple-500" />
              </div>

              <h1 className="text-3xl font-serif text-gray-900 mb-2">A Gift for You</h1>
              <p className="text-gray-500 mb-8 text-sm">This surprise is password protected.</p>

              <form onSubmit={handleUnlock} className="space-y-4">
                <div className={`relative transition-transform ${error ? "animate-shake" : ""}`}>
                  <input 
                    type="password" 
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter Secret Password"
                    className={`w-full bg-white/50 border rounded-2xl py-4 px-6 text-center font-bold text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all ${
                      error 
                        ? "border-red-300 focus:ring-red-100 bg-red-50/50" 
                        : "border-gray-200 focus:ring-purple-100"
                    }`}
                  />
                </div>
                
                {GIFT_DATA.hint && (
                  <p className="text-xs text-gray-400 font-medium">Hint: {GIFT_DATA.hint}</p>
                )}

                <button 
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gray-900 text-white font-bold text-lg shadow-xl shadow-purple-200 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                >
                  <Unlock className="w-4 h-4 opacity-70" /> Unlock Gift
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* --- UNLOCKED CONTENT --- */}
      {!isLocked && (
        <div className="relative z-10 max-w-4xl mx-auto p-6 md:p-12 pb-32">
          
          <Confetti 
            width={windowSize.width} 
            height={windowSize.height} 
            recycle={false} 
            numberOfPieces={1000} 
            gravity={0.15} 
          />

          {/* Music Control */}
          <motion.button 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            onClick={toggleMusic}
            className="fixed top-6 right-6 z-50 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-white hover:scale-110 transition-transform"
          >
            {isPlaying ? <Volume2 className="w-5 h-5 text-purple-600" /> : <VolumeX className="w-5 h-5 text-gray-400" />}
          </motion.button>

          {/* 1. Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center space-y-6 mt-12 mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-rose-100 shadow-sm">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
              <span className="text-xs font-bold tracking-widest uppercase text-rose-900/60">Happy Anniversary</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif text-gray-900 leading-tight">
              {GIFT_DATA.title}
            </h1>
          </motion.div>

          {/* 2. The Letter (Message) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[3rem] p-8 md:p-16 shadow-2xl relative mb-20"
          >
            <Quote className="absolute top-8 left-8 w-12 h-12 text-purple-200 opacity-50" />
            <div className="prose prose-lg md:prose-xl mx-auto font-serif text-gray-700 leading-loose whitespace-pre-line text-center">
              {GIFT_DATA.message}
            </div>
            <div className="text-center mt-12">
               <div className="w-16 h-1 bg-gray-200 mx-auto rounded-full" />
            </div>
          </motion.div>

          {/* 3. Treasure Box (Media Grid) */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              <h2 className="text-2xl font-serif text-gray-900">Treasure Box</h2>
              <div className="h-px bg-gray-200 flex-1" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {GIFT_DATA.media.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className={`relative rounded-3xl overflow-hidden shadow-lg group cursor-pointer ${
                    i % 3 === 0 ? "md:col-span-2 aspect-[16/9]" : "aspect-[4/5]"
                  }`}
                >
                  <img 
                    src={item.src} 
                    alt="Memory" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay for Video */}
                  {item.type === "video" && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                      <div className="w-16 h-16 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-xl">
                        <Play className="w-6 h-6 text-gray-900 ml-1" />
                      </div>
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                    <p className="text-white font-medium text-sm">Memory #{i + 1}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-32 opacity-50">
             <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Created with MakeThemSmile</p>
          </div>

        </div>
      )}
    </div>
  );
}