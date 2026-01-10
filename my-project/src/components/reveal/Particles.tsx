"use client";

import { motion } from "framer-motion";

export default function Particles() {
  const icons = ["✨", "💖", "🌟", "💗", "🔮"];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((icon, i) => (
        <motion.span
          key={i}
          className="absolute text-3xl opacity-60"
          style={{
            top: `${10 + i * 12}%`,
            left: `${15 + i * 14}%`,
          }}
          animate={{
            y: ["0%", "-20%", "0%"],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 6 + i * 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {icon}
        </motion.span>
      ))}
    </div>
  );
}
