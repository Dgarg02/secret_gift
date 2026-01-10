"use client";

import { motion } from "framer-motion";

export default function SuccessState({
  link,
  onCreateAnother,
}: {
  link: string;
  onCreateAnother: () => void;
}) {
  return (
    <section className="py-20 px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ease: "backOut", duration: 0.7 }}
        className="max-w-2xl mx-auto glass-card p-8 rounded-3xl text-center"
      >
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold mb-4">Your Secret Gift is Ready!</h2>

        <input
          value={link}
          readOnly
          className="w-full bg-white/70 p-3 rounded-xl text-center mb-4"
        />

        <button
          onClick={() => navigator.clipboard.writeText(link)}
          className="bg-primary text-white px-6 py-3 rounded-button w-full mb-6"
        >
          Copy Link
        </button>

        <button
          onClick={onCreateAnother}
          className="w-full border-2 border-primary text-primary px-6 py-3 rounded-button"
        >
          Create Another Gift
        </button>
      </motion.div>
    </section>
  );
}
