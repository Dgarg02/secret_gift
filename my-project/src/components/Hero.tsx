"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  const handleCreate = () => {
    router.push("/create-gift");
  };

  return (
    <section className="relative py-24 px-8 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 opacity-70 pointer-events-none" />

      {/* Floating Emojis */}
      <FloatingEmojis />

      {/* Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.2 },
          },
        }}
        className="relative max-w-4xl mx-auto text-center"
      >
        {/* TITLE */}
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-7xl font-extrabold text-gray-800 mb-6 leading-snug"
        >
          Make Someone Smile Today{" "}
          <span className="inline-block animate-bounce">😄💗</span>
        </motion.h1>

        {/* SUBTITLE */}
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto"
        >
          Create a magical password-protected message gift in just seconds.
        </motion.p>

        {/* BUTTON */}
        <motion.button
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1 },
          }}
          whileHover={{ scale: 1.07, boxShadow: "0 10px 30px rgba(255, 100, 160, 0.4)" }}
          whileTap={{ scale: 0.92 }}
          onClick={handleCreate}
          className="bg-gradient-to-r from-primary to-secondary text-white px-14 py-5 
            text-xl font-semibold rounded-button shadow-xl select-none transition-all duration-200"
        >
          Create Gift ✨
        </motion.button>
      </motion.div>
    </section>
  );
}

/* FLOATING EMOJIS */
function FloatingEmojis() {
  const emojis = ["💗", "✨", "🎁", "💝", "😊"];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {emojis.map((emoji, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40 }}
          animate={{
            opacity: [0.3, 1, 0.3],
            y: ["0%", "-40%", "0%"],
          }}
          transition={{
            duration: 6 + i * 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute text-4xl"
          style={{
            top: `${20 + i * 12}%`,
            left: `${10 + i * 15}%`,
          }}
        >
          {emoji}
        </motion.span>
      ))}
    </div>
  );
}
