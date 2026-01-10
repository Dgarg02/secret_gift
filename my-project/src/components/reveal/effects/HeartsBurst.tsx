"use client";

import { motion } from "framer-motion";

export default function HeartsBurst() {
  const hearts = ["💖", "💗", "❤️", "💕", "💞"];

  return (
    <div className="absolute inset-0 pointer-events-none z-30">
      {hearts.map((h, i) => (
        <motion.span
          key={i}
          className="absolute text-5xl"
          style={{
            top: "50%",
            left: "50%",
          }}
          animate={{
            x: (Math.random() - 0.5) * 400,
            y: (Math.random() - 0.5) * 350,
            opacity: [1, 0],
            scale: [1, 1.5],
          }}
          transition={{ duration: 1.2 }}
        >
          {h}
        </motion.span>
      ))}
    </div>
  );
}
