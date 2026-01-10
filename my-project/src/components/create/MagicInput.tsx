"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function MagicInput({
  message,
  setMessage,
  password,
  setPassword,
}: any) {
  const [showPass, setShowPass] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* MESSAGE INPUT */}
      <label className="block text-lg font-semibold text-gray-700 mb-2">
        Your Secret Message
      </label>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write something beautiful… ✨"
        className="w-full h-36 px-5 py-4 rounded-2xl bg-white/60 backdrop-blur-xl shadow-inner 
        border border-pink-200 focus:border-pink-400 focus:ring-4 focus:ring-pink-200 
        transition-all resize-none"
      />

      {/* PASSWORD INPUT */}
      <div className="mt-6">
        <label className="block text-lg font-semibold text-gray-700 mb-2">
          Secret Password
        </label>

        <div className="relative">
          <input
            type={showPass ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-5 py-4 pr-14 rounded-2xl bg-white/60 border border-purple-200
            focus:border-purple-400 focus:ring-4 focus:ring-purple-200 shadow-inner transition-all"
          />

          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPass ? <FiEyeOff size={22} /> : <FiEye size={22} />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
