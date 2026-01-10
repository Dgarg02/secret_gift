"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function CreationInterface({
  onGenerate,
}: {
  onGenerate: (message: string, password: string) => void;
}) {
  const [msg, setMsg] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);

  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="py-16 px-8"
    >
      <div className="max-w-2xl mx-auto glass-card rounded-3xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Create Your Gift 🎁</h2>

        <motion.textarea
          whileFocus={{ scale: 1.03 }}
          className="w-full h-32 p-4 bg-white/60 rounded-button"
          placeholder="Write something heartfelt…"
          onChange={(e) => setMsg(e.target.value)}
        />

        <div className="relative mt-6">
          <motion.input
            whileFocus={{ scale: 1.03 }}
            type={showPass ? "text" : "password"}
            className="w-full p-4 bg-white/60 rounded-button"
            placeholder="Secret password"
            onChange={(e) => setPass(e.target.value)}
          />

          <button
            onClick={() => setShowPass(!showPass)}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            {showPass ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        <motion.button
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => onGenerate(msg, pass)}
          className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-button mt-6"
        >
          Generate Secret Page 🔒💗
        </motion.button>
      </div>
    </motion.section>
  );
}
