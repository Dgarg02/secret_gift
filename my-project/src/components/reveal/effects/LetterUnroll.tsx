"use client";

import { motion } from "framer-motion";

export default function LetterUnroll() {
  return (
    <div className="absolute inset-0 flex justify-center z-30 pointer-events-none">
      <motion.div
        initial={{ height: 0, opacity: 1 }}
        animate={{ height: 150, opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="overflow-hidden"
      >
        <motion.div
          initial={{ y: -200 }}
          animate={{ y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-7xl text-center"
        >
          ✉️
        </motion.div>
      </motion.div>
    </div>
  );
}
