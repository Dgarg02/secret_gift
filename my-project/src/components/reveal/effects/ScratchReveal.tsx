"use client";

import { motion } from "framer-motion";

export default function ScratchReveal() {
  return (
    <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center">
      <motion.div
        initial={{ width: 250, height: 120, opacity: 1 }}
        animate={{ width: 0, opacity: 0 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="bg-gray-300 rounded-2xl shadow-inner"
      />
    </div>
  );
}
