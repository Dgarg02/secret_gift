"use client";

import { motion } from "framer-motion";

export default function BalloonPop() {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{
          scale: [1, 1.3, 0.3],
          opacity: [1, 0.6, 0],
        }}
        transition={{ duration: 0.9 }}
        className="text-7xl"
      >
        🎈
      </motion.div>
    </div>
  );
}
