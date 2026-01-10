"use client";

import { motion } from "framer-motion";

export default function FireworksMagic() {
  const items = Array.from({ length: 40 });

  return (
    <div className="absolute inset-0 z-30 pointer-events-none">
      {items.map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-3xl"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 1.4, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.4,
            delay: Math.random() * 0.5,
          }}
        >
          ✨
        </motion.span>
      ))}
    </div>
  );
}
