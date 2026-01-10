"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiCopy, FiCheck } from "react-icons/fi";
import { useState } from "react";

interface Props {
  show: boolean;
  setShow: (v: boolean) => void;
  link: string;
}

export default function LinkModal({ show, setShow, link }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShow(false)}
          />

          <motion.div
            className="fixed inset-0 flex items-center justify-center p-6 z-50"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  Your Magic Link ✨
                </h2>
                <button onClick={() => setShow(false)}>
                  <FiX size={22} className="text-gray-600" />
                </button>
              </div>

              <input
                readOnly
                value={link}
                className="w-full p-3 rounded-xl border bg-gray-50 text-gray-700 mb-4"
              />

              <button
                onClick={copy}
                className="w-full py-3 rounded-xl bg-purple-500 text-white font-medium flex items-center justify-center gap-2"
              >
                {copied ? <FiCheck /> : <FiCopy />}
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
