"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Particles from "./Particles";

export default function MagicReveal({ data }: { data: any }) {
  const [startReveal, setStartReveal] = useState(false);
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    // Delay for cinematic effect
    setTimeout(() => {
      setBurst(true);
      setTimeout(() => setStartReveal(true), 600);
    }, 300);
  }, []);

  return (
    <section className="min-h-screen px-6 py-20 relative overflow-hidden">
      <Particles />

      {/* Cinematic White Fade */}
      <AnimatePresence>
        {!startReveal && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-white z-40"
          />
        )}
      </AnimatePresence>

      {/* Burst Particles */}
      {burst && <BurstParticles />}

      {/* Reveal Content */}
      {startReveal && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <h1 className="text-5xl font-bold mb-6 text-center bg-gradient-to-r 
                         from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Your Magical Message ✨
          </h1>

          {/* Message Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-3xl bg-white/30 backdrop-blur-xl 
                       border border-white/40 shadow-2xl text-lg text-gray-900"
          >
            {data.message}
          </motion.div>

          {/* Media Grid */}
          {data.media?.length > 0 && (
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.15 } },
              }}
            >
              {data.media.map((m: any, i: number) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    show: { opacity: 1, scale: 1 },
                  }}
                  className="rounded-xl overflow-hidden shadow-xl"
                >
                  {m.type === "image" && <img src={m.url} className="w-full h-40 object-cover" />}
                  {m.type === "video" && (
                    <video src={m.url} className="w-full h-40 object-cover" controls />
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Magic Effect Placeholder (Batch 4) */}
          <div id="magic-effect-layer"></div>
        </motion.div>
      )}
    </section>
  );
}

/* ----------------------------
   Burst Particle Component
-----------------------------*/
function BurstParticles() {
  const particles = Array.from({ length: 30 });

  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      {particles.map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-2xl"
          style={{ top: "50%", left: "50%" }}
          animate={{
            x: (Math.random() - 0.5) * 400,
            y: (Math.random() - 0.5) * 400,
            opacity: [1, 0],
          }}
          transition={{ duration: 1.2 }}
        >
          ✨
        </motion.span>
      ))}
    </div>
  );
}
