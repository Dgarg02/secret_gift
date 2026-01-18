"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2,
  VolumeX,
  Lock,
  Unlock,
  Loader2,
  Sparkles,
  PlayCircle,
  Heart
} from "lucide-react";

type Stage = "password" | "theater" | "reveal";

type GiftData = {
  gifter_name: string;
  message: string;
  password_hint?: string;
};

const API_URL = "https://nationalistically-parisonic-tim.ngrok-free.dev";

// ✅ Cloudinary Config (Optimized for fullscreen)
const CLOUDINARY_VIDEO_URL =
  "https://player.cloudinary.com/embed/?cloud_name=djhxoeytk&public_id=treasure-open_dqwi5w&controls=false&autoplay=true&loop=false&responsive=true&muted=false";

export default function GiftRevealPage() {
  const params = useParams();
  const giftId = params.id as string;

  /* ---------------- STATE ---------------- */
  const [stage, setStage] = useState<Stage>("password");
  const [password, setPassword] = useState("");
  const [gift, setGift] = useState<GiftData | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // Default to unmuted for romance (browser may block)

  /* ---------------- AUDIO ---------------- */
  const audioRef = useRef<HTMLAudioElement | null>(null);

  /* ---------------- VERIFY PASSWORD ---------------- */
  const verifyPassword = async () => {
    if (!password.trim()) return;

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/gifts/verify-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gift_id: giftId,
          password,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Incorrect password");

      setGift(data.gift);

      // 🔊 Start background music immediately
      if (audioRef.current) {
        audioRef.current.volume = 0.3; // Subtle background
        audioRef.current.play().catch(() => setIsMuted(true));
      }

      setStage("theater");

      // ⏱ Move to reveal after video duration (~5s)
      // Extended slightly to let the "treasure open" effect finish
      setTimeout(() => {
        setStage("reveal");
      }, 5500);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------------- SYNC MUTE ---------------- */
  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = isMuted;
  }, [isMuted]);

  /* ---------------- ANIMATION VARIANTS ---------------- */
  const fadeVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
    exit: { opacity: 0, scale: 1.05, filter: "blur(10px)", transition: { duration: 0.5 } }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-[#0a0505] text-white overflow-hidden font-sans selection:bg-rose-500/30">

      {/* 🎵 BACKGROUND MUSIC */}
      <audio
        ref={audioRef}
        src="https://res.cloudinary.com/djhxoeytk/video/upload/v1/romantic.mp3"
        loop
        muted={isMuted}
        preload="auto"
      />

      {/* 🌌 AMBIENT BACKGROUND (Romantic Glow) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-rose-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 contrast-125" />
      </div>

      {/* 🔊 SOUND TOGGLE */}
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="fixed top-8 right-8 z-[60] group flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 transition-all cursor-pointer"
      >
        <span className="text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-70 transition-opacity duration-300">
          {isMuted ? "Unmute" : "Music On"}
        </span>
        {isMuted ? <VolumeX size={16} className="text-white/70" /> : <Volume2 size={16} className="text-rose-200" />}
      </button>

      <AnimatePresence mode="wait">

        {/* ================= STAGE 1: PASSWORD (THE VAULT) ================= */}
        {stage === "password" && (
          <motion.div
            key="password"
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative z-10 w-full max-w-md px-6"
          >
            <div className="bg-black/40 backdrop-blur-2xl border border-white/10 p-10 md:p-12 rounded-[2.5rem] shadow-2xl text-center">
              
              <div className="mb-8 flex justify-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/5 flex items-center justify-center">
                  {isLoading ? <Loader2 className="animate-spin text-rose-300" /> : <Lock className="text-rose-200/80" />}
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-serif text-white mb-3">Locked Memory</h1>
              <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-8">Enter access code</p>

              <div className="space-y-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••"
                  className="w-full bg-white/5 border border-white/10 focus:border-rose-400/50 rounded-xl py-4 text-center text-2xl tracking-[0.5em] placeholder:tracking-normal placeholder:text-white/20 outline-none transition-all focus:bg-white/10"
                />

                {gift?.password_hint && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center gap-2 text-rose-200/60 text-xs">
                    <Sparkles size={10} /> Hint: {gift.password_hint}
                  </motion.div>
                )}

                {error && (
                  <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-sm bg-red-500/10 py-2 rounded-lg">
                    {error}
                  </motion.p>
                )}
              </div>

              <button
                onClick={verifyPassword}
                disabled={isLoading}
                className="w-full mt-8 py-4 bg-white text-black rounded-xl font-bold tracking-widest uppercase hover:bg-rose-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center gap-2 items-center"
              >
                {isLoading ? "Unlocking..." : "Unlock"} {isLoading || <Unlock size={14} />}
              </button>
            </div>
          </motion.div>
        )}

        {/* ================= STAGE 2: THEATER (FULLSCREEN VIDEO) ================= */}
        {stage === "theater" && (
          <motion.div
            key="theater"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }} // Zoom out effect on exit
            transition={{ duration: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          >
            {/* The Iframe Container - Fullscreen */}
            <div className="absolute inset-0 w-full h-full">
              <iframe
                src={`${CLOUDINARY_VIDEO_URL}&muted=${isMuted}`}
                className="w-full h-full object-cover"
                allow="autoplay; fullscreen; encrypted-media;"
                allowFullScreen
              />
              {/* Overlay to prevent clicking/pausing if desired */}
              <div className="absolute inset-0 bg-transparent" />
            </div>

            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 1, duration: 2 }}
              className="absolute bottom-12 text-white/40 text-xs tracking-[0.3em] uppercase animate-pulse"
            >
              Revealing your surprise...
            </motion.p>
          </motion.div>
        )}

        {/* ================= STAGE 3: REVEAL (ROMANTIC MESSAGE) ================= */}
        {stage === "reveal" && gift && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative z-10 w-full max-w-3xl px-6"
          >
            {/* Glowing Aura Behind Card */}
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-purple-500/20 blur-3xl -z-10 rounded-full opacity-60" />

            <div className="bg-[#120a0a]/60 backdrop-blur-3xl border border-white/10 p-12 md:p-20 rounded-[3rem] shadow-[0_0_50px_-10px_rgba(255,182,193,0.1)] text-center relative overflow-hidden">
              
              {/* Decorative Top Border */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-rose-400/50 to-transparent" />

              <motion.div 
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: "spring" }}
                className="mx-auto mb-10 w-16 h-16 rounded-full bg-gradient-to-tr from-rose-400 to-purple-500 flex items-center justify-center shadow-lg shadow-rose-500/30"
              >
                <Heart fill="white" className="text-white" size={24} />
              </motion.div>

              <h2 className="text-xs font-bold text-rose-300/80 uppercase tracking-[0.3em] mb-8">
                With love from {gift.gifter_name}
              </h2>

              <div className="relative mb-12">
                 <span className="absolute -top-8 -left-4 text-6xl text-rose-500/10 font-serif leading-none">“</span>
                 <p className="text-3xl md:text-5xl font-serif text-white/90 leading-snug italic">
                   {gift.message}
                 </p>
                 <span className="absolute -bottom-10 -right-4 text-6xl text-rose-500/10 font-serif leading-none">”</span>
              </div>

              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-10" />

              <button
                onClick={() => setStage("theater")}
                className="group inline-flex items-center gap-3 px-8 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-all"
              >
                <PlayCircle size={18} className="text-rose-200 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium tracking-wide text-white/70">Replay Moment</span>
              </button>

            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </main>
  );
}