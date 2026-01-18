"use client";

import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";

export default function MagicExperience() {
  const [burst, setBurst] = useState(false);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    setSize({ w: window.innerWidth, h: window.innerHeight });
  }, []);

  return (
    <>
      {burst && (
        <Confetti
          width={size.w}
          height={size.h}
          recycle={false}
          numberOfPieces={500}
        />
      )}

      <div className="flex gap-4 justify-center mt-10">
        {["🎈", "🎁", "💖"].map((emoji, i) => (
          <motion.div
            key={i}
            whileTap={{ scale: 0.8 }}
            onClick={() => setBurst(true)}
            className="cursor-pointer text-4xl"
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      <p className="text-sm text-gray-300 mt-4 text-center">
        Tap to spread the magic ✨
      </p>
    </>
  );
}
