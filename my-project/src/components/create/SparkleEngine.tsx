import { motion } from "framer-motion";

export default function SparkleEngine() {
  const sparkles = ["✨", "💖", "🌟", "⭐", "🪄"];

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
      {sparkles.map((s, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl opacity-40"
          style={{
            top: `${Math.random() * 80}%`,
            left: `${Math.random() * 80}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.3, 0.9, 0.3],
            rotate: [0, 15, -15],
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {s}
        </motion.div>
      ))}
    </div>
  );
}
