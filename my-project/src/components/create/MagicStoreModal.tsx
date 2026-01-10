"use client";

import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";

export default function MagicStoreModal({ open, onClose, onSelect }: any) {
  if (!open) return null;

  const effects = [
    { id: "treasure", title: "Treasure Box", subtitle: "Opens to reveal", color: "from-yellow-400 to-yellow-600" },
    { id: "crystal", title: "Crystal Orb", subtitle: "Mystical glow reveal", color: "from-teal-300 to-blue-400" },
    { id: "scratch", title: "Scratch Card", subtitle: "Scratch to reveal", color: "from-gray-300 to-gray-400" },
    { id: "balloon", title: "Balloon Pop", subtitle: "Pop to reveal", color: "from-pink-400 to-red-400" },
    { id: "spin", title: "Spin Wheel", subtitle: "Spin to reveal", color: "from-purple-500 to-indigo-500" },
    { id: "fireworks", title: "Fireworks", subtitle: "Explosive reveal", color: "from-orange-400 to-red-500" },
    { id: "hearts", title: "Floating Hearts", subtitle: "Hearts burst reveal", color: "from-pink-400 to-purple-500" },
    { id: "letter", title: "Letter Unroll", subtitle: "Elegant reveal", color: "from-gray-200 to-gray-300" },
  ];

  return (
    <div className="fixed inset-0 z-[999] flex items-end justify-center">
      {/* Background Blur */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* Bottom Sheet */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative w-full max-h-[85vh] overflow-y-auto bg-white rounded-t-[30px] p-6 shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Choose Your Magic ✨
          </h2>
          <button onClick={onClose} className="p-2 text-gray-600 hover:text-black">
            <FiX size={22} />
          </button>
        </div>

        {/* EFFECT GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {effects.map((eff) => (
            <div
              key={eff.id}
              className="border rounded-xl p-4 bg-gray-50 hover:shadow-lg cursor-pointer relative"
              onClick={() => onSelect(eff.id)}
            >
              {/* icon placeholder */}
              <div
                className={`w-16 h-16 mx-auto rounded-xl bg-gradient-to-br ${eff.color}`}
              />

              <h3 className="text-center font-semibold mt-3">{eff.title}</h3>
              <p className="text-center text-xs text-gray-500">
                {eff.subtitle}
              </p>

              {/* locked icon */}
              <div className="absolute top-3 right-3 bg-black/70 text-white text-[10px] px-2 py-[2px] rounded-full">
                🔒
              </div>
            </div>
          ))}
        </div>

        {/* PRICE CARDS */}
        <h3 className="text-xl font-bold text-center text-gray-900 mb-4">
          Magic Store
        </h3>
        <p className="text-center text-gray-500 mb-6">
          Unlock premium magical effects for your messages
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Premium Pack */}
          <div className="p-6 rounded-xl bg-white shadow-md text-center border">
            <div className="w-14 h-14 mx-auto bg-yellow-400 rounded-xl" />
            <h4 className="font-semibold mt-3">Premium Effects Pack</h4>
            <p className="text-sm text-gray-500 mb-3">All 8 magical effects included</p>
            <p className="text-2xl font-bold text-pink-500 mb-2">₹199</p>
            <button className="bg-pink-500 text-white py-2 px-4 rounded-lg w-full">
              Unlock All Magic
            </button>
          </div>

          {/* Single Effect */}
          <div className="p-6 rounded-xl bg-white shadow-md text-center border">
            <div className="w-14 h-14 mx-auto bg-blue-300 rounded-xl" />
            <h4 className="font-semibold mt-3">Single Effect</h4>
            <p className="text-sm text-gray-500 mb-3">Choose any one magical effect</p>
            <p className="text-2xl font-bold text-teal-500 mb-2">₹49</p>
            <button className="bg-teal-500 text-white py-2 px-4 rounded-lg w-full">
              Choose Effect
            </button>
          </div>

          {/* Love Bundle */}
          <div className="p-6 rounded-xl bg-white shadow-md text-center border">
            <div className="w-14 h-14 mx-auto bg-purple-500 rounded-xl" />
            <h4 className="font-semibold mt-3">Love Bundle</h4>
            <p className="text-sm text-gray-500 mb-3">Hearts, balloons & romantic effects</p>
            <p className="text-2xl font-bold text-purple-500 mb-2">₹99</p>
            <button className="bg-purple-500 text-white py-2 px-4 rounded-lg w-full">
              Get Bundle
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
