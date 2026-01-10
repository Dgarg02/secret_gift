"use client";

import { motion } from "framer-motion";

export default function CrystalOrb() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative"
      >
        <div className="text-7xl">🔮</div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.8 }}
          className="absolute inset-0 rounded-full bg-purple-400/60 blur-3xl"
        />
      </motion.div>
    </div>
  );
}
