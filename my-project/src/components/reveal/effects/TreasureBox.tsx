"use client";

import { motion } from "framer-motion";

export default function TreasureBox() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative"
      >
        {/* Treasure Box Emoji */}
        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 0.5 }}
          className="text-7xl"
        >
          🧰
        </motion.div>

        {/* Glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0] }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-yellow-300/60 blur-2xl rounded-full"
        />

        {/* Sparkles */}
        {[...Array(8)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-3xl"
            style={{ top: "40%", left: "40%" }}
            animate={{
              x: (Math.random() - 0.5) * 200,
              y: (Math.random() - 0.5) * 200,
              opacity: [1, 0],
            }}
            transition={{ duration: 1.2 }}
          >
            ✨
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
