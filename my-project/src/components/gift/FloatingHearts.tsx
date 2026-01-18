"use client";

import { motion } from "framer-motion";

export default function FloatingHearts() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 0,
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
          }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: -100,
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            delay: Math.random() * 3,
            repeat: Infinity,
          }}
          className="absolute text-pink-400 text-2xl"
        >
          {Math.random() > 0.5 ? "💖" : "✨"}
        </motion.div>
      ))}
    </div>
  );
}
