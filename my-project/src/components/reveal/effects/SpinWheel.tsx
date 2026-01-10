"use client";

import { motion } from "framer-motion";

export default function SpinWheel() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
      <motion.div
        initial={{ rotate: 0, scale: 0.6 }}
        animate={{ rotate: 360, scale: 1.1, opacity: [1, 1, 0] }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-7xl"
      >
        🌀
      </motion.div>
    </div>
  );
}
