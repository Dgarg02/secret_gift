"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

interface Props {
  show: boolean;
  setShow: (v: boolean) => void;
  message: string;
  media: any[];
  effect: string | null;
  onContinue: () => void;
}

export default function PreviewModal({
  show,
  setShow,
  message,
  media,
  effect,
  onContinue
}: Props) {
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
            <div className="bg-white rounded-2xl shadow-xl p-6 max-w-xl w-full">
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Preview Your Magic ✨
                </h2>
                <button onClick={() => setShow(false)}>
                  <FiX size={22} className="text-gray-600" />
                </button>
              </div>

              <p className="text-gray-700 whitespace-pre-line mb-4">
                {message}
              </p>

              <div className="grid grid-cols-2 gap-3">
                {media.map((m, idx) => (
                  <div key={idx} className="rounded-lg overflow-hidden shadow">
                    {m.type.startsWith("image") ? (
                      <img src={m.url} className="w-full h-32 object-cover" />
                    ) : (
                      <video src={m.url} className="w-full h-32 object-cover" />
                    )}
                  </div>
                ))}
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onContinue}
                className="w-full mt-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold shadow-lg"
              >
                Generate Link ✨
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
