"use client";

import { motion } from "framer-motion";

export default function FloatingHearts() {
  const icons = ["💖", "💕", "✨", "🌟", "💗"];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl opacity-40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -120],
            opacity: [0.2, 0.8, 0],
            rotate: [0, 180],
          }}
          transition={{
            duration: 5 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 3,
          }}
        >
          {icons[Math.floor(Math.random() * icons.length)]}
        </motion.div>
      ))}
    </div>
  );
}
