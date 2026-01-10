"use client";

import { motion } from "framer-motion";

export default function Navbar({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full py-6 px-8"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-primary text-2xl font-['Pacifico']">logo</div>

        <div className="hidden md:flex space-x-8">
          {["How it Works", "Features", "Pricing"].map((t) => (
            <a key={t} className="text-gray-700 hover:text-primary transition">
              {t}
            </a>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          onClick={onGetStarted}
          className="bg-primary text-white px-6 py-3 rounded-button"
        >
          Get Started
        </motion.button>
      </div>
    </motion.nav>
  );
}
