"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function PasswordScreen({
  correctPassword,
  onUnlock,
}: {
  correctPassword: string;
  onUnlock: () => void;
}) {
  const [input, setInput] = useState("");
  const wrong = input && input !== correctPassword;

  return (
    <section className="py-20 px-8">
      <div className="max-w-md mx-auto glass-card p-8 rounded-3xl text-center">
        <div className="text-6xl mb-6">🔐</div>
        <h2 className="text-2xl font-bold mb-4">Enter Password</h2>

        <motion.input
          animate={wrong ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.5 }}
          type="password"
          className="w-full p-4 bg-white/60 rounded-button text-center"
          placeholder="Enter the password..."
          onChange={(e) => setInput(e.target.value)}
        />

        {wrong && <p className="text-red-500 mt-2">Wrong password 😭</p>}

        <motion.button
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => input === correctPassword && onUnlock()}
          className="w-full mt-4 bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-button"
        >
          Unlock My Gift 💖
        </motion.button>
      </div>
    </section>
  );
}
