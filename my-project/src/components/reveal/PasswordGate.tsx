"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Particles from "./Particles";

export default function PasswordGate({
  messageId,
  onUnlock,
}: {
  messageId: string;
  onUnlock: () => void;
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  async function verify() {
    const res = await fetch("/api/message/verify", {
      method: "POST",
      body: JSON.stringify({ id: messageId, password }),
    });

    const data = await res.json();

    if (data.success) {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 800);
    }
  }

  return (
    <section className="relative h-screen flex items-center justify-center px-6">
      {/* Magical particles */}
      <Particles />

      {/* Password Card */}
      <motion.div
        animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.5 }}
        className="bg-white/20 backdrop-blur-2xl border border-white/40 
                   shadow-2xl p-10 rounded-3xl max-w-md w-full text-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 mb-4"
        >
          Unlock Your Gift ✨
        </motion.h2>

        <p className="text-gray-700 mb-6">Enter the secret password to reveal the magic.</p>

        <motion.input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full py-3 px-4 rounded-xl bg-white/70 border border-pink-300 
                     focus:ring-4 focus:ring-pink-200 outline-none transition shadow-inner"
          placeholder="Enter password"
        />

        {error && <p className="text-red-500 mt-2 text-sm">Incorrect password 😢</p>}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={verify}
          className="w-full mt-6 py-3 text-white rounded-xl text-lg font-semibold 
                     bg-gradient-to-r from-pink-500 to-purple-500 shadow-lg"
        >
          Unlock 🎁
        </motion.button>
      </motion.div>
    </section>
  );
}
