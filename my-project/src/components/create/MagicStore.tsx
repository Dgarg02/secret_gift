"use client";

import { motion } from "framer-motion";

export default function MagicStore({ openModal }: { openModal: () => void }) {
  const packs = [
    {
      title: "Premium Effects Pack",
      desc: "All 8 magical effects included",
      price: "₹199",
      button: "Unlock All Magic",
      gradient: "from-yellow-400 to-rose-500",
      glow: "shadow-[0_0_45px_rgba(255,184,0,0.45)]",
    },
    {
      title: "Single Effect",
      desc: "Choose any one magical effect",
      price: "₹49",
      button: "Choose Effect",
      gradient: "from-cyan-400 to-blue-500",
      glow: "shadow-[0_0_40px_rgba(56,189,248,0.45)]",
    },
    {
      title: "Love Bundle",
      desc: "Hearts, balloons & romantic effects",
      price: "₹99",
      button: "Get Bundle",
      gradient: "from-pink-500 to-purple-500",
      glow: "shadow-[0_0_40px_rgba(236,72,153,0.45)]",
    },
  ];

  return (
    <section className="mt-24 mb-10">
      <h2 className="text-center text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent drop-shadow-xl">
        Magic Store ✨
      </h2>

      <p className="text-center text-gray-600 mt-2 mb-12 text-lg">
        Unlock premium magical effects for your messages
      </p>

      <div className="flex flex-wrap justify-center gap-10 px-6">
        {packs.map((pack, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className={`w-[310px] rounded-3xl p-6 bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl hover:${pack.glow} transition-all`}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${pack.gradient} flex items-center justify-center text-white text-3xl shadow-lg`}
            >
              ⭐
            </motion.div>

            <h3 className="text-xl font-semibold text-center">{pack.title}</h3>
            <p className="text-gray-600 text-center mt-1">{pack.desc}</p>

            <p className="text-center text-pink-600 font-extrabold text-3xl mt-4">
              {pack.price}
            </p>

            <button
              onClick={openModal}
              className={`mt-6 w-full py-3 rounded-xl text-white font-semibold text-lg bg-gradient-to-r ${pack.gradient} shadow-lg hover:opacity-90 transition`}
            >
              {pack.button}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
