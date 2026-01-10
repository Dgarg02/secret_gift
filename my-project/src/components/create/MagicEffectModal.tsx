"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiPlayCircle } from "react-icons/fi";

export default function MagicEffectModal({
  show,
  setShow,
  onSelect,
}: any) {

  const effects = [
    { id: "treasure", title: "Treasure Box", desc: "Opens to reveal", icon: "/icons/treasure.gif" },
    { id: "orb", title: "Crystal Orb", desc: "Mystical glow reveal", icon: "/icons/orb.gif" },
    { id: "scratch", title: "Scratch Card", desc: "Scratch to reveal", icon: "/icons/scratch.gif" },
    { id: "balloon", title: "Balloon Pop", desc: "Pop to reveal", icon: "/icons/balloon.gif" },
    { id: "spin", title: "Spin Wheel", desc: "Spin to reveal", icon: "/icons/spin.gif" },
    { id: "fireworks", title: "Fireworks", desc: "Explosive reveal", icon: "/icons/fireworks.gif" },
    { id: "hearts", title: "Floating Hearts", desc: "Hearts burst reveal", icon: "/icons/hearts.gif" },
    { id: "letter", title: "Letter Unroll", desc: "Elegant reveal", icon: "/icons/letter.gif" },
  ];

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.25 }}
          className="bg-white rounded-3xl w-[90%] max-w-5xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.25)] relative"
        >
          {/* Close Button */}
          <button
            className="absolute right-6 top-6 text-gray-500 hover:text-gray-700"
            onClick={() => setShow(false)}
          >
            <FiX size={28} />
          </button>

          {/* Heading */}
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            Choose Your Magic ✨
          </h2>

          {/* Magic Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {effects.map((effect) => (
              <motion.div
                key={effect.id}
                whileHover={{ scale: 1.05 }}
                className="group cursor-pointer rounded-2xl p-5 bg-white/70 backdrop-blur-xl 
                border border-gray-200 shadow-lg hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] 
                transition relative"
                onClick={() => onSelect(effect.id)}
              >
                {/* Animated Icon */}
                <motion.img
                  src={effect.icon}
                  className="w-14 h-14 mx-auto mb-3 rounded-xl shadow"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Title */}
                <h3 className="text-center font-semibold text-lg">{effect.title}</h3>
                <p className="text-center text-gray-500 text-sm">{effect.desc}</p>

                {/* Mini Preview Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={(e) => {
                    e.stopPropagation(); // prevent selecting while previewing
                    alert("Preview animation coming soon ✨"); 
                  }}
                  className="absolute right-3 top-3 p-1.5 bg-white rounded-full shadow text-purple-600 
                  hover:bg-purple-600 hover:text-white transition"
                >
                  <FiPlayCircle size={18} />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
