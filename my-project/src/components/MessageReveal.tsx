"use client";

import { motion } from "framer-motion";

export default function MessageReveal({ message }: { message: string }) {
  return (
    <section className="py-20 px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mx-auto glass-card p-8 rounded-3xl"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Your Secret Message 💕</h2>

        <p className="bg-white/70 p-6 rounded-xl text-lg leading-relaxed text-gray-800">
          {message}
        </p>
      </motion.div>
    </section>
  );
}
