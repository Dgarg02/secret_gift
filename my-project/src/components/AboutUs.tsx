"use client";

import { motion } from "framer-motion";
import { FiHeart, FiGift, FiStar, FiSmile } from "react-icons/fi";

/* -----------------------------------------------------------
   ⭐ ABOUT PAGE
------------------------------------------------------------*/
export default function AboutPage() {
  return (
    <main className="relative min-h-screen px-6 py-20 overflow-hidden">
      <AuroraBG />
      <Particles />

      {/* HEADER */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center text-6xl font-extrabold
        bg-gradient-to-r from-pink-500 via-purple-500 to-sky-400
        bg-clip-text text-transparent drop-shadow-2xl mb-8"
      >
        About Secret Magic Messages ✨
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="text-center text-gray-700 text-lg max-w-2xl mx-auto mb-16"
      >
        A simple idea with a sprinkle of magic — send heartfelt secret gifts 
        that unlock with a password only your special someone knows. 💖
      </motion.p>

      {/* FEATURES SECTION */}
      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {FEATURES.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.2 }}
            className="p-8 rounded-3xl bg-white/40 backdrop-blur-xl 
            border border-white/30 shadow-xl hover:shadow-2xl 
            transition-all"
          >
            <div
              className="w-16 h-16 flex items-center justify-center rounded-2xl 
              text-3xl text-white bg-gradient-to-br from-pink-400 to-purple-500 mb-4"
            >
              {item.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* BOTTOM NOTE */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mt-20"
      >
        <p className="text-gray-600 max-w-xl mx-auto text-lg">
          We believe in moments. In surprises. In tiny magical gestures 
          that make someone smile. 🌈💗  
        </p>
        <p className="text-gray-700 font-semibold mt-4 text-xl">
          And that's why Secret Magic Messages exists.
        </p>
      </motion.div>
    </main>
  );
}

/* -----------------------------------------------------------
   ⭐ FEATURES DATA
------------------------------------------------------------*/
const FEATURES = [
  {
    title: "Password-Protected Gifts",
    desc: "Your heartfelt message stays hidden until they unlock it with the secret password you choose.",
    icon: <FiGift />,
  },
  {
    title: "Magical Reveal Effects",
    desc: "Choose from enchanting animations — floating hearts, treasure boxes, fireworks, and more.",
    icon: <FiStar />,
  },
  {
    title: "Upload Images & Videos",
    desc: "Add beautiful memories to make your magical message even more personal and emotional.",
    icon: <FiHeart />,
  },
  {
    title: "Make Someone Smile",
    desc: "Perfect for birthdays, surprises, confessions, apologies, or just reminding someone they’re special.",
    icon: <FiSmile />,
  },
];

/* -----------------------------------------------------------
   ⭐ BACKGROUND AURORA + PARTICLES
------------------------------------------------------------*/
function AuroraBG() {
  return (
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,#ffeef8,transparent_60%),radial-gradient(circle_at_bottom_right,#e6f7ff,transparent_60%),radial-gradient(circle_at_center,#f0e6ff,transparent_55%)]" />
  );
}

function Particles() {
  const icons = ["✨", "💖", "🌟", "💗", "🪄"];

  return (
    <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
      {icons.map((icon, i) => (
        <motion.span
          key={i}
          className="absolute text-3xl opacity-60"
          style={{
            top: `${10 + i * 15}%`,
            left: `${15 + i * 12}%`,
          }}
          animate={{
            y: ["0%", "-30%", "0%"],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 6 + i,
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
